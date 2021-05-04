let idText = localStorage.getItem('identifiant');
console.log(idText);
let main = document.getElementById("main");

let html = "";
// Affichage du produit
html = `<h1> Votre commande à bien été prise en compte ! </h1>
<p> Votre identifiant de commande est : ${idText} </p>
<a href="index.html"> Retour à la page d'acceuil </a>
`

main.innerHTML = html;

