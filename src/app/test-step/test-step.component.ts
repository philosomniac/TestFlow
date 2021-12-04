import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-step',
  templateUrl: './test-step.component.html',
  styleUrls: ['./test-step.component.css'],
})
export class TestStepComponent implements OnInit {
  textContent = '';

  constructor() {}

  ngOnInit(): void {
    this.textContent = 'This content is bound to the typescript object';
  }
}
