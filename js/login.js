let conectado = false

if (localStorage.getItem("acesso") == "true") {
    conectado = true
    window.location.href = "./escolha.html"
}

function registrar() {
    let usuario = document.querySelector("#nomeR").value
    let email = document.querySelector("#emailR").value
    let senha = document.querySelector("#senhaR").value
    if (usuario == "" || usuario == undefined || email == "" || email == undefined || senha == "" || senha == undefined) {
        alert("Você deve preencher todos os campos")
        return -1
    } else {
        alert("Usuário cadastrado com sucesso.")
        localStorage.setItem("nome", usuario)
        localStorage.setItem("e-mail", email)
        localStorage.setItem('password', senha)
        return logi()
    }
}

function logar() {
    let emailL = document.querySelector("#emailL").value.toLowerCase()
    let senhaL = document.querySelector("#senhaL").value
    let email = localStorage.getItem("e-mail")
    let senha = localStorage.getItem('password')

    if (emailL == "admin" && senhaL == "admin" || emailL == email && senhaL == senha) {
        localStorage.setItem('acesso', true)
        return window.location.href = "./escolha.html"
    } else {
        alert("O usuário não existe ou alguma informação está incorreta")
        return -1
    }
}

function logi() {
    registro = document.querySelector(".registro")
    login = document.querySelector(".login")
    registro.style = "visibility:hidden"
    login.style = "visibility:visible"
    document.querySelector(".footerSocial").style.marginBottom = "2%"
    document.querySelector(".btnregistrar").style.transition = "all 0ms ease"
    document.querySelector(".btnlogin").style.transition = "all 500ms ease"
    return -1
}

function regi() {
    registro = document.querySelector(".registro")
    login = document.querySelector(".login")
    registro.style = "visibility:visible"
    login.style = "visibility:hidden"
    document.querySelector(".footerSocial").style.marginBottom = "0%"
    document.querySelector(".btnlogin").style.transition = "all 0ms ease"
    document.querySelector(".btnregistrar").style.transition = "all 500ms ease"
    return -1
}