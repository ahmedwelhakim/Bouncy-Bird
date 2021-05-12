const bird_img = new Image();
bird_img.src = "sprite/birdSprite.png";

const b_width = 18;
const b_height = 13;
const b_gravity = 0.1;
const b_scale = 3;

class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.velY = 1;

    }
    draw(i) {
        drawBird(i, 0, this.x, this.y);
    }
    update() {
        this.y += this.velY;

        if (this.y >= canv_height - b_height * b_scale) {
            this.velY = 0;
            this.y = canv_height - b_height * b_scale;
        } else {
            this.velY += b_gravity;
        }
    }
}

let bird = new Bird(100, 200);

function drawBird(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(bird_img,
        frameX * b_width, frameY * b_height, b_width, b_height,
        canvasX, canvasY, b_width * b_scale, b_height * b_scale);
}

document.onkeydown = function userInput() {

    switch (event.keyCode) {
        case 32:
            bird.velY *= -0.2;
            bird.velY -= 3;
            break;
        default:
            break;
    }
}