const courseModel=require("../models/courses")
const createNewCourse = (req, res) => {
  const { title, description, img } = req.body;
  console.log( "llll:", req);
  
  const teacherId=req.token.userId
  const newCourse= new courseModel({
    title,
    description,
    img,
    teacherId
})
newCourse.save()
.then((course) => {
    res.status(201).json({
      success: true,
      message: `Course created`,
      article: course,
    });
  })
  .catch((err) => {
    res.status(500).json({
      success: false,
      message: `Server Error`,
      err: err.message,
    });
  });
};

const getAllCourse=(req,res)=>{
  const teacherId=req.token.userId
  courseModel
  .find({})
  .then((result)=>{
    console.log("rererere:",result);
    
    res.status(200).json({
      success: true,
      message:" All the course",
      courses: result,
      teacherId:teacherId,

    })
  }).catch((err)=>{
  res.status(500).json({
    success: false,

message: "Server Error",

err:err.message
  })
  })
};

const deleteCourseById =(req,res)=>{
  const id =req.params.id
  courseModel
  .deleteOne({_id:id})
  .then((result)=>{
    res.status(200).json({
      success: true,
      message: "Course deleted "
    })
  })
  .catch((err)=>{
    res.status(500).json({
      success: false,
      message: "Server Error",
      err:err.message


    })
  })
}
module.exports={
    createNewCourse,
    getAllCourse,deleteCourseById
}