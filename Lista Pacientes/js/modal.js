
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

    fetch(`http://localhost:8080/pacientes/${pacienteId}`)
        .then(response => response.json())
        .then(paciente => {
            const btnExcluir = document.querySelector('#yes');
            const btnEditar = document.querySelector('#editar');

            btnExcluir.onclick = function () {
                excluirPaciente(pacienteId);
            };

            btnEditar.onclick = function () {
                window.location.href = `./atualizar.html?id=${pacienteId}`;
            };
            
            body.innerHTML = `
                <div class="modal-info-container">
                    <div class="paciente-info">
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
                    </div>

                    <div class="endereco-info">
                        <dl class="lista-detalhes">
                            <dt>Endereço(s) cadastrado(s):</dt>
                            ${paciente.enderecosDTO.map(endereco => `
                                <dt>Logradouro</dt>
                                <dd>${endereco.logradouro}</dd>
                                <dt>Bairro</dt>
                                <dd>${endereco.bairro}</dd>
                                <dt>CEP</dt>
                                <dd>${endereco.cep}</dd>
                                <dt>Cidade</dt>
                                <dd>${endereco.cidade}</dd>
                                <dt>UF</dt>
                                <dd>${endereco.uf}</dd>
                                <dt>Complemento</dt>
                                <dd>${endereco.complemento}</dd>
                                <dt>Numero</dt>
                                <dd>${endereco.numero}</dd>
                                <hr>
                            `).join('')}
                        </dl>
                    </div>
                </div>
            `;

            Modal.open();
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do paciente:', error);
            window.location.href = '../../error.html'; 
        });
}



