const mongoose = require("mongoose");
const productOrder = new mongoose.Schema({
  product: { type: moongoose.Schema.ObjectId, ref: "products", required: true },
  amount: { type: Number, required: ture },
});

const orderSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now() },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "products",
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
          validate: {
            validator: function (val) {
              val = String(val);
              return !val.includes(".");
            },
            message: "amount cant be float",
          },
        },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
