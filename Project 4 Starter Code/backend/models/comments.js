const mongoose = require("mongoose");
const commentSchema  =new mongoose.Schema({
    comment:{
        type: String,
        required: true,
    },
    commenter:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    // nameCommenter:{
    //     mongoose.Schema.Types.String ,ref:"User"
    // }

})
const commentModel=mongoose.model("Comment",commentSchema) 

module.exports=commentModel;