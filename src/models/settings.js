const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    Luphohlo_Weekend_Limit: {
      type: String,
      trim: true,
    },
    Default_Model: {
      type: String,
      trim: true,
    },
    Maguga_Downstream_Wear_Limit: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;
