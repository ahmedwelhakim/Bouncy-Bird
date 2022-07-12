const pipes_distance = 200;
class PipeManager{
	#pipes;
	static  pipes_distance = pipes_distance;
	
	constructor(){
		this.#pipes = [];
	}
	reset(){
		let pipeX = canvas.width + Pipe.width + pipes_distance;
		this.#pipes.length = 0;
		for(let x = pipes_distance * 2; x <= pipeX; x += pipes_distance + Pipe.width){
			this.#pipes.push(new Pipe(x));
		}
	}
	generate(){
		let pipeX = canvas.width + Pipe.width + pipes_distance;
		if(this.#pipes.length >0){
			let right_distace = pipeX - this.#pipes[this.#pipes.length - 1].right ;
			if(right_distace > pipes_distance ){
				this.#pipes.push(new Pipe(pipeX));
			}
			if(this.#pipes[0].right < 0){
				this.#pipes.shift();
			}
		}else{
			this.#pipes.push(new Pipe(pipeX));
		}
	}
	drawPipes(ctx){
		if(this.#pipes.length >0){
			this.#pipes.forEach(p => {
				p.draw(ctx);
			});
		}
	}
	update(){
		if(this.#pipes.length >0){
			this.#pipes.forEach(p => {
				p.update();
			});
		}
	}
	isCollideWith(gameObject){
		if(this.#pipes.length >0){
			return this.#pipes[0].isCollideWith(gameObject);
		}
	}
	get pipes(){
		return this.#pipes;
	}
	
}