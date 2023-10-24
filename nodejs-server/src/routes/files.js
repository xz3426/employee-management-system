const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  postUserFiles,
  getUserFilesInfo,
  downloadFileByType,
  deleteFile,
} = require("../handlers/files");

const upload = multer({ dest: "temp/" }); // Temporarily store files for processing

router.post("/:userId/:fileType", upload.single("file"), postUserFiles);
router.get("/:userId", getUserFilesInfo);
router.get("/:userId/:fileType", downloadFileByType);
router.delete("/:userId/:fileType", deleteFile);

module.exports = router;
