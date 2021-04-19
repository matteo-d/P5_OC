// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
console.table(productInLocalStorage)
// Display des articles présents dans le panier
let html =""
// Boucle pour récupére toutes les variables des produits + (Foreach)
for(let i = 0; i < productInLocalStorage.length; i++) {
  console.log(productInLocalStorage[i].name); 
  //Html pur , Créer les élément, clone prototype
 html += `
 <ul>
 <li><img src="${productInLocalStorage[i].imageUrl}" alt="Ours ${productInLocalStorage[i].name}"></li>
 <li>${productInLocalStorage[i].selectedColor}</li>
 <li>${productInLocalStorage[i].chosenQuantity}</li>
 <li>${(productInLocalStorage[i].price / 100).toFixed(2).replace(".", ",")} </li>
 <li>ClearCart</li>
</ul>
`
document.querySelector(".selectedProduct").innerHTML = html
}


// Pour chaque objet dans l'array on créer un élément produit que l'on mets dans le panier
