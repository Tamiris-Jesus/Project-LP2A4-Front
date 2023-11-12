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



function exibirDetalhes(row) {
    const pacienteId = row.getAttribute('data-id');
    const body = document.querySelector('.modal-detalhes-body');
    // Agora você pode usar o pacienteId para fazer a requisição à API e exibir os detalhes no modal
    // ...

    // Exemplo de como usar o ID em uma requisição fetch:
    fetch(`http://localhost:8080/pacientes/${pacienteId}`)
        .then(response => response.json())
        .then(paciente => {
            const btnExcluir = document.querySelector('#yes');

            btnExcluir.onclick = function () {
                excluirPaciente(pacienteId);
            };

            body.innerHTML = `
            <dl class="lista-detalhes">

            <dt>ID</dt>
            <dd>${paciente.id}</dd>
            <dt>Nome</dt>
            <dd>${paciente.nome}</dd>
            <dt>E-mail</dt>
            <dd>${paciente.email}</dd>
            <dt>Telefone</dt>
            <dd>${paciente.telefone}</dd>
            <dt>CPF</dt>
            <dd>${paciente.cpf}</dd>

        </dl> 
            `
        })
        .catch(error => console.error('Erro ao obter detalhes do paciente:', error));

    Modal.open(); // Abra o modal após obter os detalhes
}




