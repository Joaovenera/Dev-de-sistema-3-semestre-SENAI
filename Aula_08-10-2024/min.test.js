const min = require("./min");

test("Subtrair dois números positivos", () =>{
    expect(min(1, 2)).toBe(-1);
})

test(" Subtrair dois números negativos", () =>{
    expect(min(-1, -2)).toBe(1);
})



