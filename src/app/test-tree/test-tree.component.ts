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
    this.steps.push(step);
  }

  ngOnInit(): void {
    const step: TestStep = {
      action: 'Do a thing',
      results: ['thing happens', 'another thing happens'],
    };
    this.addStep(step);

    const step2: TestStep = {
      action: 'Do another thing',
      results: ['results occur'],
      previous: step,
    };
    this.addStep(step2);
  }
}
