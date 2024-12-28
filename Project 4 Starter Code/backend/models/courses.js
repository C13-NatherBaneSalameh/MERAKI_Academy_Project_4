const mongoose = require("mongoose");
const courses = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  img: { type: String}
});
module.exports=mongoose.model("Course",courses)