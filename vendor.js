const products = [];

// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => getDatas(data))
    .catch((error) => console.error("Error fetching data:", error));
});

function getDatas(datas) {
  const container = document.querySelector(".container");
  datas.forEach((data) => {
    let html = `
      <div class="product__image" id="${data.id}">
        <figure class="product__image--box">
          <img src="${data.image}" alt="${data.category}" />
          <span class="basket"><i id=${data.id} class="fa-solid fa-basket-shopping"></i></span>
        </figure>
        <div class="product__description">
          <div class="product__description--rate">
            <span>Count: ${data.rating.count}</span>
            <span>Rate: ${data.rating.rate}</span>
          </div>
          <div class="product__description--title">
            <h4>${data.title}</h4>
            <p>${data.description}</p>
          </div>
          <div class="product__description--price">
            <b>${data.price} $</b>
          </div>
        </div>
      </div>
    `;

    // Insert each product's HTML into the container
    container.insertAdjacentHTML("beforeend", html);
  });
}

// Use event delegation to handle clicks on the dynamically generated .basket elements
document
  .querySelector(".container")
  .addEventListener("click", function (event) {
    if (event.target.closest(".basket")) {
      let solidId = event.target.id;
      fetch(`https://fakestoreapi.com/products/${solidId}`)
        .then((response) => response.json())
        .then((data) => basketRender(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  });

function basketRender(data) {
  products.push(data);
  console.log(products);
}
