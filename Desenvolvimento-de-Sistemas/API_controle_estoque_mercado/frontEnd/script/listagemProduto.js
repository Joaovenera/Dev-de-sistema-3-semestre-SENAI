const apiUrl = 'http://localhost:3000/api/mercados/1/produtos';
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function atualizarProdutos() {
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ''; 

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos. Código: ' + response.status);
        }

        const produtos = await response.json();

        // Preenche a tabela com os produtos
        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.id}</td> <!-- Coluna para ID -->
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidade}</td>
                <td>
                    <button type="button" onclick="editarItens(${produto.id})">Editar</button>
                    <br>
                    <button type="button" onclick="deletarItem(${produto.id})">Excluir</button> <!-- Botão de excluir -->
                </td>
            `;
            corpoTabela.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao atualizar produtos:', error);
        alert('Erro ao carregar produtos.');
    }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function editarItens(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);

        if (!response.ok) {
            throw new Error('Erro ao carregar produto. Código: ' + response.status);
        }

        const item = await response.json(); 

        // Coleta novos dados
        const novoNome = prompt('Digite o novo Nome:', item.nome);
        const novaDescricao = prompt('Digite a nova Descrição:', item.descricao);
        const novoPreco = prompt('Digite o novo Preço:', item.preco);
        const novaQuantidade = prompt('Digite a nova Quantidade:', item.quantidade);

        // Verifica se os campos não são nulos e estão preenchidos
        if (
            novoNome !== null && novoNome.trim() !== "" &&
            novaDescricao !== null && novaDescricao.trim() !== "" &&
            novoPreco !== null && novoPreco.trim() !== "" &&
            novaQuantidade !== null && novaQuantidade.trim() !== ""
        ) {
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
                body: JSON.stringify(item), 
            });

            if (!updateResponse.ok) {
                const errorMessage = await updateResponse.text(); 
                throw new Error('Erro ao atualizar o produto. Código: ' + updateResponse.status + ' Mensagem: ' + errorMessage);
            }

            alert('Item atualizado com sucesso!');
            atualizarProdutos(); 
        } else {
            alert('Por favor, preencha todos os campos obrigatórios.');
        }
    } catch (error) {
        console.error('Erro ao editar item:', error);
        alert('Erro ao atualizar item: ' + error.message);
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function deletarItem(id) {
    if (confirm('Você tem certeza que deseja excluir este item?')) { 
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar o produto. Código: ' + response.status);
            }

            alert('Item excluído com sucesso!');
            atualizarProdutos(); 
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            alert('Erro ao excluir item: ' + error.message);
        }
    }
}


atualizarProdutos();

