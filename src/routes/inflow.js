const express = require("express");
const router = new express.Router();
const Inflow = require("../models/inflow");
const auth = require("../middleware/auth");

router.post("/inflows", auth, async (req, res) => {
  // if inflow already exits, just patch it.
  const currentInflow = await Inflow.findOne({
    Day_of_Input: { $gte: new Date(req.body.Day_of_Input) },
  });
  if (currentInflow) {
    const updates = Object.keys(req.body);
    try {
      updates.forEach((update) => (currentInflow[update] = req.body[update]));
      await currentInflow.save();
      return res.send(currentInflow);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  // new inflow
  const inflow = new Inflow({
    ...req.body,
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
    const inflows = await Inflow.find().sort({ Day_of_Input: 1 });
    if (!inflows) {
      return res.status(404).send();
    }
    res.send(inflows);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/inflows/byYear/:year", auth, async (req, res) => {
  try {
    const inflows = await Inflow.find({
      Day_of_Input: {
        $gte: new Date(`${req.params.year}-01-01`),
        $lte: new Date(`${req.params.year}-12-31`),
      },
    }).sort({ Day_of_Input: 1 });
    if (!inflows) {
      return res.status(404).send();
    }
    res.send(inflows);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/inflows/:id", auth, async (req, res) => {
  let _id = req.params.id;
  try {
    const inflow = await Inflow.findOne({
      Day_of_Input: { $gte: new Date(_id) },
    });
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
  try {
    const inflow = await Inflow.findOne({
      Day_of_Input: req.params.id,
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
      Day_of_Input: req.params.id,
    });
    if (!inflow) {
      return res.status(404).send();
    }
    res.send(inflow);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/inflows/deleteByYear/:year", auth, async (req, res) => {
  try {
    const inflow = await Inflow.deleteMany({
      Day_of_Input: {
        $gte: new Date(`${req.params.year}-01-01`),
        $lte: new Date(`${req.params.year}-12-31`),
      },
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
