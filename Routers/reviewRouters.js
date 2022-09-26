const express = require("express");
const reviewControler = require("../controllers/reviewControler");
const authController = require("../controllers/authController")
const router = express.Router();

router.use(authController.authenticateUser, reviewControler.checkIfProductExist)


router
  .route("/:productId")
  .post(reviewControler.creatNewReview);

module.exports = router;
