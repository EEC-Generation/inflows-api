const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const inflowRouter = require("./routes/inflow");
const drainageModelRouter = require("./routes/drainage-model");
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
  origin: ['http://192.168.80.51:3001', 'https://sec-generation.netlify.app', 'http://localhost:3001']
}));
app.use(express.json());
app.use(userRouter);
app.use(inflowRouter);
app.use(drainageModelRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});