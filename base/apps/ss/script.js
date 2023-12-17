let senhacomumNumber = 0
let senhapreferencialNumber = 0
let ultimaSenhaNumero = "0000"
const panel = document.querySelector(".panel")
const currentNumberElement = document.querySelector("#current-number")
const ultimaSenha1Element = document.querySelector("#ultimaSenhaNumero")
const ultimaSenha2Element = document.querySelector("#ultimaSenhaNumero2")
const ultimaSenha3Element = document.querySelector("#ultimaSenhaNumero3")
const audio = new Audio("midias/ss.wav")
//---Data-->
const dataAtual = new Date()
const dia = dataAtual.getDate()
const mes = dataAtual.getMonth() + 1
const ano = dataAtual.getFullYear()
const dataAtualElement = document.getElementById("data-atual")
dataAtualElement.innerText = `${dia}/${mes}/${ano}`
//---Tipos de Senhas-->

function senhaComum() {
  senhacomumNumber++
  currentNumberElement.innerText = "" + senhacomumNumber.toString().padStart(3, "0")
  panel.classList.remove("animation")
  void panel.offsetWidth
  panel.classList.add("animation")
  historico()
  horarioSenha()
}

function senhaPreferencial() {
  senhapreferencialNumber++
  currentNumberElement.innerText = "P" + senhapreferencialNumber.toString().padStart(3, "0")
  panel.classList.remove("animation")
  void panel.offsetWidth
  panel.classList.add("animation")
  historico()
  horarioSenha()
}

function voltarSenhaComum() {
  if (senhacomumNumber > 0) {
    senhacomumNumber--
    currentNumberElement.innerText = senhacomumNumber.toString().padStart(3, "0")
    panel.classList.remove("animation")
    void panel.offsetWidth
    panel.classList.add("animation")
  }
}

function horarioSenha() {
  var horas = document.getElementById('horario-senha')
  var agora = new Date()
  var hh = String(agora.getHours()).padStart(2, '0')
  var mm = String(agora.getMinutes()).padStart(2, '0')
  var ss = String(agora.getSeconds()).padStart(2, '0')
  var formatoHora = "Hora chamada: " + hh + ':' + mm + ':' + ss
  horas.innerHTML = formatoHora
}

function historico(){
    ultimaSenha3Element.innerText = ultimaSenha2Element.innerText
    ultimaSenha2Element.innerText = ultimaSenha1Element.innerText
    ultimaSenha1Element.innerText = ultimaSenhaNumero
    ultimaSenhaNumero = currentNumberElement.innerText
}

//---Teclas para chamar senhas-->

document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp") {
    senhaComum()
    playSound()
  } else if (event.code === "ArrowDown") {

    voltarSenhaComum()
  } else if (event.code === "ArrowRight") {
    senhaPreferencial()
    playSound()
  }
});

//---Efeitos-->

function playSound() {
  audio.currentTime = 0
  audio.play()
}

function atualizarHoraData() {
  const agora = new Date()
  const horas = String(agora.getHours()).padStart(2, '0')
  const minutos = String(agora.getMinutes()).padStart(2, '0')
  const segundos = String(agora.getSeconds()).padStart(2, '0')

  const formato = `${horas}:${minutos}:${segundos}`
  document.getElementById('horas').textContent = formato
}
atualizarHoraData()
setInterval(atualizarHoraData, 1000)