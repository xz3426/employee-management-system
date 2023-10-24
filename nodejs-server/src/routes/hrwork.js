const express = require("express");
const router = express.Router();
const { sendToken, fetchTokens, generateUser, deleteToken, fetchUsers } = require("../handlers/hrwork");

router.post("/sendToken", sendToken);
router.post("/generateUser", generateUser);
router.get("/fetchTokens", fetchTokens);
router.post("/deleteToken", deleteToken);
router.get("/fetchUsers", fetchUsers);

module.exports = router;