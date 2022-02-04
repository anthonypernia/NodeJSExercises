let twilio = require('twilio')
let twillio_account_id = 'AC08726aeac579fa7f0f2945e2bb419394';
let auth_token = '46150e4258505f5d32f2da69bc96a97f';
let from = '+18454091109';
let to = process.argv[2] || '+541169161351';
let body = process.argv[3] || 'cualquier cosa';

const twilioClient = twilio(twillio_account_id, auth_token);


(async () => {

    try{
        const response = await twilioClient.messages.create({
            from,
            to,
            body
        });
    console.log(response);
    }catch(err){
        console.log(err);
    }

})();