async function fetchNotifications() {
    const url = 'https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen';
    
    try {
        const response = await fetch(url);
        console.log('Response status:', response.status);

        if (!response.ok) {
            throw new Error('Netwerkfout: ' + response.statusText);
        }

        const data = await response.json();

        // Loop door de meldingen en voeg ze direct toe aan de DOM
        data.forEach(melding => {
            const template = document.getElementById('notification-template').content.cloneNode(true);
            template.querySelector('.naam').textContent = melding.naam;
            template.querySelector('.beschrijving').textContent = melding.beschrijving;
            template.querySelector('.gebruikersnaam').textContent = melding.gebruikersnaam;
            template.querySelector('.datum').textContent = melding.datum;

            document.getElementById('notification-body').appendChild(template);
        });
    } catch (error) {
        console.error('Fout bij het ophalen van meldingen:', error);
    }
}

// Roep de functie aan om meldingen op te halen
fetchNotifications();
