const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router
  .route("/")
  .get(userController.getAllUsers)
  .delete(userController.deleteUserById)
  .put(userController.updateUser);

  router.put("/promote", userController.updateRole);
  router.route("/:id").get(userController.getUserById);

module.exports = router;
