const btnMensaje = document.getElementById('btnMensaje');
const mensajeClase = document.getElementById('mensajeClase');
const botonesPerfil = document.querySelectorAll('.btnPerfil');
const detallePerfil = document.getElementById('detallePerfil');

let contadorClicks = 0

btnMensaje.addEventListener('click', () => {
    //mensajeClase.textContent = '¡Hola! Este es un mensaje de alerta.';
    mensajeClase.textContent = 'Texto a mostrar al hacer Click ' + contadorClicks;
    contadorClicks = contadorClicks + 1;
});

botonesPerfil.forEach((boton) => {
    boton.addEventListener('click', () => {
        const perfil = boton.getAttribute('data-perfil');
        detallePerfil.textContent = `Informacion detallada del perfil: ${perfil}`;
    });
});