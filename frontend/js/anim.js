// Animation coeurs
const createHeart = () => {
  const heart = document.createElement("div");
  const main = document.getElementById("main");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  heart.innerText = "💜";
  main.appendChild(heart);
  setTimeout(() => {
    heart.remove();
  }, 3200);
}

