const mongoose = require("mongoose");

//define the schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  email: { type: String, required: true, unique: true },

  password: { type: String, required: true, hashed: true },

  phoneNumber: { type: String, required: true },

  gender: { type: String, required: true },

  dateOfBirth: { type: Date, required: true },
});

//create the model
const User = mongoose.model("User", userSchema);
module.exports = User;
