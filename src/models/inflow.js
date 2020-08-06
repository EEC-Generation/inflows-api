const mongoose = require("mongoose");

const inflowSchema = new mongoose.Schema(
  {
    Day_of_Input: {
      type: Date,
      required: true,
      trim: true,
    },
    Ferreira: {
      type: String,
      required: true,
      trim: true,
    },
    GS_15: {
      type: String,
      required: true,
      trim: true,
    },
    GS_2: {
      type: String,
      required: true,
      trim: true,
    },
    Luphohlo_Daily_Level: {
      type: String,
      required: true,
      trim: true,
    },
    Mkinkomo_Reservoir_Daily_Level: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Inflow = mongoose.model("Inflow", inflowSchema);

module.exports = Inflow;
