import { TestStep } from './test-step';

export const STEPS: TestStep[] = generateSteps();

function generateSteps(): TestStep[] {
  const steps: TestStep[] = [];

  function addStep(step: TestStep): void {
    if (!step.id) {
      step.id = getNextId();
    }
    const previous = step.previous;
    if (previous) {
      // const nextsteps = previous.nextsteps;
      previous.nextsteps.push(step);
    }
    steps.push(step);
  }

  function getNextId(): number {
    return steps.length > 0 ? Math.max(...steps.map((step) => step.id)) + 1 : 1;
  }

  const step: TestStep = {
    id: 1,
    action: 'Do a thing',
    results: ['thing happens', 'another thing happens'],
    nextsteps: [],
    cols: 1,
    rows: 2,
  };

  addStep(step);

  const step2: TestStep = {
    id: 2,
    action: 'Do another thing',
    results: ['results occur'],
    previous: step,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };

  addStep(step2);

  const step3: TestStep = {
    id: 3,
    action: 'Do a third thing',
    results: ['different results occur'],
    previous: step,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };
  addStep(step3);

  const step4: TestStep = {
    id: 4,
    action: 'Do a separate thing',
    results: ['something else happens'],
    previous: step2,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };
  addStep(step4);

  return steps;
}
