function clic(animation) {
    animation.fonction(animation)
    animation.compteur += 1
}

function miseEnPlace(animation) {
        var txt = '<svg xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 580">'
        const sommets = [{nom:'A', x:20, y:260}, {nom:'B', x:140, y:320}, {nom:'C', x:140, y:200}, {nom:'D', x:260, y:260}, {nom:'E', x:380, y:320}, {nom:'F', x:380, y:200}, {nom:'G', x:500, y:260}]
        const aretes = [[0, 1], [0, 2], [1, 2], [1, 4], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]]
        aretes.forEach(A => {
            const d = sommets[A[0]]
            const a = sommets[A[1]] 
            txt += '<line x1="'+d.x+'" y1="'+d.y+'" x2="'+a.x+'" y2="'+a.y+'" stroke="black"/>'
        })
        sommets.forEach(s => {
            txt += '<circle cx="'+s.x+'" cy="'+s.y+'" r="16"/>'
            txt += '<text x="'+s.x+'" y="'+s.y+'">'+s.nom+'</text>'
        })
        animation.div.innerHTML = txt
        animation.svg = animation.div.firstChild
}

function fonctionAnimation(animation) {
    const fleches = [() => miseEnPlace(animation),
                     () => dessinerFleche(animation, '>', "SYN|seq=0|ack=0", "", "black"),
                     () => dessinerFleche(animation, '<', "ACK+SYN|seq=0|ack=1", "", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=1|ack=1", "", "black"),
                     () => dessinerFleche(animation, '>', "GET|seq=1|ack=1", "491 octets", "black"),
                     () => dessinerFleche(animation, '<', "ACK|seq=1|ack=492", "", "black"),
                     () => dessinerFleche(animation, '<', "200OK|seq=1|ack=492", "623 octets", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=492|ack=624", "", "black"),
                     () => {ajouterTexteMarge(animation, -8, "fermeture", "A", "black")
                            ajouterTexteMarge(animation, +8, "de la page", "A", "black")},
                     () => dessinerFleche(animation, '>', "FIN+ACK|seq=492|ack=624", "", "black"),
                     () => dessinerFleche(animation, '<', "FIN+ACK|seq=624|ack=493", "", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=493|ack=625", "", "black"),]
    if (animation.compteur < fleches.length) {fleches[animation.compteur]()}
}

const animation = {div:document.getElementById("animationIP"), compteur:0, fonction:fonctionAnimation}
animation.div.addEventListener("click", event => clic(animation))
