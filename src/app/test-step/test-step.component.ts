import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TestStep } from '../test-step';

@Component({
  selector: 'app-test-step',
  templateUrl: './test-step.component.html',
  styleUrls: ['./test-step.component.css'],
})
export class TestStepComponent implements OnInit {
  @Input() teststep?: TestStep;
  textContent = '';
  id: number = 0;
  action: string = '';
  results: string[] = [];
  previous?: TestStep;
  @Output() addStepEvent = new EventEmitter<TestStep>();
  @Output() removeStepEvent = new EventEmitter<TestStep>();

  constructor() {}

  ngOnInit(): void {
    // this.textContent = 'This content is bound to the typescript object';
    if (this.teststep) {
      this.action = this.teststep.action;
      this.results = this.teststep.results;
      this.id = this.teststep.id;
      if (this.teststep.previous) {
        this.previous = this.teststep.previous;
      }
    }
  }

  addStep(): void {
    this.addStepEvent.emit({
      action: 'new action',
      results: [],
      previous: this,
      id: 0,
    });
  }

  remove(): void {
    this.removeStepEvent.emit(this);
  }
}
