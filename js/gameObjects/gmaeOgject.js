
export class GameObject{
	constructor(x,y,width, heigt){
		this.x = x;
		this.y = y;
		this.width = width;
		this.heigt = heigt;
	}
	get left(){
		return this.x;
	}
	get right(){
		return this.x + this.width;
	}
	get top(){
		return this.y;
	}
	get bottom(){
		return this.y + this.heigt;
	}
	get width(){
		return this.width;
	}
	get height(){
		return this.height;
	}
}