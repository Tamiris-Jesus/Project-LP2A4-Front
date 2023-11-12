document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:8080/administradores';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Adicione esta linha para ver os dados no console

            const tbody = document.querySelector('.body-lista');

            data.forEach(administrador => {
                const row = document.createElement('tr');
                row.onclick = function () {
                    exibirDetalhes(this);
                };

                row.innerHTML = `
                    <td>${administrador.nome}</td>
                    <td>${administrador.email}</td>
                    <td>${administrador.cpf}</td>
                    <td>${administrador.telefone}</td>
                    <td>${administrador.registro}</td>
                `;

                tbody.appendChild(row);
            });
        })
        .catch(error => console.error('Erro ao obter dados da API:', error));
});