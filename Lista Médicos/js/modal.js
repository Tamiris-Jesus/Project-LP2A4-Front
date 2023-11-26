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

// EXIBIÇÃO DE DETALHES
function exibirDetalhes(row) {
    const medicoId = row.getAttribute('data-id');
    const body = document.querySelector('.modal-detalhes-body');

    fetch(`http://localhost:8080/medicos/${medicoId}`)
        .then(response => response.json())
        .then(medico => {
            const btnExcluir = document.querySelector('#yes');

            btnExcluir.onclick = function () {
                excluirMedico(medicoId);
            };

            body.innerHTML = `
            <div class="modal-info-container">
                <div class="medico-info">
                    <dl class="lista-detalhes">
                        <dt>ID</dt>
                        <dd>${medico.id}</dd>
                        <dt>Nome</dt>
                        <dd>${medico.nome}</dd>
                        <dt>E-mail</dt>
                        <dd>${medico.email}</dd>
                        <dt>Telefone</dt>
                        <dd>${medico.telefone}</dd>
                        <dt>CRM</dt>
                        <dd>${medico.crm}</dd>
                        <dt>Especialidade</dt>
                        <dd>${medico.especialidade}</dd>
                    </dl>
                </div>

                <div class="endereco-info">
                    <dl class="lista-detalhes">
                        <dt>Endereço(s) cadastrado(s):</dt>
                        ${medico.enderecosDTO.map(endereco => `
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
            console.error('Erro ao obter detalhes do médico:', error);
            window.location.href = '../../error.html'; 
        });
}
