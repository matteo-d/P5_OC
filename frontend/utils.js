export {displayNumberOfProductsInCart} ;

//***************  Fonction affiché le nombre d'article sélectionné DES arrivé sur page ( à coté icone panier ) dès l'arrivé sur la page
const displayNumberOfProductsInCart = () => {
  
      let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
      let numberOfArticleInCart = productInLocalStorage.length;
      console.log(numberOfArticleInCart);
      let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
      numberOfArticleInCartEl.innerText = numberOfArticleInCart;
  };
