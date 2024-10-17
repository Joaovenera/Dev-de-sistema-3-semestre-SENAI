const div = require("./div");

// Testes Simples
test("Dividir dois números positivos", () => {
    expect(div(4, 2)).toBe(2);
    expect(div(1, 2)).toBe(0.5);
});

test("Dividir dois números negativos", () => {
    expect(div(-4, -2)).toBe(2);
    expect(div(-1, -2)).toBe(0.5);
});

test("Dividir número positivo por número negativo", () => {
    expect(div(4, -2)).toBe(-2);
    expect(div(-4, 2)).toBe(-2);
});

test("Dividir por zero lança erro", () => {
    expect(() => div(4, 0)).toThrow("Divisão por zero não é permitida.");
    expect(() => div(-4, 0)).toThrow("Divisão por zero não é permitida.");
});

// Testes Limite
test("Dividir números grandes", () => {
    expect(div(1000000000, 1000)).toBe(1000000);
});

test("Dividir números decimais", () => {
    expect(div(0.5, 0.2)).toBeCloseTo(2.5, 10);
    expect(div(1.23, 0.3)).toBeCloseTo(4.1, 10);
});

// Testes Erro
test("Dividir valores não numéricos", () => {
    expect(() => div("a", 3)).toThrow("Os argumentos devem ser números.");
    expect(() => div(3, "b")).toThrow("Os argumentos devem ser números.");
    expect(() => div("a", "b")).toThrow("Os argumentos devem ser números.");
});
