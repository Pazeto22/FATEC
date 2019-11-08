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

    return cor.toFixed(2);
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
    a = a.toFixed(2);
    let b = yDataSum/n - a * xDataSum/n;
    b = b.toFixed(2);

    return {a, b};
}

function findY(x, a, b) {
    return a*x +b;
}

function findX(y, a, b) {
    return (y - b) / a;
}

function geraScatterDados (xDados, yDados) {
    let dados = [];

    min = [Math.min(xDados), Math.min(yDados)]
    max = [Math.max(xDados), Math.max(yDados)]

    for(let i =0; i < xDados.length; i++) {
        dados. push({x: xDados[i], y: yDados[i]});
    };

    return dados;
}

function geraLineDados (xDados, yDados) {
    let dados = [];

    let minX = Math.min(...xDados);
    console.log(minX)
    let minY = Math.min(...yDados);
    let maxX = Math.max(...xDados);
    let maxY = Math.max(...yDados);
    fator = [maxX - minX, maxY - minY];
    console.log(fator)
    n = xDados.length;

    minX = minX - fator[0] / n;
    console.log(minX)
    minY = minY - fator[1] / n;
    maxX = maxX + fator[0] / n;
    maxY = maxY + fator[1] / n;

    dados = [{x: minX.toFixed(2), y: minY.toFixed(2)}, {x: maxX.toFixed(2), y: maxY.toFixed(2)}];

    return dados;
}

function geraGraf(dadosIn) {
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
                ticks: { //Verificar necessidade
                    min: 0,
                    beginAtZero: true
                },
                gridLines: {
                    display: true
                }
            }]
        }
    };

    var ctx = document.getElementById('justChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'scatter',

            // The data for our dataset
            data: {
                labels: "getLabel(quantidadesRepetidas(dadosIn, tipoVariavel))",
                datasets: [{
                    label: 'Frequência dos dados', //Trocar nome, colocar adequado
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: geraScatterDados(dadosIn.xDados, dadosIn.yDados)
                }, {
                    label: 'Frequência dos dados',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: geraLineDados(dadosIn.xDados, dadosIn.yDados),
                    
                    // Changes this dataset to become a line
                    type: 'line'
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
    let find = document.getElementById("find").value;
    let y = null;
    let x = null;
    if (find == "Encontrar Y") {
        y = findY(dadosIn.xDados, reg.a, reg.b);
    } else {
        x = findX(dadosIn.yDados, reg.a, reg.b)
    }
    geraGraf(dadosIn);
}