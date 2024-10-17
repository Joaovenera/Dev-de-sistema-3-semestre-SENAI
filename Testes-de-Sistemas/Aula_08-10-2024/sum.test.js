const sum = require("./sum");

// Testes Simples
test("Somar dois números positivos", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(10, 20)).toBe(30);
});

test("Somar dois números negativos", () => {
    expect(sum(-1, -2)).toBe(-3);
    expect(sum(-10, -20)).toBe(-30);
});

test("Somar número positivo com número negativo", () => {
    expect(sum(1, -2)).toBe(-1);
    expect(sum(-1, 2)).toBe(1);
});

// Teste Objetos
test("Atribuição de objetos", () => {
    const data = {one: 1};
    data["two"] = 2;
    expect(data).toEqual({one: 1, two: 2});
});

// Teste a soma de números positivos não seja zero
test("Adicionando números positivos não é zero", () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(sum(a, b)).not.toBe(0);
        }
    }
});

// Testes Limite
test("Somar números grandes", () => {
    expect(sum(1000000000, 1000000000)).toBe(2000000000);
});

test("Somar números decimais", () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 10);
    expect(sum(1.23, 0.77)).toBeCloseTo(2.00, 10);
});

// Testes Erro
test("Somar valores não numéricos", () => {
    expect(() => sum("a", 3)).toThrow("Os argumentos devem ser números.");
    expect(() => sum(3, "b")).toThrow("Os argumentos devem ser números.");
    expect(() => sum("a", "b")).toThrow("Os argumentos devem ser números.");
});
