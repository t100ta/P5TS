import p5 from "p5";

const sketch = (p: p5) => {
  const cellSize = 10;
  let numX: number, numY: number;

  class Cell {
    x:number
    y:number
    state: boolean;

    nextState: boolean;
    neighbours: Cell[];
    constructor(ex: number, why: number) {
      this.x = ex * cellSize;
      this.y = why * cellSize;
      if (p.random(2) > 1) {
        this.nextState = true;
      } else {
        this.nextState = false;
      }
      this.state = this.nextState;
      this.neighbours = [];
    }

    addNeighbour(cell: Cell): void {
      this.neighbours = p.append(this.neighbours, cell);
    }

    celcNextState(): void {
      // to come
    }

    drawMe(): void {
      this.state = this.nextState;
      p.stroke(0);
      if (this.state) {
        p.fill(0);
      } else {
        p.fill(255);
      }
      p.ellipse(this.x, this.y, cellSize, cellSize);
    }
  }

  let cellArray: Cell[][] | any = [];

  function restart(): void {
    // cellArray = [numX][numY];
    cellArray.length = numX;
    cellArray.forEach(element => {
      element = [numY];
    });

    for (let x = 0; x < numX; x++) {
      for (let y = 0; y < numY; y++) {
        const newCell = new Cell(x, y);
        cellArray[x][y] = newCell;
      }
    }

    for (let x = 0; x < numX; x++) {
      for (let y = 0; y < numY; y++) {
        let above: number = y - 1;
        let below: number = y + 1;
        let left : number = x - 1;
        let right: number = x + 1;

        if (above < 0) {
          above = numY - 1;
        }
        if (below === numY) {
          below = 0;
        }
        if (left < 0) {
          left = numX - 1;
        }
        if (right === numX) {
          right = 0;
        }

        cellArray[x][y].addNeighbour(cellArray[left][above]);
        cellArray[x][y].addNeighbour(cellArray[left][y]);
        cellArray[x][y].addNeighbour(cellArray[left][below]);
        cellArray[x][y].addNeighbour(cellArray[x][below]);
        cellArray[x][y].addNeighbour(cellArray[right][below]);
        cellArray[x][y].addNeighbour(cellArray[left][y]);
        cellArray[x][y].addNeighbour(cellArray[left][above]);
        cellArray[x][y].addNeighbour(cellArray[x][above]);
      }
    }
  }


  p.setup = () => {
    p.createCanvas(500, 300);
    numX = p.floor(p.width / cellSize);
    numY = p.floor(p.height / cellSize);
    restart();
  }


  
  p.draw = () => {
    p.background(200);

    for (let x = 0; x < numX; x++) {
      for (let y = 0; y < numY; y++) {
        cellArray[x][y].celcNextState();
      }
    }

    p.translate(cellSize / 2, cellSize / 2);

    for (let x = 0; x < numX; x++) {
      for (let y = 0; y < numY; y++) {
        cellArray[x][y].drawMe();
      }
    }
  }
  p.mousePressed = () => {
  }

  

}


new p5(sketch);
