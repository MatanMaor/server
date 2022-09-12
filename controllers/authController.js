const User = require("../models/userModel");
const { sendRes } = require("../helpers/sendRes");

module.exports.signup = async (req, res) => {
  try {
    const { userName, password, email, birthday } = req.body;
    const newUser = await User.create({
      userName,
      password,
      email,
      birthday,
    });
    sendRes(res, newUser, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
