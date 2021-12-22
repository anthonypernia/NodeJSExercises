let form_auth = document.getElementById('form_auth');
let name_input_start = document.getElementById('name_input_start');
let URLBASE = 'http://192.168.0.16:8080';
let URLBASELOGIN = `${URLBASE}/login`;


form_auth.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = name_input_start.value;
    fetch(URLBASELOGIN, {
        method: 'POST',
        body: JSON.stringify({
            name: name
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        console.log(data);  
    }
    );
});
