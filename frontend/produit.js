/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);
console.log(productId);

// Fetch spécifiquement le bon produit pas l'API complete

fetch(`http://localhost:3000/api/teddies/${productId}`)
  .then((productResp) => productResp.json())
  .then((productResp) => {
    let html = "";
    // Affichage du produit
    html = `<div class="product">
    <img src="${productResp.imageUrl}" alt="Ours ${productResp.name}">
    <article class="product_infos">
      <h2 id="name_product_${productResp.name}">${productResp.name}</h2>
        <p class="product_description" id="description_product_${
          productResp.name
        }">${productResp.description}</p>   
        <p class="price" id="price_product_${productResp.name}">${(
      productResp.price / 100
    )
      .toFixed(2)
      .replace(".", ",")} €</p>    
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
        <select class="section_choice" name="colors" id="select_choice">
        <option disabled > Couleurs </option>
          <!-- Mes choix de couleurs dans la function forEach --!>
        </select>        
        <!-- Personalisation de la quantité -->
        <div id="container_quantity">
            <button id="btnMinus">-</button>
            <span id="quantityOfProduct">1</span>
            <button id="btnPlus">+</button>
        </div>
        <!--Btn Add to Cart-->
        <div id="container_addToCart">
            <button id="addToCart" class="addCart">Add</button>
        </div>`;
    document.getElementById("main").innerHTML = html;

    //***************  Fonction affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page
    const displayNumberOfProductsInCart = () => {
      // Si il y un Objet "cartItem" dans le local storage
      if (JSON.parse(localStorage.getItem("cartItem"))) {
        // On le récupère
        let productInLocalStorage = JSON.parse(
          localStorage.getItem("cartItem")
        );
        // Création variable nombres d'articles = nombre d'article dans le local storage
        let numberOfArticleInCart = productInLocalStorage.length;
        console.log(numberOfArticleInCart);
        // On vise le span "itemsInCart" à coté de l'icone panier
        let numberOfArticleInCartEl = document.querySelector(".itemsInCart");
        // Son Text est le nombre d'article dans le local storage
        numberOfArticleInCartEl.innerText = numberOfArticleInCart;
      }
    };
    displayNumberOfProductsInCart();

    // ************************ Affichage des choix de couleurs
    let choice = document.querySelector(".section_choice");

    productResp.colors.forEach(function (colors) {
      let option = document.createElement("option");
      option.value = colors;
      option.textContent = colors;
      choice.appendChild(option);
    });

    // **************** Logique affichage boutons quantité + et -
    let btnPlus = document.getElementById("btnPlus");
    let btnMinus = document.getElementById("btnMinus");
    let quantity = document.getElementById("quantityOfProduct");
    let compteur = parseInt(quantity.innerText);

    btnPlus.addEventListener("click", function () {
      compteur++;
      quantity.innerHTML = compteur;
    });
    btnMinus.addEventListener("click", function () {
      if (compteur > 1) {
        compteur--;
      }
      quantity.innerHTML = compteur;
    });

    //***************************** */ Gestion du Local Storage au clic sur le bouton ajouter au panier
    let btnAddToCart = document.querySelector(".addCart");
    let selectedValue = document.getElementById("select_choice");
    let productInLocalStorage = JSON.parse(localStorage.getItem("cartItem"));

    btnAddToCart.addEventListener("click", function (e) {
      e.preventDefault();
      // trouver la valeur selectionée par l'utilisateur
      let selectedColor =
        selectedValue.options[selectedValue.selectedIndex].value;

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
      // ********************* Action si local storage contient dejà un article
      if (productInLocalStorage) {
        // Ajouter une condition si le meme objet avec la meme couleur est deja dans le panier annulé ajout au localstorage
        if (
          productInLocalStorage.some((el) => el._id == cartItem._id) &&
          productInLocalStorage.some(
            (el) => el.selectedColor == cartItem.selectedColor
          ) == true
        ) {
          alert("déja dans le panier panier ");
        } else {
          window.scrollTo(0, 0);
          productInLocalStorage.push(cartItem);
          localStorage.setItem(
            "cartItem",
            JSON.stringify(productInLocalStorage)
          );
        }
        // Si l'article est ajoutable au local storage et que le local storage est vide
      } else {
        productInLocalStorage = [];
        productInLocalStorage.push(cartItem);
        localStorage.setItem("cartItem", JSON.stringify(productInLocalStorage));
        window.scrollTo(0, 0);
      }

      displayNumberOfProductsInCart();
    });
  });
