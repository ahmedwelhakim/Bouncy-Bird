const radiusX = 8;
const radiusY = 15;
const coin_width = radiusX * 2;
const coin_height = radiusY * 2;


class Coin extends GameObject{
    #dx;
    static width = coin_width;
    static height = coin_height;
    constructor(x, y) {
        super(x,y,coin_width,coin_height);
    }
    draw(ctx) {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.ellipse(this.x+Coin.width/2 , this.y+Coin.height/2, radiusX, radiusY, 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();


    }
    update() {
        
        if (state.current == state.play) {
            this.#dx = SPEED_X * -1;
        }else{
            this.#dx = 0;
        }
        this.x += this.#dx;
    }
}
