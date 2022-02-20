const twillio_account_id = 'AC08726aeac579fa7f0f2945e2bb419394';
const auth_token = '71b54764d317640bb78e915a53f70e15';
let from = 'whatsapp:+14155238886';
let to = 'whatsapp:+5491169161351';
let {createTransport} = require('nodemailer');
let {loggerWarn, loggerErr, loggerInfo} = require('./logger');
const email = 'anthonyperniah@gmail.com'
const twilioClient = require('twilio')(twillio_account_id, auth_token, {
    lazyLoading: true
});
const transporter = createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: email,
        pass: 'uxoncgjyrwodapfv'
    }
});


async function sendMessage(cartInfo) {
    
    let body = `Compra realizada con exito \n ${cartInfo}`;
        try{
            const response = await twilioClient.messages.create({
                from,
                to,
                body,
            })
            loggerInfo.info('Message sent: ' + response.sid);
            sendEmail(cartInfo);
            return response.sid;
        }catch(err){
            loggerErr.error(err);
            return err;
        }
}

async function sendEmail(message){
    let subject = 'Cart';
    let mail_body = `<h2>${message}</h2>`;
    const options = {
        to: 'anthonyperniah@gmail.com',
        subject,
        html: mail_body
    };
    try{
        const response = await transporter.sendMail(options);
        loggerInfo.info('Email sent: ' + response.messageId);
    }catch(err){
        loggerErr.error(err);
    }
}


module.exports = {
    sendMessage,
    sendEmail
}