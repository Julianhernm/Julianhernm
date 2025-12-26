const container = document.getElementById('exercisesContainer');
const btnAddEx = document.getElementById('btnAddExercise');
const emptyMsg = document.getElementById('emptyMsg');

// --- Actualización de totales ---
function updateSummary() {
    const exercises = document.querySelectorAll('.exercise-card');
    const sets = document.querySelectorAll('.set-row');
    let totalReps = 0;

    document.querySelectorAll('.rep-in').forEach(input => {
        totalReps += parseInt(input.value) || 0;
    });

    document.getElementById('count-ex').textContent = exercises.length;
    document.getElementById('count-sets').textContent = sets.length;
    document.getElementById('count-reps').textContent = totalReps;

    emptyMsg.style.display = exercises.length === 0 ? 'block' : 'none';
}

// --- Lógica de Ejercicios ---
function createExercise() {
    const index = document.querySelectorAll('.exercise-card').length + 1;
    const card = document.createElement('div');
    card.className = 'exercise-card';
    card.innerHTML = `
                <div class="exercise-header">
                    <div class="exercise-index">${index}</div>
                    <input type="text" class="input-minimal ex-name" placeholder="Ej: Press de Banca">
                    <button class="btn-icon remove-ex"><i class="ph ph-trash"></i></button>
                </div>
                <div class="sets-list"></div>
                <button class="btn-add-set"><i class="ph ph-plus-circle"></i> Agregar Serie</button>
            `;

    // Botón eliminar ejercicio
    card.querySelector('.remove-ex').onclick = () => {
        card.remove();
        reindexExercises();
        updateSummary();
    };

    // Botón añadir serie
    card.querySelector('.btn-add-set').onclick = () => addSet(card);

    container.appendChild(card);
    updateSummary();
}

function addSet(card) {
    const list = card.querySelector('.sets-list');
    const setNum = list.children.length + 1;
    const setRow = document.createElement('div');
    setRow.className = 'set-row';
    setRow.innerHTML = `
                <span class="set-num">S${setNum}</span>
                <input type="number" class="input-minimal rep-in" placeholder="Reps" min="1">
                <input type="number" class="input-minimal weight-in" placeholder="Kg" step="0.5">
                <button class="btn-icon remove-set"><i class="ph ph-x"></i></button>
            `;

    setRow.querySelector('.remove-set').onclick = () => {
        setRow.remove();
        reindexSets(list);
        updateSummary();
    };

    setRow.querySelector('.rep-in').oninput = updateSummary;

    list.appendChild(setRow);
    updateSummary();
}

function reindexExercises() {
    document.querySelectorAll('.exercise-card').forEach((card, i) => {
        card.querySelector('.exercise-index').textContent = i + 1;
    });
}

function reindexSets(list) {
    Array.from(list.children).forEach((row, i) => {
        row.querySelector('.set-num').textContent = `S${i + 1}`;
    });
}

// --- Guardado ---
document.getElementById('btnSave').onclick = async () => {
    const workoutName = document.getElementById('workoutName').value.trim();
    const cards = document.querySelectorAll('.exercise-card');

    if (!workoutName) return alert("Asigna un nombre al entrenamiento");
    if (cards.length === 0) return alert("Agrega al menos un ejercicio");

    const data = {
        name: workoutName,
        exercises: []
    };

    try {
        cards.forEach(card => {
            const exName = card.querySelector('.ex-name').value.trim();
            const setRows = card.querySelectorAll('.set-row');

            if (!exName) throw new Error("Faltan nombres de ejercicios");
            if (setRows.length === 0) throw new Error(`El ejercicio ${exName} no tiene series`);

            const sets = Array.from(setRows).map(row => ({
                repetitions: row.querySelector('.rep-in').value,
                weight: row.querySelector('.weight-in').value || "0"
            }));

            data.exercises.push({ exercise: exName, sets });
        });

        // Simulación de envío de API
        console.log("Enviando datos:", data);

        // Aquí ejecutas tus fetch originales
        await fetch("/api-logic/new-template", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        window.location.href = "/home";

    } catch (e) {
        alert(e.message);
    }
};
btnAddEx.onclick = createExercise;