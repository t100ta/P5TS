import p5 from "p5";

const sketch = (p: p5) => {
  let xstart, ystart, zstart;
  let xnoise, ynoise, znoise;

  const sideLength = 200;
  const spacing = 5;
  

  function drawPoint(x: number, y: number,z :number, noiseFactor: number): void{
    p.push();
    p.translate(x, y, z);
    const grey = noiseFactor * 255;
    p.fill(grey, 10);
    p.box(spacing, spacing, spacing);
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(800, 800, p.WEBGL);
    p.frameRate(24)
    p.background(0);
    p.noStroke();

    xstart = p.random(10);
    ystart = p.random(10);
    zstart = p.random(10);
  }

  p.draw = () => {
    p.background(0);

    xstart += 0.01;
    ystart += 0.01;
    zstart += 0.01;
    xnoise = xstart;
    ynoise = ystart;
    znoise = zstart;

    p.translate(150, 20, -150);
    p.rotateZ(p.frameCount * 0.1);
    p.rotateY(p.frameCount * 0.1);

    for (let z = 0; z <= sideLength; z+=spacing) {
      znoise += 0.1;
      ynoise = ystart;
      for (let y = 0; y <= sideLength; y+=spacing) {
        ynoise += 0.1;
        xnoise = xstart;
        for (let x = 0; x <= sideLength; x+=spacing) {
          xnoise += 0.1;
          drawPoint(x, y, z, p.noise(xnoise, ynoise, znoise));
          
        }
      }
    }
  }
}

new p5(sketch);
