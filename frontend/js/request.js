// Get Product Data
async function getProductsData(param) {
  if (typeof param == "undefined") {
    param = "";
  }
  try {
    const response = await fetch(`${APIurl}${param}`);
    const products = await response.json();
    console.log(" Connexion au serveur OK !");
    return products;
  } catch (e) {
    console.log(e);
  }
}

// Post Order
async function postOrder(order) {
  const settings = {
    method: "POST",
    body: JSON.stringify(order),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };
  try {
    const fetchResponse = await fetch(`${APIurl}order`, settings);
    const data = await fetchResponse.json();
    localStorage.setItem("orderId", JSON.stringify(data.orderId));
    let cartTotalPrice = document.getElementById("totalPrice").innerText;
    localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));
    let URL = window.location.href.split("?")[0]; // Récupère URL sans query string
    cleanedURL = URL.replace("cart.html", ""); // Retire panier.html du L'URl
    window.location.href = `${cleanedURL}confirmation.html?orderId=${data.orderId}`; // Lien vers page confirmation
  } catch (e) {
    console.log(e);
    displayError("Le serveur est inaccessible");
  }
}
