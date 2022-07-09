const radiusX = 8;
const radiusY = 15;
const coin_width = radiusX * 2;
const coin_height = radiusY * 2;
const coin_topDistance = 90;
const coin_no = 4;

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

    }
    update() {
        if (state.current == state.play) {
            this.x -= dx;
        }

    }

}

function reset_coin() {
    coin = new Coin(200, 100);
}
let coin = new Coin(200, 100);

let coins = [];

function drawReadyStateCoins(){
    var coin_gap = pipe_distance / coin_no;

    for (let g = 0; g < coin_no * coin_gap; g += coin_gap) {
        for( let p in pipes){
            var x = pipes[p].x + g  - (pipe_distance / 2) + (pipe_scaledWidth) / 2;
            var y =pipes[p].getTopAccY() - Math.sin((Math.PI / pipe_distance) * (g / coin_gap) * (180 / Math.PI)) * coin_topDistance + pipe_gap * 1.1;
            coins.push(new Coin(x,y));
        }
    }
        
    if (coins.length > 0 && coins[0].x < 0) {
        coins.shift();
    }
    
}

function coinGenertator() {
    var coin_gap = pipe_distance / coin_no;
    if (state.current == state.play) {

        if (pipes[pipes.length - 1].x == c.width - dx) {
            for (let g = 0; g < coin_no * coin_gap; g += coin_gap) {
                var x = pipes[pipes.length - 1].x + g - (pipe_distance / 2) + (pipe_scaledWidth) / 2;
                var y =pipes[pipes.length - 1].getTopAccY() - Math.sin((Math.PI / pipe_distance) * (g / coin_gap) * (180 / Math.PI)) * coin_topDistance + pipe_gap * 1.1;
                coins.push(new Coin(x,y));
            }
        }
        if (coins.length > 0 && coins[0].x < 0) {
            coins.shift();
        }
    }
}



function reset_coins() {
    coins = [];
}

function drawCoins() {

    coins.forEach(c => {

        c.draw();
    });
}

function updateCoins() {

    coins.forEach(c => {

        c.update();
    });
}