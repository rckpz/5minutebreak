document.addEventListener('DOMContentLoaded', function () {
  const playBtn = document.getElementById('play-btn');
  const circuloGris = document.getElementById('circulo-gris');

  playBtn.addEventListener('click', iniciarCuentaAtras);

  function iniciarCuentaAtras() {
    let cuentaRegresiva = 3;

    const cuentaAtrasInterval = setInterval(function () {
      if (cuentaRegresiva > 0) {
        circuloGris.innerHTML = cuentaRegresiva;
        cuentaRegresiva--;
      } else {
        clearInterval(cuentaAtrasInterval);
        circuloGris.innerHTML = ''; // Limpiar contenido

        // Agregar el contador después de la cuenta atrás
        agregarContador();
// Mostrar el contador
document.getElementById('contador').style.display = 'flex';
        iniciarRespiracion();
      }
    }, 1000);
  }

  function agregarContador() {
    // Crear el contador dinámicamente
    const contador = document.createElement('div');
    contador.id = 'contador';
    contador.innerText = '5:00';

    // Mostrar el contador
    circuloGris.parentNode.insertBefore(contador, circuloGris.nextSibling);

    // Iniciar el conteo regresivo de 5 minutos
    iniciarContador();
  }

  function iniciarContador() {
    let tiempoRestante = 5 * 60; // 5 minutos en segundos

    const contadorInterval = setInterval(function () {
      if (tiempoRestante > 0) {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        document.getElementById('contador').innerText = tiempoFormateado;
        tiempoRestante--;
      } else {
        clearInterval(contadorInterval);
        // Puedes agregar acciones adicionales al finalizar el contador si es necesario
      }
    }, 1000);
  }

  function iniciarRespiracion() {
    // Lógica para iniciar la respiración
    // Puedes agregar más acciones aquí, como cambiar estilos, etc.
    // Por ejemplo, podrías iniciar una animación en CSS usando la clase 'respirar'
    circuloGris.classList.add('respirar');
  }
});
