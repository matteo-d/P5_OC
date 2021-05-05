let idText = localStorage.getItem('identifiant');
console.log(idText);
let main = document.getElementById("main");
let price = localStorage.getItem('total');
let html = "";
// Affichage du produit
html = `<h1> Votre commande d'un montant de ${price}€ à bien été prise en compte ! </h1>

<p> Votre identifiant de commande est : ${idText} </p>

<a id="goToIndex" href="index.html"> Retour à la page d'acceuil </a>
`
main.innerHTML = html;

// Vider l'identifiant et le contenu du local storage
let goToIndex = document.getElementById('goToIndex');
goToIndex.addEventListener('click', () => {
    localStorage.removeItem("cartItem");
    localStorage.removeItem("identifiant");
    localStorage.removeItem("identifiant");

})
