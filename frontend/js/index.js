
// S'il existe, Vide localStorage d'1 produit (généré par page produits.html). source: request.js
cleanOneProductData();
// S'il n'existe pas déjà, load et enregistre data de L'API dans le local storage. source: request.js
getProductsData();
// Si data des produits existe dans le local storage, affiche le HTML. source: vue.js
displayIndexHTML();
// S'il y a un produit dans le panier, affiche le nombre d'articles. source: utils.js 
if (JSON.parse(localStorage.getItem("cartItem"))) {
  displayNbsItemsInCart();
}
