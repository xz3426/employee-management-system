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
    const {hr, user} = req.body;
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
        tokenRecord = {
            hr: hr,
            user: user,
            token: token,
            createTime: Date.now()
        };
        let tokendb = await db.Token.create(tokenRecord)
        if (!tokendb){
            const error = {
                message:'fail generate Token',
                ok: false,
              };
              return res.status(400).json({error});
        }
        return res.status(200).json({tokendb});;
        
    } catch(err) {
        return next(err);
    }
};

const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await db.User.find({});
    return res.status(200).json(products);
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
    const searchResult = await db.User.find({ xxxxxxxxxxx: regex });
    return res.status(200).json(searchResult);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

module.exports = {sendToken, fetchAllUsers, searchUsers};