import p5 from "p5";

const sketch = (p: p5) => {
  const numChildren = 5;
  const maxlevels = 5;

  let trunck: Branch;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);
    p.noFill();
    p.smooth();
    newTree()
  }

  function newTree() : void {
    trunck = new Branch(1, 0, p.width/2, p.height/2);
    trunck.drawMe();
  }
  
  p.draw = () => {
    p.background(255);
    trunck.updateMe(p.width / 2, p.height / 2);
    trunck.drawMe();
  }

  class Branch {
    level: number;
    index: number;
    x: number;
    y: number;
    endx: number;
    endy: number;
    strokeW: number;
    alph: number;
    len: number;
    lenChange: number;
    rot: number;
    rotChange : number;
    children : Branch[] = [];

    constructor(lev: number, ind: number, ex: number, why: number){
      this.level = lev;
      this.index = ind;

      this.strokeW = (1 / this.level) * 100;
      this.alph = 255 / this.level;
      this.len = (1 / this.level) * p.random(500);
      this.rot = p.random(360);
      this.lenChange = p.random(10) - 5;
      this.rotChange = p.random(10) - 5;

      this.updateMe(ex, why);

      if (this.level < maxlevels) {
        this.children.length = numChildren;
        for (let x = 0; x < numChildren; x++) {
          this.children[x] = new Branch(this.level + 1, x, this.endx, this.endy);
        }
      }
    }
    updateMe(ex: number, why: number): void {
      this.x = ex;
      this.y = why;

      this.rot += this.rotChange;
      if (this.rot > 360) {
        this.rot = 0;
      } else if (this.rot < 0) {
        this.rot = 360;
      }

      this.len -= this.lenChange;
      if (this.len < 0) {
        this.lenChange *= -1;
      } else if (this.len > 500) {
        this.lenChange *= -1;
      }

      const radian: number = p.radians(this.rot);
      this.endx = this.x + (this.len * p.cos(radian));
      this.endy = this.y + (this.len * p.sin(radian));

      for (let i = 0; i < this.children.length; i++) {
        this.children[i].updateMe(this.endx, this.endy);
      }
    }
    drawMe(): void {
      if(this.level > 1){
        p.strokeWeight(this.strokeW);
        p.stroke(0, this.alph);
        p.fill(255, this.alph);
        p.line(this.x, this.y, this.endx, this.endy);
        p.ellipse(this.x, this.y, this.len / 12, this.len / 12);
      }
      for (let i = 0; i < this.children.length; i++) {
        this.children[i].drawMe();
      }
    }
  }

}


new p5(sketch);
