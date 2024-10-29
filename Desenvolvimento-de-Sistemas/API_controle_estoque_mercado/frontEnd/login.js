import { apiConsultarUsuarios } from './script/api.js';

document.getElementById('Login form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usuario = {
        email: document.getElementById('Email').value.trim(),
        senha: document.getElementById('Senha').value.trim()
    };

    try {
        const resposta = await apiConsultarUsuarios(usuario);
        if (resposta) {
            localStorage.setItem('usuarioLogado', JSON.stringify(resposta));
            alert('Login realizado com sucesso!');
            window.location.href = 'dashboard.html';  // Redireciona para a página principal
        } else {
            alert('Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        alert('Erro ao realizar login.');
    }
});
