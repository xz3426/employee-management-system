const mongoose = require("mongoose");

const { Schema } = mongoose;

const tokenSchema = new Schema({
    hr: {
        type: String,
        unique: true,
        retqure: true,
    },

    user: {
        type: String,
        unique: true,
        require: true,
    },

    token: {
        type: String,
        unique: true,
        require: true,
    },

    createTime: {
        type: Date,
        require: true,
    }
});


tokenSchema.methods.compareToken = async function (candidateToken, next) {
    try {
        let isMatch1 = candidateToken === this.token;
        console.log("isMatch1", isMatch1);
        let isOnTime1 = (Date.now() - this.createTime)/3600000 <= 3;
        return {isMatch: isMatch1, isOnTime: isOnTime1};
    } catch (err) {
      return next(err);
    }
  };

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;