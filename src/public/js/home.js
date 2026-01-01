//switch de tabs: router
function switchTab(element, view) {
  document.querySelectorAll(".nav-tab-item").forEach(item => {
    item.classList.remove("active");
  });

  element.classList.add("active");

  const listView = document.getElementById("listView");
  listView.style.opacity = "0";

  setTimeout(() => {
    listView.innerHTML = "";

    if (view === "templates") renderTemplates();
    if (view === "history") renderHistory();
    if (view === "stats") renderStats();

    listView.style.opacity = "1";
  }, 200);
}

//vista: plantillas
async function renderTemplates() {
  const listView = document.getElementById("listView");

  try {
    const res = await fetch("/api-logic/show-template", { method: "POST" });
    const { data } = await res.json();

    data.forEach(template => {
      const div = document.createElement("div");
      div.className = "list-item";

      div.innerHTML = `
        <div class="list-info">
          <div class="list-icon">
            <i class="ph ph-barbell"></i>
          </div>
          <div class="item-text">
            <h4>${template.name}</h4>
            <span>${template.templateExercises.length} ejercicios</span>
          </div>
        </div>
        <div class="list-action">
          <i class="ph ph-caret-right"></i>
        </div>
      `;

      listView.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

// vista: historial
async function renderHistory() {
  const listView = document.getElementById("listView");

  try {
    const res = await fetch("/api-logic/show-history", { method: "POST" });
    const { data } = await res.json();

    data.forEach(session => {
      const div = document.createElement("div");
      div.className = "history-item";

      div.innerHTML = `
        <h4>${session.date}</h4>
        <p>${session.totalExercises} ejercicios</p>
        <span>Volumen: ${session.totalVolume} kg</span>
      `;

      listView.appendChild(div);
    });

  } catch (err) {
    console.error(err);
  }
}

//vista: estadistica
async function renderStats() {
  const listView = document.getElementById("listView");

  listView.innerHTML = `
    <div class="stats-card">
      <h3>Resumen</h3>
      <p>Entrenamientos: 32</p>
      <p>Volumen total: 12,400 kg</p>
    </div>
  `;
}

// carga inicial
document.addEventListener("DOMContentLoaded", () => {
  renderTemplates();
});


// Función para insertar elementos
async function addInnerHTML() {
  const container = document.getElementById("templateCarousel");

  try {
    const result = await fetch("/api-logic/show-template", {
      method: "POST",
    });

    const data = await result.json();
    console.log(data)

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
        <div class="workout-card" onclick = enterTemplate(${data.data[i].id})>
          <span class="card-badge">Fuerza</span>
          <div style="margin-top: 10px;">
            ${data.data[i].name + data.data[i].id}
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

//Ingreso de las plantillas
function enterTemplate(id) {
    window.location.href = `/home/workout/${id}`
}

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