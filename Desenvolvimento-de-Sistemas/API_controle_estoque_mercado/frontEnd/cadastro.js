import { apiCadastrarUsuario } from './script/api.js';

document.getElementById('formCadastro').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novoUsuario = {
        nome: document.getElementById('Nome').value.trim(),
        endereco: document.getElementById('Endereco').value.trim(),
        email: document.getElementById('Email').value.trim(),
        senha: document.getElementById('Senha').value.trim()
    };

    console.log(novoUsuario);

    try {
        await apiCadastrarUsuario(novoUsuario);
        alert('Usuário cadastrado com sucesso!');
        document.getElementById('mensagemSucesso').style.display = 'block';
        document.getElementById('mensagemErro').style.display = 'none';
        setTimeout(() => window.location.href = './login.html', 2000);
    } catch (error) {
        document.getElementById('mensagemErro').style.display = 'block';
        document.getElementById('mensagemSucesso').style.display = 'none';
    }
});
