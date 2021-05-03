
import { displayNbsItemsInCartDynamically, displayTotalValueOfTheCart, displayTotalPriceDynamically, deleteOneElOfCart, deleteAllCart,chooseYourQuantityPlus,chooseYourQuantityMinus} from "./utils.js"

// On recupère l'array contenant les objets du local sotrage
let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
//////////////////////// Display des articles présents dans le panier
let html = "";
// Tableau vide pour acceuillir tout les prix
let TotalPriceOnLoad = [];
if (productInLocalStorage) {
 productInLocalStorage.forEach( (el) => {
  //  Display the right price Onload
  let number = el.chosenQuantity;
  let multiplicator = el.price / 100;
  let result = number * multiplicator;
  let twoDecimalResult = (Math.round(result * 100) / 100).toFixed(2);
  //  Display the right TOTAL price Onload
  TotalPriceOnLoad.push(result);

  html += `
<ul>
<li><img id="${el._id}" src="${el.imageUrl}" alt="Ours ${el.name}">
</li>
<li class="selectedColor">${el.selectedColor}
</li>
<li>
    <span class="quantityOfProduct"> ${el.chosenQuantity}</span>
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

 })
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
  productInLocalStorage.forEach( (el) => {
let ids = el._id
// Si id envoyé est bien de type string on l'ajoute au tableau produits
if (typeof ids === 'string') {
  produitsArray.push(ids)
}
  })
  let objetCommande = {contactObj,produitsArray}
  console.log(objetCommande)

function handleErrors(response) {
  if (!response.ok) {
    let errorMessage = "";
    errorMessage = `<h1> Le serveur n'est pas connecté <h1>
    `
    document.getElementById("main").innerHTML = errorMessage;
  }
  return response;
}
  // Envoyer l'objet de commande sur une API de test qui renvoi un ID  
 const promessePost = fetch('https://restapi.fr/api/posts',  {
method: "POST",
body: JSON.stringify(objetCommande),
headers : {
  "Content-type" : "application/json",
}
 })

// Voir ce que l'oen envoi dans la console
promessePost.then(async(response)=>{
  try {
    console.log('Success')
    console.log(response);
 
    const contenu = await response.json()
    console.log("Contenu de l'objet commande envoyé au serveur")
    console.log(contenu)
    if(response.ok) {
      // Récupération de l'id envoyé par l'API Test
      console.log(contenu._id)
    }
  }catch(e) {
    console.log(e)
  }
// Ce qu'il y a sur le serveur 
  const promesseGet = fetch('https://restapi.fr/api/posts')
  promesseGet.then(async(response)=> {
    try {
      console.log('Success')
      console.log(promesseGet)
      const donnee = await response.json();
      console.log('Historique commandes validées sur le serveur')
      console.log(donnee);
    }
    catch(e) {
      console.log(e)
    }
  })
})
});
