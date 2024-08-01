const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  Res: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"res"
    },
  ],
});

userSchema.plugin(plm);
const User = mongoose.model("User", userSchema);

module.exports = User;
