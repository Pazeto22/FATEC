// Inicializa as funções que devem funcionar ao carregar a página
function startBody() {
    // Verifica o colormode selecionado
    if (localStorage.getItem("colormode") == "black") {
        DarkMode()
    } else if (localStorage.getItem("colormode") == "white") {
        LightMode()
    }
}

// ColorMode - Troca as cores da página

function DarkMode() {
    document.querySelector("link[href='./css/sobre.css']").href = "./css/blackmode/sobre.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-dark bg-dark"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: LightMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico-black.png"
    return localStorage.setItem("colormode", "black")
}

function LightMode() {
    document.querySelector("link[href='./css/blackmode/sobre.css']").href = "./css/sobre.css";
    document.querySelector("#nav1").className = "navbar fixed-top navbar-expand-lg navbar navbar-light bg-light"
    document.querySelector("#ColorModeIco").setAttribute("onClick", "javascript: DarkMode();");
    document.querySelector("#ColorModeIco").src = "./images/colormodeico.png"
    return localStorage.setItem("colormode", "white")
}