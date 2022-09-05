const express = require("express");
const reviewControler = require("../controllers/reviewControler");
const router = express.Router();

router
  .route("/:productId")
  .all(reviewControler.checkIfProductExist)
  .post(reviewControler.creatNewReview);

module.exports = router;
