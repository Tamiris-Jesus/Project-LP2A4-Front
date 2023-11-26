function excluirAdministrador(id) {
    const administradorId = id;
    console.log(administradorId);
    fetch(`http://localhost:8080/administradores/${administradorId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir administrador');
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {}; 
        }

        return response.json();
    })
    .then(data => {
        console.log('Administrador excluído com sucesso:', data);

        Modal.close();
        ModalExcluir.close();

        location.reload();  

    })
    .catch(error => console.error('Erro ao excluir administrador:', error));
}
