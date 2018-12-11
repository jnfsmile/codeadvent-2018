const utInput = parseInput(`Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`);

function parseInput(input) {
  const deps = new Map();
  const followers = new Map();
  let steps = new Set();
  let step1 = input
    .replace(/ can begin.|must be finished before step /g, "")
    .split("\n")
    .map(x => x.split(" "));
  step1.forEach(el => {
    steps.add(el[1]);
    steps.add(el[2]);
    if (followers.has(el[1])) {
      followers.get(el[1]).push(el[2]);
    } else {
      followers.set(el[1], [el[2]]);
    }
    deps.set(el[2], (deps.has(el[2]) ? deps.get(el[2]) : "") + el[1]);
  });
  steps = [...steps].sort();
  return { steps, deps, followers };
}

const ut1 = (ipt => nextStep(ipt))(utInput);
assert(ut1 === "C");
const ut2 = ((ipt, step) => doStep(ipt, step))(utInput, ut1);
assert(!ut2.steps.includes(ut1));
assert(ut2.deps.get("A") === "");
assert(ut2.deps.get("F") === "");

const ut3 = (ipt => doAll(ipt))(utInput);
assert(ut3 === "CABDFE");

function doAll(data) {
    let stepsDone = ""
    let steps = data.steps.slice()
    let deps = new Map(data.deps)
    let i=2
    while(steps.length>0){
        let next =nextStep({steps, deps, followers:data.followers})
        stepsDone += next;
         ({steps, deps}) = doStep({steps, deps, followers:data.followers}, next)
    }
    return stepsDone
}

function doStep(data, step) {
  let stepIndex = data.steps.indexOf(step);
  const steps =
    data.steps.slice(0, stepIndex).concat( data.steps.slice(stepIndex + 1))
  const followers = data.followers;
  const deps = new Map(data.deps);
  if (followers.has(step)) {
      followers.get(step).forEach(el => {
        deps.set(el, deps.get(el).replace(step, ""));
        });
    }
  return { steps, deps, followers };
}
function nextStep(data) {
  const steps = data.steps;
  for (let i = 0; i < steps.length; i++) {
    if (!data.deps.has(steps[i]) || data.deps.get(steps[i]) === "")
      return steps[i];
  }
}

