
import { displayNbsItemsInCartDynamically, displayTotalValueOfTheCart, displayTotalPriceDynamically, deleteOneElOfCart, deleteAllCart,chooseYourQuantityPlus,chooseYourQuantityMinus} from "./utils.js"

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
 
if((JSON.parse(localStorage.getItem("cartItem")))) {


}
displayNbsItemsInCartDynamically();
displayTotalValueOfTheCart();
displayTotalPriceDynamically();
deleteOneElOfCart();
deleteAllCart();
chooseYourQuantityMinus();
chooseYourQuantityPlus();


///********************* */ Gestion formulaire 
let form = document.getElementById("form");

form.addEventListener('submit', (e) => {
  e.preventDefault();
// récupérer les value du form pour l'objet contact
let contactObj  = {};
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
let ids = productInLocalStorage[i]._id
// Si id envoyé est bien de type string
if (typeof ids === 'string') {
  produitsArray.push(ids)
}
}
console.log(produitsArray)
})

