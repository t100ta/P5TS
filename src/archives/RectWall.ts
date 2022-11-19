import p5 from "p5";

const sketch = (p: p5) => {
  function drawPoint(x: number, y: number, noiseFactor: number){
    p.push();
    p.translate(x * noiseFactor * 4, y * noiseFactor * 4, -y);
    const edgeSize: number = noiseFactor * 26;
    // p.ellipse(0, 0, edgeSize, edgeSize);
    p.rect(0, 0, edgeSize, edgeSize);
    p.pop();
  }

  p.setup = () => {
    p.createCanvas(16*110, 9*110, p.WEBGL);
    p.background(150);
    p.stroke(0, 50);
    p.fill(255, 200);
    const xstart: number = p.random(10);
    let ynoise: number = p.random(10);
    p.translate(p.width / 8, p.height / 8);
    for (let y = -(p.height/8); y <= (p.height/8); y+=3) {
      ynoise += p.random(0.03);
      let xnoise: number = xstart;
      for (let x = -(p.width/8); x <= (p.width/8); x+=3) {
        xnoise += p.random(0.03);
        drawPoint(x, y, p.noise(xnoise, ynoise));
      }
    }
  }

  p.draw = () => {

  }
}

new p5(sketch);
