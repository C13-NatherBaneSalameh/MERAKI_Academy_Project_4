const lessonsModel = require("../models/lessons");

const createNewLesson = (req, res) => {
  const { title, description, courseId, video } = req.body;
  const teacherId =req.token.userId
  const newLesson = new lessonsModel({
    title,
description,
courseId,
video,
teacherId
  });

  newLesson
  .save()
  .then((lessone) => {
    res.status(201).json({
      success: true,
      message: `lessone created`,
      lessone: lessone,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
};
const getAllLessons=(req,res)=>{
  lessonsModel.find()
  .then((result)=>{
    
    res.status(200).json({
      success: true,
      message:" All the lessons",
      lessone: result,

    })
  }).catch((err)=>{
  res.status(500).json({
    success: false,

message: "Server Error",

err:err.message
  })
  })

}
module.exports={createNewLesson ,getAllLessons }
