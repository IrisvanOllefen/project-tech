const mongoose = require("mongoose");

// declares schema
const Schema = mongoose.Schema;

// creates new schema for user
const UserSchema = new Schema({
  name: String,
  age: Number,
});

// registers UserSchema with mongoose
const UserModel = mongoose.model("User", UserSchema);

// makes UserModel available to be required in my index.js
module.exports = UserModel;
