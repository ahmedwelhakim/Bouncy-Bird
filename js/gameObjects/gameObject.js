
class GameObject{
	#width;
	#height;
	#x;
	#y;
	constructor(x,y,width, height){
		this.#x = x;
		this.#y = y;
		this.#width = width;
		this.#height = height;
	}
	isCollideWith(gameObject){
		let vertical_check = gameObject.right > this.left && gameObject.left < this.right;
        let horizontal_check = gameObject.bottom > this.top && gameObject.top < this.bottom;
        return vertical_check && horizontal_check;	
	}
	get left(){
		return this.x;
	}
	get right(){
		return this.x + this.#width;
	}
	get top(){
		return this.y;
	}
	get bottom(){
		return this.y + this.#height;
	}
	get width(){
		return this.#width;
	}
	get height(){
		return this.#height;
	}
	set width(val){
		this.#width = val;
	}
	set height(val){
		this.#height = val;
	}
	set x(val){
		this.#x = val;
	}
	set y(val){
		this.#y = val;
	}
	get x(){
		return this.#x;
	}
	get y(){
		return this.#y;
	}
}