////////////////////////////// Get Product Data index
async function getProductsData(param) {
  if (typeof param == "undefined") {
    param = "";
  }
  try {
    const response = await fetch(
      `${APIurl}${param}`
    );
    const products = await response.json();
    console.log(" Connexion au serveur OK !");

    return products;
  } catch (e) {
    alert("Serveur non connecté !");
    console.log(e);
  }
}



async function sendOrder(order) {
  const settings = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };
  try {
    const fetchResponse = await fetch(
      `${APIurl}order`,
      settings
    );
    const data = await fetchResponse.json();

    localStorage.setItem("orderId", JSON.stringify(data.orderId));
    let cartTotalPrice = document.getElementById("totalPrice").innerText;
    localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));

    // Récupère URL sans query string 
    let URL = window.location.href.split('?')[0];
    cleanedURL = URL.replace('panier.html','');
    window.location.href = `${cleanedURL}confirmation.html?orderId=${data.orderId}`
    
  } catch (error) {
    alert("Impossible d'envoyer la commande au serveur !");
  }
}
