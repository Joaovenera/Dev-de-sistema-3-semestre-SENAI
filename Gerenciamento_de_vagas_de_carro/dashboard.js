import { verificarAutenticacao } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacao();

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));
    const welcomeMessage = document.getElementById('welcomeMessage');
    welcomeMessage.textContent = `Bem-vindo(a), ${usuario.nome} ${usuario.sobrenome}!`;

    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    });
});
