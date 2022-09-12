const express = require("express");
const productController = require("../controllers/productController");
const router = express.Router();
router
  .route("/")
  .post(productController.createNewProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .all(productController.checkValidId)
  .get(productController.getProductById)
  .delete(productController.deleteProductById)
  .put(productController.updateProduct);

module.exports = router;
