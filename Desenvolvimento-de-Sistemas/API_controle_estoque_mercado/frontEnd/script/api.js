const id = "6955e9cbaff54de39a9d3ef08ebcfd91";
const baseUrl = "http://localhost:3000";
const veiculosEndpoint = `${baseUrl}/veiculos`; 

const headers = { 'Content-Type': 'application/json' };

// Funções de interação com a API

// Usuários
async function apiCadastrarUsuario(usuario) {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/usuario/cadastrar`, {
            method: 'POST',
            headers,
            body: JSON.stringify(usuario)
        });
        console.log(JSON.stringify(usuario));
        if (!response.ok) throw new Error('Erro ao cadastrar usuário');
        if (response.ok) {
            document.getElementById("mensagemSucesso").style.display = "block";
            document.getElementById("mensagemErro").style.display = "none";
            return await response.json();
        } else {
            document.getElementById("mensagemErro").style.display = "block";
            document.getElementById("mensagemSucesso").style.display = "none";
            throw new Error('Erro ao cadastrar');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

async function apiCadastrarProduto(novoProduto) {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/1/produto`, {
            method: 'POST',
            headers,
            body: JSON.stringify(novoProduto)
        });
        console.log(JSON.stringify(usuario));
        if (!response.ok) throw new Error('Erro ao cadastrar Produto');
        if (response.ok) {
            alert("Produto Cadastrado com sucesso")
            return await response.json();
        } else {
            alert("Erro ao cadastrar Produto")
            throw new Error('Erro ao cadastrar Produto');
        }
    } catch (error) {
        console.error('Erro ao cadastrar Produto:', error);
        throw error;
    }
}

// Função para atualizar a lista de produtos
async function apiAtualizarProduto() {
    const produtos = await apiConsultarProdutos();
    const corpoTabela = document.getElementById('corpoTabela');
    corpoTabela.innerHTML = ''; // Limpa a tabela
    try {

        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.descricao}</td>
                <td>${produto.valor}</td>
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

async function apiUsuariosLogin(usuario) {
    try {
        const response = await fetch(`${baseUrl}/api/usuario/login`, {
            method: 'POST',
            headers,
            body: JSON.stringify(usuario)
        });
        console.log(response)
        if (!response.ok) throw new Error('Erro ao consultar usuário');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar usuário:', error);
    }
}

// Função para consultar produtos (novidade)
async function apiConsultarProdutos() {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/1/produtos`);
        console.log('Erro ao consultar produtos:', response);
        if (!response.ok) throw new Error('Erro ao consultar produtos');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar produtos:', error);
    }
}

// Função de edição do item
async function apiEditarItens(id) {
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
                apiAtualizarProduto(); // Atualiza a tabela com os novos dados
            }

            alert('Item atualizado com sucesso!');
            apiAtualizarProduto(); // Atualiza a tabela com os novos dados
        }
    } catch (error) {
        console.error('Erro ao editar item:', error);
        alert('Erro ao atualizar item.');
    }
}