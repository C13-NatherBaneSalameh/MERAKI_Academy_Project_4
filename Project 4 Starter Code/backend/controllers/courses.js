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

module.exports={
    createNewCourse
}