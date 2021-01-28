const mongoose = require("mongoose");

const generationPeriodSchema = new mongoose.Schema (
  {
    Time: {
      type: String,
      trim: true
    },
    Period: {
      type: String,
      trim: true
    },
    Power: {
      type: String,
      trim: true
    }
  }
)
const generationScheduleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Schedule: [generationPeriodSchema]
  }
);

const powerStationsGenerationSchedule = new mongoose.Schema(
  {
    Date: {
      type: Date,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    Power_Stations: [generationScheduleSchema]
  },
  {
    timestamps: true,
  }
)
powerStationsGenerationSchedule.index({ Date: 1 });
const generationSchedules = mongoose.model("GenerationSchedules", powerStationsGenerationSchedule );

module.exports = generationSchedules;
