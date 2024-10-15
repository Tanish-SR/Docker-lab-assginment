const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/")
    .get(userController.getAllUsers)

router.route("/:id")
    .get(userController.getOneUser)
    .put(userController.updateUserPassword)
    .delete(userController.deleteUser);

router.post("/signUp", userController.register);
router.post("/login", userController.login);

module.exports = router;