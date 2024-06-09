const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI);
    console.log("MongoDB successfully connected 🍃");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};