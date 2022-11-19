import p5 from "p5";

const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(1000, 1000);
    p.smooth();
    p.background(255);
    const xstart: number = p.random(10);
    let xnoise: number = xstart;
    let ynoise: number = p.random(10);

    for (let y = 0; y < p.height; y++) {
      ynoise += 0.01;
      xnoise = xstart;
      for (let x = 0; x < p.width; x++) {
        xnoise += 0.01;
        const alph = p.noise(xnoise, ynoise) * 255;
        p.stroke(0, alph);
        p.line(x, y, x+1, y+1);
      }
    }
  }

  p.draw = () => {

  }
}

new p5(sketch);
