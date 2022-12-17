const tableBayer = document.getElementById("Bayer")
const btnBayer = document.getElementById("btnBayer")
const pBayer = document.getElementById("pBayer")
const couleurs = ["blanc", "vert", "rouge", "bleu"]

function changeCouleur(event) {
    if (btnBayer.style.display != "none") {
        const index = couleurs.indexOf(event.target.className) + 1
        if (index > 0) {
            event.target.className = couleurs[index % couleurs.length]
        }
    }
}

function verifierBayer(event) {
    const texte = Array.from(tableBayer.getElementsByTagName("TD"))
                       .map(element => element.className == "blanc" ? "w" : element.className[0])
                       .join("")
    if (texte == "vrvrvrvrbvbvbvbvvrvrvrvrbvbvbvbv") {
        btnBayer.style.display = "None"
        pBayer.textContent = "Bravo, vous avec reconstité le filtre de Bayer."
    } else {
        pBayer.textContent = "Réessayer !"
    }
}

tableBayer.addEventListener("click", changeCouleur)
btnBayer.addEventListener("click", verifierBayer)
