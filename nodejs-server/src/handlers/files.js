const db = module.require("../models");
const fs = require("fs").promises;

const postUserFiles = async (req, res, next) => {
  // Fetch the user with the provided ID
  const user = await db.User.findById(req.params.userId);
  console.log(req.file);
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
    user.files.push({
      originalName: req.file.originalname,
      encoding: req.file.encoding,
      mimetype: req.file.mimetype,
      content: encodedFile,
    });

    await user.save();
    await fs.unlink(req.file.path); // Delete the temporary file

    res.status(200).send({
      message: "File uploaded and associated with user",
      index: user.files.length - 1,
    });
  } catch (error) {
    await fs.unlink(req.file.path); // Ensure temporary file gets deleted in case of an error
    res.status(500).send("Error: " + error.message);
  }
};

const getUserFilesInfo = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.userId, {
      "files.content": 0,
    });
    if (!user) {
      return res.status(404).send("User not found");
    }
    // Send the files information related to the user
    res.status(200).json(user.files);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

const downloadFileById = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const file = user.files.id(req.params.fileId);

    // Convert the Base64 encoded content back to a buffer
    const fileBuffer = Buffer.from(file.content, "base64");

    // Set the proper content type
    res.contentType(file.mimetype);
    res.send(fileBuffer);
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

const deleteFileByIndex = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    const fileIndex = parseInt(req.params.fileIndex, 10);
    if (isNaN(fileIndex) || fileIndex < 0 || fileIndex >= user.files.length) {
      return res.status(400).send("Invalid file index");
    }

    // Remove the file at the given index
    user.files.splice(fileIndex, 1);

    // Save the updated user data
    await user.save();

    res.status(200).send("File deleted successfully");
  } catch (error) {
    res.status(500).send("Server Error: " + error.message);
  }
};

module.exports = {
  postUserFiles,
  getUserFilesInfo,
  downloadFileById,
  deleteFileByIndex,
};
