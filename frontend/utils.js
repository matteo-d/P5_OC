export {displayNumberOfProductsInCart, displayTotalPrice} ;

//***************  Fonction affiché le nombre d'article sélectionné DES arrivé sur page ( à coté icone panier ) dès l'arrivé sur la page
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


//  ******************** Mettre a jour le prix total APRES MODIFICATION sur la page
const displayTotalPrice = () => {
    let totalText = document.getElementById("totalPrice");
    let calcul = [];
    let elPrice = document.querySelectorAll("#price");
    let elQuantity = document.querySelectorAll(".quantityOfProduct");
    for (let d = 0; d < elPrice.length; d++) {
      let a = parseInt(elQuantity[d].innerText);

      let b = productInLocalStorage[d].price;

      let sum = a * b;

      calcul.push(sum);
    }

    const add = (a, b) => a + b;
    let result = calcul.reduce(add);

    let resultFloat = (result / 100).toFixed(2).replace(".", ",");
    console.log(resultFloat);
    totalText.innerHTML = resultFloat;
};
