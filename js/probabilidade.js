function intervalo(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervalo")
    section.style.display = "none"
    tamanhojanela = document.querySelector("#prob")
    tamanhojanela.style.height = "400px"
    if (valor == "menor") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Menor que:<br> <input type="number" class="dado" id="iamenor">`
    }
    if (valor == "entre") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Entre:<br> <input type="number" class="dado" id="iaentremenor"> e <input type="number" class="dado" id="iaentremaior">`
    }
    if (valor == "maior") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Maior que:<br> <input type="number" class="dado" id="iamaior">`
    }
}

function intervalo2(x) {
    valor = x.value
    section = document.querySelector("#escolhaintervalo2")
    section.style.display = "none"
    tamanhojanela = document.querySelector("#prob")
    tamanhojanela.style.height = "400px"
    if (valor == "menor") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Menor que:<br> <input type="number" class="dado" id="iamenor">`
    }
    if (valor == "entre") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Entre:<br> <input type="number" class="dado" id="iaentremenor"> e <input type="number" class="dado" id="iaentremaior">`
    }
    if (valor == "maior") {
        section.style.display = "inline"
        tamanhojanela.style.height = "475px"
        section.innerHTML = `<br><br>Maior que:<br> <input type="number" class="dado" id="iamaior">`
    }
}

function shazamabas(x) {
    tamanhojanela = document.querySelector("#prob")
    tamanhojanela.style.height = "400px"
    section = document.querySelector(".sconteudo")
    section2 = document.querySelector(".sconteudo2")
    section3 = document.querySelector(".sconteudo3")
    if (x.id == "aba1"){
        tamanhojanela.style.height = "400px"
        section.style.display = "inline"
        section2.style.display = "none"
        section3.style.display = "none"
    } else if (x.id == "aba2"){
        tamanhojanela.style.height = "470px"
        section.style.display = "none"
        section2.style.display = "inline"
        section3.style.display = "none"
    } else if (x.id == "aba3"){
        tamanhojanela.style.height = "400px"
        section.style.display = "none"
        section2.style.display = "none"
        section3.style.display = "inline"
    }

}