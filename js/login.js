function login() {
    return location.href = "./escolha.html";
}

function logi() {
    registro = document.querySelector(".registro")
    login = document.querySelector(".login")
    registro.style.visibility = "hidden"
    login.style.visibility = "visible"
    document.querySelector(".footerSocial").style.marginBottom = "2%"
    document.querySelector(".btnregistrar").style.transition = "all 0ms ease"
    document.querySelector(".btnlogin").style.transition = "all 500ms ease"
    return false
}

function regi() {
    login = document.querySelector(".login")
    registro = document.querySelector(".registro")
    login.style.visibility = "hidden"
    registro.style.visibility = "visible"
    document.querySelector(".footerSocial").style.marginBottom = "0%"
    document.querySelector(".btnlogin").style.transition = "all 0ms ease"
    document.querySelector(".btnregistrar").style.transition = "all 500ms ease"
    return false
}