const products = require("../data/products");
const users = require("../data/users");
const Product = require("../model/productmodel/Productsmodel");
const User = require("../model/usermodel/userModel");
const mongoose = require("mongoose");
require("dotenv").config();
const colors = require("colors");
// const connectdb = require("../config/mongoose/Mongoose");

// connectdb();
const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    const uplodUsers = await User.insertMany(users);
    const adminUser = uplodUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log("data imported".green.inverse);
  } catch (error) {
    console.log("error found:", error);
  }
};
const deletingData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("deleted".red.inverse);
  } catch (error) {
    console.log("error found:", error);
  }
};

if (process.argv[2] === "upload") {
  importData();
} else {
  deletingData();
}
module.exports = { importData, deletingData };
