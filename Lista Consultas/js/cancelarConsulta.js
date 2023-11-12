

function cancelarConsulta(id){
    const consultaId = id;
    console.log(consultaId);
    const motivo = document.querySelector("#cancelamento");

    console.log(motivo.value);

    const cancelamentoData = {
        idConsulta: consultaId,
        motivo: motivo.value
    };

    // Faça uma requisição DELETE à API para excluir o paciente
    fetch(`http://localhost:8080/consultas`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "DELETE",
        body: JSON.stringify(cancelamentoData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cancelar consulta');
        }

        // Verifica se a resposta está vazia ou não é JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            return {}; // Retorna um objeto vazio para indicar que a exclusão foi bem-sucedida
        }

        return response.json();
    })
    .then(data => {
        console.log('Consulta cancelada com sucesso:', data);

        Modal.close();
        ModalExcluir.close();

        location.reload();  
        alert("Consulta cancelada com sucesso!");

        // mostrarMensagemSucesso();
    })
    .catch(error => {
        console.error('Erro ao cancelar consulta:', error);
       // mostrarErro(`Erro ao cancelar consulta, insira um motivo de cancelamento válido.`);
    });
}


function mostrarMensagemSucesso() {
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const mensagemErro = document.getElementById("mensagemErro");

    mensagemSucesso.style.display = "block";
    mensagemErro.style.display = "none";
    
}

function mostrarErro(mensagem) {
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const mensagemErro = document.getElementById("mensagemErro");

    mensagemSucesso.style.display = "none";
    mensagemErro.innerText = mensagem;
    mensagemErro.style.display = "block";
}