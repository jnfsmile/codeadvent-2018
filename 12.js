class BTNode {
  constructor(val, left, right) {
    this.left = left;
    this.right = right;
    this.value = val;
  }
}

class BinaryTree {
  constructor(root) {
    if (root) this.root = root;
    else {
      this.root = new BTNode();
    }
  }

  addKey(str, val, btNode) {
    if (str === "") {
      btNode.value = val;
      return;
    }
    if (!btNode) btNode = this.root;
    if (str[0] === ".") {
      if (!btNode.left) btNode.left = new BTNode();
      this.addKey(str.slice(1), val, btNode.left);
    } else {
      if (!btNode.right) btNode.right = new BTNode();
      this.addKey(str.slice(1), val, btNode.right);
    }
  }

  traverse(str) {
    return this.traverseIn(str, this.root);
  }

  traverseIn(str, btNode) {
    if (!btNode) return ".";
    if (btNode.value) return btNode.value;
    return this.traverseIn(
      str.slice(1),
      str === "" || str[0] === "." ? btNode.left : btNode.right
    );
  }
}

utInput = parseInput(
  `...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`,
  `#..#.#..##......###...###`
);
function parseInput(oRules, oState) {
  let rules = new BinaryTree();
  oRules
    .split("\n")
    .map(r => r.split(" => "))
    .forEach(r => {
      const key = r[0];
      const val = r[1];
      rules.addKey(key, val);
    });
  let state = oState;

  return { rules, state };
}

const ut0 = ((r, s) => r.traverse("...##"))(utInput.rules, utInput.state);
assert(ut0 === "#");
const ut0_2 = ((r, s) => r.traverse("##.##"))(utInput.rules, utInput.state);
assert(ut0_2 === "#");
const ut0_3 = ((r, s) => r.traverse("..###"))(utInput.rules, utInput.state);
assert(ut0_3 === ".");
const ut0_4 = ((r, s) => r.traverse("#####"))(utInput.rules, utInput.state);
assert(ut0_4 === ".");

const ut1 = ((r, s) => nextGeneration(r, s))(utInput.rules, utInput.state);
assert(ut1[0] === ".");
assert(ut1[3] === ".");
assert(ut1[2] === "#");
assert(ut1[6] === "#");
const ut2 = ((r, s) => nextGeneration(r, s))(utInput.rules, ut1);
assert(ut2[0] === ".");
assert(ut2[3] === ".");
assert(ut2[4] === "#");
assert(ut2[9] === "#");
const ut3 = ((r, s, g) => runGenerations(r, s, g))(
  utInput.rules,
  utInput.state,
  20
);
assert(ut3.offset === 40);
assert(ut3.state[ut3.offset] === ".");
assert(ut3.state[ut3.offset - 2] === "#");
assert(ut3.state[ut3.offset + 4] === "#");
assert(ut3.state[ut3.offset + 9] === "#");
assert(ut3.state[ut3.offset + 12] === "#");
const ut4 = ((data, offset) => sumPots(data, offset))(ut3.state, ut3.offset);
assert(ut4 === 325);

function sumPots(state, offset) {
  return state
    .split("")
    .reduce((sum, p, i) => sum + (p === "#" ? i - offset : 0), 0);
}

function runGenerations(rules, state, generations) {
  let currentState = state;
  let offset = generations * 2;

  let cache = new Map();

  for (let i = 0; i < generations; i++) {
    let cacheState = currentState.replace(/^\.+/, "").replace(/\.+$/, "");
    if (cache.has(cacheState)) {
      let cached = cache.get(cacheState);
      let genStep = i - cached.gen;
      if (generations % genStep === cached.gen % genStep) {
        let steps = Math.floor((generations - cached.gen) / genStep);
        let phase =
          currentState.indexOf("#") -
          cached.real.indexOf("#") -
          2 * (i - cached.gen);
        let newOffset = cached.gen * 2 - steps * phase;
        return {
          state: cached.real,
          offset: newOffset
        };
      }
    }
    cache.set(cacheState, { gen: i, real: currentState });
    currentState = nextGeneration(rules, currentState);
  }
  return { state: currentState, offset };
}

function nextGeneration(rules, state) {
  let workingState = "...." + state + "....";
  let newState = "";
  for (let i = 2; i < workingState.length - 2; i++) {
    newState += rules.traverse(workingState.slice(i - 2, i + 3));
  }
  return newState;
}

const input = parseInput(
  `#.... => .
#..## => #
....# => .
...#. => .
...## => #
#.#.# => .
.#... => #
##.#. => .
..#.# => .
.##.# => #
###.# => #
.#.## => .
..... => .
##### => #
###.. => .
##..# => #
#.### => #
#.#.. => .
..### => .
..#.. => .
.#..# => #
.##.. => #
##... => #
.#.#. => #
.###. => #
#..#. => .
####. => .
.#### => #
#.##. => #
##.## => .
..##. => .
#...# => #`,
  `##...#......##......#.####.##.#..#..####.#.######.##..#.####...##....#.#.####.####.#..#.######.##...`
);

let s = runGenerations(input.rules, input.state, 20);
let res = sumPots(s.state, s.offset);
res;

/****************
 * part 2
 */

let s2 = runGenerations(input.rules, input.state, 50000000000);
let res2 = sumPots(s2.state, s2.offset);
res2;
