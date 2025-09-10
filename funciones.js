// Pantalla inicial del sobre
window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  if (overlay) {
    document.body.style.overflow = "hidden"; // bloquear scroll al inicio
    overlay.addEventListener("click", () => {
      overlay.style.display = "none"; // quitar el sobre
      document.body.style.overflow = "auto"; // restaurar scroll
    });
  }
});


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

const noAsistiran = document.getElementById("no-asistiremos");
const otrosCheckboxes = document.querySelectorAll(".check-opcion");

noAsistiran.addEventListener("change", function () {
  if (this.checked) {
    // Desmarcar y deshabilitar todos los demás checkboxes
    otrosCheckboxes.forEach(checkbox => {
      checkbox.checked = false;
      checkbox.disabled = true;
    });
  } else {
    // Habilitar todos los demás checkboxes
    otrosCheckboxes.forEach(checkbox => {
      checkbox.disabled = false;
    });
  }
});

let musicaReproducida = false;
let audio;

window.addEventListener('click', () => {
  if (!musicaReproducida) {
    audio = new Audio('musica.mp3');
    audio.loop = true;
    audio.play().catch(err => {
      console.error('Error al reproducir audio:', err);
    });
    musicaReproducida = true;
  }
});

// Enviar confirmación a Google Sheets.
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const seleccionados = [];
  document.querySelectorAll("input[name='asistentes']:checked").forEach(cb => {
    seleccionados.push(cb.value);
  });

  if (seleccionados.length === 0) {
    alert("Por favor selecciona al menos una opción.");
    return;
  }

  const formData = new FormData();
  formData.append("familia", document.getElementById("familia").textContent);
  formData.append("nombres", seleccionados.join(", "));

  try {
    await fetch("https://script.google.com/macros/s/AKfycbyXOaNswbyl5haHnzxqtAmB98oR3ss6GJkYhqvSYrQofhPA-S73daxqLHY1GPcbEEqQ/exec", {
      method: "POST",
      body: formData,
      mode: "no-cors"   // 👈 clave
    });

    alert("🎉 Confirmación registrada con éxito");
    form.reset();
  } catch (err) {
    console.error("Error enviando a Google Sheets:", err);
    alert("❌ Hubo un error, intenta de nuevo.");
  }
});




document.addEventListener("DOMContentLoaded", () => {
  // 👇 Aquí defines todas tus familias
  const invitadosPorId = {
    "1": {
      familia: "Familia Maldonado Garza",
      invitados: ["Sara Maldonado Garza", "Felipe Ruiz Garza", "Laura Ruiz Garza", "Carlos Ruiz Garza"]
    },
    "2": {
      familia: "Familia Hernández López",
      invitados: ["Andrés Hernández", "Juliana López"]
    },
    "3": {
      familia: "Familia Pérez Ramírez",
      invitados: ["Camila Pérez", "Juan Ramírez", "María Ramírez"]
    }
    // 👈 puedes seguir agregando
  };

  // Detectar el número en la URL
  const path = window.location.pathname.split("/").pop(); // "1", "2", etc.
  const datos = invitadosPorId[path];

  if (datos) {
    // Rellenar familia
    document.getElementById("familia").textContent = datos.familia;

    // Generar checkboxes de invitados
    const lista = document.getElementById("lista-invitados");
    lista.innerHTML = ""; // limpiar antes
    datos.invitados.forEach(nombre => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" name="asistentes" value="${nombre}" class="check-opcion">
        ${nombre}
      `;
      lista.appendChild(label);
    });

    // Agregar checkbox de "No podremos asistir"
    const labelNo = document.createElement("label");
    labelNo.innerHTML = `
      <input type="checkbox" id="no-asistiremos" name="asistentes" value="No podremos asistir">
      No podremos asistir
    `;
    lista.appendChild(labelNo);
  } else {
    // Si el id no existe, mensaje de error
    document.getElementById("familia").textContent = "Invitación no encontrada";
  }
});
