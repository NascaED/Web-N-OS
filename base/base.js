const janelas = document.querySelectorAll('.janela');
janelas.forEach(janela => {
    let isDragging = false;
    let offsetX, offsetY
    const iniciarArraste = (e) => {
        if (e.target.classList.contains('barraJanela')) {
            isDragging = true;
            const janelaRect = janela.getBoundingClientRect();
            offsetX = e.clientX - janelaRect.left - (janelaRect.width / 2);
            offsetY = e.clientY - janelaRect.top - (janelaRect.height / 2);
            janela.style.userSelect = 'none';
            janela.style.cursor = 'grabbing';
        }
    };
    const pararArraste = () => {
        if (isDragging) {
            isDragging = false;
            janela.style.userSelect = 'auto';
            janela.style.cursor = 'default'
        }
    };
    const arrastarJanela = (e) => {
        const isMaximizada = janela.classList.contains('maximizada');
        if (!isMaximizada && isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            janela.style.left = `${newX}px`;
            janela.style.top = `${newY}px`
        }
    };
    janela.addEventListener('mousedown', iniciarArraste);
    document.addEventListener('mouseup', pararArraste);
    document.addEventListener('mousemove', arrastarJanela)
})

//Horario
function atualizarHoraData() {
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    const formato = `${horas}:${minutos}:${segundos}`;
    document.getElementById('horas').textContent = formato;
}
atualizarHoraData();
setInterval(atualizarHoraData, 1000);