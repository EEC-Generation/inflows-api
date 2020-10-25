const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const inflowRouter = require("./routes/inflow");
const drainageModelRouter = require("./routes/drainage-model");
const powerStationRouter = require("./routes/power-stations");
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
  origin: ['http://localhost:3000', 'https://sec-generation.netlify.app', 'http://localhost:3001']
}));
app.use(express.json());
app.use(userRouter);
app.use(inflowRouter);
app.use(drainageModelRouter);
app.use(powerStationRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});