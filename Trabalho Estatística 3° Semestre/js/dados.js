function shazam() {

    function QuantidadesRepetidas(vetor) {
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

    let vari = document.getElementById('PVar').value
    let dadosI = document.getElementById('PDados').value.split(';')
    let tipoVariavel = document.getElementById('vars').value;
    // let abridor = window.tden('tabelas.html', '_self')
    // alert(dadosI)
    // console.log(abridor.document.getElementById("titulo").innerHTML)

    document.getElementsByTagName('body')[0].innerHTML += `
    <section id = 'S3'>
        <div class="table-responsive">
            <table>
                <thead class="thead-dark">
                    <tr id='titulo'>
                        <td>${vari}</td>
                        <td>Frequência Simples</td>
                        <td>FR%</td>
                        <td>FAC</td>
                        <td>FAC%</td>
                    </tr>
                </thead>
                <tbody id='corpo'></tbody>
            </table>
        </div>
    </section>
    `;

    if (tipoVariavel == 'Qualitativa Nominal') {

        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosI.length; i++) {
            dadosI[i] = dadosI[i].trim();
            dadosI[i] = dadosI[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosI.sort();


        // Escrevendo a tabela
        let Quantidades = QuantidadesRepetidas(dadosI);

        let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0;
        for (let i in Quantidades) {
            let linhaAtual = document.getElementsByTagName('tr');
            linhaAtual[linha].innerHTML += `
            <td>${i}</td>
            <td>${Quantidades[i]}</td>
            <td>${(Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>
            <td>${frequenciaAtual += Quantidades[i]}</td>
            <td>${(frequenciaPercentAtual += Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>`;
            linha++;
        }
        document.getElementById('S2').innerHTML = "";
        s3 = document.getElementById('S3');
        s3.innerHTML += `
        <p style="color:black;">Média: ${media(Quantidades, dadosI.length)}</p>
        <p style="color:black;">Mediana: ${mediana(medianinhas, dadosI.length)}</p>`;

    } else if (tipoVariavel == 'Quantitativa Discreta') {
        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosI.length; i++) {
            dadosI[i] = dadosI[i].trim();
            dadosI[i] = dadosI[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosI.sort();


        // Escrevendo a tabela
        let Quantidades = QuantidadesRepetidas(dadosI);

        let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0, medianinhas = {};
        for (let i in Quantidades) {
            let linhaAtual = document.getElementsByTagName('tr');
            linhaAtual[linha].innerHTML += `
            <td>${i}</td>
            <td>${Quantidades[i]}</td>
            <td>${(Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>
            <td>${frequenciaAtual += Quantidades[i]}</td>
            <td>${(frequenciaPercentAtual += Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>`;
            linha++;
            medianinhas[`${i}`] = frequenciaAtual;
        }
        document.getElementById('S2').innerHTML = "";
        s3 = document.getElementById('S3');
        s3.innerHTML += `<p style="color:black;">Moda: ${acumularModa(Quantidades)}</p>
        <p style="color:black;">Média: ${media(Quantidades, dadosI.length)}</p>
        <p style="color:black;">Mediana: ${mediana(medianinhas, dadosI.length)}</p>`;



    } else if (tipoVariavel == 'Qualitativa Ordinal') {

        let corpo = document.getElementById('corpo');
        for (let i = 0; i < dadosI.length; i++) {
            dadosI[i] = dadosI[i].trim();
            dadosI[i] = dadosI[i].toUpperCase();
            corpo.innerHTML += `<tr></tr>`;
        }
        dadosI.sort();
    }


}

function ordinal() {
    let Quantidades = QuantidadesRepetidas(dadosI);

    let linha = 1, frequenciaAtual = 0, frequenciaPercentAtual = 0;
    for (let i in Quantidades) {
        let linhaAtual = document.getElementsByTagName('tr');
        linhaAtual[linha].innerHTML += `
            <td>${i}</td>
            <td>${Quantidades[i]}</td>
            <td>${(Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>
            <td>${frequenciaAtual += Quantidades[i]}</td>
            <td>${(frequenciaPercentAtual += Quantidades[i] / dadosI.length * 100).toFixed(2)}</td>`;
        linha++;
    }
    document.getElementById('S2').innerHTML = "";
}


function acumularModa(dadosI) {
    let maior = 0, moda = [];
    for (let i in dadosI) {
        if (dadosI[i] > maior) {
            maior = dadosI[i];
        }
    }
    for (let i in dadosI) {
        if (dadosI[i] == maior) {
            moda.push(i);
        }
    }
    return moda;

}

function media(dadosI, totalFreq) {
    let soma = 0;
    for (let i in dadosI) {
        soma += parseInt(i) * dadosI[i];
    }
    return (soma / totalFreq).toFixed(2);
}

function mediana(dadosI, totalFreq) {
    let posicoes = [], medianas = [];
    if (totalFreq % 2 == 0) {
        posicoes.push(totalFreq / 2, totalFreq / 2 + 1);
    } else {
        posicoes.push((totalFreq - 1) / 2 + 1);
    }

    for (let j of posicoes) {
        let controle = 0
        for (let i in dadosI) {
            if (j >= controle && j < dadosI[i]) {
                medianas.push(i);
                break
            }
            controle = dadosI[i];
        }

    }
    return medianas;
}