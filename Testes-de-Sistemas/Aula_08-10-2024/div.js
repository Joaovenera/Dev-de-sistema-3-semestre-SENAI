function div(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Os argumentos devem ser números.");
    }
    if (b === 0) {
        throw new Error("Divisão por zero não é permitida.");
    }
    return a / b;
}

module.exports = div;
