const db = module.require("../models");
const jwt = module.require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    let user = await db.User.create(req.body);
    let { id, username, authorization, profileImageUrl } = user;
    let token = await jwt.sign(
      { id, username, authorization, profileImageUrl },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token,
    });
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      // Duplicate key error
      console.log(err.name);
      const error = {
        message: "This email is already registered.",
        ok: false,
      };

      return res.status(400).json({ error });
    } else {
      // Other errors
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await db.User.findOne({ email });
    if (!user) {
      const error = {
        message: "Invalid email/password",
        ok: false,
      };
      console.log(error);
      return res.status(400).json({ error });
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      let { id, username, authorization, profileImageUrl } = user;
      let token = await jwt.sign(
        { id, username, authorization, profileImageUrl },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token,
      });
    } else {
      const error = {
        message: "Invalid email/password",
        ok: false,
      };
      console.log(error);
      return res.status(400).json({ error });
    }
  } catch (err) {
    return next(err);
  }
};

const changePwd = async (req, res, next) => {
  const { email } = req.body;
  try {
    // Find the user by email
    const user = await db.User.findOne({ email });

    // Check if the user exists
    if (!user) {
      const error = {
        message: "User not found.",
        ok: false,
      };
      return res.status(400).json({ error });
    }

    // user.password = newPassword;

    // Respond with a success message
    return res
      .status(200)
      .json({ message: "User find successfully.", ok: true });
  } catch (err) {
    // Handle any errors
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const updatePwd = async (req, res, next) => {
  const { email, newPassword } = req.body;
  try {
    // Find the user by email
    const user = await db.User.findOne({ email });

    // Check if the user exists
    if (!user) {
      const error = {
        message: "User not found.",
        ok: false,
      };
      return res.status(400).json({ error });
    }

    user.password = newPassword;

    // Save the updated user object
    await user.save();

    // Respond with a success message
    return res
      .status(200)
      .json({ message: "Password updated successfully.", ok: true });
  } catch (err) {
    // Handle any errors
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const populateUserDetail = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await db.User.findById(id);
    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        ok: false,
      });
    }
    user.userDetail = req.body;
    await user.save();

    return res
      .status(200)
      .json({ message: "UserDetail updated successfully.", ok: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

module.exports = { signup, signin, changePwd, updatePwd, populateUserDetail };
