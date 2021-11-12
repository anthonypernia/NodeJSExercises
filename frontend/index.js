let text_h1 = document.getElementById("text_example");
let btn_home = document.getElementById('btn_home');
let btn_cart = document.getElementById('btn_cart');
let card_group_products = document.getElementById("card_group_products");
let URL_BASE = "http://192.168.0.10:8080";
let UrlProducts = URL_BASE + "/api/products";
let UrlCart = URL_BASE + "/api/cart";
let cartId=0;

btn_cart.addEventListener('click', function () {
  window.location.href = 'cart.html';
});

function createCard(product) {
  let card_html = `
    <div class="card" style="max-width: 540px;">
        <img src="${product.photo}" class="card-img-top" style="width: 10rem;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><small class="text-muted">Price : ${product.price}</small></p>
          <button type="button" class="btn btn-primary" onclick="addToCart(${product.id})">Add to cart</button>
        </div>
    </div>
    `;
  return card_html;
}

function createCart() {
  cartId = localStorage.getItem("cartId");
  if (cartId == null) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    };
    fetch(UrlCart, options)
      .then((response) => response.json())
      .then((data) => {
        cartId = data.id;
        localStorage.setItem("cartId", cartId);
      }
      );
  }
}

async function addToCart(id) {

  if (cartId == 0){
    createCart();
  }
    UrlCartAdd = `${UrlCart}/${cartId}/products/`
    let data = {
      id: id,
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(UrlCartAdd, options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
}


async function getData() {
  let response = await fetch(UrlProducts);
  let data = await response.json();
  return data;
}

// 
$(document).ready(function() {
    getData().then(data => {
        data.forEach(product => {
        card_group_products.innerHTML += createCard(product);
        });
    }).catch(error => {
        console.log(error);
    });
});

