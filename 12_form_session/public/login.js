let form_auth = document.getElementById('form_auth');
let name_input_start = document.getElementById('name_input_start');
let URLBASE = 'http://192.168.0.16:8080';
let URLBASEUSER = `${URLBASE}/user`;


form_auth.addEventListener('submit', (e) => {
    e.preventDefault();
    let data = JSON.stringify({
        username: name_input_start.value,
        exp: true
    });
    send_data(data, URLBASEUSER);
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
