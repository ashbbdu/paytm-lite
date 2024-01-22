const mongoose = require("mongoose");



const Bank = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },  
    balance : {
        type : Number,
        required : true,
        default  : Math.floor(1 + Math.random() * 10000)
    },
})

module.exports = mongoose.model("Bank" , Bank)