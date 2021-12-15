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
});
