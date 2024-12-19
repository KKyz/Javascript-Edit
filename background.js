
import * as PIXI from 'pixi.js';

const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    resizeTo: window,
});
document.body.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

const gradient = new PIXI.Graphics();
app.stage.addChild(gradient);

function updateGradient() {
    const colors = [0xff5733, 0xffc300, 0x33ff57, 0x3380ff];
    gradient.clear();
    gradient.beginTextureFill({
        texture: PIXI.Texture.WHITE,
        color: colors[Math.floor((Date.now() / 1000) % colors.length)],
    });
    gradient.drawRect(0, 0, app.renderer.width, app.renderer.height);
    gradient.endFill();
}

// Bubble class
class Bubble {
    constructor(x, y, radius, dx, dy) {
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0xffffff, 0.7);
        this.graphics.drawCircle(0, 0, radius);
        this.graphics.endFill();

        this.graphics.x = x;
        this.graphics.y = y;

        this.radius = radius;
        this.dx = dx;
        this.dy = dy;

        container.addChild(this.graphics);
    }

    update() {
        this.graphics.x += this.dx;
        this.graphics.y += this.dy;

        if (this.graphics.x - this.radius > app.renderer.width) this.graphics.x = -this.radius;
        if (this.graphics.x + this.radius < 0) this.graphics.x = app.renderer.width + this.radius;
        if (this.graphics.y - this.radius > app.renderer.height) this.graphics.y = -this.radius;
        if (this.graphics.y + this.radius < 0) this.graphics.y = app.renderer.height + this.radius;
    }
}

const bubbles = [];
for (let i = 0; i < 15; i++) {

    //Random dir and pos
    const radius = Math.random() * 50 + 30;
    const x = Math.random() * app.renderer.width;
    const y = Math.random() * app.renderer.height;
    const dx = (Math.random() - 0.5) * 2;
    const dy = (Math.random() - 0.5) * 2;

    bubbles.push(new Bubble(x, y, radius, dx, dy));
}

app.ticker.add(() => {
    updateGradient();

    bubbles.forEach((bubble) => bubble.update()); //Not called?
});

window.addEventListener("resize", () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});