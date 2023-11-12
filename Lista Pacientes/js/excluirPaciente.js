function excluirPaciente(id) {
    const pacienteId = id;
    console.log(pacienteId);
    // Faça uma requisição DELETE à API para excluir o paciente
    fetch(`http://localhost:8080/pacientes/${pacienteId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir paciente');
        }

        // Verifica se a resposta está vazia ou não é JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {}; // Retorna um objeto vazio para indicar que a exclusão foi bem-sucedida
        }

        return response.json();
    })
    .then(data => {
        console.log('Paciente excluído com sucesso:', data);

        Modal.close();
        ModalExcluir.close();

        location.reload();  

    })
    .catch(error => console.error('Erro ao excluir paciente:', error));
}
