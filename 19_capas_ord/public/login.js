let form_auth_login = document.getElementById('form_auth_login');
let mail_input_login = document.getElementById('mail_input_login');
let password_input_login = document.getElementById('password_input_login');
let btn_register = document.getElementById('btn_register');
let URLBASE = 'http://192.168.0.16:8080';
let URLBASEUSER = `${URLBASE}/user/login`;



form_auth_login.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = JSON.stringify({
        email: mail_input_login.value,
        password: password_input_login.value,
        exp: true
    });
    send_data(data, URLBASEUSER);
});

btn_register.addEventListener('click', () => {
    window.location.href = 'register.html';
});


async function send_data(data, URL){
    await fetch(URL, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if(res.status === 200){
            window.location.href = `${URLBASE}/home`;
        }
    })
}
