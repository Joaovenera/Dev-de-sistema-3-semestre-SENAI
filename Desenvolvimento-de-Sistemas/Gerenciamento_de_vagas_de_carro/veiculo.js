import { verificarAutenticacao } from './auth.js';
import { apiCadastrarVeiculo, apiConsultarVeiculos, apiAtualizarVeiculo, apiDeletarVeiculo, verificarPlacaRepetida } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    verificarAutenticacao();

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    const formVeiculo = document.getElementById('formVeiculo');
    const tabelaVeiculos = document.querySelector('#tabelaVeiculos tbody');

    formVeiculo.addEventListener('submit', async (event) => {
        event.preventDefault();

        const veiculo = {
            placa: document.getElementById('placa').value.trim().toUpperCase(),
            modelo: document.getElementById('modelo').value.trim(),
            cor: document.getElementById('cor').value.trim(),
            proprietario: usuario.email
        };

        try {
            // Verifica se a placa já foi cadastrada
            const placaRepetida = await verificarPlacaRepetida(veiculo.placa);
            if (placaRepetida) {
                alert('Erro: Placa já cadastrada.');
                return; 
            }

            await apiCadastrarVeiculo(veiculo);
            alert('Veículo cadastrado com sucesso!');
            formVeiculo.reset();
            carregarVeiculos();
        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            alert('Erro ao cadastrar veículo.');
        }
    });

    async function carregarVeiculos() {
        tabelaVeiculos.innerHTML = '';
        try {
            const veiculos = await apiConsultarVeiculos();
            const veiculosUsuario = veiculos.filter(v => v.proprietario === usuario.email);

            veiculosUsuario.forEach(veiculo => {
                const row = tabelaVeiculos.insertRow();

                row.insertCell(0).textContent = veiculo.placa;
                row.insertCell(1).textContent = veiculo.modelo;
                row.insertCell(2).textContent = veiculo.cor;

                const acoesCell = row.insertCell(3);
                const btnEditar = document.createElement('button');
                btnEditar.textContent = 'Editar';
                btnEditar.addEventListener('click', () => editarVeiculo(veiculo));
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = 'Deletar';
                btnDeletar.addEventListener('click', () => deletarVeiculo(veiculo._id));

                acoesCell.appendChild(btnEditar);
                acoesCell.appendChild(btnDeletar);
            });
        } catch (error) {
            console.error('Erro ao carregar veículos:', error);
            alert('Erro ao carregar veículos.');
        }
    }

    async function editarVeiculo(veiculo) {
        const novoModelo = prompt('Digite o novo modelo:', veiculo.modelo);
        const novaCor = prompt('Digite a nova cor:', veiculo.cor);

        if (novoModelo && novaCor) {
            veiculo.modelo = novoModelo.trim();
            veiculo.cor = novaCor.trim();

            try {
                await apiAtualizarVeiculo(veiculo._id, veiculo);
                alert('Veículo atualizado com sucesso!');
                carregarVeiculos();
            } catch (error) {
                console.error('Erro ao atualizar veículo:', error);
                alert('Erro ao atualizar veículo.');
            }
        }
    }

    async function deletarVeiculo(id) {
        if (confirm('Tem certeza que deseja deletar este veículo?')) {
            try {
                await apiDeletarVeiculo(id);
                alert('Veículo deletado com sucesso!');
                carregarVeiculos();
            } catch (error) {
                console.error('Erro ao deletar veículo:', error);
                alert('Erro ao deletar veículo.');
            }
        }
    }

    
    carregarVeiculos();
});
