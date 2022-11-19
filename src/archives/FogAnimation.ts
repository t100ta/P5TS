import p5 from "p5";

const sketch = (p: p5) => {
  let xstart: number, xnoise: number, ystart: number, ynoise: number;
  let xstartNoise: number, ystartNoise: number;
  
  function drawPoint(x: number, y: number, noiseFactor: number): void{
    p.push();
    p.translate(x, y);
    p.rotate(noiseFactor * p.radians(540));
    p.noStroke();
    const edgeSize: number = noiseFactor * 35;
    const grey: number = 150 + (noiseFactor * 120);
    const alph: number = 150 + (noiseFactor * 120);
    p.fill(grey, alph);
    p.ellipse(0, 0, edgeSize, edgeSize/2);
    p.pop();
  }
  
  p.setup = () => {
    p.createCanvas(800, 800);
    p.smooth();
    p.background(0);
    p.frameRate(60);

    xstartNoise = p.random(20);
    ystartNoise = p.random(20);
    xstart = p.random(10);
    ystart = p.random(10);
  }

  p.draw = () => {
    p.background(0);

    xstartNoise += 0.01;
    ystartNoise += 0.01;

    xstart += (p.noise(xstartNoise) * 0.5) - 0.25;
    ystart += (p.noise(ystartNoise) * 0.5) - 0.25;

    xnoise = xstart;
    ynoise = ystart;

    for (let y = 0; y <= p.height; y+=5) {
      ynoise += 0.1;
      xnoise = xstart;
      for (let x = 0; x <= p.width; x+=5) {
        xnoise += 0.1;
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  }
}

new p5(sketch);
