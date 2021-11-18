let title_input = document.getElementById('title_input');
let price_input = document.getElementById('price_input');
let link_input = document.getElementById('link_input');
let form_products = document.getElementById('form_products');
let description_input = document.getElementById('description_input');
let code_input = document.getElementById('code_input');
let stock_input = document.getElementById('stock_input');
let tbody_products = document.getElementById('tbody_products');
let mail_user = document.getElementById('mail_user');
let msg_user = document.getElementById('msg_user');
let form_msg = document.getElementById('form_msg');
let chat_container = document.getElementById('chat_container');

let URLBASEPRODUCTS = 'http://192.168.0.16:8080/api/products';
let URLBASECHATS = 'http://192.168.0.16:8080/api/chat';
let socket = io();


socket.on('init', (data) => {
    console.log(data);
});


form_products.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = title_input.value;
    let price = price_input.value;
    let link = link_input.value;
    let description = description_input.value;
    let code = code_input.value;
    let stock = stock_input.value;
    socket.emit('add_product', {
        name: title,
        price: price,
        photo: link,
        description: description,
        code: code,
        stock: stock
    });
    title_input.value = '';
    price_input.value = '';
    link_input.value = '';
});

function setDataOnCard(data){
    console.log(data);
    let html = '';
    data.forEach(product => {
        html += `<tr>
        <td class='white_font' >${product.name}</td>
        <td class='white_font' >${product.price}</td>
        <td class='white_font' >${product.photo}</td>
        <td class='white_font' >${product.description}</td>
        <td class='white_font' >${product.code}</td>
        <td class='white_font' >${product.stock}</td>
        <td class='white_font' ><button class="btn btn-danger" onclick="delete_product(${product.id})">Delete</button></td>
        </tr>`;
    });
    tbody_products.innerHTML = html;
}

function setDataMessage(data){
    console.log(data);
    let html = '';
    data.forEach(message => {
        html += `<div class="row">
        <div class="col-md-12">
        <div class="container">
        <h5 class="col card-title">${message.sender}</h5>
        <p class="col card-text">${message.timestamp}</p>
        <p class="col card-text">${message.message}</p>
        </div>
        </div>
        </div>`;
    });
    chat_container.innerHTML = html;
}


socket.on('products_all', (data) => {
    getData();
});

socket.on('msg_all', (data) => {
    getMessages();
});

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
    let mail = mail_user.value;
    let msg = msg_user.value;
    socket.emit('send_msg', {
        mail: mail,
        msg: msg
    });
    mail_user.value = '';
    msg_user.value = '';
});


document.addEventListener('DOMContentLoaded', () => {
    getData();
    getMessages();
});