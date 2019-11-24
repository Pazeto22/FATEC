// Inicializa as funções que devem funcionar ao carregar a página
function startBody() {
    // Verifica o colormode selecionado
    if (localStorage.getItem("colormode") == "black") {
        DarkMode()
    } else if (localStorage.getItem("colormode") == "white") {
        LightMode()
    }
}

// Verifica os campos e se todos estiverem preenchidos avisa para o usuário que a mensagem foi "enviada"

function mensagemContato() {
    nome = document.querySelector("#nome").value
    email = document.querySelector("#email").value
    telefone = document.querySelector("#telefone").value
    assunto = document.querySelector("#assunto").value
    mensagem = document.querySelector("#mensagemTxt").value
    main = document.querySelector(".container")

    if (nome == "" || nome == undefined || email == "" || email == undefined || telefone == "" || telefone == undefined || assunto == "" || assunto == undefined || mensagem == "" || mensagem == undefined) {
        alert("Você deve preencher todos os campos antes de enviar a mensagem")
        return -1
    } else if (mensagem.length <= 10) {
        alert("A mensagem deve conter mais de dez (10) caracteres.")
    } else {
        // Altera o conteúdo da página para exibir um loading e a mensagem de confirmação
        main.style.gridTemplateColumns = "auto";
        main.innerHTML = `<p>Obrigado. Sua mensagem foi enviada.<br><img src="./images/loading.gif" style="width:autopx;height:80px;"><br>Você será redirecionado para a página inicial em 3 segundos.</p>`
        // Redireciona o usuário para a página inicial em 3 segundos
        return setTimeout(function () { window.location.href = "./index.html"; }, 3000);
    }
}

// ColorMode - Troca as cores da página

function DarkMode() {
    document.querySelector("link[href='./css/contato.css']").href = "./css/blackmode/contato.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-dark bg-dark"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: LightMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
    document.querySelector(".fatecimg").src = "./images/fatec-black.png"
    localStorage.setItem("colormode", "black")
}

function LightMode() {
    document.querySelector("link[href='./css/blackmode/contato.css']").href = "./css/contato.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-light bg-light"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: DarkMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
    document.querySelector(".fatecimg").src = "./images/fatec.png"
    localStorage.setItem("colormode", "white")

}