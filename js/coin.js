const radX = 8;
const radY = 15;
const coin_width = radX * 2;
const coin_height = radY * 2;
const coin_topDistance = 40;
const coin_no = 2;

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    draw() {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, radX, radY, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();

    }
    update() {
        if (state.current == state.play) {
            this.x -= dx;
        }

    }

}

function init_coin() {
    coin = new Coin(200, 100);
}
let coin = new Coin(200, 100);

let coins = [];



function coinGenertator() {
    var coin_gap = pipe_distance / coin_no;
    if (state.current == state.play) {

        if (pipes[pipes.length - 1].x == c.width - dx) {
            for (let g = 0; g < coin_no * coin_gap; g += coin_gap) {
                coins.push(new Coin(pipes[pipes.length - 1].x + g - (pipe_distance / 2) + (pipe_width * pipe_scaleX) / 2,
                    pipes[pipes.length - 1].getTopAccY() - Math.sin((Math.PI / pipe_distance) * (g / coin_gap) * (180 / Math.PI)) * coin_topDistance + pipe_gap / 2));
            }
        }


        if (coins.length > 0 && coins[0].x < 0) {
            coins.shift();
        }



    }
}



function init_coins() {
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