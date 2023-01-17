const nodemailer = require('nodemailer') ;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com" ,
    port: 465 , 
    secure: true ,
    auth: {
        user: "franckieandriamalala.itu@gmail.com" ,
        pass: "dlfaovbimykouesl"
    }
}) ;

const sendMail = async (sendTo, contenu) => {
    transporter.sendMail({
        from: "reparecarmada@gmail.com" ,
        to: sendTo ,
        subject: "REPARE CAR Mada" ,
        text: contenu
    }, function (err, info) {
        if (err) console.log(err) ;
        else console.log('We are going to send Mail to => '+sendTo+' <= the content : '+contenu) ;
    }) ;
}

module.exports = {
    sendMail
}