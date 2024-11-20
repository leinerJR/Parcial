// Objeto para almacenar las tareas
const datosSistema = {
    tareas: [],
    siguienteId: 1
};

// Función para crear una tarea sin usar push
function crearTarea(titulo, descripcion, categoria, fechaLimite, fechaTermino) {
    const tarea = {
        id: datosSistema.siguienteId++,
        titulo,
        descripcion,
        categoria,
        fechaLimite: new Date(fechaLimite),
        fechaTermino: new Date(fechaTermino),
        estado: 'pendiente'  // Los estados posibles pueden ser: 'pendiente', 'completada', 'atrasada'
    };

    // Agregar la tarea manualmente sin push()
    const index = datosSistema.tareas.length;  // Obtener el último índice del arreglo
    datosSistema.tareas[index] = tarea;        // Asignar la tarea al último índice

    mostrarTareas();
}

// Función para mostrar todas las tareas
function mostrarTareas() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';  // Limpiar lista antes de mostrar las tareas
    for (let i = 0; i < datosSistema.tareas.length; i++) {
        const tarea = datosSistema.tareas[i];
        taskListElement.innerHTML += `
            <div>
                <strong>${tarea.titulo}</strong><br>
                Descripción: ${tarea.descripcion}<br>
                Categoría: ${tarea.categoria}<br>
                Fecha límite: ${tarea.fechaLimite.toDateString()}<br>
                Fecha de terminación: ${tarea.fechaTermino.toDateString()}<br>
                Estado: ${tarea.estado}<br>
                <button onclick="verificarAtraso(${tarea.id})">Verificar Atraso</button>
                <button onclick="verificarEntregaAtiempo(${tarea.id})">Verificar Entrega a Tiempo</button>
            </div>
        `;
    }
}

// Función para verificar si una tarea está atrasada
function verificarAtraso(id) {
    let tareaEncontrada = false;
    for (let i = 0; i < datosSistema.tareas.length; i++) {
        if (datosSistema.tareas[i].id === id) {
            tareaEncontrada = true;
            const tarea = datosSistema.tareas[i];
            const hoy = new Date();
            // Si la tarea no está completada y la fecha de terminación ha pasado
            if (tarea.estado !== 'completada' && tarea.fechaTermino < hoy) {
                tarea.estado = 'atrasada';
                alert(`¡Alerta! La tarea '${tarea.titulo}' está atrasada.`);
            } else if (tarea.estado === 'pendiente' && tarea.fechaLimite < hoy) {
                tarea.estado = 'atrasada';
                alert(`¡Alerta! La tarea '${tarea.titulo}' está atrasada por la fecha límite.`);
            } else {
                alert(`La tarea '${tarea.titulo}' está dentro del plazo.`);
            }
            mostrarTareas();
            break;
        }
    }
    if (!tareaEncontrada) {
        alert('Tarea no encontrada.');
    }
}

// Función para verificar si la tarea fue entregada a tiempo
function verificarEntregaAtiempo(id) {
    let tareaEncontrada = false;
    for (let i = 0; i < datosSistema.tareas.length; i++) {
        if (datosSistema.tareas[i].id === id) {
            tareaEncontrada = true;
            const tarea = datosSistema.tareas[i];
            // Compara la fecha de término con la fecha límite
            if (tarea.fechaTermino <= tarea.fechaLimite) {
                alert(`La tarea '${tarea.titulo}' fue entregada a tiempo.`);
            } else {
                alert(`La tarea '${tarea.titulo}' no fue entregada a tiempo.`);
            }
            break;
        }
    }
    if (!tareaEncontrada) {
        alert('Tarea no encontrada.');
    }
}

// Función que maneja el formulario de tareas
document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se recargue la página

    // Obtener datos del formulario
    const titulo = document.getElementById('taskTitle').value;
    const descripcion = document.getElementById('taskDescription').value;
    const categoria = document.getElementById('taskCategory').value;
    const fechaLimite = document.getElementById('taskDueDate').value;
    const fechaTermino = document.getElementById('taskCompletionDate').value;

    // Validar si todos los campos están completos
    if (titulo && descripcion && categoria && fechaLimite && fechaTermino) {
        crearTarea(titulo, descripcion, categoria, fechaLimite, fechaTermino);
        // Limpiar los campos del formulario
        document.getElementById('taskForm').reset();
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

//Leiner Riascos
//Billy Angulo