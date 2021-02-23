const mongoose = require("mongoose");

const drainagePointSchema = new mongoose.Schema (
  {
    x: {
      type: String,
      trim: true
    },
    y: {
      type: String,
      trim: true
    }
  }
)
const drainageModelSchema = new mongoose.Schema(
  {
    Model_Name: {
      type: String,
      required: true,
      trim: true,
    },
    Min: [drainagePointSchema],
    Opt: [drainagePointSchema],
    Max: [drainagePointSchema]
  },
  {
    timestamps: true,
  }
);

const DrainageModel = mongoose.model("DrainageModel", drainageModelSchema );

module.exports = DrainageModel;
