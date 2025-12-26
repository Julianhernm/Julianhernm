// ===============================
// DATA SIMULADA (BACKEND MOCK)
// ===============================
const dataByTab = {
  workouts: [
    {
      title: "Sentadilla con Barra",
      sets: "4 series",
      last: "Último: 100kg",
      icon: "ph-barbell"
    },
    {
      title: "Press Banca",
      sets: "3 series",
      last: "Último: 80kg",
      icon: "ph-barbell"
    }
  ],
  exercises: [
    {
      title: "Curl Bíceps",
      sets: "4 series",
      last: "Último: 20kg",
      icon: "ph-dumbbell"
    },
    {
      title: "Extensión de Tríceps",
      sets: "3 series",
      last: "Último: 25kg",
      icon: "ph-dumbbell"
    }
  ],
  stats: [
    {
      title: "Progreso Mensual",
      sets: "↑ 12%",
      last: "Últimos 30 días",
      icon: "ph-chart-line-up"
    }
  ]
};

//Render Dinamico
function renderList(items) {
  const listView = document.getElementById("listView");
  listView.innerHTML = "";

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-item";

    div.innerHTML = `
      <div class="list-info">
        <div class="list-icon">
          <i class="ph ${item.icon}"></i>
        </div>
        <div class="item-text">
          <h4>${item.title}</h4>
          <span>${item.sets} • ${item.last}</span>
        </div>
      </div>
      <div class="list-action">
        <i class="ph ph-caret-right"></i>
      </div>
    `;

    listView.appendChild(div);
  });
}

// ===============================
// SWITCH DE TABS
// ===============================
function switchTab(element, tabName) {
  document.querySelectorAll(".nav-tab-item").forEach(item => {
    item.classList.remove("active");
  });

  element.classList.add("active");

  const listView = document.getElementById("listView");
  listView.style.opacity = "0";

  setTimeout(() => {
    renderList(dataByTab[tabName]);
    listView.style.opacity = "1";
  }, 200);
}

//carga inicial
document.addEventListener("DOMContentLoaded", () => {
  renderList(dataByTab.workouts);
});




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