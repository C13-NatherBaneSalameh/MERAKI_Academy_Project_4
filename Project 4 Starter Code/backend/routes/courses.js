const express = require("express");

const {createNewCourse }=require("../controllers/courses")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const coursesRouter=express.Router()
coursesRouter.post("/", authentication ,authorization("CREATE_COURSE"),createNewCourse)
module.exports=coursesRouter