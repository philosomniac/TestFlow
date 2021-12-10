import { Injectable } from '@angular/core';
import { TestStep } from './test-step';
import { STEPS } from './mock-steps';

@Injectable({
  providedIn: 'root',
})
export class StepService {
  constructor() {}

  getSteps(): TestStep[] {
    return STEPS;
  }

  // getCols(): number{
  //   function innerGetCols(step: TestStep[]) {

  //   }
  // }
}
