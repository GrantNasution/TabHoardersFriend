const ballsack = document.querySelector("button");
const ballsacktwo = document.querySelector("#ballsack");

ballsack.addEventListener("click", () => {
    ballsack.style.backgroundColor="blue";
});

ballsacktwo.addEventListener("click", () => {
    ballsacktwo.style.backgroundColor = "red";
})