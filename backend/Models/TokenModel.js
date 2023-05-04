const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const tokenScheme = mongoose.Schema({
    userId:{
        type: mongoose.Types.ObjectId,
        required:true,
        ref: "user"
    },
    token:{
        type: String,
        required:true,
    },
    createdAt:{
        type:Date,
        required:true
    },
    expiredAt:{
        type:Date,
        required:true
    }
    
    
}, {
  
});



const TokenModel= mongoose.model("Tokens", tokenScheme);


module.exports=TokenModel;