const score = {
    best: parseInt(localStorage.getItem('best')) || 0,
    value: 0,
    draw: function() {
        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";
        if (state.current == state.play) {
            ctx.lineWidth = 2;
            ctx.font = "40px Teko";
            ctx.fillText(this.value, c.width / 2, 50);
            ctx.strokeText(this.value, c.width / 2, 50);
        } else if (state.current == state.over) {
            // SCORE VALUE
            ctx.font = "40px Teko";
            ctx.fillText("Score: " + this.value, 20, 50);
            ctx.strokeText("Score: " + this.value, 20, 50);
            // BEST SCORE
            ctx.fillText("Best: " + this.best, 20, 100);
            ctx.strokeText("Best: " + this.best, 20, 100);
        }
    },
    reset: function() {
        this.value = 0;
    }


}