class Sommet {
    constructor(nom, n) {
        this.nom = nom
        this.successeurs = []
        this.predecesseurs = []
        this.PageRank = 1/n
        this.n = n
    }
    
    addSuccesseurs(s) {
        this.successeurs.push(s)
        s.predecesseurs.push(this)
    }
    
    updatePageRank() {
        const somme = this.predecesseurs
                          .map(s => s.PageRank/s.successeurs.length)
                          .reduce((acc, val) => acc + val, 0)
        this.PageRank = 0.15/this.n + 0.85*somme
    }
}

const A = new Sommet('A', 10)
const B = new Sommet('B', 10)
const C = new Sommet('C', 10)
const D = new Sommet('D', 10)
const E = new Sommet('E', 10)
const F = new Sommet('F', 10)
const G = new Sommet('G', 10)
const H = new Sommet('H', 10)
const I = new Sommet('I', 10)
const J = new Sommet('J', 10)

A.addSuccesseurs(I)
A.addSuccesseurs(B)
A.addSuccesseurs(G)
B.addSuccesseurs(I)
B.addSuccesseurs(A)
C.addSuccesseurs(A)
D.addSuccesseurs(A)
D.addSuccesseurs(I)
E.addSuccesseurs(I)
E.addSuccesseurs(B)
E.addSuccesseurs(A)
F.addSuccesseurs(A)
F.addSuccesseurs(I)
G.addSuccesseurs(H)
G.addSuccesseurs(I)
I.addSuccesseurs(J)
J.addSuccesseurs(I)

const liste_sommets = [A, B, C, D, E, F, G, H, I, J]

function choice(liste) {
    return liste[Math.floor(Math.random() * liste.length)];
}

class Bot {
    constructor(liste) {
        this.current = new Object()
        this.current.successeurs = []
        this.liste = liste
        this.nb = 0
    }
    
    next() {
        if (Math.random()<0.85 && this.current.successeurs.length>0) {
            return choice(this.current.successeurs)
        } else {
            return choice(this.liste)
        }
    }
    
    crawl(n) {
        for (let i=0; i<n; i++) {
            this.current = this.next()
            this.current.updatePageRank()
            this.nb += 1
        }
    }
}

function handleClic(bot, n) {
    bot.crawl(n)
    document.getElementById("messagePageRank").textContent = `Le bot est sur la page ${bot.current.nom}, il a déjà parcouru ${bot.nb} page${bot.nb>1?"s":""}`
    bot.liste.forEach(s => {
        const n = Math.round(100000*s.PageRank)/100000
        document.getElementById(s.nom).textContent = n.toString(10).replace('.', ',')
    })
}

function miseEnPlace(event) {
    const bot = new Bot(liste_sommets)
    const txt = `<table id="tablePageRank">
                    <tr><th>s</th><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td><td>G</td><td>H</td><td>I</td><td>J</td></tr>
                    <tr><th>PR</th><td id="A">0,1</td><td id="B">0,1</td><td id="C">0,1</td><td id="D">0,1</td><td id="E">0,1</td><td id="F">0,1</td><td id="G">0,1</td><td id="H">0,1</td><td id="I">0,1</td><td id="J">0,1</td></tr>
                </table>
                <p class="centrer" id="messagePageRank">Initialisation : tous les PageRank valent <span class="frac"><span class="haut">1</span><span class="bas">n</span></span> = 0,1</p>
                <p class="centrer">
                    <input type="button" value="parcourir 1 page" id="un" class="calculer">
                    <input type="button" value="parcourir 100 page" id="cent" class="calculer">
                </p>`
    document.getElementById("PageRank").innerHTML = txt
    document.getElementById("un").addEventListener("click", event => handleClic(bot, 1))
    document.getElementById("cent").addEventListener("click", event => handleClic(bot, 100))
}

document.getElementById("lancerPageRank").addEventListener("click", miseEnPlace)
