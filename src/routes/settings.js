const express = require("express");
const router = new express.Router();
const SettingsModel = require("../models/settings");
const auth = require("../middleware/auth");

router.post("/settings", auth, async (req, res) => {
  // if setting already exits, just patch it.
  const currentSetting = await SettingsModel.findOne();
  if (currentSetting) {
    const updates = Object.keys(req.body);
    try {
      updates.forEach((update) => (currentSetting[update] = req.body[update]));
      await currentSetting.save();
      return res.send(currentSetting);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  const settingsModel = new SettingsModel({
    ...req.body,
  });
  try {
    await settingsModel.save();
    res.status(201).send(settingsModel);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/settings", auth, async (req, res) => {
  try {
    const settings = await SettingsModel.find().sort({ Day_of_Input: 1 });
    if (!settings) {
      return res.status(404).send();
    }
    res.send(settings);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/settings/:name", auth, async (req, res) => {
  const _name = req.params.name;
  try {
    const model = await SettingsModel.findOne({ Model_Name: _name });
    if (!model) {
      return res.status(404).send();
    }
    res.send(model);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/settings/:name", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const model = await SettingsModel.findOne({
      Model_Name: req.params.name,
    });
    if (!model) {
      return res.status(404).send();
    }
    updates.forEach((update) => (model[update] = req.body[update]));
    await model.save();
    res.send(model);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/settings/:name", auth, async (req, res) => {
  try {
    const model = await SettingsModel.findOneAndDelete({
      Model_Name: req.params.name,
    });
    if (!model) {
      return res.status(404).send();
    }
    res.send(model);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
