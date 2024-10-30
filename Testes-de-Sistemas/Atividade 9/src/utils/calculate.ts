import { OPERATIONS } from "./operations";

export function calculate(
  buttonName: string,
  accumulator: string,
  displayNumber: string,
) {
  const operation = OPERATIONS[buttonName as keyof typeof OPERATIONS];
  const a = Number(accumulator);
  const b = Number(displayNumber);
  
  return String(operation(a, b));
}
