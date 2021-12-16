import {
  Component,
  Input,
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
export class TestStepComponent {
  @Input()
  teststep!: TestStep;
  @Output() addStepEvent = new EventEmitter<TestStep>();
  @Output() removeStepEvent = new EventEmitter<TestStep>();
  @ViewChild('stepElement', { read: ElementRef })
  @Output()
  element!: ElementRef;
  textContent = '';

  ngOnInit(): void {
    if (this.teststep === undefined) {
      this.teststep = {
        id: 0,
        action: '',
        results: [],
        nextsteps: [],
      };
    }
  }

  addStep(): void {
    this.addStepEvent.emit({
      action: 'new action',
      results: [],
      previous: this.teststep,
      id: 0,
      nextsteps: [],
    });
  }

  remove(): void {
    this.removeStepEvent.emit(this.teststep);
  }
}
