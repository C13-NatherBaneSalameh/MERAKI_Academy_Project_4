const express = require("express");

const {createNewCourse ,getAllCourse,deleteCourseById }=require("../controllers/courses")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const coursesRouter=express.Router()
coursesRouter.post("/", authentication ,authorization("CREATE_COURSE"),createNewCourse)
coursesRouter.get("/allCourse",authentication,authorization("GET_ALL_COURSE"),getAllCourse)
coursesRouter.delete("/:id",authentication,authorization("DELETE_COURSE"),deleteCourseById)
module.exports=coursesRouter