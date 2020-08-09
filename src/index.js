const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const inflowRouter = require("./routes/inflow");
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
  origin: ['http://localhost:3002', 'https://sec-generation.netlify.app']
}));
app.use(express.json());
app.use(userRouter);
app.use(inflowRouter);

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});