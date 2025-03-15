// Configuración de Firebase
const firebaseConfig = {
    apiKey: "b33eea97da85b84cb71f5e431852cb985a7b5216",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "tecmat-f0976",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "08706144295839840882"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elementos del DOM
const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

// Función para agregar una tarea a Firebase
function addTaskToFirebase(taskText) {
    db.collection('tasks').add({
        text: taskText
    })
    .then(() => {
        taskInput.value = ''; // Limpiar el campo de entrada
    })
    .catch((error) => {
        console.error('Error al agregar la tarea:', error);
    });
}

// Función para eliminar una tarea de Firebase
function deleteTaskFromFirebase(taskId) {
    db.collection('tasks').doc(taskId).delete()
    .catch((error) => {
        console.error('Error al eliminar la tarea:', error);
    });
}

// Función para mostrar las tareas en la lista
function displayTasks(tasks) {
    taskList.innerHTML = ''; // Limpiar la lista

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.data().text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTaskFromFirebase(task.id));

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

// Escuchar cambios en la base de datos de Firebase
db.collection('tasks').onSnapshot(snapshot => {
    const tasks = snapshot.docs;
    displayTasks(tasks);
});

// Evento para agregar una tarea
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToFirebase(taskText);
    }
});