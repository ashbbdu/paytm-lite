const mongoose = require("mongoose");



const Courses = new mongoose.Schema({
    user :  {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    name : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("Courses" , Courses)