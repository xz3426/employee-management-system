const express = require("express");
const router = express.Router();
const { signup, signin, changePwd,updatePwd } = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/changePwd", changePwd);
router.post("/updatePwd", updatePwd);
module.exports = router;
