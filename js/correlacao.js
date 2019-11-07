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
    let xDataQuad = x.reduce((a, b) => a**2 + b**2, 0);
    let n = x.length;
    let sumXY = 0;

    for( let i = 0; i < xDados.length; i++) {
        sumXY += x[i] *y[i];
    }

    let a = ( n * sumXY - xDataSum*yDataSum) / ( n*xDataQuad - xDataSum**2);

    b = yDataSum/n - a * xDataSum/n;

    return {a, b}
}

function findY(x, a, b) {
    return a*x +b;
}

function findX(y, a, b) {
    return (y - b) / a;
}

function test() {
    x1 = [300, 400, 500, 600, 700, 800];
    y1 = [33, 25, 24, 18, 12, 10];
    r = -0.98;
    a = -0.05;
    b = 47.83;
    reg = regressao(x1,y1);
    console.log("Soma x: 3300");
    console.log("Soma y: 122");
    console.log("Soma xy: 59100");
    console.log("Soma quad x: 1.990.000");
    console.log("Soma quad y: 2858")
    console.log( "Correlação: " + correlacao(x1, y1) + " ==> " + r);
    console.log("ok");
    console.log( reg.a + " ==> " + a);
    console.log( reg.b + " ==> " + b);
    console.log("Regressão not ok");
}