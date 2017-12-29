function getRandomSize() {
    let rNum = Math.random(),
        minBig = 15,
        maxBig = 30,
        minSmall = 6,
        maxSmall = 15;
    switch (true) {
        case rNum <= 0.7:
            return minBig + Math.random() * maxBig;
        case rNum > 0.7:
            return minSmall + Math.random() * maxSmall;
    }
}

class Snowflake {
    constructor(img) {
        let x = random(0, width);
        let y = random(-100, -10);
        this.img = img;
        this.position = createVector(x, y);
        this.velocity = createVector(0, 5);
        this.acceleration = createVector();
        this.angle = random(TWO_PI);
        this.direction = random(1) > 0.5 ? 1 : -1;
        this.xOff = 0;

        this.r = getRandomSize();
    }

    applyForce(force) {
        // Parallax Effect Hack
        let f = force.copy();
        f.mult(this.r);

        this.acceleration.add(force);
    }

    update() {
        this.xOff = sin(this.angle) * this.r;

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.r);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.angle += this.direction * this.velocity.mag() / 200;
    }

    render() {
        push();
        translate(this.position.x + this.xOff, this.position.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(this.img, 0, 0, this.r, this.r);
        pop();
    }

    offScreen() {
        return (this.position.y > height + this.r);
    }
}