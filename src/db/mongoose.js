const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology:true,
  useFindAndModify:false
});





// const task = new Task({
//   description:
//     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores culpa incidunt officia! Accusamus voluptatem quibusdam perferendis consectetur doloremque odit rem magni, neque id ad possimus vitae a explicabo culpa! Soluta!",
// });

// task
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
