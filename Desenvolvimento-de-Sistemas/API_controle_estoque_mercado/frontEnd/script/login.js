import { apiUsuariosLogin } from './api.js';
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();  // Impede o recarregamento da página
    const usuario = {
        email: document.getElementById('Email').value.trim(),
        senha: document.getElementById('Senha').value.trim()
    };
    try {
        const resposta = await apiUsuariosLogin(usuario);
        console.log('Resposta da API:', resposta);  // Debugging
        if (resposta) {
            localStorage.setItem('usuarioLogado', JSON.stringify(resposta));
            alert('Login realizado com sucesso!');
            window.location.href = './cadastroProdutos.html';
        } else {
            document.getElementById('mensagemErro').style.display = 'block';
        }
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        document.getElementById('mensagemErro').style.display = 'block';
    }
});