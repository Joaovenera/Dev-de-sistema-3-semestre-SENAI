const express = require("express");
const conexao = require("./banco.js");
const cors = require('cors')

const server = express();

server.use(cors());
server.use(express.json());

server.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});

server.get("/alunos", (req, res) => {
    const consultaSql = "SELECT * FROM ALUNO";
    conexao.query(consultaSql, (erro, resultado) => {
        if (erro) {
            res.status(500).json({ mensagem: "Erro ao consultar os dados" });
            throw new Error(erro);
        } else {
            res.json(resultado);
        }
    });
});

server.post("/alunos", (req, res) => {
    console.log("Body requisição: ", req.body);

    const id = req.body.id;
    const nome = req.body.nome;
    const matricula = req.body.matricula;

    let insertSql = "INSERT INTO ALUNO (ID, NOME, MATRICULA) VALUES (";
    insertSql = insertSql.concat(id, ", ");
    insertSql = insertSql.concat("\"", nome, "\", ");
    insertSql = insertSql.concat("\"", matricula, "\")");

    conexao.query(insertSql, (erro, resultado) => {
        if (erro) {
            res.status(400).json({ mensagem: erro });
            throw new Error(erro);
        } else {
            res.status(201).json({mensagem: "Aluno cadastrado", resultado: resultado });
        }
    });
});

server.delete("/alunos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const deleteSql = "DELETE FROM ALUNO WHERE ID = " + id;

    conexao.query(deleteSql, (erro, resposta) => {
        if (erro) {
            res.status(500).json({ mensagem: "Erro ao deletar aluno" })
        } else {
            res.status(204).json({ mensagem: "Aluno removido com sucesso" });
        }
    });
});

server.put("/alunos/:id", (req, res) => {
    const idParametro = parseInt(req.params.id);
    const idCorpo = req.body.id;

    if (idParametro != idCorpo) {
        res.status(400).json({ mensagem: "Parâmetro id inválido" });
        return;
    }

    const updateSql = "UPDATE ALUNO "
                    + "SET NOME = '" + req.body.nome + "', "
                    + "MATRICULA = '" + req.body.matricula + "' "
                    + "WHERE ID = " + idParametro;

    conexao.query(updateSql, (erro, resposta) => {
        if (erro) {
            res.status(400).json({ mensagem: "Verifique os dados passados" });
            throw new Error(erro);
        } else {
            res.json({ resposta: resposta });
        }
    });
});