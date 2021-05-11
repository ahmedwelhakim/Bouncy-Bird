ctx.imageSmoothingEnabled = true;






setInterval(() => {
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, 1000, 540);
    bird.draw();
    bird.update();
}, 24);