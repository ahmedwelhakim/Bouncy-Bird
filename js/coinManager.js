const coin_no = 4;
const coin_cycle_distance = (PipeManager.pipes_distance+Pipe.width);
const coins_distance = coin_cycle_distance / coin_no;
class CoinManager{
	#coins;
	constructor(){
		this.#coins = [];
	}
	reset(pipes){
		this.#coins.length = 0;
		if(pipes.length>0){

			let startX; 
			let endX; 
			let gap;
			pipes.forEach(p => {
				startX = p.x  - PipeManager.pipes_distance/2;;
				endX = startX + coin_cycle_distance;
				gap = p.gapObject;
				for(let x = startX; x < endX; x += coins_distance){
					let y = gap.bottom - (gap.height*0.2) -  Coin.height - Math.sin( Math.PI * ((x - startX) / coin_cycle_distance) ) * gap.height*0.4 ;
					this.#coins.push(new Coin(x,y));
				}
			});
			
		}
	}

	generate(pipes){
		if(state.current == state.play){
			if(pipes.length > 0 ){
				let rightPipe = pipes[pipes.length - 1];
				
				let startX = rightPipe.left - PipeManager.pipes_distance/2;
				let endX = startX + coin_cycle_distance;
				let gap = rightPipe.gapObject;
				if(startX == canvas.width + Pipe.width + PipeManager.pipes_distance/2)
					for(let x = startX; x < endX; x += coins_distance){
						let y = gap.bottom - (gap.height*0.2) -  Coin.height - Math.sin( Math.PI * ((x - startX) / coin_cycle_distance) ) * gap.height*0.4 ;
						this.#coins.push(new Coin(x,y));
					}
			
				if(this.#coins[0].right < 0){
					this.#coins.shift();
				}
			}
		}
	}
	drawCoins(ctx){
		if(this.#coins.length >0){
			this.#coins.forEach(c => {
				c.draw(ctx);
			});
		}
	}
	update(){
		if(this.#coins.length >0){
			this.#coins.forEach(c => {
				c.update();
			});
		}
	}
	isCollideWith(gameObject){
		let isCollide = false;
		if(this.#coins.length >0){
			this.#coins.forEach(c => {
				if(c.left > gameObject.right){
					return false;
				}
				if(c.isCollideWith(gameObject)){
					this.#coins.splice(this.#coins.indexOf(c),1);
					isCollide = true;
					return isCollide;
				}
			});
			return isCollide;
		}
		
	}
}