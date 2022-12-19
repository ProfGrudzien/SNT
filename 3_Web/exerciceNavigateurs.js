const trExerciceNavigateurs = document.getElementById("trExerciceNavigateurs")
const pExerciceNavigateurs = document.getElementById("pExerciceNavigateurs")
const btnExerciceNavigateurs = document.getElementById("btnExerciceNavigateurs")
const listeInputs = Array.from(trExerciceNavigateurs.cells).map(td => td.children[0])
const listeReponsesExerciceNavigateurs = [["google chrome", "chrome"],
                                          ["microsoft edge", "edge"],
                                          ["modzilla firefox", "firefox"],
                                          ["opera"],
                                          ["safari"]]

function verifierExerciceNavigateurs(event) {
    pExerciceNavigateurs.textContent = "Bravo !"
    listeInputs.forEach((input, index) => {
        if (listeReponsesExerciceNavigateurs[index].indexOf(input.value.toLowerCase())>-1) {
            input.style.border = "2px solid green"
            input.value = listeReponsesExerciceNavigateurs[index][0]
            input.style.textTransform = "capitalize"
            input.readOnly = true
        } else {
            input.style.border = "2px solid red"
            pExerciceNavigateurs.textContent = "Réessayer !"
        }
    })
}

function gererChangementExerciceNavigateurs(event) {
    event.target.style.border = "none"
}

listeInputs.forEach(input => {
    input.value = ""
    input.addEventListener("change", gererChangementExerciceNavigateurs)
})
btnExerciceNavigateurs.addEventListener("click", verifierExerciceNavigateurs)
