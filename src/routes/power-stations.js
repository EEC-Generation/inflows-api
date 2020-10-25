const express = require("express");
const router = new express.Router();
const PowerStation = require("../models/power-stations");
const auth = require("../middleware/auth");

router.post("/power-stations", auth, async (req, res) => {
  const powerStation = new PowerStation({
    ...req.body
  });
  try {
    await powerStation.save();
    res.status(201).send(powerStation);
  } catch (error) {
    res.status(400).send(error);

  }
});

router.get("/power-stations", auth, async (req, res) => {
 
  try {
    const powerStations = await PowerStation.find();
    if (!powerStations) {
      return res.status(404).send();
    }
    res.send(powerStations);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/power-stations/:name", auth, async (req, res) => {
  const _name = req.params.name;
  try {
    const powerStation = await PowerStation.findOne({ Name: _name});
    if (!powerStation) {
      return res.status(404).send();
    }
    res.send(powerStation);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/power-stations/:name", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const powerStation = await PowerStation.findOne({
      Name: req.params.name
    });
    if (!powerStation) {
      return res.status(404).send();
    }
    updates.forEach((update) => (powerStation[update] = req.body[update]));
    await powerStation.save();
    res.send(powerStation);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;