function clic(animation) {
    animation.fonction(animation)
    animation.compteur += 1
}

function dessinerFleche(animation, sens, texteHaut, texteBas) {
    if (sens == ">") {
        animation.svg.innerHTML += '<line x1="'+115+'" y1="'+animation.y+'" x2="'+385+'" y2="'+(animation.y+10)+'" marker-end="url(#triangle)"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(2)">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(2)">'+texteBas+'</text>'
    }
    if (sens == "<") {
        animation.svg.innerHTML += '<line x1="'+395+'" y1="'+animation.y+'" x2="'+125+'" y2="'+(animation.y+10)+'" marker-end="url(#triangle)"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(-2)">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(-2)">'+texteBas+'</text>'
    }
    animation.y += 40
}

function dessinerFlecheTronquee(animation, sens, texteHaut, texteBas) {
    if (sens == ">") {
        animation.svg.innerHTML += '<line x1="'+115+'" y1="'+animation.y+'" x2="'+385+'" y2="'+(animation.y+10)+'" marker-end="url(#triangle)"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(2)">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(2)">'+texteBas+'</text>'
    }
    if (sens == "<") {
        animation.svg.innerHTML += '<line x1="'+395+'" y1="'+animation.y+'" x2="'+125+'" y2="'+(animation.y+10)+'" marker-end="url(#triangle)"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(-2)">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(-2)">'+texteBas+'</text>'
    }
    animation.y += 40
}

function ajouterTexteMarge(animation, deltaY, texte, position) {
    if (position == 'A') {
        animation.svg.innerHTML += '<text x="30" y="'+(animation.y+deltaY)+'">'+texte+'</text>'
    }
    if (position == 'B') {
        animation.svg.innerHTML += '<text x="500" y="'+(animation.y+deltaY)+'">'+texte+'</text>'
    }
}

function miseEnPlace(animation) {
        animation.div.innerHTML = '<svg xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 440 440"><defs><marker id="triangle" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="strokeWidth" markerWidth="10" markerHeight="10" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z"/></marker></defs><polygon points="95,10 115,10 115,430 95,430" fill="none" stroke="black"/><polygon points="395,10 415,10 415,430 395,430" fill="none" stroke="black"/><text x="105" y="20">A</text><text x="405" y="20">B</text></svg>'
        animation.svg = animation.div.firstChild
}

function fonctionAnimation1(animation) {
    const fleches = [() => miseEnPlace(animation),
                     () => dessinerFleche(animation, '>', "SYN|seq=0|ack=0", ""),
                     () => dessinerFleche(animation, '<', "ACK+SYN|seq=0|ack=1", ""),
                     () => dessinerFleche(animation, '>', "ACK|seq=1|ack=1", ""),
                     () => dessinerFleche(animation, '>', "get|seq=1|ack=1", "491 octets"),
                     () => dessinerFleche(animation, '<', "ACK|seq=1|ack=492", ""),
                     () => dessinerFleche(animation, '<', "get|seq=1|ack=492", "623 octets"),
                     () => dessinerFleche(animation, '>', "ACK|seq=492|ack=624", ""),
                     () => {ajouterTexteMarge(animation, -8, "fermeture", "A"); ajouterTexteMarge(animation, +8, "de la page", "A")},
                     () => dessinerFleche(animation, '>', "FIN+ACK|seq=492|ack=624", ""),
                     () => dessinerFleche(animation, '<', "FIN+ACK|seq=624|ack=493", ""),
                     () => dessinerFleche(animation, '>', "ACK|seq=493|ack=625", ""),]
    if (animation.compteur < fleches.length) {fleches[animation.compteur]()}
}

function fonctionAnimation2(animation) {
    
}

function fonctionAnimation3(animation) {
    
}

const animation1 = {div:document.getElementById("animationTCP1"), compteur:0, fonction:fonctionAnimation1, y:40}
animation1.div.addEventListener("click", event => clic(animation1))

const animation2 = {div:document.getElementById("animationTCP2"), compteur:0, fonction:fonctionAnimation2, y:40}
animation2.div.addEventListener("click", event => clic(animation2))

const animation3 = {div:document.getElementById("animationTCP3"), compteur:0, fonction:fonctionAnimation3, y:40}
animation3.div.addEventListener("click", event => clic(animation3))
