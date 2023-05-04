const  QrCode = require('qrcode');
const expressAsyncHandler = require('express-async-handler');


const Transacoes = expressAsyncHandler( async (res,req)=>{
    
    console.log(req)
    const amount= req.body.amount;

    console.log('kakaka',amount)
    
    // if(amount.length === 0){
    //     res.status(400);
    //     throw new Error("Dados vazio")
    // }

    // QrCode.toDataURL(amount, function(err,amount){
    //     console.log(amount)
    //     res.send(amount)

    // })

});


module.exports= {  Transacoes};