let spaceship;
let obstacles = [];
let score = 0;
let level = 1;
let highScore = 0;
let powerUps = [];
let shield = false;

function setup() {
    createCanvas(800, 800);
    spaceship = new Spaceship();
}

function draw() {
    background(0);


    // Draw starry background
    for (let i = 0; i < 100; i++) {
        let x = random(width);
        let y = random(height);
        stroke(255);
        point(x, y);
    }

    spaceship.show();
    spaceship.move();

    // Generate obstacles and power-ups based on levels
    if (random(1) < 0.02 * level) {
        obstacles.push(new Obstacle());
    }

    if (random(1) < 0.005) {
        powerUps.push(new PowerUp());
    }

    // Handle obstacles
    for (let obs of obstacles) {
        obs.show();
        obs.move();

        if (spaceship.hits(obs) && !shield) {
            score = 0;
            level = 1;
            obstacles = [];
            powerUps = [];
            break;
        }

        if (obs.y > height) {
            score++;
            if (score > highScore) highScore = score;
            if (score % 10 === 0) level++;
            obstacles.splice(obstacles.indexOf(obs), 1);
        }
    }

    // Handle power-ups
    for (let p of powerUps) {
        p.show();
        p.move();

        if (spaceship.hits(p)) {
            shield = true;
            setTimeout(() => { shield = false; }, 5000);
            powerUps.splice(powerUps.indexOf(p), 1);
        }
    }

    // Display Score and Level
    fill(255);
    textSize(32);
    text(`Score: ${score}`, 10, 30);
    text(`Level: ${level}`, 10, 60);
    text(`High Score: ${highScore}`, 10, 90);

    // Display Shield
    if (shield) {
        fill(0, 255, 0, 50);
        ellipse(spaceship.x, spaceship.y, 50);
    }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        spaceship.dir = -1;
    } else if (keyCode === RIGHT_ARROW) {
        spaceship.dir = 1;
    }
}

function keyReleased() {
    spaceship.dir = 0;
}
