const Order = require("../models/orderModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const { sendRes } = require("../helpers/sendRes");
const { makeFilterObject } = require("../helpers/makeFilterObject");

module.exports.createNewOrder = async (req, res) => {
  const { user, products } = req.body;
  try {
    const order = await Order.create({ user, products });
    sendRes(res, order, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getOrdersbyUserId = async (req, res) => {
  const { id } = req.query;
  try {
    let orders = await Order.find({ user: id })
      .populate({
        path: "user",
        select: "email -_id",
      })
      .populate({
        path: "products",
        populate: {
          path: "product",
          select: "name price amount",
        },
      })
      .lean();
    orders = orders.map((order) => {
      order.totalPrice = order.products.reduce((prev, curr) => {
        prev += curr.product.price * curr.amount;
        return prev;
      }, 0);
      return order;
    });
    sendRes(res, orders, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.sortByDate = async (req, res) => {
  try {
    const sentDate = makeFilterObject(req.query);
    console.log(sentDate);
    let orders = await Order.find({date: sentDate}).sort({date:1});
    sendRes(res, orders, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

// // date: { $gte: ISODate("2022-01-01"), $lt: ISODate("2022-09-14") }
// // Find episodes that aired on this exact date
// return Episode.find({ date: new Date(refDate) }).
//   then(episodes => {
//     episodes[0].title; // "Where No One Has Gone Before"
//     // Find episodes within a range of dates, sorted by date ascending
//     return Episode.
//       find({ date: { $gte: refDate, $lte: '1987-10-26' } }).
//       sort({ date: 1 });
//   }).
//   then(episodes => {
//     episodes[0].title; // "The Last Outpost"
//     episodes[1].title; // "Where No One Has Gone Before"
//   });
