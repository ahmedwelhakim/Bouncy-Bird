ctx.imageSmoothingEnabled = false;

const gameStates = ["READY", "PLAYING", "GAMEOVER"];
let currentState = gameStates[0];

window.requestAnimationFrame(loop);
let frame_count = 0; //frames counter
let i = 0; //bird animation index

//The Game Loop
function loop() {

    frame_count++;
    if (frame_count % 10 == 0 && currentState != gameStates[2]) {
        i ^= 1; // toogle the animation
    }
    if (frame_count > 1000000) {
        frame_count = 0;
    }

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canv_width, canv_height);

    pipes.forEach(p => {
        p.draw();
    });
    bird.draw(i);
    bird.update();
    pipeGenerator(frame_count);

    if (isCollide(bird, pipes)) {
        currentState = gameStates[2];
    }
    window.requestAnimationFrame(loop);
}

function isCollide(bird, pipe) {
    if ((bird.x <= pipe[0].x + pipe_width * pipe_scaleX) && (bird.x + b_width * b_scale >= pipe[0].x)) {
        if (bird.y < pipe[0].getTopAccY() || bird.y + b_height * b_scale > pipe[0].getLowAccY()) {
            return true;
        }
    } else {
        return false;
    }
}