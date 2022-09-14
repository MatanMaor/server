const express = require("express");
const orderController = require("../controllers/orderController");
const router = express.Router();

router
  .post("/", orderController.createNewOrder)
  .get("/", orderController.getOrdersbyUserId);

router.get("/:id", orderController.sortByDate)  
module.exports = router;
