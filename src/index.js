const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const inflowRouter = require("./routes/inflow");
const drainageModelRouter = require("./routes/drainage-model");
const powerStationRouter = require("./routes/power-stations");
const settingsRouter = require("./routes/settings");
const generationScheduleRouter = require("./routes/genaration-schedules");
const cors = require('cors')
const app = express();
const port = process.env.PORT;

const multer = require("multer");
const upload = new multer({
  dest: "images",
});
app.post("/upload", upload.single('upload'), (req, res) => {
  res.send();
});
app.use(cors({
  origin: ['http://localhost:3000', 'https://sec-generation.netlify.app', 'http://localhost:3001', 'http://localhost:3002', 'https://sec-generation-uat.netlify.app']
}));
app.use(express.json());
app.use(userRouter);
app.use(inflowRouter);
app.use(drainageModelRouter);
app.use(settingsRouter);
app.use(powerStationRouter);
app.use(generationScheduleRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});