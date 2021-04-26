import { displayNumberOfProductsInCart } from './utils.js';

fetch("http://localhost:3000/api/teddies")
  .then((productResp) => productResp.json())
  .then((productResp) => {
    console.log(productResp);

    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";

    // Boucle pour récupére toutes les variables des produits + (Foreach)
    for (let i = 0; i < productResp.length; i++) {
      console.log(productResp[i].name);
      //Html pur , Créer les élément, clone prototype
      html += `
   <div class="product">
        <img src="${productResp[i].imageUrl}" alt="Ours ${
        productResp[i].name
      }" class="ourspic">
        <article class="product_infos">
              <h2 id="name_product_${productResp[i].name}">${
        productResp[i].name
      }</h2>
              <p class="product_description" id="description_product_${
                productResp[i].name
              }">${productResp[i].description}</p>   
              <p class="price" id="price_product_${productResp[i].name}">${(
        productResp[i].price / 100
      )
        .toFixed(2)
        .replace(".", ",")} €</p>
              <a href="./produits.html?${
                productResp[i]._id
              }" class="btnGoTo">Voir</a>
      </div >
`;
    }
      // Ajouter mes element créer dans le HTML pour afficher mes produits
      document.getElementById("main").innerHTML = html;
    //***************  Fonction affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page

<<<<<<< HEAD
displayNumberOfProductsInCart();

=======
      
      //  Affiché le nombre d'article sélectionné ( à coté icone panier ) dès l'arrivé sur la page
   // Si il y un Objet "cartItem" dans le local storage 
   if (JSON.parse(localStorage.getItem("cartItem"))) {
    // On le récupère 
   let productInLocalStorage = (JSON.parse(localStorage.getItem("cartItem"))) ;
   // Création variable nombres d'articles = nombre d'article dans le local storage 
   let numberOfArticleInCart = productInLocalStorage.length;
   console.log(numberOfArticleInCart);
   // On vise le span "itemsInCart" à coté de l'icone panier
   let numberOfArticleInCartEl = document.querySelector(".itemsInCart")
   // Son innerText est le nombre d'article dans le local storage
   numberOfArticleInCartEl.innerText = numberOfArticleInCart ;
  }
>>>>>>> parent of ffca23a...  création de fonction

  });
