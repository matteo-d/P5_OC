////////////////////////////// Get Product Data index
const getProductsData = async () => {
  if (!localStorage.getItem("ProductsData")) {
  try {
    const response = await fetch("http://localhost:3000/api/teddies/");
    const products = await response.json();
    localStorage.setItem("ProductsData", JSON.stringify(products));
    console.log(" Connexion au serveur OK !")
  }
  catch  {
    console.log("Serveur non connecté !")
    let errorMessage = "";
    errorMessage = `<h1> Le serveur n'est pas connecté </a>
  `;
    document.getElementById("main").innerHTML = errorMessage;
  }
    
  }
 

}; 

/////////////////////// Get Product Data Page produits
// Chercher data pour le produit séléctonné
const getOneProductData = async () => {
  /* Récupération de l'id du produit sélectionné dans la page précédente */
  const productId = window.location.search.substr(1);
  const validUrls = [
    "5be9c8541c9d440000665243",
    "5beaa8bf1c9d440000a57d94",
    "5beaaa8f1c9d440000a57d95",
    "5beaabe91c9d440000a57d96",
    "5beaacd41c9d440000a57d97",
  ];
  if (validUrls.includes(productId)) {
    console.log('Url produit valide ')
    try {
    const response = await fetch(
      `http://localhost:3000/api/teddies/${productId}`
    );
    const product = await response.json();
    localStorage.setItem("OneProductData", JSON.stringify(product));
    console.log("Connexion au serveur OK ! ")

  }
  catch {
    console.log("Serveur non connecté !");
    let errorMessage = "";
    errorMessage = `<h1> Le serveur n'est pas connecté </a>
  `;
    document.body.innerText = errorMessage;
  
  }
}
else {
  console.log("Id incorrect!");
 
  let errorMessage = "";
  errorMessage = `<h1> L'ID est incorrect'</a>
`;
  document.body.innerText = errorMessage;

}
};



// Clean One Product Data from local storage 
const cleanOneProductData = () => {
  if (localStorage.getItem("OneProductData")) {
    localStorage.removeItem("OneProductData")
  }
}