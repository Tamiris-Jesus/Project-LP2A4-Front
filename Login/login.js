const botaoLogin = document.getElementById("button");

botaoLogin.addEventListener("click", function() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    
    if (email === "admin" && senha === "admin") {
        window.location.href = "../home.html";
    } else {
        alert("Credenciais inválidas. Tente novamente.");
    }
});
