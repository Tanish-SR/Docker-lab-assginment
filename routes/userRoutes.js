const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signUp", userController.register);
router.post("/login", userController.login);

module.exports = router;