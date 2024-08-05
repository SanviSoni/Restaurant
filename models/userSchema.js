const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  resImg: String,
  Res: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "res",
    },
  ],
});

userSchema.plugin(plm);
const User = mongoose.model("user", userSchema);

module.exports = User;
