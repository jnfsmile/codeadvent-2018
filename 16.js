const ut1 = ((inst, reg) => runInst(inst, reg))("addi 1 2 3", [1, 2, 4, 4]);
assert(ut1[3] === 4);
const ut2 = ((inst, reg) => runInst(inst, reg))("addr 1 2 3", [1, 2, 4, 4]);
assert(ut2[3] === 6);
const ut3 = ((inst, reg) => runInst(inst, reg))("muli 1 2 3", [1, 2, 4, 4]);
assert(ut3[3] === 4);
const ut4 = ((inst, reg) => runInst(inst, reg))("mulr 1 2 3", [1, 2, 4, 4]);
assert(ut4[3] === 8);
const ut5 = ((inst, reg) => runInst(inst, reg))("bani 1 2 3", [1, 2, 4, 4]);
assert(ut5[3] === 2);
const ut6 = ((inst, reg) => runInst(inst, reg))("banr 1 2 3", [1, 2, 4, 4]);
assert(ut6[3] === 0);
const ut7 = ((inst, reg) => runInst(inst, reg))("bori 1 2 3", [1, 4, 4, 4]);
assert(ut7[3] === 6);
const ut8 = ((inst, reg) => runInst(inst, reg))("borr 1 2 3", [1, 2, 4, 4]);
assert(ut8[3] === 6);
const ut9 = ((inst, reg) => runInst(inst, reg))("seti 1 2 3", [1, 2, 4, 4]);
assert(ut9[3] === 1);
const ut10 = ((inst, reg) => runInst(inst, reg))("setr 1 2 3", [1, 2, 4, 4]);
assert(ut10[3] === 2);
const ut11 = ((inst, reg) => runInst(inst, reg))("gtir 1 2 3", [1, 2, 4, 4]);
assert(ut11[3] === 0);
const ut12 = ((inst, reg) => runInst(inst, reg))("gtri 1 2 3", [1, 2, 4, 4]);
assert(ut12[3] === 0);
const ut13 = ((inst, reg) => runInst(inst, reg))("gtrr 1 2 3", [1, 5, 1, 4]);
assert(ut13[3] === 1);
const ut14 = ((inst, reg) => runInst(inst, reg))("eqir 1 2 3", [1, 2, 4, 4]);
assert(ut14[3] === 0);
const ut15 = ((inst, reg) => runInst(inst, reg))("eqri 1 2 3", [1, 2, 4, 4]);
assert(ut15[3] === 1);
const ut16 = ((inst, reg) => runInst(inst, reg))("eqrr 1 2 3", [1, 2, 4, 4]);
assert(ut16[3] === 0);

const utInput = parseInput(`Before: [3, 2, 1, 1]
9 2 1 2
After:  [3, 2, 2, 1]`);
const opCodes = [
  "addi",
  "addr",
  "muli",
  "mulr",
  "bani",
  "banr",
  "bori",
  "borr",
  "seti",
  "setr",
  "gtir",
  "gtri",
  "gtrr",
  "eqir",
  "eqri",
  "eqrr"
];
function parseInput(ipt) {
  let s1 = ipt.split("\n\n");
  let data = s1.map(i => i.split("\n"));
  data = data
    .map(d => d.map(i => i.replace(/\w+: /, "").replace(/ ?[\]\[]/g, "")))
    .map(d => d.map(i => (i.includes(",") ? i.split(", ").map(Number) : i)));
  let res = data.map(d => {
    return { regBefore: d[0], regAfter: d[2], instruction: d[1] };
  });
  return res;
}
const ut_1 = (ipt => checkInst(ipt))(utInput[0]);
assert(ut_1.length === 3);

function checkInst(input) {
  let numOptions = [];
  opCodes.forEach(op => {
    let inst = input.instruction.split(" ");
    inst.splice(0, 1, op);
    inst = inst.join(" ")
    let res = runInst(inst, input.regBefore);
    if (JSON.stringify(res) === JSON.stringify(input.regAfter)) {
      numOptions.push(op);
    }
  });
  return numOptions;
}

function runInst(instruction, registery) {
  let instArr = instruction.split(" ");
  let res = null;
  switch (instArr[0]) {
    case "addi":
      res = Number(registery[Number(instArr[1])]) + Number(instArr[2]);
      break;
    case "addr":
      res =
        Number(registery[Number(instArr[1])]) +
        Number(registery[Number(instArr[2])]);
      break;
    case "muli":
      res = Number(registery[Number(instArr[1])]) * Number(instArr[2]);
      break;
    case "mulr":
      res =
        Number(registery[Number(instArr[1])]) *
        Number(registery[Number(instArr[2])]);
      break;
    case "bani":
      res = Number(registery[Number(instArr[1])]) & Number(instArr[2]);
      break;
    case "banr":
      res =
        Number(registery[Number(instArr[1])]) &
        Number(registery[Number(instArr[2])]);
      break;
    case "bori":
      res = Number(registery[Number(instArr[1])]) | Number(instArr[2]);
      break;
    case "borr":
      res =
        Number(registery[Number(instArr[1])]) |
        Number(registery[Number(instArr[2])]);
      break;
    case "seti":
      res = Number(instArr[1]);
      break;
    case "setr":
      res = Number(registery[Number(instArr[1])]);
      break;
    case "gtir":
      res = Number(instArr[1]) > Number(registery[Number(instArr[2])]) ? 1 : 0;
      break;
    case "gtri":
      res = Number(registery[Number(instArr[1])]) > Number(instArr[2]) ? 1 : 0;
      break;
    case "gtrr":
      res =
        Number(registery[Number(instArr[1])]) >
        Number(registery[Number(instArr[2])])
          ? 1
          : 0;
      break;
    case "eqir":
      res =
        Number(instArr[1]) === Number(registery[Number(instArr[2])]) ? 1 : 0;
      break;
    case "eqri":
      res =
        Number(registery[Number(instArr[1])]) === Number(instArr[2]) ? 1 : 0;
      break;
    case "eqrr":
      res =
        Number(registery[Number(instArr[1])]) ===
        Number(registery[Number(instArr[2])])
          ? 1
          : 0;
      break;
  }
  let resReg = registery.slice();
  resReg[Number(instArr[3])] = res;
  return resReg;
}

