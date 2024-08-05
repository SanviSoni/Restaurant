const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  dishName: String,
  dishImg: String,
  dishPrice: String,
  category: String,
  dishcreatedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  Res: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "res",
  },
});

const DISH = mongoose.model("dish", dishSchema);

module.exports = DISH;
