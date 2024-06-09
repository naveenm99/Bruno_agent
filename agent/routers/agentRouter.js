const express = require("express");
const agentController = require("../controllers/agentController.js");

const agentRoutes = express.Router();

agentRoutes.get("/data", agentController.getData);
agentRoutes.get("/data/:id", agentController.getDataByTime);

agentRoutes.post("/data", agentController.addNewData);

module.exports = agentRoutes;
