document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.getElementById('play-btn');
  const circuloTurquesa = document.getElementById('circulo-turquesa');
  const breathText = document.getElementById('breath-text');
  const contador = document.getElementById('contador');

  playBtn.addEventListener('click', iniciarCuentaAtras);

  function iniciarCuentaAtras() {
    playBtn.style.display = 'none';
    let cuentaRegresiva = 3;

    const cuentaAtrasInterval = setInterval(() => {
      if (cuentaRegresiva > 0) {
        const porcentaje = cuentaRegresiva * 25;
        circuloTurquesa.innerHTML = `<span class="numero">${cuentaRegresiva}</span>`;
        circuloTurquesa.style.width = `${porcentaje}%`;
        circuloTurquesa.style.height = `${porcentaje}%`;

        const fontSize = porcentaje >= 100 ? '1.5vw' : `calc(${porcentaje / 1.5}vw - ${3 - cuentaRegresiva}vw)`;
        circuloTurquesa.querySelector('.numero').style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;

        cuentaRegresiva--;
      } else {
        clearInterval(cuentaAtrasInterval);
        circuloTurquesa.innerHTML = ''; // Limpiar contenido
        iniciarContador();
        iniciarAnimacionCrecimiento(); // Agregar esta línea para iniciar la animación de crecimiento
      }
    }, 1000);
  }

  function iniciarContador() {
    let tiempoRestante = 5 * 60;

    const contadorInterval = setInterval(() => {
      if (tiempoRestante > 0) {
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const tiempoFormateado = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

        contador.innerText = tiempoFormateado;
        tiempoRestante--;
      } else {
        clearInterval(contadorInterval);
      }
    }, 1000);
  }

  function iniciarAnimacionCrecimiento() {
    let porcentaje = 25; // Comienza en 25%
    let fase = 'crecimiento'; // Puede ser 'crecimiento', 'espera' o 'decrecimiento'

    // Crear el elemento de texto y agregarlo al círculo turquesa
    const breathText = document.createElement('span');
    breathText.id = 'breath-text';
    breathText.classList.add('breath-text'); // Agrega una clase para aplicar estilos
    circuloTurquesa.appendChild(breathText);

    const crecimientoInterval = setInterval(() => {
      if (fase === 'crecimiento') {
        // Fase de crecimiento
        if (porcentaje < 86) {
          circuloTurquesa.style.width = `${porcentaje}%`;
          circuloTurquesa.style.height = `${porcentaje}%`;
          porcentaje += 1.5; // Ajusta la velocidad de crecimiento
          const fontSize = `calc(${3 + porcentaje / 15}vw)`;
          breathText.style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;
          breathText.innerText = 'INHALA'; // Agrega el texto 'INHALA' en la fase de crecimiento
        } else {
          // Cambia a la fase de espera
          fase = 'espera';
          breathText.innerText = 'MANTÉN'; // Agrega el texto 'MANTÉN' en la fase de espera
          setTimeout(() => {
            fase = 'decrecimiento'; // Después de 4 segundos, cambia a la fase de decrecimiento
          }, 4000);
        }
      } else if (fase === 'decrecimiento') {
        // Fase de decrecimiento
        if (porcentaje > 30) {
          circuloTurquesa.style.width = `${porcentaje}%`;
          circuloTurquesa.style.height = `${porcentaje}%`;
          porcentaje -= 1.5; // Ajusta la velocidad de decrecimiento
          const fontSize = `calc(${3 + porcentaje / 15}vw)`;
          breathText.style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;
          breathText.innerText = 'EXHALA'; // Agrega el texto 'EXHALA' en la fase de decrecimiento
        } else {
          // Restablece la fase a 'crecimiento' cuando alcanza el 25%
          fase = 'crecimiento';
          breathText.innerText = 'INHALA'; // Agrega el texto 'INHALA' al volver a la fase de crecimiento
        }
      }
    }, 100); // El intervalo se ejecuta aproximadamente cada 100 milisegundos
  }
});
