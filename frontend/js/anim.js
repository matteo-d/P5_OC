function createHeart() {
    const heart = document.createElement("div");
    const main = document.getElementById("main")
    // heart = créer une div
    heart.classList.add("heart");
    // créer une div, lui  ajouter les propriétés css suivantes left : nombre au pif entre 0 et 100 de la largeur de l'écran de l'utilisateur
    heart.style.left = Math.random() * 100 + "vw";
    // même idée qu'au dessus
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    // texte a mettre dans la div
    heart.innerText = "💜";
    // créer un enfant càd créer la div grace à la constante heart écrit plus tot qui contient les données pour créer l'anim ( texte / style css / durée,positionnement)  
   main.appendChild(heart);
    // Méthode pour indiquer une durée avant de retirer la div heart 
    setTimeout(() => {
        heart.remove();
    }, 3200);
}
//
