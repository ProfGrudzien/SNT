const mainDiv = document.querySelector("#exerciceListe div")
const pReponse = document.querySelector("#exerciceListe p")
const buttonRefaire = document.getElementById("refaire")
const buttonVerifier = document.getElementById("verifier")
const data = {}

function setUp(event) {
    const nb = 9 + Math.floor(Math.random() * 3);
    data.a = 1 + Math.floor(Math.random() * 4);
    data.b = 6 + Math.floor(Math.random() * 4);
    data.L = []
    for (i = 0 ; i < nb ; i++) {
        data.L.push(Math.floor(Math.random() * 100))
    }
    var txt = `On considère la liste <mark class="code">L = [${data.L.join(", ")}]</mark>.<br/>`
    txt += "Compléter les phrases suivantes :"
    txt += "<ol>"
    txt += `<li>L[${data.a}] donne la <input type="number" id="i1"><sup>ème</sup> valeur, c’est-à-dire la valeur <input type="number" id="v1">.</li>`
    txt += `<li>L[<input type="number" id="i2">] donne la ${data.b}<sup>ème</sup> valeur, c’est-à-dire la valeur ${data.L[data.b-1]}.</li>`
    txt += `<li>L[<input type="number" id="i3">] donne la 1<sup>ère</sup> valeur, c’est-à-dire la valeur ${data.L[0]}.</li>`
    txt += "</ol>"
    txt += ""
    mainDiv.innerHTML = txt
    pReponse.textContent = ""
}

function verifier(event) {
    var fautes = 0
    const rep1a = document.getElementById("i1");
    const bool1a = rep1a.value == data.a+1
    rep1a.className = bool1a ? "correct" : "incorrect"
    fautes += bool1a ? 0 : 1
    
    const rep1b = document.getElementById("v1");
    const bool1b = rep1b.value == data.L[data.a]
    rep1b.className = bool1b ? "correct" : "incorrect"
    fautes += bool1b ? 0 : 1
    
    const rep2 = document.getElementById("i2");
    const bool2 = rep2.value == data.b-1
    rep2.className = bool2 ? "correct" : "incorrect"
    fautes += bool2 ? 0 : 1
    
    const rep3 = document.getElementById("i3");
    const bool3 = rep3.value === "0"
    rep3.className = bool3 ? "correct" : "incorrect"
    fautes += bool3 ? 0 : 1
    
    pReponse.textContent = fautes == 0 ? "Bravo !" : `Vous avez ${fautes} erreur${fautes>1?"s":""}.`
    pReponse.style.color = fautes == 0 ? "green" : "red"
}

setUp(null)
buttonRefaire.addEventListener("click", setUp)
buttonVerifier.addEventListener("click", verifier)
