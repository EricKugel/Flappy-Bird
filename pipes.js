class Pipe {
    constructor(x = window.innerWidth) {
        this.width = 100;
        this.gap = 300;
        this.x = x;
        this.y = Math.floor(Math.random() * (window.innerHeight - (this.gap * 2)) + this.gap / 2);
    }

    update() {
        this.x -= 10;
    }

    draw(ctx) {
        for (var i = 0; i < this.width; i++) {
            var g = Math.floor((i / this.width) * (255 / 2) + (255 / 2));
            ctx.fillStyle = "rgb(0, " + g + ", 0)";
            ctx.fillRect(this.x + i, 0, 1, this.y);
            ctx.fillRect(this.x + i, this.y + this.gap, 1, window.innerHeight - (this.y + this.gap));

            var newWidth = this.width + 20 * 2;
            ctx.fillRect(Math.floor(this.x - 20 + (i / this.width) * newWidth), this.y - 40, Math.ceil(newWidth / this.width), 40);
            ctx.fillRect(Math.floor(this.x - 20 + (i / this.width) * newWidth), this.y + this.gap, Math.ceil(newWidth / this.width), 40);
        }
    }
}