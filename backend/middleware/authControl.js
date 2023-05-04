const expressAsyncHandler= require('express-async-handler');
const UserDb = require('../Models/UserModel');
const jwt = require("jsonwebtoken");

const protectRoutes= expressAsyncHandler(async (req, res, next) => {
    try {
        const token =req.cookies.token;
       
        if(!token){
            res.status(401)
            throw new Error("Utilizador sem autorização.Por favor Login ")
        }
        //verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        //get user id from token
        const user = await UserDb.findById(verified.id).select("-password")//this is to ignore the password from being sent back  to us
        if(!user){
            throw new Error("Utilizador não foi encontrado")
        }
        req.user = user;
        next(); 
        
    } catch (error) {
        res.status(401)
        throw new Error("lii...Utilizador sem autorização.Por favor Login ")
    } 

})

module.exports = {protectRoutes}

