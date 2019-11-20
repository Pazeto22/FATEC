function DarkMode() {
    document.querySelector("link[href='./css/dados.css']").href = "./css/dados-black.css";
    document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
    document.getElementById("logoIco").src = "./images/home-logo-black.png"
    document.getElementById("ColorModeIco").setAttribute("onClick", "javascript: LightMode();");
    document.getElementById("nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-dark bg-dark"
    document.getElementById("barraMS").style = "background:  rgb(59, 62, 73);"
}

function LightMode() {
    document.querySelector("link[href='./css/dados-black.css']").href = "./css/dados.css";
    document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
    document.getElementById("logoIco").src = "./images/home-logo.png"
    document.getElementById("ColorModeIco").setAttribute("onClick", "javascript: DarkMode();");
    document.getElementById("nav1").className = "navbar fixed-top navbar-expand-lg navbar-light bg-light"
    document.getElementById("barraMS").style = "background: #d3d3d3;"
}

