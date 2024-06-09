const Agent = require("../models/AgentModel");
const mongoose = require("mongoose");

exports.getData = async (req, res, next) => {

  try {
    const result = await Agent.find()

    res.status(200).json({ result });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getDataByTime = async (req, res, next) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.addNewData = async (req, res, next) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid User ID" });
  }

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Something went wrong" });
  }
};

// Function to insert metrics into the database
exports.insertMetricsToDB = async (metrics) => {
  try {
    const metric = new Agent({
      cpu:" metrics.cpu",
      hdd: "metrics.disk",
      ram: "metrics.memory",
      timeStamp: metrics.timestamp,
    });


    const result = await metric.save();

    console.log("Metrics inserted into database", result);
    
  } catch (error) {
    console.error("Failed to insert metrics into database", error);
  }
};
