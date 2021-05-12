ctx.imageSmoothingEnabled = false;




window.requestAnimationFrame(loop);
let frame_count = 0;
let i = 0; //bird animation index

function loop() {
    // do something
    frame_count++;
    if (frame_count % 10 == 0) {
        i ^= 1; // toogle the animation
    }
    if (frame_count > 1000000) {
        frame_count = 0;
    }

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canv_width, canv_height);
    bird.draw(i);
    pipes.forEach(p => {
        p.draw();
    });
    if (!isCollide(bird, pipes)) {
        bird.update();
        pipeGenerator(frame_count);

    } else {
        alert(Loser);
    }
    window.requestAnimationFrame(loop);
}

function isCollide(bird, pipe) {
    if ((bird.x <= pipe[0].x + pipe_width * pipe_scaleX) && (bird.x + b_width * b_scale >= pipe[0].x)) {
        if (bird.y < pipe[0].getTopAccY() || bird.y + b_height * b_scale > pipe[0].getLowAccY()) {
            return true;
        }
    } else {
        return false;
    }
}