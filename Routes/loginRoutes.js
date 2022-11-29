//importing modules
const express = require("express");
const router = express.Router();
const AuthController = require("../Controllers/authController");

router.post("/auth/login", AuthController.login);

module.exports = router;
