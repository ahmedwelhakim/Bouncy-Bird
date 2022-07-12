const tube_img = new Image();
const pipeNeck_img = new Image();
tube_img.src = "sprite/tube.png";
pipeNeck_img.src = "sprite/pipeNeck.png";
//--- Actual img pixels width and height ------------
const tube_sprite_width = 23;
const tube_sprite_height = 125;
const pipeNeck_sprite_width = 29;
const pipeNeck_sprite_height = 11;
//---------------------------------------------------
const tube_scale = 2.5;
const tube_scaled_width =  pipeNeck_sprite_width * tube_scale;

const pipeNeck_scale = 3.7;
const pipeNeck_scaled_height = pipeNeck_sprite_height * pipeNeck_scale;
const pipeNeck_scaled_width = pipeNeck_sprite_width * pipeNeck_scale;
const pipe_scaled_width = pipeNeck_scaled_width;

const pipe_gap = 200;

const pipe_type = {
    TOP_PIPE: 0,
    BOTTOM_PIPE: 1
}

class Pipe extends GameObject{
    #dx;
    static width = pipe_scaled_width;
    constructor(x) {
        super(x,0,pipe_scaled_width,canvas.height);

        let min_height = pipeNeck_scaled_height *2;
        let tPipe_minHeight = min_height;
        let bPipe_minHeight = min_height;
        let topPipe_height = Math.random() * (canvas.height - pipe_gap - tPipe_minHeight - bPipe_minHeight) + min_height ;
        this.topPipe = new TopOrBottomPipe(x,0,topPipe_height,pipe_type.TOP_PIPE);

        let bottomPipe_y =this.topPipe.bottom+pipe_gap;
        let bottomPipe_height = canvas.height - topPipe_height - pipe_gap;
        this.bottomPipe = new TopOrBottomPipe(x,bottomPipe_y ,bottomPipe_height,pipe_type.BOTTOM_PIPE);
    }
    draw(ctx) {
        this.topPipe.draw(ctx);
        this.bottomPipe.draw(ctx);
    }
    update() {
        if(state.current == state.play){
            this.#dx = SPEED_X * -1;
        }else{
            this.#dx = 0;
        }
        this.topPipe.update(this.x);
        this.bottomPipe.update(this.x);
        this.x += this.#dx;
    }
    isCollideWith(gameObject){
        return this.topPipe.isCollideWith(gameObject)||
                this.bottomPipe.isCollideWith(gameObject);
    }
    get gapObject(){
        return new GameObject(this.x,this.topPipe.bottom,this.width,this.bottomPipe.top - this.topPipe.bottom);
    }
}
class TopOrBottomPipe extends GameObject{
    constructor(x,y,height,type) {
        super(x,y,pipe_scaled_width,height);

        let tube_height = height - pipeNeck_scaled_height;
        let pNeck_x = x;
        let tube_x =  x + (pipeNeck_scaled_width - tube_scaled_width)/2;
        let tube_y;
        let pNeck_y;

        if(type == pipe_type.TOP_PIPE){
            tube_y = y;
            pNeck_y = y + tube_height;
        }else{
            pNeck_y = y;
            tube_y = y + pipeNeck_scaled_height;
        }
        
        this.tube = new Tube(tube_x, tube_y, tube_height);
        this.pipeNeck = new PipeNeck(pNeck_x, pNeck_y,pipeNeck_scaled_height);
    }
    draw(ctx) {
        this.tube.draw(ctx);
        this.pipeNeck.draw(ctx);
    }
    update(x) {
        this.tube.x = x + (pipeNeck_scaled_width - tube_scaled_width)/2;
        this.pipeNeck.x = x;
        this.x = x;
    }
    isCollide(gameObject){
        return this.tube.isCollideWith(gameObject)||
                this.pipeNeck.isCollideWith(gameObject);
    }
}

class Tube extends GameObject{
    constructor(x, y, height){
        super(x,y,tube_scaled_width,height);
    }
    draw(ctx){
        ctx.drawImage(tube_img,0,0,tube_sprite_width,tube_sprite_height, this.x,this.y, this.width, this.height);
    }
    isCollide(gameObject){
        let vertical_check = gameObject.right > this.left && gameObject.left < this.right;
        let horizontal_check = gameObject.bottom > this.top && gameObject.top < this.bottom;
        return vertical_check && horizontal_check;
    }
}
class PipeNeck extends GameObject{
    constructor(x, y, height){
        super(x,y,pipeNeck_scaled_width,height);
    }
    draw(ctx){
        ctx.drawImage(pipeNeck_img,0,0,pipeNeck_sprite_width,pipeNeck_sprite_height, this.x,this.y, this.width, this.height);
    }
    isCollide(gameObject){
        let vertical_check = gameObject.right > this.left && gameObject.left < this.right;
        let horizontal_check = gameObject.bottom > this.top && gameObject.top < this.bottom;
        return vertical_check && horizontal_check;
    }
}
