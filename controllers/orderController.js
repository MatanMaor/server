const Order = require("../models/orderModel.js");
const User = require("../models/userModel.js");
const Product = require("../models/productModel.js");
const { sendRes } = require("../helpers/sendRes");

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
  let { date } = req.param;
  let { id } = req.body;
  try {
    let orders = await Order.find({ user: id }).sort({updated_at:-1})
    sendRes(res, orders , 200);
    }
   catch (err) {
    sendRes(res, err, 400, true);
  }
};

// date: { $gte: ISODate("2022-01-01"), $lt: ISODate("2022-09-14") }
