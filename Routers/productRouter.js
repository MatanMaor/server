const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const router = express.Router();

const { roles } = require("../controllers/authController");

router
  .route("/")
  .post(
    authController.authenticateUser,
    authController.restrics(roles.editor),
    productController.createNewProduct
  )
  .get(productController.getAllProducts);

router
  .route("/:id")
  .all(productController.checkValidId)
  .get(productController.getProductById)
  .delete(authController.authenticateUser,authController.restrics(roles.admin),productController.deleteProductById)
  .put(authController.authenticateUser,authController.restrics(roles.editor),productController.updateProduct);

module.exports = router;
