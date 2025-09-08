// Fecha objetivo: 4 octubre 2025 17:30 (Bogotá -05:00)
    const fechaObjetivo = new Date("2025-10-04T17:30:00-05:00").getTime();

    function actualizarContador() {
      const ahora = new Date().getTime();
      const diferencia = fechaObjetivo - ahora;

      if (diferencia <= 0) {
        document.getElementById("contador").innerHTML = "¡Llegó el gran día!";
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

      document.getElementById("contador").innerHTML = `
        <div>${dias}<span>DÍAS</span></div>
        <div>${horas}<span>HORAS</span></div>
        <div>${minutos}<span>MINUTOS</span></div>
        <div>${segundos}<span>SEGUNDOS</span></div>
      `;
    }

    // Actualizar cada segundo
    const intervalo = setInterval(actualizarContador, 1000);
    actualizarContador();