const mongoose = require("mongoose");

const resSchema = new mongoose.Schema({
  ownerName: String,
  restaurantName: String,
  address: String,
  number: {
    type: String,
    maxLength: 10,
    minLength: 10,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Restaurant = mongoose.model("res", resSchema);

module.exports = Restaurant;
