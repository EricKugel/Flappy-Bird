// A simple Bird class

class Bird {
    constructor(bitmap, x, y, canvas) {
        this.bitmap = bitmap;
        this.x = x;
        this.y = y;
        this.canvas = canvas;

        this.flapsPerSecond = 3;
        this.gravityStrength = 2;

        this.bounceY = x;
        this.bounceTime = -1;
    }

    flap(time) {
        this.bounceY = this.calculateY(time);
        this.bounceTime = time;
    }

    draw(time) {
        if (this.bounceTime === -1) {
            this.bounceTime = time;
        }

        // Determine which animation frame
        const frame = Math.floor(((time * this.flapsPerSecond) % 1000) / 167);

        // Determine top-left corner of bird.jpg containing animation frame.
        let clipx = (frame % 3) * 1024;
        let clipy = (frame > 3) ? 926 : 0;

        this.y = this.calculateY(time);

        let ctx = this.canvas.getContext("2d");
        ctx.drawImage(this.bitmap,clipx, clipy, 1024, 926, this.x, this.y, 128, 112);
    }

    calculateY(time) {
        const elapsed = time - this.bounceTime;
        return this.bounceY - (elapsed / 1000) * 300 * this.gravityStrength + Math.pow((elapsed / 1000), 2) * 300 * this.gravityStrength;
    }
}
