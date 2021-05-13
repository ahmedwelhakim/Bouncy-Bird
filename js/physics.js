function isCollide(bird, pipe) {
    if ((bird.x <= pipe[0].x + pipe_width * pipe_scaleX) && (bird.x + b_width * b_scale >= pipe[0].x)) {
        if (bird.y < pipe[0].getTopAccY() || bird.y + b_height * b_scale > pipe[0].getLowAccY()) {
            return true;
        }
    } else {
        return false;
    }
}