function shazamBarra(){
    //Funcionamento da barra da medida separatriz
    var slider = document.getElementById("barraMS")
    var vbms = document.getElementById("valorBMS")
    vbms.innerHTML = `${slider.value}%`; // Mostra o valor inicial
    
    // Atualiza o valor conforme o usuário usa
    slider.oninput = function() {
    vbms.innerHTML = `${slider.value}%`
    }
}

function shazamMedida(){
    var barra = document.getElementById("barraMS")
    var barraescolha = document.getElementById("ems").value

    if (barraescolha == "Percentil"){
        barra.min = 1
        barra.max = 100
        barra.step = 1
        barra.value = 1
    } else if (barraescolha == "Decil"){
        barra.min = 10
        barra.max = 100
        barra.step = 10
        barra.value = 10
    } else if (barraescolha == "Quintil"){
        barra.min = 20
        barra.max = 100
        barra.step = 20
        barra.value = 20
    } else if (barraescolha == "Quartil"){
        barra.min = 25
        barra.max = 100
        barra.step = 25
        barra.value = 25
    }
}

function shazam() {

    let vari = document.getElementById('PVar').value;
    let dadosIn = document.getElementById('PDados').value.replace(/ /g,'');
    if (dadosIn.endsWith(";")){
        dadosIn = dadosIn.substring(0, dadosIn.length-1);
    }
    dadosIn = dadosIn.split(";");
    let tipoVariavel = document.getElementById('vars').value;
    // let abridor = window.tden('tabelas.html', '_self')
    // alert(dadosIn)
    // console.log(abridor.document.getElementById("titulo").innerHTML)

    document.getElementsByTagName('body')[0].innerHTML += `
    <section id = 'S3'>
        <div class="table-responsive">
            <table>
                <thead class="thead-dark">
                    <tr id='titulo'>
                        <td >${vari}</td>
                        <td >FI</td>
                        <td >FR%</td>
                        <td >FAC</td>
                        <td >FAC%</td>
                    </tr>
                </thead>
                <tbody id='corpo'></tbody>
            </table>
        </div>
    </section>
    `;

    if (tipoVariavel == 'Qualitativa Nominal') {

        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosIn.length; i++) {
            dadosIn[i] = dadosIn[i].trim();
            dadosIn[i] = dadosIn[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosIn.sort();


        // Escrevendo a tabela
        let Quantidades = quantidadesRepetidas(dadosIn);

        let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0, medianinhas = {};
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

        document.getElementById('S2').innerHTML = "";

        s3 = document.getElementById('S3');
        s3.innerHTML += `
        <p style="color:black;">Moda: ${acumularModa(Quantidades)}</p>
        <p style="color:black;">Mediana: ${mediana(medianinhas, dadosIn.length)}</p>
        <canvas id="justChart"></canvas>`;

    } else if (tipoVariavel == 'Qualitativa Ordinal') {

        let ordem = String(document.getElementById('nomeVars').innerHTML);

        if (ordem.endsWith("<br>")) {
            ordem = ordem.substring(0, ordem.length-4);
        }
        ordem = ordem.toUpperCase();
        ordem = ordem.split("<BR>");

        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosIn.length; i++) {
            dadosIn[i] = dadosIn[i].trim();
            dadosIn[i] = dadosIn[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosIn.sort();

        let aux = [];
        for (let i = 0; i < ordem.length; i++) {
            for( let j = 0; j < dadosIn.length; j++) {
                if (dadosIn[j] == ordem[i]){
                    aux.push(dadosIn[j]);
                }
            }
        }

        dadosIn = aux;

        // Escrevendo a tabela
        let Quantidades = quantidadesRepetidas(dadosIn);
        

        let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0, medianinhas = {};
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

        document.getElementById('S2').innerHTML = "";

        s3 = document.getElementById('S3');
        s3.innerHTML += `
        <p style="color:black;">Moda: ${acumularModa(Quantidades)}</p>
        <p style="color:black;">Mediana: ${mediana(medianinhas, dadosIn.length)}</p>
        <canvas id="justChart"></canvas>`;
    } else if (tipoVariavel == 'Quantitativa Discreta') {
        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosIn.length; i++) {
            dadosIn[i] = dadosIn[i].trim();
            dadosIn[i] = dadosIn[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosIn.sort();


        // Escrevendo a tabela
        let Quantidades = quantidadesRepetidas(dadosIn);

        let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0, medianinhas = {};

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

        document.getElementById('S2').innerHTML = "";

        s3 = document.getElementById('S3');
        s3.innerHTML += `<p style="color:black;">Moda: ${acumularModa(Quantidades)}</p>
        <p style="color:black;">Média: ${media(Quantidades, dadosIn.length)}</p>
        <p style="color:black;">Mediana: ${mediana(medianinhas, dadosIn.length)}</p>
        <canvas id="justChart"></canvas>`;


    }  else if (tipoVariavel == 'Quantitativa Contínua') {
        //Semelhante a discreta porém com agrupamentos
    }

    function getLabel (Quantidades) {
            let label = [];

            for (let i in Quantidades){
                label.push(i);
            }
            return label;
        };
    
    function getDados (Quantidades) {
        let dados = [];

        for (let i in Quantidades){
            dados.push(Quantidades[i]);
        }
        return dados;
    }
    
    let options = {
        title: {
            display: true,
            position: 'top',
            text: `Gráfico de ${vari}`
        },
        legend: {
            display: false
        },
        elements: {
            //https://www.chartjs.org/docs/latest/configuration/elements.html
            backgroundColor: 'rgba(0, 0, 0, 0,1)',
            borderSkipped: 'right'
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false
                },
            }],
            yAxes: [{
                ticks: {
                    min: 0,
                    beginAtZero: true
                },
                gridLines: {
                    display: false
                }
            }]
        }
    };

    if (tipoVariavel == 'Quantitativa Contínua') {
        options.scales.xAxes[0].categoryPercentage=1.0;
        options.scales.xAxes[0].barPercentage= 1.0;
    };

    var ctx = document.getElementById('justChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: (tipoVariavel == 'Quantitativa Contínua') ? 'line' : 'bar',

        // The data for our dataset
        data: {
            labels: getLabel(quantidadesRepetidas(dadosIn)),
            datasets: [{
                label: 'Frequência dos dados',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: getDados(quantidadesRepetidas(dadosIn))
            }]
        },

        // Configuration options go here
        options: options
    });

    
}
    

