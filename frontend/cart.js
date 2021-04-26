import { displayNumberOfProductsInCart, displayTotalPrice } from './utils.js';

// Récupère et parse l'objet Local Storage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));




//// Display du HTML
let html = "";
<<<<<<< HEAD
// Tableau qui acceuillera le prix total du panier dès arrivé sur la page 
=======
// Boucle sur l'objet local storage parser 
>>>>>>> parent of ffca23a...  création de fonction
let TotalPriceOnLoad = [];
// Boucle sur l'objet local storage parser
for (let i = 0; i < productInLocalStorage.length; i++) {
<<<<<<< HEAD
  // 
=======
  //  Display du total du panier au chargement de la page 
>>>>>>> parent of ffca23a...  création de fonction
  let number = productInLocalStorage[i].chosenQuantity;
  let multiplicator = productInLocalStorage[i].price / 100;
  let result = number * multiplicator;
  let twoDecimalResult = (Math.round(result * 100) / 100).toFixed(2);
  TotalPriceOnLoad.push(result);
  // Template HTML
  html += `
<ul>
 <li><img id="${productInLocalStorage[i]._id}" src="${productInLocalStorage[i].imageUrl}" alt="Ours ${productInLocalStorage[i].name}">
 </li>
 <li class="selectedColor">${productInLocalStorage[i].selectedColor}
 </li>
 <li>
      <span class="quantityOfProduct"> ${productInLocalStorage[i].chosenQuantity}</span>
      <button class="btnMinus">-</button>         
      <button class="btnPlus">+</button>
 </li>
 <li class="totalElPrice" id="totalElprice">
 <span id="price">${twoDecimalResult}  </span>
 €
 </li>
 <li >
  <p class="clearCart">Vider</p>
 </li>
</ul>
`;
  document.querySelector(".selectedProduct").innerHTML = html;
}

<<<<<<< HEAD
//***************  Fonction affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page

displayNumberOfProductsInCart();
// ************** Fonction affiché prix total dès arrivé
displayTotalPrice();


//  ********************************* Mettre a jour le prix Total dès l'arrivée sur la page
=======



 //  Affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page
   // Si il y un Objet "cartItem" dans le local storage 
   if (JSON.parse(localStorage.getItem("cartItem"))) {
     // On le récupère 
    let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem"))) ;
    // Création variable nombres d'articles = nombre d'article dans le local storage 
    let numberOfArticleInCart = productInLocalStorage.length;
    console.log(numberOfArticleInCart);
    // On vise le span "itemsInCart" à coté de l'icone panier
    let numberOfArticleInCartEl = document.querySelector(".itemsInCart")
    // Son innerText est le nombre d'article dans le local storage
    numberOfArticleInCartEl.innerText = numberOfArticleInCart ;
   }




// Affiché le prix total sélectionné dès l'arrivé sur la page
>>>>>>> parent of ffca23a...  création de fonction
let totalText = document.getElementById("totalPrice");
// méthode reduce pour additioner chaque prix dans le tableau " TotalPriceOnload", créer dans la première boucle du script cart.js
const add = (a, b) => a + b;
let TotalPrice = TotalPriceOnLoad.reduce(add);
// Une fois toute les valeurs additionner, les présenter en format décimal
totalText.innerHTML = TotalPrice.toFixed(2).replace(".", ",");




<<<<<<< HEAD
/// **************************** Logique boutons quantité +
=======


/// Logique boutons quantité +
>>>>>>> parent of ffca23a...  création de fonction
let btnPlus = document.querySelectorAll(".btnPlus");

