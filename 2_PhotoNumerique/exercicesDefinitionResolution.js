const listeBtn = Array.from(document.querySelectorAll('input[value="aide"]'))

function afficherAide(event) {
    const btn = event.target
    const div = event.target.parentNode.nextElementSibling
    btn.style.display = "none";
    div.style.display = "block";
}

listeBtn.forEach(btn => {
    btn.parentNode.nextElementSibling.style.display = "none";
    btn.addEventListener("click", afficherAide)
})
