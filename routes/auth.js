const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const authenticate = require("../middleware");
const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", authController.register);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", authController.login);

module.exports = router;