for (let x = 0; x < btnPlus.length; x++) {
  btnPlus[x].addEventListener("click", () => {
    let quantity = btnPlus[x].previousElementSibling.previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    compteur++;

    quantity.innerText = compteur;

    // Logique Affichage prix quand boutton + est clické
    // Récupérer la quantité séléctioné en nombre
    let parsedQuantity = parseFloat(quantity.innerHTML);
    // Récupérer le prix de base de ce produit
    let product =
      btnPlus[x].parentElement.parentElement.firstElementChild.firstElementChild
        .id;

    switch (product) {
      case "5be9c8541c9d440000665243":
        price = 2900;
        break;
      case "5beaa8bf1c9d440000a57d94":
        price = 3900;
        break;
      case "5beaaa8f1c9d440000a57d95":
        price = 5900;
        break;
      case "5beaabe91c9d440000a57d96":
        price = 4500;
        break;
      case "5beaacd41c9d440000a57d97":
        price = 5500;
        break;
    }
    //Calcul nouveau prix
    let newPrice = ((parsedQuantity * price) / 100)
      .toFixed(2)
      .replace(".", ",");

    //Afficher nouveau prix
    let updatedPriceEl =
      btnPlus[x].parentElement.nextElementSibling.firstElementChild;

    updatedPriceEl.innerText = newPrice;





    /// Total Panier
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll("#price");
    let elQuantity = document.querySelectorAll(".quantityOfProduct");
    for (let d = 0; d < elPrice.length; d++) {
      let a = parseInt(elQuantity[d].innerText);

      let b = productInLocalStorage[d].price;

      let sum = a * b;

      calcul.push(sum);
    }

    const add = (a, b) => a + b;
    let result = calcul.reduce(add);

    let resultFloat = (result / 100).toFixed(2).replace(".", ",");
    console.log(resultFloat);
    totalText.innerHTML = resultFloat;
  });
}






// Logique boutons quantité -

let btnMinus = document.querySelectorAll(".btnMinus");

for (let z = 0; z < btnPlus.length; z++) {
  btnMinus[z].addEventListener("click", () => {
    let quantity = btnMinus[z].previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    if (compteur > 1) {
      compteur--;
    }
    quantity.innerText = compteur;

    // Logique Affichage prix quand boutton - est clické

    // Récupérer la quantité séléctioné en nombre
    let parsedQuantity = parseFloat(quantity.innerHTML);
    // Récupérer le prix de base de ce produit
    let product =
      btnMinus[z].parentElement.parentElement.firstElementChild
        .firstElementChild.id;
    console.log(product);
    switch (product) {
      case "5be9c8541c9d440000665243":
        price = 2900;
        break;
      case "5beaa8bf1c9d440000a57d94":
        price = 3900;
        break;
      case "5beaaa8f1c9d440000a57d95":
        price = 5900;
        break;
      case "5beaabe91c9d440000a57d96":
        price = 4500;
        break;
      case "5beaacd41c9d440000a57d97":
        price = 5500;
        break;
    }

    //Calcul nouveau prix
    let newPrice = ((parsedQuantity * price) / 100)
      .toFixed(2)
      .replace(".", ",");

    //Afficher le résultat
    let updatedPriceEl =
      btnMinus[z].parentElement.nextElementSibling.firstElementChild;

    updatedPriceEl.innerText = newPrice;

    /// Total Panier
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll("#price");
    let elQuantity = document.querySelectorAll(".quantityOfProduct");
    for (let d = 0; d < elPrice.length; d++) {
      let a = parseInt(elQuantity[d].innerText);

      let b = productInLocalStorage[d].price;

      let sum = a * b;

      calcul.push(sum);
    }

    const add = (a, b) => a + b;
    let result = calcul.reduce(add);

    let resultFloat = (result / 100).toFixed(2).replace(".", ",");
    console.log(resultFloat);
    totalText.innerHTML = resultFloat;
  });
}




// Vider un élément
let btnDelete = document.querySelectorAll(".clearCart");

for (let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener("click", () => {
    btnDelete[j].parentElement.parentElement.remove();
    productInLocalStorage.splice([j], 1);

    localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));

<<<<<<< HEAD
    displayTotalPrice();
    displayNumberOfProductsInCart();
=======
    /// Total Panier
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll("#price");
    let elQuantity = document.querySelectorAll(".quantityOfProduct");
    for (let d = 0; d < elPrice.length; d++) {
      let a = parseInt(elQuantity[d].innerText);

      let b = productInLocalStorage[d].price;

      let sum = a * b;

      calcul.push(sum);
    }

    const add = (a, b) => a + b;
    let result = calcul.reduce(add);

    let resultFloat = (result / 100).toFixed(2).replace(".", ",");
    console.log(resultFloat);
    totalText.innerHTML = resultFloat;
>>>>>>> parent of ffca23a...  création de fonction
  });
}



// Vider le panier entier
const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener("click", (e) => {
  e.preventDefault;
  // vide le local storage
  localStorage.removeItem("cartItem");
  // reload la page
  window.location.href = "panier.html";
});




// Validation du formulaire 

<<<<<<< HEAD
=======
let form = document.getElementById("form");
let submitBtn = document.getElementById("submit") 

>>>>>>> parent of ffca23a...  création de fonction
