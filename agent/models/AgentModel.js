const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const agentSchema = new Schema({
  cpu: {
    type: String,
    required: true,
  },
  hdd: {
    type: String,
    required: true,
  },
  ram: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Agent", agentSchema);