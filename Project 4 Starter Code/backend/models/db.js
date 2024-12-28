const mongoose = require("mongoose");
mongoose
.connect(process.env.DB_URI)
.then(()=>{
console.log("connected db");

}).catch((err)=>{
    console.log(err);
    
})