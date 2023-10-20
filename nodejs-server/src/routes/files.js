const express = require("express");
const router = express.Router();
const upload = require("../middlewares/files");

const { postUserFiles } = require("../handlers/files");

router.post("/:id", upload.single("file"), postUserFiles);

module.exports = router;
