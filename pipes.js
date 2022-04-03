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

    isOverlapping(x1, y1, x2, y2) {
        return  (this.rectanglesOverlap(x1, y1, x2, y2, this.x, 0, this.x + this.width, this.y)
            || this.rectanglesOverlap(x1, y1, x2, y2, this.x, this.y + this.gap, this.x + this.width, window.innerHeight)
            || this.rectanglesOverlap(x1, y1, x2, y2, this.x - 20, this.y - 40, this.x + this.width + 20, this.y)
            || this.rectanglesOverlap(x1, y1, x2, y2, this.x - 20, this.y + this.gap, this.x + this.width + 20, this.y + this.gap + 40)
            );
    }

    // Helper method to check if two rectangles overlap
    rectanglesOverlap(x1, y1, x2, y2, otherx1, othery1, otherx2, othery2) {
        return (this.segmentsOverlap(x1, x2, otherx1, otherx2) && this.segmentsOverlap(y1, y2, othery1, othery2));
    }

    segmentsOverlap(s1, s2, others1, others2) {
        return (others1 < s1 && others2 > s1) || (others1 < s2 && others2 > s2);
    }
}
