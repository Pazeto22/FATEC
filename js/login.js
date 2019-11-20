// Verifica localmente se o usuário está logado

if (localStorage.getItem("acesso") == "true") {
    window.location.href = "./escolha.html"
}

// Registra o usuário e armazena os dados localmente

function registrar() {
    let usuario = document.querySelector("#nomeR").value
    let email = document.querySelector("#emailR").value
    let senha = document.querySelector("#senhaR").value
    if (usuario == "" || usuario == undefined || email == "" || email == undefined || senha == "" || senha == undefined) {
        alert("Você deve preencher todos os campos")
        return -1
    } else {
        email = email.toLowerCase()
        alert("Usuário cadastrado com sucesso.")
        localStorage.setItem("nome", usuario)
        localStorage.setItem("e-mail", email)
        localStorage.setItem('password', senha)
        return logi()
    }
}

// Faz o Login e armazena o acesso localmente.

function logar() {
    let emailL = document.querySelector("#emailL").value.toLowerCase()
    let senhaL = document.querySelector("#senhaL").value
    let email = localStorage.getItem("e-mail")
    let senha = localStorage.getItem('password')

    if (emailL == email && senhaL == senha) {
        localStorage.setItem('acesso', true)
        // Altera o conteúdo da página para exibir um loading e a mensagem de confirmação
        document.querySelector(".mainlogin").innerHTML = `<p><img src="./images/home-logo.png" id="logoIcoLogin" height="100"><br><br>Você fez o login com sucesso!<br><img src="./images/loading.gif" style="width:autopx;height:80px;"><br>Você será redirecionado 3 segundos.</p>`
        // Redireciona o usuário para a página de escolhas em 3 segundos
        return setTimeout(function () { window.location.href = "./escolha.html"; }, 3000);
    } else if (emailL == "admin@admin.com" && senhaL == "admin") {
        localStorage.setItem('acesso', true)
        localStorage.setItem('acessoAdmin', true)
        document.querySelector(".mainlogin").innerHTML = `<p><img src="./images/home-logo.png" id="logoIcoLogin" height="100"><br><br>Você fez o login com sucesso!<br><img src="./images/loading.gif" style="width:autopx;height:80px;"><br>Você será redirecionado 3 segundos.</p>`
        return setTimeout(function () { window.location.href = "./escolha.html"; }, 3000);

    } else {
        alert("O usuário não existe ou alguma informação está incorreta")
        return -1
    }
}

// Exibe a tela de login na página index. Oculta a tela de registro.

function logi() {
    registro = document.querySelector(".registro")
    login = document.querySelector(".login")
    registro.style = "display:none"
    login.style = "display:inline-grid"
    document.querySelector(".all").style.height = "465px"
    document.querySelector(".btnregistrar").style.transition = "all 0ms ease"
    document.querySelector(".btnlogin").style.transition = "all 500ms ease"
    return -1
}

// Exibe a tela de registro na página index. Oculta a tela de login.

function regi() {
    registro = document.querySelector(".registro")
    login = document.querySelector(".login")
    registro.style = "display:inline-grid"
    login.style = "display:none"
    document.querySelector(".all").style.height = "510px"
    document.querySelector(".btnlogin").style.transition = "all 0ms ease"
    document.querySelector(".btnregistrar").style.transition = "all 500ms ease"
    return -1
}