var express = require("express");
var router = express.Router();
const passport = require("passport");
const LocalStategy = require("passport-local");
const User = require("../models/userSchema");
const Restaurant = require("../models/restaurant");
const DISH = require("../models/dishSchema");
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

router.get("/profile", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate("Res");
    console.log(user);

    res.render("profile", { user });
  } catch (err) {
    console.log(err);
  }
});

router.get("/owner", isLoggedIn, async (req, res, next) => {
  res.render("owner");
});

router.post("/owner", isLoggedIn, async (req, res, next) => {
  let newRes = new Restaurant({
    ownerName: req.body.ownerName,
    resName: req.body.resName,
    address: req.body.address,
    number: req.body.number,
    resImg: req.body.resImg,
    createdBy: req.user._id,
  });

  await newRes.save();

  req.user.Res.push(newRes._id);
  await req.user.save();

  res.redirect("/users/profile");
});

router.get("/menu/:id", isLoggedIn, async (req, res, next) => {
  try {
    const dishes = await Restaurant.findById(req.user._id).populate("dish");
    console.log(dishes);

    res.render("menu", { dishes, id: req.params.id });
  } catch (err) {
    console.log(err);
  }
});

router.post("/dishes/:id", isLoggedIn, async (req, res, next) => {
  const { id } = req.params;

  const currRestaurant = await Restaurant.findById(id);

  let newDish = new DISH({
    dishName: req.body.dishName,
    dishImg: req.body.dishImg,
    dishPrice: req.body.dishPrice,
    category: req.body.category,
    dishcreatedby: req.user._id,
    Res: currRestaurant._id,
  });

  await newDish.save();
  console.log(newDish);
  currRestaurant.dish.push(newDish._id);
  await currRestaurant.save();
  res.redirect(`/users/menu/${id}`);
});

module.exports = router;
