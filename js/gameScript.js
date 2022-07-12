const state = {
    current: 0,
    ready: 0,
    play: 1,
    over: 2
}
let canvas = document.getElementById("myCanvas");


let canv_width = window.innerWidth * 0.9;
let canv_height = window.innerHeight * 0.8;

canv_width = Math.min(Math.max(canv_width,MIN_WIDTH),MAX_WIDTH)
canv_height = Math.min(Math.max(canv_height,MIN_HEIGHT),MAX_HEIGHT)

let ctx = canvas.getContext("2d");
ctx.canvas.width = canv_width;
ctx.canvas.height = canv_height;

ctx.imageSmoothingEnabled = false;

state.current = state.ready;

let frame_count = 0; //frames counter


let bird = new Bird(canvas.width/6,canv_height/2 - Bird.height);
let pipeManager = new PipeManager();
pipeManager.reset()
let coinManager = new CoinManager();
let score = new Score();

document.getElementById('best-score-value').innerText = score.best;
function gameReset() {

    bird.reset();
    pipeManager.reset();
    coinManager.reset(pipeManager.pipes);
    score.reset();
    //set game state
    state.current = state.ready;

}
gameReset();
fixed_FPS_loop();
function gameLoop(){
    // 1 - Draw
    //Draw background 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Game Objects 
    pipeManager.drawPipes(ctx);
    bird.draw(ctx);
    coinManager.drawCoins(ctx);

    if(state.current == state.over){
        ctx.fillStyle = "#00000050"; // # rr gg bb aa
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    score.draw(ctx);

    // 2 - Update
    bird.animate(frame_count,80);
    bird.update();
    coinManager.update();
    pipeManager.update();
    pipeManager.generate();
    coinManager.generate(pipeManager.pipes);

      
    // check collision
    if (pipeManager.isCollideWith(bird) || bird.isCollideWithTop() || bird.isCollideWithBottom()){
        state.current = state.over;
    }
    if(coinManager.isCollideWith(bird)){
        // Increment Score here
        score.increment();
    }
    //3- increment the frame counter
    frame_count++;
}


var now;
var then = Date.now();
var interval = 1000 / FPS;
var delta;
function fixed_FPS_loop() {
    requestAnimationFrame(fixed_FPS_loop);
    now = Date.now();
    delta = now - then;
    //console.log(delta);

    if (delta > interval) {
        // Here only execute every the specified fps number
        gameLoop();

        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.
        then = now - (delta % interval);
    }

}


canvas.addEventListener("mousedown", tapOrClick, false);
canvas.addEventListener("touchstart", tapOrClick, false);
document.addEventListener("keydown", keyDown);

function tapOrClick(event) {
    //handle tap or click.
    //event.preventDefault();
    flapOrGameReset();
    return false;
}

function keyDown(event) {
    //event.preventDefault();
    if (event.key === ' ') {
        flapOrGameReset()
    }
    if(event.key === 'r'){
        localStorage.setItem('best','0');
        score.best = 0;
        document.getElementById('best-score-value').innerText = 0;
    }
}

function flapOrGameReset() {
    if (state.current == state.ready || state.current == state.play) {
        state.current = state.play;
        bird.flap();

    } else {
        state.current = state.ready;
        gameReset();
    }
}