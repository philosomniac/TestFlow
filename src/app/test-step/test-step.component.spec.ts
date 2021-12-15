import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestStepComponent } from './test-step.component';
import { TestStep } from '../test-step';
import { first } from 'rxjs/operators';
import { Component } from '@angular/core';

describe('TestStepComponent', () => {
  let component: TestStepComponent;
  let fixture: ComponentFixture<TestStepComponent>;
  const test_step: TestStep = {
    id: 1,
    action: 'Here is an action',
    results: ['Result 1', 'Result 2'],
    nextsteps: [],
  };

  @Component({ selector: 'mat-card', template: '' })
  class MatCardStub {}

  @Component({ selector: 'mat-card-actions', template: '' })
  class MatActionsStub {}

  @Component({ selector: 'mat-divider', template: '' })
  class MatDividerStub {}

  @Component({ selector: 'mat-card-subtitle', template: '' })
  class MatCardSubtitleStub {}

  @Component({ selector: 'mat-card-title', template: '' })
  class MatCardTitleStub {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TestStepComponent,
        MatCardStub,
        MatActionsStub,
        MatCardSubtitleStub,
        MatCardTitleStub,
        MatDividerStub,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestStepComponent);
    component = fixture.componentInstance;
    component.teststep = test_step;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an action', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addStepEvent with new step', () => {
    component.addStepEvent
      .pipe(first())
      .subscribe((newStep: TestStep) =>
        expect(newStep.action).toEqual('new action')
      );
    component.addStep();
  });

  it('should emit remove event', () => {
    component.removeStepEvent
      .pipe(first())
      .subscribe((removedStep: TestStep) => expect(removedStep.id).toEqual(1));
    component.remove();
  });
});
