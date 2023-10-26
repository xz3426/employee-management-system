const db = module.require("../models");
const fs = require("fs").promises;

const postUserFiles = async (req, res, next) => {
  // Fetch the user with the provided ID
  const { userId, fileType } = req.params;
  const user = await db.User.findById(userId);
  //If user doesn't exist, return an error
  if (!user) {
    return res.status(400).send("User not found");
  }

  try {
    // Read file contents
    const fileBuffer = await fs.readFile(req.file.path);
    // Convert file contents to Base64
    const encodedFile = fileBuffer.toString("base64");
    // Store the encoded file and related details in MongoDB
    console.log(fileType);
    user[fileType].file = {
      originalName: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      content: encodedFile,
    };
    user[fileType].status = "pending";
    await user.save();
    await fs.unlink(req.file.path); // Delete the temporary file

    res.status(200).send({
      message: "File uploaded and associated with user",
      fileType: fileType,
    });
  } catch (error) {
    await fs.unlink(req.file.path); // Ensure temporary file gets deleted in case of an error
    res.status(500).send("Error: " + error.message);
  }
};

const getUserFilesInfo = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.userId, {
      "optRecipt.file.content": 0, // exclucde optRecipt.file field
      "optEAD.file.content": 0,
      "I983.file.content": 0,
      "I20.file.content": 0,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Send the files information related to the user
    res.status(200).json({
      optRecipt: user.optRecipt,
      optEAD: user.optEAD,
      I983: user.I983,
      I20: user.I20,
    });
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

const downloadFileByType = async (req, res, next) => {
  try {
    const { userId, fileType } = req.params;
    const user = await db.User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const file = user[fileType].file;
    // Convert the Base64 encoded content back to a buffer
    const fileBuffer = Buffer.from(file.content, "base64");

    // Set the proper content type
    res.contentType(file.mimetype);
    res.send(fileBuffer);
  } catch (error) {
    console.log(123123);
    res.status(501).send("Server Error: " + error.message);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { userId, fileType } = req.params;
    const user = await db.User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }
    user[fileType].file = {};
    user[fileType].status = "never";
    // Save the updated user data
    await user.save();
    res.status(200).send({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Server Error: " + error.message });
  }
};

module.exports = {
  postUserFiles,
  getUserFilesInfo,
  downloadFileByType,
  deleteFile,
};
