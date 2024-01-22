const mongoose = require("mongoose");



const User = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Courses"
        }
    ]
    // balance : {
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "Bank",
    //     required : true,
    //     default  : Math.floor(1 + Math.random() * 10000)
    // }
})

module.exports = mongoose.model("User" , User)