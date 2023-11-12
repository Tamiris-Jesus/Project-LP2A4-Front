// --------------------- API VIACEP ------------------
'use strict';

const cepAPI = document.querySelector('#cep');
const buscarCepBtn = document.querySelector('#buscarCepBtn');
buscarCepBtn.addEventListener('click', buscaCEP);

const cepAPI1 = document.querySelector('#cep1');
const buscarCepBtn1 = document.querySelector('#buscarCepBtn1');
buscarCepBtn1.addEventListener('click', buscaCEPAdicional);

function apresentarDados(data, isAdicional = false) {
    const prefixo = isAdicional ? '1' : '';

    if (data.erro) {
        // Se a API retornar um erro, exibir mensagem de erro
        const msgError = document.querySelector(`#cepError${prefixo}`);
        const inputError = document.querySelector(`#cep${prefixo}`);
        inputError.classList.add("errorInput");
        msgError.innerHTML = `*CEP não encontrado`;
        return;
    }

    // Limpar mensagem de erro e estilos de input
    const msgError = document.querySelector(`#cepError${prefixo}`);
    const inputError = document.querySelector(`#cep${prefixo}`);
    inputError.classList.remove("errorInput");
    msgError.innerHTML = '';

    // Preencher os campos com os dados do CEP
    for (const campo in data) {
        const elemento = document.querySelector(`#${campo}${prefixo}`);
        if (elemento) {
            elemento.value = data[campo];
        }
    }
}

function buscaCEP(e) {
    e.preventDefault();
    console.log('Clique no link foi impedido.');
    // preventeDefault é frequentemente usada em formulários para evitar que a página seja recarregada quando o formulário é enviado, 
    // permitindo que você manipule os dados do formulário por meio de código JavaScript antes de qualquer ação padrão ocorrer.

    const busca = cepAPI.value.replace('-', '');

    const option = {
        method: 'get',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${busca}/json/`, option)
        .then((response) => {
            response.json()
                .then((data) => {
                    apresentarDados(data);
                });
        })
        .catch((e) => {
            console.log('Erro: ', e.message);
        });
}

function buscaCEPAdicional(e) {
    e.preventDefault();
    console.log('Clique no link foi impedido.');

    const busca = cepAPI1.value.replace('-', '');

    const option = {
        method: 'get',
        mode: 'cors',
        cache: 'default'
    }

    fetch(`https://viacep.com.br/ws/${busca}/json/`, option)
        .then((response) => {
            response.json()
                .then((data) => {
                    apresentarDados(data, true);
                });
        })
        .catch((e) => {
            console.log('Erro: ', e.message);
        });
}
