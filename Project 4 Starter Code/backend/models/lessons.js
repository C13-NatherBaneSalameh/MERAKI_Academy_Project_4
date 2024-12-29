const mongoose = require("mongoose");
const lessonsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  video: { type: String},
  comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

});
module.exports=mongoose.model("Lesson",lessonsSchema)