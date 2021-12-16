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

// declare let PlainDraggable: any;
// import * as LeaderLine from 'LeaderLine';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let LeaderLine: any;

@Component({
  selector: 'app-test-tree',
  templateUrl: './test-tree.component.html',
  styleUrls: ['./test-tree.component.css'],
})
export class TestTreeComponent implements OnInit, AfterViewInit {
  steps: TestStep[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lines: any[] = [];
  depth = 0;
  breadth = 0;
  paths: number[][] = [];
  stepgrid: TestStep[][] = [];
  currentStyles: Record<string, string> = {};

  constructor(private stepService: StepService) {}

  addToGrid(step: TestStep, requestedcol: number, requestedrow: number) {
    const col = requestedcol;
    const row = requestedrow;

    // if (this.stepgrid === undefined) {
    //   this.stepgrid = [];
    // }
    // while (this.stepgrid[col][row] !== undefined) {
    //   row++;
    // }

    // // this.stepgrid[col][row] = step;
    // // step.cols = col;
    // step.rows = row;

    return { col: col, row: row };
  }

  clearGrid() {
    this.stepgrid = [];
  }

  updateState() {
    this.depth = this.getCols();
    this.paths = [];
    this.paths = this.getRows();
    this.breadth = this.paths.length;

    this.setCurrentStyles();
    this.clearGrid();
    this.updateStepPositions();
    this.drawLines();
  }

  updateStepPositions() {
    if (this.steps.length < 1) {
      return;
    }
    let currentSteps: TestStep[] = [];
    currentSteps.push(this.steps[0]);
    let nextSteps: TestStep[] = [];
    let currentCol = 1;
    // let currentRow = 1;

    while (currentSteps.length > 0) {
      // for each level of steps
      for (const step of currentSteps) {
        //assign currentCol level
        step.cols = currentCol;
        let requestedRow = 1;
        if (step.previous) {
          if (step.previous.rows) {
            requestedRow = step.previous.rows;
          }
        }
        const position = this.addToGrid(step, currentCol, requestedRow);
        step.styles = {
          'grid-column': `${currentCol}`,
          'grid-row': `${position.row}`,
        };

        //add everything in nextSteps array to next iteration
        for (const nextstep of step.nextsteps) {
          nextSteps.push(nextstep);
        }
      }
      //put everything from nextsteps array into currentSteps array
      currentSteps = [...nextSteps];

      //clear nextsteps array
      nextSteps = [];

      //increment column number
      currentCol++;
    }
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

      const depths: number[] = [0];

      for (const branch of step.nextsteps) {
        const depth = getColsRecursive(branch);
        depths.push(depth);
      }
      return 1 + Math.max(...depths);
    }

    const firstStep = this.steps[0];
    return getColsRecursive(firstStep);
  }

  getRows() {
    //TODO: Rows should be the breadth of the tree
    // return 2;
    const paths: number[][] = [];

    function getPathsRecursive(step: TestStep, stack: number[], row: number) {
      if (!step) {
        return;
      }

      stack.push(step.id);
      step.rows = row;

      if (!step.nextsteps || step.nextsteps.length === 0) {
        paths.push(Array(...stack));
      }

      let currentRow = row;
      for (const branch of step.nextsteps) {
        getPathsRecursive(branch, stack, currentRow);
        currentRow++;
      }
      stack.pop();
    }

    const firstStep = this.steps[0];
    const row = 1;
    getPathsRecursive(firstStep, [], row);

    return paths;
  }

  addStep(step: TestStep): void {
    if (!step.id) {
      step.id = this.getNextId();
    }
    const previous = step.previous;
    if (previous) {
      // const nextsteps = previous.nextsteps;
      previous.nextsteps.push(step);
    }
    this.steps.push(step);
    this.updateState();
  }

  // TODO: show confirmation dialog if more than one step will be removed
  removeStep(step: TestStep): void {
    for (const existing_step of this.steps) {
      existing_step.nextsteps = existing_step.nextsteps.filter(
        (s) => s.id !== step.id
      );
    }

    for (const nextstep of step.nextsteps) {
      this.removeStep(nextstep);
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

  private drawLines(delay = 0): void {
    setTimeout(() => {
      this.removeLines();

      for (const element of this.elements) {
        const child_ids = element.teststep.nextsteps.map((step) => step.id);
        for (const id of child_ids) {
          const startElement = element.element.nativeElement;
          const endElement = this.elements.find((e) => e.teststep.id === id)
            ?.element.nativeElement;
          // let line = ;
          if (startElement && endElement) {
            this.lines.push(
              new LeaderLine(startElement, endElement, {
                startSocket: 'right',
                endSocket: 'left',
                // endSocketGravity: 80,
                // startSocketGravity: 200,
                path: 'grid',
              })
            );
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
