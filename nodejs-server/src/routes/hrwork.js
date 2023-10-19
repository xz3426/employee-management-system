const express = require("express");
const router = express.Router();
const { sendToken } = require("../handlers/hrwork");

router.post("/sendToken", sendToken);

module.exports = router;