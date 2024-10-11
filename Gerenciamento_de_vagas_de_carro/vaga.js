import { verificarAutenticacao } from './auth.js';
import { apiCadastrarVaga, apiConsultarVagas, apiDeletarVaga, apiConsultarVeiculos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    verificarAutenticacao();

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    const formVaga = document.getElementById('formVaga');
    const selectVeiculo = document.getElementById('veiculo');
    const selectVaga = document.getElementById('numeroVaga'); 
    const tabelaVagas = document.querySelector('#tabelaVagas tbody');

    formVaga.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const vaga = {
            numero: selectVaga.value,
            bloco: document.getElementById('blocoApartamento').value.trim(),
            apartamento: document.getElementById('numeroApartamento').value.trim(),
            veiculo: selectVeiculo.value
        };
    
        try {
            const vagas = await apiConsultarVagas();
    
            // Verifica se o veículo já está associado a alguma vaga
            const veiculoJaReservado = vagas.some(v => v.veiculo === vaga.veiculo);
            if (veiculoJaReservado) {
                alert('Erro: Este veículo já reservou uma vaga.');
                return;
            }
    
            // Verifica se a vaga já está ocupada
            const vagaOcupada = vagas.some(v => v.numero === vaga.numero && v.veiculo);
            if (vagaOcupada) {
                alert('Erro: Esta vaga já está ocupada.');
                return;
            }
    
            // Cadastrar a vaga
            await apiCadastrarVaga(vaga);
            alert('Vaga reservada com sucesso!');
            formVaga.reset();
            carregarVagas();
        } catch (error) {
            console.error('Erro ao reservar vaga:', error);
            alert('Erro ao reservar vaga.');
        }
    });

    // Função para carregar os veículos do usuário
    async function carregarVeiculosUsuario() {
        try {
            const veiculos = await apiConsultarVeiculos();
            const veiculosUsuario = veiculos.filter(v => v.proprietario === usuario.email);

            veiculosUsuario.forEach(veiculo => {
                const option = document.createElement('option');
                option.value = veiculo.placa;
                option.textContent = `${veiculo.modelo} - ${veiculo.placa}`;
                selectVeiculo.appendChild(option);
            });
        } catch (error) {
            console.error('Erro ao carregar veículos:', error);
            alert('Erro ao carregar veículos.');
        }
    }

    // Função para carregar as vagas disponíveis e desabilitar as já reservadas
    async function carregarVagasDisponiveis() {
        selectVaga.innerHTML = ''; 
        for (let i = 1; i <= 20; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Vaga ${i}`;
            selectVaga.appendChild(option);
        }

        try {
            const vagas = await apiConsultarVagas();

            vagas.forEach(vaga => {
                const vagaReservada = document.querySelector(`#numeroVaga option[value="${vaga.numero}"]`);
                if (vagaReservada) {
                    vagaReservada.disabled = true; // Desabilita a vaga já reservada
                }
            });
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
            alert('Erro ao carregar vagas.');
        }
    }

    // Função para carregar as vagas na tabela
    async function carregarVagas() {
        tabelaVagas.innerHTML = '';
        try {
            const vagas = await apiConsultarVagas();
            const vagasUsuario = vagas; 

            console.log(vagas); 

            vagasUsuario.forEach(vaga => {
                const row = tabelaVagas.insertRow();
                row.insertCell(0).textContent = `Vaga ${vaga.numero}`;
                row.insertCell(1).textContent = vaga.veiculo || 'Sem veículo'; 
                row.insertCell(2).textContent = vaga.apartamento;
                row.insertCell(3).textContent = vaga.bloco;
            
                const acoesCell = row.insertCell(4);
                const btnDeletar = document.createElement('button');
                btnDeletar.textContent = 'Deletar';
                btnDeletar.addEventListener('click', () => deletarVaga(vaga._id));
                acoesCell.appendChild(btnDeletar);
            });
        } catch (error) {
            console.error('Erro ao carregar vagas:', error);
            alert('Erro ao carregar vagas.');
        }
    }

    async function deletarVaga(id) {
        if (confirm('Tem certeza que deseja deletar esta vaga?')) {
            try {
                await apiDeletarVaga(id);
                alert('Vaga deletada com sucesso!');
                carregarVagas();
                carregarVagasDisponiveis();
            } catch (error) {
                console.error('Erro ao deletar vaga:', error);
                alert('Erro ao deletar vaga.');
            }
        }
    }


    carregarVeiculosUsuario();
    carregarVagasDisponiveis();
    carregarVagas();
});
