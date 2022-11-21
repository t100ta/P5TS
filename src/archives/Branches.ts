import p5 from "p5";

const sketch = (p: p5) => {
  const numChildren = 3;
  const maxlevels = 3;
  let trunck: Branch;

  p.setup = () => {
    p.createCanvas(750, 500);
    p.background(255);
    p.noFill();
    p.smooth();
    newTree()
  }

  function newTree() : void {
    trunck = new Branch(1, 0, p.width/2, 50);
    trunck.drawMe();
  }
  
  p.draw = () => {
  }
  p.mousePressed = () => {
  }

  class Branch {
    level: number;
    index: number;
    x: number;
    y: number;
    endx: number;
    endy: number;
    children : Branch[] = [];

    constructor(lev: number, ind: number, ex: number, why: number){
      this.level = lev;
      this.index = ind;
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
      this.endx = this.x + (this.level * (p.random(100) - 50));
      this.endy = this.y + 50 + (this.level * p.random(50));
    }
    drawMe(): void {
      p.strokeWeight(maxlevels - this.level + 1);
      p.line(this.x, this.y, this.endx, this.endy);
      // p.ellipse(this.x, this.y, 5, 5);
      p.rect(this.x, this.y, 5, 5);

      for (let i = 0; i < this.children.length; i++) {
        this.children[i].drawMe();
      }
    }
  }

}


new p5(sketch);
