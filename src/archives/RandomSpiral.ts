import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(16*100, 9*100);
    p.background(255);
    p.strokeWeight(0.5);
    p.smooth();

    const centx = p.width/2;
    const centy = p.height/2;

    let x:number, y:number;
    for (let i = 0; i < 1000; i++) {
      let lastx = -9999;
      let lasty = -9999;
      let radiusNoise = p.random(10);
      let radius = 10;
      p.stroke(p.random(20), p.random(50), p.random(70), 80);
      const startangle:number = p.random(360);
      const endangle:number = 1440 + p.random(1440);
      const anglestep:number = 5 + p.random(3);
      for (let ang = startangle; ang <= endangle; ang+=anglestep) {
        radiusNoise += 0.05;
        radius += 0.5;
        const thisRadius = radius + (p.noise(radiusNoise) * 200) - 100;
        const rad = p.radians(ang);
        x = centx + (thisRadius * p.cos(rad));
        y = centy + (thisRadius * p.sin(rad));
        if (lastx > -999) {
          p.line(x, y, lastx, lasty);
        }
        lastx = x;
        lasty = y;
      }
    }
  }

  p.draw = () => {

  }
}

new p5(sketch);
