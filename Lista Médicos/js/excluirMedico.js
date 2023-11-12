// excluirMedico.js

function excluirMedico() {
    const idMedico = obterIdMedico(); // Implemente a função obterIdMedico() para obter o ID do médico a ser excluído.

    if (!idMedico) {
        console.error('ID do médico não encontrado.');
        return;
    }

    const apiUrl = `http://localhost:8080/medicos/${idMedico}`;

    fetch(apiUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao excluir médico: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Médico excluído com sucesso:', data);
            ModalExcluir.close();
            // Adicione aqui o código para atualizar a lista de médicos após a exclusão, se necessário.
        })
        .catch(error => console.error('Erro ao excluir médico:', error));
}

function obterIdMedico() {
    const deleteButton = document.getElementById('delete');
    return deleteButton.dataset.id;
}
