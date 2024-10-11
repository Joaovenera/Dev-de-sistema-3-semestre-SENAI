const id = "6955e9cbaff54de39a9d3ef08ebcfd91";
const baseUrl = "http://localhost:3001";
const veiculosEndpoint = `${baseUrl}/veiculos`; 

const headers = { 'Content-Type': 'application/json' };

// Funções de interação com a API

// Usuários
export async function apiCadastrarUsuario(usuario) {
    try {
        const response = await fetch(`${baseUrl}/usuarios`, {
            method: 'POST',
            headers,
            body: JSON.stringify(usuario)
        });
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

export async function apiConsultarUsuarios() {
    try {
        const response = await fetch(`${baseUrl}/usuarios`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Erro ao consultar usuários');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar usuários:', error);
        throw error;
    }
}

// Função para verificar se a placa já está cadastrada
export async function verificarPlacaRepetida(placa) {
    try {
        const response = await fetch(veiculosEndpoint);
        const veiculos = await response.json();

        return veiculos.some(veiculo => veiculo.placa === placa);
    } catch (error) {
        console.error("Erro ao verificar placa duplicada:", error);
        return false; 
    }
}

// Função para cadastrar veículo
export async function apiCadastrarVeiculo(veiculo) {
    const response = await fetch(veiculosEndpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(veiculo),
    });
    if (!response.ok) {
        throw new Error("Erro ao cadastrar veículo");
    }
}

export async function apiConsultarVeiculos() {
    try {
        const response = await fetch(`${baseUrl}/veiculos`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Erro ao consultar veículos');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar veículos:', error);
        throw error;
    }
}

export async function apiAtualizarVeiculo(id, veiculoAtualizado) {
    try {
        const response = await fetch(`${baseUrl}/veiculos/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(veiculoAtualizado)
        });
        if (!response.ok) throw new Error('Erro ao atualizar veículo');
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar veículo:', error);
        throw error;
    }
}

export async function apiDeletarVeiculo(id) {
    try {
        const response = await fetch(`${baseUrl}/veiculos/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Erro ao deletar veículo');
    } catch (error) {
        console.error('Erro ao deletar veículo:', error);
        throw error;
    }
}

// Vagas
export async function apiCadastrarVaga(vaga) {
    try {
        const response = await fetch(`${baseUrl}/vagas`, {
            method: 'POST',
            headers,
            body: JSON.stringify(vaga)
        });
        if (!response.ok) throw new Error('Erro ao cadastrar vaga');
        return await response.json();
    } catch (error) {
        console.error('Erro ao cadastrar vaga:', error);
        throw error;
    }
}

export async function apiConsultarVagas() {
    try {
        const response = await fetch(`${baseUrl}/vagas`, {
            method: 'GET',
            headers
        });
        if (!response.ok) throw new Error('Erro ao consultar vagas');
        return await response.json();
    } catch (error) {
        console.error('Erro ao consultar vagas:', error);
        throw error;
    }
}

export async function apiAtualizarVaga(id, vagaAtualizada) {
    try {
        const response = await fetch(`${baseUrl}/vagas/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(vagaAtualizada)
        });
        if (!response.ok) throw new Error('Erro ao atualizar vaga');
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar vaga:', error);
        throw error;
    }
}

export async function apiDeletarVaga(id) {
    try {
        const response = await fetch(`${baseUrl}/vagas/${id}`, {
            method: 'DELETE',
            headers
        });
        if (!response.ok) throw new Error('Erro ao deletar vaga');
    } catch (error) {
        console.error('Erro ao deletar vaga:', error);
        throw error;
    }
}
