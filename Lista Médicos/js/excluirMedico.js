function excluirMedico(id) {
    const medicoId = id;
    console.log(medicoId);

    fetch(`http://localhost:8080/medicos/${medicoId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir médico');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {};
        }

        return response.json();
    })
    .then(data => {
        console.log('Médico excluído com sucesso:', data);

        Modal.close();
        ModalExcluir.close();

        location.reload();  
    })
    .catch(error => console.error('Erro ao excluir médico:', error));
}
