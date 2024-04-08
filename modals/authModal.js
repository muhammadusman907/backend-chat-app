const mongoose = require("../db/index.js");
const Schema = mongoose.Schema;
const model = mongoose.model;

const authSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AuthModal = model("users", authSchema);
module.exports = {
 AuthModal,
};

//   userName ,
//   signupEmail ,
//   signupPassword

//   var UserSchema = new Schema({
//     username: { type: String, required: true, index: { unique: true } },
//     password: { type: String, required: true },
//   });
