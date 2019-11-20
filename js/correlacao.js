function manual(){
    escolha = document.querySelector("#escolha")
    manual = document.querySelector("#corre")
    escolha.style.visibility = "hidden"
    manual.style.visibility = "visible"
}

function getDados() {
    xDados = document.getElementById('xDados').value.replace(/ /g, '');
    yDados = document.getElementById('yDados').value.replace(/ /g, '');

    if (xDados.endsWith(";")) {
        xDados = xDados.substring(0, dadosIn.length - 1);
    }
    xDados = xDados.split(";");
    for (let i = 0; i < xDados.length; i++) {
        if (Number(xDados[i]) != NaN) {
            xDados[i] = Number(xDados[i]);
        } else {
            xDados[i].splice(i, 1);
        }
    }

    if (yDados.endsWith(";")) {
        yDados = yDados.substring(0, dadosIn.length - 1);
    }
    yDados = yDados.split(";");
    for (let i = 0; i < yDados.length; i++) {
        if (Number(yDados[i]) != NaN) {
            yDados[i] = Number(yDados[i]);
        } else {
            yDados[i].splice(i, 1);
        }
    }
    
    if(yDados.length != xDados.length) {
        alert("Entrada de dados divergente, por favor corrija");
        return {xDados, yDados};
    } else {
        return {xDados, yDados};
    }
}

function correlacao(x, y) {
    // (n * sum ( x_i * y_i) - (sum(x_i) * sum( y_i))) / sqrt ([n * sum( x_i ^2) - (sum (x_i)^2)] * [n * sum( y_i ^2) - (sum (y_i)^2)])
    let xDataSum = x.reduce((a, b) => a + b, 0);
    let yDataSum = y.reduce((a, b) => a + b, 0);
    let xDataQuad = x.reduce((a, b) => a + b**2, 0);
    let yDataQuad = y.reduce((a, b) => a + b**2, 0);
    let n = x.length;
    let sumXY = 0;

    for( let i = 0; i < x.length; i++) {
        sumXY = sumXY + x[i] *y[i];
    }
    let cor = (n*sumXY - xDataSum*yDataSum) / Math.sqrt( (n*xDataQuad - xDataSum ** 2) * (n*yDataQuad - yDataSum ** 2));

    return Number(cor.toFixed(2));
}


function regressao(x, y) {
    let xDataSum = x.reduce((a, b) => a + b, 0);
    let yDataSum = y.reduce((a, b) => a + b, 0);
    let xDataQuad = x.reduce((a, b) => a + b**2, 0);
    let n = x.length;
    let sumXY = 0;

    for( let i = 0; i < x.length; i++) {
        sumXY = sumXY + x[i] *y[i];
    }

    let a = ( n * sumXY - xDataSum*yDataSum) / ( n*xDataQuad - xDataSum**2);
    a = Number(a.toFixed(2));
    let b = yDataSum/n - a * xDataSum/n;
    b = Number(b.toFixed(2));

    return {a, b};
}

function findY(x, a, b) {
    return Number((a*x + b).toFixed(2));
}

function findX(y, a, b) {
    return Number(((y - b) / a).toFixed(2));
}

function geraScatterDados (xDados, yDados) {
    let dados = [];

    for(let i =0; i < xDados.length; i++) {
        dados. push({x: xDados[i], y: yDados[i]});
    };

    return dados;
}

function geraLineDados (xDados, a, b) {
    let dados = [];

    for(let i =0; i < xDados.length; i++) {
        dados. push({x: xDados[i], y: findY(xDados[i], a, b)});
    };
    console.log(dados);
    return dados;
}

function geraGraf(dadosIn, a, b) {
    let options = {
        title: {
            display: true,
            position: 'top',
            text: `Gráfico de var`, //Inserir nome de variavel
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
                type: 'linear',
                position: 'bottom',
                gridLines: {
                    display: true
                },
            }],
            yAxes: [{
                /*ticks: { //Verificar necessidade
                    min: 0,
                    beginAtZero: true
                },*/
                gridLines: {
                    display: true
                }
            }]
        }
    };

    var ctx = document.getElementById('justChart').getContext('2d');
        var mixedChart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: dadosIn.xDados,
                datasets: [{
                    showline: true,
                    pointRadius: 0,
                    borderWidth: 1,
                    label: 'Frequência dos dados',
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: geraLineDados(dadosIn.xDados, a, b)
                }, {
                    showline: false,
                    borderWidth: 0,
                    label: 'Frequência dos dados', //Trocar nome, colocar adequado
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0)',
                    data: geraScatterDados(dadosIn.xDados, dadosIn.yDados)
                }]
            },

            // Configuration options go here
            options: options
        });
        Chart.defaults.global.defaultFontSize = 16;
        Chart.defaults.global.defaultFontColor = 'rgb (23,39,48)';
        Chart.platform.disableCSSInjection = true;
}

function callCorrelacao () {
    let dadosIn = getDados();
    let cor = correlacao(dadosIn.xDados, dadosIn.yDados);
    let reg = regressao(dadosIn.xDados, dadosIn.yDados);
    let y = null;
    let x = null;
    if (true) {
        y = findY(dadosIn.xDados, reg.a, reg.b);
    } else {
        x = findX(dadosIn.yDados, reg.a, reg.b)
    }
    let resultDiv = document.querySelector("#resultados")
    resultDiv.style = "display: inherit"
    resultDiv.innerHTML += `Correlação: ${cor} <br> Y = ${reg.a}X + ${reg.b} <br> <canvas id="justChart"></canvas>`
    geraGraf(dadosIn, reg.a, reg.b);
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