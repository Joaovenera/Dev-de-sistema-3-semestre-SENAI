import { apiCadastrarProduto } from './api.js';

document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novoProduto = {
        nome: document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        valor: document.getElementById('valor').value.trim(),
        quantidade: document.getElementById('quantidade').value.trim()
    };
    console.log(novoProduto);

    try {
        await apiCadastrarProduto(novoProduto);
        //document.getElementById('mensagemSucesso').style.display = 'block';
        //document.getElementById('mensagemErro').style.display = 'none';
        ///setTimeout(() => window.location.href = 'login.html', 2000);
    } catch (error) {
        //document.getElementById('mensagemErro').style.display = 'block';
       // document.getElementById('mensagemSucesso').style.display = 'none';
    }
});
