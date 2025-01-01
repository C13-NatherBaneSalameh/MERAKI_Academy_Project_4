const express=require("express")
const {createNewLesson ,getAllLessonsByID,deleteLessonsById ,updateLessonById}=require("../controllers/lessons")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")

const lessoneRouter =express.Router()
lessoneRouter.post("/",authentication ,authorization("CREATE_LESSON"),createNewLesson)
lessoneRouter.get("/:id",authentication,authorization("GET_ALL_LESSON"), getAllLessonsByID)
lessoneRouter.delete("/:id",authentication, authorization("DELETE_LESSON"),deleteLessonsById)
lessoneRouter.put("/:id", authentication,authorization("UPDETE_LESSONE") ,updateLessonById)
module.exports=lessoneRouter