// function ColorMode() {
//     let css = document.querySelector("link[href='./css/dados.css']")

//     if (css.href == './.href/dados..href') {
//         css.href = "./css/da.hrefdos-black.href.css"
//         document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
//     } else {
//         css.href = "./css/dados.css"
//         document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
//     }
// }

// Inicialização da Página + Salvamento ColorMode

function dataSave() {
    let css = document.querySelector("link[href='./css/dados.css']").href
    let icone = document.querySelector("#ColorModeIco").src
    let onclick = document.getElementById("ColorModeIco")
    let navbar = document.getElementById("nav1").className
    let barraMS = document.getElementById("barraMS").style

    localStorage.setItem("valor", css, icone, onclick, navbar, barraMS); // Salva o valor
    dataGet();
}

function dataGet() {
    var valorTemp = localStorage.getItem("valor") || 'dados';

    document.querySelector("link[href='./css/dados.css']").href = valorTemp;
    document.querySelector("#ColorModeIco").src = valorTemp;
    document.getElementById("ColorModeIco") = valorTemp;
    document.getElementById("nav1").className = valorTemp;
    document.getElementById("barraMS").style = valorTemp;
}

function StartBody() {
    shazamBarra();
    dataGet();
}

/////////////////////////////////////////////////

function DarkMode() {
    document.querySelector("link[href='./css/dados.css']").href = "./css/dados-black.css";
    document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
    document.getElementById("ColorModeIco").setAttribute("onClick", "javascript: LightMode();");
    document.getElementById("nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-dark bg-dark"
    document.getElementById("barraMS").style = "background:  rgb(33, 35, 41);"
}

function LightMode() {
    document.querySelector("link[href='./css/dados-black.css']").href = "./css/dados.css";
    document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
    document.getElementById("ColorModeIco").setAttribute("onClick", "javascript: DarkMode();");
    document.getElementById("nav1").className = "navbar fixed-top navbar-expand-lg navbar-light bg-light"
    document.getElementById("barraMS").style = "background: #d3d3d3;"
}

