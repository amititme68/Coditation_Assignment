// control buttons
const ON = document.querySelector(".ON");
const OFF = document.querySelector(".OFF");
const RESET = document.querySelector(".RESET");

// ON
ON.addEventListener("click", () => {
  stopper = 0;
  requestAnimationFrame(updateGrid);
});

// OFF
OFF.addEventListener("click", () => {
  stopper = 1;
});

// Reset Here
RESET.addEventListener("click", () => {
  stopper = 1;
  grid = createGrid();
  render(grid);
});

// canvas
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// global stopper
let stopper = 0;

// canvas details

const resolution = 20;
canvas.width = 500;
canvas.height = 400;

// row and column
const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

// function to build grid
function createGrid() {
  return new Array(COLS)
    .fill(null)
    .map(() =>
      new Array(ROWS).fill(null).map(() => Math.floor(Math.random() * 2))
    );
}

// render grid to window
let grid = createGrid();

function updateGrid() {
  if (stopper === 0) {
    grid = nextGen(grid);
    render(grid);
    requestAnimationFrame(updateGrid);
  }
}

// find next gen cells
function nextGen(grid) {
  const nextGen = grid.map((arr) => [...arr]);

  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];
      let numNeighbour = 0;
      for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
          if (x === 0 && y === 0) {
            continue;
          }
          const x_cell = col + x;
          const y_cell = row + y;
          if (x_cell >= 0 && y_cell > 0 && x_cell < COLS && y_cell < ROWS) {
            let currentNeighbour = grid[col + x][row + y];
            numNeighbour += currentNeighbour;
          }
        }
      }

      // rules of life
      if (cell === 1 && numNeighbour < 2) {
        nextGen[col][row] = 0;
      } else if (cell === 1 && numNeighbour > 3) {
        nextGen[col][row] = 0;
      } else if (cell === 0 && numNeighbour === 3) {
        nextGen[col][row] = 1;
      }
    }
  }
  return nextGen;
}

function render(grid) {
  for (let col = 0; col < grid.length; col++) {
    for (let row = 0; row < grid[col].length; row++) {
      const cell = grid[col][row];

      context.beginPath();
      context.rect(col * resolution, row * resolution, resolution, resolution);
      context.fillStyle = cell ? "black" : "white";
      context.fill();
      context.stroke();
    }
  }
}
