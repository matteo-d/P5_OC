// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));

// Display des articles présents dans le panier
let html =""
// Boucle pour récupérer toutes les variables des produits + (Foreach)
for(let i = 0; i < productInLocalStorage.length; i++) {
  //Html pur , Créer les élément, clone prototype
 html += `
<ul>
 <li><img src="${productInLocalStorage[i].imageUrl}" alt="Ours ${productInLocalStorage[i].name}">
 </li>
 <li>${productInLocalStorage[i].selectedColor}
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

// Logique boutons quantité +
let btnPlus = document.querySelectorAll(".btnPlus"); 
for(let x = 0; x < btnPlus.length; x++) {

  btnPlus[x].addEventListener('click', () => {
    let quantity = btnPlus[x].previousElementSibling.previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    compteur ++ ;
    console.log(quantity)
    console.log(typeof compteur)
    quantity.innerText = compteur;

 // Logique Affichage prix quand boutton + est clické 

    // Récupérer la quantité séléctioné en nombre
   let parsedQuantity = parseFloat(quantity.innerHTML);
      console.log(  parsedQuantity);
    // Récupérer le prix de base de ce produit
   
    //Calcul 
    let newPrice = (parsedQuantity * price);  
      console.log(newPrice);
      console.log(typeof newPrice);
   //Afficher le résultat
btnPlus[x].parentElement.nextElementSibling.firstElementChild.innerHTML = newPrice;
})
};

// Logique boutons quantité -

let btnMinus = document.querySelectorAll(".btnMinus");

for(let z = 0; z < btnPlus.length; z++) {
  btnMinus[z].addEventListener('click', () => {
    let quantity = btnMinus[z].previousElementSibling;
    let compteur = parseInt(quantity.innerText);

    if(compteur > 1) {
      compteur --;
    }
    quantity.innerText = compteur
 
});
}



// Vider un élément!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Attention ne supprime pas l'element du local storage !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let btnDelete = document.querySelectorAll(".clearCart");

for(let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener('click', () => {
    btnDelete[j].parentElement.parentElement.remove();
})
}

// Vider le panier 
const clearAll  = document.getElementById("clearCart");
clearAll.addEventListener('click',(e)=> {
  e.preventDefault;
// vide le local storage
  localStorage.removeItem('cartItem');
  // reload la page
  window.location.href = "panier.html"
})




