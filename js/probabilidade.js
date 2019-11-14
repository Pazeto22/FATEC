function apagar() {
    modal = document.querySelector("#resultadoInterior")
    modal.innerHTML = ""
}

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
    if (x.id == "aba1") {
        tamanhojanela.style.height = "400px"
        section.style.display = "inline"
        section2.style.display = "none"
        section3.style.display = "none"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    } else if (x.id == "aba2") {
        tamanhojanela.style.height = "470px"
        section.style.display = "none"
        section2.style.display = "inline"
        section3.style.display = "none"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    } else if (x.id == "aba3") {
        tamanhojanela.style.height = "400px"
        section.style.display = "none"
        section2.style.display = "none"
        section3.style.display = "inline"
        eintervalo.innerHTML = ""
        eintervalo2.innerHTML = ""
    }

}

function callBinomial() {
    let n = Number(document.querySelector('[name = "tamostra"]').value);
    let k = Number(document.querySelector('[name = "eventok"]').value);
    let p = Number(document.querySelector('[name = "sucessop"]').value)/100;
    let q = Number(document.querySelector('[name = "fracassoq"]').value)/100;
    let res = binomial(n, k, p, q).toFixed(2);
    let media = n*q
    let dpadrao = Number((Math.sqrt(n*p*q).toFixed(2)))

    //Inserir resultados aqui   

    mResultados = document.querySelector("#resultadoInterior")
    mResultados.innerHTML = `Probabilidade: ${res}% <br> Média: ${media} <br> Desvio Padrão: ${dpadrao}`
}

function binomioMod(n, k) {
    //(n k) => n!/(k! * (n - k)!)]
    let res = 1;
    if (n == k || k == 0) {
        return 1;
    } else if (n == k + 1 || k == 1) {
        return n;
    } else {
        return fatorial(n) / fatorial(k) * fatorial(n - k)
    }
}

function fatorial(n, k = 1) {
    if (n == k) {
        return k;
    } else {
        return n * fatorial(n - 1);
    }
}

function binomial(n, k, p, q) {
    /* n => Tamanho da amostra
        k => Evento em estudo
        p => sucesso do evento
        q => fracasso do evento*/
    console.log(binomioMod(n, k));
    return binomioMod(n, k) * (p ** k) * (q ** (n - k));
}

/*function padrao (num, media, desvioPadrao) {
    return (num - media)/desvioPadrao;
 }*/

function callUniforme() {
    let min = Number(document.getElementsByName('pmin')[0].value);
    let max = Number(document.getElementsByName('pmax')[0].value);
    let values = new Array(4);  // [menor, entremenor, entremaior, maior]
    let op = document.getElementsByName('intervaloa');
    let res;

    if (op[0].checked) { //menor
        values[0] = Number(document.getElementById('iamenor').value);
        res = (1 / (max - min)) * (values[0] - min);
        res = res * 100
    } else if (op[1].checked) {//entre
        values[1] = Number(document.getElementById('iaentremenor').value);
        values[2] = Number(document.getElementById('iaentremaior').value);
        if (values[2] > values[1]) {
            res = (1 / (max - min)) * (values[2] - values[1]);
        } else {
            res = (1 / (max - min)) * (values[1] - values[2]);
        }
    } else if (op[2].checked) {//maior
        values[3] = Number(document.getElementById('iamaior').value);
        res = (1 / (max - min)) * (max - values[3]);
    }

    media = (min + max) / 2;
    desvioPadrao = (Math.sqrt((max - min) ** 2 / 12)).toFixed(2)
    cVariacao = ((desvioPadrao/media)*100).toFixed(2)

    //Inserir resultados aqui   

    mResultados = document.querySelector("#resultadoInterior")
    mResultados.innerHTML = `Probabilidade: ${res}% <br> Desvio Padrão: ${desvioPadrao} <br> Média: ${media} <br> C. de Variação: ${cVariacao}`
}

