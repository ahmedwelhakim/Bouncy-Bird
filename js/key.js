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