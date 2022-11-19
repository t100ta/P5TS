import p5 from "p5";

type Bubble = {
  pos: {
    x: number;
    y: number;
  };
  size: number;
  speed: number;
  isFill: boolean;
}


const sketch = (p: p5) => {
  const COUNT = 40;
  const MINSIZE = 0.005;
  const MAXSIZE = 0.2;
  const MINSPEED = 0.005;
  const MAXSPEED = 0.02;
  const MOUSE_ACTIVE_FRAMES = 120;
  const BG_COLOR = "#171d21";
  const BUBBLE_COLOR = "#77acb5";
  let bubbles: Bubble[] = [];
  let lastMouseMoved = -MOUSE_ACTIVE_FRAMES;

  const addBubble = () => {
    const zDist = p.random() ** 3;
    const isUseMousePos = p.frameCount - lastMouseMoved < MOUSE_ACTIVE_FRAMES;
    const x = isUseMousePos? p.mouseX / p.width + p.random(-0.05, 0.05): p.random();
    const y = isUseMousePos? p.mouseY / p.height + p.random(-0.05, 0.05): 1.2;
    bubbles.push({
      pos: {x, y},
      size: p.map(zDist, 0, 1, MINSIZE, MAXSIZE),
      speed: p.map(zDist, 0, 1, MINSPEED, MAXSPEED),
      isFill: Math.random() > 0.5,
    });
  };

const removeOutBubbles = () => {
  bubbles = bubbles.filter((b) => b.pos.y * p.height + b.size >= 0);
}

const updateBubbles = () => {
  bubbles.forEach((b) => {
    b.pos.y -= b.speed;
  });
};

const drawBubbles = () => {
  bubbles.forEach((b) => {
    const noise = p.noise(b.pos.x * 20, b.pos.y * 20);
    const xShift = p.map(noise, 0, 1, -15, 15);
    const color = p.color(BUBBLE_COLOR);
    p.stroke(color);
    b.isFill ? p.fill(color): p.noFill();
    p.circle(
      b.pos.x * p.width + xShift,
      b.pos.y * p.height,
      b.size * p.width
    );
  });
};

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  }
  p.draw = () => {
    p.push();
    p.background(p.color(BG_COLOR));
    p.blendMode(p.SCREEN);
    removeOutBubbles();
    while (bubbles.length < COUNT) {
      addBubble();
    }
    updateBubbles();
    drawBubbles();
    p.pop();
  }

  p.mouseMoved = () => {
    lastMouseMoved = p.frameCount;
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  }
}
new p5(sketch);