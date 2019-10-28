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
    eintervalo = document.querySelector("#escolhaintervalo")
    eintervalo2 = document.querySelector("#escolhaintervalo2")
    if (x.id == "aba1"){
        tamanhojanela.style.height = "400px"
        section.style.display = "inline"
        section2.style.display = "none"
        section3.style.display = "none"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    } else if (x.id == "aba2"){
        tamanhojanela.style.height = "470px"
        section.style.display = "none"
        section2.style.display = "inline"
        section3.style.display = "none"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    } else if (x.id == "aba3"){
        tamanhojanela.style.height = "400px"
        section.style.display = "none"
        section2.style.display = "none"
        section3.style.display = "inline"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    }

}

function callBinomial() {
    n = document.getElementsByName('tamostra')[0].value;
    k = document.getElementsByName('eventok')[0].value;
    p = document.getElementsByName('sucessop')[0].value;
    q = document.getElementsByName('fracassoq')[0].value;
    res = binomial(n, k, p, q);
}

function binomioMod (n, k) {
    //(n k) => n!/(k! * (n - k)!)]
    let res =1;
    if (n == k || k == 0){
        return 1;
    } else if (n == k +1 || k ==1) {
        return n;
    } else {
        return fatorial(n, k) / fatorial(n-k)
    }

}

function fatorial (n, k=1) {
    if (n == k ){
        return k;
    } else {
        return n * fatorial(n -1);
    }
}

function binomial (n, k, p, q) {
    /* n => Tamanho da amostra
        k => Evento em estudo
        p => sucesso do evento
        q => fracasso do evento*/
    return binomioMod(n,k) * (p ** k) * (q ** (n -k));
}

function padrao (num, media, desvioPadrao) {
    return (num - media)/desvioPadrao;
 }
