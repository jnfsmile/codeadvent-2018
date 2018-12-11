const ut1 = ((ipt, grid) => getcellPower(ipt, grid))({ x: 3, y: 5 }, 8);
assert(ut1 === 4);
const ut2 = ((ipt, grid) => getcellPower(ipt, grid))({ x: 122, y: 79 }, 57);
assert(ut2 === -5);
const ut3 = ((ipt, grid) => getcellPower(ipt, grid))({ x: 217, y: 196 }, 39);
assert(ut3 === 0);
const ut4 = ((ipt, grid) => getcellPower(ipt, grid))({ x: 101, y: 153 }, 71);
assert(ut4 === 4);

const ut4_1 = (ipt => getGridPower(ipt))([[4, 4, 4], [3, 3, 4], [1, 2, 4]]);
assert(ut4_1 === 29);
const ut4_2 = (ipt => getGridPower(ipt))([[4, 3, 3], [3, 3, 4], [3, 3, 4]]);
assert(ut4_2 === 30);

const ut5 = (ipt => getMaxGrid(ipt))(18);
assert(ut5.x === 33);
assert(ut5.y === 45);
const ut6 = (ipt => getMaxGrid(ipt))(42);
assert(ut6.x === 21);
assert(ut6.y === 61);


function getMaxGrid(grid, size = 3, cells = []) {
  let x, y, maxGrid = -Infinity;
  const gridSize = 300;
  if (cells.length === 0) {
    cells = new Array(gridSize);
    for (let i = 0; i < gridSize; i++) {
      cells[i] = new Array(gridSize);
    }
  }
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (cells[i][j] === undefined) {
                const power = getCellPower({ x: i, y: j }, grid);
                cells[i][j] = { power, grid: 0 };
            }
            if (i >= size && j >= size) {
                const prevX = i - size;
                const prevY = j - size;
                const innerGrid = cells
                    .slice(prevX, i)
                    .map(x => x.slice(prevY, j).map(c => c.power));

                cells[prevX][prevY].grid = getGridPower(innerGrid);
                if (cells[prevX][prevY].grid > maxGrid) {
                    maxGrid = cells[prevX][prevY].grid;
                    x = prevX;
                    y = prevY;
                }
            }
        }
    }
  return { x, y, cells };
}

function getGridPower(grid) {
  let p = 0;
  grid.forEach(x => {
    x.forEach(y => {
      p += y;
    });
  });
  return p;
}

function getCellPower(point, grid) {
  const rackId = point.x + 10;
  let power = Math.floor((rackId * (rackId * point.y + grid)) / 100).toString();
  power = Number(power[power.length - 1]) - 5;
  return power;
}

let { x, y, cells } = getMaxGrid(7857);
console.log(x,y);

/*****
 * part 2
 */
const ut7 = (ipt => getMaxGrid(ipt, 16))(18);
assert(ut7.x === 90);
assert(ut7.y === 269);

const ut8 = (ipt => getMaxGrid(ipt, 12))(42);
assert(ut8.x === 232);
assert(ut8.y === 251);

const ut9 = (ipt => getRealMaxGrid(ipt,17))(18);
assert(ut9.x === 90);
assert(ut9.y === 269);
assert(ut9.size === 16);
const ut10 = (ipt => getRealMaxGrid(ipt,17))(42);
assert(ut10.x === 232);
assert(ut10.y === 251);
assert(ut10.size === 12);

function getRealMaxGrid(grid, totalSize = 300) {
  let x,
    y,
    cx,
    cy,
    size,
    max = 0;
  let cells = [];
  for (let i = 1; i <= totalSize; i++) {
    let mg = getMaxGrid(grid, i, cells);
    cx = mg.x;
    cy = mg.y;
    cells = mg.cells;
    let lastMaxGrid = cells[cx][cy].grid;
    if (lastMaxGrid > max) {
      max = cells[cx][cy].grid;
      x = cx;
      y = cy;
      size = i;
    }
    console.log(x, y, size);
  }
  return { x, y, size };
}
let res2 = getRealMaxGrid(7857);
console.log(res2);
