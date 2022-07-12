const birds_in_sprite = 2;
const birds_img = new Image(); // contain the img of the bird sprites 
birds_img.src = "sprite/birdSprite.png";// (36 x 13 img)

const bird_sprite_width = 36 / birds_in_sprite; // the original img width pixels
const bird_sprite_height = 13; // the original img height pixels
const bird_scale = 3;

const bird_scaled_width = bird_sprite_width * bird_scale;
const bird_scaled_height = bird_sprite_height * bird_scale;


class Bird extends GameObject {
    static width = bird_scaled_width;
    static height =  bird_scaled_height;
    #startX;
    #startY;
    #dx;
    #dy;
    #ddy;
    #bird_animation_no;
    #frame_count;
    constructor(x, y) {
        super(x, y,bird_scaled_width,bird_scaled_height)
        this.#startX = x;
        this.#startY = y;
        this.#dx = 0;
        this.#dy = 0;
        this.#ddy = 0;
        this.#bird_animation_no = 0;
        this.#frame_count = 0;
    }
    draw(ctx) {
        ctx.drawImage(birds_img,
            this.#bird_animation_no * bird_sprite_width, 0, bird_sprite_width, bird_sprite_height,
            this.x, this.y, this.width, this.height);
    }
    update() {
        this.#ddy = GRAVITY;
        if(state.current == state.ready){
            this.#ddy = 0;
            this.#dy = 0;
        }
        
        if(this.bottom+this.#dy>=canvas.height){
            this.#ddy = 0;
            this.#dy = 0;
        }
        if (state.current == state.over) {
            if (this.bottom < canvas.height) {
                this.#dx = SPEED_X ;
            }else{
                this.#dx = 0;
            }
        }else{
            this.#dx = 0;
        }
        if(this.isCollideWithTop()){
            this.#dy *= -0.7;
        }
        this.x += this.#dx;
        this.#dy += this.#ddy;
        this.y += this.#dy;
    }
    animate(frame_count, animate_time_ms) {
        if(state.current != state.over){
            // every specified time in ms change the bird animation number
            let frames = FPS * (animate_time_ms / 1000);
            if (frame_count - this.#frame_count >= frames) {
                this.#frame_count = frame_count;
                this.#bird_animation_no++;
                if (this.#bird_animation_no >= birds_in_sprite) {
                    this.#bird_animation_no = 0;
                }
            }
        }
    }
    flap() {
        this.#dy = -740/FPS;
    }
    reset(){
        this.x = this.#startX;
        this.y = this.#startY;
    }
    isCollideWithTop(){
        return this.top < 0;
    }
    isCollideWithBottom(){
        return this.bottom > canvas.height;
    }
  
}
