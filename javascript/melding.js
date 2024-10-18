class NotificationApp {
    constructor() {
        this.notifications = []; // Opslag voor meldingen
        this.body = document.getElementById('notification-body'); // Waar de meldingen komen
        this.template = document.getElementById('notification-template'); // De template voor elke melding
        this.form = document.getElementById('edit-form'); // Het formulier voor bewerken
        this.editIndex = null; // Index van de melding die momenteel wordt bewerkt
        this.loadNotifications();
        this.setupListeners();
    }

    // Laadt de meldingen uit het JSON-bestand
    async loadNotifications() {
        try {
            const response = await fetch('notifications.json');
            this.notifications = await response.json();
            this.displayNotifications();
        } catch (error) {
            console.error('Error loading notifications:', error);
        }
    }

    // Render de meldingen in de HTML
    displayNotifications() {
        this.body.innerHTML = ''; // Maak de lijst leeg voor we nieuwe meldingen toevoegen
        this.notifications.forEach((notification, index) => {
            const clone = this.template.content.cloneNode(true);
            clone.querySelector('.name').textContent = notification.naam;
            clone.querySelector('.description').textContent = notification.beschrijving;
            clone.querySelector('.username').textContent = notification.gebruikersnaam;
            clone.querySelector('.date').textContent = notification.datum;

            // Setup edit button voor elke melding
            const editBtn = clone.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => this.editNotification(index));
            this.body.appendChild(clone);
        });
    }

    // Setup event listeners voor knoppen
    setupListeners() {
        document.getElementById('add-btn').addEventListener('click', () => {
            this.addNotification();
        });
        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveEdit();
        });
        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    // Voeg een nieuwe melding toe
    addNotification() {
        const newNotification = {
            naam: "Nieuwe Melding",
            beschrijving: "Dit is een nieuwe melding.",
            gebruikersnaam: "admin",
            datum: new Date().toLocaleDateString()
        };

        this.notifications.push(newNotification);
        this.displayNotifications();
    }

    // Open het formulier om een melding te bewerken
    editNotification(index) {
        this.editIndex = index;
        const notification = this.notifications[index];

        // Vul de huidige waarden in het bewerkformulier
        document.getElementById('edit-name').value = notification.naam;
        document.getElementById('edit-description').value = notification.beschrijving;

        // Toon het formulier
        this.form.style.display = 'block';
    }

    // Sla de bewerkingen van een melding op
    saveEdit() {
        if (this.editIndex !== null) {
            const updatedNotification = {
                naam: document.getElementById('edit-name').value,
                beschrijving: document.getElementById('edit-description').value,
                gebruikersnaam: this.notifications[this.editIndex].gebruikersnaam,
                datum: this.notifications[this.editIndex].datum
            };

            this.notifications[this.editIndex] = updatedNotification;
            this.displayNotifications();

            // Verberg het bewerkformulier
            this.form.style.display = 'none';
            this.editIndex = null;
        }
    }

    // Annuleer het bewerken van een melding
    cancelEdit() {
        this.form.style.display = 'none';
        this.editIndex = null;
    }
}

// Start de app wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', () => {
    new NotificationApp();
});
