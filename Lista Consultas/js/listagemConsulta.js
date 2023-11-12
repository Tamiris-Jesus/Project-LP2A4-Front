
document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/consultas';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); 

            const tbody = document.querySelector('.body-lista');

            data.forEach(consulta => {
                const row = document.createElement('tr');
                row.setAttribute('data-id', consulta.id);

                row.onclick = function () {
                    exibirDetalhes(this);
                };

                const dateObject = new Date(consulta.data);
                const options = { hour: 'numeric', minute: 'numeric' };

                row.innerHTML = `
                    <td>${consulta.nomeMedico} - ${consulta.especialidade}</td>
                    <td>${consulta.nomePaciente} - ${consulta.cpf}</td>
                    <td>${dateObject.toLocaleDateString()}</td>
                    <td>${dateObject.toLocaleTimeString(undefined, options)}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao obter dados da API:', error));
});