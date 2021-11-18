// let title_input = document.getElementById('title_input');
// let price_input = document.getElementById('price_input');
// let link_input = document.getElementById('link_input');
// let form_products = document.getElementById('form_products');
let socket = io();

socket.on('init', (data) => {
    console.log(data);
});

// form_products.addEventListener('submit', (e) => {
//     e.preventDefault();
//     let title = title_input.value;
//     let price = price_input.value;
//     let link = link_input.value;
//     socket.emit('add_product', {
//         title: title,
//         price: price,
//         link: link
//     });
//     title_input.value = '';
//     price_input.value = '';
//     link_input.value = '';
// });