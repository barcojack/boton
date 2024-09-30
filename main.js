
// Seleccionamos el formulario y el contenedor de la lista de eventos
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('events');

// Cargar los eventos desde el Local Storage al cargar la página
document.addEventListener('DOMContentLoaded', loadEventsFromLocalStorage);

// Evento para agregar un evento cuando se envía el formulario
eventForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Capturamos los valores del formulario
    const eventTitle = document.getElementById('event-title').value;
    const eventDate = document.getElementById('event-date').value;

    // Validamos que los campos no estén vacíos
    if (eventTitle === '' || eventDate === '') {
        alert('Por favor completa todos los campos');
        return;
    }

    // Creamos un objeto de evento
    const eventObj = {
        title: eventTitle,
        date: eventDate
    };

    // Agregamos el evento al Local Storage
    addEventToLocalStorage(eventObj);

    // Creamos un nuevo elemento de la lista y lo añadimos al DOM
    createEventElement(eventObj);

    // Limpiamos los campos del formulario
    document.getElementById('event-title').value = '';
    document.getElementById('event-date').value = '';
});

// Función para crear y añadir el evento al DOM
function createEventElement(eventObj) {
    const li = document.createElement('li');
    li.innerHTML = `${eventObj.title} - ${eventObj.date} <button>Eliminar</button>`;

    // Agregamos la funcionalidad para eliminar un evento
    li.querySelector('button').addEventListener('click', function() {
        li.remove();
        removeEventFromLocalStorage(eventObj);
    });

    // Añadimos el nuevo evento a la lista de eventos en el DOM
    eventList.appendChild(li);
}

// Función para guardar el evento en Local Storage
function addEventToLocalStorage(eventObj) {
    let events = getEventsFromLocalStorage();
    events.push(eventObj);
    localStorage.setItem('events', JSON.stringify(events));
}

// Función para eliminar el evento del Local Storage
function removeEventFromLocalStorage(eventObj) {
    let events = getEventsFromLocalStorage();
    events = events.filter(event => event.title !== eventObj.title || event.date !== eventObj.date);
    localStorage.setItem('events', JSON.stringify(events));
}

// Función para obtener los eventos almacenados en el Local Storage
function getEventsFromLocalStorage() {
    let events = localStorage.getItem('events');
    return events ? JSON.parse(events) : [];
}

// Modificación en la función createEventElement para aplicar la animación
function createEventElement(eventObj) {
    const li = document.createElement('li');
    li.innerHTML = `${eventObj.title} - ${eventObj.date} <button>Eliminar</button>`;

    // Aplicamos la clase de animación 'show' después de un pequeño retraso
    setTimeout(() => li.classList.add('show'), 10);

    // Agregamos la funcionalidad para eliminar un evento
    li.querySelector('button').addEventListener('click', function() {
        li.classList.remove('show'); // Quitamos la clase antes de eliminar para la animación
        setTimeout(() => li.remove(), 500); // Retrasamos la eliminación para que se vea la animación
        removeEventFromLocalStorage(eventObj);
    });

    // Añadimos el nuevo evento a la lista de eventos en el DOM
    eventList.appendChild(li);
}

// Función para cargar los eventos desde el Local Storage cuando la página se carga
function loadEventsFromLocalStorage() {
    let events = getEventsFromLocalStorage();
    events.forEach(eventObj => createEventElement(eventObj));
}

// Archivo: app.js

// Seleccionamos el campo de búsqueda
const searchBar = document.getElementById('search-bar');

// Evento de búsqueda
searchBar.addEventListener('input', function() {
    const searchTerm = searchBar.value.toLowerCase(); // Convertimos el término de búsqueda a minúsculas para facilitar la comparación
    const events = document.querySelectorAll('#events li'); // Seleccionamos todos los eventos

    events.forEach(function(event) {
        const eventText = event.textContent.toLowerCase(); // Obtenemos el texto del evento y lo pasamos a minúsculas

        // Mostramos u ocultamos los eventos que coinciden con el término de búsqueda
        if (eventText.includes(searchTerm)) {
            event.style.display = 'flex'; // Mostramos el evento
        } else {
            event.style.display = 'none'; // Ocultamos el evento
        }
    });
});


