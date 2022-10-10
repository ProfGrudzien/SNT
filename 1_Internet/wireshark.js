const imgWireshark = document.getElementById("wireshark")
const divMain = document.querySelector(".main")

function showWireshark(event) {
    const back = document.createElement("div")
    const img = document.createElement("img")
    back.className = "wireshark"
    img.src = "WireShark.png"
    back.appendChild(img)
    divMain.after(back)
    back.addEventListener("click", hideWireshark)
}

function hideWireshark(event) {
    const back = document.querySelector(".wireshark")
    back.remove()
}

imgWireshark.addEventListener("click", showWireshark)
