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
    // obtém os elementos da linha
    const cells = row.getElementsByTagName('td');

    // extrai os detalhes do paciente da linha da tabela
    const nome = cells[0].innerText;
    const email = cells[1].innerText;
    const telefone = cells[2].innerText;
    const cpf = cells[3].innerText;
    
    // como fazer parapegar do banco ou da tela de cadastro ???
    // const lougadoro = cells[4].innerText;
    // const bairro = cells[5].innerText;
    // const cep = cells[6].innerText;
    // const cidade = cells[7].innerText;
    // const uf = cells[8].innerText;
    // const complemento = cells[9].innerText;
    // const numero = cells[10].innerText;

    // preenche os detalhes na janela modal
    document.getElementById('modalDetalhesLabel').textContent = `Detalhes de ${nome}`;
    document.querySelector('.lista-detalhes dd:nth-child(2)').textContent = nome;
    document.querySelector('.lista-detalhes dd:nth-child(4)').textContent = email;
    document.querySelector('.lista-detalhes dd:nth-child(6)').textContent = telefone;
    document.querySelector('.lista-detalhes dd:nth-child(8)').textContent = cpf;

    // abre a janela modal
    Modal.open();
}
