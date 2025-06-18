// FASE DI PREPARAZIONE
const dayCounter = document.querySelector('#days-counter');
const incrementDayButton = document.querySelector('#increment-day');
const decrementDayButton = document.querySelector('#decrement-day');
const createItineraryButton = document.querySelector('#create-itinerary');
const main = document.querySelector('main');
const resultContainer = document.querySelector('#result-container');
const newItinerary = document.querySelector('#new-itinerary');

const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDTWDnRyg-YWrNxTmCywAJQd6t2si_MEfQ';
let itineraryCards = [];

// FASE DI INTEREZIONE
// Al click del pulsante "Incrementa Giorno", incrementa il contatore dei giorni
incrementDayButton.addEventListener('click', function() {
    // Recupero il valore attuale dei giorni
    const currentDays = Number(dayCounter.innerHTML);
    // SE il valore è inferiore a 7, incrementa di 1
    if (currentDays < 7) {
        // Modifico il div che contiene il numero dei giorni
        dayCounter.innerHTML = currentDays + 1;
    }
});

// Al click del pulsante "Decrementa Giorno", decrementa il contatore dei giorni
decrementDayButton.addEventListener('click', function() {
    // Recupero il valore attuale dei giorni
    const currentDays = Number(dayCounter.innerHTML);
    // SE il valore è maggiore di 1, decrementa di 1
    if (currentDays > 1) {
        // Modifico il div che contiene il numero dei giorni
        dayCounter.innerHTML = currentDays - 1;
    }
});