const express=require("express")
const {createNewLesson ,getAllLessonsByID,deleteLessonsById ,updateLessonById,findLessonsByTitle}=require("../controllers/lessons")
const authentication=require("../middleware/authentication")
const authorization = require("../middleware/authorization")
const{addToFavorite ,getAllFav ,deleteFvById}=require("../controllers/favorites")

const lessoneRouter =express.Router()
lessoneRouter.post("/",authentication ,authorization("CREATE_LESSON"),createNewLesson)
lessoneRouter.get("/:id",authentication,authorization("GET_ALL_LESSON"), getAllLessonsByID)
lessoneRouter.delete("/:id",authentication, authorization("DELETE_LESSON"),deleteLessonsById)
lessoneRouter.put("/:id", authentication,authorization("UPDETE_LESSONE") ,updateLessonById)
lessoneRouter.post("/:id/favorite",authentication ,addToFavorite)
lessoneRouter.get("/fav/favorite",authentication, getAllFav)
lessoneRouter.delete("/:id/favorite",authentication,deleteFvById)
lessoneRouter.get("/:id/search",authentication, findLessonsByTitle)




module.exports=lessoneRouter