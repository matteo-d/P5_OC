

////////////////////////////// Get Product Data index
async function getProductsData(params) {
  try {
    if (typeof (params) == 'undefined') {
      params = "";
    }
    const response = await fetch(`http://localhost:3000/api/teddies/${params}`);
    const products = await response.json();
    console.log(" Connexion au serveur OK !");
 
    return products;
  }
  catch (e) {
    alert("Serveur non connecté !")
    console.log(e)
  }
};

async function sendOrder (order){
  const settings = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  };
  try {
    const fetchResponse = await fetch("http://localhost:3000/api/teddies/order", settings);
    const data = await fetchResponse.json();
    console.log(data)
    console.log (window.location)
    localStorage.setItem("orderId", JSON.stringify(data.orderId));
    let cartTotalPrice = document.getElementById("totalPrice").innerText;
    localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));
    window.location.href = `${window.location.origin}/confirmation.html?orderId=${data.orderId}`
    return new URL(window.location.href).searchParams.get('orderId')
    // console.log(window.location.origin)
    //   window.location.href = `${window.location.origin}/confirmation.html?orderId=${data.orderId}`
  } catch (error) {
    alert("Impossible d'envoyer la commande au serveur !")
    console.log(error)
  }
}

