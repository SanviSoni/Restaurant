var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/register", (req, res, next) => {
  res.render("register");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.get("/owner", (req, res, next) => {
  res.render("owner");
});
module.exports = router;
