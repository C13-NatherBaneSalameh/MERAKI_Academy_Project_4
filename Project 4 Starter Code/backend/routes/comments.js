const express =require("express")
const {createNewComment}=require("../controllers/comments")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const commentsRouter =express.Router()
commentsRouter.post("/:lessonId",authentication, createNewComment)

module.exports=commentsRouter