const div = document.getElementById("ExerciceHistorique")
var cible
const Evenements = ["Les Laboratoires Bell créent le premier modem permettant de transmettre des données via une ligne téléphonique.",
                    "Naissance d'Arpanet : un réseau informatique reliant les universités américaines.",
                    "23 ordinateurs reliés sur ARPANET et envoi du premier courriel par Ray Tomlinson.",
                    "L'Angleterre et la Norvège rejoignent le réseau ARPANET avec chacune un ordinateur.",
                    "Adoption du mot « Internet ».",
                    "1 000 ordinateurs connectés.",
                    "10 000 ordinateurs connectés.",
                    "100 000 ordinateurs connectés.",
                    "Disparition d'ARPANET (démilitarisé). Remplacé par Internet (civil).",
                    "1 000 000 ordinateurs connectés.",
                    "36 000 000 ordinateurs connectés.",
                    "4 600 000 000 ordinateurs connectés."]
const Dates = [1958, 1967, 1971, 1973, 1983, 1984, 1987, 1989, 1990, 1992, 2000, 2021]

function fisherYatesShuffle(arr){
    for(var i =arr.length-1 ; i>0 ;i--){
        var j = Math.floor( Math.random() * (i + 1) ); //random index
        [arr[i],arr[j]]=[arr[j],arr[i]]; // swap
    }
}

fisherYatesShuffle(Evenements);
for (let i=0; i<Dates.length; i++) {
    const p = document.createElement("p")
    p.textContent = Dates[i] + ' :'
    p.className = "date"
    div.appendChild(p)
    const block = document.createElement("div")
    block.className = "evenement"
    block.draggable = "true"
    block.textContent = Evenements[i]
    div.appendChild(block)
}

div.addEventListener("dragover", (event) => {event.preventDefault(); cible = event.target;})
div.addEventListener("dragend", (event) => {
    event.preventDefault();
    console.log(cible.className)
    if (cible.className == "evenement") {
        const texte = event.target.textContent
        event.target.textContent = cible.textContent
        cible.textContent = texte
    }
})