function callNormal() {
    let media = document.getElementsByName('media')[0].value;
    let desvioPadrao = document.getElementsByName('dpadrao')[0].value;
    let normalizado;
    let values = new Array(4);  // [menor, entremenor, entremaior, maior]
    let op = document.getElementsByName('intervaloa2');
    let res;

    if (op[0].checked) { //menor
        values[0] = Number(document.getElementById('iamenor').value);
        normalizado = (Number(values[0]) - Number(media)) / Number(desvioPadrao);
        normalizado = normalizado.toFixed(2);

        if (values[0] > media) {
            res = searchTable(normalizado).value + 0.5;
        } else {
            res = searchTable(normalizado).value;
        }
    } else if (op[1].checked) {//entre
        values[1] = Number(document.getElementById('iaentremenor').value);
        values[2] = Number(document.getElementById('iaentremaior').value);
        normalizado1 = (Number(values[1]) - Number(media)) / Number(desvioPadrao);
        normalizado1 = normalizado1.toFixed(2);
        normalizado2 = (Number(values[2]) - Number(media)) / Number(desvioPadrao);
        normalizado2 = normalizado2.toFixed(2);

        if (values[1] < media && values[2] > media) {
            res = searchTable(normalizado1).value + searchTable(normalizado2).value;
        } else if (values[1] > media && values[2] > media) {
            res = searchTable(normalizado2).value - searchTable(normalizado1).value;
        } else if (values[1] < media && values[2] < media) {
            res = searchTable(normalizado1).value - searchTable(normalizado2).value;
        } else if (values[1] == media && values[2] > media) {
            res = searchTable(normalizado2).value;
        } else if (values[2] == media && values[1] < media) {
            res = searchTable(normalizado1).value;
        }
    } else if (op[2].checked) {//maior
        values[3] = Number(document.getElementById('iamaior').value);
        normalizado = (Number(values[0]) - Number(media)) / Number(desvioPadrao);
        normalizado = normalizado.toFixed(2);
        if (values[3] > media) {
            res = 0.5 - searchTable(normalizado).value;
        } else {
            res = 0.5 + searchTable(normalizado).value;
        }
    }

    //Inserir resultados aqui

    mResultados = document.querySelector("#resultadoInterior")
    mResultados.innerHTML = `Probabilidade: ${res}%`
}

