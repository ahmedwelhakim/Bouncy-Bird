function isCollide(bird, pipe) {
    if ((bird.x <= pipe[0].x + pipe_width * pipe_scaleX) && (bird.x + b_width * b_scale >= pipe[0].x)) {
        if (bird.y < pipe[0].getTopAccY() || bird.y + b_height * b_scale > pipe[0].getLowAccY()) {
            return true;
        }
    } else {
        return false;
    }
}

function iscoinCollision(bird, coin) {

    if ((bird.x <= coin.x + coin_width) && (bird.x + b_width * b_scale >= coin.x)) {
        if ((bird.y <= coin.y + coin_height) && (bird.y + b_height * b_scale >= coin.y)) {
            return true;
        }
    } else {
        return false;
    }
}