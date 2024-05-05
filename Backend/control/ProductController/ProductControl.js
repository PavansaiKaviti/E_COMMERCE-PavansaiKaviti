const Product = require("../../model/productmodel/Productsmodel");
const Review = require("../../model/reviewmodel/reviewModel");
const appEr = require("../../utils/appEr");
const asyncHandler = require("express-async-handler");

//fetch all products
const fetchallproducts = async (req, res, next) => {
  try {
    const pageSize = 3; //count of products
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    if (products.length === 0) {
      return next(appEr("no products here"));
    }
    return res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    return next(appEr(error.message));
  }
};
//fetch single post
const fetchsingleproduct = async (req, res, next) => {
  const { id } = req.params;
  const found = await Product.findById(id).populate({
    path: "reviews",
    populate: { path: "user" },
  });
  try {
    if (!found) {
      return next(appEr("no product found"));
    }
    res.send(found);
  } catch (error) {
    return next(appEr(error.message));
  }
};
//creating a post for admin
const Createproduct = asyncHandler(async (req, res, next) => {
  try {
    const { name, price, brand, category, countInStock, description } =
      req.body;
    const newProduct = await Product({
      name,
      price,
      user: req.user._id,
      image: req.file.path,
      brand,
      category,
      countInStock,
      description,
    });
    await newProduct.save();
    res.json({ message: "Product Created successfully" });
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//edit a product
const Editproduct = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, brand, category, countInStock, description } =
      req.body;
    const findone = await Product.findById(id);
    const path = req.file ? req.file.path : findone.image;
    await Product.findByIdAndUpdate(id, {
      name,
      price,
      brand,
      image: path,
      user: req.user._id,
      category,
      countInStock,
      description,
    });
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//delete a delete
const ProductDelete = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const DeletePost = await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted Successfully" });
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//!Review

//create a Review//!Done
const createReview = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params; //product id
    const { rating, comment } = req.body;
    if (!rating && !comment) {
      return res.json({ message: "All fields are required" });
    }
    const Productfound = await Product.findById(id);
    if (Object.keys(Productfound).length !== 0) {
      const commentcreated = await Review.create({
        user: req.user._id,
        rating,
        comment,
        product: Productfound._id,
      });
      Productfound.reviews.push(commentcreated._id);
      Productfound.save();
      res.send({ message: "Review Submited" });
    }
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//edit a Review//!done
const editReview = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    await Review.findByIdAndUpdate(id, { rating, comment });
    res.json({ message: "Comment Updated" });
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//delete a Review//!done
const deleteReview = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedcomment = await Review.findByIdAndDelete(id);
    const productFind = await Product.findById(deletedcomment.product);
    const index = productFind.reviews.indexOf(id);
    if (index !== -1) {
      productFind.reviews.splice(index, 1);
      await productFind.save();
      res.json({ message: "Comment Deleted" });
    } else {
      res.json({ message: "Review not found" });
    }
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});
//Get a Review//!done
const GetReview = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const commentFound = await Review.findById(id);
    res.json(commentFound);
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});

const Topproducts = asyncHandler(async (req, res, next) => {
  try {
    const Products = await Product.find({ rating: { $gte: 3.5 } }).limit(3);
    res.send(Products);
  } catch (error) {
    return next(appEr(error.message, 404));
  }
});

module.exports = {
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
};
