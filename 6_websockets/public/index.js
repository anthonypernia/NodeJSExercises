let socket = io()

const input_title = document.querySelector('#title_input')
const input_price = document.querySelector('#price_input')
const input_link = document.querySelector('#link_input')
const btn_input = document.querySelector('#btn_input')
const tbody_products = document.querySelector('#tbody_products')
const mail_user = document.querySelector('#mail_user')
const msg_user = document.querySelector('#msg_user')


btn_input.addEventListener('click', (e) => {

    const title = input_title.value
    const price = input_price.value
    let link = input_link.value
    if (link.length < 1) {
        link = "https://m.media-amazon.com/images/I/51zLZbEVSTL._AC_SL1200_.jpg"
    }
    socket.emit('create_products', {title, price, link})
});
socket.on('init', (data) => {
        console.log('--------->init')
        console.log(data)
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
   


socket.on('products_all', (data) => {
   
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
    });

});