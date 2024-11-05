////////////////////////////////////////// Antes era Cadastro ==>

//Importar tudo que é usado:
import { apiCadastrarProduto, apiConsultarProdutos, apiAtualizarProduto, apiExcluirProduto } from './api'; 

// Função para cadastrar produto
async function apiCadastrarProduto(novoProduto) {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/1/produto`, {
            method: 'POST',
            headers,
            body: JSON.stringify(novoProduto)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar produto');
        
        alert("Produto cadastrado com sucesso");
        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        alert("Erro ao cadastrar produto");
        throw error;
    }
}

// Função para atualizar a lista de produtos
async function atualizarProdutos() {
    try {
        const produtos = await apiConsultarProdutos();
        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = ''; // Limpa a tabela

        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.valor}</td>
                <td>${produto.quantidade}</td>
                <td><button onclick="editarProduto('${produto.id}')">Editar</button></td>
            `;
            corpoTabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
    }
}

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
        atualizarProdutos(); // Atualiza a lista de produtos após o cadastro
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
    }
});

// Função para consultar produtos (novidade)
export async function apiConsultarProdutos() {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/1/produto`);
        if (!response.ok) throw new Error('Erro ao consultar produtos');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar produtos:', error);
        throw error;
    }
}

// Chama a função para atualizar a lista de produtos ao carregar a página
atualizarProdutos();

////////////////////////////////////////// Antes era Listagem ==>

const apiUrl = 'http://localhost:3000/api/mercados/1/produtos';

async function atualizarProdutos() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ''; // Limpa a tabela antes de atualizar

    try {
        // Faz a requisição à API para obter os produtos
        const response = await fetch(apiUrl);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos. Código: ' + response.status);
        }

        const produtos = await response.json(); // Converte a resposta para JSON

        // Preenche a tabela com os produtos
        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidade}</td>
                <td><button type="button" onclick="editarItens(${produto.id})">Editar</button></td>
            `;
            corpoTabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
        alert('Erro ao carregar produtos.');
    }
}

// Função de edição do item
async function editarItens(id) {
    try {
        // Faz a requisição à API para obter o produto específico
        const response = await fetch(`${apiUrl}/${id}`);

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao carregar produto. Código: ' + response.status);
        }

        const item = await response.json(); // Converte a resposta para JSON

        const novoNome = prompt('Digite o novo Nome:', item.nome);
        const novaDescricao = prompt('Digite a nova Descrição:', item.descricao);
        const novoPreco = prompt('Digite o novo Preço:', item.preco);
        const novaQuantidade = prompt('Digite a nova Quantidade:', item.quantidade);
        
        if (novoNome !== null && novoNome.trim() !== "" && novaDescricao !== null && novaDescricao.trim() !== "" && novoPreco !== null && novoPreco.trim() !== "" && novaQuantidade !== null && novaQuantidade.trim() !== "") {
            // Atualiza os dados localmente antes de enviar à API
            item.nome = novoNome.trim();
            item.descricao = novaDescricao.trim();
            item.preco = novoPreco.trim();
            item.quantidade = novaQuantidade.trim();

            // Faz a requisição PUT para atualizar o produto no banco de dados
            const updateResponse = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item), // Envia o item atualizado
            });

            // Verifica se a atualização foi bem-sucedida
            if (!updateResponse.ok) {
                throw new Error('Erro ao atualizar o produto. Código: ' + updateResponse.status);
                atualizarProdutos(); // Atualiza a tabela com os novos dados
            }

            alert('Item atualizado com sucesso!');
            atualizarProdutos(); // Atualiza a tabela com os novos dados
        }
    } catch (error) {
        console.error('Erro ao editar item:', error);
        alert('Erro ao atualizar item.');
    }
}

document.getElementById('btnSair').addEventListener('click', function() {
    window.location.href = './login.html'; // Redireciona para a página de login
});

// Chama a função para preencher a tabela ao carregar
atualizarProdutos();
