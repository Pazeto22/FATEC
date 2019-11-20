let MediosD = {};
var palette;

function barraBMS() {
    //Funcionamento da barra da medida separatriz
    var slider = document.getElementById("barraMS")
    var vbms = document.getElementById("valorBMS")
    vbms.innerHTML = `${slider.value}%`; // Mostra o valor inicial

    // Atualiza o valor conforme o usuário usa
    slider.oninput = function () {
        vbms.innerHTML = `${slider.value}%`
    }
}

function shazamMedida() {
    var barra = document.getElementById("barraMS")
    var barraescolha = document.getElementById("ems").value

    if (barraescolha == "Percentil") {
        barra.min = 1
        barra.max = 100
        barra.step = 1
        barra.value = 1
    } else if (barraescolha == "Decil") {
        barra.min = 10
        barra.max = 100
        barra.step = 10
        barra.value = 10
    } else if (barraescolha == "Quintil") {
        barra.min = 20
        barra.max = 100
        barra.step = 20
        barra.value = 20
    } else if (barraescolha == "Quartil") {
        barra.min = 25
        barra.max = 100
        barra.step = 25
        barra.value = 25
    }
}

function quaseshazam() {
    let varType = document.querySelector('#vars').value;
    if (varType == 'Qualitativa Ordinal') {
        $('#cordem').modal('toggle')
    } else {
        return shazam()
    }
}

function shazam() {
    let infoFromPage = getInfo();
    let results = [];

    if (infoFromPage.varType == "Selecione..." || infoFromPage.dadosIn == "") {
        alert("Insira todos os dados");
    } else {
        let auxRes = setDataTable(infoFromPage.varName,infoFromPage.varType,
            infoFromPage.dadosIn, infoFromPage.Quantidades);

        document.getElementById('S2').style.display = 'none';

        results = setResults(infoFromPage.varType, infoFromPage.Quantidades, auxRes,
            infoFromPage.dadosIn, infoFromPage.mseparatriz, infoFromPage.percentualSeparatriz,
            infoFromPage.processo);

        setResultsTable(results);
        setGraph(infoFromPage.varName, infoFromPage.varType, infoFromPage.dadosIn);

        document.querySelector(".fab").style = "visibility: visible";

    } 
}

function getInfo() {
    //Nome de variável
    let varName = document.getElementById('PVar').value;
    if (varName == "") {varName = "Variável"}

    //Tipo de variável: quantitativa contínua, quantitativa discreta, qualitativa nominal, qualitativa ordinal
    let varType = document.getElementById('vars').value;
    
    //Dados inseridos 
    let dadosIn = document.getElementById('PDados').value.replace(/ /g, '');
    dadosIn = sortData(dadosIn, varType);

    //Gera objeto de dados
    let Quantidades
    if (varName.includes(';')) {
        varName= varName.split(';');
        let data = csvJSON(document.getElementById("PDados").value);
        for (let i = 0; i < data.length - 1; i++) {
            let aux = data[i][varName[0]];
            if (aux.toUpperCase() in Quantidades) {
                Quantidades[aux.toUpperCase()] += data[i][varName[1]];
            } else {
                Quantidades[aux.toUpperCase()] = data[i][varName[1]];
            }
        }
        varName= varName[0];
    } else {
        Quantidades = quantidadesRepetidas(dadosIn, varType);
    }

    let processo = "";
    if (document.getElementsByName('processos')[0].checked) {
        processo = "População";
    } else {
        processo = "Amostra";
    }

    let mseparatriz = document.getElementById('ems').value;

    let percentualSeparatriz;
    if (mseparatriz != 'Selecione...') {
        percentualSeparatriz = document.getElementById("valorBMS").innerText;
        percentualSeparatriz = Number(percentualSeparatriz.substring(0, percentualSeparatriz.length - 1));
    } else if (mseparatriz == 'Selecione...') {
        mseparatriz = "Medida separatriz";
        percentualSeparatriz = ''
    }
    return {varName, varType, processo, dadosIn, Quantidades, mseparatriz, percentualSeparatriz}
}

