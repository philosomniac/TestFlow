import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTreeComponent } from './test-tree.component';

// import { TestStep } from '../test-step';

describe('TestTreeComponent', () => {
  let component: TestTreeComponent;
  let fixture: ComponentFixture<TestTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestTreeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTreeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    //remove all test steps except the first one
    if (component.steps.length > 1) {
      component.steps.splice(1);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with at least one test step', () => {
    expect(component.steps.length).toBeGreaterThan(0);
  });

  it('should add a test step when addStep event fires', () => {
    const currentLength = component.steps.length;
    const existingStep = component.steps[0];
    component.addStep(existingStep);
    expect(component.steps.length).toEqual(currentLength + 1);
  });

  it('should remove step when removeStep event fires', () => {
    const lastStep = component.steps[component.steps.length - 1];
    component.removeStep(lastStep);
    expect(component.steps).not.toContain(lastStep);
  });
});
