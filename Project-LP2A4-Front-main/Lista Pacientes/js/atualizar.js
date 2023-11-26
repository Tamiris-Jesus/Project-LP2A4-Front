document.addEventListener('DOMContentLoaded', function () {
    detalhar(this); // Você pode passar um parâmetro se necessário
});

function detalhar(row) {
    console.log("A função foi chammada");
    const pacienteId = row.getAttribute('data-id');
    const body = document.querySelector('.container');

    fetch(`http://localhost:8080/pacientes/${pacienteId}`)
        .then(response => response.json())
        .then(paciente => {
            preencherFormulario(paciente);
        })
        .catch(error => {
            console.error('Erro ao obter detalhes do paciente:', error);
            window.location.href = '../../error.html';
        });
}

function preencherFormulario(paciente) {
    document.getElementById('nome').value = paciente.nome;
    document.getElementById('cpf').value = paciente.cpf;
    document.getElementById('email').value = paciente.email;
    document.getElementById('telefone').value = paciente.telefone;

    // const containerEnderecos = document.getElementById('enderecoAdicional');

    // // Limpe os campos existentes, se houver
    // containerEnderecos.innerHTML = '';

    // paciente.enderecosDTO.forEach((endereco, index) => {
    //     const enderecoHtml = `
    //         <div class="section" id="endereco${index}">
    //             <h2>Endereço ${index + 1}</h2>
    //             <div class="row">
    //                 <div class="col">
    //                     <div class="mb-3">
    //                         <label for="cep${index}" class="form-label cepLabel">CEP</label>
    //                         <div class="input-group">
    //                             <input type="text" name="cep${index}" class="form-control cep" placeholder="CEP" id="cep${index}" value="${endereco.cep}" required>
    //                             <button type="button" class="btn btn-primary" id="buscarCepBtn${index}">Buscar</button>
    //                         </div>
    //                         <div id="cepError${index}"></div>
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="logradouro${index}" class="form-label">Logradouro</label>
    //                         <input type="text" name="logradouro${index}" class="form-control" placeholder="Logradouro" id="logradouro${index}" value="${endereco.logradouro}" required>
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="bairro${index}" class="form-label">Bairro</label>
    //                         <input type="text" name="bairro${index}" class="form-control" placeholder="Bairro" id="bairro${index}" value="${endereco.bairro}" required>
    //                     </div>
    //                     <!-- Adicione outros campos de endereço conforme necessário -->
    //                 </div>
    //                 <div class="col">
    //                     <div class="mb-3">
    //                         <label for="uf${index}" class="form-label">UF</label>
    //                         <input type="text" name="uf${index}" class="form-control" id="uf${index}" placeholder="UF" maxlength="2" value="${endereco.uf}" required>
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="localidade${index}" class="form-label">Cidade</label>
    //                         <input type="text" name="cidade${index}" class="form-control" id="localidade${index}" placeholder="Cidade" value="${endereco.cidade}" required>
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="numero${index}" class="form-label">Número</label>
    //                         <input type="number" name="numero${index}" class="form-control" placeholder="Número" id="numero${index}" value="${endereco.numero}" required>
    //                     </div>
    //                     <div class="mb-3">
    //                         <label for="complemento${index}" class="form-label">Complemento (opcional)</label>
    //                         <input type="text" name="complemento${index}" class="form-control" placeholder="Complemento" id="complemento${index}" value="${endereco.complemento}">
    //                     </div>
    //                 </div>
    //             </div>
    //             <button type="button" class="btn btn-danger mb-3" onclick="removerEndereco(${index})">- remover este endereço</button>
    //         </div>
    //     `;

    //     containerEnderecos.innerHTML += enderecoHtml;
    // });
}
