const express = require("express");
const router = new express.Router();
const Inflow = require("../models/inflow");
const auth = require("../middleware/auth");

router.post("/inflows", auth, async (req, res) => {
  const inflow = new Inflow({
    ...req.body
  });
  try {
    await inflow.save();
    res.status(201).send(inflow);
  } catch (error) {
    res.status(400).send(error);

  }
});

router.get("/inflows", auth, async (req, res) => {
 
  try {
    const inflows = await Inflow.find().sort({Day_of_Input: 1});
    if (!inflows) {
      return res.status(404).send();
    }
    res.send(inflows);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/inflows/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const inflow = await Inflow.findOne({ Day_of_Input: _id});
    if (!inflow) {
      return res.status(404).send();
    }
    res.send(inflow);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch("/inflows/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  try {
    const inflow = await Inflow.findOne({
      Day_of_Input: req.params.id
    });
    if (!inflow) {
      return res.status(404).send();
    }
    updates.forEach((update) => (inflow[update] = req.body[update]));
    await inflow.save();
    res.send(inflow);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/inflows/:id", auth, async (req, res) => {
  try {
    const inflow = await Inflow.findOneAndDelete({
      Day_of_Input: req.params.id
    });
    if (!inflow) {
      return res.status(404).send();
    }
    res.send(inflow);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;