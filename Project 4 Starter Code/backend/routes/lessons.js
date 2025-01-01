const express=require("express")
const {createNewLesson ,getAllLessonsByID,deleteLessonsById ,updateLessonById}=require("../controllers/lessons")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")

const lessoneRouter =express.Router()
lessoneRouter.post("/",authentication ,authorization("CREATE_LESSON"),createNewLesson)
lessoneRouter.get("/:id",getAllLessonsByID)
lessoneRouter.delete("/:id",authentication,deleteLessonsById)
lessoneRouter.put("/:id", authentication,updateLessonById)
module.exports=lessoneRouter