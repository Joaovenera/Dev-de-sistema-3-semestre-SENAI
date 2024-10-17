import { apiCadastrarUsuario } from './api.js';

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novoUsuario = {
        nome: document.getElementById('nome').value.trim(),
        sobrenome: document.getElementById('sobrenome').value.trim(),
        dataNascimento: document.getElementById('dataNascimento').value,
        email: document.getElementById('email').value.trim(),
        senha: document.getElementById('senha').value.trim()
    };

    try {
        await apiCadastrarUsuario(novoUsuario);
        alert('Usuário cadastrado com sucesso!');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário. Verifique se o email já não está cadastrado.');
    }
});
