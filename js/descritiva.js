function shazamBarra() {
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
    let tipoVariavel = document.querySelector('#vars').value;
    if (tipoVariavel == 'Qualitativa Ordinal') {
        $('#cordem').modal('toggle')
    } else {
        return shazam()
    }
}

function shazam() {
    let vari = document.getElementById('PVar').value;
    if (vari == "") {
        vari = "Variável"
    }
    let dadosIn = document.getElementById('PDados').value.replace(/ /g, '');
    if (dadosIn.endsWith(";")) {
        dadosIn = dadosIn.substring(0, dadosIn.length - 1);
    }
    dadosIn = dadosIn.split(";");
    let tipoVariavel = document.getElementById('vars').value;
    let processo = "";
    if (document.getElementsByName('processos')[0].checked) {
        processo = "População";
    } else {
        processo = "Amostra";
    }
    let mseparatriz = document.getElementById('ems').value;
    let percentual;
    if (mseparatriz != 'Selecione...') {
        percentual = document.getElementById("valorBMS").innerText;
        percentual = Number(percentual.substring(0, percentual.length - 1));
    }

    let Quantidades = {};
    // let abridor = window.tden('tabelas.html', '_self')
    // alert(dadosIn)
    // console.log(abridor.document.getElementById("titulo").innerHTML)
    if (tipoVariavel == "Selecione..." || dadosIn == "") {
        alert("Insira todos os dados");
    } else {
        let typeData = document.getElementById('typeIn').value;
        if (typeData == 'Dados condensados') {
            vari = vari.split(';');
            var data = csvJSON(document.getElementById("PDados").value);
            for (let i = 0; i < data.length - 1; i++) {
                let aux = data[i][vari[0]];
                if (aux.toUpperCase() in Quantidades) {
                    Quantidades[aux.toUpperCase()] += data[i][vari[1]];
                } else {
                    Quantidades[aux.toUpperCase()] = data[i][vari[1]];
                }
            }
            vari = vari[0];
        }

        document.querySelector('#S3-Container').innerHTML +=
            // `
            // <section id = 'S3'>
            //     <div class="table-responsive col-md-10" id="tabl2">
            //         <table class=" col-md-10">
            //             <thead class="thead-dark">
            //                 <tr id='titulo'>
            //                     <td >${vari}</td>
            //                     <td >FI</td>
            //                     <td >FR%</td>
            //                     <td >FAC</td>
            //                     <td >FAC%</td>
            //                 </tr>
            //             </thead>
            //             <tbody id='corpo'></tbody>
            //         </table>
            //     </div>
            //     <section id = 'S3Resultados'>
            //     </section>
            //     <div class="table-responsive col-md-10">
            //     <canvas id="justChart"></canvas>
            //     </div>
            // </section>
            // `;
            `
            <section id = 'S3'>
                <div class="table-responsive col-md-10" id="tabl2">
                    <table class="table table-hover table-bordered table-sm" id="TabPrincipal">
                        <thead "thead-dark">
                            <tr class="table-shazam" id="titulo">
                                <th scope="col">${vari}</th>
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

        if (tipoVariavel == 'Qualitativa Nominal') {

            let corpo = document.getElementById('corpo');
            for (let i = 0; i < dadosIn.length; i++) {
                dadosIn[i] = dadosIn[i].trim();
                dadosIn[i] = dadosIn[i].toUpperCase();
                corpo.innerHTML += `<tr class="table-light"></tr>`;
            }
            dadosIn.sort();


            // Escrevendo a tabela
            if (typeData == 'Dados brutos') {
                Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);
            }

            let linha = 1,
                frequenciaAtual = 0,
                frequenciaPercentAtual = 0,
                medianinhas = {};
            for (let i in Quantidades) {
                let linhaAtual = document.getElementsByTagName('tr');
                linhaAtual[linha].innerHTML += `
                    <td>${i}</td>
                    <td>${Quantidades[i]}</td>
                    <td>${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
                    <td>${frequenciaAtual += Quantidades[i]}</td>
                    <td>${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
                linha++;
                medianinhas[`${i}`] = frequenciaAtual;
            }

            document.getElementById('S2').style.display = 'none';

            s3 = document.getElementById('S3Resultados');
            s3.innerHTML += `
              <table class="table table-hover table-bordered table-sm" id="TabResult">
              <thead "thead-dark">
                <tr class="table-shazam">
                  <td scope="col">#</td>
                  <td scope="col">Resultado</td>
                </tr>
              </thead>
              <tbody>
                <tr class="table-light">
                  <td scope="row">Moda</td>
                  <td>${acumularModa(Quantidades)}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">Mediana</td>
                  <td>${mediana(medianinhas, dadosIn.length)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">${mseparatriz + ' ' + percentual}</td>
                    <td>${exibePercentil(percentual, dadosIn, Quantidades, mseparatriz, tipoVariavel)}</td>
                </tr>
              </tbody>
            </table>
            `;

        } else if (tipoVariavel == 'Qualitativa Ordinal') {

            let ordem = String(document.getElementById('nomeVars').innerHTML);

            if (ordem.endsWith("<br>")) {
                ordem = ordem.substring(0, ordem.length - 4);
            }
            ordem = ordem.toUpperCase();
            ordem = ordem.split("<BR>");

            let corpo = document.getElementById('corpo');
            for (let i = 0; i < dadosIn.length; i++) {
                dadosIn[i] = dadosIn[i].trim();
                dadosIn[i] = dadosIn[i].toUpperCase();
                corpo.innerHTML += `<tr class="table-light"></tr>`;
            }
            dadosIn.sort();

            let aux = [];
            for (let i = 0; i < ordem.length; i++) {
                for (let j = 0; j < dadosIn.length; j++) {
                    if (dadosIn[j] == ordem[i]) {
                        aux.push(dadosIn[j]);
                    }
                }
            }

            dadosIn = aux;

            // Escrevendo a tabela
            if (typeData == 'Dados brutos') {
                Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);
            }

            let linha = 1,
                frequenciaAtual = 0,
                frequenciaPercentAtual = 0,
                medianinhas = {};
            for (let i in Quantidades) {
                let linhaAtual = document.getElementsByTagName('tr');
                linhaAtual[linha].innerHTML += `
                    <td>${i}</td>
                    <td >${Quantidades[i]}</td>
                    <td >${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
                    <td >${frequenciaAtual += Quantidades[i]}</td>
                    <td >${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
                linha++;
                medianinhas[`${i}`] = frequenciaAtual;
            }

            document.getElementById('S2').style.display = 'none';

            s3 = document.getElementById('S3Resultados');
            s3.innerHTML += `
              <table class="table table-hover table-bordered table-sm" id="TabResult">
              <thead "thead-dark">
                <tr class="table-shazam">
                  <th scope="col">#</th>
                  <th scope="col">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-light">
                  <td scope="row">Moda</td>
                  <td>${acumularModa(Quantidades)}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">Mediana</td>
                  <td>${mediana(medianinhas, dadosIn.length)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">${mseparatriz + ' ' + percentual}</td>
                    <td>${exibePercentil(percentual, dadosIn, Quantidades, mseparatriz, tipoVariavel)}</td>
                </tr>
              </tbody>
            </table>
            `

        } else if (tipoVariavel == 'Quantitativa Discreta') {
            let corpo = document.getElementById('corpo');
            for (let i = 0; i < dadosIn.length; i++) {
                dadosIn[i] = dadosIn[i].trim();
                dadosIn[i] = dadosIn[i].toUpperCase();
                corpo.innerHTML += `<tr class="table-light"></tr>`;
            }
            dadosIn.sort();


            // Escrevendo a tabela
            if (typeData == 'Dados brutos') {
                Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);
            }

            let linha = 1,
                frequenciaAtual = 0,
                frequenciaPercentAtual = 0,
                medianinhas = {};

            for (let i in Quantidades) {
                let linhaAtual = document.getElementsByTagName('tr');
                linhaAtual[linha].innerHTML += `
                    <td>${i}</td>
                    <td >${Quantidades[i]}</td>
                    <td >${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
                    <td >${frequenciaAtual += Quantidades[i]}</td>
                    <td >${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
                linha++;
                medianinhas[`${i}`] = frequenciaAtual;
            }

            document.getElementById('S2').style.display = 'none';

            s3 = document.getElementById('S3Resultados');
            let mediaData = media(Quantidades, dadosIn.length);
            let desvio = desvioPadrao(Quantidades, mediaData, dadosIn.length, processo);
            s3.innerHTML += `
            <table class="table table-hover table-bordered table-sm" id="TabResult">
                <thead "thead-dark">
                <tr class="table-shazam">
                    <th scope="col">#</th>
                    <th scope="col">Resultado</th>
                </tr>
                </thead>
                <tbody>
                <tr class="table-light">
                    <td scope="row">Moda</td>
                    <td>${acumularModa(Quantidades)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">Média</td>
                    <td>${media(Quantidades, dadosIn.length)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">Mediana</td>
                    <td>${mediana(medianinhas, dadosIn.length)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">Desvio Padrão</td>
                    <td>${desvio}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">Variância</td>
                    <td>${coeficienteVar(desvio, mediaData)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">${mseparatriz + ' ' + percentual}</td>
                    <td>${exibePercentil(percentual, dadosIn, Quantidades, mseparatriz, tipoVariavel)}</td>
                </tr>
                </tbody>
            </table>
            `
        } else if (tipoVariavel == 'Quantitativa Contínua') {

            let corpo = document.getElementById('corpo');
            for (let i = 0; i < dadosIn.length; i++) {
                dadosIn[i] = dadosIn[i].trim();
                dadosIn[i] = dadosIn[i].toUpperCase();
                corpo.innerHTML += `<tr class="table-light"></tr>`;
            }
            dadosIn.sort();

            // Escrevendo a tabela
            if (typeData == 'Dados brutos') {
                Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);
            }

            let linha = 1,
                frequenciaAtual = 0,
                frequenciaPercentAtual = 0,
                medianinhas = {};

            for (let i in Quantidades) {
                let linhaAtual = document.getElementsByTagName('tr');
                linhaAtual[linha].innerHTML += `
                    <td>${i}</td>
                    <td >${Quantidades[i]}</td>
                    <td >${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
                    <td >${frequenciaAtual += Quantidades[i]}</td>
                    <td >${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
                linha++;
                medianinhas[`${i}`] = frequenciaAtual;
            }

            document.getElementById('S2').style.display = 'none';

            s3 = document.getElementById('S3Resultados');
            let mediaData = media(Quantidades, dadosIn.length);
            let desvio = desvioPadrao(Quantidades, mediaData, dadosIn.length, processo);
            // s3.innerHTML += `<p style="color:black;">Moda: ${cortaString(acumularModa(Quantidades))}</p>
            // <p style="color:black;">Média: ${mediaData}</p>
            // <p style="color:black;">Mediana: ${cortaString(mediana(medianinhas, dadosIn.length))}</p>
            // <p style="color:black;">DesvioPadrão: ${desvio}</p>
            // <p style="color:black;">Variância: ${coeficienteVar(desvio, mediaData)}</p>`;
            s3.innerHTML += `
              <table class="table table-hover table-bordered table-sm" id="TabResult">
              <thead "thead-dark">
                <tr class="table-shazam">
                  <th scope="col">#</th>
                  <th scope="col">Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr class="table-light">
                  <td scope="row">Moda</td>
                  <td>${cortaString(acumularModa(Quantidades))}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">Média</td>
                  <td>${mediaData}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">Mediana</td>
                  <td>${cortaString(mediana(medianinhas, dadosIn.length))}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">DesvioPadrão</td>
                  <td>${desvio}</td>
                </tr>
                <tr class="table-light">
                  <td scope="row">Variância</td>
                  <td>${coeficienteVar(desvio, mediaData)}</td>
                </tr>
                <tr class="table-light">
                    <td scope="row">${mseparatriz + ' ' + percentual}</td>
                    <td>${exibePercentil(percentual, dadosIn, Quantidades, mseparatriz, tipoVariavel)}</td>
                </tr>
              </tbody>
            </table>
            `

        }

        let options = {
            title: {
                display: true,
                position: 'top',
                text: `Gráfico de ${vari}`,
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
                        display: true
                    },
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true
                    }
                }]
            }
        };



        if (tipoVariavel == 'Quantitativa Contínua') {
            options.scales.xAxes[0].categoryPercentage = 1.0;
            options.scales.xAxes[0].barPercentage = 1.0;
        };

        var ctx = document.getElementById('justChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: (tipoVariavel.substring(0,4) == "Qual")? 'pie':'bar',

            // The data for our dataset
            data: {
                labels: getLabel(quantidadesRepetidas(dadosIn, tipoVariavel)),
                datasets: [{
                    label: 'Frequência dos dados',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: getDados(quantidadesRepetidas(dadosIn, tipoVariavel))
                }]
            },

            // Configuration options go here
            options: options
        });
        Chart.defaults.global.defaultFontSize = 16;
        Chart.defaults.global.defaultFontColor = 'rgb (23,39,48)';
        Chart.platform.disableCSSInjection = true;
        document.getElementById('justChart').style.display = 'inherint';
        document.querySelector(".fab").style = "visibility: visible"
    }
}

