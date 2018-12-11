const utInput = ``;

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

const ut5 = (ipt => getMax3Grid(ipt))(18);
assert(ut5.x === 33);
assert(ut5.y === 45);
const ut6 = (ipt => getMax3Grid(ipt))(42);
assert(ut6.x === 21);
assert(ut6.y === 61);

function getMax3Grid(grid) {
  let x,
    y,
    maxGrid = 0;
  const gridSize = 300;
  const cells = new Array(gridSize);
  for (let i = 0; i < gridSize; i++) {
    cells[i] = new Array(gridSize);
  }
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const power = getcellPower({ x: i, y: j }, grid);
      cells[i][j] = { power, grid: 0 };
      if (i > 2 && j > 2) {
        const prevX = i - 3;
        const prevY = j - 3;
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
  return { x, y };
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

function getcellPower(point, grid) {
  const rackId = point.x + 10;
  let power = Math.floor((rackId * (rackId * point.y + grid)) / 100).toString();
  power = Number(power[power.length - 1]) - 5;
  return power;
}

let res = getMax3Grid(7857);
res;
