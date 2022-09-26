const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20,
      unique: [true, "must have a unique user name"],
      trim: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 16,
      required: true,
      trim: true,
      select: false,
    },
    email: {
      type: String,
      required: [true, "you must enter a valid email"],
      uniqe: [true, "email already in use"],
      minlength: [6, "please provide non epmty email"],
      maxlength: [50, "email too long"],
      validate: [validator.isEmail, "invalid email"],
    },
    birthday: { Date },
    confirmPassword: {},
    active: { type: Boolean, defult: true },
    role: {
      type: String,
      required: true,
      enum: ["buyer", "editor", "admin"],
      default: "buyer",
    },
  }
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);

// userSchema.virtual("reviews", {
//   localField: "_id",
//   foreignField: "user",
//   ref: "review",
// });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
  next();
});

userSchema.methods.comparePasswords = async function (rawPassword) {
  return await bcrypt.compare(rawPassword, this.password);
};

const Users = mongoose.model("user", userSchema);

module.exports = Users;
