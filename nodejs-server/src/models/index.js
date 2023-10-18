const mongoose = require("mongoose");
const User = require("./user");
const Token = require("./token");
mongoose.connect(process.env.MONGODB_URI);

module.exports = { User, Token };
