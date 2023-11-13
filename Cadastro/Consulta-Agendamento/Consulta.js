const form = document.querySelector("form");
const pacienteId = document.querySelector("#paciente");
const medicoId = document.querySelector("#medico");
const data = document.querySelector("#data");
const hora = document.querySelector("#hora");
const especialidade = document.querySelector("#especialidade");
const medicoSelect = document.getElementById("medico");
const escolherBtn = document.getElementById("escolherBtn");
const especialidadeContainer = document.getElementById("especialidadeContainer");
const medicoContainer = document.getElementById("medicoContainer");

const mensagemSucesso = document.getElementById("mensagemSucesso");

function cadastrar() {
    const dataHora = `${data.value}T${hora.value}:00`;

    const consultaData = {
        idPaciente: pacienteId.value,
        data: dataHora,
    };

    if (medicoId.value !== "") {
        consultaData.idMedico = medicoId.value;
    }

    if (especialidade.value !== "") {
        consultaData.especialidade = especialidade.value;
    }

    limparMensagensErro();

    if (!validarDataHora()) {
        return;
    }

    fetch("http://localhost:8080/consultas", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(consultaData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Consulta agendada:", data);
            mostrarMensagemSucesso();
            setTimeout(function(){
                mensagemSucesso.style.display = 'none';
            }, 6000);
            limpar();
        })
        .catch(error => {
            console.error("Erro ao cadastrar consulta");
            mostrarErro(`Erro ao cadastrar consulta, verifique se o paciente e o médico possuem disponibilidade na data selecionada.`);
        });
}

function limparMensagensErro() {
    const mensagensErro = document.querySelectorAll('.mensagemErro');
    mensagensErro.forEach(mensagemErro => {
        mensagemErro.style.display = 'none';
        mensagemErro.innerText = '';
    });
}

function mostrarMensagemSucesso() {
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const mensagemErro = document.getElementById("mensagemErro");
    const mensagemDataErro = document.getElementById("mensagemDataErro");
    const mensagemHoraErro = document.getElementById("mensagemHoraErro");

    mensagemSucesso.style.display = "block";
    mensagemErro.style.display = "none";
    mensagemDataErro.style.display = "none";
    mensagemHoraErro.style.display = "none";
}

function mostrarErro(mensagem) {
    const mensagemSucesso = document.getElementById("mensagemSucesso");
    const mensagemErro = document.getElementById("mensagemErro");

    mensagemSucesso.style.display = "none";
    mensagemErro.innerText = mensagem;
    mensagemErro.style.display = "block";
}

const mostrarErroCampo = (campoId, mensagem) => {
    const mensagemErroCampo = document.getElementById(`mensagem${campoId}Erro`);
    mensagemErroCampo.innerText = mensagem;
    mensagemErroCampo.style.display = "block";
};

function validarDataHora() {
    const dataSelecionada = new Date(data.value + 'T' + hora.value + ':00');
    const agora = new Date();

    limparMensagensErro();

    if (dataSelecionada <= agora) {
        mostrarErroCampo("Data", "A data e hora devem ser no futuro.");
        return false;
    }

    if (dataSelecionada.getDay() === 0) {
        mostrarErroCampo("Data", "Não é possível marcar consultas aos domingos.");
        return false;
    }

    const horaSelecionada = dataSelecionada.getHours();
    if (horaSelecionada < 7 || horaSelecionada >= 19) {
        mostrarErroCampo("Hora", "A consulta deve ser marcada entre 7h e 18h00.");
        return false;
    }

    return true;
}

escolherBtn.addEventListener("click", function () {
    if (escolherBtn.textContent === "Escolher Médico") {
        escolherBtn.textContent = "Escolher Especialidade";

        medicoContainer.style.display = "block";
        especialidadeContainer.style.display = "none";
    } else {
        escolherBtn.textContent = "Escolher Médico";

        medicoContainer.style.display = "none";
        especialidadeContainer.style.display = "block";

        medicoSelect.value = "";
    }
});

especialidade.addEventListener("change", function () {
    const especialidadeSelecionada = especialidade.value !== "";

    if (especialidadeSelecionada) {
        medicoSelect.value = "";
    }
});

function limpar() {
    pacienteId.value = "";
    medicoId.value = "";
    data.value = "";
    especialidade.value = "";
    hora.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Populando médicos
    fetch("http://localhost:8080/medicos", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Dados de médicos recebidos:", data);

            // Limpar opções existentes
            medicoSelect.innerHTML = "";

            // Adicionar opção padrão sem seleção
            const defaultMedicoOption = document.createElement("option");
            defaultMedicoOption.text = "Selecione um médico";
            medicoSelect.add(defaultMedicoOption);

            // Adicionar médicos
            data.forEach(medico => {
                const option = document.createElement("option");
                option.value = medico.id;
                option.text = medico.nome + ' - Especialidade: ' + medico.especialidade;
                medicoSelect.add(option);
            });
        })
        .catch(error => console.error("Erro ao obter lista de médicos:", error));

    // Populando pacientes
    fetch("http://localhost:8080/pacientes", {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "GET",
    })
        .then(response => response.json())
        .then(data => {
            console.log("Dados de pacientes recebidos:", data);

            // Limpar opções existentes
            const pacienteSelect = document.getElementById("paciente");
            pacienteSelect.innerHTML = "";

            // Adicionar opção padrão sem seleção
            const defaultPacienteOption = document.createElement("option");
            defaultPacienteOption.text = "Selecione um paciente";
            pacienteSelect.add(defaultPacienteOption);

            // Adicionar pacientes
            data.forEach(paciente => {
                const option = document.createElement("option");
                option.value = paciente.id;
                option.text = paciente.nome + ' - CPF: ' + paciente.cpf;
                pacienteSelect.add(option);
            });
        })
        .catch(error => console.error("Erro ao obter lista de pacientes:", error));
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    cadastrar();
});
