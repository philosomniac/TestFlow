export interface TestStep {
  action: string;
  results: string[];
  parent?: TestStep;
}
