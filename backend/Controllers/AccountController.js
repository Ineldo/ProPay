const generateToken = require('../config/generateToken')
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const UserDb = require('../Models/UserModel');
const AccountDb = require('../Models/AccountModel');
var mongoose = require('mongoose');
const jwt = require("jsonwebtoken");



const linkAccount = expressAsyncHandler(async (req,res,next) => {
    const { name, email, password, bank_number } = req.body
    const token =req.cookies.token;
       
    if(!token){
        res.status(401)
        throw new Error("Utilizador sem autorização.Por favor Login ")
    }
    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)

    //get user id from token
    const users = await UserDb.findById(verified.id).select("-password")

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter those fields")
  }
  const numberExists = await AccountDb.findOne({ bank_number })
  if (numberExists) {
    res.status(400);
    throw new Error("Essa conta ja existe!")
  }


  const newBankAccount = await AccountDb.create({
    name,
    email,
    password,
    bank_number,
    owner: users._id,
  });

  if (newBankAccount) {
    res.status(201).json({
      _id: newBankAccount._id,
      name: newBankAccount.name,
      email: newBankAccount.email,
      bank_number: newBankAccount.bank_number,
      owner:newBankAccount.owner
    });
  }else {
      res.status(400);
      throw new Error("Nao foi possivel criar uma conta");
    }


  
})


module.exports = { linkAccount}