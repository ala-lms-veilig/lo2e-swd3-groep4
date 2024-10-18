class NotificationApp {
    constructor() {
        this.notifications = [];
        this.notificationBody = document.getElementById('notification-body');
        this.template = document.getElementById('notification-template');
        this.editForm = document.getElementById('edit-form');
        this.currentEditIndex = null; // Houdt de index bij van de melding die we bewerken
        this.loadData();
        this.setupEventListeners();
    }

    loadData() {
        try {
            const savedNotifications = localStorage.getItem('notifications');
            this.notifications = savedNotifications ? JSON.parse(savedNotifications) : [];
            this.renderNotifications();
        } catch (error) {
            console.error('Error loading notifications from localStorage:', error);
        }
    }

    renderNotifications() {
        this.notificationBody.innerHTML = ''; // Maak de tabel leeg voordat we de meldingen renderen
        this.notifications.forEach((notification, index) => {
            const clone = this.template.content.cloneNode(true);
            clone.querySelector('.naam').textContent = notification.naam;
            clone.querySelector('.beschrijving').textContent = notification.beschrijving;
            clone.querySelector('.gebruikersnaam').textContent = notification.gebruikersnaam;
            clone.querySelector('.datum').textContent = notification.datum;
            const editButton = clone.querySelector('.edit-btn');
            editButton.addEventListener('click', () => this.editNotification(index));
            this.notificationBody.appendChild(clone);
        });
    }

    setupEventListeners() {
        document.getElementById('add-notification-btn').addEventListener('click', () => {
            this.addNotification();
        });
        document.getElementById('save-edit-btn').addEventListener('click', () => {
            this.saveEdit();
        });
        document.getElementById('cancel-edit-btn').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    addNotification() {
        const newNotification = {
            naam: "Nieuwe Melding",
            beschrijving: "Dit is een nieuwe melding.",
            gebruikersnaam: "admin",
            datum: new Date().toLocaleDateString()
        };

        this.notifications.push(newNotification);
        this.saveData(); // Sla de data op in localStorage
        this.renderNotifications();
    }

    editNotification(index) {
        this.currentEditIndex = index;
        const notification = this.notifications[index];

        // Vul het formulier in met de bestaande data
        document.getElementById('edit-naam').value = notification.naam;
        document.getElementById('edit-beschrijving').value = notification.beschrijving;

        // Toon het formulier
        this.editForm.style.display = 'block';
    }

    saveEdit() {
        if (this.currentEditIndex !== null) {
            const editedNotification = {
                naam: document.getElementById('edit-naam').value,
                beschrijving: document.getElementById('edit-beschrijving').value,
                gebruikersnaam: this.notifications[this.currentEditIndex].gebruikersnaam,
                datum: this.notifications[this.currentEditIndex].datum
            };

            // Sla de bewerkte melding op in de array en localStorage, render opnieuw
            this.notifications[this.currentEditIndex] = editedNotification;
            this.saveData();
            this.renderNotifications();

            // Verberg het formulier
            this.editForm.style.display = 'none';
            this.currentEditIndex = null;
        }
    }

    cancelEdit() {
        this.editForm.style.display = 'none';
        this.currentEditIndex = null;
    }

    saveData() {
        try {
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        } catch (error) {
            console.error('Error saving notifications to localStorage:', error);
        }
    }
}

// Initialiseer de applicatie
document.addEventListener('DOMContentLoaded', () => {
    new NotificationApp();
});
