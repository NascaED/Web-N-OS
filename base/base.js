{// Coisas da Janela
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
    // Adiciona eventos de clique nos botões da janela
    document.addEventListener('DOMContentLoaded', function () {
        var btnjj = document.querySelectorAll('.btnJanela')
        btnjj.forEach(function (btnjj) {
            btnjj.addEventListener('click', function (event) {
                var rect = btnjj.getBoundingClientRect()
                var x = event.clientX - rect.left
                var y = event.clientY - rect.top
                // Região para Fechar (0 pixels de distância à direita)
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    var janelaId = btnjj.closest('.janela').id
                    fecharJanela(janelaId)
                    removerCamadaEscura()
                }
                // Região para Focar a janela (20 pixels à direita)
                if (x >= 20 && x <= 20 + rect.width && y >= 0 && y <= rect.height) {
                    var janelaA = btnjj.closest('.janela').id
                    var jID = document.getElementById(janelaA)
                    var isFocos = jID.classList.contains('f')
                    if (isFocos) {
                        jID.style.border = '1px solid #444'
                        removerCamadaEscura()
                        jID.classList.remove('f')
                    } else {
                        jID.style.border = '1px solid #ccc'
                        adicionarCamadaEscura(jID)
                        jID.classList.add('f')
                    }
                }
                // Região de clique para Maximizar (40 pixels à direita)
                if (x >= 40 && x <= 40 + rect.width && y >= 0 && y <= rect.height) {
                    // Coloque o código para a terceira região aqui
                    var janela = btnjj.closest('.janela')
                    var isMaximizada = janela.classList.contains('maximizada')
                    if (isMaximizada) {// Restaure o tamanho original da janela
                        janela.style.width = ''
                        janela.style.height = ''
                        janela.style.resize = 'both'
                        janela.classList.remove('maximizada')
                    } else {// Maximiza a janela
                        janela.style.width = 'calc(100% - 1px)'
                        janela.style.height = 'calc(100% - 70px)'
                        janela.style.top = 'calc(50% - 35px)'
                        janela.style.left = '50%'
                        janela.style.resize = 'none'
                        janela.classList.add('maximizada')
                    }
                }
            })
        })
    })
    //------------------------------------------
    // Fecha janela
    function fecharJanela(janelaId) {
        var div = document.getElementById(janelaId)
        if (div) {
            div.style.display = 'none'
            div.style.border = '1px solid #444'
            div.classList.remove('f')
        }
    }
    //------------------------------------------
    // Função para adicionar a camada escura
    function adicionarCamadaEscura(janeladeFoco) {
        var camadaEscura = document.createElement('div')
        camadaEscura.id = 'camadaEscura'
        camadaEscura.style.position = 'fixed'
        camadaEscura.style.top = '0'
        camadaEscura.style.left = '0'
        camadaEscura.style.width = '100%'
        camadaEscura.style.height = '100%'
        camadaEscura.style.backgroundColor = '#0005'
        camadaEscura.style.zIndex = (parseInt(getComputedStyle(janeladeFoco).zIndex) - 1).toString()
        document.body.appendChild(camadaEscura)
    }
    //--------------------------------------
    // Função para remover a camada escura
    function removerCamadaEscura() {
        var camadaEscura = document.getElementById('camadaEscura')
        if (camadaEscura) {
            camadaEscura.parentNode.removeChild(camadaEscura)
        }
    }
    //--------------------------------------
    // Abrir novas janelas
    document.addEventListener('DOMContentLoaded', configurarMenuGlobal)
    function configurarMenuGlobal() {
        var imagensComDataTarget = document.querySelectorAll('img[data-target]')
        imagensComDataTarget.forEach(function (imagem) {
            imagem.addEventListener('click', function (event) {
                var dataTarget = imagem.getAttribute('data-target')
                if (dataTarget) {
                    var janelaSelecionada = document.getElementById(dataTarget)
                    if (janelaSelecionada) {
                        removerCamadaEscura()
                        fecharJanela('tudo')
                        mostraJanela(janelaSelecionada)
                    }
                }
            })
        })
    }
    //------------------------------------------
    // Mostrar janela
    function mostraJanela(janela) {
        janela.style.display = 'block'
        trazerParaFrente(janela)
    }
    //------------------------------------------
    // Trazer a janela para frente
    function trazerParaFrente(janela) {
        var janelas = document.querySelectorAll('.janela')
        var maxZIndex = 0
        janelas.forEach(function (otherJanela) {
            var zIndex = parseInt(getComputedStyle(otherJanela).zIndex)
            maxZIndex = Math.max(maxZIndex, zIndex)
        })
        janela.style.zIndex = (maxZIndex + 1).toString()
    }
    //------------------------------------------
    // Trazer janela visivel para a frente
    document.addEventListener('DOMContentLoaded', function () {
        // Seleciona todas as janelas pela classe 'janela'
        var janelas = document.querySelectorAll('.janela')
        // Adiciona um ouvinte de evento de clique para cada janela
        janelas.forEach(function (janela) {
            janela.addEventListener('mousedown', function () {
                trazerParaFrente(janela)
            })
        })
    })
}//------------------------------------------
// Tela cheia
function telaG() {
    const element = document.documentElement
    if (element.requestFullscreen) {
        element.requestFullscreen()
    } else if (element.mozRequestFullScreen) {// Firefox
        element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {// Chrome, Safari e Opera
        element.webkitRequestFullscreen()
    } else if (element.msRequestFullscreen) {// Internet Explorer/Edge
        element.msRequestFullscreen()
    }
}
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
// Carregar janela quando visivel na tela
document.addEventListener('DOMContentLoaded', function () {
    var janelas = document.querySelectorAll('.janela')
    var options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }
    function handleIntersection(entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Obtém o objeto dentro da janela
                var objectElement = entry.target.querySelector('object')
                // Carrega o conteúdo apenas se o 'data-src' estiver presente
                var dataSrc = objectElement.getAttribute('data-src')
                if (dataSrc) {
                    objectElement.setAttribute('data', dataSrc)
                    // Remove o atributo 'data-src' para evitar recarregar
                    objectElement.removeAttribute('data-src')
                }
                // Interrompe a observação após o carregamento
                observer.unobserve(entry.target)
            }
        })
    }
    var observer = new IntersectionObserver(handleIntersection, options)
    janelas.forEach(function (janela) {
        observer.observe(janela)
    })
})
//------------------------------------------