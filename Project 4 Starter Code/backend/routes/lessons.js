const express=require("express")
const {createNewLesson ,getAllLessons}=require("../controllers/lessons")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")

const lessoneRouter =express.Router()
lessoneRouter.post("/",authentication ,authorization("CREATE_LESSON"),createNewLesson)
lessoneRouter.get("/allLessons",getAllLessons)
module.exports=lessoneRouter