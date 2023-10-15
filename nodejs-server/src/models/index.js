const mongoose = require("mongoose");
const User = require("./user");
mongoose.connect(process.env.MONGODB_URI);

module.exports = { User };
