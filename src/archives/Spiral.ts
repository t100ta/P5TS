import p5 from "p5";

const sketch = (p: p5) => {


  p.setup = () => {
    p.createCanvas(500, 300);
    p.background(255);
    p.strokeWeight(5);
    p.smooth();

    let radius = 100;
    const centx = 250;
    const centy = 150;

    p.stroke(0, 30);
    p.noFill();
    p.ellipse(centx, centy, radius*2, radius*2);

    p.stroke(20, 50, 70);

    radius = 10;
    let x: number, y:number;
    let lastx = -999;
    let lasty = -999;
    for (let ang = 0; ang <= 1440 ; ang+= 5) {
      radius += 0.5;
      const rad: number = p.radians(ang);
      x = centx + (radius * p.cos(rad));
      y = centy + (radius * p.sin(rad));
      p.point(x, y);
      
    }
  }

  p.draw = () => {

  }
}

new p5(sketch);
