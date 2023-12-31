
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/medicos';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); 

            const tbody = document.querySelector('.body-lista');

            data.forEach(medico => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', medico.id);
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
        .catch(error => {
            console.error('Erro ao obter dados da API:', error);
            window.location.href = '../../error.html'; 
        });
});