function quantidadesRepetidas(vetor, tipoVariavel) {
    let Quantidades = {};
    let aux;

    if (isQuantiContinous(vetor, tipoVariavel).type) {
        vetor = vetor.map(Number);
        vetor = vetor.sort(function (a, b) { return a - b; });
        let ic = isQuantiContinous(vetor, tipoVariavel).intervalo;
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
                if (j > intervalo[i] && j < intervalo[i + 1]) {
                    aux++
                }
            }
            Quantidades[`${intervalo[i]} |-- ${intervalo[i + 1]}`] = aux;
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

/*
function ordinal() {
    let Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);

    let linha = 1,
        frequenciaAtual = 0,
        frequenciaPercentAtual = 0;

    for (let i in Quantidades) {
        let linhaAtual = document.getElementsByTagName('tr');
        linhaAtual[linha].innerHTML += `
            <td>${i}</td>
            <td>${Quantidades[i]}</td>
            <td>${(Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>
            <td>${frequenciaAtual += Quantidades[i]}</td>
            <td>${(frequenciaPercentAtual += Quantidades[i] / dadosIn.length * 100).toFixed(2)}</td>`;
        linha++;
    }

    document.getElementById('S2').innerHTML= "";.innerHTML = "";
}
*/

function isQuantiContinous(vetor, tipoVariavel) {

    if (tipoVariavel == 'Quantitativa Contínua') {
        dadosIn = vetor

        let at = (Math.max(...vetor) - Math.min(...vetor)) + 1;
        let k = Math.trunc(Math.sqrt(dadosIn.length));
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
    let tipoVariavel = document.getElementById('vars').value;
    let dadosIn = document.getElementById('PDados').value.replace(/ /g, '');
    if (dadosIn.endsWith(";")) {
        dadosIn = dadosIn.substring(0, dadosIn.length - 1);
    }
    dadosIn = dadosIn.split(";");

    let Quantidades = quantidadesRepetidas(dadosIn, tipoVariavel);
    let ordem = document.getElementById('ordem');
    // let cordem = document.getElementById('cordem');

    if (tipoVariavel == 'Qualitativa Ordinal' && ordem.innerText == "") {
        // cordem.style.display = "inline";
        // cordem.style.position = ""
        // ordem.style.visibility = "visible";
        let strHTML = "";

        for (let i in Quantidades) {
            strHTML += `<input type='radio' name='radOrdemVar' id='${i}'></option>
                                <label for='${i}'> ${i}; </label>`
        }

        ordem.innerHTML += strHTML + '<p id="nomeVars"></p><br>';

    } else if (tipoVariavel == 'Qualitativa Ordinal' && ordem.innerText != "") {
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
        // ordem.style.visibility = "hidden";
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
    return ((desvio / media).toFixed(4)) * 100;
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


function exibePercentil(valor, dadosIn, Quantidades, mseparatriz, tipoVariavel) {

    let size = dadosIn.length;
    let posicaoDado = Math.round(valor * size / 100);

    if (mseparatriz != 'Selecione...') {
        let count = 0;
        let aux;
        if (tipoVariavel == 'Quantitativa Contínua') {
            for (let i in Quantidades) {
                if (count >= posicaoDado) {
                    aux = i;
                    break;
                }
                count += Quantidades[i];
            }
            return Number(Number(aux.substring(0, aux.indexOf(" "))) + ((Math.trunc(posicaoDado) - count) / Quantidades[aux]) * isQuantiContinous(dadosIn, tipoVariavel).intervalo).toFixed(2);
        } else {
            return dadosIn[Math.trunc(posicaoDado)];
        }
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

    return result; //JavaScript object
    //return JSON.stringify(result); //JSON
}

function Voltar() {
    document.getElementById('S3').innerHTML = ""
    $('#S3').remove();
    document.getElementById('S2').style.display = 'inline';
    document.querySelector(".fab").style = "visibility: hidden"

}