function searchTable(number) {
    let lin = Math.trunc(number * 10) / 10;
    let col = (number - lin) * 100;

    const tabela = [
        ['z', 0.0000, 1.0000, 2.0000, 3.0000, 4.0000, 5.0000, 6.0000, 7.0000, 8.0000, 9.0000],
        [0.0, 0.0000, 0.0040, 0.0080, 0.0120, 0.0160, 0.0199, 0.0239, 0.0279, 0.0319, 0.0359],
        [0.1, 0.0389, 0.0438, 0.0478, 0.0517, 0.0557, 0.0596, 0.0636, 0.0675, 0.0714, 0.0754],
        [0.2, 0.0793, 0.0832, 0.0871, 0.0910, 0.0948, 0.0987, 0.1026, 0.1064, 0.1103, 0.1141],
        [0.3, 0.1179, 0.1217, 0.1255, 0.1293, 0.1331, 0.1368, 0.1406, 0.1443, 0.1480, 0.1517],
        [0.4, 0.1554, 0.1591, 0.1628, 0.1664, 0.1700, 0.1736, 0.1772, 0.1808, 0.1844, 0.1879],
        [0.5, 0.1915, 0.1950, 0.1985, 0.2019, 0.2054, 0.2088, 0.2123, 0.2157, 0.2190, 0.2224],
        [0.6, 0.2258, 0.2291, 0.2324, 0.2357, 0.2389, 0.2422, 0.2454, 0.2486, 0.2518, 0.2549],
        [0.7, 0.2580, 0.2612, 0.2642, 0.2673, 0.2704, 0.2734, 0.2764, 0.2794, 0.2823, 0.2852],
        [0.8, 0.2881, 0.2910, 0.2939, 0.2967, 0.2996, 0.3023, 0.3051, 0.3078, 0.3106, 0.3133],
        [0.9, 0.3159, 0.3186, 0.3212, 0.3238, 0.3264, 0.3289, 0.3315, 0.3340, 0.3365, 0.3389],
        [1.0, 0.3413, 0.3438, 0.3461, 0.3485, 0.3508, 0.3531, 0.3554, 0.3577, 0.3599, 0.3621],
        [1.1, 0.3643, 0.3665, 0.3686, 0.3708, 0.3729, 0.3749, 0.3770, 0.3790, 0.3810, 0.3830],
        [1.2, 0.3849, 0.3869, 0.3888, 0.3907, 0.3925, 0.3944, 0.3962, 0.3980, 0.3997, 0.4015],
        [1.3, 0.4032, 0.4049, 0.4066, 0.4082, 0.4099, 0.4115, 0.4131, 0.4147, 0.4162, 0.4177],
        [1.4, 0.4192, 0.4207, 0.4222, 0.4236, 0.4251, 0.4265, 0.4279, 0.4292, 0.4306, 0.4319],
        [1.5, 0.4332, 0.4345, 0.4357, 0.4370, 0.4382, 0.4394, 0.4406, 0.4418, 0.4429, 0.4441],
        [1.6, 0.4452, 0.4463, 0.4474, 0.4484, 0.4495, 0.4505, 0.4515, 0.4525, 0.4535, 0.4545],
        [1.7, 0.4554, 0.4564, 0.4573, 0.4582, 0.4591, 0.4599, 0.4608, 0.4616, 0.4625, 0.4633],
        [1.8, 0.4641, 0.4649, 0.4656, 0.4664, 0.4671, 0.4678, 0.4686, 0.4693, 0.4699, 0.4706],
        [1.9, 0.4713, 0.4719, 0.4726, 0.4732, 0.4738, 0.4744, 0.4750, 0.4756, 0.4761, 0.4767],
        [2.0, 0.4772, 0.4778, 0.4783, 0.4788, 0.4793, 0.4798, 0.4893, 0.4808, 0.4812, 0.4817],
        [2.1, 0.4821, 0.4826, 0.4830, 0.4834, 0.4838, 0.4842, 0.4846, 0.4850, 0.4854, 0.4857],
        [2.2, 0.4861, 0.4864, 0.4868, 0.4871, 0.4875, 0.4878, 0.4881, 0.4884, 0.4887, 0.4890],
        [2.3, 0.4893, 0.4896, 0.4898, 0.4901, 0.4904, 0.4906, 0.4909, 0.4911, 0.4913, 0.4916],
        [2.4, 0.4918, 0.4920, 0.4922, 0.4925, 0.4927, 0.4929, 0.4931, 0.4932, 0.4934, 0.4936],
        [2.5, 0.4938, 0.4940, 0.4941, 0.4943, 0.4045, 0.4946, 0.4948, 0.4949, 0.4951, 0.4952],
        [2.6, 0.4953, 0.4955, 0.4956, 0.4957, 0.4959, 0.4960, 0.4961, 0.4962, 0.4963, 0.4964],
        [2.7, 0.4965, 0.4966, 0.4967, 0.4968, 0.4969, 0.4970, 0.4971, 0.4972, 0.4973, 0.4974],
        [2.8, 0.4974, 0.4975, 0.4976, 0.4977, 0.4977, 0.4978, 0.4979, 0.4979, 0.4980, 0.4981],
        [2.9, 0.4981, 0.4982, 0.4982, 0.4983, 0.4984, 0.4984, 0.4985, 0.4985, 0.4986, 0.4986],
        [3.0, 0.4986, 0.4987, 0.4987, 0.4988, 0.4988, 0.4989, 0.4989, 0.4989, 0.4990, 0.4990],
        [3.1, 0.4990, 0.4991, 0.4991, 0.4991, 0.4992, 0.4992, 0.4992, 0.4992, 0.4993, 0.4993],
        [3.2, 0.4993, 0.4993, 0.4994, 0.4994, 0.4994, 0.4994, 0.4994, 0.4995, 0.4995, 0.4995],
        [3.3, 0.4995, 0.4995, 0.4995, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4996, 0.4997],
        [3.4, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4997, 0.4998],
        [3.5, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998, 0.4998],
        [3.6, 0.4998, 0.4998, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.7, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.8, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999, 0.4999],
        [3.9, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000, 0.5000]];

    const column = Number(col) + 1;
    const line = Number(lin);
    let i = 0;

    while (tabela[i][0] !== line) {
        if (tabela[i][0] === line) {
            return { ok: true, value: (tabela[index][column]) };
        }
        i++;
    }

    return { ok: false, value: null };
}