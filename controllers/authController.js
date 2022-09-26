const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const User = require("../models/userModel");
const { sendRes } = require("../helpers/sendRes");

const roles = {
  buyer:1,
  editor:2,
  admin:3,
}  

module.exports.roles = {
  buyer: "buyer",
  editor: "editor",
  admin: "admin",
}

const signJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

module.exports.signup = async (req, res) => {
  try {
    const { userName, password, email, birthday } = req.body;
    const newUser = await User.create({
      userName,
      password,
      email,
      birthday,
    });
    const token = signJWT(newUser._id);
    res.cookie("token", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, newUser, 201);
  } catch (err) {
    sendRes(res, err, 400, true);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePasswords(password)))
      throw new Error("Invalid Credentials");

    const token = signJWT(user._id);
    res.cookie("token", token, {
      secure: process.env.ENVIRONMENT !== "development",
      httpOnly: process.env.ENVIRONMENT !== "development",
    });
    sendRes(res, user, 200);
  } catch (err) {
    sendRes(res, err, 400, true);
    return
  }
};

module.exports.authenticateUser = async (req, res, next) => {
  try {
    const { token } = req.cookies; // ask for our token
    if (!token) throw new Error("please login to continue");
    const { id, exp } = jwt.verify(token, process.env.JWT_SECRET); // verify that exp and id are inside of token
    if (Math.floor(Date.now() / 1000) > exp)
      throw new Error("login expired, please login again"); //check if curr time > token exp
    const user = await User.findById(id); // find user throw user id inside of token
    if (!user) throw new Error("invalid user, please login again"); // err if no user
    req.user = user;
  } catch (err) {
    sendRes(res, err, 400, true);
    return //
  }
  
  next();
};

module.exports.restrics =  (desiredRole)=>{
  return function (req,res,next){
    const {user} = req;
    try{
      if (roles[user.role] < roles[desiredRole]) throw new Error("unauthorized");
    }catch (err) {
      sendRes(res, err, 401, true);
      return;
    }
    next()
  };} //resticts 
  
