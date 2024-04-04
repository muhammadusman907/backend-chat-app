import express from "express";
import mongoose from "../db/index.js";
const { Schema, model } = mongoose;

const authSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const AuthModal = model("users", authSchema);
export default AuthModal;
//   userName ,
//   signupEmail ,
//   signupPassword

//   var UserSchema = new Schema({
//     username: { type: String, required: true, index: { unique: true } },
//     password: { type: String, required: true },
//   });
