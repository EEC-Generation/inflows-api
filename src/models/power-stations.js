const mongoose = require("mongoose");

const generatorSchema = new mongoose.Schema (
  {
    Rated_Power: {
      type: String,
      trim: true
    },
    Rated_Flow: {
      type: String,
      trim: true
    },
    Units: {
      type: String,
      trim: true
    }
  }
)
const powerStationSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      trim: true,
    },
    Genarators: [generatorSchema],
    Rated_Head: {
      type: String,
      required: true,
      trim: true,
    },
    Total_Power_Output: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const powerStations = mongoose.model("PowerStations", powerStationSchema );

module.exports = powerStations;
