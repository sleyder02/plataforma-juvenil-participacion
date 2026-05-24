const btnMensaje = document.getElementById('btnMensaje');
const mensajeClase = document.getElementById('mensajeClase');
let contadorClicks = 0

btnMensaje.addEventListener('click', () => {
    //mensajeClase.textContent = '¡Hola! Este es un mensaje de alerta.';
    mensajeClase.textContent = 'Texto a mostrar al hacer Click' + contadorClicks;
    contadorClicks = contadorClicks + 1;
});