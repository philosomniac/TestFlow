import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TestStep } from '../test-step';
import { TestStepComponent } from '../test-step/test-step.component';
// const LeaderLine = require('leader-line');
declare var LeaderLine: any;
// import * as LeaderLine from 'LeaderLine';

@Component({
  selector: 'app-test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.css'],
})
export class TestTreeComponent implements OnInit, AfterViewInit {
  steps: TestStep[] = [];
  lines: any[] = [];

  constructor() {}

  getCols() {
    //TODO: Cols should be the depth of the tree
    return 3;
  }

  getRows() {
    //TODO: Rows should be the breadth of the tree
    return 2;
  }

  addStep(step: TestStep): void {
    if (!step.id) {
      step.id = this.getNextId();
    }
    const previous = step.previous;
    if (previous) {
      const nextsteps = previous.nextsteps;
      previous.nextsteps.push(step);
    }
    this.steps.push(step);
  }
  removeStep(step: TestStep): void {
    for (const step of this.steps) {
      step.nextsteps = step.nextsteps.filter((s) => s.id !== step.id);
    }

    this.steps = this.steps.filter((s) => s.id !== step.id);
    this.drawLines();
  }

  private getNextId(): number {
    return this.steps.length > 0
      ? Math.max(...this.steps.map((step) => step.id)) + 1
      : 1;
  }

  @ViewChildren(TestStepComponent)
  elements!: QueryList<TestStepComponent>;

  private drawLines(delay: number = 0): void {
    setTimeout(() => {
      for (const line of this.lines) {
        line.remove();
      }

      this.lines = [];

      for (const element of this.elements) {
        const child_ids = element.nextsteps.map((step) => step.id);
        for (const id of child_ids) {
          const startElement = element.element.nativeElement;
          const endElement = this.elements.find((e) => e.id === id)?.element
            .nativeElement;
          // let line = ;
          if (startElement && endElement) {
            this.lines.push(new LeaderLine(startElement, endElement));
          }
        }
      }
    }, delay);
  }

  ngAfterViewInit(): void {
    this.drawLines();
  }

  ngOnInit(): void {
    const step: TestStep = {
      id: this.getNextId(),
      action: 'Do a thing',
      results: ['thing happens', 'another thing happens'],
      nextsteps: [],
      cols: 1,
      rows: 2,
    };
    this.addStep(step);

    const step2: TestStep = {
      id: this.getNextId(),
      action: 'Do another thing',
      results: ['results occur'],
      previous: step,
      nextsteps: [],
      cols: 1,
      rows: 1,
    };
    this.addStep(step2);

    const step3: TestStep = {
      id: this.getNextId(),
      action: 'Do a third thing',
      results: ['different results occur'],
      previous: step,
      nextsteps: [],
      cols: 1,
      rows: 1,
    };
    this.addStep(step3);

    const step4: TestStep = {
      id: this.getNextId(),
      action: 'Do a separate thing',
      results: ['something else happens'],
      previous: step2,
      nextsteps: [],
      cols: 1,
      rows: 1,
    };
    this.addStep(step4);
  }
}
