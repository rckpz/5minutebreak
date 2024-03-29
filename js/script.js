document.addEventListener("DOMContentLoaded", () => {
  const playBtn = document.getElementById("play-btn");
  const circuloTurquesa = document.getElementById("circulo-turquesa");
  const breathText = document.getElementById("breath-text");
  const contador = document.getElementById("contador");

  const sonidoImg = document.getElementById("sonido-img");
  const fondoAudio = document.getElementById("fondo-audio");
  let contadorInterval; // Intervalo del contador
  let animacionInterval; // Intervalo para la animación

  sonidoImg.addEventListener("click", () => {
    // Control de reproducción de sonido
    if (fondoAudio.paused) {
      fondoAudio.play();
      fondoAudio.volume = 0.5; // Ajustar volumen al 50%
      sonidoImg.src = "img/smartphone/Sonidoa.svg";
    } else {
      fondoAudio.pause();
      sonidoImg.src = "img/smartphone/Sonido.svg";
    }
  });

  // Restaurar el estado del audio desde localStorage
  const audioState = localStorage.getItem("audioState");
  if (audioState === "playing") {
    fondoAudio.play();
    fondoAudio.volume = 0.5;
    sonidoImg.src = "img/smartphone/Sonidoa.svg";
  }

  // Guardar el estado del audio antes de descargar la página
  window.addEventListener("beforeunload", () => {
    if (!fondoAudio.paused) {
      localStorage.setItem("audioState", "playing");
    } else {
      localStorage.setItem("audioState", "paused");
    }
  });

  playBtn.addEventListener("click", iniciarCuentaAtras);

  function iniciarCuentaAtras() {
    // Iniciar la cuenta atrás antes de la sesión
    playBtn.style.display = "none";
    let cuentaRegresiva = 3;

    const cuentaAtrasInterval = setInterval(() => {
      if (cuentaRegresiva > 0) {
        // Actualizar visualización de la cuenta atrás
        const porcentaje = cuentaRegresiva * 25;
        circuloTurquesa.innerHTML = `<span class="numero">${cuentaRegresiva}</span>`;
        circuloTurquesa.style.width = `${porcentaje}%`;
        circuloTurquesa.style.height = `${porcentaje}%`;

        const fontSize =
          porcentaje >= 100
            ? "1.5vw"
            : `calc(${porcentaje / 1.5}vw - ${3 - cuentaRegresiva}vw)`;
        circuloTurquesa.querySelector(
          ".numero"
        ).style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;

        cuentaRegresiva--;
      } else {
        clearInterval(cuentaAtrasInterval);
        circuloTurquesa.innerHTML = ""; // Limpiar contenido
        iniciarContador();
        iniciarAnimacionCrecimiento(); // Iniciar la animación de crecimiento
      }
    }, 1000);
  }

  function iniciarContador() {
    // Iniciar el contador de tiempo durante la sesión
    let tiempoRestante = 5 * 60;

    contadorInterval = setInterval(() => {
      if (tiempoRestante > 0) {
        // Actualizar visualización del contador
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        const tiempoFormateado = `${minutos}:${
          segundos < 10 ? "0" : ""
        }${segundos}`;

        contador.innerText = tiempoFormateado;
        tiempoRestante--;
      } else {
        clearInterval(contadorInterval);
        clearInterval(animacionInterval); // Detener la animación
        mostrarFelicitacion();
      }
    }, 1000);
  }

  function iniciarAnimacionCrecimiento() {
    // Iniciar la animación de crecimiento y respiración
    let porcentaje = 25; // Comienza en 25%
    let fase = "crecimiento";

    // Crear el elemento de texto y agregarlo al círculo turquesa
    const breathText = document.createElement("span");
    breathText.id = "breath-text";
    breathText.classList.add("breath-text");
    circuloTurquesa.appendChild(breathText);

    animacionInterval = setInterval(() => {
      if (fase === "crecimiento") {
        // Fase de crecimiento
        if (porcentaje < 86) {
          circuloTurquesa.style.width = `${porcentaje}%`;
          circuloTurquesa.style.height = `${porcentaje}%`;
          porcentaje += 2; // Ajustar velocidad de crecimiento
          const fontSize = `calc(${3 + porcentaje / 15}vw)`;
          breathText.style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;
          breathText.innerText = "INHALA"; // Agregar texto 'INHALA' en la fase de crecimiento
        } else {
          // Cambiar a la fase de espera
          fase = "espera";
          breathText.innerText = "MANTÉN"; // Agregar texto 'MANTÉN' en la fase de espera
          setTimeout(() => {
            fase = "decrecimiento"; // Después de 4 segundos, cambiar a la fase de decrecimiento
          }, 4000);
        }
      } else if (fase === "decrecimiento") {
        // Fase de decrecimiento
        if (porcentaje > 30) {
          circuloTurquesa.style.width = `${porcentaje}%`;
          circuloTurquesa.style.height = `${porcentaje}%`;
          porcentaje -= 1.5; // Ajustar velocidad de decrecimiento
          const fontSize = `calc(${3 + porcentaje / 15}vw)`;
          breathText.style.cssText = `font-size: ${fontSize}; color: var(--color-blanco); transition: font-size 1s ease-in-out;`;
          breathText.innerText = "EXHALA"; // Agregar texto 'EXHALA' en la fase de decrecimiento
        } else {
          // Cambiar a la fase de espera
          fase = "espera";
          breathText.innerText = "MANTÉN"; // Agregar texto 'MANTÉN' en la fase de espera
          setTimeout(() => {
            fase = "crecimiento"; // Después de 6 segundos, cambiar a la fase de crecimiento
          }, 4000);
        }
      }
    }, 150); // Intervalo ejecutado cada 150 milisegundos
  }

  function mostrarFelicitacion() {
    // Mostrar mensaje de felicitación al finalizar la sesión
    clearInterval(animacionInterval); // Detener la animación
    circuloTurquesa.innerHTML = ""; // Limpiar contenido
    contador.innerText = "¡Felicidades!";
  }
});
