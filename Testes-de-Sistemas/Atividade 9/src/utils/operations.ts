export const OPERATIONS = {
  "+": sum,
  "-": subtract,
  x: multiply,
  "/": divide,
  "=": equal,
  AC: allClear,
};

export function sum(a: number, b: number) {
  return a + b;
}

export function subtract(a: number, b: number) {
  return a - b;
}

export function multiply(a: number, b: number) {
  return a * b;
}

export function divide(a: number, b: number) {
  return a / b;
}

export function equal(_a: number, b: number) {
  return b;
}

export function allClear() {
  return 0;
}
