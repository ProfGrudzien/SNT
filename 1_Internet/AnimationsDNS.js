function afficherLegende(animation, texte) {
    animation.legende.textContent = texte
}

function dessinerFleche(animation, Ax, Ay, Bx, By, texte) {
    const pathId = Math.floor(Math.random() * 10000);
    animation.svg.innerHTML += `<path id="${pathId}" d="M ${Ax} ${Ay} L ${Bx} ${By}"  marker-end="url(#Triangle)" stroke="black"/>`
    if (Ax > Bx) {
        animation.svg.innerHTML += `<text fill="black"><textPath xlink:href="#${pathId}" startOffset="50%" text-anchor="middle"><tspan rotate="180" dy="-10">${texte.split("").reverse().join("")}</tspan></textPath></text>`
    } else {
        animation.svg.innerHTML += `<text fill="black"><textPath xlink:href="#${pathId}" startOffset="50%" text-anchor="middle"><tspan dy="-10">${texte}</tspan></textPath></text>`
    }
}

function dessinerBulle(animation, x, y, texte) {
    animation.svg.innerHTML += `<circle cx="${x}" cy="${y}" r="16"/>`
    animation.svg.innerHTML += `<text x="${x}" y="${y}">${texte}</text>`
}

function placerImage(animation, x, y, hauteur, image) {
    animation.svg.innerHTML += `<image href="${image}" x="${x}" y="${y}" height="${hauteur}" />`
}

function ecrireTexte(animation, x, y, texte) {
    animation.svg.innerHTML += `<text x="${x}" y="${y}">${texte}</text>`
}

function miseEnPlace(animation) {
        var txt = '<svg xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 600 600"><defs><marker id="Triangle" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="strokeWidth" markerWidth="10" markerHeight="10" orient="auto" fill="black"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs>'
        txt += '</svg><p class="centrer">Je souhaite visiter www.salto.fr</p>'
        animation.div.innerHTML = txt
        animation.svg = animation.div.firstChild
        animation.svg.style.height = "550px"
        animation.legende = animation.div.lastChild
        placerImage(animation, 10, 300, 100, "laptop.png")
        ecrireTexte(animation, 80, 420, "mon ordinateur")
        ecrireTexte(animation, 80, 440, "192.132.4.45")
}

function clic(animation) {
    const frames = [() => miseEnPlace(animation),
                    () => {afficherLegende(animation, "Mon ordinateur demande l'adresse IP de www.salto.fr à un serveur DNS. L'adresse IP du DNS est présente dans les paramètres de mon ordinateur."),
                           placerImage(animation, 350, 100, 100, "server.png"),
                           ecrireTexte(animation, 385, 220, "serveur DNS"),
                           ecrireTexte(animation, 385, 240, "8.8.8.8"),
                           dessinerFleche(animation, 150, 300, 340, 150, "IP de www.salto.fr ?")},
                    () => {afficherLegende(animation, "Le serveur DNS répond en indiquant l'adresse IP que je dois utiliser."),
                           dessinerFleche(animation, 340, 170, 150, 320, "52.84.174.10")},
                    () => {afficherLegende(animation, "Je peut maintenant utiliser cette adresse IP pour demander la page www.salto.fr"),
                           placerImage(animation, 450, 400, 100, "server.png"),
                           ecrireTexte(animation, 485, 520, "serveur de salto"),
                           ecrireTexte(animation, 485, 540, "52.84.174.10"),
                           dessinerFleche(animation, 160, 380, 420, 450, "GET www.salto.fr")},
                    () => {afficherLegende(animation, "Le serveur de salto peut répondre en utilisant mon adresse IP indiquée au moment de ma demande."),
                           dessinerFleche(animation, 425, 470, 165, 400, "200 OK | <html...")}]
    if (animation.compteur < frames.length) {frames[animation.compteur]()}
    animation.compteur += 1
}

const animation = {div:document.getElementById("animationDNS"), compteur:0}
animation.div.addEventListener("click", event => clic(animation))
