class Score{
    #score;
    #best;
    constructor(){
        this.#score = 0;
        this.#best = parseInt(localStorage.getItem('best')) || 0;
    }
    increment(){
        this.#score++;
        if(this.#score>this.#best){
            this.#best = this.#score;
            localStorage.setItem('best',this.#best);
            document.getElementById('best-score-value').innerText = this.#best;
        }
    }
    draw(ctx){
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        if (state.current == state.play) {
            ctx.lineWidth = 2;
            ctx.font = "40px Teko";
            ctx.fillText(this.#score, canvas.width / 2, canvas.height*0.1);
            ctx.strokeText(this.#score, canvas.width / 2, canvas.height*0.1);

        } else if (state.current == state.over) {
            let score_font_size = (40 * canvas.width/MAX_WIDTH) + 30;
            ctx.font = score_font_size+"px Teko";
            let score = "Score: "+this.#score;
            const score_metrics = ctx.measureText(score);

            // SCORE VALUE
            ctx.fillText(score,canvas.width/2 - score_metrics.width/2, (canvas.height/2)- (canvas.height*0.05)-(canvas.width*0.01) );
           // ctx.strokeText("Score: " + this.#score,canvas.width/2 - score_metrics.width/2, (canvas.height/2) );
            // BEST SCORE
            let best_font_size = (50 * canvas.width/MAX_WIDTH) + 30;
            ctx.font = best_font_size+"px Teko";
            let best = "Best Score: "+this.#best;
            const best_metrics = ctx.measureText(best);
            ctx.fillText(best, canvas.width/2 - best_metrics.width/2, (canvas.height/2)+ (canvas.height*0.05)+(canvas.width*0.01));

        }
    }
    reset(){
        this.#score = 0;
    }
    get best(){
        return this.#best;
    }
    set best(b){
        this.#best = b;
    }

}