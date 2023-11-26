document.addEventListener('DOMContentLoaded', function () {
    // Obter o pacienteId dos parâmetros da URL
    const pacienteId = window.location.search.split('id=')[1];
    console.log("ID do paciente obtido:", pacienteId);

    fetch(`http://localhost:8080/pacientes/${pacienteId}`)
        .then(response => response.json())
        .then(paciente => {
            console.log(paciente);

            // Preencher os campos do formulário com as informações do paciente
            document.getElementById('nome').value = paciente.nome;
            document.getElementById('cpf').value = paciente.cpf;
            document.getElementById('email').value = paciente.email;
            document.getElementById('telefone').value = paciente.telefone;

            // Preencher os campos de endereço, se aplicável
            const enderecoPrincipal = paciente.enderecosDTO[0];

            document.getElementById('cep').value = enderecoPrincipal.cep;
            document.getElementById('logradouro').value = enderecoPrincipal.logradouro;
            document.getElementById('bairro').value = enderecoPrincipal.bairro;
            document.getElementById('uf').value = enderecoPrincipal.uf;
            document.getElementById('localidade').value = enderecoPrincipal.cidade;
            document.getElementById('numero').value = enderecoPrincipal.numero;
            document.getElementById('complemento').value = enderecoPrincipal.complemento;

            // Adicionar o ID do endereço principal a um campo oculto
            document.getElementById('enderecoPrincipalId').value = enderecoPrincipal.id;

            // Preencher os campos do endereço adicional, se existir
            if (paciente.enderecosDTO.length > 1) {
                const enderecoAdicional = paciente.enderecosDTO[1]; // Considerando que há apenas um endereço adicional
                document.getElementById('cep1').value = enderecoAdicional.cep;
                document.getElementById('logradouro1').value = enderecoAdicional.logradouro;
                document.getElementById('bairro1').value = enderecoAdicional.bairro;
                document.getElementById('uf1').value = enderecoAdicional.uf;
                document.getElementById('localidade1').value = enderecoAdicional.cidade;
                document.getElementById('numero1').value = enderecoAdicional.numero;
                document.getElementById('complemento1').value = enderecoAdicional.complemento;

                // Adicionar o ID do endereço adicional a um campo oculto
                document.getElementById('enderecoAdicionalId').value = enderecoAdicional.id;

                // Exibir a div de endereço adicional
                document.getElementById('enderecoAdicional').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do paciente:', error);
        });
});


function enviar() {
    const pacienteId = window.location.search.split('id=')[1];

    // Construir o objeto de requisição com as informações atualizadas
    const requestBody = {
        id: pacienteId,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        telefone: document.getElementById('telefone').value,
        cpf: document.getElementById('cpf').value,
        enderecos: [
            {
                id: document.getElementById('enderecoPrincipalId').value,
                logradouro: document.getElementById('logradouro').value,
                bairro: document.getElementById('bairro').value,
                cep: document.getElementById('cep').value,
                cidade: document.getElementById('localidade').value,
                uf: document.getElementById('uf').value,
                complemento: document.getElementById('complemento').value,
                numero: document.getElementById('numero').value
            }
        ]
    };

    // Adicionar endereço adicional se existir
    if (document.getElementById('enderecoAdicional').style.display === 'block') {
        requestBody.enderecos.push(
            {
            id: document.getElementById('enderecoAdicionalId').value,
            logradouro: document.getElementById('logradouro1').value,
            bairro: document.getElementById('bairro1').value,
            cep: document.getElementById('cep1').value,
            cidade: document.getElementById('localidade1').value,
            uf: document.getElementById('uf1').value,
            complemento: document.getElementById('complemento1').value,
            numero: document.getElementById('numero1').value
            }
        );
    }

    fetch(`http://localhost:8080/pacientes/atualizar`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            mostrarMensagemSucesso();
            setTimeout(function () {
                mensagemSucesso.style.display = 'none';
            }, 6000);
            limpar();
        })
        .catch(error => {
            console.error('Erro ao atualizar o paciente:', error);
        });
}

function mostrarMensagemSucesso() {
    mensagemSucesso.style.display = "block";
}


function limpar() {
    const campos = [
        nome, cpf, email, telefone,
        cep, logradouro, bairro, uf, cidade, numero, complemento,
        cep1, logradouro1, bairro1, uf1, cidade1, numero1, complemento1
    ];

    campos.forEach(campo => campo.value = "");
}