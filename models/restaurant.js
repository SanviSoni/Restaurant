const mongoose = require("mongoose");

const resSchema = new mongoose.Schema({
  ownerName: String,
  resName: String,
  address: String,
  resImg: String,
  number: {
    type: String,
    maxLength: 10,
    minLength: 10,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  dish: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dish",
    },
  ],
});

const Restaurant = mongoose.model("res", resSchema);

module.exports = Restaurant;
