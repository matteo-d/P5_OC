///////////////////////////////////////////////// FUNCTIONS USED MULTIPLE PAGES

// Gère l'affichage du nombre de produits dans le panier
function displayNbsItemsInCart() {
  if (JSON.parse(localStorage.getItem("cartItem"))) {
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));
    let numberOfArticleInCart = productInLocalStorage.length;
    let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
    numberOfArticleInCartEl.innerText = numberOfArticleInCart;
  } else {
    console.log("Pas d'article dans le panier");
  }
}

function formatPrice(price) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(price / 100);
}

///////////////////////////////////////////////////////////////// FUNCTIONS USED PAGES PAGE PRODUIT
function getProductId() {
  return new URL(window.location.href).searchParams.get("id");

}

async function verifyProductIdValidity() {
  const productId = getProductId();
  const products = await getProductsData();
  let ValidsIdsArray = [];
  products.forEach((product) => {
    let product_id = product._id;
    ValidsIdsArray.push(product_id);
  });
  if (!ValidsIdsArray.includes(productId)) {
    alert("Le produit séléctionné n'est pas disponible");
  }
}

function setURLparam () {
  const queryString = window.location.href
  console.log(queryString)
  const urlParams = new URLSearchParams(queryString);
  urlParams.append('page', '2');
 
}

// Logique quantité + et - des boutons
function handleQuantity() {
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
        let messageEl = document.querySelector(".message");
        messageEl.innerText =
          selectedProductData.name + " déjà dans votre panier";

        setTimeout(() => {
          messageEl.innerText = "";
        }, 2000);
        //Action SI le panier ne contient PAS cet ours
      } else {
        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        let messageEl = document.querySelector(".message");
        messageEl.innerText = selectedProductData.name + " ajouté  ";

        setTimeout(() => {
          messageEl.innerText = "";
        }, 2000);
      }
      // SI c'est le premier article
    } else {
      productInLocalStorage = [];
      productInLocalStorage.push(cartItem);
      localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
      let messageEl = document.querySelector(".message");
      messageEl.innerText = selectedProductData.name + "ajouté";

      setTimeout(() => {
        messageEl.innerText = "";
      }, 2000);
    }
    displayNbsItemsInCart();
  });
}

///////////////////////////////////// FONCTIONS PAGE PANIER

function displayCartTotal() {
  let totalText = document.getElementById("totalPrice");
  let elPriceNodeList = document.querySelectorAll(".price");
  let elQuantityNodeList = document.querySelectorAll(".quantityOfProduct");
  let arrayOfPrices = [];
  for (let d = 0; d < elPriceNodeList.length; d++) {
    let a = parseInt(elPriceNodeList[d].innerText);
    let b = parseInt(elQuantityNodeList[d].innerText);
    let sum = a * b;
    arrayOfPrices.push(sum);
  }
  const add = (a, b) => a + b;
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
    window.location.href = "panier.html";
  });
}

// Supprime l'élément cliqué
function deleteOneElOfCart() {
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
        displayCartTotal();
        // Total Items dans le panier
        window.scroll(0, 0);
      } else {
        btnDelete.parentElement.parentElement.remove();
        localStorage.removeItem("cartItem");
        let totalText = document.getElementById("totalPrice");
        totalText.innerText = "0";
        let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
        numberOfArticleInCartEl.innerText = "0";
        displayCartTotal();
        displayNbsItemsInCart();
        window.scroll(0, 0);
      }
    });
  });
}

/// Gestion formulaire
function handleForm() {
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

    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (
      form.firstName.value.length > 1 &&
      form.lastName.value.length > 1 &&
      form.address.value.length > 6 &&
      form.city.value.length > 1 &&
      emailRegex.test(email.value)
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
      // Envoi de l'objet de commande / Retourne n id de commande
      sendOrder(order);
    } else {
      alert(
        "Veuillez remplir les champs correctements avant de procéder au paiement"
      );
    }
  });
}
