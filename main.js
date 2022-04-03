var canvas;
var ctx;

window.onload = function() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    gameLoop();
}

function gameLoop() {

    window.setTimeout(function() {
        gameLoop();
    }, 1000 / 24);
}