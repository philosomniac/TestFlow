import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { TestStep } from '../test-step';
import { TestStepComponent } from '../test-step/test-step.component';
import { StepService } from '../step.service';
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

  constructor(private stepService: StepService) {}

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
  removeLines(): void {
    for (const line of this.lines) {
      line.remove();
    }
    this.lines = [];
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
      this.removeLines();

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

  getSteps(): void {
    this.steps = this.stepService.getSteps();
  }

  ngAfterViewInit(): void {
    this.drawLines();
  }

  ngOnDestroy(): void {
    this.removeLines();
  }

  ngOnInit(): void {
    this.getSteps();
  }
}
