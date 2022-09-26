const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup);

// router.use(authController.authenticateUser);

router.post("/login", authController.login);

module.exports = router;
