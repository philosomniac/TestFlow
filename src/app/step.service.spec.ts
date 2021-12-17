import { TestBed } from '@angular/core/testing';

import { StepService } from './step.service';

describe('StepService', () => {
  let service: StepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return at least one step', () => {
    expect(service.getSteps().length).toBeTruthy();
  });

  it('should have the first step with an action', () => {
    expect(service.getSteps()[0].action).toEqual('Do a thing');
  });

  it('should clear all steps when clearsteps method called', () => {
    service.clearSteps();
    expect(service.getSteps()).toEqual([]);
  });

  it('should add a step when addStep method is called', () => {
    const previousStep = service.getSteps()[0];
    const currentStepCount = service.getSteps().length;
    const newStep = service.addStep(previousStep);
    expect(service.getSteps().length).toEqual(currentStepCount + 1);
    expect(service.getSteps()).toContain(newStep);
  });

  it('should have parent step set child property to contain new step', () => {
    const previousStep = service.getSteps()[0];
    const newStep = service.addStep(previousStep);

    expect(previousStep.nextsteps).toContain(newStep);
  });

  it('should have new child step set parent property', () => {
    const previousStep = service.getSteps()[0];
    const newStep = service.addStep(previousStep);

    expect(newStep.previous).toEqual(previousStep);
  });

  it('should add new steps with a unique id number', () => {
    const previousSteps = service.getSteps();

    for (const step of [...previousSteps]) {
      service.addStep(step);
    }

    const stepids = service.getSteps().map((step) => step.id);
    const stepIdsSet = new Set(stepids);
    expect(stepids.length).toEqual(stepIdsSet.size);
  });

  it('should remove a specific step when the remove step method is called', () => {
    const previousSteps = service.getSteps();
    const testStep = previousSteps[previousSteps.length - 1];
    service.removeStep(testStep);
    expect(service.getSteps()).not.toContain(testStep);
    expect(service.getSteps().map((step) => step.id)).not.toContain(
      testStep.id
    );
  });

  it('should recursively remove all child steps from removed step', () => {
    const step1 = service.getSteps()[0];
    const step2 = step1.nextsteps[0];
    const step3 = step2.nextsteps[0];

    service.removeStep(step1);
    expect(service.getSteps()).not.toContain(step1);
    expect(service.getSteps()).not.toContain(step2);
    expect(service.getSteps()).not.toContain(step3);
  });

  it('should remove references to removed steps from parent step', () => {
    const step1 = service.getSteps()[0];
    const step2 = step1.nextsteps[0];
    // const step3 = step2.nextsteps[0];

    service.removeStep(step2);
    expect(step1.nextsteps).not.toContain(step2);
  });
});
