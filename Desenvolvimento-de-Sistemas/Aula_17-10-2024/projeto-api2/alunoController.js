const fs = require('fs').promises;
const path = './data.txt';

// Função para salvar um aluno no arquivo
async function salvarAluno(aluno) {
    const alunos = await listarAlunos();
    alunos.push(aluno);
    await fs.writeFile(path, JSON.stringify(alunos, null, 2));
}

// Função para listar todos os alunos
async function listarAlunos() {
    try {
        const data = await fs.readFile(path, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Retorna lista vazia se o arquivo não existir ou estiver vazio
    }
}

// Função para atualizar um aluno pelo ID
async function atualizarAluno(alunoAtualizado) {
    const alunos = await listarAlunos();
    const index = alunos.findIndex(aluno => aluno.id === alunoAtualizado.id);

    if (index === -1) {
        return { mensagem: 'Aluno não encontrado.' };
    }

    alunos[index] = alunoAtualizado;
    await fs.writeFile(path, JSON.stringify(alunos, null, 2));
    return { mensagem: 'Aluno atualizado.' };
}

// Função para excluir um aluno pelo ID
async function excluirAluno(id) {
    const alunos = await listarAlunos();
    const novosAlunos = alunos.filter(aluno => aluno.id !== id);

    if (alunos.length === novosAlunos.length) {
        return { mensagem: 'Aluno não encontrado.' };
    }

    await fs.writeFile(path, JSON.stringify(novosAlunos, null, 2));
    return { mensagem: 'Aluno excluído.' };
}

module.exports = { salvarAluno, listarAlunos, atualizarAluno, excluirAluno };
