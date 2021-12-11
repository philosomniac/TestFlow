let steps = [];

function getRows() {
  //TODO: Rows should be the breadth of the tree
  // return 2;

  let paths = [];

  function getPathsRecursive(step, stack) {
    if (!step) {
      return;
    }

    stack.push(step.id);

    // let paths = [];
    if (!step.nextsteps || step.nextsteps.length === 0) {
      paths.push(Array(...stack));
      // console.log(stack);
      // return paths;
    }

    for (let branch of step.nextsteps) {
      getPathsRecursive(branch, stack);
    }
    stack.pop();
  }

  let firstStep = steps[0];
  getPathsRecursive(firstStep, []);

  return paths;
}
let step1 = { id: "1", nextsteps: [] };
steps.push(step1);
// console.log(getRows());
// getRows();

let step2 = { id: "2", nextsteps: [] };
step1.nextsteps.push(step2);
steps.push(step2);
// console.log(getRows());
// getRows();

let step3 = { id: "3", nextsteps: [] };
step1.nextsteps.push(step3);
steps.push(step3);
// getRows();

let step4 = { id: "4", nextsteps: [] };
step1.nextsteps.push(step4);
steps.push(step4);
// getRows();
// console.log(paths);
console.log(getRows());
