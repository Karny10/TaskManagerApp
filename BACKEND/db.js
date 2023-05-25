const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://kartik:kartik@cluster0.w8iuwa9.mongodb.net/";

const connectToMongo = ()=>{
    mongoose.connect(mongoURI);
    console.log("connect to mongo successfully");
}

module.exports = connectToMongo;