const input = parseInput(`Before: [3, 1, 0, 1]
9 3 3 2
After:  [3, 1, 0, 1]

Before: [1, 0, 3, 1]
4 2 3 2
After:  [1, 0, 0, 1]

Before: [3, 3, 3, 3]
4 3 0 0
After:  [1, 3, 3, 3]

Before: [1, 2, 2, 2]
11 2 3 2
After:  [1, 2, 2, 2]

Before: [2, 1, 0, 0]
13 0 3 3
After:  [2, 1, 0, 1]

Before: [3, 1, 2, 3]
10 1 3 0
After:  [0, 1, 2, 3]

Before: [2, 1, 1, 1]
8 3 1 1
After:  [2, 0, 1, 1]

Before: [3, 0, 0, 3]
4 3 0 1
After:  [3, 1, 0, 3]

Before: [2, 1, 2, 0]
13 0 3 1
After:  [2, 1, 2, 0]

Before: [0, 3, 0, 0]
0 0 1 1
After:  [0, 0, 0, 0]

Before: [3, 1, 2, 2]
15 1 3 1
After:  [3, 0, 2, 2]

Before: [2, 1, 1, 1]
2 2 1 2
After:  [2, 1, 2, 1]

Before: [3, 2, 2, 3]
10 1 3 2
After:  [3, 2, 0, 3]

Before: [0, 2, 2, 3]
10 2 3 3
After:  [0, 2, 2, 0]

Before: [0, 2, 3, 1]
7 0 0 1
After:  [0, 0, 3, 1]

Before: [0, 2, 2, 1]
6 3 2 3
After:  [0, 2, 2, 1]

Before: [3, 2, 2, 1]
6 3 2 1
After:  [3, 1, 2, 1]

Before: [0, 1, 3, 0]
12 1 3 3
After:  [0, 1, 3, 1]

Before: [2, 1, 3, 1]
8 2 0 1
After:  [2, 1, 3, 1]

Before: [1, 1, 2, 3]
3 0 2 1
After:  [1, 0, 2, 3]

Before: [2, 0, 3, 0]
8 2 0 2
After:  [2, 0, 1, 0]

Before: [1, 3, 2, 2]
11 2 3 0
After:  [2, 3, 2, 2]

Before: [1, 2, 0, 1]
9 3 3 0
After:  [0, 2, 0, 1]

Before: [3, 1, 0, 3]
4 3 0 3
After:  [3, 1, 0, 1]

Before: [2, 2, 3, 3]
10 1 3 0
After:  [0, 2, 3, 3]

Before: [3, 1, 3, 3]
10 1 3 3
After:  [3, 1, 3, 0]

Before: [2, 1, 0, 3]
10 1 3 1
After:  [2, 0, 0, 3]

Before: [1, 2, 2, 1]
3 0 2 3
After:  [1, 2, 2, 0]

Before: [1, 2, 2, 3]
3 0 2 0
After:  [0, 2, 2, 3]

Before: [0, 1, 2, 1]
6 3 2 0
After:  [1, 1, 2, 1]

Before: [1, 0, 3, 0]
5 3 2 2
After:  [1, 0, 1, 0]

Before: [2, 0, 3, 2]
8 0 1 3
After:  [2, 0, 3, 1]

Before: [1, 1, 2, 2]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [2, 1, 3, 0]
13 0 3 2
After:  [2, 1, 1, 0]

Before: [2, 3, 2, 2]
9 3 3 2
After:  [2, 3, 0, 2]

Before: [0, 1, 2, 2]
11 2 3 2
After:  [0, 1, 2, 2]

Before: [2, 0, 2, 0]
13 0 3 3
After:  [2, 0, 2, 1]

Before: [1, 3, 2, 1]
3 0 2 3
After:  [1, 3, 2, 0]

Before: [0, 1, 1, 2]
2 2 1 2
After:  [0, 1, 2, 2]

Before: [3, 0, 2, 2]
8 3 2 3
After:  [3, 0, 2, 0]

Before: [2, 1, 2, 2]
15 1 3 2
After:  [2, 1, 0, 2]

Before: [1, 0, 3, 2]
9 3 3 2
After:  [1, 0, 0, 2]

Before: [3, 1, 1, 1]
14 1 3 0
After:  [1, 1, 1, 1]

Before: [0, 1, 0, 2]
0 0 2 2
After:  [0, 1, 0, 2]

Before: [3, 1, 1, 2]
15 1 3 1
After:  [3, 0, 1, 2]

Before: [3, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [3, 3, 2, 2]
9 3 3 1
After:  [3, 0, 2, 2]

Before: [1, 1, 2, 0]
1 1 2 0
After:  [0, 1, 2, 0]

Before: [0, 2, 2, 2]
11 2 3 0
After:  [2, 2, 2, 2]

Before: [1, 2, 2, 0]
3 0 2 2
After:  [1, 2, 0, 0]

Before: [2, 0, 1, 3]
8 0 1 1
After:  [2, 1, 1, 3]

Before: [2, 2, 2, 0]
4 2 0 3
After:  [2, 2, 2, 1]

Before: [3, 3, 1, 1]
9 2 3 1
After:  [3, 0, 1, 1]

Before: [1, 0, 3, 0]
5 3 2 1
After:  [1, 1, 3, 0]

Before: [0, 1, 3, 2]
15 1 3 0
After:  [0, 1, 3, 2]

Before: [2, 2, 0, 3]
10 1 3 0
After:  [0, 2, 0, 3]

Before: [3, 1, 2, 2]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [1, 3, 2, 2]
11 2 3 2
After:  [1, 3, 2, 2]

Before: [3, 0, 3, 0]
5 3 2 2
After:  [3, 0, 1, 0]

Before: [1, 1, 0, 0]
14 0 2 1
After:  [1, 0, 0, 0]

Before: [0, 0, 2, 1]
0 0 1 3
After:  [0, 0, 2, 0]

Before: [2, 1, 2, 0]
1 1 2 0
After:  [0, 1, 2, 0]

Before: [1, 1, 2, 3]
3 0 2 3
After:  [1, 1, 2, 0]

Before: [3, 1, 2, 2]
1 1 2 2
After:  [3, 1, 0, 2]

Before: [2, 2, 3, 2]
8 2 0 2
After:  [2, 2, 1, 2]

Before: [3, 3, 0, 0]
8 0 2 0
After:  [1, 3, 0, 0]

Before: [0, 2, 2, 2]
0 0 3 2
After:  [0, 2, 0, 2]

Before: [1, 3, 0, 1]
9 3 3 0
After:  [0, 3, 0, 1]

Before: [3, 3, 2, 2]
11 2 3 0
After:  [2, 3, 2, 2]

Before: [3, 1, 2, 2]
11 2 3 2
After:  [3, 1, 2, 2]

Before: [3, 2, 3, 0]
5 3 2 3
After:  [3, 2, 3, 1]

Before: [1, 1, 2, 1]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [0, 2, 1, 3]
10 1 3 1
After:  [0, 0, 1, 3]

Before: [1, 1, 2, 1]
3 0 2 1
After:  [1, 0, 2, 1]

Before: [1, 0, 3, 0]
5 3 2 3
After:  [1, 0, 3, 1]

Before: [3, 0, 1, 3]
10 2 3 1
After:  [3, 0, 1, 3]

Before: [1, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [0, 0, 3, 1]
4 2 3 0
After:  [0, 0, 3, 1]

Before: [0, 2, 1, 1]
7 0 0 0
After:  [0, 2, 1, 1]

Before: [0, 3, 0, 1]
9 3 3 2
After:  [0, 3, 0, 1]

Before: [1, 2, 0, 1]
14 0 2 0
After:  [0, 2, 0, 1]

Before: [1, 1, 1, 1]
2 2 1 2
After:  [1, 1, 2, 1]

Before: [2, 2, 2, 0]
4 2 1 1
After:  [2, 1, 2, 0]

Before: [2, 2, 2, 2]
11 2 3 2
After:  [2, 2, 2, 2]

Before: [1, 2, 1, 3]
10 2 3 1
After:  [1, 0, 1, 3]

Before: [3, 1, 1, 0]
2 2 1 0
After:  [2, 1, 1, 0]

Before: [0, 3, 3, 0]
7 0 0 1
After:  [0, 0, 3, 0]

Before: [3, 3, 2, 2]
8 3 2 0
After:  [0, 3, 2, 2]

Before: [0, 0, 3, 0]
5 3 2 2
After:  [0, 0, 1, 0]

Before: [3, 1, 0, 2]
15 1 3 2
After:  [3, 1, 0, 2]

Before: [2, 3, 3, 1]
4 2 3 1
After:  [2, 0, 3, 1]

Before: [2, 0, 0, 0]
13 0 3 2
After:  [2, 0, 1, 0]

Before: [1, 1, 2, 2]
15 1 3 0
After:  [0, 1, 2, 2]

Before: [0, 1, 3, 3]
4 3 2 1
After:  [0, 1, 3, 3]

Before: [0, 0, 2, 3]
10 2 3 2
After:  [0, 0, 0, 3]

Before: [0, 1, 0, 3]
7 0 0 2
After:  [0, 1, 0, 3]

Before: [1, 0, 1, 3]
10 2 3 2
After:  [1, 0, 0, 3]

Before: [0, 0, 1, 1]
7 0 0 1
After:  [0, 0, 1, 1]

Before: [3, 1, 3, 0]
12 1 3 1
After:  [3, 1, 3, 0]

Before: [0, 3, 2, 1]
6 3 2 3
After:  [0, 3, 2, 1]

Before: [2, 1, 3, 0]
13 0 3 3
After:  [2, 1, 3, 1]

Before: [2, 1, 2, 3]
1 1 2 2
After:  [2, 1, 0, 3]

Before: [1, 1, 0, 0]
12 1 3 0
After:  [1, 1, 0, 0]

Before: [2, 1, 2, 2]
1 1 2 2
After:  [2, 1, 0, 2]

Before: [2, 0, 2, 0]
13 0 3 2
After:  [2, 0, 1, 0]

Before: [2, 1, 3, 1]
8 2 0 0
After:  [1, 1, 3, 1]

Before: [0, 0, 2, 2]
11 2 3 0
After:  [2, 0, 2, 2]

Before: [1, 1, 3, 2]
15 1 3 1
After:  [1, 0, 3, 2]

Before: [0, 1, 2, 2]
1 1 2 1
After:  [0, 0, 2, 2]

Before: [0, 1, 1, 2]
15 1 3 3
After:  [0, 1, 1, 0]

Before: [1, 1, 1, 0]
12 1 3 2
After:  [1, 1, 1, 0]

Before: [3, 1, 0, 1]
14 1 3 3
After:  [3, 1, 0, 1]

Before: [3, 1, 0, 1]
8 3 1 2
After:  [3, 1, 0, 1]

Before: [1, 3, 2, 1]
3 0 2 0
After:  [0, 3, 2, 1]

Before: [0, 1, 2, 1]
6 3 2 1
After:  [0, 1, 2, 1]

Before: [2, 1, 1, 0]
2 2 1 1
After:  [2, 2, 1, 0]

Before: [0, 1, 2, 1]
1 1 2 1
After:  [0, 0, 2, 1]

Before: [1, 1, 2, 2]
15 1 3 2
After:  [1, 1, 0, 2]

Before: [2, 1, 1, 0]
2 2 1 0
After:  [2, 1, 1, 0]

Before: [1, 0, 2, 1]
6 3 2 1
After:  [1, 1, 2, 1]

Before: [0, 2, 1, 0]
0 0 2 3
After:  [0, 2, 1, 0]

Before: [1, 3, 2, 3]
3 0 2 2
After:  [1, 3, 0, 3]

Before: [2, 1, 2, 2]
15 1 3 3
After:  [2, 1, 2, 0]

Before: [1, 1, 3, 1]
14 1 3 3
After:  [1, 1, 3, 1]

Before: [3, 1, 1, 2]
2 2 1 0
After:  [2, 1, 1, 2]

Before: [0, 1, 2, 3]
1 1 2 2
After:  [0, 1, 0, 3]

Before: [2, 1, 0, 0]
12 1 3 1
After:  [2, 1, 0, 0]

Before: [1, 1, 2, 0]
3 0 2 1
After:  [1, 0, 2, 0]

Before: [1, 3, 3, 0]
5 3 2 0
After:  [1, 3, 3, 0]

Before: [3, 1, 2, 1]
6 3 2 1
After:  [3, 1, 2, 1]

Before: [1, 1, 2, 2]
3 0 2 2
After:  [1, 1, 0, 2]

Before: [3, 1, 0, 0]
8 0 2 1
After:  [3, 1, 0, 0]

Before: [1, 0, 2, 2]
11 2 3 0
After:  [2, 0, 2, 2]

Before: [0, 1, 3, 2]
7 0 0 3
After:  [0, 1, 3, 0]

Before: [0, 1, 1, 1]
2 2 1 1
After:  [0, 2, 1, 1]

Before: [0, 2, 0, 1]
0 0 2 3
After:  [0, 2, 0, 0]

Before: [0, 1, 2, 2]
15 1 3 3
After:  [0, 1, 2, 0]

Before: [0, 0, 3, 2]
0 0 3 2
After:  [0, 0, 0, 2]

Before: [1, 2, 0, 3]
14 0 2 2
After:  [1, 2, 0, 3]

Before: [2, 1, 2, 0]
12 1 3 2
After:  [2, 1, 1, 0]

Before: [0, 3, 0, 2]
5 2 3 1
After:  [0, 1, 0, 2]

Before: [2, 1, 1, 1]
14 1 3 0
After:  [1, 1, 1, 1]

Before: [0, 3, 3, 1]
0 0 3 3
After:  [0, 3, 3, 0]

Before: [2, 1, 2, 1]
14 1 3 1
After:  [2, 1, 2, 1]

Before: [0, 3, 3, 0]
7 0 0 0
After:  [0, 3, 3, 0]

Before: [0, 0, 0, 2]
7 0 0 3
After:  [0, 0, 0, 0]

Before: [1, 0, 2, 1]
3 0 2 1
After:  [1, 0, 2, 1]

Before: [2, 0, 2, 3]
4 2 0 1
After:  [2, 1, 2, 3]

Before: [2, 2, 1, 1]
9 2 3 1
After:  [2, 0, 1, 1]

Before: [2, 0, 1, 0]
13 0 3 2
After:  [2, 0, 1, 0]

Before: [1, 2, 2, 3]
10 2 3 0
After:  [0, 2, 2, 3]

Before: [0, 2, 3, 3]
0 0 3 2
After:  [0, 2, 0, 3]

Before: [3, 2, 2, 1]
6 3 2 2
After:  [3, 2, 1, 1]

Before: [0, 1, 2, 1]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [1, 1, 1, 0]
2 2 1 1
After:  [1, 2, 1, 0]

Before: [1, 1, 1, 3]
2 2 1 0
After:  [2, 1, 1, 3]

Before: [2, 1, 3, 0]
13 0 3 0
After:  [1, 1, 3, 0]

Before: [1, 0, 0, 3]
14 0 2 0
After:  [0, 0, 0, 3]

Before: [2, 2, 0, 0]
13 0 3 1
After:  [2, 1, 0, 0]

Before: [1, 3, 2, 1]
3 0 2 2
After:  [1, 3, 0, 1]

Before: [2, 0, 1, 3]
8 0 1 0
After:  [1, 0, 1, 3]

Before: [0, 0, 2, 1]
6 3 2 1
After:  [0, 1, 2, 1]

Before: [1, 1, 2, 1]
8 3 1 1
After:  [1, 0, 2, 1]

Before: [1, 1, 3, 2]
15 1 3 0
After:  [0, 1, 3, 2]

Before: [3, 1, 1, 3]
10 2 3 2
After:  [3, 1, 0, 3]

Before: [3, 3, 2, 1]
6 3 2 2
After:  [3, 3, 1, 1]

Before: [0, 0, 1, 3]
10 2 3 0
After:  [0, 0, 1, 3]

Before: [3, 0, 3, 0]
5 3 2 0
After:  [1, 0, 3, 0]

Before: [3, 2, 0, 3]
10 1 3 3
After:  [3, 2, 0, 0]

Before: [3, 2, 0, 1]
9 3 3 1
After:  [3, 0, 0, 1]

Before: [2, 1, 3, 3]
10 1 3 0
After:  [0, 1, 3, 3]

Before: [0, 2, 1, 1]
0 0 3 2
After:  [0, 2, 0, 1]

Before: [0, 1, 0, 0]
7 0 0 2
After:  [0, 1, 0, 0]

Before: [3, 1, 2, 0]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [0, 2, 2, 1]
6 3 2 0
After:  [1, 2, 2, 1]

Before: [3, 3, 3, 1]
4 2 3 3
After:  [3, 3, 3, 0]

Before: [1, 3, 2, 2]
11 2 3 1
After:  [1, 2, 2, 2]

Before: [2, 2, 1, 0]
13 0 3 2
After:  [2, 2, 1, 0]

Before: [3, 2, 2, 1]
6 3 2 3
After:  [3, 2, 2, 1]

Before: [1, 3, 2, 2]
11 2 3 3
After:  [1, 3, 2, 2]

Before: [1, 3, 3, 0]
5 3 2 3
After:  [1, 3, 3, 1]

Before: [2, 1, 2, 0]
12 1 3 0
After:  [1, 1, 2, 0]

Before: [0, 1, 1, 2]
2 2 1 0
After:  [2, 1, 1, 2]

Before: [3, 2, 0, 3]
8 0 2 0
After:  [1, 2, 0, 3]

Before: [1, 1, 1, 3]
2 2 1 3
After:  [1, 1, 1, 2]

Before: [1, 0, 2, 1]
6 3 2 2
After:  [1, 0, 1, 1]

Before: [0, 1, 2, 2]
0 0 3 0
After:  [0, 1, 2, 2]

Before: [3, 1, 1, 0]
2 2 1 2
After:  [3, 1, 2, 0]

Before: [2, 1, 2, 1]
1 1 2 1
After:  [2, 0, 2, 1]

Before: [0, 1, 1, 1]
2 2 1 3
After:  [0, 1, 1, 2]

Before: [1, 1, 2, 3]
1 1 2 2
After:  [1, 1, 0, 3]

Before: [2, 2, 2, 0]
4 2 1 3
After:  [2, 2, 2, 1]

Before: [3, 1, 0, 0]
12 1 3 2
After:  [3, 1, 1, 0]

Before: [3, 1, 3, 2]
15 1 3 3
After:  [3, 1, 3, 0]

Before: [3, 3, 0, 2]
5 2 3 3
After:  [3, 3, 0, 1]

Before: [0, 3, 2, 0]
0 0 3 0
After:  [0, 3, 2, 0]

Before: [1, 0, 2, 0]
3 0 2 2
After:  [1, 0, 0, 0]

Before: [2, 3, 2, 2]
8 3 2 0
After:  [0, 3, 2, 2]

Before: [1, 1, 3, 2]
15 1 3 2
After:  [1, 1, 0, 2]

Before: [1, 1, 2, 0]
3 0 2 2
After:  [1, 1, 0, 0]

Before: [0, 0, 2, 2]
7 0 0 1
After:  [0, 0, 2, 2]

Before: [1, 3, 0, 1]
14 0 2 2
After:  [1, 3, 0, 1]

Before: [0, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [3, 1, 0, 0]
12 1 3 0
After:  [1, 1, 0, 0]

Before: [1, 3, 2, 3]
10 2 3 0
After:  [0, 3, 2, 3]

Before: [1, 3, 2, 0]
3 0 2 1
After:  [1, 0, 2, 0]

Before: [3, 0, 2, 2]
11 2 3 1
After:  [3, 2, 2, 2]

Before: [3, 1, 2, 2]
15 1 3 3
After:  [3, 1, 2, 0]

Before: [1, 0, 2, 3]
3 0 2 1
After:  [1, 0, 2, 3]

Before: [0, 3, 2, 2]
11 2 3 3
After:  [0, 3, 2, 2]

Before: [2, 1, 2, 2]
11 2 3 1
After:  [2, 2, 2, 2]

Before: [3, 1, 1, 3]
2 2 1 1
After:  [3, 2, 1, 3]

Before: [0, 1, 0, 1]
14 1 3 0
After:  [1, 1, 0, 1]

Before: [1, 1, 2, 1]
14 1 3 2
After:  [1, 1, 1, 1]

Before: [1, 2, 2, 2]
3 0 2 3
After:  [1, 2, 2, 0]

Before: [2, 0, 2, 2]
11 2 3 2
After:  [2, 0, 2, 2]

Before: [0, 0, 3, 0]
5 3 2 1
After:  [0, 1, 3, 0]

Before: [0, 1, 1, 2]
15 1 3 0
After:  [0, 1, 1, 2]

Before: [0, 3, 1, 2]
0 0 1 0
After:  [0, 3, 1, 2]

Before: [0, 1, 3, 1]
0 0 2 1
After:  [0, 0, 3, 1]

Before: [3, 1, 1, 0]
12 1 3 3
After:  [3, 1, 1, 1]

Before: [0, 3, 2, 1]
6 3 2 1
After:  [0, 1, 2, 1]

Before: [0, 1, 0, 0]
12 1 3 0
After:  [1, 1, 0, 0]

Before: [2, 1, 2, 3]
1 1 2 3
After:  [2, 1, 2, 0]

Before: [3, 3, 0, 1]
9 3 3 0
After:  [0, 3, 0, 1]

Before: [0, 3, 2, 2]
8 3 2 1
After:  [0, 0, 2, 2]

Before: [0, 1, 2, 3]
10 1 3 0
After:  [0, 1, 2, 3]

Before: [2, 1, 1, 0]
2 2 1 2
After:  [2, 1, 2, 0]

Before: [3, 1, 1, 1]
8 3 1 0
After:  [0, 1, 1, 1]

Before: [1, 1, 0, 1]
9 3 3 3
After:  [1, 1, 0, 0]

Before: [2, 0, 2, 1]
6 3 2 1
After:  [2, 1, 2, 1]

Before: [3, 1, 0, 1]
8 3 1 0
After:  [0, 1, 0, 1]

Before: [0, 0, 0, 1]
7 0 0 0
After:  [0, 0, 0, 1]

Before: [3, 1, 1, 3]
4 3 0 1
After:  [3, 1, 1, 3]

Before: [2, 0, 0, 2]
9 3 3 1
After:  [2, 0, 0, 2]

Before: [2, 1, 3, 2]
15 1 3 0
After:  [0, 1, 3, 2]

Before: [2, 0, 1, 1]
9 3 3 2
After:  [2, 0, 0, 1]

Before: [3, 2, 2, 1]
4 2 1 0
After:  [1, 2, 2, 1]

Before: [3, 1, 3, 2]
15 1 3 2
After:  [3, 1, 0, 2]

Before: [0, 2, 3, 0]
0 0 2 2
After:  [0, 2, 0, 0]

Before: [0, 3, 3, 0]
0 0 3 2
After:  [0, 3, 0, 0]

Before: [3, 1, 3, 1]
9 3 3 2
After:  [3, 1, 0, 1]

Before: [0, 0, 2, 0]
0 0 3 3
After:  [0, 0, 2, 0]

Before: [2, 1, 2, 0]
4 2 0 2
After:  [2, 1, 1, 0]

Before: [2, 1, 1, 2]
15 1 3 0
After:  [0, 1, 1, 2]

Before: [1, 2, 2, 2]
11 2 3 1
After:  [1, 2, 2, 2]

Before: [1, 1, 2, 3]
3 0 2 2
After:  [1, 1, 0, 3]

Before: [0, 1, 1, 0]
12 1 3 3
After:  [0, 1, 1, 1]

Before: [0, 1, 2, 2]
15 1 3 2
After:  [0, 1, 0, 2]

Before: [1, 0, 2, 3]
3 0 2 2
After:  [1, 0, 0, 3]

Before: [3, 0, 2, 1]
6 3 2 2
After:  [3, 0, 1, 1]

Before: [3, 0, 0, 2]
5 2 3 2
After:  [3, 0, 1, 2]

Before: [0, 1, 1, 1]
7 0 0 1
After:  [0, 0, 1, 1]

Before: [0, 2, 2, 2]
4 2 1 1
After:  [0, 1, 2, 2]

Before: [1, 1, 0, 2]
14 0 2 1
After:  [1, 0, 0, 2]

Before: [0, 2, 1, 1]
0 0 3 0
After:  [0, 2, 1, 1]

Before: [0, 3, 3, 3]
0 0 3 3
After:  [0, 3, 3, 0]

Before: [0, 2, 2, 2]
0 0 2 1
After:  [0, 0, 2, 2]

Before: [1, 0, 0, 0]
14 0 2 2
After:  [1, 0, 0, 0]

Before: [1, 3, 2, 0]
3 0 2 2
After:  [1, 3, 0, 0]

Before: [2, 3, 1, 0]
13 0 3 0
After:  [1, 3, 1, 0]

Before: [2, 0, 2, 0]
4 2 0 1
After:  [2, 1, 2, 0]

Before: [3, 1, 2, 0]
12 1 3 0
After:  [1, 1, 2, 0]

Before: [2, 1, 3, 1]
14 1 3 0
After:  [1, 1, 3, 1]

Before: [1, 3, 3, 3]
4 3 2 0
After:  [1, 3, 3, 3]

Before: [0, 3, 1, 3]
10 2 3 3
After:  [0, 3, 1, 0]

Before: [0, 1, 3, 1]
7 0 0 2
After:  [0, 1, 0, 1]

Before: [3, 1, 2, 0]
12 1 3 2
After:  [3, 1, 1, 0]

Before: [1, 2, 3, 3]
10 1 3 0
After:  [0, 2, 3, 3]

Before: [2, 2, 3, 3]
8 2 0 3
After:  [2, 2, 3, 1]

Before: [0, 1, 2, 0]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [1, 3, 2, 3]
3 0 2 1
After:  [1, 0, 2, 3]

Before: [0, 1, 1, 0]
2 2 1 3
After:  [0, 1, 1, 2]

Before: [0, 3, 0, 2]
7 0 0 1
After:  [0, 0, 0, 2]

Before: [2, 2, 2, 0]
13 0 3 3
After:  [2, 2, 2, 1]

Before: [2, 1, 2, 0]
1 1 2 1
After:  [2, 0, 2, 0]

Before: [2, 1, 0, 1]
14 1 3 1
After:  [2, 1, 0, 1]

Before: [0, 1, 2, 0]
12 1 3 1
After:  [0, 1, 2, 0]

Before: [1, 2, 1, 3]
10 1 3 3
After:  [1, 2, 1, 0]

Before: [2, 3, 2, 3]
10 2 3 2
After:  [2, 3, 0, 3]

Before: [1, 2, 2, 2]
3 0 2 2
After:  [1, 2, 0, 2]

Before: [0, 0, 3, 1]
0 0 2 3
After:  [0, 0, 3, 0]

Before: [3, 2, 1, 3]
10 2 3 1
After:  [3, 0, 1, 3]

Before: [1, 2, 2, 2]
3 0 2 1
After:  [1, 0, 2, 2]

Before: [0, 0, 3, 0]
5 3 2 0
After:  [1, 0, 3, 0]

Before: [3, 3, 2, 2]
11 2 3 1
After:  [3, 2, 2, 2]

Before: [1, 3, 3, 1]
4 2 3 3
After:  [1, 3, 3, 0]

Before: [0, 0, 3, 1]
7 0 0 2
After:  [0, 0, 0, 1]

Before: [2, 1, 1, 0]
12 1 3 0
After:  [1, 1, 1, 0]

Before: [0, 1, 1, 0]
7 0 0 1
After:  [0, 0, 1, 0]

Before: [0, 3, 1, 1]
0 0 1 2
After:  [0, 3, 0, 1]

Before: [0, 1, 2, 1]
0 0 1 0
After:  [0, 1, 2, 1]

Before: [2, 2, 2, 0]
13 0 3 2
After:  [2, 2, 1, 0]

Before: [0, 3, 2, 2]
7 0 0 2
After:  [0, 3, 0, 2]

Before: [1, 2, 2, 1]
4 2 1 0
After:  [1, 2, 2, 1]

Before: [1, 1, 3, 1]
14 1 3 2
After:  [1, 1, 1, 1]

Before: [1, 1, 3, 1]
14 1 3 1
After:  [1, 1, 3, 1]

Before: [2, 1, 3, 2]
15 1 3 2
After:  [2, 1, 0, 2]

Before: [2, 1, 1, 2]
2 2 1 1
After:  [2, 2, 1, 2]

Before: [1, 0, 2, 2]
11 2 3 1
After:  [1, 2, 2, 2]

Before: [1, 0, 2, 0]
3 0 2 0
After:  [0, 0, 2, 0]

Before: [0, 3, 1, 1]
0 0 2 0
After:  [0, 3, 1, 1]

Before: [1, 0, 2, 3]
3 0 2 0
After:  [0, 0, 2, 3]

Before: [3, 1, 3, 2]
15 1 3 1
After:  [3, 0, 3, 2]

Before: [3, 2, 0, 2]
5 2 3 3
After:  [3, 2, 0, 1]

Before: [2, 1, 1, 3]
2 2 1 0
After:  [2, 1, 1, 3]

Before: [2, 1, 2, 0]
1 1 2 3
After:  [2, 1, 2, 0]

Before: [0, 1, 0, 2]
5 2 3 1
After:  [0, 1, 0, 2]

Before: [2, 1, 3, 2]
15 1 3 1
After:  [2, 0, 3, 2]

Before: [1, 2, 2, 0]
3 0 2 1
After:  [1, 0, 2, 0]

Before: [0, 2, 2, 0]
7 0 0 3
After:  [0, 2, 2, 0]

Before: [3, 1, 1, 0]
2 2 1 3
After:  [3, 1, 1, 2]

Before: [2, 3, 1, 0]
13 0 3 1
After:  [2, 1, 1, 0]

Before: [0, 1, 2, 2]
0 0 1 1
After:  [0, 0, 2, 2]

Before: [2, 0, 2, 2]
11 2 3 3
After:  [2, 0, 2, 2]

Before: [0, 3, 0, 1]
9 3 3 3
After:  [0, 3, 0, 0]

Before: [0, 3, 1, 2]
0 0 3 0
After:  [0, 3, 1, 2]

Before: [3, 1, 1, 2]
2 2 1 3
After:  [3, 1, 1, 2]

Before: [2, 0, 2, 2]
11 2 3 1
After:  [2, 2, 2, 2]

Before: [2, 3, 2, 0]
13 0 3 0
After:  [1, 3, 2, 0]

Before: [1, 1, 0, 2]
5 2 3 1
After:  [1, 1, 0, 2]

Before: [1, 2, 2, 1]
3 0 2 0
After:  [0, 2, 2, 1]

Before: [3, 1, 2, 2]
11 2 3 1
After:  [3, 2, 2, 2]

Before: [0, 0, 0, 3]
7 0 0 2
After:  [0, 0, 0, 3]

Before: [2, 1, 0, 0]
13 0 3 1
After:  [2, 1, 0, 0]

Before: [1, 0, 0, 0]
14 0 2 0
After:  [0, 0, 0, 0]

Before: [3, 1, 2, 3]
1 1 2 2
After:  [3, 1, 0, 3]

Before: [0, 1, 1, 2]
0 0 2 1
After:  [0, 0, 1, 2]

Before: [2, 2, 2, 3]
4 2 0 3
After:  [2, 2, 2, 1]

Before: [1, 1, 2, 2]
3 0 2 0
After:  [0, 1, 2, 2]

Before: [3, 1, 2, 1]
14 1 3 2
After:  [3, 1, 1, 1]

Before: [0, 1, 1, 1]
2 2 1 2
After:  [0, 1, 2, 1]

Before: [0, 1, 2, 2]
11 2 3 3
After:  [0, 1, 2, 2]

Before: [1, 1, 2, 0]
1 1 2 2
After:  [1, 1, 0, 0]

Before: [1, 0, 2, 1]
3 0 2 0
After:  [0, 0, 2, 1]

Before: [2, 0, 1, 0]
13 0 3 0
After:  [1, 0, 1, 0]

Before: [2, 2, 2, 3]
10 2 3 0
After:  [0, 2, 2, 3]

Before: [0, 2, 0, 2]
7 0 0 0
After:  [0, 2, 0, 2]

Before: [1, 2, 2, 3]
3 0 2 2
After:  [1, 2, 0, 3]

Before: [2, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [2, 3, 3, 1]
8 2 0 3
After:  [2, 3, 3, 1]

Before: [0, 3, 2, 2]
11 2 3 1
After:  [0, 2, 2, 2]

Before: [1, 2, 0, 3]
14 0 2 3
After:  [1, 2, 0, 0]

Before: [0, 2, 2, 1]
6 3 2 2
After:  [0, 2, 1, 1]

Before: [1, 1, 1, 1]
9 3 3 0
After:  [0, 1, 1, 1]

Before: [1, 2, 2, 2]
3 0 2 0
After:  [0, 2, 2, 2]

Before: [0, 2, 3, 0]
7 0 0 3
After:  [0, 2, 3, 0]

Before: [1, 3, 2, 2]
3 0 2 2
After:  [1, 3, 0, 2]

Before: [3, 2, 1, 3]
10 1 3 2
After:  [3, 2, 0, 3]

Before: [1, 0, 2, 3]
3 0 2 3
After:  [1, 0, 2, 0]

Before: [3, 1, 2, 1]
6 3 2 3
After:  [3, 1, 2, 1]

Before: [2, 1, 0, 2]
5 2 3 3
After:  [2, 1, 0, 1]

Before: [1, 0, 1, 2]
9 3 3 1
After:  [1, 0, 1, 2]

Before: [3, 1, 1, 3]
2 2 1 3
After:  [3, 1, 1, 2]

Before: [2, 1, 2, 2]
15 1 3 1
After:  [2, 0, 2, 2]

Before: [1, 0, 1, 1]
9 3 3 1
After:  [1, 0, 1, 1]

Before: [1, 1, 2, 2]
8 3 2 1
After:  [1, 0, 2, 2]

Before: [0, 1, 0, 0]
12 1 3 3
After:  [0, 1, 0, 1]

Before: [2, 0, 0, 2]
8 0 1 3
After:  [2, 0, 0, 1]

Before: [1, 0, 2, 2]
3 0 2 3
After:  [1, 0, 2, 0]

Before: [0, 3, 2, 2]
7 0 0 0
After:  [0, 3, 2, 2]

Before: [3, 1, 0, 3]
10 1 3 1
After:  [3, 0, 0, 3]

Before: [2, 2, 0, 0]
13 0 3 3
After:  [2, 2, 0, 1]

Before: [0, 1, 1, 1]
2 2 1 0
After:  [2, 1, 1, 1]

Before: [1, 1, 2, 0]
1 1 2 1
After:  [1, 0, 2, 0]

Before: [0, 2, 1, 3]
0 0 2 1
After:  [0, 0, 1, 3]

Before: [0, 1, 2, 2]
11 2 3 1
After:  [0, 2, 2, 2]

Before: [0, 1, 1, 3]
2 2 1 2
After:  [0, 1, 2, 3]

Before: [0, 2, 3, 1]
4 2 3 2
After:  [0, 2, 0, 1]

Before: [2, 3, 3, 0]
5 3 2 3
After:  [2, 3, 3, 1]

Before: [3, 1, 2, 2]
1 1 2 1
After:  [3, 0, 2, 2]

Before: [2, 2, 2, 1]
6 3 2 0
After:  [1, 2, 2, 1]

Before: [0, 1, 1, 3]
2 2 1 0
After:  [2, 1, 1, 3]

Before: [3, 1, 3, 0]
5 3 2 2
After:  [3, 1, 1, 0]

Before: [3, 1, 2, 1]
6 3 2 2
After:  [3, 1, 1, 1]

Before: [1, 1, 0, 3]
14 0 2 3
After:  [1, 1, 0, 0]

Before: [2, 1, 1, 2]
15 1 3 1
After:  [2, 0, 1, 2]

Before: [3, 0, 3, 0]
5 3 2 1
After:  [3, 1, 3, 0]

Before: [2, 0, 2, 2]
8 0 1 3
After:  [2, 0, 2, 1]

Before: [0, 0, 2, 2]
11 2 3 1
After:  [0, 2, 2, 2]

Before: [1, 1, 2, 1]
3 0 2 0
After:  [0, 1, 2, 1]

Before: [3, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [1, 0, 2, 3]
10 2 3 0
After:  [0, 0, 2, 3]

Before: [3, 1, 1, 1]
2 2 1 1
After:  [3, 2, 1, 1]

Before: [3, 1, 0, 2]
15 1 3 0
After:  [0, 1, 0, 2]

Before: [1, 3, 1, 1]
9 2 3 0
After:  [0, 3, 1, 1]

Before: [3, 1, 2, 2]
11 2 3 3
After:  [3, 1, 2, 2]

Before: [0, 3, 0, 1]
7 0 0 2
After:  [0, 3, 0, 1]

Before: [1, 2, 0, 2]
14 0 2 2
After:  [1, 2, 0, 2]

Before: [1, 3, 2, 1]
6 3 2 2
After:  [1, 3, 1, 1]

Before: [2, 3, 3, 3]
8 2 0 1
After:  [2, 1, 3, 3]

Before: [1, 2, 2, 3]
3 0 2 3
After:  [1, 2, 2, 0]

Before: [0, 1, 3, 0]
12 1 3 0
After:  [1, 1, 3, 0]

Before: [3, 1, 0, 2]
5 2 3 3
After:  [3, 1, 0, 1]

Before: [0, 2, 2, 0]
4 2 1 1
After:  [0, 1, 2, 0]

Before: [2, 2, 1, 0]
13 0 3 3
After:  [2, 2, 1, 1]

Before: [0, 1, 0, 1]
9 3 3 2
After:  [0, 1, 0, 1]

Before: [0, 1, 2, 1]
6 3 2 3
After:  [0, 1, 2, 1]

Before: [1, 3, 2, 0]
3 0 2 0
After:  [0, 3, 2, 0]

Before: [0, 1, 0, 2]
15 1 3 3
After:  [0, 1, 0, 0]

Before: [0, 3, 3, 1]
7 0 0 3
After:  [0, 3, 3, 0]

Before: [0, 1, 2, 1]
7 0 0 2
After:  [0, 1, 0, 1]

Before: [1, 2, 0, 3]
14 0 2 1
After:  [1, 0, 0, 3]

Before: [2, 1, 1, 2]
2 2 1 2
After:  [2, 1, 2, 2]

Before: [1, 0, 2, 2]
11 2 3 3
After:  [1, 0, 2, 2]

Before: [3, 1, 1, 2]
2 2 1 1
After:  [3, 2, 1, 2]

Before: [2, 1, 1, 1]
2 2 1 0
After:  [2, 1, 1, 1]

Before: [0, 0, 3, 0]
0 0 2 1
After:  [0, 0, 3, 0]

Before: [3, 1, 2, 1]
1 1 2 2
After:  [3, 1, 0, 1]

Before: [2, 2, 2, 1]
6 3 2 3
After:  [2, 2, 2, 1]

Before: [0, 1, 3, 1]
4 2 3 0
After:  [0, 1, 3, 1]

Before: [2, 2, 3, 3]
8 2 0 1
After:  [2, 1, 3, 3]

Before: [0, 3, 0, 2]
7 0 0 0
After:  [0, 3, 0, 2]

Before: [1, 1, 3, 0]
5 3 2 1
After:  [1, 1, 3, 0]

Before: [3, 1, 1, 3]
10 2 3 1
After:  [3, 0, 1, 3]

Before: [0, 1, 2, 1]
1 1 2 2
After:  [0, 1, 0, 1]

Before: [3, 2, 3, 3]
4 3 0 2
After:  [3, 2, 1, 3]

Before: [1, 2, 2, 2]
11 2 3 3
After:  [1, 2, 2, 2]

Before: [1, 1, 2, 2]
11 2 3 1
After:  [1, 2, 2, 2]

Before: [1, 1, 1, 2]
15 1 3 3
After:  [1, 1, 1, 0]

Before: [0, 1, 3, 0]
5 3 2 3
After:  [0, 1, 3, 1]

Before: [2, 1, 3, 1]
4 2 3 1
After:  [2, 0, 3, 1]

Before: [3, 0, 2, 2]
11 2 3 3
After:  [3, 0, 2, 2]

Before: [0, 3, 0, 3]
7 0 0 3
After:  [0, 3, 0, 0]

Before: [0, 0, 2, 3]
7 0 0 3
After:  [0, 0, 2, 0]

Before: [0, 1, 3, 2]
9 3 3 3
After:  [0, 1, 3, 0]

Before: [2, 1, 1, 3]
2 2 1 2
After:  [2, 1, 2, 3]

Before: [2, 1, 2, 2]
4 2 0 1
After:  [2, 1, 2, 2]

Before: [3, 1, 3, 0]
5 3 2 0
After:  [1, 1, 3, 0]

Before: [1, 0, 0, 2]
5 2 3 2
After:  [1, 0, 1, 2]

Before: [2, 0, 3, 0]
13 0 3 0
After:  [1, 0, 3, 0]

Before: [2, 1, 1, 1]
8 3 1 2
After:  [2, 1, 0, 1]

Before: [0, 1, 1, 2]
15 1 3 2
After:  [0, 1, 0, 2]

Before: [1, 3, 0, 3]
14 0 2 3
After:  [1, 3, 0, 0]

Before: [0, 1, 2, 3]
0 0 1 1
After:  [0, 0, 2, 3]

Before: [2, 1, 2, 2]
1 1 2 1
After:  [2, 0, 2, 2]

Before: [2, 2, 3, 0]
8 2 0 3
After:  [2, 2, 3, 1]

Before: [1, 1, 2, 2]
1 1 2 1
After:  [1, 0, 2, 2]

Before: [0, 1, 3, 2]
15 1 3 2
After:  [0, 1, 0, 2]

Before: [3, 1, 0, 2]
15 1 3 3
After:  [3, 1, 0, 0]

Before: [1, 0, 1, 3]
10 2 3 1
After:  [1, 0, 1, 3]

Before: [3, 2, 0, 0]
8 0 2 0
After:  [1, 2, 0, 0]

Before: [1, 0, 3, 0]
5 3 2 0
After:  [1, 0, 3, 0]

Before: [0, 0, 0, 3]
7 0 0 0
After:  [0, 0, 0, 3]

Before: [1, 3, 3, 1]
4 2 3 0
After:  [0, 3, 3, 1]

Before: [2, 1, 0, 1]
8 3 1 2
After:  [2, 1, 0, 1]

Before: [2, 0, 2, 2]
9 3 3 1
After:  [2, 0, 2, 2]

Before: [2, 1, 2, 0]
13 0 3 3
After:  [2, 1, 2, 1]

Before: [1, 1, 0, 2]
15 1 3 2
After:  [1, 1, 0, 2]

Before: [3, 1, 2, 2]
11 2 3 0
After:  [2, 1, 2, 2]

Before: [2, 0, 0, 0]
13 0 3 3
After:  [2, 0, 0, 1]

Before: [3, 2, 3, 1]
9 3 3 3
After:  [3, 2, 3, 0]

Before: [1, 0, 2, 2]
11 2 3 2
After:  [1, 0, 2, 2]

Before: [3, 1, 1, 0]
8 2 1 0
After:  [0, 1, 1, 0]

Before: [0, 3, 3, 1]
9 3 3 2
After:  [0, 3, 0, 1]

Before: [2, 0, 1, 0]
13 0 3 1
After:  [2, 1, 1, 0]

Before: [2, 2, 0, 0]
13 0 3 0
After:  [1, 2, 0, 0]

Before: [1, 3, 2, 2]
3 0 2 1
After:  [1, 0, 2, 2]

Before: [3, 2, 0, 3]
10 1 3 2
After:  [3, 2, 0, 3]

Before: [3, 1, 2, 2]
15 1 3 0
After:  [0, 1, 2, 2]

Before: [3, 1, 1, 3]
8 2 1 0
After:  [0, 1, 1, 3]

Before: [0, 2, 3, 0]
5 3 2 3
After:  [0, 2, 3, 1]

Before: [0, 3, 3, 3]
4 3 2 3
After:  [0, 3, 3, 1]

Before: [1, 3, 3, 1]
9 3 3 3
After:  [1, 3, 3, 0]

Before: [0, 3, 2, 2]
11 2 3 2
After:  [0, 3, 2, 2]

Before: [1, 2, 2, 2]
11 2 3 0
After:  [2, 2, 2, 2]

Before: [2, 1, 2, 1]
8 3 1 3
After:  [2, 1, 2, 0]

Before: [0, 0, 2, 2]
11 2 3 3
After:  [0, 0, 2, 2]

Before: [0, 1, 0, 2]
15 1 3 2
After:  [0, 1, 0, 2]

Before: [0, 3, 2, 3]
0 0 2 2
After:  [0, 3, 0, 3]

Before: [0, 1, 3, 3]
0 0 1 2
After:  [0, 1, 0, 3]

Before: [2, 2, 1, 0]
13 0 3 0
After:  [1, 2, 1, 0]

Before: [3, 1, 1, 2]
15 1 3 0
After:  [0, 1, 1, 2]

Before: [2, 3, 2, 1]
6 3 2 3
After:  [2, 3, 2, 1]

Before: [1, 0, 0, 3]
14 0 2 3
After:  [1, 0, 0, 0]

Before: [1, 2, 0, 2]
5 2 3 0
After:  [1, 2, 0, 2]

Before: [3, 0, 2, 3]
4 3 0 2
After:  [3, 0, 1, 3]

Before: [1, 3, 2, 0]
3 0 2 3
After:  [1, 3, 2, 0]

Before: [3, 1, 2, 0]
1 1 2 0
After:  [0, 1, 2, 0]

Before: [3, 1, 2, 0]
12 1 3 3
After:  [3, 1, 2, 1]

Before: [1, 3, 2, 1]
6 3 2 1
After:  [1, 1, 2, 1]

Before: [0, 0, 2, 3]
10 2 3 1
After:  [0, 0, 2, 3]

Before: [1, 2, 0, 0]
14 0 2 0
After:  [0, 2, 0, 0]

Before: [2, 0, 1, 0]
13 0 3 3
After:  [2, 0, 1, 1]

Before: [0, 2, 2, 2]
11 2 3 2
After:  [0, 2, 2, 2]

Before: [2, 0, 2, 1]
6 3 2 0
After:  [1, 0, 2, 1]

Before: [1, 1, 2, 2]
11 2 3 3
After:  [1, 1, 2, 2]

Before: [0, 3, 0, 2]
0 0 1 3
After:  [0, 3, 0, 0]

Before: [0, 0, 2, 2]
7 0 0 0
After:  [0, 0, 2, 2]

Before: [1, 0, 2, 1]
6 3 2 3
After:  [1, 0, 2, 1]

Before: [2, 3, 2, 3]
4 2 0 0
After:  [1, 3, 2, 3]

Before: [1, 1, 2, 2]
15 1 3 3
After:  [1, 1, 2, 0]

Before: [2, 0, 1, 3]
10 2 3 3
After:  [2, 0, 1, 0]

Before: [0, 2, 2, 1]
0 0 2 3
After:  [0, 2, 2, 0]

Before: [2, 3, 3, 3]
4 3 2 3
After:  [2, 3, 3, 1]

Before: [1, 2, 2, 3]
10 2 3 1
After:  [1, 0, 2, 3]

Before: [0, 2, 3, 0]
7 0 0 0
After:  [0, 2, 3, 0]

Before: [1, 0, 0, 3]
14 0 2 2
After:  [1, 0, 0, 3]

Before: [3, 3, 2, 2]
8 3 2 2
After:  [3, 3, 0, 2]

Before: [0, 2, 2, 2]
11 2 3 3
After:  [0, 2, 2, 2]

Before: [3, 1, 3, 0]
12 1 3 0
After:  [1, 1, 3, 0]

Before: [3, 3, 0, 3]
8 0 2 3
After:  [3, 3, 0, 1]

Before: [2, 1, 0, 0]
13 0 3 2
After:  [2, 1, 1, 0]

Before: [2, 1, 1, 2]
2 2 1 3
After:  [2, 1, 1, 2]

Before: [2, 1, 3, 1]
8 3 1 1
After:  [2, 0, 3, 1]

Before: [0, 3, 1, 3]
0 0 1 2
After:  [0, 3, 0, 3]

Before: [2, 0, 3, 0]
13 0 3 3
After:  [2, 0, 3, 1]

Before: [3, 3, 0, 2]
5 2 3 2
After:  [3, 3, 1, 2]

Before: [1, 0, 2, 0]
3 0 2 3
After:  [1, 0, 2, 0]

Before: [1, 1, 2, 1]
6 3 2 3
After:  [1, 1, 2, 1]

Before: [2, 1, 2, 1]
6 3 2 1
After:  [2, 1, 2, 1]

Before: [3, 1, 1, 1]
8 2 1 0
After:  [0, 1, 1, 1]

Before: [1, 0, 2, 2]
3 0 2 0
After:  [0, 0, 2, 2]

Before: [3, 1, 2, 3]
1 1 2 0
After:  [0, 1, 2, 3]

Before: [1, 1, 2, 1]
6 3 2 1
After:  [1, 1, 2, 1]

Before: [0, 2, 1, 3]
10 1 3 2
After:  [0, 2, 0, 3]

Before: [2, 1, 2, 2]
1 1 2 3
After:  [2, 1, 2, 0]

Before: [0, 0, 0, 0]
7 0 0 3
After:  [0, 0, 0, 0]

Before: [2, 3, 0, 0]
13 0 3 3
After:  [2, 3, 0, 1]

Before: [0, 0, 2, 3]
10 2 3 0
After:  [0, 0, 2, 3]

Before: [0, 3, 2, 3]
0 0 2 1
After:  [0, 0, 2, 3]

Before: [0, 2, 3, 3]
7 0 0 0
After:  [0, 2, 3, 3]

Before: [1, 0, 1, 3]
10 2 3 3
After:  [1, 0, 1, 0]

Before: [0, 1, 1, 0]
12 1 3 1
After:  [0, 1, 1, 0]

Before: [1, 1, 1, 1]
9 2 3 3
After:  [1, 1, 1, 0]

Before: [1, 2, 0, 1]
14 0 2 3
After:  [1, 2, 0, 0]

Before: [0, 1, 2, 2]
8 3 2 3
After:  [0, 1, 2, 0]

Before: [1, 1, 1, 2]
15 1 3 2
After:  [1, 1, 0, 2]

Before: [0, 2, 2, 2]
0 0 3 3
After:  [0, 2, 2, 0]

Before: [0, 1, 1, 1]
14 1 3 0
After:  [1, 1, 1, 1]

Before: [1, 3, 0, 2]
5 2 3 2
After:  [1, 3, 1, 2]

Before: [0, 3, 0, 1]
7 0 0 3
After:  [0, 3, 0, 0]

Before: [2, 1, 0, 1]
14 1 3 0
After:  [1, 1, 0, 1]

Before: [1, 0, 2, 0]
3 0 2 1
After:  [1, 0, 2, 0]

Before: [2, 0, 0, 2]
5 2 3 2
After:  [2, 0, 1, 2]

Before: [3, 1, 1, 2]
9 3 3 3
After:  [3, 1, 1, 0]

Before: [2, 1, 2, 2]
11 2 3 0
After:  [2, 1, 2, 2]

Before: [0, 3, 0, 3]
0 0 2 3
After:  [0, 3, 0, 0]

Before: [1, 1, 2, 1]
3 0 2 2
After:  [1, 1, 0, 1]

Before: [0, 1, 1, 0]
12 1 3 0
After:  [1, 1, 1, 0]

Before: [3, 1, 1, 1]
8 3 1 2
After:  [3, 1, 0, 1]

Before: [2, 0, 2, 0]
13 0 3 1
After:  [2, 1, 2, 0]

Before: [3, 0, 3, 2]
9 3 3 1
After:  [3, 0, 3, 2]

Before: [1, 0, 0, 0]
14 0 2 3
After:  [1, 0, 0, 0]

Before: [3, 1, 3, 1]
4 2 3 3
After:  [3, 1, 3, 0]

Before: [1, 1, 1, 0]
2 2 1 0
After:  [2, 1, 1, 0]

Before: [2, 1, 1, 0]
12 1 3 1
After:  [2, 1, 1, 0]

Before: [2, 2, 2, 3]
4 2 0 2
After:  [2, 2, 1, 3]

Before: [1, 1, 1, 1]
2 2 1 3
After:  [1, 1, 1, 2]

Before: [2, 1, 2, 1]
1 1 2 0
After:  [0, 1, 2, 1]

Before: [0, 1, 2, 3]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [3, 1, 1, 3]
4 3 0 0
After:  [1, 1, 1, 3]

Before: [3, 0, 2, 1]
9 3 3 2
After:  [3, 0, 0, 1]

Before: [3, 1, 0, 2]
8 0 2 0
After:  [1, 1, 0, 2]

Before: [0, 2, 2, 1]
7 0 0 0
After:  [0, 2, 2, 1]

Before: [0, 1, 3, 1]
14 1 3 0
After:  [1, 1, 3, 1]

Before: [0, 1, 2, 2]
1 1 2 3
After:  [0, 1, 2, 0]

Before: [2, 1, 0, 1]
8 3 1 1
After:  [2, 0, 0, 1]

Before: [2, 3, 3, 0]
13 0 3 1
After:  [2, 1, 3, 0]

Before: [3, 1, 2, 0]
12 1 3 1
After:  [3, 1, 2, 0]

Before: [0, 3, 2, 1]
7 0 0 1
After:  [0, 0, 2, 1]

Before: [2, 3, 2, 2]
11 2 3 0
After:  [2, 3, 2, 2]

Before: [0, 1, 1, 3]
2 2 1 1
After:  [0, 2, 1, 3]

Before: [0, 2, 2, 3]
10 2 3 1
After:  [0, 0, 2, 3]

Before: [2, 3, 3, 1]
9 3 3 3
After:  [2, 3, 3, 0]

Before: [2, 1, 0, 2]
15 1 3 0
After:  [0, 1, 0, 2]

Before: [0, 0, 2, 1]
6 3 2 3
After:  [0, 0, 2, 1]

Before: [2, 1, 0, 2]
15 1 3 2
After:  [2, 1, 0, 2]

Before: [1, 1, 1, 3]
2 2 1 1
After:  [1, 2, 1, 3]

Before: [0, 0, 1, 0]
7 0 0 2
After:  [0, 0, 0, 0]

Before: [3, 1, 3, 2]
15 1 3 0
After:  [0, 1, 3, 2]

Before: [1, 1, 3, 0]
12 1 3 0
After:  [1, 1, 3, 0]

Before: [0, 1, 3, 3]
7 0 0 1
After:  [0, 0, 3, 3]

Before: [1, 1, 3, 3]
10 1 3 1
After:  [1, 0, 3, 3]

Before: [0, 2, 3, 3]
10 1 3 3
After:  [0, 2, 3, 0]

Before: [1, 1, 1, 1]
8 2 1 3
After:  [1, 1, 1, 0]

Before: [1, 1, 1, 0]
2 2 1 3
After:  [1, 1, 1, 2]

Before: [2, 3, 3, 0]
13 0 3 3
After:  [2, 3, 3, 1]

Before: [3, 1, 0, 0]
12 1 3 3
After:  [3, 1, 0, 1]

Before: [1, 3, 0, 2]
5 2 3 1
After:  [1, 1, 0, 2]

Before: [2, 2, 3, 3]
10 1 3 3
After:  [2, 2, 3, 0]

Before: [2, 1, 2, 1]
6 3 2 0
After:  [1, 1, 2, 1]

Before: [0, 1, 3, 0]
12 1 3 1
After:  [0, 1, 3, 0]

Before: [3, 2, 2, 3]
10 2 3 2
After:  [3, 2, 0, 3]

Before: [0, 3, 1, 3]
10 2 3 1
After:  [0, 0, 1, 3]

Before: [3, 0, 0, 1]
9 3 3 0
After:  [0, 0, 0, 1]

Before: [2, 1, 0, 0]
13 0 3 0
After:  [1, 1, 0, 0]

Before: [3, 0, 2, 2]
11 2 3 0
After:  [2, 0, 2, 2]

Before: [3, 0, 0, 3]
8 0 2 2
After:  [3, 0, 1, 3]

Before: [0, 0, 0, 2]
7 0 0 0
After:  [0, 0, 0, 2]

Before: [0, 0, 2, 1]
6 3 2 0
After:  [1, 0, 2, 1]

Before: [1, 1, 1, 2]
2 2 1 3
After:  [1, 1, 1, 2]

Before: [2, 3, 3, 1]
4 2 3 3
After:  [2, 3, 3, 0]

Before: [0, 1, 1, 2]
15 1 3 1
After:  [0, 0, 1, 2]

Before: [0, 3, 3, 0]
0 0 2 0
After:  [0, 3, 3, 0]

Before: [2, 2, 3, 3]
4 3 2 1
After:  [2, 1, 3, 3]

Before: [1, 2, 2, 0]
3 0 2 0
After:  [0, 2, 2, 0]

Before: [1, 0, 2, 1]
3 0 2 2
After:  [1, 0, 0, 1]

Before: [0, 1, 3, 0]
5 3 2 1
After:  [0, 1, 3, 0]

Before: [0, 2, 2, 3]
10 2 3 0
After:  [0, 2, 2, 3]

Before: [2, 3, 1, 1]
9 2 3 2
After:  [2, 3, 0, 1]

Before: [3, 2, 0, 3]
10 1 3 0
After:  [0, 2, 0, 3]

Before: [0, 0, 1, 3]
7 0 0 1
After:  [0, 0, 1, 3]

Before: [3, 1, 2, 1]
6 3 2 0
After:  [1, 1, 2, 1]

Before: [1, 0, 3, 1]
4 2 3 3
After:  [1, 0, 3, 0]

Before: [0, 1, 2, 0]
1 1 2 1
After:  [0, 0, 2, 0]

Before: [2, 3, 2, 1]
6 3 2 1
After:  [2, 1, 2, 1]

Before: [3, 1, 1, 1]
2 2 1 2
After:  [3, 1, 2, 1]

Before: [3, 1, 2, 3]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [3, 0, 2, 3]
4 3 0 1
After:  [3, 1, 2, 3]

Before: [1, 2, 2, 1]
3 0 2 1
After:  [1, 0, 2, 1]

Before: [1, 2, 2, 1]
6 3 2 2
After:  [1, 2, 1, 1]

Before: [0, 1, 2, 0]
1 1 2 2
After:  [0, 1, 0, 0]

Before: [3, 1, 1, 1]
9 3 3 2
After:  [3, 1, 0, 1]

Before: [1, 2, 0, 2]
14 0 2 3
After:  [1, 2, 0, 0]

Before: [2, 3, 2, 2]
11 2 3 2
After:  [2, 3, 2, 2]

Before: [1, 0, 0, 2]
14 0 2 3
After:  [1, 0, 0, 0]

Before: [3, 3, 1, 2]
9 3 3 0
After:  [0, 3, 1, 2]

Before: [2, 2, 2, 2]
4 2 1 2
After:  [2, 2, 1, 2]

Before: [1, 1, 2, 1]
3 0 2 3
After:  [1, 1, 2, 0]

Before: [2, 3, 3, 1]
9 3 3 2
After:  [2, 3, 0, 1]

Before: [2, 1, 2, 0]
13 0 3 0
After:  [1, 1, 2, 0]

Before: [0, 1, 3, 3]
10 1 3 3
After:  [0, 1, 3, 0]

Before: [2, 2, 2, 2]
11 2 3 1
After:  [2, 2, 2, 2]

Before: [3, 2, 0, 0]
8 0 2 3
After:  [3, 2, 0, 1]

Before: [2, 3, 3, 0]
5 3 2 2
After:  [2, 3, 1, 0]

Before: [2, 0, 2, 0]
13 0 3 0
After:  [1, 0, 2, 0]

Before: [0, 1, 0, 2]
7 0 0 0
After:  [0, 1, 0, 2]

Before: [0, 3, 0, 1]
9 3 3 0
After:  [0, 3, 0, 1]

Before: [0, 3, 2, 1]
6 3 2 0
After:  [1, 3, 2, 1]

Before: [0, 1, 0, 3]
7 0 0 1
After:  [0, 0, 0, 3]

Before: [1, 2, 0, 2]
14 0 2 1
After:  [1, 0, 0, 2]

Before: [3, 0, 1, 1]
9 3 3 2
After:  [3, 0, 0, 1]

Before: [1, 3, 2, 3]
3 0 2 3
After:  [1, 3, 2, 0]

Before: [1, 2, 3, 0]
5 3 2 1
After:  [1, 1, 3, 0]

Before: [3, 1, 0, 2]
15 1 3 1
After:  [3, 0, 0, 2]

Before: [0, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [3, 1, 1, 3]
10 2 3 3
After:  [3, 1, 1, 0]

Before: [2, 2, 3, 0]
5 3 2 3
After:  [2, 2, 3, 1]

Before: [1, 1, 2, 0]
3 0 2 0
After:  [0, 1, 2, 0]

Before: [0, 1, 1, 2]
2 2 1 3
After:  [0, 1, 1, 2]

Before: [3, 1, 2, 2]
15 1 3 2
After:  [3, 1, 0, 2]

Before: [0, 1, 0, 1]
7 0 0 1
After:  [0, 0, 0, 1]

Before: [1, 1, 1, 2]
2 2 1 0
After:  [2, 1, 1, 2]

Before: [3, 3, 0, 2]
5 2 3 0
After:  [1, 3, 0, 2]

Before: [1, 1, 2, 2]
8 3 2 0
After:  [0, 1, 2, 2]

Before: [0, 1, 2, 2]
15 1 3 0
After:  [0, 1, 2, 2]

Before: [0, 3, 2, 0]
0 0 2 2
After:  [0, 3, 0, 0]

Before: [1, 1, 2, 1]
6 3 2 2
After:  [1, 1, 1, 1]

Before: [1, 1, 1, 2]
2 2 1 1
After:  [1, 2, 1, 2]

Before: [2, 3, 2, 1]
6 3 2 2
After:  [2, 3, 1, 1]

Before: [0, 1, 1, 0]
2 2 1 2
After:  [0, 1, 2, 0]

Before: [0, 3, 2, 3]
7 0 0 2
After:  [0, 3, 0, 3]

Before: [0, 2, 2, 2]
11 2 3 1
After:  [0, 2, 2, 2]

Before: [0, 1, 3, 0]
5 3 2 2
After:  [0, 1, 1, 0]

Before: [1, 3, 0, 1]
14 0 2 0
After:  [0, 3, 0, 1]

Before: [2, 3, 2, 0]
13 0 3 3
After:  [2, 3, 2, 1]

Before: [3, 3, 3, 0]
5 3 2 1
After:  [3, 1, 3, 0]

Before: [3, 2, 2, 2]
11 2 3 0
After:  [2, 2, 2, 2]

Before: [3, 3, 2, 2]
11 2 3 2
After:  [3, 3, 2, 2]

Before: [1, 2, 3, 0]
5 3 2 3
After:  [1, 2, 3, 1]

Before: [0, 0, 2, 2]
11 2 3 2
After:  [0, 0, 2, 2]

Before: [3, 1, 1, 2]
15 1 3 3
After:  [3, 1, 1, 0]

Before: [1, 2, 2, 0]
3 0 2 3
After:  [1, 2, 2, 0]

Before: [3, 3, 2, 3]
10 2 3 3
After:  [3, 3, 2, 0]

Before: [0, 0, 3, 0]
5 3 2 3
After:  [0, 0, 3, 1]

Before: [1, 1, 2, 0]
3 0 2 3
After:  [1, 1, 2, 0]

Before: [3, 1, 2, 3]
1 1 2 1
After:  [3, 0, 2, 3]

Before: [3, 1, 2, 0]
1 1 2 2
After:  [3, 1, 0, 0]

Before: [2, 0, 2, 1]
6 3 2 3
After:  [2, 0, 2, 1]

Before: [0, 2, 2, 1]
0 0 2 0
After:  [0, 2, 2, 1]

Before: [2, 0, 2, 2]
11 2 3 0
After:  [2, 0, 2, 2]

Before: [1, 1, 0, 0]
14 0 2 0
After:  [0, 1, 0, 0]

Before: [0, 0, 1, 3]
0 0 2 2
After:  [0, 0, 0, 3]

Before: [0, 1, 3, 2]
15 1 3 3
After:  [0, 1, 3, 0]

Before: [1, 0, 2, 1]
3 0 2 3
After:  [1, 0, 2, 0]

Before: [0, 0, 0, 2]
5 2 3 1
After:  [0, 1, 0, 2]

Before: [2, 1, 3, 0]
12 1 3 2
After:  [2, 1, 1, 0]

Before: [0, 1, 2, 2]
11 2 3 0
After:  [2, 1, 2, 2]

Before: [3, 0, 2, 3]
10 2 3 2
After:  [3, 0, 0, 3]

Before: [2, 0, 1, 3]
10 2 3 2
After:  [2, 0, 0, 3]

Before: [0, 2, 1, 3]
7 0 0 3
After:  [0, 2, 1, 0]

Before: [2, 1, 3, 0]
12 1 3 3
After:  [2, 1, 3, 1]

Before: [3, 2, 2, 2]
11 2 3 2
After:  [3, 2, 2, 2]

Before: [1, 1, 0, 2]
5 2 3 0
After:  [1, 1, 0, 2]

Before: [0, 3, 1, 2]
7 0 0 3
After:  [0, 3, 1, 0]

Before: [0, 0, 3, 2]
0 0 1 1
After:  [0, 0, 3, 2]

Before: [2, 1, 2, 2]
11 2 3 3
After:  [2, 1, 2, 2]

Before: [2, 0, 0, 0]
13 0 3 1
After:  [2, 1, 0, 0]

Before: [1, 3, 2, 3]
3 0 2 0
After:  [0, 3, 2, 3]

Before: [3, 1, 1, 0]
12 1 3 1
After:  [3, 1, 1, 0]

Before: [1, 1, 3, 0]
12 1 3 3
After:  [1, 1, 3, 1]

Before: [1, 3, 2, 1]
3 0 2 1
After:  [1, 0, 2, 1]

Before: [2, 1, 1, 3]
2 2 1 3
After:  [2, 1, 1, 2]

Before: [3, 1, 1, 2]
8 2 1 3
After:  [3, 1, 1, 0]

Before: [1, 2, 0, 2]
14 0 2 0
After:  [0, 2, 0, 2]

Before: [2, 1, 1, 0]
12 1 3 2
After:  [2, 1, 1, 0]

Before: [3, 3, 0, 2]
8 0 2 3
After:  [3, 3, 0, 1]

Before: [1, 1, 3, 3]
10 1 3 0
After:  [0, 1, 3, 3]

Before: [2, 1, 3, 2]
15 1 3 3
After:  [2, 1, 3, 0]

Before: [3, 1, 1, 0]
12 1 3 0
After:  [1, 1, 1, 0]

Before: [0, 1, 2, 1]
0 0 3 2
After:  [0, 1, 0, 1]

Before: [1, 1, 1, 0]
2 2 1 2
After:  [1, 1, 2, 0]

Before: [0, 2, 1, 3]
10 1 3 3
After:  [0, 2, 1, 0]

Before: [2, 1, 3, 0]
12 1 3 1
After:  [2, 1, 3, 0]

Before: [2, 2, 3, 0]
5 3 2 2
After:  [2, 2, 1, 0]

Before: [2, 0, 2, 1]
6 3 2 2
After:  [2, 0, 1, 1]

Before: [2, 0, 2, 3]
10 2 3 2
After:  [2, 0, 0, 3]

Before: [2, 2, 1, 2]
9 3 3 3
After:  [2, 2, 1, 0]

Before: [2, 2, 3, 2]
9 3 3 1
After:  [2, 0, 3, 2]

Before: [3, 3, 2, 1]
6 3 2 0
After:  [1, 3, 2, 1]

Before: [2, 3, 2, 2]
11 2 3 3
After:  [2, 3, 2, 2]

Before: [0, 1, 3, 0]
12 1 3 2
After:  [0, 1, 1, 0]

Before: [3, 2, 2, 2]
8 3 2 1
After:  [3, 0, 2, 2]

Before: [1, 1, 2, 2]
11 2 3 2
After:  [1, 1, 2, 2]

Before: [2, 1, 2, 1]
14 1 3 0
After:  [1, 1, 2, 1]

Before: [1, 1, 2, 3]
1 1 2 3
After:  [1, 1, 2, 0]

Before: [0, 2, 0, 1]
7 0 0 3
After:  [0, 2, 0, 0]

Before: [1, 0, 2, 2]
3 0 2 2
After:  [1, 0, 0, 2]

Before: [2, 1, 3, 0]
5 3 2 1
After:  [2, 1, 3, 0]

Before: [2, 3, 2, 3]
10 2 3 0
After:  [0, 3, 2, 3]

Before: [1, 1, 3, 0]
5 3 2 0
After:  [1, 1, 3, 0]

Before: [2, 1, 1, 0]
13 0 3 1
After:  [2, 1, 1, 0]

Before: [2, 1, 2, 0]
12 1 3 1
After:  [2, 1, 2, 0]

Before: [0, 3, 2, 2]
11 2 3 0
After:  [2, 3, 2, 2]

Before: [3, 2, 1, 2]
9 3 3 3
After:  [3, 2, 1, 0]

Before: [2, 3, 2, 0]
13 0 3 2
After:  [2, 3, 1, 0]

Before: [3, 1, 3, 3]
10 1 3 0
After:  [0, 1, 3, 3]

Before: [3, 0, 2, 1]
6 3 2 1
After:  [3, 1, 2, 1]

Before: [2, 2, 3, 0]
13 0 3 2
After:  [2, 2, 1, 0]

Before: [3, 1, 3, 0]
5 3 2 1
After:  [3, 1, 3, 0]

Before: [0, 2, 2, 2]
7 0 0 3
After:  [0, 2, 2, 0]

Before: [1, 0, 2, 1]
6 3 2 0
After:  [1, 0, 2, 1]

Before: [0, 1, 2, 1]
6 3 2 2
After:  [0, 1, 1, 1]

Before: [2, 2, 1, 3]
10 1 3 3
After:  [2, 2, 1, 0]

Before: [0, 1, 0, 2]
15 1 3 1
After:  [0, 0, 0, 2]

Before: [2, 2, 2, 3]
10 2 3 1
After:  [2, 0, 2, 3]

Before: [3, 1, 1, 1]
14 1 3 1
After:  [3, 1, 1, 1]

Before: [2, 1, 2, 3]
1 1 2 1
After:  [2, 0, 2, 3]

Before: [3, 1, 2, 1]
1 1 2 3
After:  [3, 1, 2, 0]

Before: [0, 0, 3, 0]
0 0 3 1
After:  [0, 0, 3, 0]

Before: [1, 1, 1, 0]
12 1 3 0
After:  [1, 1, 1, 0]

Before: [2, 2, 2, 2]
11 2 3 3
After:  [2, 2, 2, 2]

Before: [1, 1, 2, 2]
11 2 3 0
After:  [2, 1, 2, 2]

Before: [2, 1, 0, 0]
12 1 3 0
After:  [1, 1, 0, 0]

Before: [2, 1, 2, 2]
8 3 2 0
After:  [0, 1, 2, 2]

Before: [2, 2, 0, 0]
13 0 3 2
After:  [2, 2, 1, 0]

Before: [3, 2, 3, 3]
4 3 2 1
After:  [3, 1, 3, 3]

Before: [0, 1, 1, 0]
2 2 1 1
After:  [0, 2, 1, 0]

Before: [3, 2, 0, 3]
4 3 0 1
After:  [3, 1, 0, 3]

Before: [3, 3, 3, 3]
4 3 0 2
After:  [3, 3, 1, 3]

Before: [3, 1, 0, 2]
8 0 2 1
After:  [3, 1, 0, 2]

Before: [2, 1, 0, 0]
12 1 3 3
After:  [2, 1, 0, 1]

Before: [0, 3, 2, 0]
7 0 0 2
After:  [0, 3, 0, 0]

Before: [3, 0, 2, 2]
11 2 3 2
After:  [3, 0, 2, 2]

Before: [1, 2, 2, 1]
6 3 2 1
After:  [1, 1, 2, 1]

Before: [1, 1, 1, 0]
12 1 3 3
After:  [1, 1, 1, 1]

Before: [3, 2, 2, 2]
11 2 3 3
After:  [3, 2, 2, 2]

Before: [0, 1, 2, 2]
7 0 0 0
After:  [0, 1, 2, 2]

Before: [0, 1, 2, 2]
7 0 0 1
After:  [0, 0, 2, 2]

Before: [0, 1, 2, 0]
12 1 3 3
After:  [0, 1, 2, 1]

Before: [2, 0, 3, 0]
5 3 2 3
After:  [2, 0, 3, 1]

Before: [1, 1, 2, 2]
1 1 2 0
After:  [0, 1, 2, 2]

Before: [1, 1, 2, 2]
3 0 2 1
After:  [1, 0, 2, 2]

Before: [3, 0, 3, 3]
4 3 0 1
After:  [3, 1, 3, 3]

Before: [2, 1, 3, 3]
10 1 3 3
After:  [2, 1, 3, 0]

Before: [1, 3, 2, 2]
3 0 2 0
After:  [0, 3, 2, 2]

Before: [3, 2, 2, 1]
6 3 2 0
After:  [1, 2, 2, 1]

Before: [3, 0, 1, 3]
10 2 3 3
After:  [3, 0, 1, 0]

Before: [3, 1, 2, 1]
9 3 3 2
After:  [3, 1, 0, 1]

Before: [2, 2, 3, 3]
4 3 2 0
After:  [1, 2, 3, 3]

Before: [3, 3, 0, 0]
8 0 2 2
After:  [3, 3, 1, 0]

Before: [2, 3, 3, 0]
13 0 3 0
After:  [1, 3, 3, 0]

Before: [1, 2, 2, 3]
3 0 2 1
After:  [1, 0, 2, 3]

Before: [3, 0, 1, 3]
4 3 0 0
After:  [1, 0, 1, 3]

Before: [2, 2, 3, 0]
13 0 3 3
After:  [2, 2, 3, 1]

Before: [2, 3, 0, 2]
5 2 3 2
After:  [2, 3, 1, 2]

Before: [2, 0, 3, 0]
13 0 3 1
After:  [2, 1, 3, 0]`);

let cnt = 0;
let r = checkInst(input[777])
input.forEach( i => {
    let r = checkInst(i)
    if (r.length >= 3) cnt++;
})
cnt;