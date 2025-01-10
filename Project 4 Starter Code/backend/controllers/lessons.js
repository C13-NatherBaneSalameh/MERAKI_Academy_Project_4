const lessonsModel = require("../models/lessons");

const createNewLesson = (req, res) => {
  const { title, description, courseId, video } = req.body;
  const teacherId = req.token.userId;
  const newLesson = new lessonsModel({
    title,
    description,
    courseId,
    video,
    teacherId,
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
const getAllLessonsByID = (req, res) => {
  const id = req.params.id;

  lessonsModel
    .find({courseId:id})
    .populate({
      path:"comments",
      populate:{
        path:"commenter"
      }
    })
    .then((result) => {
      if (result.length === 0) {
        res.status(400).json("No lessons yet ");
      } else {
        res.status(200).json({
          success: true,
          message: " All the lessons",
          lessone: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,

        message: "Server Error",

        err: err.message,
      });
    });
};
const deleteLessonsById = (req, res) => {
  const id = req.params.id;

  lessonsModel
    .deleteOne({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Lesson deleted ",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const updateLessonById = (req, res) => {
  const id = req.params.id;
  const { title, description, video } = req.body;
  lessonsModel
  .findOneAndUpdate({_id: id},{title:title , description:description ,video:video}, {new:true})
  .then((result)=>{
    res.status(200).json({
      success: true,
      message: "Lesson updated",
      lesson: result
    })
  })
  .catch((err)=>{
  res.status(500).json({
    success: false,
    message: "Server Error",
    err: err.message
  })
  })};

  const findLessonsByTitle=(req,res)=>{
    const id = req.params.id;
   const title=req.body.title
    lessonsModel
      .find({courseId:id ,title:title})
      .populate({
        path:"comments",
        populate:{
          path:"commenter"
        }
      })
      .then((result) => {
        if (result.length === 0) {
          res.status(400).json("No lessons yet ");
        } else {
          res.status(200).json({
            success: true,
            message: " All the lessons",
            lessone: result,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
  
          message: "Server Error",
  
          err: err.message,
        });
      });





  }
module.exports = { createNewLesson,getAllLessonsByID,deleteLessonsById ,updateLessonById,findLessonsByTitle};
