const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  changePwd,
  updatePwd,
  submitOnboardingForm,
  getUserDetailById,
  getUserApplicationStatus,
} = require("../handlers/auth");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/changePwd", changePwd);
router.post("/updatePwd", updatePwd);
router.post("/submitOnboardingForm", submitOnboardingForm);
router.get("/userDetail/:id", getUserDetailById);
router.get("/:id", getUserApplicationStatus);
module.exports = router;
