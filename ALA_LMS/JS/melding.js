document.addEventListener('DOMContentLoaded', async () => {
    const notificationBody = document.getElementById('notification-body');

    // Functie om meldingen op te halen met een GET-verzoek
    async function fetchNotifications() {
        try {
            const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen');
            const data = await response.json();
            console.log('Fetched Notifications:', data); // Log de opgehaalde meldingen

            // Controleer of de data een array is
            if (Array.isArray(data)) {
                data.forEach(melding => {
                    const template = document.getElementById('notification-template').content.cloneNode(true);
                    
                    template.querySelector('.naam').textContent = melding.naam;
                    template.querySelector('.beschrijving').textContent = melding.beschrijving;
                    template.querySelector('.gebruikersnaam').textContent = melding.gebruikersnaam;
                    template.querySelector('.datum').textContent = melding.datum;

                    notificationBody.appendChild(template);
                });
            } else {
                console.error('Data is not an array:', data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Functie om een nieuwe melding aan te maken met een POST-verzoek
    async function createNotification() {
        const newNotification = {
            naam: 'Nieuwe Melding',
            beschrijving: 'Dit is een beschrijving van de nieuwe melding.',
            gebruikersnaam: 'gebruiker1',
            datum: new Date().toISOString().split('T')[0] // Huidige datum
        };

        try {
            const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Geef aan dat we JSON verzenden
                },
                body: JSON.stringify(newNotification) // Zet de gegevens om naar JSON
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Created Notification:', data); // Log de aangemaakte melding
            } else {
                console.error('Fout bij het aanmaken van melding:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Roep de functies aan
    await fetchNotifications(); // Haal de meldingen op
    await createNotification(); // Maak een nieuwe melding aan
});
