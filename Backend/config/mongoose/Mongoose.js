const mongoose = require("mongoose");
const Product = require("../../model/productmodel/Productsmodel");
const Review = require("../../model/reviewmodel/reviewModel");
const User = require("../../model/usermodel/userModel");
const Oder = require("../../model/odermodel/oderModel");
const colors = require("colors");
//models
Oder();
User();
Product();
Review();
//connect mongoodb
const connectdb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("data base connected".green.inverse);
  } catch (error) {
    console.log("error found:", error);
  }
};
//exporting
module.exports = connectdb;
