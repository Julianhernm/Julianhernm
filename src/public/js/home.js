// Lógica simple para tabs
function switchTab(element, tabName) {
  // Remover clase active de todos los tabs
  document.querySelectorAll('.nav-tab-item').forEach(item => {
    item.classList.remove('active');
  });

  // Añadir active al clickeado
  element.classList.add('active');

  // Simulación de cambio de contenido (fade effect)
  const list = document.getElementById('listView');
  list.style.opacity = '0.5';
  setTimeout(() => {
    list.style.opacity = '1';
    // Aquí cargarías los datos reales
  }, 200);
}

// Función para insertar elementos
async function addInnerHTML() {
  const container = document.getElementById("templateCarousel");

  try {
    const result = await fetch("/api-logic/show-template", {
      method: "POST",
    });

    const data = await result.json();

    for (let i = 0; i < data.data.length; i++) {
      let htmlLi = ``;
      let maxSets = data.data[i].templateExercises.length;

      if (maxSets <= 3) {
        data.data[i].templateExercises.forEach(e => {
          htmlLi += `<li><h6 class="card-title">${e.exercise_name}</h6></li>`;
        });
      } else {
        data.data[i].templateExercises.slice(0, 3).forEach(e => {
          htmlLi += `<li><h6 class="card-title">${e.exercise_name}</h6></li>`;
        });
        htmlLi += `<li><h6 class="card-title">...</h6></li>`;
      }

      let html = `
        <div class="workout-card">
          <span class="card-badge">Fuerza</span>
          <div style="margin-top: 10px;">
            ${i}
            <div class="card-meta" style="margin-top: 8px;">
              ${htmlLi}
            </div>
          </div>
          <i class="ph-bold ph-arrow-right card-arrow"></i>
        </div>
      `;

      container.innerHTML += html;
    }
  } catch (error) {
    console.error(error);
  }
}

addInnerHTML();

// Interacción simple con tarjetas
document.querySelectorAll('.workout-card').forEach(card => {
  card.addEventListener('click', () => {
    // Feedback visual sutil
    card.style.borderColor = 'var(--accent)';
    setTimeout(() => {
      card.style.borderColor = 'var(--border-subtle)';
    }, 300);
  });
});

// Mostrar fecha y hora (solo día, hora y minutos)
function showDate() {
  const dateNow = document.getElementById("dateNow");
  const now = new Date();

  // Día de la semana
  const day = now.toLocaleDateString("es-ES", {
    weekday: "long"
  });

  // Hora y minutos
  const hour = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit"
  });

  dateNow.textContent = `${day}, ${hour}`;
}

setInterval(showDate, 1000);
showDate();