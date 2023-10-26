const db = module.require("../models");
const jwt = module.require("jsonwebtoken");
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'jirenmao3@gmail.com',
      pass: 'fmts qwpo uxvg pher',
    },
  });


const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^*';
  let token = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
};

const sendToken = async (req, res, next) => {
    const {user} = req.body;
    console.log(user);
    try{
        const token = generateToken();
        const mailOptions = {
            from: 'jirenmao3@gmail.com',
            to: user,
            subject: 'Hello from Chuwa',
            text: 'http://localhost:3000/signup?token='+token,
            
          };
          
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
        });
        // tokenRecord = {
        //     hr: hr,
        //     user: user,
        //     token: token,
        //     createTime: Date.now()
        // };
        const filter = {user: user};
        const update = {
          $set: {token: token, createTime: Date.now(), registration: "Token Sent"}
        };
        await db.Token.updateOne(filter, update);

        let tokendb = await db.Token.findOne({user:user});

        return res.status(200).json({tokendb});
        
    } catch(err) {
        return next(err);
    }
};

const generateUser = async(req, res, next) => {
  const {hr, user} = req.body;
  try{
    tokenRecord = {hr: hr, user: user};
    let tokendb = await db.Token.create(tokenRecord);
    console.log(tokendb);
    if (!tokendb){
      const error = {
          message:'fail generate user, this user might have exist',
          ok: false,
        };
        return res.status(400).json({error});
  }
  return res.status(200).json({tokendb});
  } catch (err){
    console.log(err);
    const error = {
      message:'fail generate user, this user might have exist',
      ok: false,
    };
    return res.status(400).json({error});
  }
};


const fetchTokens = async (req, res, next) => {
  try{
    const threeHoursAgo = new Date();
    threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
    const filter = {createTime: {$lte: threeHoursAgo}, registration: "Token Sent"};
    const update = {
      $set: {registration: "Token Expired"}
    }
    await db.Token.updateMany(filter, update);
    const tokens = await db.Token.find({});
    return res.status(200).json(tokens);
  }catch(error){
    return res.status(400).json({
      message: err.message,
      ok: false,
    });
  }

};

const deleteToken = async (req, res, next) => {
  try{
    const {user} = req.body;
    await db.Token.deleteOne({user: user});
    return res.status(200).json({user: user});
  }catch (error){
    return res.status(400).json({message:error.message, ok: false});  
  }
}


const fetchUsers = async (req, res, next) => {
  try {
    const users = await db.User.find({authorization: "regular"}, {
      "optRecipt.file.content": 0,
      "optEAD.file.content": 0,
      "I983.file.content": 0,
      "I20.file.content": 0,
    });

    return res.status(200).json(users);
  }catch (error){
    console.error("Error fetch users");
    res.status(500).json({ error: "Internal Server Error" });
  }
}


const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.find({ authorization: "regular", userDetail: { $ne: null } }, {
      "optRecipt.file.content": 0,
      "optEAD.file.content": 0,
      "I983.file.content": 0,
      "I20.file.content": 0,
    });
    if (!users) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.status(200).json(users);
  } catch (err) {
    return res.status(400).json({
      message: err.message,  
      ok: false,
    });
  }
};


const searchUsers = async (req, res, next) => {
  try {
    console.log(req.params.key);
    let regex = new RegExp(`${req.params.key}`, "i");
    const searchResult = await db.User.find({ "userDetail.firstName": regex });
    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


const manageDoc = async (req, res, next) => {
  try {
    const {fileType, userId, action, feedback} = req.body;

    const user = await db.User.findById(userId);
    if (!user){
      return res.status(400).json({message:"User Not Found", ok: false});
    }

    if (user[fileType]) {
      // Update the status and feedback based on the 'action' value
      user[fileType].status = action;
      user[fileType].feedback = feedback;
      if (action === "approved"){
        if (fileType === "onBoardingApplication"){
          user.currentStep = ((user.USID === "no") && (user.userDetail.workTitle === "F1"))? "optRecipt":"done";
        }else if (fileType === "optRecipt"){
          user.currentStep = "optEAD";
        }else if (fileType === "optEAD"){
          user.currentStep = "I983";
        }else if (fileType === "I983"){
          user.currentStep = "I20";
        }else{
          user.currentStep = "done";
        }
      }
    }

  
    // if [fileType === "optRecipt"]
    await user.save();

    return res.status(200).json({ message: "File Updated Successfully", ok: true });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Server Error", ok: false });
  }
};

module.exports = {sendToken, generateUser, fetchTokens, deleteToken, fetchUsers,fetchAllUsers, searchUsers, manageDoc};