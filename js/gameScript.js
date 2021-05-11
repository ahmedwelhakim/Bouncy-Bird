ctx.imageSmoothingEnabled = false;




window.requestAnimationFrame(step);
let frame_count = 0;
let i = 0; //bird animation index

function step() {
    // do something
    frame_count++;
    if (frame_count % 10 == 0) {
        i ^= 1; // toogle the animation
    }
    if (frame_count > 100) {
        frame_count = 0;
    }

    ctx.clearRect(0, 0, c.width, c.height);
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canv_width, canv_height);
    bird.draw(i);
    bird.update();
    window.requestAnimationFrame(step);
}