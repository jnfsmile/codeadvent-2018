const utInput = [3, 7];
const utInput2 = [0, 1];
let ut1 = ((state, pos) => runTestMove(state, pos))(utInput, utInput2);
assert(ut1.state.length === 4);
assert(ut1.pos[0] === 0);
let ut2 = ((state, pos) => runTestMove(state, pos))([3, 7, 1, 0], [0, 1]);
assert(ut2.state.length === 6);
assert(ut2.pos[0] === 4);
let ut3 = ((state, pos) => runTestMove(state, pos))([3, 7, 1, 0, 1, 0], [4, 3]);
assert(ut3.state.length === 7);
assert(ut3.pos[0] === 6);

let ut4 = ((state, pos, steps) => runTest(state, pos, steps))(
  utInput,
  utInput2,
  9
);
assert(ut4.state.length === 20);
assert(ut4.pos[0] === 8);
assert(ut4.score.join("") === "5158916779");
let ut5 = ((state, pos, steps) => runTest(state, pos, steps))(
  utInput,
  utInput2,
  5
);
assert(ut5.score.join("") === "0124515891");
let ut6 = ((state, pos, steps) => runTest(state, pos, steps))(
  utInput,
  utInput2,
  18
);
assert(ut6.score.join("") === "9251071085");
let ut7 = ((state, pos, steps) => runTest(state, pos, steps))(
  utInput,
  utInput2,
  2018
);
assert(ut7.score.join("") === "5941429882");

function runTest(state, pos, steps) {
  let curState = state;
  let curPos = pos;
  let posCache = new Set();
  let stepCount = 0;
  let stepCounter = 0;
  while (curState.length < steps + 10 + 1) {
    let tmp = runTestMove(curState, curPos);
    curState = tmp.state;
    curPos = tmp.pos;
    stepCounter += stepCount;
  }
  console.log(posCache, curPos, stepCounter);
  let score = curState.slice(steps, steps + 10);

  return { state: curState, pos: curPos, score };
}

function runTestMove(state, pos) {
  let newState = state.slice();
  let newRecipe = 0;
  let newPos = [];
  pos.forEach(element => {
    newRecipe += state[element];
  });
  newState = newState.concat(
    newRecipe
      .toString()
      .split("")
      .map(Number)
  );
  pos.forEach(element => {
    let step = 1 + state[element];
    let p = (element + step) % newState.length;
    newPos.push(p);
  });
  return { state: newState, pos: newPos };
}

let res = ((state, pos, steps) => runTest(state, pos, steps))(
  utInput,
  utInput2,
  652601
);
console.log(res.score.join(""));
