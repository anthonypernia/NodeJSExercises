let socket = io()

const input_title = document.querySelector('#title_input')
const input_price = document.querySelector('#price_input')
const input_link = document.querySelector('#link_input')
const btn_input = document.querySelector('#btn_input')
const tbody_products = document.querySelector('#tbody_products')
const mail_user = document.querySelector('#mail_user')
const msg_user = document.querySelector('#msg_user')
const btn_msg = document.querySelector('#btn_msg')
const chat_container = document.querySelector('#chat_container')
const p_e = document.querySelector('#p_e')
const form_msg = document.querySelector('#form_msg')
const form_products = document.querySelector('#form_products')

form_products.addEventListener('submit', (e) => {
    e.preventDefault()
    const title = input_title.value
    const price = input_price.value
    let link = input_link.value
    if (link.length < 1) {
        link = "https://m.media-amazon.com/images/I/51zLZbEVSTL._AC_SL1200_.jpg"
    }
    socket.emit('create_products', {title, price, link})
});

form_msg.addEventListener('submit', (e) => {
    e.preventDefault()
    const msg = msg_user.value
    const mail = mail_user.value
    const date = date_to_ddmmyyyyhhmmss()
    socket.emit('send_msg', {mail, msg, date})
});

socket.on('init', (data) => {
        render_products(data.products)
        render_msg(data.messages)
});

socket.on('products_all', (data) => {
        render_products(data)
});



socket.on('msg_all', (data) => {
    render_msg(data)
});




function render_products(data){
    if (data.length > 0) {
        let product_item_html = ``
        data.forEach(e => {
            product_item_html += ` 
            <tr>
                <th class="white_font" scope="row">${e.title}</th>
                <td class="white_font" >${e.price}</td>
                <td><img style="width: 5rem;" src=${e.link} alt=""></td>
            </tr>
            `
        })
        tbody_products.innerHTML = product_item_html
    }
}

function render_msg(data){
    if (data.length >0){
        let msg_html = ``
        data.forEach(e => {
            msg_html += `<div class="row">
                <p class="col" style="color: blue;" ><b>${e.mail}</b></p> 
                <p class="col" style="color: brown;" >[${e.date}]</p> 
                <p class="col" style="color: green;" ><i>${e.msg}</i></p>
            </div>`
    })
    chat_container.innerHTML = msg_html
    }
}

function date_to_ddmmyyyyhhmmss(){
    let date = new Date()
    let dd = date.getDate()
    let mm = date.getMonth()+1
    let yyyy = date.getFullYear()
    let hh = date.getHours()
    let min = date.getMinutes()
    let ss = date.getSeconds()
    if (dd<10) {
        dd = '0'+dd
    } 
    if (mm<10) {
        mm = '0'+mm
    } 
    if (hh<10) {
        hh = '0'+hh
    } 
    if (min<10) {
        min = '0'+min
    } 
    if (ss<10) {
        ss = '0'+ss
    } 
    return dd+'/'+mm+'/'+yyyy+' '+hh+':'+min+':'+ss
}