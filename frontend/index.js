
import { displayNbsItemsInCartDynamically, handleServerError} from "./utils.js"


fetch("http://localhost:3000/api/teddies").then(handleServerError)
  .then((productResp) => productResp.json())
  .then((productResp) => {
    

    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";
    productResp.forEach( (el) => {
      console.log(el.name);
      //Html pur , Créer les élément, clone prototype
      html += `
   <div class="product">
        <img src="${el.imageUrl}" alt="Ours ${
        el.name
      }" class="ourspic">
        <article class="product_infos">
              <h2 id="name_product_${el.name}">${
        el.name
      }</h2>
              <p class="product_description" id="description_product_${
                el.name
              }">${el.description}</p>   
              <p class="price" id="price_product_${el.name}">${(
        el.price / 100
      )
        .toFixed(2)
        .replace(".", ",")} €</p>
              <a href="./produits.html?${
                el._id
              }" class="btnGoTo">Voir</a>
      </div >
`;
    });
      // Ajouter mes element créer dans le HTML pour afficher mes produits
      document.getElementById("main").innerHTML = html;
    // Number of article in cart next to Cart Image 
   // On recupère l'array contenant les objets du local sotrage
   if (JSON.parse(localStorage.getItem("cartItem"))) {
    displayNbsItemsInCartDynamically();
   }
  
  });

