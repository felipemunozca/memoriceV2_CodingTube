//Inicializacion de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 60;
let timerInicial = 60;
let tiempoRegresivo = null;

//Variables de audio
let winAudio = new Audio('./assets/audio/1up.wav');
let loseAudio = new Audio('./assets/audio/boom.wav');
let clickAudio = new Audio('./assets/audio/blip.wav');
let rightAudio = new Audio('./assets/audio/coin.wav');
let wrongAudio = new Audio('./assets/audio/lose.wav');

//Apuntando a documento HTML.
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//Generacion de numeros aleatorios.
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(() => {
    return Math.random()-0.5
});
console.log(numeros);

//Funcion descontar tiempo
function contarTiempo(){
    tiempoRegresivo = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if (timer == 0) {
            alert('Fin del juego. Se terminó el tiempo, vuelva a intentarlo.');
            clearInterval(tiempoRegresivo);
            bloquearTarjetas();
            loseAudio.play();
        }
    }, 1000);
}

//Funcion para bloquear las tarjetas cuando se termine el tiempo
function bloquearTarjetas(){
    for (let i = 0; i <= 15; i++) {
        let tarjetaBloqueada = document.getElementById(i);
        //tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.innerHTML = `<img src="./assets/img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
        
    }
}

//Funcion principal
function destapar(id) {

    //funcion de tiempo
    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if (tarjetasDestapadas == 1) {
        //Mostrar el primer numero. id desde el html.
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = `<img src="./assets/img/${primerResultado}.png" alt="">`;
        clickAudio.play();

        //Deshabilitar primer boton.
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        //Mostrar segundo numero.
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = `<img src="./assets/img/${segundoResultado}.png" alt="">`;

        //Deshabilitar segundo boton.
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //Encerar  contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
            rightAudio.play();

            //completar el juego
            if (aciertos == 8) {
                clearInterval(tiempoRegresivo);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} Muy bien!!`;
                mostrarTiempo.innerHTML = `Fantastico!! Sólo demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} Juego completado!!`;
                winAudio.play();
            }

        } else {
            //Mostrar momentaneamente valores y volver a tapar
            wrongAudio.play();
            setTimeout(() => {
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 1000);
        }
    }
}