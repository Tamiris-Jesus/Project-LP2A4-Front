document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/pacientes';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Adicione esta linha para ver os dados no console

            const tbody = document.querySelector('.body-lista');

            data.forEach(paciente => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', paciente.id);

                row.onclick = function () {
                    exibirDetalhes(this);
                };

                row.innerHTML = `
                    <td>${paciente.nome}</td>
                    <td>${paciente.email}</td>
                    <td>${paciente.cpf}</td>
                    <td>${paciente.telefone}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao obter dados da API:', error));
});




