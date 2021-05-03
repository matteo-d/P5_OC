
import { displayNbsItemsInCartDynamically} from "./utils.js"


function handleErrors(response) {
  if (!response.ok) {
    let errorMessage = "";
    errorMessage = `<h1> Le serveur n'est pas connecté <h1>
    `
    document.getElementById("main").innerHTML = errorMessage;
  }
  return response;
}

 // Extract query string 

 let url = window.location
 console.log(url)

/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);
console.log(productId)
// Gestion d'erreur si Url faux
let validUrls = ["5be9c8541c9d440000665243","5beaa8bf1c9d440000a57d94", "5beaaa8f1c9d440000a57d95", "5beaabe91c9d440000a57d96", "5beaacd41c9d440000a57d97" ]
console.log(validUrls)
// Si l'URL ne contient pas un id de produit valable 
if (!validUrls.includes(productId)) {
  let errorMessage = "";
  errorMessage = `<h1> L'URL ne correspond à aucun article <h1>
  `
  document.getElementById("main").innerHTML = errorMessage;
}
/* Récupération du produit avec l'id associé depuis le serveur */
const MyURL = new URL (`http://localhost:3000/api/teddies/${productId}`)


if (validUrls.includes(productId)) {
fetch(MyURL)
.then(handleErrors)
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
            <button id="addToCart" class="addCart">Add</button>
            <span class="message"> </span>
        </div>`;
    document.getElementById("main").innerHTML = html;
        

    // Number of article in cart next to Cart Image 
   // On recupère l'array contenant les objets du local sotrage
   if (JSON.parse(localStorage.getItem("cartItem"))) {
    displayNbsItemsInCartDynamically();
   }
  
    //Affichage des choix de couleurs
    let choice = document.querySelector(".section_choice");
    productResp.colors.forEach( (colors) => {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option);
    });
    
    // Logique boutons quantité + et -
    let btnPlus = document.getElementById("btnPlus");
    let btnMinus = document.getElementById("btnMinus");
    let quantity = document.getElementById("quantityOfProduct");
    let compteur = parseInt(quantity.innerText);

    btnPlus.addEventListener("click", () => {
      compteur++;
      quantity.innerHTML = compteur;
    });
    btnMinus.addEventListener("click",  () => {
      if (compteur > 1) {
        compteur--;
      }
    quantity.innerHTML = compteur;
    });

    // Au clic l'élément et option sélectionné au local storage
    let btnAddToCart = document.querySelector(".addCart");
    let selectedValue = document.getElementById("select_choice");
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));

    btnAddToCart.addEventListener("click", (e) => {
      e.preventDefault();
      // trouver la valeur selectionée par l'utilisateur
      let selectedColor = selectedValue.options[selectedValue.selectedIndex].value;

      let chosenQuantity = parseInt(quantity.innerText);
      // stockage de la valeur sélectionné dans un objet
      let cartItem = {
        _id: productResp._id,
        imageUrl: productResp.imageUrl,
        name: productResp.name,
        price: productResp.price,
        chosenQuantity: chosenQuantity,
        selectedColor: selectedColor,
      };
      // Local Storage       
      // Action si local storage contient dejà un article
      if (productInLocalStorage) {
        // Ajouter une condition si le meme objet avec la meme couleur est deja dans le panier annulé ajout au localstorage
        if (
          productInLocalStorage.some((el) => el._id == cartItem._id) == true
        ) {
      let messageEl = document.querySelector('.message')
       messageEl.innerText = "déja dans le panier"
        } else {
          window.scrollTo(0,0);
          productInLocalStorage.push(cartItem);
          localStorage.setItem(
            "cartItem",
            JSON.stringify(productInLocalStorage)
          );
          let messageEl = document.querySelector('.message')
          messageEl.innerText = "Ajouter";
          window.scrollTo(0,0);
        }
      } else {
        productInLocalStorage = [];
        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        let messageEl = document.querySelector('.message')
        messageEl.innerText = "Ajouter";
        window.scrollTo(0,0);
      };

    
      // Number of article in cart next to Cart Image 
    // On recupère l'array contenant les objets du local sotrage
    displayNbsItemsInCartDynamically();

    });
  });
}
  
