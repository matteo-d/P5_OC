
export { displayNbsItemsInCartDynamically, displayTotalValueOfTheCart, displayTotalPriceDynamically, deleteOneElOfCart, deleteAllCart,chooseYourQuantityPlus,chooseYourQuantityMinus}

 const displayNbsItemsInCartDynamically = () => {
  
    let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem")));
    let numberOfArticleInCart = productInLocalStorage.length;
    let numberOfArticleInCartEl = document.querySelector(".itemsInCart")
    numberOfArticleInCartEl.innerText = numberOfArticleInCart ;
  }
 
  
  
  
   const displayTotalValueOfTheCart = () => {
    let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem")));
   
  let arrayOfElPrices = []
    for (let i = 0; i < productInLocalStorage.length; i++) {
      let quantity = productInLocalStorage[i].chosenQuantity;
      console.log(quantity);
      let decimalPrice = (Math.round(productInLocalStorage[i].price) / 100).toFixed(2);
      console.log(decimalPrice);
      let eachElTotal = quantity * decimalPrice;
      console.log(eachElTotal)
      arrayOfElPrices.push(eachElTotal);
    }
    let totalText = document.getElementById("totalPrice");
    // Additionner tout les Elements de l'array 
    const add = (a, b) => a + b;
    let TotalPrice = arrayOfElPrices.reduce(add);
    //
    totalText.innerHTML = TotalPrice;
  
  }
  
  
   const displayTotalPriceDynamically = () => {
    let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem")));
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


  
   const deleteOneElOfCart = () => {
    
  let btnDelete = document.querySelectorAll(".clearCart");
  // on va chercher le local storage
  let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem")));
  for (let j = 0; j < btnDelete.length; j++) {
    btnDelete[j].addEventListener("click", () => {
      if (productInLocalStorage.length > 1) {
      // Au clic supprime l'élément dynamiquement l'élément parent
      btnDelete[j].parentElement.parentElement.remove();
  // Au clic supprime le bon élément du local storage en "local"
      productInLocalStorage.splice([j], 1);
  // On renvoie au local storage le tableau sans l'élément supprimé 
      localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
      console.log(productInLocalStorage)  
      displayTotalPriceDynamically();
       // Total Items dans le panier 
       displayNbsItemsInCartDynamically();
       window.scroll(0,0)} 
       else  {
         btnDelete[j].parentElement.parentElement.remove();
        localStorage.removeItem("cartItem");
        let totalText = document.getElementById("totalPrice");
     totalText.innerText = "0" ;
        let numberOfArticleInCartEl = document.querySelector(".itemsInCart")
    numberOfArticleInCartEl.innerText = "0" ;
    window.scroll(0,0)
       }
      })
    };
  }
  
 
  
   const deleteAllCart = () => {
    let clearAll = document.querySelector(".clearAll");
  clearAll.addEventListener("click", () => {
    // vide le local storage
    localStorage.removeItem("cartItem");
    // reload la page
    window.location.href = "panier.html";
  })
  }
  

  
  
  
  
   const chooseYourQuantityPlus = () => {
    //////////////////////////////////////// Logique boutons quantité +
  let btnPlus = document.querySelectorAll(".btnPlus");
  for (let x = 0; x < btnPlus.length; x++) {
    btnPlus[x].addEventListener("click", () => {
      let quantity = btnPlus[x].previousElementSibling.previousElementSibling;
      let compteur = parseInt(quantity.innerText);
      compteur++;
      quantity.innerText = compteur;
  
      let parsedQuantity = parseFloat(quantity.innerHTML);
      // Récupérer le prix de base de ce produit
      let product =
        btnPlus[x].parentElement.parentElement.firstElementChild.firstElementChild
          .id;
          let price
      switch (product) {
        case "5be9c8541c9d440000665243":
          price = 2900;
          break;
        case "5beaa8bf1c9d440000a57d94":
          price = 3900;
          break;
        case "5beaaa8f1c9d440000a57d95":
          price = 5900;
          break;
        case "5beaabe91c9d440000a57d96":
          price = 4500;
          break;
        case "5beaacd41c9d440000a57d97":
          price = 5500;
          break;
      }
      //Calcul nouveau prix
      let newPrice = ((parsedQuantity * price) / 100)
        .toFixed(2)
        .replace(".", ",");
  
      //Afficher nouveau prix
      let updatedPriceEl =
        btnPlus[x].parentElement.nextElementSibling.firstElementChild;
  
      updatedPriceEl.innerText = newPrice;
  
      displayTotalPriceDynamically()
    });
  }
   }
  
  
    const chooseYourQuantityMinus = () => {
    //////////////////////////////////// Logique boutons quantité -
  
  let btnMinus = document.querySelectorAll(".btnMinus");
  
  for (let z = 0; z < btnMinus.length; z++) {
    btnMinus[z].addEventListener("click", () => {
      let quantity = btnMinus[z].previousElementSibling;
      let compteur = parseInt(quantity.innerText);
      if (compteur > 1) {
        compteur--;
      }
      quantity.innerText = compteur;
      // Récupérer la quantité séléctioné en nombre
      let parsedQuantity = parseFloat(quantity.innerHTML);
      // Récupérer le prix de base de ce produit
      let product =
        btnMinus[z].parentElement.parentElement.firstElementChild
          .firstElementChild.id;
          let price;
      console.log(product);
      switch (product) {
        case "5be9c8541c9d440000665243":
          price = 2900;
          break;
        case "5beaa8bf1c9d440000a57d94":
          price = 3900;
          break;
        case "5beaaa8f1c9d440000a57d95":
          price = 5900;
          break;
        case "5beaabe91c9d440000a57d96":
          price = 4500;
          break;
        case "5beaacd41c9d440000a57d97":
          price = 5500;
          break;
      }
      //Calcul nouveau prix
      let newPrice = ((parsedQuantity * price) / 100)
        .toFixed(2)
        .replace(".", ",");
      //Afficher le résultat
      let updatedPriceEl =
        btnMinus[z].parentElement.nextElementSibling.firstElementChild;
  
      updatedPriceEl.innerText = newPrice;
  
     displayTotalPriceDynamically();
    });
  }
  }
  

