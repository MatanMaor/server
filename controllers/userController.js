const User = require("../models/userModel");
const { sendRes } = require("../helpers/sendRes");
const { makeFilterObject } = require("../helpers/makeFilterObject");

module.exports.getAllUsers = async (req, res) => {
  const filterObject = makeFilterObject(req.query);
  try {
    const users = await User.find(filterObject);
    sendRes(res, users, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("id does not exist");
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.deleteUserById = async (req, res) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete(id);
    sendRes(res, "deleted successfully", 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.updateRole = async (req, res) => {
  const { id, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
        runValidators: true,
      }
    );
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.updateUser = async (req, res) => {
  const { id, userName, email } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { userName, email },
      {
        new: true,
        runValidators: true,
      }
    );
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};
