let conectado = false

if(localStorage.getItem("acesso") == "true"){
    conectado = true
} else {
    alert("Você não tem acesso. Faça o login para continuar.")
    window.location.href = "./index.html"
}