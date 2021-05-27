function main() {
  const form = document.querySelector(".searchForm");
  form.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const value = Object.fromEntries(data.entries());
  document.querySelector(".pruductsFound").innerHTML = "";
  fetchProducts(value["search-bar"]);
}

function fetchProducts(input) {
  fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + input, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((json) => loadProducts(json));
}

function loadProducts(json) {
  const searchCounter = document.querySelector(".searchCounter");
  searchCounter.textContent = "Resultados: " + json.paging.total;

  if ("content" in document.createElement("template")) {
    // Instantiate the table with the existing HTML productsFound
    // and the row with the template
    for (let index = 0; index < json.results.length; index++) {
      var productsFound = document.querySelector(".pruductsFound");
      var template = document.querySelector(".productTemplate");

      // Clone the new row and insert it into the table
      var clone = template.content.cloneNode(true);
      var productName = clone.querySelector(".productName");
      productName.textContent = json.results[index].title;
      var productPrice = clone.querySelector(".productPrice");
      productPrice.textContent = "$" + json.results[index].price;
      var productCondition = clone.querySelector(".productCondition");
      productCondition.textContent = json.results[index].condition;
      var productImage = clone.querySelector(".productImage");
      productImage.setAttribute("src", json.results[index].thumbnail);
      var productSold = clone.querySelector(".productSold");
      productSold.textContent =
        "Vendidos: " + json.results[index].sold_quantity;
      var productBox = clone.querySelector(".productBox");
      productBox.setAttribute("href", json.results[index].permalink);
      productsFound.appendChild(clone);
    }
  } else {
    // Find another way to add the rows to the table because
    // the HTML template element is not supported.
  }
}

main();
