export {displayNumberOfProductsInCart} ;

//***************  Fonction affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page
const displayNumberOfProductsInCart = () => {
    // Si il y un Objet "cartItem" dans le local storage
    if (JSON.parse(localStorage.getItem("cartItem"))) {
      // On le récupère
      let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
      // Création variable nombres d'articles = nombre d'article dans le local storage
      let numberOfArticleInCart = productInLocalStorage.length;
      console.log(numberOfArticleInCart);
      // On vise le span "itemsInCart" à coté de l'icone panier
      let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
      // Son Text est le nombre d'article dans le local storage
      numberOfArticleInCartEl.innerText = numberOfArticleInCart;
    }
  };