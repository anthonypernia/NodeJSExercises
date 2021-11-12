let btn_home = document.getElementById('btn_home');
let btn_cart = document.getElementById('btn_cart');
let URL_BASE = "http://192.168.0.10:8080";
let UrlCart = URL_BASE + "/api/cart";
let cartId = localStorage.getItem("cartId");;

btn_home.addEventListener('click', function () {
    window.location.href = 'index.html';
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


async function getData() {
    let UrlCartGet = `${UrlCart}/${cartId}/products`
    let response = await fetch(UrlCartGet);
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