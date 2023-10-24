const express = require("express");
const router = express.Router();
const { sendToken, fetchAllUsers, searchUsers } = require("../handlers/hrwork");

router.post("/sendToken", sendToken);
router.get("/users", fetchAllUsers);
router.get("search/:key", searchUsers);

module.exports = router;