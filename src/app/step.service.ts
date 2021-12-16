import { Injectable } from '@angular/core';
import { TestStep } from './test-step';
import { STEPS } from './mock-steps';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  steps: TestStep[] = [];
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

  addStep(previousStep: TestStep): TestStep {
    const newStep = this.generateNewStep();
    previousStep.nextsteps.push(newStep);
    newStep.previous = previousStep;
    this.steps.push(newStep);
    return newStep;
  }
  clearSteps() {
    // throw new Error('Method not implemented.');
    this.steps = [];
    return this.steps;
  }

  constructor() {
    this.initialize();
  }

  initialize() {
    this.steps = STEPS;
  }

  getSteps(): TestStep[] {
    return this.steps;
  }
}
