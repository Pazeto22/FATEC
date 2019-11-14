// contato.html - Envio de mensagem
// Verifica os campos e se todos estiverem preenchidos avisa para o usuário que a mensagem foi "enviada"

function mensagemContato() {
    nome = document.querySelector("#nome").value
    email = document.querySelector("#email").value
    telefone = document.querySelector("#telefone").value
    assunto = document.querySelector("#assunto").value
    mensagem = document.querySelector("#mensagemTxt").value
    main = document.querySelector(".container")
    console.log(mensagem)

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