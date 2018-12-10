/* const ut1 = ((arr, cur, input) => insert(arr, cur, input))([], 0, 0);
assert(ut1.arr[0] === 0);
const ut2 = ((arr, cur, input) => insert(arr, cur, input))([0], 0, 1);
assert(ut2.arr[1] === 1);
const ut3 = ((arr, cur, input) => insert(arr, cur, input))([0, 1], 1, 2);
assert(ut3.arr[2] === 1);
assert(ut3.arr[1] === 2);
assert(ut3.cur === 1);
const ut4 = ((arr, cur, input) => insert(arr, cur, input))(
  [0, 4, 2, 5, 1, 3],
  3,
  6
);
assert(ut4.arr[5] === 6);
assert(ut4.arr[6] === 3);
assert(ut4.cur === 5);
const ut5 = ((arr, cur, input) => insert(arr, cur, input))(
  [0, 8, 4, 9, 2, 5, 1, 6, 3, 7],
  3,
  10
);
assert(ut5.arr[5] === 10);
assert(ut5.arr[7] === 1);
const ut6 = ((arr, cur, input) => insert(arr, cur, input))(
  [0, 4, 2, 5, 1, 6, 3, 7],
  7,
  8
);
assert(ut6.arr[1] === 8);
assert(ut6.arr[6] === 6);
const ut7 = ((arr, cur) => remove(arr, cur))(
  [
    0,
    16,
    8,
    17,
    4,
    18,
    9,
    19,
    2,
    20,
    10,
    21,
    5,
    22,
    11,
    1,
    12,
    6,
    13,
    3,
    14,
    7,
    15
  ],
  13
);
assert(ut7.points === 9);
assert(ut7.arr[6] === 19);
assert(ut7.cur === 6);
const ut8 = ((arr, cur) => remove(arr, cur))(
  [
    0,
    16,
    8,
    17,
    4,
    18,
    9,
    19,
    2,
    20,
    10,
    21,
    5,
    22,
    11,
    1,
    12,
    6,
    13,
    3,
    14,
    7,
    15
  ],
  3
);
assert(ut8.points === 3);
assert(ut8.arr[20] === 7);
assert(ut8.cur === 19);
const ut9 = ((p, g) => game(p, g))(9, 25);
assert(ut9[4] === 32);
assert(Math.max(...ut9) === 32);
const ut10 = ((p, g) => game(p, g))(10, 1618);
assert(Math.max(...ut10) === 8317);
const ut11 = ((p, g) => game(p, g))(13, 7999);
assert(Math.max(...ut11) === 146373);
 */
function game(players, last) {
  let arr = [0];
  let cur = 0;
  const score = Array(players).fill(0);
  for (let i = 1; i <= last; i++) {
    if (i % 23 !== 0) {
      ({ arr, cur } = insert(arr, cur, i));
    } else {
      ({ arr, cur, points } = remove(arr, cur));
      score[(i - 1) % players] += points + i;
    }
  }
  return score;
}

function remove(arr, cur) {
  let newCur = (cur - 7) % arr.length;
  let points = arr.splice(newCur, 1)[0];
  return { arr, cur: newCur >= 0 ? newCur : arr.length + newCur + 1, points };
}

function insert(arr, cur, mar) {
  let newCur = 0;
  if (arr.length < 2 || cur === arr.length - 2) {
    arr.push(mar);
    newCur = arr.length - 1;
  } else {
    newCur = (cur + 2) % arr.length;
    arr.splice(newCur, 0, mar);
  }
  return { arr, cur: newCur };
}

let res = game(429, 70901);
console.log(Math.max(...res));
let res2 = game(429, 7090100);
console.log(Math.max(...res2));
