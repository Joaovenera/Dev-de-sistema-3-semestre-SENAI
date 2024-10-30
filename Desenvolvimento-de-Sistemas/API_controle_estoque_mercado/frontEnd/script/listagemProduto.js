async function carregarItens() {
    tabelaVeiculos.innerHTML = '';
    try {
        const Item = await apiConsultarItens();
        const ItensUsuario = Item.filter(v => v.proprietario === usuario.email);

        ItensUsuario.forEach(Item => {
            const row = tabelaItens.insertRow();

            row.insertCell(0).textContent = Item.Nome;
            row.insertCell(1).textContent = Item.Descrição;
            row.insertCell(2).textContent = Item.Preço;
            row.insertCell(3).textContent = Item.Estoque;

            const acoesCell = row.insertCell(3);
            const btnEditar = document.createElement('button');
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => editarItens(Item));
            const btnDeletar = document.createElement('button');
            btnDeletar.textContent = 'Deletar';
            btnDeletar.addEventListener('click', () => deletarItens(Item._id));

            acoesCell.appendChild(btnEditar);
            acoesCell.appendChild(btnDeletar);
        });
    } catch (error) {
        console.error('Erro ao carregar Item:', error);
        alert('Erro ao carregar Item.');
    }
}

async function editarItens(Item) {
    const novoModelo = prompt('Digite o nova Descrição:', Item.modelo);
    const novaCor = prompt('Digite a novo preço:', Item.cor);

    if (novoModelo && novaCor) {
        Item.modelo = novoModelo.trim();
        Item.cor = novaCor.trim();

        try {
            await apiAtualizarVeiculo(Item._id, Item);
            alert('Item atualizado com sucesso!');
            carregarItens();
        } catch (error) {
            console.error('Erro ao atualizar Item:', error);
            alert('Erro ao atualizar Item.');
        }
    }
}

async function deletarItens(id) {
    if (confirm('Tem certeza que deseja deletar este Item?')) {
        try {
            await deletarItens(id);
            alert('Item deletado com sucesso!');
            carregarItens();
        } catch (error) {
            console.error('Erro ao deletar Item:', error);
            alert('Erro ao deletar Item.');
        }
    }
}


carregarItens();