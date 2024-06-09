const express = require("express");
const { exec } = require("child_process");
const connectDB = require("./db/conn.js").connectDB;
const cors = require("cors");
const agentRoutes = require("./routers/agentRouter.js");
const agentController = require("./controllers/agentController.js");

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

exports.app = app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  const timestamp = new Date()?.toISOString();
  const ip = req?.ip || req?.connection?.remoteAddress;
  console.log(`[${timestamp}] | ${ip} | ${req?.method} ${req?.path}`);
  next();
});

app.use("/api/v1/agent", agentRoutes);

 // Schedule the task to run every 5 minutes
 setInterval(collectAndStoreMetrics, 5 * 60 * 1000); // 5 minutes in milliseconds
    
 // Run the task immediately on startup
 collectAndStoreMetrics();

function collectAndStoreMetrics() {
    exec('./metrics.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return;
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
            return;
        }

        const output = stdout.split('\n').filter(line => line);
        const metrics = {
            memory: output[0],
            disk: output[1],
            cpu: output[2],
            timestamp: new Date()
        };

        // insertMetricsToDB(metrics);
        agentController.insertMetricsToDB(metrics)

        console.log(metrics)
    });
}

app.listen(PORT, () => {
  console.log(`\nServer is running on port: ${PORT} 🔥`);
});
