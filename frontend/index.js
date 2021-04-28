import {displayNumberOfProductsInCart} from './utils.js';


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
   
    displayNumberOfProductsInCart();
    
    // Ajouter mes element créer dans le HTML pour afficher mes produits
    document.getElementById("main").innerHTML = html;
  });

  console.log(typeof localStorage)