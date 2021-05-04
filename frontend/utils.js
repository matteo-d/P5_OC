
export { displayNbsItemsInCartDynamically, displayTotalValueOfTheCart, displayTotalPriceDynamically, deleteOneElOfCart, deleteAllCart,chooseYourQuantityPlus,chooseYourQuantityMinus,handleServerError,choixDeCouleurs, buttonsLogic, handleForm }

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

 const handleServerError = (response) => {
    if (!response.ok) {
      let errorMessage = "";
      errorMessage = `<h1> Le serveur n'est pas connecté <h1>
      `
      document.getElementById("main").innerHTML = errorMessage;
    }
    return response;
  }


  //Affichage des choix de couleurs
  const choixDeCouleurs = (productResp) => {
   let choice = document.querySelector(".section_choice");
   productResp.colors.forEach( (colors) => {
     let option = document.createElement("option");
     option.value = colors;
     option.textContent = colors;
     choice.appendChild(option);
   });
  }


  // Lofique quantité + et - des botuons 
  const buttonsLogic = () => {
    let btnPlus = document.getElementById("btnPlus");
    let btnMinus = document.getElementById("btnMinus");
    let quantity = document.getElementById("quantityOfProduct");
    let compteur = parseInt(quantity.innerText);

  btnPlus.addEventListener("click", () => {
    compteur++;
    quantity.innerHTML = compteur;
  });
  btnMinus.addEventListener("click",  () => {
    if (compteur > 1) {
      compteur--;
    }
  quantity.innerHTML = compteur;
  });
}

const handleForm = (productResp) => {
// Gestion de l'ajout de l'article au panier 
    let btnAddToCart = document.querySelector(".addCart");
    let selectedValue = document.getElementById("select_choice");
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    let quantity = document.getElementById("quantityOfProduct");
    btnAddToCart.addEventListener("click", (e) => {
      e.preventDefault();
      // trouver la valeur selectionée par l'utilisateur
      let selectedColor = selectedValue.options[selectedValue.selectedIndex].value;
      let chosenQuantity = parseInt(quantity.innerText);
      // stockage de la valeur sélectionné dans un objet
      let cartItem = {
        _id: productResp._id,
        imageUrl: productResp.imageUrl,
        name: productResp.name,
        price: productResp.price,
        chosenQuantity: chosenQuantity,
        selectedColor: selectedColor,
      };
      // Local Storage       
      // Action si local storage contient dejà un article
      if (productInLocalStorage) {
        // Action SI le panier contient déjà cet ours
        if (
          productInLocalStorage.some((el) => el._id == cartItem._id) == true
        ) {
      let messageEl = document.querySelector('.message')
       messageEl.innerText = productResp.name + " est déjà dans votre panier"
       window.scrollTo(0,0);
       //Action SI le panier ne contient PAS cet ours 
        } else {
          window.scrollTo(0,0);
          productInLocalStorage.push(cartItem);
          localStorage.setItem(
            "cartItem",
            JSON.stringify(productInLocalStorage)
          );
          let messageEl = document.querySelector('.message')
          messageEl.innerText = productResp.name + " ajouté au panier ";
        }
        // SI c'est le premier article 
      } else {
        productInLocalStorage = [];
        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        let messageEl = document.querySelector('.message')
        messageEl.innerText = productResp.name + " ajouté au panier ";
        window.scrollTo(0,0);
      };
    displayNbsItemsInCartDynamically();
    });
  }