const nodeMailer = require('nodemailer');
const expressAsyncHandler = require('express-async-handler');


const sendEmail= expressAsyncHandler(async (subject,message,sent_from,send_to, reply_to)=>{
  try {
    const transporter= nodeMailer.createTransport({
      host:process.env.EMAIL_HOST,
      port:587, 
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    const mailOptions={
      from:sent_from,
      to:send_to,
      replyTo:reply_to,
      subject:subject,
      html:message,
    }

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        console.error(error);
      }
      else{
        console.log("Email foi enviado -", info);
      }
    })
  } catch (error) {
    console.error(error);
  }
});


//'<p>Ola '+name+', Copie o Link <a href="http://192.168.88.227:8080/auth/resetpassword?token='+token+'"> e redefine sua palavra-passe</a> </p>',
module.exports = { sendEmail}

