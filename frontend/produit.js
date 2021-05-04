
import { displayNbsItemsInCartDynamically,  handleServerError, displayColorChoices, buttonsLogic, handleAddToCart,handleURLError } from "./utils.js"



 // Extract query string 
 let url = window.location
 console.log(url)


/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);
console.log(productId)


// Gestion d'erreur SI Url produit est faux
let validUrls = ["5be9c8541c9d440000665243","5beaa8bf1c9d440000a57d94", "5beaaa8f1c9d440000a57d95", "5beaabe91c9d440000a57d96", "5beaacd41c9d440000a57d97" ]
console.log(validUrls)
handleURLError(validUrls,productId);

/* Récupération du produit avec l'id associé depuis le serveur */
const MyURL = new URL (`http://localhost:3000/api/teddies/${productId}`)

if (validUrls.includes(productId)) {
fetch(MyURL)
.then(handleServerError)
  .then((productResp) => productResp.json())
  .then((productResp) => {
    let html = "";
    // Affichage du produit
    html = `<div class="product">
    <img src="${productResp.imageUrl}" alt="Ours ${productResp.name}">
    <article class="product_infos">
      <h2 id="name_product_${productResp.name}">${productResp.name}</h2>
        <p class="product_description" id="description_product_${
          productResp.name
        }">${productResp.description}</p>   
        <p class="price" id="price_product_${productResp.name}">${(
      productResp.price / 100
    )
      .toFixed(2)
      .replace(".", ",")} €</p>    
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
        <!--Btn Add to Cart-->
        <div id="container_addToCart">
            <button id="addToCart" class="addCart">Ajouter</button>
        </div>`;
    document.getElementById("main").innerHTML = html;
        
    displayColorChoices(productResp);
   // SI il y a des articles dans le panier, on en écrit le nombre à coté icone panier 
   if (JSON.parse(localStorage.getItem("cartItem"))) {displayNbsItemsInCartDynamically()};   
    // Logique boutons quantité + et -
    buttonsLogic();
    handleAddToCart(productResp);

  })
// Fermeture condition si fetch marche
}