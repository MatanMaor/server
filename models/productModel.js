const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: [true, "must have name"],
    },
    price: {
      type: Number,
      required: true,
      //if price == 0 = return "free to play"
    },
    publisher: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    // systemRequirements:{ create a new system requiremntets and populate each other

    // },
    images: [String],
    description: {
      type: String,
      required: [true, "please enter description"],
      minlength: 0,
    },
    categories: {
      type: String,
      enum: [
        "Action",
        "rpg",
        "stratagy",
        "adventure",
        "sports&racing",
        "first-person shooter",
        "casual",
      ],
      minlength: [1, "please provide non epmty category"],
      maxlength: [20, "category can't be longer then 20 characters"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("reviews", {
  localField: "_id",
  foreignField: "product",
  ref: "review",
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
