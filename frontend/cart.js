// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));

//////////////////////// Display des articles présents dans le panier
let html =""
// Boucle pour récupérer toutes les variables des produits + (Foreach)
for(let i = 0; i < productInLocalStorage.length; i++) {
  //Html pur , Créer les élément, clone prototype
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
 <span id="price">${(productInLocalStorage[i].price / 100).toFixed(2).replace(".", ",")}  </span>
 €
 </li>
 <li>
 <button class="clearCart">ClearCart</button>
 </li>
</ul>
`
document.querySelector(".selectedProduct").innerHTML = html
}

//////////////////////////////////////// Logique boutons quantité +
let btnPlus = document.querySelectorAll(".btnPlus"); 
for(let x = 0; x < btnPlus.length; x++) {

  btnPlus[x].addEventListener('click', () => {
    let quantity = btnPlus[x].previousElementSibling.previousElementSibling;
    let compteur = parseInt(quantity.innerText);
    
    compteur ++ ;
    console.log(quantity)
    console.log(typeof compteur)
    quantity.innerText = compteur;

 ////////////////////////// Logique Affichage prix quand boutton + est clické 
    // Récupérer la quantité séléctioné en nombre
   let parsedQuantity = parseFloat(quantity.innerHTML);
    // Récupérer le prix de base de ce produit
   let product = btnPlus[x].parentElement.parentElement.firstElementChild.firstElementChild.id;

   switch(product) {
     case "5be9c8541c9d440000665243" :
       price = 2900;
       break;
       case "5beaa8bf1c9d440000a57d94":
        price = 3900;
       break;
       case "5beaaa8f1c9d440000a57d95" :
        price = 5900;
       break;
       case "5beaabe91c9d440000a57d96" :
        price = 4500;
       break;
       case "5beaacd41c9d440000a57d97" :
        price = 5500;
       break;
   }
    //Calcul 
    let newPrice = (((parsedQuantity * price) / 100).toFixed(2).replace(".", ","));  
      console.log(newPrice);
   //Afficher le résultat
   let updatedPriceEl = btnPlus[x].parentElement.nextElementSibling;
 
   updatedPriceEl.innerText = newPrice + "€";

})
};

//////////////////////////////////// Logique boutons quantité -

let btnMinus = document.querySelectorAll(".btnMinus");

for(let z = 0; z < btnPlus.length; z++) {
  btnMinus[z].addEventListener('click', () => {
    let quantity = btnMinus[z].previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    if(compteur > 1) {
      compteur --;
    }
    quantity.innerText = compteur
  //////////////////////// Logique Affichage prix quand boutton - est clické 
    // Récupérer la quantité séléctioné en nombre
    let parsedQuantity = parseFloat(quantity.innerHTML);
    // Récupérer le prix de base de ce produit
   let product = btnMinus[z].parentElement.parentElement.firstElementChild.firstElementChild.id;
    console.log(product)
   switch(product) {
     case "5be9c8541c9d440000665243" :
       price = 2900;
       break;
       case "5beaa8bf1c9d440000a57d94":
        price = 3900;
       break;
       case "5beaaa8f1c9d440000a57d95" :
        price = 5900;
       break;
       case "5beaabe91c9d440000a57d96" :
        price = 4500;
       break;
       case "5beaacd41c9d440000a57d97" :
        price = 5500;
       break;
   }
    //Calcul 
    let newPrice = (((parsedQuantity * price) / 100).toFixed(2).replace(".", ","));  
      console.log(newPrice);
   //Afficher le résultat
   let updatedPriceEl = btnMinus[z].parentElement.nextElementSibling;
   console.log(updatedPriceEl);
   updatedPriceEl.innerText = newPrice + "€";

});
}
  ///////////////////////////////// Total Panier
  let totalPanier = [];
for(let v = 0; v < productInLocalStorage.length; v++) {
let prixProduitEl = productInLocalStorage[v].price;

totalPanier.push(prixProduitEl);
// Additionner tout les prix d'un tableau
console.log(totalPanier);
}
const reducer = (accumulator, currentValue) => accumulator + currentValue;
console.log(totalPanier.reduce(reducer))

/////////////// Vider un élément!!!!!!!!!!!! Attention ne supprime pas l'element du local storage !!!!!!!!!!!!!!!
let btnDelete = document.querySelectorAll(".clearCart");
console.log(productInLocalStorage)
for(let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener('click', () => {
      
let getLocalStorage = JSON.parse(localStorage.getItem('cartItem'));
console.log(getLocalStorage[j]);
let ItemRemoved = getLocalStorage.splice(j,1)
console.log(ItemRemoved);
localStorage.setItem("cartItem", JSON.stringify(ItemRemoved));

    btnDelete[j].parentElement.parentElement.remove();
    
})
}

///////////////////////////////// Vider le panier 
const clearAll  = document.getElementById("clearCart");
clearAll.addEventListener('click',(e)=> {
  e.preventDefault;
// vide le local storage
  localStorage.removeItem('cartItem');
  // reload la page
  window.location.href = "panier.html"
})




