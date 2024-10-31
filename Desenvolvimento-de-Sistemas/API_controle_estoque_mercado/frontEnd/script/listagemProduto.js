// Carrega os itens do usuário e exibe na tabela
async function carregarItens() {
    const tabelaItens = document.getElementById('corpoTabela');
    tabelaItens.innerHTML = ''; // Limpa a tabela para nova atualização
    try {
        const itemData = await apiConsultarItens(); // Requisição para consultar itens
        const itensUsuario = itemData.filter(item => item.proprietario === usuario.email);

        itensUsuario.forEach(item => {
            const row = tabelaItens.insertRow();

            row.insertCell(0).textContent = item.Nome;
            row.insertCell(1).textContent = item.Descrição;
            row.insertCell(2).textContent = item.Preço;
            row.insertCell(3).textContent = item.Estoque;

            // Coluna de ações (Editar e Deletar)
            const acoesCell = row.insertCell(4);
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => editarItens(item));

            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = 'Deletar';
            btnDeletar.addEventListener('click', () => deletarItens(item._id));

            acoesCell.appendChild(btnEditar);
            acoesCell.appendChild(btnDeletar);
        });
    } catch (error) {
        console.error('Erro ao carregar itens:', error);
        alert('Erro ao carregar itens.');
    }
}

// Função para editar um item
async function editarItens(item) {
    const novaDescricao = prompt('Digite a nova Descrição:', item.Descrição);
    const novoPreco = prompt('Digite o novo Preço:', item.Preço);

    if (novaDescricao && novoPreco) {
        item.Descrição = novaDescricao.trim();
        item.Preço = novoPreco.trim();

        try {
            await apiAtualizarVItens(item._id, item);
            alert('Item atualizado com sucesso!');
            carregarItens(); // Recarrega os itens após a atualização
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            alert('Erro ao atualizar item.');
        }
    }
}

// Função para deletar um item
async function deletarItens(id) {
    if (confirm('Tem certeza que deseja deletar este item?')) {
        try {
            await apiDeletarItens(id); // Chamada à API para deletar o item
            alert('Item deletado com sucesso!');
            carregarItens(); // Recarrega os itens após deletar
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            alert('Erro ao deletar item.');
        }
    }
}

// Função para atualizar produtos diretamente da API
async function atualizarProdutos() {
    try {
        const response = await fetch('URL_DA_SUA_API/produtos'); // Substitua pela URL da API
        const produtos = await response.json(); // Converte para JSON

        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = ''; // Limpa a tabela antes de inserir novos dados

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.preco}</td>
                <td>${produto.estoque}</td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Carrega itens ao iniciar a página
carregarItens();



// Podemos combinar o código em uma única estrutura, onde as funções carregarItens, editarItens, deletarItens, e atualizarProdutosinteração de maneira organizada. Aqui está o código consolidado e organizado:

// carregarItens: Carregue uma lista de itens e exiba na tabela.
// editarItens: permite editar um item e atualizar a API.
// deletarItens: Exclua o item da API e atualize a tabela.
// atualizarProdutos: Atualiza a lista com dados da API.


// Explicação das Funções
// carregarItens: Executa a requisição para carregar os itens do usuário, preencher a tabela com os dados e adicionar botões de "Editar" e "Excluir".
// editarItens: Abre prompts para atualizar a descrição e o preço, depois faz a requisição de atualização na API.
// deletarItens: Confirme com o usuário antes de excluir e chame a função para remover o item da API.
// atualizarProdutos: Realiza uma requisição para a API com os produtos e exibe-os na tabela.
// Essa estrutura está configurada para que você apenas atualize as URLs das APIs e eventualmente referências de propriedades, se necessário.
