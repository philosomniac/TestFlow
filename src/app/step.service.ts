import { Injectable } from '@angular/core';
import { TestStep } from './test-step';
import { STEPS } from './mock-steps';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  clearSteps() {
    // throw new Error('Method not implemented.');
    this.steps = [];
    return this.steps;
  }
  steps: TestStep[] = [];
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
