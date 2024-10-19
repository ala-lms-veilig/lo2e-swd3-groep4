// Functie om meldingen toe te voegen aan de tabel
function addNotification(naam, beschrijving, gebruikersnaam, datum) {
    const template = document.getElementById('notification-template').content.cloneNode(true);
    template.querySelector('.naam').textContent = naam;
    template.querySelector('.beschrijving').textContent = beschrijving;
    template.querySelector('.gebruikersnaam').textContent = gebruikersnaam;
    template.querySelector('.datum').textContent = datum;

    document.getElementById('notification-body').appendChild(template);
}

// Fetch de meldingen van de server
fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen')
    .then(response => {
        if (!response.ok) {
            throw new Error('Netwerkfout');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(melding => {
            addNotification(melding.naam, melding.beschrijving, melding.gebruikersnaam, melding.datum);
        });
    })
    .catch(error => console.error('Fout bij het ophalen van meldingen:', error));
