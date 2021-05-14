;(async () => {
    displayCartHTML(); 
    displayNbsItemsInCart();
    displayCartTotal();
    deleteOneElOfCart();
    deleteAllCart();
  
    handleForm();
  })()
  




// S'il existe, Vide localStorage d'1 produit (généré par page produits.html). source: request.js
//cleanOneProductData();
// S'il y a un produit dans le panier, affiche le HTML. source: vue.js
//displayCartHTML();
// S'il y a un produit dans le panier, affiche le nombre d'articles. source: utils.js 
//displayNbsItemsInCart();
// S'il y a un produit dans le panier, affiche le nombre d'articles. source: utils.js 
//displayTotalPriceOnLoad();
//  S'il y a un produit dans le panier, affiche le prix total du panier. source: utils.js 
//displayTotalPriceDynamically();
// Logique supression d'un élément du panier. source: utils.js 
//deleteOneElOfCart();
// Logique vider tout le panier. source: utils.js 
//deleteAllCart();
// Logique gestion du boutons quantité moins. source: utils.js 
//chooseYourQuantityMinus();
// Logique gestion du boutons quantité plus. source: utils.js 
//chooseYourQuantityPlus();
// Gestion du formulaire et de l'envoi des données au serveur. source: utils.js 
//handleForm();
