const mongoose = require("mongoose")

module.exports.connect = () => {
    // mongoose.connect("mongodb+srv://ashishsrivastava7007:RwmEhgUiBZoF4Miw@cluster0.ukj0utk.mongodb.net/paytm").then(console.log("DB Connected"))
    mongoose.connect("mongodb://localhost:27017/paytm").then(console.log("DB connected"))
}

