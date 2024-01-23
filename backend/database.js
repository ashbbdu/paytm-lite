const mongoose = require("mongoose")

module.exports.connect = () => {
    mongoose.connect("mongodb+srv://ashishsrivastava7007:RwmEhgUiBZoF4Miw@cluster0.ukj0utk.mongodb.net/paytm").then(console.log("DB Connected"))
}

