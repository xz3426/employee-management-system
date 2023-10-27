const db = module.require("../models");
const jwt = module.require("jsonwebtoken");

const signup = async (req, res, next) => {
  try {
    const { email, authorization, token } = req.body;
    if (authorization !== "hr") {
      const newUser = await db.Token.findOne({ user: email });
      if (!newUser) {
        const error = {
          message: "Invalid email/password",
          ok: false,
        };
        return res.status(400).json({ error });
      }
      const result = await newUser.compareToken(token);
      let isMatch = result.isMatch;
      let isOnTime = result.isOnTime;
      if (!isMatch) {
        const error = {
          message: "Incorrect Token",
          ok: false,
        };
        return res.status(400).json({ error });
      }
      if (!isOnTime) {
        const error = {
          message: "This token is no longer vaild, Please contact your HR",
          ok: false,
        };
        return res.status(400).json({ error });
      }
      // db.Token.deleteOne({user:email} );
      const filter = { user: email };
      const update = {
        $set: { registration: "Registered" },
      };
      await db.Token.updateOne(filter, update);
    }
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token1 = await jwt.sign(
      { id, username, authorization, profileImageUrl },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token1,
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
    const { id, USID } = req.body;
    const user = await db.User.findById(id);
    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        ok: false,
      });
    }
    user.USID = USID;

    user.userDetail = req.body;
    user.onBoardingApplication.status = "pending";
    if (req.body.profileImage) {
      user.profileImageUrl = req.body.profileImage;
    }

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
    const userId = req.params.userId;
    const user = await db.User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).json(user.userDetail);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await db.User.findById(userId, {
      "optRecipt.file.content": 0,
      "optEAD.file.content": 0,
      "I983.file.content": 0,
      "I20.file.content": 0,
    });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getUserApplicationStatus = async (req, res, next) => {
  try {
    const { userId, applicationName } = req.params;

    const user = await db.User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "user not found", ok: false });
    }
    if (parseInt(process.versions.node.split(".")[0]) >= 18) {
      // Code specific to Node.js 18
      var status = user[applicationName].status;
    } else {
      // Code for Node.js 16 and earlier
      var status = user[applicationName].status;
    }
    return res.status(200).json({ ApplicationStatus: status });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }
};

const getVisaStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await db.User.findById(userId, {
      "optRecipt.file.content": 0,
      "optEAD.file.content": 0,
      "I983.file.content": 0,
      "I20.file.content": 0,
    });
    if (!user) {
      return res.status(404).send({ message: "user not found", ok: false });
    }
    const { currentStep } = user;
    if (currentStep === "done") {
      return res
        .status(200)
        .json({ currentStep: "done", status: "done", feedback: "" });
    }
    const { status, feedback } = user[currentStep];
    return res
      .status(200)
      .json({ currentStep: currentStep, status: status, feedback: feedback });
  } catch (err) {
    console.log("efjwo");
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
  getUserById,
  getUserApplicationStatus,
  getVisaStatus,
};
