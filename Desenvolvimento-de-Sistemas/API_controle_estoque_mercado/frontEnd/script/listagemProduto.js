// Função para editar um item
async function editarItens(item) {
    const novaDescricao = prompt('Digite a nova Descrição:', item.Descrição);
    const novoPreco = prompt('Digite o novo Preço:', item.Preço);
    if (novaDescricao !== null && novaDescricao.trim() !== "" && novoPreco !== null && novoPreco.trim() !== "") {
        item.Descrição = novaDescricao.trim();
        item.Preço = novoPreco.trim();
        try {
            await apiAtualizarVItens(item._id, item);
            alert('Item atualizado com sucesso!');
            carregarItens(); 
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
            await apiDeletarItens(id); 
            alert('Item deletado com sucesso!');
            carregarItens(); 
        } catch (error) {
            console.error('Erro ao deletar item:', error);
            alert('Erro ao deletar item.');
        }
    }
}

// Função para atualizar produtos diretamente da API
async function atualizarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/api/mercados/1/produtos'); 
        
        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const produtos = await response.json(); 
        const corpoTabela = document.getElementById('corpoTabela');
        corpoTabela.innerHTML = '';
        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.preco}</td>
                <td>${produto.quantidade}</td>
            `;
            corpoTabela.appendChild(linha);
        });
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao buscar produtos');
    }
}

atualizarProdutos()// Ao atualizar a pagina recarreca a lista
