const div = require("./div");

test("Dividir dois números positivos", () =>{
    expect(div(1, 2)).toBe(0.5);
})

test("Dividir dois números negativos", () =>{
    expect(div(-1, -2)).toBe(0.5);
})
