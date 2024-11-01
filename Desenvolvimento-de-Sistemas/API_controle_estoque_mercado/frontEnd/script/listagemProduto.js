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

        const novaDescricao = prompt('Digite a nova Descrição:', item.descricao);
        const novoPreco = prompt('Digite o novo Preço:', item.preco);
        
        if (novaDescricao !== null && novaDescricao.trim() !== "" && novoPreco !== null && novoPreco.trim() !== "") {
            // Atualiza os dados localmente antes de enviar à API
            item.descricao = novaDescricao.trim();
            item.preco = novoPreco.trim();

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
