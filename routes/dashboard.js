const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {dashboard}=require("../controllers/dashboard");

router.get("/:userId",dashboard);

module.exports = router;
