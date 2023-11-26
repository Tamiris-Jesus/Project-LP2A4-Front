
let enderecoAdicionado = false;

function adicionarEndereco() {
    if (!enderecoAdicionado) {

        const novoEnderecoAdicional = document.getElementById(`enderecoAdicional`);

        // Mostra o bloco de endereço adicional recém-adicionado
        novoEnderecoAdicional.style.display = "block";

        enderecoAdicionado = true;
    } else {
        alert('Você só pode adicionar um endereço adicional.');
    }
}

function removerEndereco() {
    const enderecoAdicional = document.getElementById(`enderecoAdicional`);

    // Esconde o bloco de endereço adicional ao invés de removê-lo
    enderecoAdicional.style.display = "none";


    enderecoAdicionado = false;
}



  

