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

module.exports = { addToFavorite ,getAllFav };