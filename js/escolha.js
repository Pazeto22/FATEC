// ColorMode - Troca as cores da página

function DarkMode() {
    document.querySelector("link[href='./css/escolha.css']").href = "./css/blackmode/escolha.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-dark bg-dark"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: LightMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
    localStorage.setItem("colormode", "black")
}

function LightMode() {
    document.querySelector("link[href='./css/blackmode/escolha.css']").href = "./css/escolha.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-light bg-light"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: DarkMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
    localStorage.setItem("colormode", "white")
}

