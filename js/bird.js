class Bird {
    constructor(ctx, x, y) {
        this.x = x;
        this.y = y;
        this.velY = 3;
        this.ctx = ctx;
        this.width = 50;
        this.height = 40;
        this.bird_img = new Image();
        this.bird_img.src = "sprite/bird.png";
        this.gravity = 1.5;

    }
    draw() {
        this.ctx.drawImage(this.bird_img, this.x, this.y, this.width, this.height);
    }
    update() {
        this.y += this.velY;

        if (this.y >= canv_height - this.height) {
            this.velY = 0;
            this.y = canv_height - this.height;
        } else {
            this.velY += this.gravity;
        }
    }

}

let bird = new Bird(ctx, 100, 200);
document.onkeydown = function userInput() {

    switch (event.keyCode) {
        case 32:
            bird.velY *= -0.3;

            bird.velY *= 1.2;
            bird.velY -= 8;
            break;
        default:
            break;
    }
}