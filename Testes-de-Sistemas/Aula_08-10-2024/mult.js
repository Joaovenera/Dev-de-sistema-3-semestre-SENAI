function mul(a, b) {
    if (a == null || b == null || isNaN(a) || isNaN(b)) {
        throw new Error("Os argumentos devem ser números.");
    }
    return a * b;
}

module.exports = mul;
