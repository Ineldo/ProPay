const UserDb = require('../Models/UserModel')
const PicDb = require('../Models/PictureModel')
const generateToken = require('../config/generateToken')
var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');



const uploadPicture= expressAsyncHandler(async (req, res) => {

  const {picture, id} = req.body;
   const user= await UserDb.findById(id);


    try {
      const newImage = new PicDb({
        picture,
        owner:user._id,       
      })
      console.log(newImage)
       newImage.save();
     
        if(newImage){
          res.status(200).json({message:"Imagem gravada",
          _id: newImage._id,
          picture:newImage.picture,
          owner: newImage.owner
          })
        }
        
    } catch {
      res.status(400);
      throw new Error("Falhou a gravação da imagem ")
      
    }
    

  
});



const userLogout =expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) 
      return res.status(404).json({ msg: `No user with id - ${id}`});


  const users = await UserDb.findById({_id:id})

  res.cookie("token", users ,{
    path:"/",
    httpOnly: true,
    expires:new Date(0),//expires the cookie
    sameSite:"none",
    secure: true,
  });
  return res.status(200).json({message:"Log Out Sucedido"})
});

const getUser=expressAsyncHandler(async (req, res) => {
  

  const users = await UserDb.findById(req.user._id)

  if(users){
    const {_id, name, email, picture, address, phone_number } = users;
      res.status(200).json({
        _id,
        name,
        email,
        picture,
        address,
        phone_number        
      });
    }else{
      res.status(400)
      throw new Error('Utilizador não encontrado');
    }

})

// update user specified user id
const userUpdate = expressAsyncHandler( async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id)) 
      return res.status(404).json({ msg: `No user with id - ${id}`});

  const users = await UserDb.findById({_id:id}).select("-password")
  
  if(users){
    const {_id, name, email, picture, address, phone_number } = req.body;
    
      try{ 
        users.email=email;
        users.name=req.body.name||name;
        users.picture=req.body.picture||picture;
        users.address=req.body.address||address;
        users.phone_number=req.body.phone_number||phone_number;

        
        const updatedUser = await UserDb.findByIdAndUpdate(
        id,
        users,  
        {new:true}
        )
       res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            picture:updatedUser.picture,
            address:updatedUser.address,
            phone_number:updatedUser.phone_number        
          });
        }catch{
          res.status(404).json({ message:"did not update"})
        }
    }else{
        res.status(404).json({ message:"User not found"})
    }
  
});

const changePassword= expressAsyncHandler(async (req, res)=>{
  const users = await UserDb.findById(req.user._id)
  const {oldPassword, password} = req.body
  if(!users){
    res.status(400)
    throw new Error("User not found, Please signup")
  }

  if(!oldPassword || !password){
    res.status(400)
    throw new Error("Please add old and new password")
  }
  const passwordIsCorrect = await bcrypt.compare(oldPassword, users.password)

  if(users && passwordIsCorrect){
    users.password=password;
    await users.save()
    res.status(200).json("Password changed successfully");
   
    }else{
      res.status(400)
      throw new Error('Old Password is incorrect');
    }

})

//deactivate a user
const userDelete= expressAsyncHandler( async (req, res)=>{
    const {id}  = req.params;
    const user = UserDb.findOne({_id:mongoose.Types.ObjectId(id)});
    
   
    if(!user){
      res.status(404).json({ message:"did not find User"})
    }
    try{
        const updatedUser = await UserDb.updateOne(
            {_id:id},
            { $set: { "status" : 0 } },
            {new:true}
        );

         await updatedUser.save()
           
       res.status(200).json({message:"successo"});
     }catch{
       res.status(404).json({message:"Não foi possivel"})
      }
    
  })
  

 
module.exports =
{  userUpdate, userLogout,
   getUser,userDelete,
   uploadPicture,changePassword
};


// const { id } = req.params;
 
  // if (!mongoose.Types.ObjectId.isValid(id)) 
  //     return res.status(404).json({ msg: `No user with id - ${id}`});

/**------ */

  // const textflow = require("textflow.js")

// textflow.useKey("bC4NNAuJvmoGCeBUm6EeBSl18lGnUT9Rpg7u8hYst2MWzeg9ggWe3AuwCVcmzIFw")
/**----- */


// const registerUser = expressAsyncHandler( async (req, res)=>{
//     const { name, email,password, picture, address,phone_number,bank_account} = req.body 
    
//     if(!name||!email||!password){
//         res.status(400);
//         throw new Error("Please enter those fields")
//     }

//     const userExists = await UserDb.findOne({ email })
//     if(userExists){
//         res.status(400);
//         throw new Error("User Exists")
//     }
//     const newUser = await UserDb.create({
//         name,
//         email,
//         password,
//         bank_account,
//         picture,
//         address,
//         phone_number
//     });
    
   
//     const token= generateToken(newUser._id)
//     //send http-only cookie
//   res.cookie("token", token ,{
//         path:"/",
//         httpOnly: true,
//         expires:new Date(Date.now() + 1000 * 86400),//a day
//         sameSite:"none",
//         secure: true,
       
//     });

    
//     if(newUser){
//         res.status(201).json({
//             _id: newUser._id,
//             name: newUser.name,
//             email:newUser.email,
//             picture:newUser.picture,
//             bank_account:newUser.bank_account,
//             address:newUser.address,
//             phone_number:newUser.phone_number,
//             token : generateToken(newUser._id),
//         });
        
//     }else{
//         res.status(400);
//         throw new Error("Failed create User")
//     }
    


//    //textflow.sendSMS(phone_number, "Palerma, trincu, mi e mou..");    
//     // var result = await  textflow.sendSMS(phone_number, "Palerma, resolve, mi e mou nta flutua na mar..");  

//     // if (result.ok) //send sms here
//     //     return res.status(200).json({ success: true });

//     // return res.status(400).json({ success: false });
   
// });

/*----*/

  // const userLogin= expressAsyncHandler( async(req, res) => {
  //   const {email, password, phone_number} = req.body;
  
  //   if(!email || !password || !phone_number) {
  //     res.status(400)
  //       throw new Error('Um dos dados está errado')
      
  //   }
  //   const user = await UserDb.findOne({email})
  //   if(!user) {
  //     res.status(400)
  //       throw new Error('Utilizador não encontrado, por favor SignUp')
      
  //   }
  //   //user exist, if password match
  //   const passwordIsCorrect = await bcrypt.compare(password, user.password)
  //   const token= generateToken(user._id).toString()
  //   //send http-only cookie
  //   res.cookie("token", token ,{
  //         path:"/",
  //         httpOnly: true,
  //         expires:new Date(Date.now() + 1000 * 86400),//a day
  //         sameSite:"lax",
  //         secure: true,
  //       });
       
  //   if(user && passwordIsCorrect){
  //     const {_id, name, email, picture, address, phone_number } = user;
  //     res.status(201).json({
  //       _id,
  //       name,
  //       email,
  //       picture,
  //       address,
  //       phone_number,
  //       token
  //     });
  //   }else{
  //     res.status(400)
  //     throw new Error('Nome ou palavra-passe invalidos')
  //   }
  
  // });