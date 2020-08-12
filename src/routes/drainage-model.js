const express = require("express");
const router = new express.Router();
const DrainageModel = require("../models/drainage-model");
const auth = require("../middleware/auth");

router.post("/models", auth, async (req, res) => {
  const drainageModel = new DrainageModel({
    ...req.body
  });
  try {
    await drainageModel.save();
    res.status(201).send(drainageModel);
  } catch (error) {
    res.status(400).send(error);

  }
});

router.get("/models", auth, async (req, res) => {
 
  try {
    const models = await DrainageModel.find().sort({Day_of_Input: 1});
    if (!models) {
      return res.status(404).send();
    }
    res.send(models);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/models/:name", auth, async (req, res) => {
  const _name = req.params.name;
  try {
    const model = await DrainageModel.findOne({ Model_Name: _name});
    if (!model) {
      return res.status(404).send();
    }
    res.send(model);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/models/:name", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const model = await DrainageModel.findOne({
      Model_Name: req.params.name
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

router.delete("/models/:name", auth, async (req, res) => {
  try {
    const model = await DrainageModel.findOneAndDelete({
      Model_Name: req.params.name
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