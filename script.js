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

// Al click del pulsante "Crea Itinerario", mostra il caricamento e invia la richiesta all'API
createItineraryButton.addEventListener('click', async function() {
    // Recupero la destinazione
    const destination = document.querySelector('#destination').value.trim();
    // Recupero la tipologia di viaggio
    const type = document.querySelector('.types-selection-input:checked').value;
    // Recupero il numero di giorni
    const days = Number(dayCounter.innerHTML);

    // Mostro la schermata di caricamento
    main.className = "loading";

    // Spedisco le informazioni a Gemini
    await getItineraryFromGemini(destination, type, days);

    // Renderizzo le informazioni ricevute
    renderCards();

    // Mostro la schermata dei risultati
    main.className = "result";
});

// Al click del bottone nuovo itinerario
newItineraryButton.addEventListener('click', function() {
    location.reload();
})

// FASE DI ELABORAZIONE
async function getItineraryFromGemini(destination, type, days) {
    // Preparo il prompt da inviare a Gemini
    const prompt = `
    Sto costruendo un'app che ha bisogno di JSON puro come output.
    Non aggiungere alcuna formattazione, markdown o codice.
    Solo JSON puro nel formato seguente (nulla prima o dopo):
    [{"day":"Giorno 1","activities":[{"title":"Musei Vaticani", "text":"Esplora i Musei Vaticani e la Cappella Sistina"},{"title":"Piazza San Pietro","text":"Visita la Basilica di San Pietro e la piazza"},{"title":"Castel Sant'Angelo","text":"Scopri la storia di Castel Sant'Angelo"}]}]
    Crea un itinerario di ${days} giorni per una vacanza di tipo ${type} a ${destination}.
    `;

    // Preparo i dati da inviare a Gemini
    const conf = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
    })
}

const response = await fetch(API_ENDPOINT, conf);
const data = await response.json();

itineraryCards = JSON.parse(data.candidates[0].parts[0].text);
}

// FASE DI VISUALIZZAZIONE
function renderCards() {
    itineraryCards.forEach(function(itinerary) {

        let activitiesTemplate = '';
        itinerary.activities.forEach(function(activity) {
            activitiesTemplate += `
            <div class="activity">
                <h4>${activity.title}</h4>
                <p>${activity.text}</p>
            </div>
            `;
        });

        const cardTemplate = `
        <div class="card">
            <h3 class="card-title card-activities-title">${itinerary.day}</h3>
            ${activitiesTemplate}
        </div>
        `;
        resultContainer.innerHTML += cardTemplate;
    });
}