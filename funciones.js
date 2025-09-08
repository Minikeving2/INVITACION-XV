document.addEventListener("DOMContentLoaded", () => {
  /* ===== Timeline progreso en scroll ===== */
  const timeline = document.querySelector(".timeline");
  const items = document.querySelectorAll(".timeline-item");

  function handleScroll() {
    if (!timeline) return;

    const rect = timeline.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalHeight = timeline.scrollHeight;
    const viewportCenter = windowHeight / 2;

    let visible = viewportCenter - rect.top;
    if (visible < 0) visible = 0;
    if (visible > totalHeight) visible = totalHeight;

    const progress = (visible / totalHeight) * 100;
    timeline.style.setProperty("--progress-height", progress + "%");

    // Activar puntos alcanzados
    items.forEach(item => {
      const r = item.getBoundingClientRect();
      const itemCenter = r.top + r.height / 2;
      if (itemCenter < windowHeight / 2) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll(); // inicial

  /* ===== Contador regresivo ===== */
  const contadorEl = document.getElementById("contador");
  if (contadorEl) {
    // Fecha objetivo: 4 octubre 2025 17:30 (Bogotá -05:00)
    const fechaObjetivo = new Date("2025-10-04T17:30:00-05:00").getTime();

    function actualizarContador() {
      const ahora = Date.now();
      const dif = fechaObjetivo - ahora;

      if (dif <= 0) {
        contadorEl.textContent = "¡Llegó el gran día!";
        clearInterval(intervalo);
        return;
      }

      const dias = Math.floor(dif / 86400000);
      const horas = Math.floor((dif % 86400000) / 3600000);
      const minutos = Math.floor((dif % 3600000) / 60000);
      const segundos = Math.floor((dif % 60000) / 1000);

      contadorEl.innerHTML = `
        <div>${dias}<span>DÍAS</span></div>
        <div>${horas}<span>HORAS</span></div>
        <div>${minutos}<span>MINUTOS</span></div>
        <div>${segundos}<span>SEGUNDOS</span></div>
      `;
    }

    const intervalo = setInterval(actualizarContador, 1000);
    actualizarContador();
  }
});
