const mongoose = require("mongoose");
const favoriteSchema = new mongoose.Schema({
  favItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson",
  },
  favOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
const  favoriteModel = mongoose.model("Favorite", favoriteSchema);

module.exports = favoriteModel;
