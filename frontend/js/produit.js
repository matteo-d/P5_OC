;(async () => {
    const productId = getProductId();
    verifyProductIdValidity (); 
    const selectedProductData = await getProductsData( productId);
   displayProductHTML(selectedProductData);
   displayNbsItemsInCart()
   handleAddToCart(selectedProductData);
    handleQuantity();

  })()
  

  




// Si l'URL du produit est valide, enregistre data d'1 produit  de L'API dans le local storage. source: request.js
// getOneProductData();
// Si data d'1 produits existe dans le local storage, affiche le HTML. source: vue.js
// displayProduitHTML();
// S'il y a un produit dans le panier, affiche le nombre d'articles. source: utils.js
// displayNbsItemsInCart();
// Gère l'ajout du produit séléctionné au panier si ce dernier n'y est pas déjà. source: utils.js
// handleAddToCart();
// Gère logique des boutons + et - et l'affichage de la quantité. source: request.js
// handleQuantity();
