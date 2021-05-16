




let idText = localStorage.getItem("orderId");
idText.slice(1, -1);
console.log(typeof idText);
let main = document.getElementById("main");
let price = localStorage.getItem("cartTotalPrice").slice(1, -1);
price.slice(1, -1);
let html = "";
// Affichage du produit
html = `<h1> Votre commande d'un montant de ${price}€ à bien été prise en compte ! </h1>

<p> Votre identifiant de commande est : ${idText} </p>

<a id="goToIndex" href="index.html"> Retour à la page d'acceuil </a>
`;
main.innerHTML = html;

// Vider local storage complet
const emptyAllLocalStorage = () => {
  localStorage.removeItem("cartItem");
  localStorage.removeItem("orderId");
  localStorage.removeItem("cartTotalPrice");
};
emptyAllLocalStorage();
