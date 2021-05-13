///////////////////////////////////////////////// FUNCTIONS USED MULTIPLE PAGES

// Gère l'affichage du nombre de produits dans le panier
function displayNbsItemsInCart() {
  if (JSON.parse(localStorage.getItem("cartItem"))) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    let numberOfArticleInCart = productInLocalStorage.length;
    let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
    numberOfArticleInCartEl.innerText = numberOfArticleInCart;
  }
  else {
    console.log("Pas d'article dans le panier")
  }
};

function formatPrice(price) {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', }).format(price / 100);
};


///////////////////////////////////////////////////////////////// FUNCTIONS USED PAGES PAGE PRODUIT
// Logique quantité + et - des boutons

function getProductId() {
  
  return new URL(window.location.href).searchParams.get('id')
  
}

async function verifyProductIdValidity () {
  
  const productId = getProductId();
  const products = await getProductsData();

  let ValidsIdsArray = [];
  products.forEach((product) => {
    let product_id = product._id;
    ValidsIdsArray.push(product_id); 
})
if (!ValidsIdsArray.includes(productId)) {
  alert("Le produit séléctionné n'est pas disponible")
}
}
function handleQuantity() {

  let btnPlus = document.getElementById("btnPlus");
  let btnMinus = document.getElementById("btnMinus");
  let quantity = document.getElementById("quantityOfProduct");
  let compteur = parseInt(quantity.innerText);

  btnPlus.addEventListener("click", () => {
    compteur++;
    quantity.innerHTML = compteur;
  });
  btnMinus.addEventListener("click", () => {
    if (compteur > 1) {
      compteur--;
    }
    quantity.innerHTML = compteur;
  });
};

// Gère l'ajout au panier
function handleAddToCart(selectedProductData) {

  // Gestion de l'ajout de l'article au panier
  let btnAddToCart = document.querySelector(".addCart");
  let selectedValue = document.getElementById("select_choice");
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
  let quantity = document.getElementById("quantityOfProduct");
  btnAddToCart.addEventListener("click", (e) => {
    e.preventDefault();
    // trouver la valeur selectionée par l'utilisateur
    let selectedColor =
      selectedValue.options[selectedValue.selectedIndex].value;
    let chosenQuantity = parseInt(quantity.innerText);
    // stockage de la valeur sélectionné dans un objet
    let cartItem = {
      id: selectedProductData._id,
      imageUrl: selectedProductData.imageUrl,
      name: selectedProductData.name,
      price: selectedProductData.price,
      chosenQuantity: chosenQuantity,
      selectedColor: selectedColor,
    };
    // Local Storage
    // Action si local storage contient dejà un article
    if (productInLocalStorage) {
      // Action SI le panier contient déjà cet ours
      if (productInLocalStorage.some((el) => el.id === cartItem.id) === true) {
        let messageEl = document.querySelector(".message");
        messageEl.innerText =
          selectedProductData.name + " est déjà dans votre panier";

        setTimeout(() => { messageEl.innerText = '' }, 2000);
        //Action SI le panier ne contient PAS cet ours
      } else {

        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        let messageEl = document.querySelector(".message");
        messageEl.innerText = selectedProductData.name + " ajouté au panier ";

        setTimeout(() => { messageEl.innerText = '' }, 2000);
      }
      // SI c'est le premier article
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
      let messageEl = document.querySelector(".message");
      messageEl.innerText = selectedProductData.name + " ajouté au panier ";

      setTimeout(() => { messageEl.innerText = '' }, 2000);
    }
    displayNbsItemsInCart();
  });
};

///////////////////////////////////// FONCTIONS PAGE PANIER

// Affiche le prix cumulé de tout les élément présent dans le panier à l'arrivée sur la page 
const displayTotalPriceOnLoad = () => {
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
  let arrayOfElPrices = [];
  productInLocalStorage.forEach((itemPrice) => {

    let eachElTotal = itemPrice.chosenQuantity* itemPrice.price;
    arrayOfElPrices.push(eachElTotal);
  });
  let totalText = document.getElementById("totalPrice");
  // Additionner tout les Elements de l'array
  const add = (a, b) => a + b;
  let totalPrice = arrayOfElPrices.reduce(add);
  totalText.innerHTML = formatPrice(totalPrice);
};

