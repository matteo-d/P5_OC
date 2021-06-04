// FUNCTIONS USED MULTIPLE PAGES

// Gère l'affichage du nombre de produits dans le panier
function displayNbsItemsInCart() {
  if (JSON.parse(localStorage.getItem("cartItem"))) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    let numberOfArticleInCart = productInLocalStorage.length;
    let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
    numberOfArticleInCartEl.innerText = numberOfArticleInCart;
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}
// FUNCTIONS PAGE PRODUIT

// Retourne l'ID présent dans l'URL
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");
}
// Vérifie que l'ID présent dans l'URL soit un ID valide
async function verifyProductIdValidity() {
  const productId = getProductId();
  const products = await getProductsData();
  let ValidsIdsArray = [];
  products.forEach((product) => {
    let product_id = product._id;
    ValidsIdsArray.push(product_id);
  
  });
  if (!ValidsIdsArray.includes(productId)) {
    displayError('ID incorrect')
    
  }
}
// Mets en place une paire key value dans les params de l'URL
function setURLparam(key, value) {
  const queryString = window.location.href;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  urlParams.append(key, value);
}

// Affichage des choix de couleurs
function displayColorsOptions(product) {
  let choice = document.querySelector(".section_choice");
  product.colors.forEach((colors) => {
    let option = document.createElement("option");
    option.value = colors;
    option.textContent = colors;
    choice.appendChild(option);
  });
}
// Logique quantité + et - des boutons
function handleChooseQuantity() {
  let btnPlus = document.querySelector(".btnPlus");
  let btnMinus = document.querySelector(".btnMinus");
  let quantity = document.querySelector(".quantityOfProduct");
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
}
// Affiche le message ajouté au panier
function messageAddToCart(selectedProductData, message) {
  let messageEl = document.querySelector(".message");
  messageEl.innerText = `${selectedProductData.name} ${message}`;

  setTimeout(() => {
    messageEl.innerText = "";
  }, 2000);
}

// Gère l'ajout au panier
function handleAddToCart(selectedProductData) {
  // Gestion de l'ajout de l'article au panier
  let btnAddToCart = document.querySelector(".addCart");
  let selectedValue = document.getElementById("select_choice");
  let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
  let quantity = document.querySelector(".quantityOfProduct");
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
        //retourne index se trouve le produit avec le même ID
        let index = productInLocalStorage.findIndex(
          (el) => el.id == cartItem.id
        );
        console.log(index);
        productInLocalStorage[index].chosenQuantity += cartItem.chosenQuantity;
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        messageAddToCart(selectedProductData, " ajouté ");
        //Action SI le panier ne contient PAS cet ours
      } else {
        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        messageAddToCart(selectedProductData, " ajouté ");
      }
      // SI c'est le premier article
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
      messageAddToCart(selectedProductData, " ajouté ");
    }
    displayNbsItemsInCart();
  });
}

// FONCTIONS PAGE PANIER

function displayCartTotal() {
  let totalText = document.getElementById("totalPrice");
  let elPriceNodeList = document.querySelectorAll(".price");
  let elQuantityNodeList = document.querySelectorAll(".quantityOfProduct");
  let arrayOfPrices = [];
  for (let priceEl = 0; priceEl < elPriceNodeList.length; priceEl++) {
    let priceElText = parseInt(elPriceNodeList[priceEl].innerText);
    let quantiteElText = parseInt(elQuantityNodeList[priceEl].innerText);
    let sum = priceElText * quantiteElText;
    arrayOfPrices.push(sum);
  }
  const add = (priceElText, quantiteElText) => priceElText + quantiteElText;
  let result = arrayOfPrices.reduce(add);
  let resultFloat = result.toFixed(2).replace(".", ",");
  totalText.innerHTML = resultFloat;
}

function handleQuantityProduct() {
  let ProductsNodeList = document.querySelectorAll(".oneProductEl");
  ProductsNodeList.forEach((Product) => {
    let btnPlus = Product.querySelector(".btnPlus");
    let btnMinus = Product.querySelector(".btnMinus");
    let quantity = Product.querySelector(".quantityOfProduct");
    let compteur = parseInt(quantity.innerText);
    btnPlus.addEventListener("click", () => {
      compteur++;
      quantity.innerHTML = compteur;
      displayCartTotal();
    });
    btnMinus.addEventListener("click", () => {
      if (compteur > 1) {
        compteur--;
      }
      quantity.innerHTML = compteur;
      displayCartTotal();
    });
  });
}

function deleteAllCart() {
  let clearAll = document.querySelector(".clearAll");
  clearAll.addEventListener("click", () => {
    // vide le local storage
    localStorage.removeItem("cartItem");
    // reload la page
    window.location.href = "cart.html";
  });
}

