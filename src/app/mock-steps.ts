import { TestStep } from './test-step';

// export const STEPS: TestStep[] = generateSteps();

export function generateSteps(): TestStep[] {
  const steps: TestStep[] = [];

  const step: TestStep = {
    id: 1,
    action: 'Do a thing',
    results: ['thing happens', 'another thing happens'],
    nextsteps: [],
    cols: 1,
    rows: 2,
  };

  const step2: TestStep = {
    id: 2,
    action: 'Do another thing',
    results: ['results occur'],
    previous: step,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };

  step.nextsteps.push(step2);

  const step3: TestStep = {
    id: 3,
    action: 'Do a third thing',
    results: ['different results occur'],
    previous: step,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };

  step.nextsteps.push(step3);

  const step4: TestStep = {
    id: 4,
    action: 'Do a separate thing',
    results: ['something else happens'],
    previous: step2,
    nextsteps: [],
    cols: 1,
    rows: 1,
  };

  step2.nextsteps.push(step4);

  steps.push(step, step2, step3, step4);

  return [...steps];
}
