class FloatingCircle {
    constructor(x, y, radius, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }

    update(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width) {
            this.speedX = -this.speedX;
            this.color = this.getRandomColor();
        }

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height) {
            this.speedY = -this.speedY;
            this.color = this.getRandomColor();
        }
    }
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const floatingCircles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (const circle of floatingCircles) {
        circle.update(canvas);
        circle.draw(context);
    }

    requestAnimationFrame(animate);
}

function addFloatingCircle(event) {
    const radius = 20;
    const speedX = (Math.random() - 0.5) * 5;
    const speedY = (Math.random() - 0.5) * 5;

    const circle = new FloatingCircle(event.clientX, event.clientY, radius, speedX, speedY);
    floatingCircles.push(circle);
}

animate();

canvas.addEventListener("click", addFloatingCircle);
