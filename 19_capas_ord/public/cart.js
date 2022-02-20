let btn_comeback_to_home = document.getElementById("btn_comeback_to_home");
let btn_buy = document.getElementById("btn_buy");
let IP = "http://192.168.0.16";
let PORT = "8080";
let URLBASEPRODUCTS = `${IP}:${PORT}/api/products`;
let URLBASECHATS = `${IP}:${PORT}/api/chat`;
let URLBASEUSERNAME = `${IP}:${PORT}/user`;
let URLBASECART = `${IP}:${PORT}/api/cart`;
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let localStorageCart = JSON.parse(localStorage.getItem("localStorageCart"));
let tbody_products = document.getElementById("tbody_products");
let UserInformationList = document.getElementById("UserInformationList");
let currentCart;

btn_buy.addEventListener("click", () => {

    let dataToMailProduct = '';
    currentCart.products.forEach((product) => {
        dataToMailProduct += `\n
                        ${product.name} \n
                        ${product.price} \n
                        ${product.description} \n
                    `;
    });

    let dataToMailUser = `
        ${currentUser.username} \n
        ${currentUser.email}
    `;

    buyCart(dataToMailProduct, dataToMailUser);
});


function updateCart() {
    let idCart = localStorageCart.idCart;
    fetch(`${URLBASECART}/${idCart}/products`, {
        method: "GET",
    }).then((res) => res.json())
        .then((dataProducts) => {
            showCart(dataProducts);
            currentCart = dataProducts;
        });
}

function showCart(dataProducts) {
    
    let html = "";
    dataProducts.products.forEach((product) => {
        html += `<tr>
            <td class='white_font' >${product.name}</td>
            <td class='white_font' >${product.price}</td>
            <td class='white_font' ><img src=${product.photo} ></img></td>
            <td class='white_font' >${product.description}</td>
            </tr>`;
    });
    tbody_products.innerHTML = html;
}


function showInofUser() {
    let html = "";
    html += `<li class="list-group-item">
        <b>Nombre de usuario:</b> ${currentUser.username}
    </li>
    <li class="list-group-item">    
        <b>Edad:</b> ${currentUser.age}
    </li>
    <li class="list-group-item">    
        <b>Email:</b> ${currentUser.email}
    </li>
    <li class="list-group-item">
        <b>Dirección:</b> ${currentUser.address}
    </li>
    <li class="list-group-item">
        <b>Telefono:</b> ${currentUser.phone}
    </li>
    `;
    UserInformationList.innerHTML = html;
}

function buyCart(cart, user ) {
    fetch(`${URLBASECART}/buy`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cart_info: `\n Products: \n ${cart} \n \n USER: \n ${user}`,
        }),
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
        });

}

btn_comeback_to_home.addEventListener("click", () => {
    window.location.href = "index.html";
    }
);

document.addEventListener("DOMContentLoaded", () => {
    updateCart();
    showInofUser();
});