function sortData(dadosIn, varType){
    if (dadosIn.endsWith(";")) {
        dadosIn = dadosIn.substring(0, dadosIn.length - 1);
    }
    dadosIn = dadosIn.trim();
    dadosIn= dadosIn.toUpperCase();
    dadosIn = dadosIn.split(";");
    dadosIn.sort();

    if (varType == 'Qualitativa Ordinal') {
        let ordem = String(document.getElementById('nomeVars').innerHTML);

        if (ordem.endsWith("<br>")) {
            ordem = ordem.substring(0, ordem.length - 4);
        }
        ordem = ordem.toUpperCase();
        ordem = ordem.split("<BR>");

        let aux = [];
            for (let i = 0; i < ordem.length; i++) {
                for (let j = 0; j < dadosIn.length; j++) {
                    if (dadosIn[j] == ordem[i]) {
                        aux.push(dadosIn[j]);
                    }
                }
            }

            dadosIn = aux;
    }
    return dadosIn;
}

function setDataTable(varName, varType, dadosIn, Quantidades) {
    document.querySelector('#S3-Container').innerHTML +=
    `
            <section id = 'S3'>
                <div class="table-responsive col-md-10" id="tabl2">
                    <table class="table table-hover table-bordered table-sm" id="TabPrincipal">
                        <thead "thead-dark">
                            <tr class="table-shazam" id="titulo">
                                <th scope="col">${varName}</th>
                                <th scope="col">FI</th>
                                <th scope="col">FR%</th>
                                <th scope="col">FAC</th>
                                <th scope="col">FAC%</th>
                            </tr>
                        </thead>
                        <tbody id='corpo'></tbody>
                    </table>
                </div>
                <section class="table-responsive col-md-10" id="tabl2">
                <div id = 'S3Resultados'></div>
                <canvas id="justChart"></canvas>
                </section><br>
            </section>
            `;

    let corpo = document.getElementById('corpo');
    for (let i = 0; i < dadosIn.length; i++) {
        dadosIn[i] = dadosIn[i].trim();
        dadosIn[i] = dadosIn[i].toUpperCase();
        corpo.innerHTML += `<tr class="table-light"></tr>`;
    }

    let linha = 1,
        frequenciaAtual = 0,
        frequenciaPercentAtual = 0,
        medianinhas = {},
        QuantidadesMe = {};

    for (let i in Quantidades) {
        let linhaAtual = document.getElementsByTagName('tr');

        linhaAtual[linha].innerHTML += `
            <td>${i}</td>
            <td>${Quantidades[i]}</td>
            <td>${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
            <td>${frequenciaAtual += Quantidades[i]}</td>
            <td>${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
        linha++;

        if (varType == 'Quantitativa Contínua'){
            QuantidadesMe[i] = [frequenciaAtual, Quantidades[i]];
        } else {
            medianinhas[`${i}`] = frequenciaAtual;
        }
    }

    if (varType == 'Quantitativa Contínua'){
        return QuantidadesMe;
    } else {
        return medianinhas;
    }
}

function setResults(varType, Quantidades, medianinhas, dadosIn, mseparatriz, percentual, processo) {
    let results = [];
    if (varType.substring(0, 4) == 'Qual') {
        results.push(['Moda', acumularModa(Quantidades)]);
        results.push(['Mediana', mediana(medianinhas, dadosIn.length)]);
        if (mseparatriz != 'Medida separatriz') {
            results.push([mseparatriz + ' ' + percentual, exibePercentil(percentual, dadosIn)]);
        }
     } else if (varType == 'Quantitativa Discreta') {
        let mediaData = media(Quantidades, dadosIn.length);
        let desvio =  desvioPadrao(Quantidades, mediaData, dadosIn.length, processo)

        results.push(['Moda', acumularModa(Quantidades)]);
        results.push(['Média', mediaData])
        results.push(['Mediana', mediana(medianinhas, dadosIn.length)]);
        results.push(['Desvio Padrão', desvio]);
        results.push(['Coef. de Variação',coeficienteVar(desvio, mediaData)]);

        if (mseparatriz != 'Medida separatriz') {
            results.push([mseparatriz + ' ' + percentual, exibePercentil(percentual, dadosIn)]);
        }
    } else if (varType == 'Quantitativa Contínua') {
        let mediaData = mediaC(MediosD, dadosIn.length);
        let intervalo = isQuantiContinous(dadosIn,varType).intervalo;
        let desvio =  desvioPadrao(Quantidades, mediaData, dadosIn.length, processo)

        results.push(['Moda', cortaString(acumularModa(Quantidades))]);
        results.push(['Média', mediaData])
        results.push(['Mediana', medianaC(dadosIn.length, medianinhas, intervalo, 0.5)]);
        results.push(['Desvio Padrão', desvio]);
        results.push(['Coef. de Variação',coeficienteVar(desvio, mediaData)]);

        if (mseparatriz != 'Medida separatriz') {
            results.push([mseparatriz + ' ' + percentual, medianaC(dadosIn.length, medianinhas, isQuantiContinous(dadosIn,varType).intervalo, percentual/100)]);
        }
    }

    return results;
}

function setResultsTable(results) {
    let s3 = document.getElementById('S3Resultados');
    let strHTML = '';
    strHTML += `
              <table class="table table-hover table-bordered table-sm" id="TabResult">
              <thead "thead-dark">
                <tr class="table-shazam">
                  <th scope="col">#</th>
                  <th scope="col">Resultado</th>
                </tr>
              </thead>
              <tbody>`
    for (let i = 0; i < results.length; i++) {
        strHTML += `
                <tr class="table-light">
                  <td scope="row">${results[i][0]}</td>
                  <td>${results[i][1]}</td>
                </tr>`
    }
    strHTML += `
                </tbody>
            </table>
            `
    s3.innerHTML = strHTML;
}

function setGraph(varName, varType, dadosIn) {
    let options = {
        title: {
            display: true,
            position: 'top',
            text: `Gráfico de ${varName}`,
            fontSize: 18,
        },
        legend: {
            display: false,
        },
        elements: {
            //https://www.chartjs.org/docs/latest/configuration/elements.html
            backgroundColor: 'rgba(0, 0, 0, 0,1)',
            borderSkipped: 'right'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: (varType.substring(0, 4) == "Qual") ? false : true
                },
                ticks: {
                    display: (varType.substring(0, 4) == "Qual") ? false : true
                }
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    beginAtZero: (varType.substring(0, 4) == "Qual") ? false : true,
                    display: (varType.substring(0, 4) == "Qual") ? false : true
                },
                gridLines: {
                    display: (varType.substring(0, 4) == "Qual") ? false : true
                }
            }]
        }
    };

    palette = new DistinctColors({count: dadosIn.length})

    if (varType == 'Quantitativa Contínua') {
        options.scales.xAxes[0].categoryPercentage = 1.0;
        options.scales.xAxes[0].barPercentage = 1.0;
    };

    var ctx = document.getElementById('justChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: (varType.substring(0, 4) == "Qual") ? 'pie' : 'bar',

        // The data for our dataset
        data: {
            labels: getLabel(quantidadesRepetidas(dadosIn, varType)),
            datasets: [{
                label: 'Frequência dos dados',
                backgroundColor: (varType.substring(0, 4) == "Qual") ? palette : 'rgb(255, 99, 132)',
                fillColor: (varType.substring(0, 4) == "Qual") ? palette : 'rgb(255, 99, 132)',
                hoverBackgroundColor: (varType.substring(0, 4) == "Qual") ? palette : 'rgb(255, 99, 132)',
                hoverBorderColor: 'rgb(255, 99, 132)',
                borderColor: (varType.substring(0, 4) == "Qual") ? 'black' : 'rgb(255, 99, 132)',
                data: getDados(quantidadesRepetidas(dadosIn, varType))
            }]
        },

        // Configuration options go here
        options: options
    });

    Chart.defaults.global.defaultFontSize = 16;
    Chart.defaults.global.defaultFontColor = 'rgb (23,39,48)';
    Chart.platform.disableCSSInjection = true;
    //document.getElementById('justChart').style.display = 'inherint';
}

function getLabel(Quantidades) {
    let label = [];

    for (let i in Quantidades) {
        label.push(i);
    }
    return label;
};

function getDados(Quantidades) {
    let dados = [];

    for (let i in Quantidades) {
        dados.push(Quantidades[i]);
    }
    return dados;
}

function quantidadesRepetidas(vetor, varType) {
    let Quantidades = {};
    let aux;

    if (isQuantiContinous(vetor, varType).type) {
        vetor = vetor.map(Number);
        vetor = vetor.sort(function (a, b) { return a - b; });
        let ic = isQuantiContinous(vetor, varType).intervalo;
        let intervalo = [vetor[0]];
        let i = 0;
        let max = Math.max(...vetor);
        let flag = true;

        while (flag) {
            intervalo.push(intervalo[i] + ic);
            i++;
            if (intervalo[i] > max || ic <= 1) {
                flag = false
                break;
            }
        }

        for (let i = 0; i < intervalo.length - 1; i++) {
            aux = 0;
            for (let j of vetor) {
                if (j >= intervalo[i] && j < intervalo[i + 1]) {
                    aux++
                }
            }
            Quantidades[`${intervalo[i]} |-- ${intervalo[i + 1]}`] = aux;
            MediosD[`${(intervalo[i] + intervalo[i + 1]) / 2}`] = aux;
        }
    } else {
        for (let i of vetor) {
            aux = 0;
            for (let j of vetor) {
                if (j === i) {
                    aux++
                }
            }
            Quantidades[`${i}`] = aux;
        }
    }

    return Quantidades;
}

function isQuantiContinous(vetor, varType) {
    //Calcula intervalo se for variavel contínua.
    if (varType == 'Quantitativa Contínua') {
        let at = (Math.max(...vetor) - Math.min(...vetor)) + 1;
        let k = Math.trunc(Math.sqrt(vetor.length));
        let ic = 0;

        while (ic == 0) {
            for (let i = k - 1; i <= k + 1; i++) {
                if (at % i == 0) {
                    ic = at / i;
                    break;
                }
            }
            at += 1;
        }

        return { type: true, intervalo: ic };
    } else {
        return { type: false, intervalo: 0 };
    }
}

function isOrdinal() {
    let varType = document.getElementById('vars').value;
    let dadosIn = document.getElementById('PDados').value.replace(/ /g, '');
    if (dadosIn.endsWith(";")) {
        dadosIn = dadosIn.substring(0, dadosIn.length - 1);
    }
    dadosIn = dadosIn.split(";");

    let Quantidades = quantidadesRepetidas(dadosIn, varType);
    let ordem = document.getElementById('ordem');

    if (varType == 'Qualitativa Ordinal' && ordem.innerText == "") {
        let strHTML = "";

        for (let i in Quantidades) {
            strHTML += `<input type='radio' name='radOrdemVar' id='${i}'></option>
                                <label for='${i}'> ${i}; </label>`
        }

        ordem.innerHTML += strHTML + '<p id="nomeVars"></p><br>';

    } else if (varType == 'Qualitativa Ordinal' && ordem.innerText != "") {
        let selectVar = document.getElementsByName('radOrdemVar');
        let ordem = document.getElementById('ordem');
        let strHTML = "";

        let parConteudo = String(document.getElementById('nomeVars').innerHTML);

        if (parConteudo.length > 4) {
            if (parConteudo.endsWith("<br>")) {
                parConteudo = parConteudo.substring(0, parConteudo.length - 4);
            }

            parConteudo = parConteudo.replace(/\<br\>\<br\>/g, '<br>');

            parConteudo = parConteudo.split("<br>");
        } else if (parConteudo == "") {
            parConteudo = [];
        } else {
            parConteudo = Array(parConteudo);
        }

        for (let i = 0; i < selectVar.length; i++) {
            if (selectVar[i].checked == true) {
                parConteudo.push(`${selectVar[i].id}`);
            }
        }

        document.getElementById('ordem').innerHTML = "";

        for (let i in Quantidades) {
            if (!(parConteudo.includes(String(i)))) {
                strHTML += `<input type='radio' name='radOrdemVar' id='${i}'></option>
                                    <label for='${i}'> ${i}</label>`
            }
        }

        ordem.innerHTML += strHTML + '<p id="nomeVars"></p>';

        for (let i = 0; i < parConteudo.length; i++) {
            if (parConteudo != "") {
                document.getElementById('nomeVars').innerHTML += parConteudo[i] + "<br>";
            }
        }
    } else {
        ordem.innerText = ""
    }
}

function acumularModa(dadosIn) {
    let maior = 0,
        moda = [];

    for (let i in dadosIn) {
        if (dadosIn[i] > maior) {
            maior = dadosIn[i];
        }
    }

    for (let i in dadosIn) {
        if (dadosIn[i] == maior) {
            moda.push(i);
        }
    }

    return moda;

}

function media(dadosIn, totalFreq) {
    let soma = 0;

    for (let i in dadosIn) {
        soma += parseInt(i) * dadosIn[i];
    }

    return (soma / totalFreq).toFixed(2);
}

function mediaC(dadosIn, totalFreq) {
    let soma = 0;

    for (let i in dadosIn) {
        soma += Number(i) * dadosIn[i];
    }

    return (soma / totalFreq).toFixed(2);
}

function mediana(dadosIn, totalFreq) {
    let posicoes = [],
        medianas = [];

    if (totalFreq % 2 == 0) {
        posicoes.push(totalFreq / 2, totalFreq / 2 + 1);
    } else {
        posicoes.push((totalFreq - 1) / 2 + 1);
    }

    for (let j of posicoes) {
        let controle = 0

        for (let i in dadosIn) {
            if (j >= controle && j < dadosIn[i]) {
                medianas.push(i);
                break
            }
            controle = dadosIn[i];
        }
    }

    return medianas;
}

function medianaC(totalFrequencia, intervalos, interClasses, porcentagem) {
    let posicao = Number((totalFrequencia * porcentagem).toFixed(2));
    let controle = 0,
        vetorIntervalos;
    for (let j in intervalos) {
        if (posicao >= controle && posicao <= intervalos[j][0]) {
            vetorIntervalos = j.split(' |-- ');
            for (let i = 0; i < vetorIntervalos.length; i++) {
                vetorIntervalos[i] = Number(vetorIntervalos[i]);
            }
            return (vetorIntervalos[0] + ((posicao - controle) / intervalos[j][1]) * interClasses).toFixed(2)
        }
        controle = intervalos[j][0];
    }
}

function desvioPadrao(Quantidades, media, totalFreq, processo) {
    let sum = 0;

    for (let i in Quantidades) {
        sum += ((Number(cortaString([String(i)])) - media) ** 2) * Quantidades[i];
    }
    if (processo == "Amostra") {
        return Math.sqrt(sum / (totalFreq - 1)).toFixed(2);
    } else {
        return Math.sqrt(sum / totalFreq).toFixed(2);
    }
}

function coeficienteVar(desvio, media) {
    return ((desvio / media) * 100).toFixed(2);
}

function exibePercentil(percentual, dadosIn) {
    let size = dadosIn.length;
    let posicaoDado = Math.round(percentual * size / 100);

    return dadosIn[Math.trunc(posicaoDado)];
}

function cortaString(vetor) {
    if (!Number.isInteger(vetor)) {
        let res = '';
        if (vetor.length > 1) {
            for (let i = 0; i < vetor.length - 1; i++) {
                s = vetor[i];
                res += String((Number(s.substring(0, s.indexOf(" "))) + Number(s.substring(s.indexOf("-") + 2, s.length))) / 2) + ", ";
            }
        }
        s = vetor[vetor.length - 1];
        if (s.includes('--')) {
            res += String((Number(s.substring(0, s.indexOf(" "))) + Number(s.substring(s.indexOf("-") + 2, s.length))) / 2);
            return res;
        } else {
            return s;
        }

    } else {
        return vetor;
    }
}

function lerArq() {
    let arq = document.getElementById("fileDesc").files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        var dados = document.getElementById("PDados");
        dados.value = reader.result;
    }
    reader.readAsText(arq);
}

function csvJSON(csv) {
    // credits: http://techslides.com/convert-csv-to-json-in-javascript
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);

    }
    // teste

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}

function Voltar() {
    location.reload();
}
