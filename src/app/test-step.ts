export interface TestStep {
  action: string;
  results: string[];
  previous?: TestStep;
}
