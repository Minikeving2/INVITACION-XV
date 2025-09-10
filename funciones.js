document.addEventListener("DOMContentLoaded", () => {
  /* ===== Pantalla inicial del sobre ===== */
  const overlay = document.getElementById("overlay");
  if (overlay) {
    document.body.style.overflow = "hidden";
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

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
  handleScroll();

  /* ===== Contador regresivo ===== */
  const contadorEl = document.getElementById("contador");
  if (contadorEl) {
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

  /* ===== Música ===== */
  let musicaReproducida = false;
  let audio;
  window.addEventListener('click', () => {
    if (!musicaReproducida) {
      audio = new Audio('musica.mp3');
      audio.loop = true;
      audio.play().catch(err => console.error('Error al reproducir audio:', err));
      musicaReproducida = true;
    }
  });

  /* ===== Invitados dinámicos según URL ===== */
  const invitadosPorId = {
    "1": {
      familia: "Familia Cáceres García",
      invitados: ["Fredy Cáceres", "Amparo García", "Dixon Mora", "Dana Cáceres", "Johana Hernández"]
    },
    "2": {
      familia: "Familia Sandoval Hernández",
      invitados: ["Fabio Sandoval", "Yenifer Hernández", "Julieta Sandoval", "Emiliano Sandoval"]
    },
    "3": {
      familia: "Familia Mora Murillo",
      invitados: ["María Mora", "Santiago Murillo"]
    },
    "4": {
      familia: "Familia Valencia",
      invitados: ["Lisbeth Valencia", "Angie Valencia", "Brayan Valencia"]
    },
    "5": {
      familia: "Familia Rolón Jaramillo",
      invitados: ["Fernando Rolón", "Santiago Rolón"]
    },
    "6": {
      familia: "Familia Rincón Sayago",
      invitados: ["Martha Rincón", "Jesús Rincón", "Charlie Sayago"]
    },
    "7": {
      familia: "Familia Chacón Bayona",
      invitados: ["Fredy Chacón", "Maruja Bayona"]
    },
    "8": {
      familia: "Familia Sayago Rozo",
      invitados: ["Wilson Sayago", "Rosalbina Rozo"]
    },
    "9": {
      familia: "Familia Yañez Chacón",
      invitados: ["Iván Yañez", "Mari Chacón", "Nicol Yañez"]
    },
    "10": {
      familia: "Familia Tafur Chacón",
      invitados: ["Oscar Tafur", "Mongui Chacón", "Ingrid Tafur"]
    },
    "11": {
      familia: "Familia Martinez Luna",
      invitados: ["Julio Martinez", "Mirian Luna"]
    },
    "12": {
      familia: "Familia Padrón Martinez",
      invitados: ["Francisco Padrón", "Judi Martinez", "Tomás Padrón", "Angela Villamizar"]
    },
    "13": {
      familia: "Familia Durán Marchan",
      invitados: ["Manuel Durán", "Kelly Marchan", "Viviana Durán", "Emanuel Durán"]
    },
    "14": {
      familia: "Familia Maldonado",
      invitados: ["Uvaldina Maldonado", "Johana Hernández", "Reinaldo José"]
    },
    "15": {
      familia: "Familia Martinez Díaz",
      invitados: ["Edecio Martinez", "Paulina Díaz"]
    },
    "16": {
      familia: "Familia Maldonado Calderón",
      invitados: ["Cristian Maldonado", "Leidy Johanna Calderón Méndez", "Maximiliano Maldonado Calderón"]
    },
    "17": {
      familia: "Familia Pabón Figuerova",
      invitados: ["Giovanni Pabón", "Adriana Figuerova", "Darly Pabón"]
    },
    "18": {
      familia: "Familia Figuerova Maldonado",
      invitados: ["Jhony Figuerova", "Belkis Maldonado"]
    },
    "19": {
      familia: "Familia Galvis Pabón",
      invitados: ["Lorena Pabón", "Yoliam Galvis"]
    },
    "20": {
      familia: "Familia Tarazona Rincón",
      invitados: ["Mora Rincón", "Ronald Tarazona"]
    },
    "21": {
      familia: "Familia Diaz",
      invitados: ["Nathali Díaz"]
    },
    "22": {
      familia: "Familia Castillo",
      invitados: ["Martha Castillo y Acompañante"]
    }
  };


  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const datos = invitadosPorId[id];

  if (datos) {
    document.getElementById("familia").textContent = datos.familia;
    const lista = document.getElementById("lista-invitados");
    lista.innerHTML = "";
    datos.invitados.forEach(nombre => {
      const label = document.createElement("label");
      label.innerHTML = `
        <input type="checkbox" name="asistentes" value="${nombre}" class="check-opcion">
        ${nombre}
      `;
      lista.appendChild(label);
    });
    const labelNo = document.createElement("label");
    labelNo.innerHTML = `
      <input type="checkbox" id="no-asistiremos" name="asistentes" value="No podremos asistir">
      No podremos asistir
    `;
    lista.appendChild(labelNo);

    // Listener para "No asistiremos"
    const noAsistiran = document.getElementById("no-asistiremos");
    noAsistiran.addEventListener("change", function () {
      const otrosCheckboxes = document.querySelectorAll(".check-opcion");
      if (this.checked) {
        otrosCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          checkbox.disabled = true;
        });
      } else {
        otrosCheckboxes.forEach(checkbox => checkbox.disabled = false);
      }
    });
  } else {
    document.getElementById("familia").textContent = "Invitación no encontrada";
  }

  /* ===== Enviar confirmación a Google Sheets ===== */
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
        mode: "no-cors"
      });
      alert("🎉 Confirmación registrada con éxito");
      form.reset();
    } catch (err) {
      console.error("Error enviando a Google Sheets:", err);
      alert("❌ Hubo un error, intenta de nuevo.");
    }
  });
});
