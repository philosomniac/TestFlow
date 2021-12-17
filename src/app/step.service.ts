import { Injectable } from '@angular/core';
import { TestStep } from './test-step';
import { generateSteps } from './mock-steps';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  removeStep(stepToRemove: TestStep) {
    this.steps = this.steps.filter((step) => step !== stepToRemove);

    if (stepToRemove.previous !== undefined) {
      stepToRemove.previous.nextsteps = stepToRemove.previous.nextsteps.filter(
        (step) => step !== stepToRemove
      );
    }

    if (
      stepToRemove.nextsteps !== undefined &&
      stepToRemove.nextsteps.length > 0
    ) {
      for (const step of stepToRemove.nextsteps) {
        this.removeStep(step);
      }
    }
  }
  steps: TestStep[] = [];

  getSteps(): TestStep[] {
    return this.steps;
  }

  addStep(previousStep: TestStep): TestStep {
    const newStep = this.generateNewStep();
    previousStep.nextsteps.push(newStep);
    newStep.previous = previousStep;
    this.steps.push(newStep);
    return newStep;
  }

  clearSteps() {
    this.steps = [];
    return this.steps;
  }

  private generateNewStep(): TestStep {
    return {
      id: this.getNextId(),
      action: '',
      results: [],
      nextsteps: [],
    };
  }

  private getNextId(): number {
    return this.steps.length > 0
      ? Math.max(...this.steps.map((step) => step.id)) + 1
      : 1;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.steps = [];
    this.steps = generateSteps();
  }
}
