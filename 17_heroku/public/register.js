let form_auth_register = document.getElementById('form_auth_register');
let mail_input_register = document.getElementById('mail_input_register');
let password_input_register = document.getElementById('password_input_register');
let username_input_register = document.getElementById('username_input_register');
let URLBASE_reg = 'http://192.168.0.16:8080';
let URLBASEUSER_reg = `${URLBASE_reg}/user/register`;



form_auth_register.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = JSON.stringify({
        email: mail_input_register.value,
        password: password_input_register.value,
        username: username_input_register.value,
        exp: true
    });
    send_data(data, URLBASEUSER_reg);
});

async function send_data(data, URL){
    await fetch(URL, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        console.log(res);
        if(res.status === 200){
            window.location.href = `${URLBASE_reg}/login`;
        }
    })
}
