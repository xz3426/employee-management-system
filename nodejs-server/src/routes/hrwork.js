const express = require("express");
const router = express.Router();
const { sendToken, fetchTokens, generateUser, deleteToken, fetchUsers, fetchAllUsers, searchUsers, manageDoc } = require("../handlers/hrwork");

router.post("/sendToken", sendToken);
router.post("/generateUser", generateUser);
router.get("/fetchTokens", fetchTokens);
router.delete("/deleteToken", deleteToken);
router.get("/fetchUsers", fetchUsers);
router.get("/fetchAllUsers", fetchAllUsers);
router.get("/search/:key", searchUsers);
router.post("/manageDoc", manageDoc);
module.exports = router;