// Affiche le prix cumulé de tout les élément présent dans le panier dynamiquement
const displayTotalPriceDynamically = () => {
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
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
  totalText.innerHTML = formatPrice(result);
};

// Supprime l'élément cliqué 
const deleteOneElOfCart = () => {
  let btnDelete = document.querySelectorAll(".clearCart");
  // on va chercher le local storage
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
  btnDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", () => {
      if (productInLocalStorage.length > 1) {
        // Au clic supprime l'élément dynamiquement l'élément parent
        btnDelete.parentElement.parentElement.remove();
        // Au clic supprime le bon élément du local storage en "local"
        productInLocalStorage.splice(btnDelete, 1);
        // On renvoie au local storage le tableau sans l'élément supprimé
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        displayNbsItemsInCart();
        displayTotalPriceDynamically();
        // Total Items dans le panier
        window.scroll(0, 0);
      } else {
        btnDelete.parentElement.parentElement.remove();
        localStorage.removeItem("cartItem");
        let totalText = document.getElementById("totalPrice");
        totalText.innerText = "0";
        let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
        numberOfArticleInCartEl.innerText = "0";
        displayTotalPriceDynamically();
        displayNbsItemsInCart();
        window.scroll(0, 0);
      }
    });
  })
};

const deleteAllCart = () => {
  let clearAll = document.querySelector(".clearAll");
  clearAll.addEventListener("click", () => {
    // vide le local storage
    localStorage.removeItem("cartItem");
    // reload la page
    window.location.href = "panier.html";
  });
};

const chooseYourQuantityPlus = () => {
  //////////////////////////////////////// Logique boutons quantité +
  let btnPlus = document.querySelectorAll(".btnPlus");
  btnPlus.forEach((btnPlus) => {
    btnPlus.addEventListener("click", () => {
      let quantity = btnPlus.previousElementSibling.previousElementSibling;
      let compteur = parseInt(quantity.innerText);
      compteur++;
      quantity.innerText = compteur;
      let parsedQuantity = parseFloat(quantity.innerHTML);
      // Récupérer le prix de base de ce produit
      let product =
        btnPlus.parentElement.parentElement.firstElementChild
          .firstElementChild.id;
      let price;
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
      let newPrice = parsedQuantity * price;
      //Afficher nouveau prix
      let updatedPriceEl =
        btnPlus.parentElement.nextElementSibling.firstElementChild;
      updatedPriceEl.innerText = formatPrice(newPrice);

      displayTotalPriceDynamically();
    });
  })
};

const chooseYourQuantityMinus = () => {
  
  let btnMinus = document.querySelectorAll(".btnMinus");
  btnMinus.forEach((btnMinus) => {
    btnMinus.addEventListener("click", () => {
      
      let quantity = btnMinus.previousElementSibling;
     
      let compteur = parseInt( (document.getElementById("quantityOfProduct")).innerText);
     
      if (compteur > 1) {
        compteur--;
      }
      quantity.innerText = compteur;
       // Logique affichage nouveau prix d'un élément

      const unitPrice =  parseInt( (btnMinus.parentElement.nextElementSibling.firstElementChild).innerText)
      let updatedPriceEl =  (btnMinus.parentElement.nextElementSibling.firstElementChild);
      updatedPriceEl.innerText = compteur * unitPrice;
    
      displayTotalPriceDynamically();
    });
  })
};


///********************* */ Gestion formulaire
const handleForm = () => {
  let form = document.getElementById("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //récupérer les id présents dans le panier pour le tableau produit
    let productsArray = [];
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    productInLocalStorage.forEach((el) => {
      let product_id = el._id;
      // Si id envoyé est bien de type string on l'ajoute au tableau produits
      if (typeof product_id === "string") {
        productsArray.push(product_id);
      }
    });
    // Récupérer values du formulaire
    const firstname = form.firstName.value;
    const lastname = form.lastName.value;
    const adress = form.adress.value;
    const email = form.email.value;
    const city = form.city.value;
    // Création de l'objet a envoyé au server
    let order = {
      contact: {
        firstName: firstname,
        lastName: lastname,
        address: adress,
        city: city,
        email: email,
      },
      products: productsArray,
    };
    // Envoi de l'objet de commande / Retourne n id de commande 
    sendOrder(order);
  })
}