const input = parseInput(`Step V must be finished before step H can begin.
Step U must be finished before step R can begin.
Step E must be finished before step D can begin.
Step B must be finished before step R can begin.
Step W must be finished before step X can begin.
Step A must be finished before step P can begin.
Step T must be finished before step L can begin.
Step F must be finished before step C can begin.
Step P must be finished before step Y can begin.
Step N must be finished before step G can begin.
Step R must be finished before step S can begin.
Step D must be finished before step C can begin.
Step O must be finished before step K can begin.
Step L must be finished before step J can begin.
Step J must be finished before step H can begin.
Step M must be finished before step I can begin.
Step G must be finished before step K can begin.
Step Z must be finished before step Q can begin.
Step X must be finished before step Q can begin.
Step H must be finished before step I can begin.
Step K must be finished before step Y can begin.
Step Q must be finished before step S can begin.
Step I must be finished before step Y can begin.
Step S must be finished before step Y can begin.
Step C must be finished before step Y can begin.
Step T must be finished before step S can begin.
Step P must be finished before step S can begin.
Step I must be finished before step S can begin.
Step V must be finished before step O can begin.
Step O must be finished before step Q can begin.
Step T must be finished before step R can begin.
Step E must be finished before step J can begin.
Step F must be finished before step S can begin.
Step O must be finished before step H can begin.
Step Z must be finished before step S can begin.
Step D must be finished before step Z can begin.
Step F must be finished before step K can begin.
Step W must be finished before step P can begin.
Step G must be finished before step I can begin.
Step B must be finished before step T can begin.
Step G must be finished before step Y can begin.
Step X must be finished before step S can begin.
Step B must be finished before step K can begin.
Step V must be finished before step A can begin.
Step U must be finished before step N can begin.
Step T must be finished before step P can begin.
Step V must be finished before step D can begin.
Step G must be finished before step X can begin.
Step B must be finished before step D can begin.
Step R must be finished before step J can begin.
Step M must be finished before step Z can begin.
Step U must be finished before step Z can begin.
Step U must be finished before step G can begin.
Step A must be finished before step C can begin.
Step H must be finished before step Q can begin.
Step X must be finished before step K can begin.
Step B must be finished before step S can begin.
Step Q must be finished before step C can begin.
Step Q must be finished before step Y can begin.
Step R must be finished before step I can begin.
Step V must be finished before step Q can begin.
Step A must be finished before step D can begin.
Step D must be finished before step S can begin.
Step K must be finished before step S can begin.
Step G must be finished before step C can begin.
Step D must be finished before step O can begin.
Step R must be finished before step H can begin.
Step K must be finished before step Q can begin.
Step W must be finished before step R can begin.
Step H must be finished before step Y can begin.
Step P must be finished before step J can begin.
Step N must be finished before step Z can begin.
Step J must be finished before step K can begin.
Step W must be finished before step M can begin.
Step A must be finished before step Z can begin.
Step V must be finished before step W can begin.
Step J must be finished before step X can begin.
Step U must be finished before step F can begin.
Step P must be finished before step L can begin.
Step W must be finished before step G can begin.
Step T must be finished before step F can begin.
Step R must be finished before step C can begin.
Step R must be finished before step O can begin.
Step Z must be finished before step C can begin.
Step E must be finished before step S can begin.
Step L must be finished before step I can begin.
Step U must be finished before step O can begin.
Step W must be finished before step K can begin.
Step K must be finished before step I can begin.
Step O must be finished before step M can begin.
Step V must be finished before step M can begin.
Step V must be finished before step Z can begin.
Step A must be finished before step I can begin.
Step F must be finished before step J can begin.
Step F must be finished before step O can begin.
Step M must be finished before step C can begin.
Step Q must be finished before step I can begin.
Step H must be finished before step S can begin.
Step U must be finished before step A can begin.
Step J must be finished before step S can begin.
Step P must be finished before step Z can begin.`)
let res =doAll(input)
res

/*******
 * part 2
 */
const ut4 =  ((i,d,w)=>doAllWithTime(i,d,w))(utInput,0,2)
assert(ut4.stepsDone === "CABFDE")
assert(ut4.time === 15)

function doAllWithTime(data, delay, workerAmount) {
    let stepsDone = ""
    let steps = data.steps.slice()
    let deps = new Map(data.deps)
    let workers =new Map()
    let time = 0
    const delays = new Map()

    while(steps.length>0){
        let next =nextSteps({steps, deps, followers:data.followers})
        let foundWorker = false
        next.forEach(el=>{
            if(!workers.has(el) && workers.size < workerAmount)
            {
                workers.set(el,delay+el.charCodeAt(0)-64)
            }
        })
        let minDelayWorker = {d:Infinity}
        for (let [s, d] of workers) {
            if(d < minDelayWorker.d) minDelayWorker = {s,d}
        }
        //console.log(workers,minDelayWorker, time);
        ({steps, deps}) = doStep({steps, deps, followers:data.followers}, minDelayWorker.s)
        workers.delete(minDelayWorker.s)
        for (let [s, d] of workers) {
            workers.set(s, d-minDelayWorker.d)
        }
        time += minDelayWorker.d
        stepsDone += minDelayWorker.s;
    }

    return {stepsDone, time}
}
function nextSteps(data) {
    const steps = data.steps;
    const available = []
    for (let i = 0; i < steps.length; i++) {
      if (!data.deps.has(steps[i]) || data.deps.get(steps[i]) === "")
        available.push( steps[i]);
    }
    return available
  }
  

  let res2 = doAllWithTime(input, 60, 5)
  res2