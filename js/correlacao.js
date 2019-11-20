function manual(){
    escolha = document.querySelector("#escolha")
    manual = document.querySelector("#corre")
    escolha.style.visibility = "hidden"
    manual.style.visibility = "visible"
}

function getData() {
    xDataName = document.getElementsByName('indepx')[0].value
    xData = document.getElementById('xData').value.replace(/ /g, '');
    xData = xData.replace(/,/g, '.');
    yDataName = document.getElementsByName('indepy')[0].value
    yData = document.getElementById('yData').value.replace(/ /g, '');
    yData = yData.replace(/,/g, '.');

    if (xData.endsWith(";")) {
        xData = xData.substring(0, dataIn.length - 1);
    }
    xData = xData.split(";");
    for (let i = 0; i < xData.length; i++) {
        if (Number(xData[i]) != NaN) {
            xData[i] = Number(xData[i]);
        } else {
            xData[i].splice(i, 1);
        }
    }

    if (yData.endsWith(";")) {
        yData = yData.substring(0, dataIn.length - 1);
    }
    yData = yData.split(";");
    for (let i = 0; i < yData.length; i++) {
        if (Number(yData[i]) != NaN) {
            yData[i] = Number(yData[i]);
        } else {
            yData[i].splice(i, 1);
        }
    }
    
    if(yData.length != xData.length) {
        alert("Entrada de dados divergente, por favor corrija");
        return {xData, yData, xDataName, yDataName};
    } else {
        return {xData, yData, xDataName, yDataName};
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

function geraScatterDados (xData, yData) {
    let dados = [];

    for(let i =0; i < xData.length; i++) {
        dados. push({x: xData[i], y: yData[i]});
    };

    return dados;
}

function geraLineDados (xData, a, b) {
    let dados = [];

    for(let i =0; i < xData.length; i++) {
        dados. push({x: xData[i], y: findY(xData[i], a, b)});
    };
    console.log(dados);
    return dados;
}

function geraGraf(dataIn, a, b) {
    let options = {
        title: {
            display: true,
            position: 'top',
            text: `${dataIn.yDataName} em função de ${dataIn.xDataName}`, 
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
                labels: dataIn.xData,
                datasets: [{
                    showline: true,
                    pointRadius: 0,
                    borderWidth: 1,
                    label: 'Frequência dos dados',
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderDash: [1,1],
                    data: geraLineDados(dataIn.xData, a, b)
                }, {
                    showline: false,
                    borderWidth: 0,
                    label: 'Frequência dos dados', //Trocar nome, colocar adequado
                    fill: false,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0)',
                    data: geraScatterDados(dataIn.xData, dataIn.yData)
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
    let dataIn = getData();
    let cor = correlacao(dataIn.xData, dataIn.yData);
    let reg = regressao(dataIn.xData, dataIn.yData);
    document.querySelector("#resultados").style = "visibility: inherit"
    document.querySelector("#corre").style = "visibility: hidden"
    let graficoDiv = document.querySelector(".cGrafico")
    graficoDiv.innerHTML += `Correlação: ${cor} <br> Y = ${reg.a}X + ${reg.b} <br> <canvas id="justChart"></canvas>`
    geraGraf(dataIn, reg.a, reg.b);
}

function addPoint () {
    let y = null;
    let x = null;
    if (document.getElementById('xAdd')) {
        y = findY(dataIn.xData, reg.a, reg.b);
    } else {
        x = findX(dataIn.yData, reg.a, reg.b)
    }
}
function lerArq() {
    let arq = document.getElementById("fileDesc").files[0];
    let reader = new FileReader();
    reader.onload = function (e) {
        var dados = document.getElementById("xData");
        dados.value = reader.result;
    }
    reader.readAsText(arq);
}

function splitImportedData(){
    let data = document.getElementById("xData").value
    data = data.split("\n");
    console.log(data)
    document.getElementById("xData").value = data[0];
    document.getElementById("yData").value = data[1];
    manual();
}