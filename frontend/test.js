// Get products
const APIURL = "http://localhost:3000/api/teddies";
getProducts(APIURL);
async function getProducts(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showProducts(respData);
 
}
// Display product infos
function showProducts(products) {
  products.forEach((product) => {
    console.table(product);
   
    //Transform integrer to float number *********** BOF 
    let price = product.price / 100;
   
    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
      }
    financial(price);
    
    //Display product element template
    const main = document.getElementById("main");
    const productEl = document.createElement("div");
    productEl.classList.add("product_item");
    productEl.innerHTML = `     
          <img src="${product.imageUrl}" alt="Produit" id="img_product" />
          <article class="product_infos">
              <h2 id="name_product_${product.name}">${product.name}</h2>
              <p class="product_description" id="description_product_${product.name}">${product.description}</p>   
              <p class="price" id="price_product_${product.name}">${price} €</p>
              <form id="form_${product.name} class="form>
                <input id="quantity_${product.name} class="quantity" placeholder="quantité" type="number" name="quantité">
                <select id="select_${product.name}" name="${product.name}" class="select>
                   
                </select>
                <input value="Ajouter" class="add_to_cart" id="add_to_cart_${product.name}" type="button">  </input> 
               </form>  
          `;
    main.appendChild(productEl);
 
    // Create option elements according to API's DATA
 
    let colors = product.colors
 function displayColors() {

    for (const color in colors) {
     console.log(`${colors[color]}`);
     console.log(typeof color);
        
     const productEl = document.createElement("option");
     productEl.classList.add("product_item");
 }
}

  });
}

// Local storage

/* Display product Choices
function showChoices(products) {
    products.colors.forEach((product) => {
      console.log(product.value);
      const ul = document.getElementById("ul");
      const choiceEl = document.createElement("li");
     choiceEl.classList.add("choice_item");
  
      choiceEl.innerHTML = `     
          <li> lol <li>
            `;
  
      ul.appendChild(choiceEl);
    });
  }

// Button add to card

// Local storage

/*
function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);

        search.value = "";
    }
});
*/
