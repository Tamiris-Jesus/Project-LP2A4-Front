
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/medicos';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Adicione esta linha para ver os dados no console

            const tbody = document.querySelector('.body-lista');

            data.forEach(medico => {
                const row = document.createElement('tr');
                row.onclick = function () {
                    exibirDetalhes(this);
                };

                row.innerHTML = `
                    <td>${medico.nome}</td>
                    <td>${medico.email}</td>
                    <td>${medico.crm}</td>
                    <td>${medico.especialidade}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao obter dados da API:', error));
});
