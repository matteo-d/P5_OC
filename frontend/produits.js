/*const main = document.getElementById("main");
// GET & DISPLAY DATA  FROM API
function fetchData() {
  fetch("http://localhost:3000/api/teddies")
    .then((response) => {
      if (!response.ok) {
        throw Error("ERROR");
      }
      return response.json();
    })

    .then((teddies) => {
      const productEl = teddies.foreach((teddy) => {
        return `
        <div class="product_item">
          <img src="${teddy.imageUrl}" alt="Produit" id="img_product" />
          <article class="product_infos">
              <h2 id="name_product_${teddy.name}">${teddy.name}</h2>
              <p class="product_description" id="description_product">${teddy.description}</p>
            
              <label for="myRadio" class="radio" id="label_product${teddy.name}">
                  Quel Couleur  ?
                  <input> "lol" </input>
                  
              </label>
              <p class="price" id="price_product${teddy.name}">${teddy.price} £</p>
              <button id="addtocart_${teddy.name}> Ajouter au Panier </button>
          </article>
          </div>
          `
      })
      console.log(teddies);
      console.log(teddies.colors);
      main.innerHTML = productEl;  
    })
    .catch((error) => {
      console.log(error);
    })
}

fetchData();


// console.log('http://localhost:3000/api/teddies')
*/
/*
// Constructor pour prototype de L'objet produit
function Produit(img, nom, description, prix) {
    this.img = img;
    this.nom = nom;
    this.description = description;
    this.prix = prix;
}

// Instances à partir du prototype de l'objet Produit
let produit1 = new Produit("backend/images/teddy_1.jpg", " Peluchou ", "La super description", 33.33);
let produit2 = new Produit("backend/images/teddy_2.jpg", " ZZz ", "La chouette peluche", 55.59);
let produit3 = new Produit("backend/images/teddy_3.jpg", " Aciadacho ", "La peluche la plus douce", 44.00);
let produit4 = new Produit("backend/images/teddy_4.jpg", " Pouti Blop ", "La plus belle peluche", 22.37);
let produit5 = new Produit("backend/images/teddy_5.jpg", " Ploup ", "La meilleure peluche", 19.20);

// Regroupe les instances en array pour pouvoir looper au dessus
const ProductArray = [produit1, produit2, produit3, produit4, produit5];
// compteur qui s'incrémente pour créer des id uniques a chaque bouton add
let currentId = 1;

const main = document.getElementById("main");

function creerElement (produits) {

    ProductArray.forEach((produit) => {
        const { img, nom, description, prix } = produit;
        // Id of each product change for each loop

        const nouvelEl = document.createElement("div");
        nouvelEl.classList.add("product_item");
    
        nouvelEl.innerHTML = `
    <img src="${img}" alt="Produit ${currentId}" id="img_product${currentId}" />
    <article class="product_infos">
        <h2 id="name_product_${currentId}">${nom}</h2>
        <p class="product_description" id="description_product${currentId}">${description}</p>
        <label for="myRadio" class="radio" id="label_product${currentId}">
            Quel Couleur ?
            <input type="radio" name="myRadioField"  class="radio" />
            <input type="radio" name="myRadioField" class="radio" />
            <input type="radio" name="myRadioField" class="radio" />
        </label>
        <p class="price" id="price_product${currentId}">${prix} £</p>
        <button id"addtocart_${currentId}> Ajouter au Panier </button>
    </article>
    ` ;
    main.appendChild(nouvelEl);

    currentId++;
    console.log(currentId)
    

    }) ;
}

creerElement();
/*
localStorage.setItem(ProductArray)
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Debut Logique Bouton pour remplir le panier +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // On récupère l'élément sur lequel on veut détecter le clic
const btn = document.getElementById("addtocart_1");
const btnAddToCart2 = document.getElementById("addtoCart_2");
const btnAddToCart3 = document.getElementById("addtoCart_3");
const btnAddToCart4 = document.getElementById("addtoCart_4");


btn.addEventListener('click', function() {          // On écoute l'événement click
btn.innerText=("lol");
         // On change le contenu de notre élément pour afficher "C'est cliqué !"
});





// Créer une fonction ajouter au panier
// au clic sur ajouter au panier 
// Elle doit créer 

*/
