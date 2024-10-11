function verificaParImpar(n) {
    if (n % 2 === 0) {
        return `${n} é par.`;
    } else {
        return `${n} é ímpar.`;
    }
}

module.exports = { atividade1: verificaParImpar };
