const commentModel = require("../models/comments");
const lessonsModel = require("../models/lessons");
const createNewComment = (req, res) => {
  const { comment } = req.body;
  const commenter = req.token.userId;
  const newComment = new commentModel({ comment, commenter });
  const lessonId = req.params.lessonId;

  newComment
    .save()
    .then((result) => {
      lessonsModel
        .findByIdAndUpdate(
          { _id: lessonId },
          { $push: { comments: result } },
          { new: true }
        )
        .then((result) => {
            console.log(result);
            
          res.status(201).json({
            success: true,

            message: "Comment created",

            comment: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Server Error",
            err: err.message,
          });
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
module.exports = { createNewComment };
