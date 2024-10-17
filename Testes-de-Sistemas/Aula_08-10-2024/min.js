function min(a, b){
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("Os argumentos devem ser números");
    }
    return a - b;
}
module.exports = min;