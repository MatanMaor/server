const mongoose = require("mongoose");
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const { sendRes } = require("../helpers/sendRes");

module.exports.checkIfProductExist = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) throw new Error("product does not exist");
    req.product = product;
  } catch (err) {
    sendRes(res, err, 400, true);
  }
  next();
};

module.exports.creatNewReview = async (req, res) => {
  try {
    const { title, description, stars, reviewer } = req.body;
    const newReview = await Review.create({
      title,
      description,
      stars,
      //product: req.product._id,
      product: req.params.productId,
      reviewer,
    });
    sendRes(res, newReview, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
