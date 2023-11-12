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
    // Obtém os elementos da linha
    const cells = row.getElementsByTagName('td');

    // Extrai os detalhes do médico da linha
    const nome = cells[0].innerText;
    const email = cells[1].innerText;
    const crm = cells[2].innerText;
    const especialidade = cells[3].innerText;

    // Preenche os detalhes na janela modal
    document.getElementById('modalDetalhesLabel').textContent = `Detalhes de ${nome}`;
    document.querySelector('.lista-detalhes dd:nth-child(2)').textContent = nome;
    document.querySelector('.lista-detalhes dd:nth-child(4)').textContent = email;
    document.querySelector('.lista-detalhes dd:nth-child(6)').textContent = crm;
    document.querySelector('.lista-detalhes dd:nth-child(8)').textContent = especialidade;

    // Abre a janela modal
    Modal.open();
}
