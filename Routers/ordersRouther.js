const express = require("express");
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
const router = express.Router();

router.use(authController.authenticateUser)

router
  .post("/", orderController.createNewOrder)  
  .get("/", orderController.getOrdersbyUserId);
  
router.get("/:date", orderController.sortByDate);


module.exports = router;
