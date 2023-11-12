

// Máscara do CPF e do CEP
const masks = {
    cpf(value) {
        return value
            .replace(/\D/g, '') // Remove caracteres não numéricos
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os primeiros 3 dígitos
            .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após os próximos 3 dígitos
            .replace(/(\d{3})(\d{1,2})/, '$1-$2') // Adiciona hífen e os últimos dígitos
            .replace(/(-\d{2})(\d+?$)/, '$1') // Remove caracteres após os últimos 2 dígitos
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
    },
    registro(value) {
        return value
            .replace(/\W/g, '') // Remove caracteres especiais
            .replace(/(\w{4})(\w{2})/, '$1-$2')
            .replace(/(-\w{2})(\w+?$)/, '$1'); // Remove caracteres após os últimos 4 dígitos
    }
}


// Formatação telefone
const telefoneValidacao= document.getElementById('telefone');

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


const registroValidacao= document.getElementById('registro');

registroValidacao.addEventListener('input', async (e) => {
    const msgError = document.querySelector('#registroError');
    e.target.value = masks["registro"](e.target.value.toUpperCase()); // Aplica a máscara de Telefone
    if (registroValidacao.value.length < 6) {
        msgError.innerHTML = '*Insira um registro válido';
        registroValidacao.classList.add("errorInput");
        return;
    } else {
        msgError.innerHTML = '';
        registroValidacao.classList.remove("errorInput");
    }
}, false)


// Validação do CEP
const cepValidacao = document.getElementById('cep');

cepValidacao.addEventListener('input', async (e) => {
    const msgError = document.querySelector('#cepError');
    e.target.value = masks["cep"](e.target.value); // Aplica a máscara de CEP
    if (cepValidacao.value.length < 9) {
        msgError.innerHTML = '*Insira um CEP válido';
        cepValidacao.classList.add("errorInput");
        return;
    } else {
        msgError.innerHTML = '';
        cepValidacao.classList.remove("errorInput");
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


// Validação do CPF
const cpfValidacao = document.getElementById('cpf');
cpfValidacao.addEventListener('input', (e) => {
    const msgError = document.querySelector('#cpfError');
    e.target.value = masks["cpf"](e.target.value); // Aplica a máscara de CPF
    var validarCpf = cpfValidacao.value.replaceAll('.', '').replace('-', ''); // Remove caracteres especiais
    if (validarCpf.length == 11) { // Se o CPF tiver 11 dígitos...
        var cpfValido = TestaCPF(validarCpf); // Realiza a validação do CPF
        if (!cpfValido) {
            msgError.innerHTML = '*Insira um CPF válido';
            cpfValidacao.classList.add("errorInput");
        } else {
            msgError.innerHTML = '';
            cpfValidacao.classList.remove("errorInput");
        }
    }
}, false)


// Função para testar o CPF
function TestaCPF(validarCpf) {
    var Soma;
    var Resto;
    Soma = 0;
    if (validarCpf == "00000000000") return false; // CPF com todos os dígitos iguais é inválido

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(validarCpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(validarCpf.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(validarCpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(validarCpf.substring(10, 11))) return false;

    return true; // Se a validação for bem-sucedida, o CPF é considerado válido
}


function enviar() {
    const campos = [
        ["nome"],
        ["cpf"],
        ["email"],
        ["telefone"],
        ["registro"],
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