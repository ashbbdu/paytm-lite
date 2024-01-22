const express = require("express");
const app = express();
const userRoutes = require("./routes/userRoutes")
const bankRoutes = require("./routes/bankRoutes")
const cors = require("cors");
const bodyParser = require("body-parser");
const { connect } = require("./database");
app.use(bodyParser());
app.use(cors())
const PORT = 4000;


connect();
app.get("/" , (req , res) => {
    res.send("App is up and running")
})

app.use("/api/v1/user" , userRoutes)
app.use("/api/v1/bank" , bankRoutes)



app.listen(PORT , () => {
    console.log(`App is running on port ${PORT}`);
})


