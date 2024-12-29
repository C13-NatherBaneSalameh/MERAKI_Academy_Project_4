const express=require("express")
const {createNewLesson}=require("../controllers/lessons")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")

const lessoneRouter =express.Router()
lessoneRouter.post("/",authentication ,authorization("CREATE_LESSON"),createNewLesson)
module.exports=lessoneRouter