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
    const administradorId = row.getAttribute('data-id');
    const body = document.querySelector('.modal-detalhes-body');

    fetch(`http://localhost:8080/administradores/${administradorId}`)
        .then(response => response.json())
        .then(administrador => {
            const btnExcluir = document.querySelector('#yes');

            btnExcluir.onclick = function () {
                excluirAdministrador(administradorId);
            };

            body.innerHTML = `
            <div class="modal-info-container">
                <div class="adm-info">
                    <dl class="lista-detalhes">
                        <dt>ID</dt>
                        <dd>${administrador.id}</dd>
                        <dt>Nome</dt>
                        <dd>${administrador.nome}</dd>
                        <dt>E-mail</dt>
                        <dd>${administrador.email}</dd>
                        <dt>Telefone</dt>
                        <dd>${administrador.telefone}</dd>
                        <dt>CPF</dt>
                        <dd>${administrador.cpf}</dd>
                        <br>
                        <dt>Endereço(s) cadastrado(s):</dt>
                        ${administrador.enderecosDTO.map(endereco => `
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
    .catch(error => console.error('Erro ao obter detalhes do administrador:', error));
}