const baseUrl = "http://localhost:3000";

const headers = { 'Content-Type': 'application/json' };

// Funções de interação com a API

// Usuários
export async function apiCadastrarUsuario(usuario) {
    try {
        const response = await fetch(`${baseUrl}/api/usuario/cadastrar`, {
            method: 'POST',
            headers,
            body: JSON.stringify(usuario)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar usuário');
        if (response.ok) {
            alert("usuario cadastrado")
            document.getElementById("mensagemSucesso").style.display = "block";
            document.getElementById("mensagemErro").style.display = "none";
            return await response.json();
        } else {
            alert("usuario cadastrado")
            document.getElementById("mensagemErro").style.display = "block";
            document.getElementById("mensagemSucesso").style.display = "none";
            throw new Error('Erro ao cadastrar');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
}

export async function apiCadastrarProduto(novoProduto) {
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

export async function apiUsuariosLogin(usuario) {
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
        throw error;
    }
}


export async function apiConsultarVeiculos() {
    try {
        const response = await fetch(`${baseUrl}/api/mercados/1/produtos/2`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Erro ao consultar veículos');
        console.log(response)
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar veículos:', error);
        throw error;
    }
}




// // Função para verificar se a placa já está cadastrada
// export async function verificarPlacaRepetida(placa) {
//     try {
//         const response = await fetch(veiculosEndpoint);
//         const veiculos = await response.json();

//         return veiculos.some(veiculo => veiculo.placa === placa);
//     } catch (error) {
//         console.error("Erro ao verificar placa duplicada:", error);
//         return false; 
//     }
// }

// // Função para cadastrar veículo
// export async function apiCadastrarVeiculo(veiculo) {
//     const response = await fetch(veiculosEndpoint, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(veiculo),
//     });
//     if (!response.ok) {
//         throw new Error("Erro ao cadastrar veículo");
//     }
// }

// export async function apiConsultarVeiculos() {
//     try {
//         const response = await fetch(`${baseUrl}/veiculos`, {
//             method: 'GET',
//             headers
//         });
//         if (!response.ok) throw new Error('Erro ao consultar veículos');
//         return await response.json();
//     } catch (error) {
//         console.error('Erro ao consultar veículos:', error);
//         throw error;
//     }
// }

// export async function apiAtualizarVeiculo(id, veiculoAtualizado) {
//     try {
//         const response = await fetch(`${baseUrl}/veiculos/${id}`, {
//             method: 'PUT',
//             headers,
//             body: JSON.stringify(veiculoAtualizado)
//         });
//         if (!response.ok) throw new Error('Erro ao atualizar veículo');
//         return await response.json();
//     } catch (error) {
//         console.error('Erro ao atualizar veículo:', error);
//         throw error;
//     }
// }

// export async function apiDeletarVeiculo(id) {
//     try {
//         const response = await fetch(`${baseUrl}/veiculos/${id}`, {
//             method: 'DELETE',
//             headers
//         });
//         if (!response.ok) throw new Error('Erro ao deletar veículo');
//     } catch (error) {
//         console.error('Erro ao deletar veículo:', error);
//         throw error;
//     }
// }

// // Vagas
// export async function apiCadastrarVaga(vaga) {
//     try {
//         const response = await fetch(`${baseUrl}/vagas`, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify(vaga)
//         });
//         if (!response.ok) throw new Error('Erro ao cadastrar vaga');
//         return await response.json();
//     } catch (error) {
//         console.error('Erro ao cadastrar vaga:', error);
//         throw error;
//     }
// }

// export async function apiConsultarVagas() {
//     try {
//         const response = await fetch(`${baseUrl}/vagas`, {
//             method: 'GET',
//             headers
//         });
//         if (!response.ok) throw new Error('Erro ao consultar vagas');
//         return await response.json();
//     } catch (error) {
//         console.error('Erro ao consultar vagas:', error);
//         throw error;
//     }
// }

// export async function apiAtualizarVaga(id, vagaAtualizada) {
//     try {
//         const response = await fetch(`${baseUrl}/vagas/${id}`, {
//             method: 'PUT',
//             headers,
//             body: JSON.stringify(vagaAtualizada)
//         });
//         if (!response.ok) throw new Error('Erro ao atualizar vaga');
//         return await response.json();
//     } catch (error) {
//         console.error('Erro ao atualizar vaga:', error);
//         throw error;
//     }
// }

// export async function apiDeletarVaga(id) {
//     try {
//         const response = await fetch(`${baseUrl}/vagas/${id}`, {
//             method: 'DELETE',
//             headers
//         });
//         if (!response.ok) throw new Error('Erro ao deletar vaga');
//     } catch (error) {
//         console.error('Erro ao deletar vaga:', error);
//         throw error;
//     }
// }
