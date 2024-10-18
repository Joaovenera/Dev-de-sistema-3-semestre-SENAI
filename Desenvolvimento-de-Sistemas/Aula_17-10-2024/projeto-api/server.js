const express = require("express");
const server = express();

server.use(express.json());
const alunos =[];

server.get('/', (req, res) => {
    console.log('Minha rota GET');
    res.json({mensagem: "https://localhost:3000/"})
});

server.post('/alunos', (req, res) => {
    console.log('Meu cadastro de aluno');
    console.log('Body requisição: ', req.body);    
    //pegar os dados enviados pelo cliente
    const idAluno = req.body.id;
    const nomeAluno = req.body.nome;
    const matriculaAluno = req.body.matricula;

    console.log('Id aluno:', idAluno);
    console.log('Nome aluno', nomeAluno);
    console.log('Matricula aluno', matriculaAluno);
    // Salvar na lista de alunos

    const aluno ={
        id : idAluno,
        nome: nomeAluno,
        matricula: matriculaAluno
    };
    alunos.push(aluno);

    res.json({mensagem: 'Aluno cadastro.'});
});

server.delete('/alunos/:idAluno', (req, res) => {
    //pegar o id  do aluno que será deletado
    const idAluno = req.params.idAluno;
    console.log(idAluno);

    // trmover o usuário da lista
    const indiceAluno = alunos.findIndex(aluno => aluno.id == idAluno);
    if (indiceAluno < 0){
        res.json({mensagem: "Aluno não existe."})
        return;
    }
    alunos.splice(indiceAluno, 1);

    res.json({mensagem: 'Aluno removido com sucesso'});

})

server.get('/alunos', (req, res)=> {
    console.log("Minha consulta de alunos");
    res.json(alunos);
});

server.listen(3000, () =>{
    console.log ('Servidor iniciado na porta 3000');

})