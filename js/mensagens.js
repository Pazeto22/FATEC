//Envia mensagem para o usuário que tentar fazer o contato

function mensagemContato() {
    nome = document.querySelector("#nome").value
    email = document.querySelector("#email").value
    telefone = document.querySelector("#telefone").value
    assunto = document.querySelector("#assunto").value
    mensagem = document.querySelector("#mensagemTxt").value
    main = document.querySelector(".container")
    console.log(mensagem)

    if (nome == "" || email == "" || telefone == "" || assunto == "" || mensagem == undefined) {
        alert("Você deve preencher todos os campos antes de enviar a mensagem")
        return -1
    } else if (mensagem.length <= 10) {
        alert("A mensagem deve conter mais de dez (10) caracteres.")
    } else {
        main.style.gridTemplateColumns = "auto";
        main.innerHTML = `<p>Obrigado. Sua mensagem foi enviada.<br><img src="./images/loading.gif" style="width:autopx;height:80px;"><br>Você será redirecionada para a página inicial em 3 segundos.</p>`
        // Redireciona o usuário para a página inicial em 3 segundos
        return setTimeout(function () { window.location.href = "./index.html"; }, 3000);
    }
}