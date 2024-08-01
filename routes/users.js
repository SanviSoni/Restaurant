var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStategy = require("passport-local");
const User = require("../models/userSchema");
const { isLoggedIn } = require("../middleware/auth");

passport.use(new LocalStategy(User.authenticate()));

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    const Uncangabel = { username, email };
    const encrypt = password;

    await User.register(Uncangabel, encrypt);
    res.redirect("/login");
  } catch (err) {
    console.log(err);
  }

  res.render("register");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/users/profile",
    failureRedirect: "/login",
  }),
  (req, res, next) => {}
);

router.get("/profile", isLoggedIn, (req, res, next) => {
  try {
    res.render("profile", { user: req.user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/owner", (req, res, next) => {
  res.render("owner");
});

module.exports = router;
