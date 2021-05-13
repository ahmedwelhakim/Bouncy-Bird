ctx.imageSmoothingEnabled = false;
const state = {
    current: 0,
    ready: 0,
    play: 1,
    over: 2
}
state.current = state.ready;
window.requestAnimationFrame(loop);
let frame_count = 0; //frames counter
let i = 0; //bird animation index

init_PipesList();
//The Game Loop
function loop() {
    //1- Draw
    //Draw background 
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, c.width, c.height);
    //Draw pipes and bird and score
    drawPipes();
    bird.draw(i);
    score.draw();

    //2- Update
    bird.update();
    pipeGenerator(frame_count);

    if (isCollide(bird, pipes)) {
        state.current = state.over;
    }

    //3- increment the frame counter
    //frame count and index of bird to animate it
    frame_count++;
    if (frame_count % 10 == 0 && state.current != state.over) {
        i ^= 1; // toogle the animation of bird
    }
    if (frame_count > 1000000) {
        frame_count = 0;
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

function reset() {
    //CLear the pipe array
    pipes.length = 0;
    init_PipesList();
    //clear the bird 
    init_bird()
        //set game state
    state.current = state.ready;
}
document.onkeydown = function userInput() {

    switch (event.keyCode) {
        case 32:
            if (state.current == state.ready) {
                state.current = state.play;
                birdFlap();
            } else if (state.current == state.play) {
                birdFlap();
            } else {
                state.current = state.ready;
                reset();
            }
            break;
        default:
            break;
    }
}