// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));







//////////////////////// Display des articles présents dans le panier
let html =""
// Boucle pour récupérer toutes les variables des produits + (Foreach)
for(let i = 0; i < productInLocalStorage.length; i++) {
  // To display the right price Onload
  let number = ((productInLocalStorage[i].chosenQuantity))
  let multiplicator =( (productInLocalStorage[i].price / 100))
  let result = number * multiplicator;
 let twoDecimalResult = (Math.round(result * 100) / 100).toFixed(2)
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
 <span id="price">${twoDecimalResult }  </span>
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
      
   //Afficher le résultat
   let updatedPriceEl = btnPlus[x].parentElement.nextElementSibling.firstElementChild;
 
   updatedPriceEl.innerText = newPrice ;


    /// Total Panier
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll('#price');
    let elQuantity = document.querySelectorAll('.quantityOfProduct')
    for(let d = 0; d < elPrice.length; d++) { 
      let a = (parseInt(elQuantity[d].innerText));
     
      let b = (productInLocalStorage[d].price);
    
      let sum = (a * b) 
      
      calcul.push(sum)
    }

    const add = (a, b) => a + b
  let result = calcul.reduce(add);
  
 let resultFloat =  ((result / 100).toFixed(2).replace(".", ","));
  console.log( resultFloat);
  totalText.innerHTML = (resultFloat)


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
   
   //Afficher le résultat
   let updatedPriceEl = btnMinus[z].parentElement.nextElementSibling.firstElementChild;
  
   updatedPriceEl.innerText = newPrice ;

    /// Total Panier
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll('#price');
    let elQuantity = document.querySelectorAll('.quantityOfProduct')
    for(let d = 0; d < elPrice.length; d++) { 
      let a = (parseInt(elQuantity[d].innerText));
     
      let b = (productInLocalStorage[d].price);
    
      let sum = (a * b) 
      
      calcul.push(sum)
    }

    const add = (a, b) => a + b
  let result = calcul.reduce(add);
  
 let resultFloat =  ((result / 100).toFixed(2).replace(".", ","));
  console.log( resultFloat);
  totalText.innerHTML = (resultFloat)

});
}
  







/////////////// Vider un élément
let btnDelete = document.querySelectorAll(".clearCart");

for(let j = 0; j < btnDelete.length; j++) {
  btnDelete[j].addEventListener('click', () => {
      
    btnDelete[j].parentElement.parentElement.remove();
    productInLocalStorage.splice([j], 1);
   
    localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
    
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




