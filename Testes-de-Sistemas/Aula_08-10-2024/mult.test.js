const mult = require("./mult");

// Testes de Casos Simples
test("multiplicar dois números positivos", () => {
    expect(mult(2, 3)).toBe(6);
    expect(mult(5, 5)).toBe(25);
});

test("multiplicar dois números negativos", () => {
    expect(mult(-2, -3)).toBe(6);
    expect(mult(-5, -5)).toBe(25);
});

test("multiplicar número positivo por número negativo", () => {
    expect(mult(2, -3)).toBe(-6);
    expect(mult(-2, 3)).toBe(-6);
});

test("multiplicar qualquer número por zero", () => {
    expect(mult(0, 5)).toBe(0);
    expect(mult(5, 0)).toBe(0);
    expect(mult(0, 0)).toBe(0);
});

// Testes de Casos Limite
test("multiplicar números grandes", () => {
    expect(mult(1000000, 1000000)).toBe(1000000000000);
});

test("multiplicar números decimais", () => {
    expect(mult(0.1, 0.2)).toBeCloseTo(0.02, 10);
    expect(mult(1.23, 2.34)).toBeCloseTo(2.8782, 10);
});

// Testes de Casos de Erro
test("multiplicar valores não numéricos", () => {
    expect(() => mult("a", 3)).toThrow("Os argumentos devem ser números.");
    expect(() => mult(3, "b")).toThrow("Os argumentos devem ser números.");
    expect(() => mult("a", "b")).toThrow("Os argumentos devem ser números.");
});

test("multiplicar valores nulos ou indefinidos", () => {
    expect(() => mult(null, 3)).toThrow("Os argumentos devem ser números.");
    expect(() => mult(3, undefined)).toThrow("Os argumentos devem ser números.");
    expect(() => mult(undefined, null)).toThrow("Os argumentos devem ser números.");
});
