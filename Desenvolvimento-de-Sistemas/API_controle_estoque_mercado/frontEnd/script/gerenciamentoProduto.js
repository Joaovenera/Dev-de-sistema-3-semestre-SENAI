////////////////////////////////////////// Antes era Cadastro ==>

const apiUrl = 'http://localhost:3000/api/mercados/1/produtos';

// Captura o evento de cadastro do formulário
document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previne o envio padrão do formulário

    const novoProduto = {
        nome: document.getElementById('nome').value.trim(),
        descricao: document.getElementById('descricao').value.trim(),
        valor: document.getElementById('valor').value.trim(),
        quantidade: document.getElementById('quantidade').value.trim()
    };

    try {
        await apiCadastrarProduto(novoProduto);
        apiAtualizarProduto(); // Atualiza a lista de produtos após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
});

document.getElementById('btnSair').addEventListener('click', function() {
    window.location.href = './login.html'; // Redireciona para a página de login
});

// Chama a função para preencher a tabela ao carregar
apiAtualizarProduto();
