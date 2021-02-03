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
    },
    ezulwiniSumPeak: {
      type: String,
      trim: true
    },
    ezulwiniSumStnd: {
      type: String,
      trim: true
    },
    ezulwiniSumOffPeak: {
      type: String,
      trim: true
    },
    edwaleniSumPeak: {
      type: String,
      trim: true
    },
    edwaleniSumStnd: {
      type: String,
      trim: true
    },
    edwaleniSumOffPeak: {
      type: String,
      trim: true
    },
    maguduzaSumPeak: {
      type: String,
      trim: true
    },
    maguduzaSumStnd: {
      type: String,
      trim: true
    },
    maguduzaSumOffPeak: {
      type: String,
      trim: true
    }
  }
)
const generationScheduleSum = new mongoose.Schema(
  {
    peak: {
      type: String,
    },
    standard: {
      type: String,
    },
    "off-peak": {
      type: String,
    },
    sum: {
      type: String,
    },
  }
)
const generationScheduleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Schedule: [generationPeriodSchema],
    totals: [generationScheduleSum]
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
