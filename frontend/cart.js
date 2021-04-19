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
      <span id="quantityOfProduct"> ${productInLocalStorage[i].chosenQuantity}</span>
      <button id="btnMinus_${productInLocalStorage[i].name}_${productInLocalStorage[i].selectedColor}">-</button>         
      <button id="btnPlus_${productInLocalStorage[i].name}_${productInLocalStorage[i].selectedColor}">+</button>
 </li>
 <li>
 ${(productInLocalStorage[i].price / 100).toFixed(2).replace(".", ",")}€
 </li>
 <li>
 <button class="clearCart">ClearCart</button>
 </li>
</ul>
`
document.querySelector(".selectedProduct").innerHTML = html

 // Logique boutons quantité + et - 

}
 
// Vider un élément §§§ Attention ne supprime pas l'el du local storage
let btnDelete = document.querySelectorAll(".clearCart");
console.log(btnDelete);

for(let j = 0; j < btnDelete.length; j++) {

  console.log(btnDelete[j]);
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




