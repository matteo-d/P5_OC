
//////////////////////////////////////////////// Display Index HTML
function displayIndexHTML (products) {

    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";
    products.forEach((productElement) => {
      //Html pur , Créer les élément, clone prototype
   let EuropeanFormatedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR',}).format(productElement.price / 100 );
      html += `
      <div class="product">
          <img src="${productElement.imageUrl}" alt="Ours ${
        productElement.name
      }" class="ourspic">
          <article class="product_infos">
                <h2 id="name_product_${productElement.name}">${
        productElement.name
      }</h2>
                <p class="product_description" id="description_product_${
                  productElement.name
                }">${productElement.description}</p>   
                <p class="price" id="price_product_${productElement.name}">${
                  EuropeanFormatedPrice } </p>
                <a href="./produits.html?id=${
                  productElement._id
                }" class="btnGoTo">Voir</a>
        </div >
  `;
      document.getElementById("main").innerHTML = html;
    });
  }

  


//////////////////////////////////////////////// Display HTML PRODUIT
function displayProductHTML (product) {
  let EuropeanFormatedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR',}).format(product.price / 100 );
  // Affichage du produit
  html = `<div class="product">
    <img src="${product.imageUrl}" alt="Ours ${product.name}">
    <article class="product_infos">
      <h2 id="name_product_${product.name}">${product.name}</h2>
        <p class="product_description" id="description_product_${
            product.name
        }">${product.description}</p>   
        <p class="price" id="price_product_${product.name}">${
          EuropeanFormatedPrice}</p>    
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
        <select class="section_choice" name="colors" id="select_choice">
        <option disabled > Couleurs </option>
          <!-- Mes choix de couleurs dans la function forEach --!>
        </select>        
        <!-- Personalisation de la quantité -->
        <div id="container_quantity">
            <button id="btnMinus">-</button>
            <span id="quantityOfProduct">1</span>
            <button id="btnPlus">+</button>
        </div>
     
            <button id="addToCart" class="addCart">Ajouter</button>
            </article>
        `;
  document.getElementById("main").innerHTML = html;
  // Affichage des choix de couleurs
    let choice = document.querySelector(".section_choice");
    product.colors.forEach((colors) => {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option);
    });
  }
  
  
  //////////////////////////////////////////////// Display HTML CART
 function displayCartHTML () {
    if (JSON.parse(localStorage.getItem("cartItem")))  {
    // On recupère l'array contenant les objets du local sotrage
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    //////////////////////// Display des articles présents dans le panier
    let html = "";
    // Tableau vide pour acceuillir tout les prix
    let TotalPriceOnLoad = [];
    if (productInLocalStorage) {
      productInLocalStorage.forEach((el) => {
        //  Display the right price Onload
        let number = el.chosenQuantity;
        let multiplicator = el.price / 100;
        let result = number * multiplicator;
        let EuropeanFormatedPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR',}).format(el.price / 100 );
        //  Display the right TOTAL price Onload
        TotalPriceOnLoad.push(result);
    
        html += `
    <ul>
    <li><img id="${el._id}" src="${el.imageUrl}" alt="Ours ${el.name}">
    </li>
    <li class="selectedColor">${el.selectedColor}
    </li>
    <li>
        <span class="quantityOfProduct"> ${el.chosenQuantity}</span>
        <button class="btnMinus">-</button>         
        <button class="btnPlus">+</button>
    </li>
    <li class="totalElPrice" id="totalElprice">
    <span id="price">${EuropeanFormatedPrice }  </span>
    €
    </li>
    <li >
    <p class="clearCart">Vider</p>
    </li>
    </ul>
    `;
        document.querySelector(".selectedProduct").innerHTML = html;
      });
    }
  }
  else {
    alert("Votre panier est vide !")
  }
    }
