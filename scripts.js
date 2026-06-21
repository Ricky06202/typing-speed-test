import data from "./data.json" with { type: "json"}

const parrafo = document.getElementsByClassName('mecanografia')[0]
const botonesDificultad = document.querySelectorAll(".boton-dificultad")
const botonesModo = document.querySelectorAll(".boton-modo")

const tiempo = document.getElementById("tiempo")
const divisorTiempo = document.querySelector(".tiempo")

let textoElegido = ""
let dificultadSeleccionada = botonesDificultad[0].textContent
let modoSeleccionado = botonesModo[0].textContent

function sacarTextoSegun(dificultad) {
    const textosFiltrados = data.filter(item => item.dificultad === dificultad.toLowerCase())

    if (textosFiltrados.length === 0) {
        return "No se encontraron textos para esta dificultad."
    }

    const aleatorio = Math.floor(Math.random() * textosFiltrados.length)
    return textosFiltrados[aleatorio].texto
}

let letrasHTML = []
let letraActual = 0

function actualizarTexto() {
    textoElegido = sacarTextoSegun(dificultadSeleccionada)

    const palabras = textoElegido.split(" ")

    parrafo.innerHTML = palabras.map((palabra) => {
        const letras = palabra.split("").map((letra) => (
            `<span>${letra}</span>`
        )).join("")

        return `<span class="palabra">${letras}</span>`
    }).join(`<span class="espacio">&nbsp;</span>`)

    // Seleccionamos de forma plana solo las letras y los espacios
    letrasHTML = parrafo.querySelectorAll(".palabra span, .espacio")
    letraActual = 0
}

botonesDificultad.forEach(element => {
    element.addEventListener("click", (e) => {
        botonesDificultad.forEach(btn => btn.classList.remove("boton-activado"))
        element.classList.add("boton-activado")
        dificultadSeleccionada = element.textContent
        actualizarTexto()
    })
});

botonesModo.forEach(element => {
    element.addEventListener("click", (e) => {
        botonesModo.forEach(btn => btn.classList.remove("boton-activado"))
        element.classList.add("boton-activado")
        modoSeleccionado = element.textContent
        if (modoSeleccionado.includes("Contra")) {
            tiempo.hidden = false
            divisorTiempo.hidden = false
        } else {
            tiempo.hidden = true
            divisorTiempo.hidden = true
        }
    })
});

actualizarTexto()

document.addEventListener("keydown", (e) => {
    if (textoElegido.at(letraActual) === e.key) {
        letrasHTML[letraActual].classList.add("letra-acertada")
        letraActual++
    } else if ("Backspace" === e.key && letraActual > 0) {
        letraActual--
        letrasHTML[letraActual].classList.remove("letra-acertada")
        letrasHTML[letraActual].classList.remove("letra-erronea")
    } else {
        letrasHTML[letraActual].classList.add("letra-erronea")
        letraActual++
    }
})

document.getElementById("reiniciar").addEventListener("click", (e) => {
    actualizarTexto()
})