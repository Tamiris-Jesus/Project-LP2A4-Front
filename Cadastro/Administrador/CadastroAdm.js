const form = document.querySelector("form");
const nome = document.querySelector("#nome");
const cpf = document.querySelector("#cpf");
const email = document.querySelector("#email");
const telefone = document.querySelector("#telefone");
const registro = document.querySelector("#registro");

const mensagemSucesso = document.getElementById("mensagemSucesso");
const mensagemErro = document.getElementById("msgError");

// Endereço principal
const cep = document.querySelector("#cep");
const logradouro = document.querySelector("#logradouro");
const bairro = document.querySelector("#bairro");
const uf = document.querySelector("#uf");
const cidade = document.querySelector("#localidade");
const numero = document.querySelector("#numero");
const complemento = document.querySelector("#complemento");

// Endereço adicional
const cep1 = document.getElementById("cep1");
const logradouro1 = document.getElementById("logradouro1");
const bairro1 = document.getElementById("bairro1");
const uf1 = document.getElementById("uf1");
const cidade1 = document.getElementById("localidade1");
const numero1 = document.getElementById("numero1");
const complemento1 = document.getElementById("complemento1");


function cadastrar() {
    const endereco1 = {
        logradouro: logradouro.value,
        bairro: bairro.value,
        cep: cep.value,
        cidade: cidade.value,
        uf: uf.value,
        complemento: complemento.value,
        numero: numero.value
    };

    const endereco2 = {
        logradouro: logradouro1.value,
        bairro: bairro1.value,
        cep: cep1.value,
        cidade: cidade1.value,
        uf: uf1.value,
        complemento: complemento1.value,
        numero: numero1.value
    };

    const enderecos = cep1.value ? [endereco1, endereco2] : [endereco1];

    const requestBody = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        registro: registro.value,
        cpf: cpf.value,
        enderecos: enderecos
    };

    fetch("http://localhost:8080/administradores", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {        
        mensagemErro.style.display = 'none';
        
        mostrarMensagemSucesso();
        setTimeout(function(){
            mensagemSucesso.style.display = 'none';
        }, 6000);
        limpar();
    })
    .catch(error => console.error("Erro ao cadastrar o administrador:", error));
};


function mostrarMensagemSucesso() {
mensagemSucesso.style.display = "block";
}



function limpar() {
    const campos = [
        nome, cpf, email, telefone, registro,
        cep, logradouro, bairro, uf, cidade, numero, complemento,
        cep1, logradouro1, bairro1, uf1, cidade1, numero1, complemento1
    ];

    campos.forEach(campo => campo.value = "");
}


form.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar();
    limpar();
});