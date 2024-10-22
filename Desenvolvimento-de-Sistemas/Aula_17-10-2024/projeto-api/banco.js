const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "MATRICULAS"
});

conexao.connect((erro) => {
    if (erro != null) {
        console.log("Erro ao conectar ao banco");
        return;
    }
    console.log("Conectado ao banco");

    const criarTabelaAluno = "CREATE TABLE IF NOT EXISTS ALUNO("
                                + "ID INT UNSIGNED NOT NULL PRIMARY KEY,"
                                + "NOME VARCHAR(255),"
                                + "MATRICULA VARCHAR(255)"
                            + ")";

    conexao.query(criarTabelaAluno, (erro, resultado) => {
        if (erro) {
            throw new Error(erro);
        }
    });
});

module.exports = conexao;