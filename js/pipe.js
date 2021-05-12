const pipeUp = new Image();
const pipeDown = new Image();
pipeUp.src = "sprite/pipeUp.png";
pipeDown.src = "sprite/pipeDown.png";
const pipe_width = 29;
const pipe_height = 155;
const pipe_scaleX = 3;
const pipe_scaleY = 2.9;
const dx = 0.7;
const pipe_gap = 180;
class Pipe {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        drawPipeUp(0, 0, this.x, this.y);
        drawPipeDown(0, 0, this.x, this.y + pipe_height * pipe_scaleY + pipe_gap);
    }
    update() {
        this.x -= dx;
    }
    getTopAccY() //highest point before collision in up pipe
        {
            return this.y + (pipe_height * pipe_scaleY);
        }
    getLowAccY() {
        return this.y + (pipe_height * pipe_scaleY) + pipe_gap;
    }
}

let pipe_obj = new Pipe(c.width, -90);

function drawPipeUp(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(pipeUp,
        frameX, frameY, pipe_width, pipe_height,
        canvasX, canvasY, pipe_width * pipe_scaleX, pipe_height * pipe_scaleY);
}

function drawPipeDown(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(pipeDown,
        frameX, frameY, pipe_width, pipe_height,
        canvasX, canvasY, pipe_width * pipe_scaleX, pipe_height * pipe_scaleY);
}
let rand = Math.random() * -300 - 100;
let pipes = [new Pipe(c.width, rand)];

function pipeGenerator(frame_count) {
    let rand = Math.random() * -300 - 100;
    if (frame_count % 380 == 0) {
        pipes.push(new Pipe(c.width, rand));
    }
    pipes.forEach(p => {
        p.draw()
        p.update();
    });
    if (pipes[0].x < -pipe_width * pipe_scaleX) {
        pipes.shift();
    }
}