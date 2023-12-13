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
            janela.style.cursor = 'grabbing'
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