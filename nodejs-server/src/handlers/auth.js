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

const submitOnboardingForm = async (req, res, next) => {
  try {
    const { id, USID, ApplicationStatus } = req.body;
    const user = await db.User.findById(id);
    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        ok: false,
      });
    }
    console.log(req.body);
    user.USID = USID;
    user.userDetail = req.body;
    user.ApplicationStatus = req.body.ApplicationStatus;
    await user.save();

    return res
      .status(200)
      .json({ message: "UserDetail updated successfully.", ok: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
};

const getUserDetailById = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    console.log(user);
    return res.status(200).json(user.userDetail);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getUserApplicationStatus = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await db.User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).json({ ApplicationStatus: user.ApplicationStatus });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

module.exports = {
  signup,
  signin,
  changePwd,
  updatePwd,
  submitOnboardingForm,
  getUserDetailById,
  getUserApplicationStatus,
};
