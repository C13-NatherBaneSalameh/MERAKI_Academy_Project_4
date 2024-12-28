const mongoose = require("mongoose");
const lessons = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  video: { type: String},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}]
});
module.exports=mongoose.model("Lesson",lessons)