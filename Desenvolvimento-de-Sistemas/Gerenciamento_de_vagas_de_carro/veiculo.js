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
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            await apiCadastrarVeiculo(veiculo);
            alert('Veículo cadastrado com sucesso!');
            formVeiculo.reset();
            carregarVeiculos();
        } catch (error) {
            console.error('Erro ao cadastrar veículo:', error);
            alert('Erro ao cadastrar veículo.');
        }
    });