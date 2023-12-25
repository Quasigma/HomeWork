var game;
window.onload = () => {
    game = new Game();
    document.querySelector("#click").onclick = () =>{
        game.click();
    };
}