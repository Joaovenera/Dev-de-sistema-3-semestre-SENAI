function sum(a, b) {
    if (isNaN(a) || isNaN(b)) {
        throw new Error("Os argumentos devem ser números.");
    }
    return a + b;
}

module.exports = sum;
