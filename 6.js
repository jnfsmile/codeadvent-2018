const utInput = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`
  .split("\n")
  .map(p => p.split(", ").map(Number));
const ut1 = ((a, b) => manhattanDistance(a, b))([0, 0], [1, 1]);
assert(ut1 === 2);
const ut2 = ((a, b) => manhattanDistance(a, b))([3, 4], [2, 10]);
assert(ut2 === 7);
const ut3 = (input => getSquare(input))(utInput);
assert(ut3.minX === 0);
assert(ut3.minY === 0);
assert(ut3.maxX === 9);
assert(ut3.maxY === 10);
const ut4 = ((input, square) => evalSquare(input, square))(
  utInput,
  getSquare(utInput)
);
assert(ut4.has("1,4") === false);
assert(ut4.get([1, 3].toString()).x === 1);
assert(ut4.get("2,2").y === 1);

const ut5 = (input => getMaxArea(input, 0))(utInput);
assert(ut5.d === 17);
assert(ut5.c === "5,5");

function getMaxArea(coords, border = 0) {
  const square = getSquare(coords);
  square.minX -= border;
  square.maxX += border;
  square.minY -= border;
  square.maxY += border;
  const mapped = evalSquare(coords, square);
  let filtered = new Set();

  let list = coords.slice();
  const areas = new Map();
  //remove infinite areas - anyone who got to the edge of the square
  for ([coord, p] of mapped) {
    const x = coord.split(",").map(Number)[0];
    const y = coord.split(",").map(Number)[1];
    if (
      x === square.minX ||
      x === square.maxX ||
      y === square.minY ||
      y === square.maxY
    ) {
      list = list.filter(d => d[0] !== p.x && d[1] !== p.y);
      filtered.add(p.x + "," + p.y);
    }
  }
  for ([coord, p] of mapped) {
    const key = p.x + "," + p.y;
    if (list.map(c => c.toString()).includes(key)) {
      if (!areas.has(key)) areas.set(key, 1);
      else areas.set(key, areas.get(key) + 1);
    }
  }
  let maxArea = { d: 0 };
  for ([c, d] of areas) {
    if (d > maxArea.d) maxArea = { c, d };
  }
  return maxArea;
}

function evalSquare(coords, square) {
  const map = new Map();
  for (let x = square.minX; x <= square.maxX; x++) {
    for (let y = square.minY; y <= square.maxY; y++) {
      let minDis = { min: Infinity };
      coords.forEach(c => {
        const min = manhattanDistance(c, [x, y]);
        if (min < minDis.min) minDis = { min, x: c[0], y: c[1] };
        else if (min === minDis.min)
          minDis = {
            min: min,
            old: [minDis.x, minDis.y, minDis.min],
            new: [c[0], c[1], min]
          };
      });
      if (minDis.x !== undefined) {
        map.set(x + "," + y, minDis);
      }
    }
  }
  return map;
}

function getSquare(coords) {
  const square = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity
  };
  coords.forEach(p => {
    if (p[0] < square.minX) square.minX = p[0];
    if (p[0] > square.maxX) square.maxX = p[0];
    if (p[1] < square.minY) square.minY = p[1];
    if (p[1] > square.maxY) square.maxY = p[1];
  });
  const border = 1;
  square.minX -= border;
  square.maxX += border;
  square.minY -= border;
  square.maxY += border;
  return square;
}

function manhattanDistance(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const input = `118, 274
102, 101
216, 203
208, 251
309, 68
330, 93
91, 179
298, 278
201, 99
280, 272
141, 312
324, 290
41, 65
305, 311
198, 68
231, 237
164, 224
103, 189
216, 207
164, 290
151, 91
166, 250
129, 149
47, 231
249, 100
262, 175
299, 237
62, 288
228, 219
224, 76
310, 173
80, 46
312, 65
183, 158
272, 249
57, 141
331, 191
163, 359
271, 210
142, 137
349, 123
55, 268
160, 82
180, 70
231, 243
133, 353
246, 315
164, 206
229, 97
268, 94`
  .split("\n")
  .map(p => p.split(", ").map(Number));
let res = getMaxArea(input, 0);
res; //

/**********
 * part 2
 */

let ut6 = ((input, sq, min) => evalSafeSquare(input, sq, min))(
  utInput,
  getSquare(utInput),
  32
);
assert(ut6.size === 16)

function evalSafeSquare(coords, square, min) {
  const map = new Map();
  for (let x = square.minX; x <= square.maxX; x++) {
    for (let y = square.minY; y <= square.maxY; y++) {
      let totDis = { d: 0, x, y };
      coords.forEach(c => {
        const d = manhattanDistance(c, [x, y]);
        totDis.d += d;
      });
      if (totDis.d < min) {
        map.set(x + "," + y, totDis);
      }
    }
  }
  return map;
}

let res2 = evalSafeSquare(input, getSquare(input), 10000)
console.log(res2.size)