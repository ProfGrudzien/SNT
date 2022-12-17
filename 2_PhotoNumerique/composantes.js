const tableComposantes = document.getElementById("tableComposantes")
const btnComposantes = document.getElementById("btnComposantes")
const btnCorrectionComposantes = document.getElementById("btnCorrectionComposantes")
const pComposantes = document.getElementById("pComposantes")
const composanteBleue = document.getElementById("composanteBleue")
const composanteRouge = document.getElementById("composanteRouge")
const composanteVerte = document.getElementById("composanteVerte")
const divComposantes = document.getElementById("divComposantes")
const divCorrectionComposantes = document.getElementById("divCorrectionComposantes")

function valeurAlea() {
    return Math.floor(Math.random()*256)
}

function cellAlea() {
    i = 1+Math.floor(Math.random()*2)
    j = 1+Math.floor(Math.random()*6)
    return [i, j]
}

function cell(i, j){
    return tableComposantes.rows[i].cells[j]
}

function listerVoisins(couleur) {
    const liste = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
    return liste.map(L => cell(io+L[0], jo+L[1]))
                .filter(td => td.className == couleur)
                .map(td => parseInt(td.textContent))
}

function moyenneVoisins(couleur) {
    const voisins = listerVoisins(couleur)
    return voisins.reduce((acc, val) => acc + val, 0) / voisins.length
}

function verifierComposantes(event) {
    const td = cell(io, jo)
    const r = parseFloat(composanteRouge.value)
    const v = parseFloat(composanteVerte.value)
    const b = parseFloat(composanteBleue.value)
    const R = td.className == "rouge" ? parseInt(td.textContent) : moyenneVoisins("rouge")
    const V = td.className == "vert" ? parseInt(td.textContent) : moyenneVoisins("vert")
    const B = td.className == "bleu" ? parseInt(td.textContent) : moyenneVoisins("bleu")
    if (!Number.isInteger(r) || !Number.isInteger(v) || !Number.isInteger(b)) {
        pComposantes.textContent = "Les valeurs des composantes doivent être des nombres entiers !"
        pComposantes.className = "erreur"
    } else if (Math.abs(R-r)>1 || Math.abs(V-v)>1 || Math.abs(B-b)>1) {
        pComposantes.textContent = "Erreur de calcul"
        pComposantes.className = "erreur"
    } else {
        pComposantes.textContent = "Bravo ! Ce pixel est de couleur :"
        pComposantes.className = "juste"
        divComposantes.style.backgroundColor = `rgb(${r}, ${v}, ${b})`
        divComposantes.style.height = "100px";
        btnComposantes.style.display = "none";
        btnCorrectionComposantes.style.display = "none";
        composanteRouge.readOnly = true;
        composanteVerte.readOnly = true;
        composanteBleue.readOnly = true;
    }
}

function afficherCorrectionComposante(event) {
    const td = cell(io, jo)
    const R = td.className == "rouge" ? parseInt(td.textContent) : Math.floor(moyenneVoisins("rouge"))
    const V = td.className == "vert" ? parseInt(td.textContent) : Math.floor(moyenneVoisins("vert"))
    const B = td.className == "bleu" ? parseInt(td.textContent) : Math.floor(moyenneVoisins("bleu"))
    composanteRouge.style.readOnly = true;
    composanteVerte.style.readOnly = true;
    composanteBleue.style.readOnly = true;
    btnComposantes.style.display = "none";
    btnCorrectionComposantes.style.display = "none";
    pComposantes.style.display = "none";
    /* composante connue */
    const pConnue = document.createElement("p")
    pConnue.textContent = `Le photo-site est recouvert d'un filtre ${td.className}. Donc `
    divCorrectionComposantes.appendChild(pConnue)
    /* composante rouge */
    if (td.className == "rouge") {
        pConnue.textContent += `R = ${R}.`
    } else {
        const p = document.createElement("p")
        const voisins = listerVoisins("rouge")
        p.innerHTML = `A cause du filtre ${td.className}, la valeur exacte du rouge est perdue. On calcule une estimation à l'aide des photo-sites voisins de couleur rouge.<br/> Donc R = (${voisins.join(" + ")}) ÷ ${voisins.length} ${voisins.reduce((acc, val) => acc + val, 0)/voisins.length == R ? "=" : "≈"} ${R}.`
        divCorrectionComposantes.appendChild(p)
    }
    /* composante verte */
    if (td.className == "vert") {
        pConnue.textContent += `V = ${V}.`
    } else {
        const p = document.createElement("p")
        const voisins = listerVoisins("vert")
        p.innerHTML = `A cause du filtre ${td.className}, la valeur exacte du vert est perdue. On calcule une estimation à l'aide des photo-sites voisins de couleur verte.<br/> Donc V = (${voisins.join(" + ")}) ÷ ${voisins.length} ${voisins.reduce((acc, val) => acc + val, 0)/voisins.length == V ? "=" : "≈"} ${V}.`
        divCorrectionComposantes.appendChild(p)
    }
    /* composante bleue */
    if (td.className == "bleu") {
        pConnue.textContent += `B = ${B}.`
    } else {
        const p = document.createElement("p")
        const voisins = listerVoisins("bleu")
        p.innerHTML = `A cause du filtre ${td.className}, la valeur exacte du bleu est perdue. On calcule une estimation à l'aide des photo-sites voisins de couleur bleue.<br/> Donc B = (${voisins.join(" + ")}) ÷ ${voisins.length} ${voisins.reduce((acc, val) => acc + val, 0)/voisins.length == B ? "=" : "≈"} ${B}.`
        divCorrectionComposantes.appendChild(p)
    }
    const p = document.createElement("p")
    p.textContent = "Ce pixel est de couleur :"
    divCorrectionComposantes.appendChild(p)
    divComposantes.style.backgroundColor = `rgb(${R}, ${V}, ${B})`
    divComposantes.style.height = "100px";
}

for (let i=0; i<4; i++) {
    for (let j=0; j<8; j++) {
        cell(i,j).textContent = valeurAlea()
    }
}
const [io, jo] = cellAlea()
cell(io, jo).style.border = "4px solid black"
composanteRouge.value = 0
composanteVerte.value = 0
composanteBleue.value = 0

btnComposantes.addEventListener("click", verifierComposantes)
btnCorrectionComposantes.addEventListener("click", afficherCorrectionComposante)
