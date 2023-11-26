// MODAL DE DETALHES
const Modal = {
    open(){
        // Abrir modal
        //Adicionar a classe active ao modal
        document
            .querySelector('.modal-overlay')
            .classList
            .add('active')
    },
    close(){
        // Fechar modal
        //Remover a classe active do moadal
        document
            .querySelector('.modal-overlay')
            .classList
            .remove('active')
    }
} 

const ModalExcluir = {
    open(){
        // Abrir modal
        //Adicionar a classe active ao modal
        document
            .querySelector('.modal-overlay-delete')
            .classList
            .add('active')
    },
    close(){
        // Fechar modal
        //Remover a classe active do moadal
        document
            .querySelector('.modal-overlay-delete')
            .classList
            .remove('active')
    }
}

// // EXIBIÇÃO DE DETALHES

function exibirDetalhes(row) {
    const consultaId = row.getAttribute('data-id');
    const body = document.querySelector('.modal-detalhes-body');


    // Exemplo de como usar o ID em uma requisição fetch:
    fetch(`http://localhost:8080/consultas/${consultaId}`)
        .then(response => response.json())
        .then(consulta => {
            const btnExcluir = document.querySelector('#yes');

            btnExcluir.onclick = function () {
                cancelarConsulta(consultaId)
            };

            const dateObject = new Date(consulta.data);
            const options = { hour: 'numeric', minute: 'numeric' };

            body.innerHTML = `
            <dl class="lista-detalhes">

            <dt>ID</dt>
            <dd>${consulta.id}</dd>
            <dt>Médico</dt>
            <dd>${consulta.nomeMedico} - ${consulta.especialidade}</dd>
            <dt>Paciente</dt>
            <dd>${consulta.nomePaciente} - ${consulta.cpf}</dd>
            <dt>Data</dt>
            <dd>${dateObject.toLocaleDateString()}<dd>
            <dt>Hora</dt>
            <dd>${dateObject.toLocaleTimeString(undefined, options)}</dd>

        </dl> 
            `
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do paciente:', error);
            window.location.href = '../../error.html'; 
        });

    Modal.open(); // Abra o modal após obter os detalhes
}