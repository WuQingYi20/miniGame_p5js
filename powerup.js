// PowerUp class
class PowerUp {
    constructor() {
        this.x = random(width);
        this.y = 0;
    }

    show() {
        fill(255, 255, 0);
        rect(this.x, this.y, 20, 20);
    }

    move() {
        this.y += 2;
    }
}
