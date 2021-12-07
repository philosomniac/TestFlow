export interface TestStep {
  id: number;
  action: string;
  results: string[];
  previous?: TestStep;
  nextsteps: TestStep[];
  cols?: number;
  rows?: number;
}
