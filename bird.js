// A simple Bird class

// The center of each bird frame
const FRAME_POSITIONS = [
    {
        'x': 614,
        'y': 294
    },
    {
        'x': 1670,
        'y': 300
    },
    {
        'x': 2696,
        'y': 312
    },
    {
        'x': 578,
        'y': 1270
    },
    {
        'x': 1700,
        'y': 1284
    },
    {
        'x': 2706,
        'y': 1240
    },
]

class Bird {
    constructor(bitmap, x, y, ctx) {
        this.bitmap = bitmap;
        this.x = x;
        this.y = y;
        this.ctx = ctx;

        this.flapsPerSecond = 3;
        this.gravityStrength = 1;

        this.dy = -17;
    }

    flap(time) {
        this.dy = -17;
    }

    draw(time) {
        // Determine which animation frame
        const frame = Math.floor(((time * this.flapsPerSecond) % 1000) / 167);

        // Determine top-left corner of bird.jpg containing animation frame.
        let clipx = FRAME_POSITIONS[frame].x - 614;
        let clipy = FRAME_POSITIONS[frame].y - 294;

        this.updateY(time);
        this.ctx.drawImage(this.bitmap, clipx, clipy, 1024, 926, this.x, this.y, 128, 112);
    }

    getRect() {
        return [this.x, this.y, this.x + 112, this.y + 70];
    }

    updateY(time) {
        this.y = this.y + this.dy;
        this.dy = this.dy + this.gravityStrength;
        if (this.y < 0) {
            this.y = 0;
            this.dy = 0;
        }
    }
}
