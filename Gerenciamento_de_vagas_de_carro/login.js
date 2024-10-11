import { apiConsultarUsuarios } from './api.js';

document.getElementById('formLogin').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();

    try {
        const usuarios = await apiConsultarUsuarios();
        const usuarioEncontrado = usuarios.find(user => user.email === email && user.senha === senha);

        if (usuarioEncontrado) {
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            window.location.href = 'dashboard.html';
        } else {
            alert('Email ou senha incorretos!');
        }
    } catch (error) {
        console.error('Erro ao efetuar login:', error);
        alert('Erro ao efetuar login.');
    }
});
