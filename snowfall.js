let snow = [],
    gravity,
    spritesheet,
    textures = [];

function preload() {
    spritesheet = loadImage('f32.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    gravity = createVector(0, 0.03);
    
    for (let x = 0; x < spritesheet.width; x += 32) {
        for (let y = 0; y < spritesheet.height; y += 32) {
            let img = spritesheet.get(x, y, 32, 32);
            image(img, x, y);
            textures.push(img);
        }
    }
}

function draw() {
    background(0);

    let windx = map(mouseX, 0, width, -0.1, 0.1);
    let wind = createVector(windx, 0);

    let design = random(textures);
    snow.push(new Snowflake(design));

    for (flake of snow) {
        flake.applyForce(gravity);
        flake.applyForce(wind);
        flake.update();
        flake.render();
    }

    for (let i = snow.length - 1; i >= 0; i--) {
        if (snow[i].offScreen()) {
            snow.splice(i, 1);
        }
    }
}