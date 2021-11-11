let text_h1 = document.getElementById("text_example");
// let input_name = document.getElementById("input_name");
// let input_pass = document.getElementById("input_pass");
let btn_submit = document.getElementById("btn_submit");
let card_group_products = document.getElementById("card_group_products");
let URL_BASE = "http://192.168.0.10:8080";
const requestURL = URL_BASE + "/api/products/";

function createCard(product) {
  let card_html = `
    <div class="card" style="max-width: 540px;">
        <img src="${product.photo}" class="card-img-top" style="width: 10rem;" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text"><small class="text-muted">Price : ${product.price}</small></p>
        </div>
    </div>
    `;
  return card_html;
}


async function getData() {
  let response = await fetch(requestURL);
  let data = await response.json();
  console.log(data);
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

