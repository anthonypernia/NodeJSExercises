let twillio_account_id = 'AC08726aeac579fa7f0f2945e2bb419394';
let auth_token = '46150e4258505f5d32f2da69bc96a97f';

let from = 'whatsapp:+14155238886';
let to = 'whatsapp:+5491169161351';
let body = 'Feliz navidad !!!';
let mediaUrl = ['https://www.clarin.com/img/2021/12/06/antiguamente-los-arboles-se-decoraban___rP-56-XOI_720x0__1.jpg'];
'+5491162203392'
const twilioClient = require('twilio')(twillio_account_id, auth_token, {
    lazyLoading: true
});
console.log("kajsbdlabsd");
(async () => {

    try{
        const response = await twilioClient.messages.create({
            from,
            to,
            body,
            mediaUrl
        })
        console.log(response);
    }catch(err){
        console.log(err);
    }

})();
