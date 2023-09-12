// Spaceship class
class Spaceship {
    constructor() {
        this.x = width / 2;
        this.y = height - 20;
        this.dir = 0;
        this.trail = [];
    }



    show() {
        // Draw trail for spaceship
        for (let i = 0; i < this.trail.length; i++) {
            fill(0, 0, 255, i);  // Reduced alpha value for subtlety
            ellipse(this.trail[i].x, this.trail[i].y, 10);  // Reduced size for subtlety
        }
        // Limit trail length to 25 elements
        if (this.trail.length > 25) {
            this.trail.splice(0, 1);
        }
        this.trail.push(createVector(this.x + 10, this.y + 10));

        // Draw spaceship
        fill(0, 0, 255);
        rect(this.x, this.y, 20, 20);
    }

    move() {
        this.x += this.dir * 5;
        this.x = constrain(this.x, 0, width - 20);
    }

    hits(obj) {
        let x1 = this.x;
        let x2 = obj.x;
        let y1 = this.y;
        let y2 = obj.y;
        return (x1 < x2 + 20 && x1 + 20 > x2 && y1 < y2 + 20 && y1 + 20 > y2);
    }
}

// Obstacle class
class Obstacle {
    constructor() {
        this.x = random(width);
        this.y = 0;
        this.type = int(random(3));  // 0, 1, or 2 for variety
        this.shape = int(random(2)); // 0 for ellipse, 1 for rectangle
    }

    show() {
        // Choose color based on type
        if (this.type === 0) fill(255, 0, 0);
        else if (this.type === 1) fill(0, 255, 0);
        else fill(0, 0, 255);

        // Draw shape based on this.shape
        if (this.shape === 0) {
            ellipse(this.x, this.y, 20, 20);
        } else {
            rect(this.x, this.y, 20, 20);
        }
    }

    move() {
        this.y += 2 + level;
    }
}
