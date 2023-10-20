const db = module.require("../models");

const postUserFiles = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    db.User.fileIds.push(req.file.id);
    await user.save();

    res.status(200).send("File uploaded and associated with user");
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

module.exports = { postUserFiles };
