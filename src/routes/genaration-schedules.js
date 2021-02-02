const express = require("express");
const router = new express.Router();
const GenerationSchedules = require("../models/genaration-schedules-model");
const auth = require("../middleware/auth");
const path = require("path");
const scheduleExport = require("../utils/schedule-export");
router.post("/schedules", auth, async (req, res) => {
  const generationSchedule = new GenerationSchedules({
    ...req.body,
  });
  try {
    await generationSchedule.save();
    res.status(201).send(generationSchedule);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**
 * @description get all generation schedules
 */
router.get("/schedules", auth, async (req, res) => {
  try {
    const schedules = await GenerationSchedules.find().sort({ Date: 1 });
    if (!schedules) {
      return res.status(404).send();
    }
    res.send(schedules);
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 *  @description get all generation schedules by date
 */
router.get("/schedules/:date", auth, async (req, res) => {
  const _date = req.params.date;
  try {
    const schedule = await GenerationSchedules.findOne({ Date: _date });
    if (!schedule) {
      return res.status(404).send();
    }
    res.send(schedule);
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 * @description get generation schedules by date and power station
 */
router.get("/schedules/:date/:station", auth, async (req, res) => {
  const { date, station } = req.params;
  try {
    const schedule = await GenerationSchedules.findOne({ Date: date });
    if (!schedule) {
      return res.status(404).send();
    }
    const powerStationSchedule = schedule["Power_Stations"].filter(
      (schedule) => schedule.Name === station
    );
    res.send(powerStationSchedule);
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 *@description edit generation schedules by date
 */
router.patch("/schedules/:date", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const { date } = req.params;
  try {
    const schedule = await GenerationSchedules.findOne({ Date: date });
    if (!schedule) {
      return res.status(404).send();
    }
    updates.forEach((update) => (schedule[update] = req.body[update]));
    await schedule.save();
    res.send(schedule);
  } catch (error) {
    res.status(400).send(error);
  }
});
/**
 * @description delete schedules by the date
 */
router.delete("/schedules/:date", auth, async (req, res) => {
  const { date } = req.params;
  try {
    const schedule = await GenerationSchedules.findOneAndDelete({
      Date: date,
    });
    if (!schedule) {
      return res.status(404).send();
    }
    res.send(schedule);
  } catch (error) {
    res.status(500).send(error);
  }
});
/**
 * @description export schedules to excel.
 */
router.post("/download-schedules/:date", auth, async (req, res) => {
  const { date } = req.params;
  try {
    const schedule = await GenerationSchedules.findOne({ Date: date });
    if (!schedule) {
      return res.status(404).send();
    }

    await scheduleExport(req.body.date, schedule);
    const file = path.join(__dirname, "../assets/downloads/schedule.xlsx");
    res.status(200).download(file);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
module.exports = router;
