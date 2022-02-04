//let express = require('express');
//let app = express();
//let bodyParser = require('body-parser');
//let PORT = process.env.PORT || 3000;
//
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());
//app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/index.html');
//}
//);
//
//app.listen(PORT, () => {
//    console.log('Server is running on port: ' + PORT);
//});

let {createTransport} = require('nodemailer');
//const email = 'sammy.langosh70@ethereal.email'
const email = 'anthonyperniah@gmail.com'
let twillio_account_id = 'AC08726aeac579fa7f0f2945e2bb419394'
let auth_token = '46150e4258505f5d32f2da69bc96a97f'

const transporter = createTransport({
    //host: 'smtp.ethereal.email',
    service:'gmail',
    port: 587,
    auth: {
        user: email,
        pass: 'uxoncgjyrwodapfv'
    }
});

let subject = 'prueba clase 2';
let mail_body = '<h1>hola compañero 2</h1>';
const options = {
    to: 'anthonyperniah@gmail.com',
    subject,
    html: mail_body
};

(   async () => {

    try{
        const response = await transporter.sendMail(options);
        console.log(response);
    }catch(err){
        console.log(err);
    }

})();

