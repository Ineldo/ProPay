const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const picScheme = mongoose.Schema({
    picture:{
        type: 'string',
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
   
}, {
    timestamps:true,
});



const Pic= mongoose.model("Pic", picScheme);


module.exports=Pic;