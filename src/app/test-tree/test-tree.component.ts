import { Component, OnInit } from '@angular/core';
import { TestStep } from '../test-step';

@Component({
  selector: 'app-test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.css'],
})
export class TestTreeComponent implements OnInit {
  steps: TestStep[] = [];
  constructor() {}

  addStep(step: TestStep): void {
    if (!step.id) {
      step.id = this.getNextId();
    }
    this.steps.push(step);
  }
  removeStep(step: TestStep): void {
    this.steps = this.steps.filter((s) => s.id !== step.id);
  }

  private getNextId(): number {
    return this.steps.length > 0
      ? Math.max(...this.steps.map((step) => step.id)) + 1
      : 1;
  }

  ngOnInit(): void {
    const step: TestStep = {
      id: this.getNextId(),
      action: 'Do a thing',
      results: ['thing happens', 'another thing happens'],
    };
    this.addStep(step);

    const step2: TestStep = {
      id: this.getNextId(),
      action: 'Do another thing',
      results: ['results occur'],
      previous: step,
    };
    this.addStep(step2);
  }
}