// Supprime l'élément cliqué
function deleteOneElOfCart() {
  let arrayAllBtns = document.querySelectorAll(".clearCart");
  // on va chercher le local storage
  arrayAllBtns.forEach((btnDelete) => {
    btnDelete.addEventListener("click", () => {
      let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
      let indexOfClickedProduct = Array.prototype.indexOf.call(
        arrayAllBtns,
        btnDelete
      );
      // Au clic supprime le bon élément du local storage en "local"
      productInLocalStorage.splice(indexOfClickedProduct, 1);
      // On renvoie au local storage le tableau sans l'élément supprimé
      // Au clic supprime visuellement l'item que l'on veut supprimer
      btnDelete.parentElement.parentElement.remove();
      // On renvoie au local storage le tableau sans l'élément supprimé
      localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
      if (productInLocalStorage.length > 0) {
        displayNbsItemsInCart();
        displayCartTotal();
      } else {
        localStorage.removeItem("cartItem");
        // reload la page
        window.location.href = "cart.html";
      }
    });
  });
}

function getIdsArray(productsArray, productInLocalStorage) {
  //récupérer les id présents dans le panier pour le tableau produit
  // Si produit dans le panier
  if (productInLocalStorage) {
    Object.values(productInLocalStorage).forEach((product) => {
      if (typeof product.id === "string") {
        productsArray.push(product.id);
      } else {
        console.log(" type Ids envoyé à l'objet order =/ string ");
      }
    });
  } else {
    alert(
      "le panier est vide, Veuillez séléctionné des articles avant de commander"
    );
  }
}
// REGEX FORMULAIRE
function isEmail(email) {
  return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  .test(
    email
  );
}

function isOnlyText(input) {
  return /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/
  .test(input);
}
function isAdress(adress) {
  return /^[\w'\-,.][^_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{6,}$/.test(adress);
}

// Validation des données formulaire
function formInputValidation() {
  // Cible les inputs
  const firstName = form.firstName;
  const lastName = form.lastName;
  const adress = form.address;
  const city = form.city;
  const email = form.email;
  // Cible les valeurs inputs
  // trim = remove space
  const firstNameValue = form.firstName.value.trim();
  const lastNameValue = form.lastName.value.trim();
  const adressValue = address.value.trim();
  const cityValue = form.city.value.trim();
  const emailValue = form.email.value.trim();

  if (firstNameValue === "") {
    setErrorFor(firstName, "Prénom invalide");
  } else if (!isOnlyText(firstNameValue)) {
    setErrorFor(firstName, "Prénom invalide");
  } else {
    setSuccessFor(firstName);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName, "Nom invalide");
  } else if (!isOnlyText(lastNameValue)) {
    setErrorFor(lastName, "Nom invalide");
  } else {
    setSuccessFor(lastName);
  }

  if (adressValue === "") {
    setErrorFor(adress, "Adresse invalide");
  } else if (!isAdress(adressValue)) {
    setErrorFor(adress, "Adresse invalide");
  } else {
    setSuccessFor(adress);
  }

  if (cityValue === "") {
    setErrorFor(city, "Ville invalide");
  } else if (!isOnlyText(cityValue)) {
    setErrorFor(city, "Ville invalide");
  } else {
    setSuccessFor(city);
  }

  if (emailValue === "") {
    setErrorFor(email, "Entrer votre e-mail");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "E-mail invalide");
  } else {
    setSuccessFor(email);
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }
}

/// Gestion formulaire
function handleForm() {
  let form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let productsArray = [];
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));

    getIdsArray(productsArray, productInLocalStorage); // Return productsArray to send to the APi

    formInputValidation();
    // Condition sur les inputs du formulaire

    if (
      isOnlyText(form.firstName.value) &&
      isOnlyText(form.lastName.value) &&
      isAdress(form.address.value) &&
      isOnlyText(form.city.value) &&
      isEmail(form.email.value) &&
      productsArray.length > 0
    ) {
      // Création de l'objet a envoyé au server
      let order = {
        contact: {
          firstName: form.firstName.value,
          lastName: form.lastName.value,
          address: form.address.value,
          city: form.city.value,
          email: form.email.value,
        },
        products: productsArray,
      };
      postOrder(order);
      // Envoi de l'objet de commande / Retourne n id de commande
    }
  });
}

////////////////////// ///////////////////////////////////// FONCTIONS PAGE CONFIRMATION

// Vider local storage complet
function emptyAllLocalStorage() {
  localStorage.removeItem("cartItem");
  localStorage.removeItem("orderId");
  localStorage.removeItem("cartTotalPrice");
}
