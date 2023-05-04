const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const accountScheme = mongoose.Schema({
    name:{
        type: 'string',
    },
    bank_number: {
        type: 'string'
    },
    password: {
        type: 'string',
        required: [true, "Por favor coloque uma palavra-passe"],
        minLength:[6, "Paalavra-passe tem de ter no mínimo 6 caracteres"],
        maxLength:[25, "Maximo  de 23 caracteres"],
    },
    email:{
        type: 'string',
        required: [true, "Por favor escreva um email!"],
        unique: true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Coloque um email válido"
        ]
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    }
   
}, {
    timestamps:true,
});
accountScheme.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

/*this function is to encrypt password and it takes "next" because it is a middleware */
accountScheme.pre('save', async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})



const Accounts= mongoose.model("Accounts", accountScheme);


module.exports=Accounts;