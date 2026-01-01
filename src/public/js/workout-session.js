const templateId = window.location.pathname.split("/").pop();

const getTemplateData = async () => {
    const response = await fetch(`/api-logic/template-use/${templateId}`, {
        method: "POST",
        body:{
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    return data;
};



const container = document.getElementById("exercisesContainer");

//load template
function loadTemplate(data) {
    const template = data.result[0];

    document.getElementById("workoutName").value = template.name;

    template.templateExercises.forEach((ex, index) => {
        const card = createExerciseCard(ex, index + 1);
        container.appendChild(card);
    });
}


function createExerciseCard(exercise, index) {
    const card = document.createElement("div");
    card.className = "exercise-card";
    card.dataset.exerciseId = exercise.id;
    card.dataset.active = "true";

    card.innerHTML = `
        <div class="exercise-header">
            <div class="exercise-index">${index}</div>
            <input 
                class="input-minimal ex-name" 
                value="${exercise.exercise_name}" 
                disabled
            >
            <button class="btn-icon toggle-ex">👁</button>
        </div>

        <div class="sets-list"></div>

        <button class="btn-add-set">+ Agregar serie</button>
    `;

    const setsList = card.querySelector(".sets-list");

    // 👉 cantidad de series desde TemplateSets
    for (let i = 0; i < exercise.TemplateSets.length; i++) {
        addSet(setsList);
    }

    card.querySelector(".btn-add-set").onclick = () => addSet(setsList);
    card.querySelector(".toggle-ex").onclick = () => toggleExercise(card);

    return card;
}


/* ===========================
   SERIES
=========================== */

function addSet(list) {
    const setNum = list.children.length + 1;

    const row = document.createElement("div");
    row.className = "set-row";
    row.innerHTML = `
        <span>S${setNum}</span>
        <input type="number" class="input-minimal rep" value="0" min="0">
        <input type="number" class="input-minimal weight" value="0" min="0">
        <button class="btn-icon">✖</button>
    `;

    row.querySelector(".btn-icon").onclick = () => {
        row.remove();
        reindexSets(list);
    };

    list.appendChild(row);
}

function reindexSets(list) {
    [...list.children].forEach((row, i) => {
        row.querySelector("span").textContent = `S${i + 1}`;
    });
}


/* ===========================
   DESACTIVAR EJERCICIO
=========================== */

function toggleExercise(card) {
    const active = card.dataset.active === "true";
    card.dataset.active = (!active).toString();

    card.style.opacity = active ? "0.4" : "1";

    card.querySelectorAll("input").forEach(input => {
        input.disabled = active;
        if (active) input.value = 0;
    });
}

/* ===========================
   GUARDAR SESIÓN
=========================== */

document.getElementById("btnSave").onclick = () => {
    const payload = {
        workout_name: workoutName.value,
        exercises: []
    };

    document.querySelectorAll(".exercise-card").forEach(card => {
        const active = card.dataset.active === "true";

        const sets = Array.from(card.querySelectorAll(".set-row")).map(row => ({
            reps: active ? Number(row.querySelector(".rep").value) : 0,
            weight: active ? Number(row.querySelector(".weight").value) : 0
        }));

        payload.exercises.push({
            exercise_id: card.dataset.exerciseId,
            sets
        });
    });

    console.log("PAYLOAD FINAL:", payload);
};


/* ===========================
   INIT
=========================== */

(async () => {
    const data = await getTemplateData();
    loadTemplate(data);
})();
