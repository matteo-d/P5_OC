/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1); 

/* Récupération du produit avec l'id associé depuis le serveur */ 

fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((productResp) => productResp.json())
    .then(productResp => {
        
    let html="";
    // Affichage du produit / personalisation
    html +=  `<div class="product">
    <img src="${productResp.imageUrl}" alt="Ours ${productResp.name}">
    <article class="product_infos">
          <h2 id="name_product_${productResp.name}">${productResp.name}</h2>
          <p class="product_description" id="description_product_${productResp.name}">${productResp.description}</p>   
          <p class="price" id="price_product_${productResp.name}">${(productResp.price/100).toFixed(2).replace(".",",")} €</p>
        <!-- Personalisation de la couleur -->
        <label for="select__color">
            <h3>Personnaliser votre ours</h3>
        </label>
            <select class="section_colors" name="colors" id="select__color">
            </select>
        <button id="btn" class="addCart">Add</button>
        </div>`
    document.getElementById("main").innerHTML = html;
    
    //Création d'une function foreach pour afficher mes choix de couleurs
    let choice = document.querySelector(".section_colors");
    
    productResp.colors.forEach (function (color) {
        let option = document.createElement("option");
        option.value = color;
        option.textContent = color;
        choice.appendChild(option);
    })

         

    })
  