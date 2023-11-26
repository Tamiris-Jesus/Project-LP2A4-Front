

// Máscara do CEP
const masks = {
    removeNumbers(value) {
        return value
            .replace(/[0-9]/g, '') // Remove caracteres numéricos
    },
    cep(value) {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen após os primeiros 5 dígitos
            .replace(/(-\d{3})(\d+?$)/, '$1') // Remove caracteres após os últimos 3 dígitos
    },
    telefone(value) {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{2})(\d)/, '($1)$2') // Adiciona parênteses após os primeiros 2 dígitos
            .replace(/(\d{5})(\d)/, '$1-$2') // Adiciona hífen após os próximos 4 dígitos
            .replace(/(-\d{4})(\d+?$)/, '$1'); // Remove caracteres após os últimos 4 dígitos
    }
}


// Formatação telefone
const telefoneValidacao = document.getElementById('telefone');
telefoneValidacao.addEventListener('input', async (e) => {
    const msgError = document.querySelector('#telefoneError');
    e.target.value = masks["telefone"](e.target.value); // Aplica a máscara de Telefone
    if (telefoneValidacao.value.length < 14) {
        msgError.innerHTML = '*Insira um telefone válido';
        telefoneValidacao.classList.add("errorInput");
        return;
    } else {
        msgError.innerHTML = '';
        telefoneValidacao.classList.remove("errorInput");
    }
}, false)



// Validação do CEP
const cepValidacao = document.getElementById('cep');
cepValidacao.addEventListener('input', async (e) => {
    const msgError = document.querySelector('#cepError');
    e.target.value = masks["cep"](e.target.value); // Aplica a máscara de CEP
    if (_cep.value.length < 9) {
        msgError.innerHTML = '*Insira um CEP válido';
        _cep.classList.add("errorInput");
        return;
    } else {
        msgError.innerHTML = '';
        _cep.classList.remove("errorInput");
    }
}, false)


// Validação do CEP1
const cepValidacao1 = document.getElementById('cep1');
cepValidacao1.addEventListener('input', async (e) => {
    const msgError = document.querySelector('#cepError1');
    e.target.value = masks["cep"](e.target.value); // Aplica a máscara de CEP
    if (cepValidacao1.value.length < 9) {
        msgError.innerHTML = '*Insira um CEP válido';
        cepValidacao1.classList.add("errorInput");
        return;
    } else {
        msgError.innerHTML = '';
        cepValidacao1.classList.remove("errorInput");
    }
}, false)


// Validação do CRM
const crmValidacao = document.getElementById('crm');
crmValidacao.addEventListener('input', async () => {
    const msgError = document.querySelector('#crmError');

    if (crmValidacao.value.length < 4) {
        msgError.innerHTML = '*Insira um CRM válido';
        crmValidacao.classList.add("errorInput");
        hasErrors = true;
    } else {
        msgError.innerHTML = '';
        crmValidacao.classList.remove("errorInput");
    }
}, false);

// Validação do nome
const nomeValidacao = document.getElementById('nome');
nomeValidacao.addEventListener('input', (e) => {
    const msgError = document.querySelector('#nomeError');

    e.target.value = masks["removeNumbers"](e.target.value); 
    if (nomeValidacao.value.length < 2) {
        msgError.innerHTML = '*Insira um nome válido';
        nomeValidacao.classList.add("errorInput");
    } else {
        msgError.innerHTML = '';
        nomeValidacao.classList.remove("errorInput");
    }
}, false)

// Validação do email
const emailValidacao = document.getElementById('email');
emailValidacao.addEventListener('input', () => {
    const msgError = document.querySelector('#emailError');
    const pattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

    if (!pattern.test(emailValidacao.value)) {  // O método test verifica se o valor do email corresponde ao padrão da expressão regular
        msgError.innerHTML = '*Insira um email válido (precisa conter @ e .)';
        emailValidacao.classList.add("errorInput");
    } else {
        msgError.innerHTML = '';
        emailValidacao.classList.remove("errorInput");
    }
}, false)


// Validação do especialidade
const especialidadeValidacao = document.getElementById('especialidade');
especialidadeValidacao.addEventListener('input', () => {

    if (especialidadeValidacao.value != null) {  // O método test verifica se o valor do email corresponde ao padrão da expressão regular
        especialidadeValidacao.classList.remove("errorInput");
    }
}, false)


// Demais validações do endereço
const campos = [
    ["logradouro"],
    ["bairro"],
    ["uf"],
    ["localidade"],
    ["numero"]
];

campos.forEach(([campoId]) => {
    const campo = document.getElementById(`${campoId}`);
    const msgError = document.getElementById(`${campoId}` + "Error");

    campo.addEventListener('input', () => {
        if (campo.value.length < 1) {
            msgError.innerHTML = '*Insira um ' + campoId + ' válido';
            campo.classList.add("errorInput");
        } else {
            msgError.innerHTML = '';
            campo.classList.remove("errorInput");
        }
    }, false)
});



// Validação de preenchimento dos campos 
function enviar() {
    const campos = [
        ["nome"],
        ["crm"],
        ["email"],
        ["telefone"],
        ["especialidade"],
        ["cep"],
        ["logradouro"],
        ["bairro"],
        ["uf"],
        ["localidade"],
        ["numero"],
    ];

    const mensagemErro = document.getElementById("msgError");
    let hasErrors = false;

    campos.forEach(([campoId]) => {
        const campo = document.querySelector(`#${campoId}`);

        if (campo.value.trim() === '') {
            campo.classList.add("errorInput", "red-placeholder");
            hasErrors = true;
        } else {
            campo.classList.remove("errorInput", "red-placeholder");
        }
    });

    if (hasErrors) {
        document.querySelector(`#${campos[0][0]}`).focus();
        mensagemErro.style.display = "block";
    }
}
