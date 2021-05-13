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
        if (state.current == state.play || state.current == state.over) {
            gravityOn();
        } else {
            gravityOff()
        }
        if (state.current == state.over) {
            if (this.y + b_height * b_scale < canv_height) {
                this.x += 0.7;
            }

        }
    }
}

let bird = new Bird(100, 200);

function init_bird() {
    bird = new Bird(100, 200);
}

function drawBird(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(bird_img,
        frameX * b_width, frameY * b_height, b_width, b_height,
        canvasX, canvasY, b_width * b_scale, b_height * b_scale);
}



function birdFlap() {
    bird.velY *= -0.2;
    bird.velY -= 3;
}

function gravityOn() {
    bird.y += bird.velY;

    if (bird.y >= canv_height - b_height * b_scale) {
        bird.velY = 0;
        bird.y = canv_height - b_height * b_scale;
    } else {
        bird.velY += b_gravity;
    }
}

function gravityOff() {
    bird.velY = 0;
}