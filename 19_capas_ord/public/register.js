let form_auth_register = document.getElementById('form_auth_register');
let mail_input_register = document.getElementById('mail_input_register');
let password_input_register = document.getElementById('password_input_register');
let username_input_register = document.getElementById('username_input_register');
let address_input_register = document.getElementById('address_input_register');
let age_input_register = document.getElementById('age_input_register');
let phone_area_input_register = document.getElementById('phone_area_input_register');
let phone_input_register = document.getElementById('phone_input_register');
let URLBASE_reg = 'http://192.168.0.16:8080';
let URLBASEUSER_reg = `${URLBASE_reg}/user/register`;
let btn_login = document.getElementById('btn_login');



form_auth_register.addEventListener('submit', (e) => {
    e.preventDefault();
    let phone = `${phone_area_input_register.value}${phone_input_register.value}`.replace(' ', '');
    let data = JSON.stringify({
        email: mail_input_register.value,
        password: password_input_register.value,
        username: username_input_register.value,
        address: address_input_register.value,
        age: age_input_register.value,
        phone,
        exp: true
    });
    send_data(data, URLBASEUSER_reg);
});

btn_login.addEventListener('click', () => {
    window.location.href = 'login.html';
});

async function send_data(data, URL){
    console.log(data);
    await fetch(URL, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        if(res.status === 200){
            
            window.location.href = `${URLBASE_reg}/home`;
        }
    })
}
