const express = require("express");
const products = require("../../data/products");
const {
  fetchallproducts,
  fetchsingleproduct,
  Createproduct,
  Editproduct,
  ProductDelete,
  createReview,
  editReview,
  deleteReview,
  GetReview,
  Topproducts,
} = require("../../control/ProductController/ProductControl");
const Authentication = require("../../middleware/AuthenticationMiddleware");
const Admin = require("../../middleware/Admin");
const Upload = require("../../config/multer/Multer");
const UserRouter = express.Router();

//for all products
UserRouter.get("/", fetchallproducts);
//! top rated products
UserRouter.get("/highrating", Topproducts);
// for single product
UserRouter.get("/:id", fetchsingleproduct);
// create a product
UserRouter.post(
  "/Private/Admin",
  Authentication,
  Admin,
  Upload.single("image"),
  Createproduct
);
// edit a product
UserRouter.put(
  "/Edit/:id",
  Authentication,
  Admin,
  Upload.single("image"),
  Editproduct
);
// delete the post
UserRouter.delete("/ProductDelete/:id", Authentication, Admin, ProductDelete);
//!create a review
UserRouter.post("/review/:id", Authentication, createReview);
//!get a reviews
UserRouter.get("/review/:id", Authentication, GetReview);
//!edit a review
UserRouter.put("/reviewEdit/:id", Authentication, editReview);
//!delete a review
UserRouter.delete("/reviewDelete/:id", Authentication, deleteReview);

module.exports = UserRouter;
