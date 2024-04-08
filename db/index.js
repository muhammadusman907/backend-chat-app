const mongoose = require("mongoose");
require("dotenv/config");
console.log(process.env.API_KEY + "");
mongoose.connect(process.env.API_KEY);
module.exports = mongoose;
