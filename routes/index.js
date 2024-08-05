var express = require("express");
var router = express.Router();
const User = require("../models/userSchema");
const { isLoggedIn } = require("../middleware/auth");
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

// router.get("/dishes/:id", isLoggedIn, (req, res, next) => {
//   const { id } = req.params.id;
//   res.render("dishes", { id });
// });

router.get("/dishes/:id", (req, res, next) => {
 
  res.render("dishes", { id: req.params.id });
});
module.exports = router;
