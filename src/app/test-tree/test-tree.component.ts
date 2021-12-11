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
declare var PlainDraggable: any;
// import * as LeaderLine from 'LeaderLine';

@Component({
  selector: 'app-test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.css'],
})
export class TestTreeComponent implements OnInit, AfterViewInit {
  steps: TestStep[] = [];
  lines: any[] = [];
  depth: number = 0;
  breadth: number = 0;
  paths: number[][] = [];
  currentStyles: Record<string, string> = {};

  constructor(private stepService: StepService) {}

  updateState() {
    this.depth = this.getCols();
    this.paths = [];
    this.paths = this.getRows();
    this.breadth = this.paths.length;
    this.drawLines();
    this.setCurrentStyles();
  }

  setCurrentStyles() {
    this.currentStyles = {
      'grid-template-rows': `repeat(${this.breadth}, 1fr)`,
      'grid-template-columns': `repeat(${this.depth}, 1fr)`,
    };
  }

  getCols(): number {
    //TODO: Cols should be the depth of the tree
    function getColsRecursive(step: TestStep) {
      if (!step) {
        return 0;
      }

      if (!step.nextsteps) {
        return 1;
      }

      let depths: number[] = [0];

      for (let branch of step.nextsteps) {
        let depth = getColsRecursive(branch);
        depths.push(depth);
      }
      return 1 + Math.max(...depths);
    }

    let firstStep = this.steps[0];
    return getColsRecursive(firstStep);
  }

  getRows() {
    //TODO: Rows should be the breadth of the tree
    // return 2;
    let paths: number[][] = [];

    function getPathsRecursive(step: TestStep, stack: number[]) {
      if (!step) {
        return;
      }

      stack.push(step.id);

      // let paths = [];
      if (!step.nextsteps || step.nextsteps.length === 0) {
        paths.push(Array(...stack));
      }

      for (let branch of step.nextsteps) {
        getPathsRecursive(branch, stack);
      }
      stack.pop();
    }

    let firstStep = this.steps[0];
    getPathsRecursive(firstStep, []);

    return paths;
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
    this.updateState();
  }

  removeStep(step: TestStep): void {
    for (const existing_step of this.steps) {
      existing_step.nextsteps = existing_step.nextsteps.filter(
        (s) => s.id !== step.id
      );
    }
    step.nextsteps = [];

    this.steps = this.steps.filter((s) => s.id !== step.id);

    this.updateState();
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

  // private repositionLines(lines: any[]): void {
  //   for (let line of lines) {
  //     line.position();
  //   }
  // }

  getSteps(): void {
    this.steps = this.stepService.getSteps();
  }

  ngAfterViewInit(): void {
    this.drawLines();

    // for (const element of this.elements) {
    //   let draggable = new PlainDraggable(element.element.nativeElement);
    //   draggable.containment = {
    //     left: 0,
    //     top: 0,
    //     width: '100%',
    //     height: '100%',
    //   };
    //   draggable.onDrag = this.repositionLines(this.lines);
    //   draggable.oneMove = this.repositionLines(this.lines);
    // }
  }

  ngOnDestroy(): void {
    this.removeLines();
  }

  ngOnInit(): void {
    this.getSteps();
    this.updateState();
  }
}
