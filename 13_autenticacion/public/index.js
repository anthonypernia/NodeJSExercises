let title_input = document.getElementById('title_input');
let price_input = document.getElementById('price_input');
let link_input = document.getElementById('link_input');
let form_products = document.getElementById('form_products');
let description_input = document.getElementById('description_input');
let code_input = document.getElementById('code_input');
let stock_input = document.getElementById('stock_input');
let tbody_products = document.getElementById('tbody_products');
let name_user = document.getElementById('name_user');
let lastname_user = document.getElementById('lastname_user');
let age_user = document.getElementById('age_user');
let alias_user = document.getElementById('alias_user');
let avatar_user = document.getElementById('avatar_user');
let msg_user = document.getElementById('msg_user');
let mail_user = document.getElementById('mail_user');
let wellcome_message = document.getElementById('wellcome_message');
let form_msg = document.getElementById('form_msg');
let chat_container = document.getElementById('chat_container');
let log_out_button = document.getElementById('log_out');
let IP = 'http://192.168.0.16';
let PORT = '8080';
let URLBASEPRODUCTS = `${IP}:${PORT}/api/products`;
let URLBASECHATS = `${IP}:${PORT}/api/chat`;
let URLBASEUSERNAME = `${IP}:${PORT}/user`;
// let socket = io();
// socket.on('init', (data) => {
// });


form_products.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = title_input.value;
    let price = price_input.value;
    let link = link_input.value;
    let description = description_input.value;
    let code = code_input.value;
    let stock = stock_input.value;
    let obj = {
        name: title,
        price: price,
        photo: link,
        description: description,
        code: code,
        stock: stock
        }
    send_data(JSON.stringify(obj), URLBASEPRODUCTS);
    getData();
    
});

async function send_data(data, URL){
    await fetch(URL, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(data => {
        
    }
    );
}

function delete_product(id){
    fetch(URLBASEPRODUCTS + '/' + id, {
        method: 'DELETE',
    }).then(res => res.json())
    .then(data => {
        
    }
    );
}

function setDataOnCard(data){
    try{
        let html = '';
        data.forEach(product => {
            product.photo = product.photo && product.photo.includes('http') ? product.photo : 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png'
            html += `<tr>
            <td class='white_font' >${product.name}</td>
            <td class='white_font' >${product.price}</td>
            <td class='white_font' ><img src=${product.photo} ></img></td>
            <td class='white_font' >${product.description}</td>
            <td class='white_font' >${product.code}</td>
            <td class='white_font' >${product.stock}</td>
            </tr>`;
        });
        tbody_products.innerHTML = html;
    }catch(err){
        // console.log(err);
    }
}

function setDataMessage(data){
    let html = '';
    if (data.length > 0) {
        data.forEach(message => {
            html += `<div class="row">
            <div class="col-md-12">
            <div class="container">
            <h5 class="col card-title">${message.author.id}</h5>
            <p class="col card-text">${message.timestamp}</p>
            <p class="col card-text">${message.text}</p>
            </div>
            </div>
            </div>`;
        });
        chat_container.innerHTML = html;
    }
}

// socket.on('products_all', (data) => {
//     getData();
// });

// socket.on('msg_all', (data) => {
//     getMessages();
// });

function getData(){
    
    fetch(URLBASEPRODUCTS).then(response => response.json()).then(data => {
        setDataOnCard(data);
    }
    );
}

function getMessages(){
    fetch(URLBASECHATS).then(response => response.json()).then(data => {
         setDataMessage(data);
    })
}

form_msg.addEventListener('submit', (e) => {
    e.preventDefault();
    let name = name_user.value;
    let lastname = lastname_user.value;
    let age = age_user.value;
    let alias = alias_user.value;
    let avatar = avatar_user.value;
    let msg = msg_user.value;
    let mail = mail_user.value;
    let message = {
        author: {
            id: mail,
            name,
            lastname,
            age,
            alias,
            avatar
        },
        text : msg
        }
    
    // socket.emit('send_msg', message);
    send_data(JSON.stringify(message), URLBASECHATS);
    getMessages();
});

function setDataUser(){
    let URL  =URLBASEUSERNAME+"/get"
    fetch(URL).then(response => {
        if (response.status === 200) {
            response.json().then(data => {
                console.log(data);
                wellcome_message.innerHTML = `Bienvenido ${data.user.username}`
            })
        }else{
            window.location.href = './login.html';
        }
    }
    );
}


log_out_button.addEventListener('click', (e) => {
    e.preventDefault();
    let URL = URLBASEUSERNAME+"/logout"
    console.log(URL);
    fetch(URL).then(response => {
        window.location.href = './login';
    })
});

document.addEventListener('DOMContentLoaded', () => {
    getData();
    getMessages();
    setDataUser();
});