//////////////////////////////////////////////// Display Index HTML
function displayIndexHTML(products) {
  if (products !== undefined) { // Si data produit existe 
   
    let html = "";
    products.forEach((productElement) => {
      // Affichage des produits 
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
                <p class="price" id="price_product_${
                  productElement.name
                }">${formatPrice(productElement.price)} </p>
                <a href="./frontend/html/product.html?id=${
                  productElement._id
                }" class="btnGoTo">Voir</a>
        </div >
  `;
      document.getElementById("main").innerHTML = html;
    });
  } else {
    displayError("Le serveur n'est pas connecté, Veuillez réessayer ultérieurement");
  }
}

//////////////////////////////////////////////// Display HTML PRODUIT
function displayProductHTML(product) {
  if (product !== undefined) { // Si data produit existe 
  // Affichage du produit
  html = `<div class="product">
    <img src="${product.imageUrl}" class="img-product" alt="Ours ${product.name}">
    <article class="product_infos">
      <h2 id="name_product_${product.name}">${product.name}</h2>
        <p class="product_description" id="description_product_${
          product.name
        }">${product.description}</p>   
        <p class="price" id="price_product_${product.name}">${formatPrice(
    product.price
  )}</p>    
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
        <select class="section_choice" name="colors" id="select_choice">
        <option disabled > Couleurs </option>
          <!-- Mes choix de couleurs dans la function forEach --!>
        </select>        
        <!-- Personalisation de la quantité -->
        <div id="container_quantity">
            <button class="btnMinus">-</button>
            <span class="quantityOfProduct">1</span>
            <button class="btnPlus">+</button>
        </div>
     
            <button id="addToCart" class="addCart">Ajouter</button>
            <span class="message"> </span>
            </article>
        `;

  document.getElementById("main").innerHTML = html;
  // Affichage des choix de couleurs
  displayColorsOptions(product);
}
else {
  displayError("Le serveur n'est pas connecté, Veuillez réessayer ultérieurement")
}
}

//////////////////////////////////////////////// Display HTML CART
function displayCartHTML() {
  if (JSON.parse(localStorage.getItem("cartItem"))) {
    // On recupère l'array contenant les objets du local sotrage
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    //////////////////////// Display des articles présents dans le panier
    let html = "";
    if (productInLocalStorage) {
      productInLocalStorage.forEach((el) => {
        html += `
    <ul class="oneProductEl">
    <li><img id="${el._id}" src="${el.imageUrl}" alt="Ours ${el.name}">
    </li>
    <li class="selectedColor">${el.selectedColor}
    </li>
    <li>
        <span class="quantityOfProduct" > ${el.chosenQuantity}</span>
        <button class="btnMinus">-</button>         
        <button class="btnPlus">+</button>
    </li>
    <li class="totalElPrice" id="totalElprice">
    <span class="price">${(Math.round(el.price) / 100)
      .toFixed(2)
      .replace(".", ",")} </span>€
  
    </li>
    <li >
    <p class="clearCart">Vider</p>
    </li>
    </ul>
    `;
        document.querySelector(".selectedProduct").innerHTML = html;
      });
    }
  } else {
    displayError("Le panier est vide ");
  }
}

//////////////////////////////////////////////// Display HTML CONFIRMATION
function displayConfirmationHTML() {
  try {
  let idText = localStorage.getItem("orderId");
  let main = document.getElementById("main");
  let price = localStorage.getItem("cartTotalPrice").slice(1, -1);
  price.slice(1, -1); // Retire les guillemets
  let html = "";
  // Affichage du produit
  html = `<h1> Merci d'avoir effectué vos achats chez Orinoco !  </h1>
  <p>Votre commande d'un montant de <strong> ${price}€</strong>  à bien été prise en compte. </p>
  <p> Votre identifiant de commande est :<strong>  ${idText} </strong> </p>
  
  <a id="goToIndex" href="../../index.html"> Retour à la page d'acceuil </a>
  `;
  main.innerHTML = html;}
  catch (e) {
    console.log(e);
    displayError("Cette page n'est plus accessible");
  }
}

//////////////////////////////////////// Display ERROR

function displayError(errorMessage) {
  path = window.location.href
  console.log(path)
  cleanedPath = path.substring(0, path.indexOf('P5_OC/') + 'P5_OC/'.length);
  console.log(cleanedPath)
  pathGoToIndex = cleanedPath +'index.html'


  let body = document.querySelector("body");
  body.innerHTML = "";
  let html = "";
  // Affichage du produit
  html = `<style>
    body {
      position : absolute;
      min-width : 100%;
      min-height : 100%;
      font-family : Roboto;
      display: flex;
      flex-direction : column;
      justify-content : center ; 
      align-items: center; 
      font-size : 2rem; 
    }
    p {
      font-size: 1rem;
      text-align : center;
    }
    a {
      padding: 1rem;
      margin-top: 1rem;
    font-size : 1rem;
      border: solid 2px black; 
    }
  </style>   
    <h1> OUPS ! </h1>
    
    <p> ${errorMessage}</p>
    
    <a id="goToIndex" href="${pathGoToIndex}"> Retour à la page d'acceuil </a>
    `;
  body.innerHTML = html;
}
