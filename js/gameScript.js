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
    drawCoins();
    bird.draw(i);

    score.draw();

    //2- Update
    bird.update();
    pipeGenerator(frame_count);

    coinGenertator();
    updateCoins();

    for (let c = 0; c < coins.length; c++) {
        if (iscoinCollision(bird, coins[c])) {
            coins.splice(c, 1);
            score.value++;
        }
    }


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



function reset() {
    //CLear the pipe array
    pipes.length = 0;
    init_PipesList();
    //clear the bird 
    init_bird();
    init_coins();
    init_coin();
    //set game state
    state.current = state.ready;

    score.reset();
}