document.addEventListener('DOMContentLoaded', () => {
    const notificationBody = document.getElementById('notification-body');
    const editForm = document.getElementById('edit-form');
    const editNaam = document.getElementById('edit-naam');
    const editBeschrijving = document.getElementById('edit-beschrijving');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    let currentEditId = null;
    let meldingen = []; // Lokale kopie van meldingen

    // Functie om meldingen op te halen
    async function fetchMeldingen() {
        const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/db');
        const data = await response.json();
        meldingen = data.meldingen || []; // Assuming 'meldingen' is the key in your JSON
        renderMeldingen(meldingen);
    }

    // Functie om meldingen te renderen
    function renderMeldingen(meldingen) {
        notificationBody.innerHTML = '';
        const template = document.getElementById('notification-template');

        meldingen.forEach((melding, index) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.naam').textContent = melding.naam;
            clone.querySelector('.beschrijving').textContent = melding.beschrijving;
            clone.querySelector('.gebruikersnaam').textContent = melding.gebruikersnaam;
            clone.querySelector('.datum').textContent = melding.datum;

            // Bewerken knop
            clone.querySelector('.edit-btn').addEventListener('click', () => {
                currentEditId = index; // Store the index for editing
                editNaam.value = melding.naam;
                editBeschrijving.value = melding.beschrijving;
                editForm.style.display = 'block';
            });

            // Verwijder knop
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Verwijderen';
            deleteBtn.addEventListener('click', () => {
                deleteMelding(melding); // Pass the melding to delete
            });
            clone.querySelector('td:last-child').appendChild(deleteBtn);

            notificationBody.appendChild(clone);
        });
    }

    // Functie om een melding toe te voegen
    async function addMelding(naam, beschrijving) {
        const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen', {
            method: 'POST',
            body: JSON.stringify({
                naam: naam,
                beschrijving: beschrijving,
                gebruikersnaam: `gebruiker${meldingen.length + 1}`, // Generate a new username dynamically
                datum: new Date().toISOString().split('T')[0] // Get today's date in YYYY-MM-DD format
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            console.error('Failed to add melding:', response.statusText);
            return;
        }

        const newMelding = await response.json();
        meldingen.push(newMelding);
        renderMeldingen(meldingen);
    }

    // Functie om een melding op te slaan (bewerken)
    async function saveMelding() {
        const naam = editNaam.value;
        const beschrijving = editBeschrijving.value;

        // Constructing the updated melding object
        const updatedMelding = {
            naam: naam,
            beschrijving: beschrijving,
            gebruikersnaam: meldingen[currentEditId].gebruikersnaam, // Keep the same username
            datum: new Date().toISOString().split('T')[0] // Update date to today
        };

        const response = await fetch(`https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen/${meldingen[currentEditId].id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedMelding),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (!response.ok) {
            console.error('Failed to update melding:', response.statusText);
            return;
        }

        // Update the local copy
        meldingen[currentEditId] = updatedMelding;

        editForm.style.display = 'none';
        renderMeldingen(meldingen);
    }

    // Functie om een melding te verwijderen
    async function deleteMelding(melding) {
        const response = await fetch(`https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen/${melding.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            console.error('Failed to delete melding:', response.statusText);
            return;
        }

        // Remove the melding from the local copy
        meldingen = meldingen.filter(m => m.id !== melding.id);
        renderMeldingen(meldingen);
    }

    // Event listener voor opslaan
    saveEditBtn.addEventListener('click', saveMelding);

    // Annuleer bewerken
    cancelEditBtn.addEventListener('click', () => {
        editForm.style.display = 'none';
    });

    // Voeg test-melding toe knop
    document.getElementById('add-notification-btn').addEventListener('click', () => {
        const naam = prompt('Voer de naam van de melding in:');
        const beschrijving = prompt('Voer de beschrijving in:');
        if (naam && beschrijving) {
            addMelding(naam, beschrijving);
        }
    });

    // Initialisatie
    fetchMeldingen();
});
