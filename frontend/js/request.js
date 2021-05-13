

////////////////////////////// Get Product Data index
async function getProductsData() {
  try {
    const response = await fetch("http://localhost:3000/api/teddies/");
    const products = await response.json();
    console.log(" Connexion au serveur OK !");
   
    return products;
  }
  catch(e) {
    alert("Serveur non connecté !")
    console.log(e)
  }    
}; 


// Clean One Product Data from local storage 
const cleanOneProductData = () => {
  if (localStorage.getItem("OneProductData")) {
    localStorage.removeItem("OneProductData")
  }
}