document.addEventListener('DOMContentLoaded', () => {
    const notificationBody = document.getElementById('notification-body');
    const editForm = document.getElementById('edit-form');
    const editNaam = document.getElementById('edit-naam');
    const editBeschrijving = document.getElementById('edit-beschrijving');
    const saveEditBtn = document.getElementById('save-edit-btn');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    let currentEditId = null;
    let meldingen = []; // Lokale kopie van meldingen

    // Haal meldingen op en render ze in de tabel
    async function fetchMeldingen() {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
            meldingen = await response.json();
            renderMeldingen();
        } catch (error) {
            console.error('Error bij ophalen van meldingen:', error);
        }
    }

    // Render meldingen in de tabel
    function renderMeldingen() {
        notificationBody.innerHTML = ''; // Maak de tabel leeg
        const template = document.getElementById('notification-template');

        meldingen.forEach(({ id, title, body, userId }) => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.naam').textContent = title;
            clone.querySelector('.beschrijving').textContent = body;
            clone.querySelector('.gebruikersnaam').textContent = `gebruiker${userId}`;
            clone.querySelector('.datum').textContent = '2024-10-18'; // Placeholder datum

            // Bewerken knop
            clone.querySelector('.edit-btn').addEventListener('click', () => {
                currentEditId = id;
                editNaam.value = title;
                editBeschrijving.value = body;
                editForm.style.display = 'block';
            });

            // Verwijder knop
            clone.querySelector('td:last-child').appendChild(createDeleteButton(id));

            notificationBody.appendChild(clone);
        });
    }

    // Maak een delete knop aan
    function createDeleteButton(id) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Verwijderen';
        deleteBtn.addEventListener('click', () => deleteMelding(id));
        return deleteBtn;
    }

    // Voeg een melding toe
    async function addMelding(naam, beschrijving) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({ title: naam, body: beschrijving, userId: 1 }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });

            const newMelding = await response.json();
            meldingen.push(newMelding);
            renderMeldingen();
        } catch (error) {
            console.error('Error bij toevoegen van melding:', error);
        }
    }

    // Sla de wijzigingen van een melding op
    async function saveMelding() {
        const naam = editNaam.value;
        const beschrijving = editBeschrijving.value;

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${currentEditId}`, {
                method: 'PUT',
                body: JSON.stringify({ id: currentEditId, title: naam, body: beschrijving, userId: 1 }),
                headers: { 'Content-type': 'application/json; charset=UTF-8' },
            });

            const updatedMelding = await response.json();
            meldingen = meldingen.map(m => (m.id === currentEditId ? updatedMelding : m));

            editForm.style.display = 'none';
            renderMeldingen();
        } catch (error) {
            console.error('Error bij opslaan van melding:', error);
        }
    }

    // Verwijder een melding
    async function deleteMelding(id) {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'DELETE' });
            meldingen = meldingen.filter(melding => melding.id !== id);
            renderMeldingen();
        } catch (error) {
            console.error('Error bij verwijderen van melding:', error);
        }
    }

    // Event Listeners
    saveEditBtn.addEventListener('click', saveMelding);
    cancelEditBtn.addEventListener('click', () => editForm.style.display = 'none');
    document.getElementById('add-notification-btn').addEventListener('click', () => {
        const naam = prompt('Voer de naam van de melding in:');
        const beschrijving = prompt('Voer de beschrijving in:');
        if (naam && beschrijving) addMelding(naam, beschrijving);
    });

    // Initialisatie
    fetchMeldingen();
});
