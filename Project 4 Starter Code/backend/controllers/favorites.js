const favoriteModel = require("../models/favorites");
const lessonsModel = require("../models/lessons");
const addToFavorite = (req, res) => {
  const favOwner = req.token.userId;
  const favItem = req.params.id;

  const newFavorite = new favoriteModel({ favOwner, favItem });

  newFavorite
    .save()
    .then((result) => {
          res.status(201).json({
            success: true,
            message: "Item added to favorite ",
            favorite: result
    })})
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};
const getAllFav=(req,res)=>{
    const userId=req.token.userId
    favoriteModel
    .find({favOwner:userId})
    .populate("favItem")
    .then((result)=>{
        res.status(200).json({
            success: true,
            message:" All the favorite",
            favorite: result,
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
const deleteFvById = (req, res) => {
    // ال id 
    // لل فايفورت الي بدي امسحها وحبعثها بالبارامز 
    const id = req.params.id;
  
    favoriteModel
      .findOneAndDelete({ favItem: id })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "favItem deleted ",
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server Error",
          err: err.message,
        });
      });
  };
module.exports = { addToFavorite ,getAllFav,deleteFvById };