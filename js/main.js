// Verifica se o usuário está logado

if (localStorage.getItem("acesso") != "true") {
    alert("Você não tem acesso. Faça o login para continuar.")
    window.location.href = "./index.html"
} 