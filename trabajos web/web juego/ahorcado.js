document.addEventListener("DOMContentLoaded", function () {
    const palabras = ['ahorcado', 'lavadora', 'invierno', 'plastico', 'ordenador', 'colador', 'guantera', 'alimentador', 'calculos'];
    const palabraEscogida = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
    let aciertos = [];
    let numFallos = 0;

    const canvas = document.getElementById('canvasahorcado');
    const ctx = canvas.getContext('2d');

    function dibujaHorca() {
        ctx.fillStyle = '#462501';
        ctx.fillRect(64, 9, 26, 237); // Dibuja la base de la horca
        ctx.fillRect(175, 193, 26, 53); // Dibuja la cabeza de la horca
        ctx.fillRect(64, 193, 136, 15); // Dibuja el cuerpo de la horca
        ctx.fillRect(64, 9, 115, 11); // Dibuja el brazo de la horca
    }

    function dibujaPartesAhorcado() {
        ctx.lineWidth = 5; // Aumenta el grosor de las líneas

        if (numFallos > 0) {
            ctx.beginPath();
            ctx.arc(180, 50, 20, 0, Math.PI * 2, true); // Cabeza
            ctx.stroke();
        }
        if (numFallos > 1) {
            ctx.beginPath();
            ctx.moveTo(180, 70);
            ctx.lineTo(180, 120); // Cuerpo
            ctx.stroke();
        }
        if (numFallos > 2) {
            ctx.beginPath();
            ctx.moveTo(180, 80);
            ctx.lineTo(160, 100); // Brazo izquierdo
            ctx.stroke();
        }
        if (numFallos > 3) {
            ctx.beginPath();
            ctx.moveTo(180, 80);
            ctx.lineTo(200, 100); // Brazo derecho
            ctx.stroke();
        }
        if (numFallos > 4) {
            ctx.beginPath();
            ctx.moveTo(180, 120);
            ctx.lineTo(160, 140); // Pierna izquierda
            ctx.stroke();
        }
        if (numFallos > 5) {
            ctx.beginPath();
            ctx.moveTo(180, 120);
            ctx.lineTo(200, 140); // Pierna derecha
            ctx.stroke();
        }
    }

    function dibujaAhorcado() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujaHorca();
        dibujaPartesAhorcado();
    }

    function actualizarPista() {
        let texto = '';
        palabraEscogida.split('').forEach((letra) => {
            texto += aciertos.includes(letra) ? letra : '_';
            texto += ' ';
        });
        document.getElementById('letras').textContent = texto;
    }

    function verificarLetra(letra) {
        if (!palabraEscogida.includes(letra)) {
            numFallos++;
            dibujaAhorcado();
        } else {
            aciertos = [...new Set([...aciertos, ...palabraEscogida.split('').filter(l => l === letra)])];
            actualizarPista();
        }
        if (numFallos > 5 || !palabraEscogida.split('').some(l => !aciertos.includes(l))) {
            setTimeout(() => alert(`Juego terminado! ${numFallos > 5 ? 'Perdiste' : 'Ganaste'}! La palabra era: ${palabraEscogida}`), 100);
        }
    }

    dibujaAhorcado();
    actualizarPista();

    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letra) {
        let button = document.createElement('button');
        button.textContent = letra;
        button.addEventListener('click', function () {
            this.disabled = true;
            verificarLetra(letra);
        });
        document.getElementById('botonesletras').appendChild(button);
    });
});
