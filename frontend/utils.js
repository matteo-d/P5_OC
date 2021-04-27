export {displayNumberOfProductsInCart, displayInCartTotalPrice} ;

//***************  Fonction affiché le nombre d'article sélectionné DES arrivé sur page ( à coté icone panier ) dès l'arrivé sur la page
const displayNumberOfProductsInCart = () => {
  
      let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
      let numberOfArticleInCart = productInLocalStorage.length;
      console.log(numberOfArticleInCart);
      let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
      numberOfArticleInCartEl.innerText = numberOfArticleInCart;
  };

  
//***************  Fonction affiché le nombre d'article sélectionné DES arrivé sur page ( à coté icone panier ) dès l'arrivé sur la page
const displayInCartTotalPrice = () => {
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
  }