function quantidadesRepetidas(vetor) {
    let Quantidades = {};
    let aux;
    for (let i of vetor) {
        aux = 0;
        for (let j of vetor) {
            if (j === i) {
                aux++
            }
        }
        Quantidades[`${i}`] = aux;
    }

    return Quantidades;
}

function ordinal() {
    let Quantidades = quantidadesRepetidas(dadosIn);
    
    let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0;

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

    document.getElementById('S2').innerHTML = "";
}

function isOrdinal(){
    let tipoVariavel = document.getElementById('vars').value;
    let dadosIn = document.getElementById('PDados').value.replace(/ /g,'');

    if (dadosIn.endsWith(";")){
        dadosIn = dadosIn.substring(0,dadosIn.length-1);
    }
    dadosIn = dadosIn.split(";");

    let Quantidades = quantidadesRepetidas(dadosIn);
    let ordem = document.getElementById('ordem');

    if (tipoVariavel == 'Qualitativa Ordinal' && ordem.innerText == "") {
        ordem.style.visibility = "visible";
        let strHTML = "";

        for (let i in Quantidades){
            strHTML +=`<input type='radio' name='radOrdemVar' id='${i}'></option>
                                <label for='${i}'> ${i}</label>`
        }

        ordem.innerHTML += strHTML + '<p id="nomeVars"></p>';

    } else if (tipoVariavel == 'Qualitativa Ordinal' && ordem.innerText != ""){
        let selectVar = document.getElementsByName('radOrdemVar');
        let ordem = document.getElementById('ordem');
        let strHTML = "";
        
        let parConteudo = String(document.getElementById('nomeVars').innerHTML);

        if (parConteudo.length > 4){
            if(parConteudo.endsWith("<br>")){
                parConteudo = parConteudo.substring(0, parConteudo.length-4);
            }

            parConteudo = parConteudo.replace(/\<br\>\<br\>/g, '<br>');

            parConteudo = parConteudo.split("<br>");
        } else if(parConteudo == ""){
            parConteudo = [];
        } else {
            parConteudo = Array(parConteudo);
        }

        for (let i = 0; i < selectVar.length; i++) {
            if(selectVar[i].checked == true){
                parConteudo.push(`${selectVar[i].id}`);
            }
        }

        document.getElementById('ordem').innerHTML = "";

        for (let i in Quantidades){
            if (!(parConteudo.includes(String(i)))){
                strHTML +=`<input type='radio' name='radOrdemVar' id='${i}'></option>
                                    <label for='${i}'> ${i}</label>`
            }
        }

        ordem.innerHTML += strHTML + '<p id="nomeVars"></p>';
        
        for (let i = 0; i < parConteudo.length; i++){
            if (parConteudo != ""){
                document.getElementById('nomeVars').innerHTML += parConteudo[i]+"<br>";
            }
        }
    } else {
        ordem.innerText = ""
        ordem.style.visibility = "hidden";
    }
}

function acumularModa(dadosIn) {
    let maior = 0, moda = [];

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
    let posicoes = [], medianas = [];

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

function desvioPadrao(Quantidades, media, totalFreq, processo){
    let sum = 0;
    // Precisa de calcular as frequencias 
    for (let i in Quantidades) {
        sum += (i - media)**2*Quantidades[i];
    }

    if(processo == "Amostra"){
        return Math.sqrt(sum/(totalFreq-1)).toFixed(2);
    } else {
        return Math.sqrt(sum/totalFreq).toFixed(2);
    }
}

function coeficienteVar(desvio, media){
    return desvio/media;
}