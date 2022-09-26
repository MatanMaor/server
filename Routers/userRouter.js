const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController")

const { roles } = require("../controllers/authController");

const router = express.Router();

router.use(authController.authenticateUser, authController.restrics(roles.admin))

router
  .route("/")
  .get(userController.getAllUsers)
  .delete(userController.deleteUserById)
  .put(userController.updateUser);

  router.put("/promote", userController.updateRole);
  router.route("/:id").get(userController.getUserById);

module.exports = router;
