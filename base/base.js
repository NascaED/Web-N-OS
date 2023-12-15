// Janela
const janelas = document.querySelectorAll('.janela')
janelas.forEach(janela => {
    let isDragging = false
    let offsetX, offsetY
    const iniciarArraste = (e) => {
        if (e.target.classList.contains('barraJanela')) {
            isDragging = true
            const janelaRect = janela.getBoundingClientRect();
            offsetX = e.clientX - janelaRect.left - (janelaRect.width / 2)
            offsetY = e.clientY - janelaRect.top - (janelaRect.height / 2)
            janela.style.userSelect = 'none'
            janela.style.cursor = 'grabbing'
        }
    }
    const pararArraste = () => {
        if (isDragging) {
            isDragging = false
            janela.style.userSelect = 'auto'
            janela.style.cursor = 'default'
        }
    }
    const arrastarJanela = (e) => {
        const isMaximizada = janela.classList.contains('maximizada')
        if (!isMaximizada && isDragging) {
            const jX = e.clientX - offsetX
            const jY = e.clientY - offsetY
            janela.style.left = `${jX}px`
            janela.style.top = `${jY}px`
        }
    }
    janela.addEventListener('mousedown', iniciarArraste)
    document.addEventListener('mouseup', pararArraste)
    document.addEventListener('mousemove', arrastarJanela)
})
//------------------------------------------
// Horario
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
//------------------------------------------
// Tela cheia
function telaG() {
    const element = document.documentElement
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari e Opera
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) { // Internet Explorer/Edge
        element.msRequestFullscreen()
    }
}
//------------------------------------------
// Adicione eventos de clique nos botões da janela
document.addEventListener('DOMContentLoaded', function () {
    var botoesMax = document.querySelectorAll('.btnJanela')
    botoesMax.forEach(function (botaoMax) {
        botaoMax.addEventListener('click', function (event) {
            // Obtem as coordenadas do clique em relação aos botões
            var rect = botaoMax.getBoundingClientRect()
            var x = event.clientX - rect.left
            var y = event.clientY - rect.top
            // Verifica se o clique ocorreu dentro do botão, considerando ::after
            if (x >= 40 && x <= 40 + rect.width && y >= 0 && y <= rect.height) {
                var janela = botaoMax.closest('.janela')
                var isMaximizada = janela.classList.contains('maximizada')
                if (isMaximizada) {
                    // Restaure o tamanho original da janela
                    janela.style.width = ''
                    janela.style.height = ''
                    janela.style.resize = 'both'
                    janela.classList.remove('maximizada')
                } else {
                    // Maximiza a janela
                    janela.style.width = '100%'
                    janela.style.height = 'calc(100% - 70px)'
                    janela.style.top = 'calc(50% - 35px)'
                    janela.style.left = '50%'
                    janela.style.resize = 'none'
                    janela.classList.add('maximizada')
                }
            }
            // Verifica se o clique ocorreu dentro do botão, considerando ::before
            if (x >= 20 && x <= 20 + rect.width && y >= 0 && y <= rect.height) {
                // Colocar alguma coisa kkk
            }
            // Verifica se o clique ocorreu dentro do botão Fechar
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                var fecharBotoes = document.querySelectorAll('.btnJanela');
                fecharBotoes.forEach(function (botao) {
                    botao.addEventListener('click', function () {
                        var janelaId = botao.closest('.janela').id;
                        fecharJanela(janelaId);
                    });
                });
            }
        })
    })
})

function fecharJanela(janelaId) {
    var div = document.getElementById(janelaId);
    if (div) {
        div.style.display = 'none';
    }
}
//------------------------------------------
// Abrir novas janelas
document.addEventListener('DOMContentLoaded', function () {
    var menuGlobal = document.querySelector('.menuGlobal')
    menuGlobal.addEventListener('click', function (event) {
        var target = event.target
        var dataTarget = target.getAttribute('data-target')
        if (dataTarget) {
            var janelaSelecionada = document.getElementById(dataTarget)
            if (janelaSelecionada) {
                janelaSelecionada.style.display = 'block'
                // Elevar a janela para a frente das outras
                var maxZIndex = 0
                janelas.forEach(function (otherJanela) {
                    var zIndex = parseInt(getComputedStyle(otherJanela).zIndex)
                    maxZIndex = Math.max(maxZIndex, zIndex);
                });
                janelaSelecionada.style.zIndex = (maxZIndex + 1).toString()
            }
        }
    });
});
//------------------------------------------