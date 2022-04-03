var canvas;
var ctx;
var cache;
var time = 0;
var score = 0;

const resources = ["sky.jpg", "bird.png"];

var pipes;
var bird;

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    ctx.font = "72px arial";
    pipes = [new Pipe(window.innerWidth / 2), new Pipe()];

    window.addEventListener('keydown', function() {
        bird.flap(time);
    });

    window.addEventListener('mousedown', function() {
        bird.flap(time);
    })

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
        createImageBitmap(cache.bird).then(function(bitmap) {
            bird = new Bird(bitmap, 100, window.innerHeight / 2, ctx);
            gameLoop();
        });
    }, function() {});
}

function gameLoop() {
    time += 36;
    for (var i = 0; i < pipes.length; i++) {
        var pipe = pipes[i];
        if (pipe.x + pipe.width < 0) {
            pipes.splice(i, 1);
            pipes.push(new Pipe());
            score += 1;
            i--;
        }
        pipe.update();
    }

    ctx.drawImage(cache.sky, 0, 0, window.innerWidth, window.innerHeight);
    bird.draw(time);
    for (var i = 0; i < pipes.length; i++) {
        pipes[i].draw(ctx);
    }
    ctx.fillStyle = "black";
    ctx.fillText(score, window.innerWidth - 100, 100);

    window.setTimeout(function() {
        gameLoop();
    }, 1000 / 36);
}