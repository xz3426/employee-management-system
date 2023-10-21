const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  postUserFiles,
  getUserFilesInfo,
  downloadFileById,
} = require("../handlers/files");

const upload = multer({ dest: "temp/" }); // Temporarily store files for processing

router.post("/:userId", upload.single("file"), postUserFiles);
router.get("/:userId", getUserFilesInfo);
router.get("/:userId/:fileId", downloadFileById);

module.exports = router;
