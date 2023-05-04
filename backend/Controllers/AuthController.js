const generateToken = require('../config/generateToken')
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const UserDb = require('../Models/UserModel');
const TokenModel = require('../Models/TokenModel')
const PicDb = require('../Models/PictureModel');
const config = require('../config/mailer')
const crypto =require("crypto");
const { sendEmail } = require('../utils/sendEmail');


const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password, address, picture, phone_number, bank_account } = req.body

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter those fields")
  }
  const userExists = await UserDb.findOne({ email })
  if (userExists) {
    res.status(400);
    throw new Error("User Exists")
  }

  const newUser = await UserDb.create({
    name,
    email,
    password,
    bank_account,
    picture,
    address,
    phone_number,
    
  });

  const token = generateToken(newUser._id)
  //send http-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),//a day
    sameSite: "none",
    secure: true,

  });


  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
      bank_account: newUser.bank_account,
      address: newUser.address,
      phone_number: newUser.phone_number,
      token: generateToken(newUser._id),
    });


    const newImage = new PicDb({
      picture,
      owner: newUser._id,
    })
    newImage.save();

    if (newImage && newImage.picture!='') {
      res.status(200).json({
        message: "Imagem gravada",
        _id: newImage._id,
        picture: newImage.picture,
        owner: newImage.owner
      })
    }

  } else {
    res.status(400);
    throw new Error("Failed create User")
  }

});

const userLogin = expressAsyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  if ((!!email && !!name) || (!email && !name)) {
    res.status(400)
    throw new Error('Deve fornercer um dois dados')
  }

  if (!password) {
    res.status(400)
    throw new Error('Um dos dados está errado')
  }
  const user = await UserDb.findOne(email ? { email } : { name })
  if (!user) {
    res.status(400)
    throw new Error('Utilizador não encontrado, por favor SignUp')

  }
  //user exist, if password match
  const passwordIsCorrect = await bcrypt.compare(password, user.password)
  const token = generateToken(user._id)
  //send http-only cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 86400),//a day
    sameSite: "none",
    secure: true,
  });


  if (user && passwordIsCorrect) {
    const { _id, name, email, picture, address, phone_number } = user;
    res.status(201).json({
      _id,
      name,
      email,
      picture,
      address,
      phone_number,
      token
    });
  } else {
    res.status(400)
    throw new Error('Nome ou palavra-passe invalidos')
  }

});

const forgotPassword= expressAsyncHandler(async (req, res)=>{

    const {email}= req.body

    const user = await UserDb.findOne({email: email})


    if(!user){ 
      res.status(400)
      throw new Error("O email não existe!")
    }


    //delete token if it exists in db
    let oldtoken= await TokenModel.findOne({userID: user._id})
    if(oldtoken){
      await TokenModel.deleteOne()
    }

    //criando reset token
    let resetToken = crypto.randomBytes(32).toString("hex")+ user._id;
    console.log(resetToken)
    //hash token before saving to db

    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    //save token 
    await new TokenModel({
      userId: user._id,
      token:hashedToken,
      createdAt: Date.now(),
      expiredAt: Date.now()+ 10*(60*1000) // thirty minutes
    }).save()

    //construct a reset url
    const resetUrl=`${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

    //Reset email

    const message=`
    <h2>Ola ${user.name}</h2>
    <p>Por favor clique no link abaixo para redefinir a palavra-passse</p>
    <p>O link e valido so por 10 minutos</p>

      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

      <p>Cumprimentos!!</p>
      <p>Equipa Propay!!</p>
    `;

    const subject="Password Reset Request";
    const send_to= user.email;
    const sent_from= process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from)
      
      res.status(200).json({success: true, message:"Reset email sent"})
    } catch (error) {
      res.status(500)
      throw new Error ("email not sent, pls try again")
    }

    res.send("forgot email")

});

const resetPassword= expressAsyncHandler(async (req, res)=>{
    const {password}= req.body;
    const {resetToken}= req.params

    //hash token and compare to token in db
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")

    const user_token= await TokenModel.findOne({
      token: hashedToken,
      expiredAt: { $gt : Date.now()} //check if token is not expired
    })

    if(!user_token){
      res.status(404);
      throw new Error("Invalid or expired Token")
    }

    //find user
    const user= await UserDb.findOne({_id: user_token.userId})
    user.password= password;
    await user.save()
    res.status(200).json({
      message:"Palavra passe redefinido"
    })



})

module.exports ={  registerUser,userLogin, forgotPassword, resetPassword};

 