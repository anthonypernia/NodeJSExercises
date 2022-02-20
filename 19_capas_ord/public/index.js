let tbody_products = document.getElementById("tbody_products");
let name_user = document.getElementById("name_user");
let lastname_user = document.getElementById("lastname_user");
let age_user = document.getElementById("age_user");
let alias_user = document.getElementById("alias_user");
let avatar_user = document.getElementById("avatar_user");

let mail_user = document.getElementById("mail_user");
let wellcome_message = document.getElementById("wellcome_message");
let chat_container = document.getElementById("chat_container");
let log_out_button = document.getElementById("log_out");
let btn_cart = document.getElementById("btn_cart");
let IP = "http://192.168.0.16";
let PORT = "8080";
let URLBASEPRODUCTS = `${IP}:${PORT}/api/products`;
let URLBASECHATS = `${IP}:${PORT}/api/chat`;
let URLBASEUSERNAME = `${IP}:${PORT}/user`;
let URLBASECART = `${IP}:${PORT}/api/cart`;
let currentUser = {};
let localStorageCart = JSON.parse(localStorage.getItem("localStorageCart"));

btn_cart.addEventListener("click", () => {
  window.location.href = "cart.html";
});

async function send_data(data, URL) {
  await fetch(URL, {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {});
}

function delete_product(id) {
  fetch(URLBASEPRODUCTS + "/" + id, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {});
}

function setDataOnCard(data) {
  
  try {
    let html = "";
    data.forEach((product) => {
      product.photo =
        product.photo && product.photo.includes("http")
          ? product.photo
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Smiley.svg/1200px-Smiley.svg.png";
      html += `<tr>
            <td class='white_font' >${product.name}</td>
            <td class='white_font' >${product.price}</td>
            <td class='white_font' ><img src=${product.photo} ></img></td>
            <td class='white_font' >${product.description}</td>
            <td class='white_font' >${product.code}</td>
            <td class='white_font' >${product.stock}</td>
            <td class='white_font' ><button class='btn btn-danger' onclick='addProductToCart("${product._id}")'>Agregar al carrito</button></td>
            </tr>`;
    });
    tbody_products.innerHTML = html;
  } catch (err) {
    // console.log(err);
  }
}

function addProductToCart(idProduct) {
    let idcart = localStorageCart.idCart
    let URL = `${URLBASECART}/${idcart}/products`;
    fetch(URL, {
        method: "POST",
        body: JSON.stringify(
            {id: idProduct}
        ),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
}

function getData() {
  fetch(URLBASEPRODUCTS)
    .then((response) => response.json())
    .then((data) => {
      setDataOnCard(data);
    });
}

function setDataUser() {
  let URL = URLBASEUSERNAME + "/get";
  fetch(URL).then((response) => {
    if (response.status === 200) {

      console.log(response);
        
      response.json().then((data) => {
        
        currentUser = data.user;
        wellcome_message.innerHTML = `Bienvenido ${data.user.username}`;
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        verifyCart();
      });
    } else {
      window.location.href = "./login.html";
    }
  });
}

function verifyCart() {
    localStorageCart = JSON.parse(localStorage.getItem("localStorageCart"));
    console.log(localStorageCart);
    console.log(currentUser);
    if (localStorageCart === null) {
        console.log("no hay carrito");
        createCart();
    } else {
        if (currentUser._id != localStorageCart.idUser) {
            console.log("no es el mismo usuario");
            createCart();
        }   else {
            console.log("no se crea el carrito");
        }
    }
}

function createCart(){
    let URL = URLBASECART;
    fetch(URL, {
        method: "POST",
        body: JSON.stringify({
            user: localStorage.getItem("idUser"),
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.id.insertedId, "localStorageCart");
            localCart = {
                idCart: data.id.insertedId,
                idUser: currentUser._id,
            };
            console.log(localCart, "localStorageCart");
            localStorage.setItem("localStorageCart", JSON.stringify(localCart));
        });
}

log_out_button.addEventListener("click", (e) => {
  e.preventDefault();
  let URL = URLBASEUSERNAME + "/logout";
  console.log(URL);
  fetch(URL).then((response) => {
    window.location.href = "./login";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  setDataUser();
  getData();
  
});
