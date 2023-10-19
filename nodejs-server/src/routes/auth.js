const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  changePwd,
  updatePwd,
  populateUserDetail,
  getUserDetailById,
} = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/changePwd", changePwd);
router.post("/updatePwd", updatePwd);
router.post("/populateUserDetail", populateUserDetail);
router.get("/userDetail/:id", getUserDetailById);
module.exports = router;
