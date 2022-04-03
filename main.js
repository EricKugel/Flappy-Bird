var canvas;
var ctx;
var cache;

const resources = ["sky.jpg"];

var pipes;

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    pipes = [new Pipe(window.innerWidth / 2), new Pipe()];
    loadImages();
}

function loadImages() {
    var images = [];
    for (var i = 0; i < resources.length; i++) {
        var obj = {
            "name": resources[i].substring(0, resources[i].indexOf(".")),
            "src": "lib/" + resources[i]
        };
        images.push(obj);
    }

    ImageManager.load(images, function() {
        cache = ImageManager.cache;
        gameLoop();
    }, function() {});
}

function gameLoop() {
    for (var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i];
        if (pipe.x + pipe.width < 0) {
            pipes.splice(i, 1);
            pipes.push(new Pipe());
            i--;
        }
        pipe.update();
    }

    ctx.drawImage(cache.sky, 0, 0, window.innerWidth, window.innerHeight);
    // draw bird
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw(ctx);
    }

    window.setTimeout(function() {
        gameLoop();
    }, 1000 / 36);
}