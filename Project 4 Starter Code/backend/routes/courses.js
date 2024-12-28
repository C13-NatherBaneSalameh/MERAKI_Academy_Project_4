const express = require("express");

const {createNewCourse }=require("../controllers/courses")
const authentication=require("../middleware/authentication")
const coursesRouter=express.Router()
coursesRouter.post("/", authentication,createNewCourse)
module.exports=coursesRouter