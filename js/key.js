document.onkeydown = function userInput() {

    switch (event.keyCode) {
        case 32:
            if (state.current == state.ready) {
                state.current = state.play;
                birdFlap();
            } else if (state.current == state.play) {
                birdFlap();
            } else {
                state.current = state.ready;
                reset();
            }
            break;
        default:
            break;
    }
}
var myCanvas = document.getElementById("myCanvas");

myCanvas.addEventListener("mouseup", tapOrClick, false);
myCanvas.addEventListener("touchend", tapOrClick, false);

function tapOrClick(event) {
   //handle tap or click.

    event.preventDefault();
    if (state.current == state.ready) {
        state.current = state.play;
        birdFlap();
    } else if (state.current == state.play) {
        birdFlap();
    } else {
        state.current = state.ready;
        reset();
    }
    return false;
}