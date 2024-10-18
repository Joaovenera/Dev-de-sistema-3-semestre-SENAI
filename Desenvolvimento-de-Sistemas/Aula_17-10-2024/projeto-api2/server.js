const express = require("express");
const { salvarAluno, listarAlunos, atualizarAluno, excluirAluno } = require("./alunoController");

const server = express();
server.use(express.json());

// Rota principal
server.get('/', (req, res) => {
    console.log('Minha rota GET');
    res.json({ mensagem: "https://localhost:3000/" });
});

// Cadastro de aluno
server.post('/alunos', (req, res) => {
    console.log('Meu cadastro de aluno');
    const aluno = {
        id: req.body.id,
        nome: req.body.nome,
        matricula: req.body.matricula
    };

    salvarAluno(aluno);
    res.json({ mensagem: 'Aluno cadastrado.' });
});

// Consulta de alunos
server.get('/alunos', async (req, res) => {
    console.log("Minha consulta de alunos");
    const alunos = await listarAlunos();
    res.json(alunos);
});

// Atualizar aluno
server.put('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const alunoAtualizado = {
        id: id,
        nome: req.body.nome,
        matricula: req.body.matricula
    };

    const resultado = await atualizarAluno(alunoAtualizado);
    res.json(resultado);
});

// Excluir aluno
server.delete('/alunos/:id', async (req, res) => {
    const { id } = req.params;
    const resultado = await excluirAluno(id);
    res.json(resultado);
});

// Iniciar o servidor
server.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});
