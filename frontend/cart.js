import {
  displayNumberOfProductsInCart,
  displayPriceDynamically,
} from "./utils.js";
// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
//////////////////////// Display des articles présents dans le panier
let html = "";
// Tableau vide pour acceuillir tout les prix
let TotalPriceOnLoad = [];

if (productInLocalStorage) {
  for (let i = 0; i < productInLocalStorage.length; i++) {
    //  Display the right price Onload
    let number = productInLocalStorage[i].chosenQuantity;
    let multiplicator = productInLocalStorage[i].price / 100;
    let result = number * multiplicator;
    let twoDecimalResult = (Math.round(result * 100) / 100).toFixed(2);
    //  Display the right TOTAL price Onload
    TotalPriceOnLoad.push(result);

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
}

// Affiché le nbres d'items dans le panier
displayNumberOfProductsInCart();

// Affiché le prix TOTAL du panier dès l'arrivé sur la page
if (productInLocalStorage) {
  displayPriceDynamically();
}

//////////////////////////////////////// Logique boutons quantité +
let btnPlus = document.querySelectorAll(".btnPlus");
console.log(typeof btnPlus);
for (let x = 0; x < btnPlus.length; x++) {
  btnPlus[x].addEventListener("click", () => {
    let quantity = btnPlus[x].previousElementSibling.previousElementSibling;
    let compteur = parseInt(quantity.innerText);
    compteur++;
    quantity.innerText = compteur;

    // Récupérer la quantité séléctioné en nombre
    let parsedQuantity = parseFloat(quantity.innerHTML);
    let product =
      btnPlus[x].parentElement.parentElement.firstElementChild.firstElementChild
        .id;

    let price;
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

    /// Total Panier dynamique
    displayPriceDynamically();
  });
}

//////////////////////////////////// Logique boutons quantité -

let btnMinus = document.querySelectorAll(".btnMinus");
console.log(typeof btnMinus);
for (let z = 0; z < btnPlus.length; z++) {
  btnMinus[z].addEventListener("click", () => {
    let quantity = btnMinus[z].previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    if (compteur > 1) {
      compteur--;
    }
    quantity.innerText = compteur;

    // Récupérer la quantité séléctioné en nombre
    let parsedQuantity = parseFloat(quantity.innerHTML);
    // Récupérer le prix de base de ce produit
    let product =
      btnMinus[z].parentElement.parentElement.firstElementChild
        .firstElementChild.id;
    let price;
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

    /// Total Panier à chaque changement de quantité
    displayPriceDynamically();
  });
}

/////////////// Vider un élément
let btnDelete = document.querySelectorAll(".clearCart");
console.log(typeof btnDelete + "btnDelete");
for (let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener("click", () => {
    btnDelete[j].parentElement.parentElement.remove();
    productInLocalStorage.splice([j], 1);
    localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));

    /// Total Panier à chaque changement de quantité
    displayPriceDynamically();

    // Number of article in cart next to Cart Image
    displayNumberOfProductsInCart();
    window.scrollTo(0, 0);
  });
}

///////////////////////////////// Vider le Local Storage
const clearAll = document.querySelector(".clearAll");
clearAll.addEventListener("click", (e) => {
  e.preventDefault();
  // vide le local storage
  localStorage.removeItem("cartItem");
  // reload la page
  window.location.href = "panier.html";
});

///********************* */ Gestion formulaire
let form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // récupérer les value du form pour l'objet contact
  let contactObj = {};
  contactObj.firstname = form.firstname.value;
  contactObj.lastname = form.lastname.value;
  contactObj.adress = form.adress.value;
  contactObj.city = form.city.value;
  contactObj.email = form.email.value;
  console.log(contactObj);
  //récupérer les id présents dan le panier pour le tableau produit
  let produitsArray = [];
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
  for (let i = 0; i < productInLocalStorage.length; i++) {
    let ids = productInLocalStorage[i]._id;
    // Si id envoyé est bien de type string
    if (typeof ids === "string") {
      produitsArray.push(ids);
    }
  }
  console.log(produitsArray);
  // Et si  l'objet contact et le tableau d'ids ne sont pas  vides
  if (produitsArray.length > 0 && Object.keys(contactObj).length > 0) {
    // Envoie au backend ?
    fetch("http://localhost:5501", { method: "POST" })
      .then((results) => results.json())
      .then(console.log);

    // Sauvegardé dans le session storage pour affiché page confirmation
  }
});
