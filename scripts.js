import data from "./data.json" with { type: "json"}

const parrafo = document.getElementsByClassName('mecanografia')[0]
const botonesDificultad = document.querySelectorAll(".boton-dificultad")

let dificultadSeleccionada = "facil"

function sacarTextoSegun(dificultad) {
    // Filtramos los textos por la dificultad seleccionada
    const textosFiltrados = data.filter(item => item.dificultad === dificultad)
    
    // Si no hay ninguno, retornamos un mensaje de error amigable
    if (textosFiltrados.length === 0) {
        return "No se encontraron textos para esta dificultad."
    }

    // Seleccionamos uno al azar usando Math.floor para evitar índices fuera de rango
    const aleatorio = Math.floor(Math.random() * textosFiltrados.length)
    return textosFiltrados[aleatorio].texto
}

function actualizarTexto() {
    parrafo.textContent = sacarTextoSegun(dificultadSeleccionada)
}

// Asignamos el listener a cada botón usando querySelectorAll
botonesDificultad.forEach(element => {
    element.addEventListener("click", (e) => {
        dificultadSeleccionada = element.textContent.toLowerCase()
        actualizarTexto()
    })
});

// Mostramos un texto inicial al cargar la página
actualizarTexto()
