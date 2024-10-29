import { apiCadastrarUsuario } from './script/api.js';

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novoUsuario = {
        email: document.getElementById('Email').value.trim(),
        senha: document.getElementById('Senha').value.trim()
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
