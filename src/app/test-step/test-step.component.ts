import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TestStep } from '../test-step';

@Component({
  selector: 'app-test-step',
  templateUrl: './test-step.component.html',
  styleUrls: ['./test-step.component.css'],
})
export class TestStepComponent implements OnInit, TestStep {
  @Input() teststep?: TestStep;
  textContent = '';
  id: number = 0;
  action: string = '';
  results: string[] = [];
  previous?: TestStep;
  nextsteps: TestStep[] = [];
  @Output() addStepEvent = new EventEmitter<TestStep>();
  @Output() removeStepEvent = new EventEmitter<TestStep>();
  @ViewChild('stepElement', { read: ElementRef })
  @Output()
  element!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    if (this.teststep) {
      this.action = this.teststep.action;
      this.results = this.teststep.results;
      this.id = this.teststep.id;
      if (this.teststep.previous) {
        this.previous = this.teststep.previous;
      }
      this.nextsteps = this.teststep.nextsteps;
    }
  }

  addStep(): void {
    this.addStepEvent.emit({
      action: 'new action',
      results: [],
      previous: this,
      id: 0,
      nextsteps: [],
    });
  }

  remove(): void {
    this.removeStepEvent.emit(this);
  }
}
