document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('input');
    const output = document.getElementById('output');
    const commandHistory = [];
    let historyIndex = -1;
    const commands = {
        ajuda: showHelp,
        limpar: clearOutput,
        oie: displayGreeting,
        horas: showTime,
        dir: pastas,
        sobre: sysinfo,
        big: telaG,
        sair: sairT
        // Adicione mais comandos aqui
    };
    input.addEventListener('keyup', function (event) {
        switch (event.key) {
            case 'Enter':
                handleCommand(input.value);
                input.value = '';
                historyIndex = -1; // Resetar o índice do histórico ao enviar um novo comando
                break;
            case 'ArrowUp':
                navigateHistory(1);
                break;
            case 'ArrowDown':
                navigateHistory(-1);
                break;
        }
    });
    function handleCommand(command) { // gerenciar histórico
        if (command.trim() === '') return; // Ignorar comandos vazios
        commandHistory.unshift(command); // Adicionar comando ao início do histórico
        if (commandHistory.length > 10) {
            commandHistory.pop(); // Manter no máximo 10 comandos no histórico
        }
        historyIndex = -1; // Resetar o índice do histórico ao enviar um novo comando
        const outputText = document.createElement('h3');
        outputText.textContent = `> ${command}`;
        output.appendChild(outputText);
        const commandFunction = commands[command.toLowerCase()];
        if (commandFunction) {
            commandFunction();
        } else {
            outputNotFound();
        }
        // Rolar para o final da saída
        output.scrollTop = output.scrollHeight;
    }
    function showHelp() { // ajuda
        const helpText = document.createElement('p');
        helpText.innerHTML = 'Comandos disponíveis:<br><span style="color:#fffa">' + Object.keys(commands).join(', ') + '</span>';
        output.appendChild(helpText);
    }
    function clearOutput() { // limpar
        output.innerHTML = '';
    }
    function outputNotFound() {
        const notFoundText = document.createElement('p');
        notFoundText.innerHTML = 'Comando não encontrado. Digite "<span style="color:#fffa">ajuda</span>" para ver os comandos disponíveis.';
        notFoundText.style.color = '#f50a';
        output.appendChild(notFoundText);
    }
    function navigateHistory(direction) { // navegação
        if (commandHistory.length === 0) return;
        // Atualizar o índice do histórico
        historyIndex += direction;
        if (historyIndex < -1) historyIndex = commandHistory.length - 1;
        if (historyIndex >= commandHistory.length) historyIndex = -1;
        // Exibir o comando do histórico
        input.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
    }
});
//------------------------------------------
// Comandos e funcionalidades:
function displayGreeting() {// oie
    const greetingText = document.createElement('p');
    greetingText.innerHTML = 'Olá! Bem-vindo ao terminal do sistema <b style="color:#09f">NascaED OS</b> interativo!<br>Obrigado por usar nosso sistema :)';
    output.appendChild(greetingText);
}

function showTime() { // horas
    const timeText = document.createElement('p');
    const agora = new Date();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');
    timeText.textContent = 'Agora é: ' + `${horas}:${minutos}:${segundos}` + '...';
    timeText.style.color = '#fa0a';
    output.appendChild(timeText);
}

function pastas() {// dir
    const res = document.createElement('p');
    res.textContent = 'N:\\usr\\nascaed\\dados\\inicio\\';
    res.style.color = '#fffa';
    output.appendChild(res);
}

function sysinfo() {// sobre
    const infi = document.createElement('p');
    var logo = '._..._.....................______._____<br>|.\\.|.|...................|..____|..__.\\<br>|..\\|.|.__._.___..___.__._|.|__..|.|..|.|<br>|...`.|/._`./.__|/.__/._`.|..__|.|.|..|.| - <b>OS</b><br>|.|\\..|.(_|.\\__.\\.(_|.(_|.|.|____|.|__|.|<br>|_|.\\_|\\__,_|___/\\___\\__,_|______|_____/'
    var idioma = '<br><strong>NascaED - OS</strong> <span style="color:#fffa">v:0.0.2</span><br>' + 'Idioma do Sistema: ' + navigator.language
    var tela ='<br>Resolução da Tela: <b>' + window.innerWidth + '</b>px. por: <b>' + window.innerHeight + '</b>px.'
    var icon = '<br><img style="width: 120px" src="./base/sysd/progs/load/ico-NascaEDOS.png">'
    infi.innerHTML = logo + icon + idioma + tela
    output.appendChild(infi);
}

function telaG() { // big
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
    const msg = document.createElement('p');
    msg.innerHTML = 'Tela cheia :)<br>Para sair aperte a tecla "<span style="color:#fffa">F11</span>"'
    output.appendChild(msg);
}

function sairT() { // sair
    const msg = document.createElement('div');
    output.innerHTML = '';
    msg.innerHTML = 'Bem-vindo ao terminal <strong>NascaED OS</strong>! Digite um comando.'
    output.appendChild(msg);
    var div = document.getElementById('Terminal')
    if (div) {
        div.style.display = 'none'
        div.style.border = '1px solid #444'
        div.classList.remove('f')
    }
    
}
//------------------------------------------