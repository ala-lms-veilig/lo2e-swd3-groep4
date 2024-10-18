class NotificationApp {
    constructor() {
        this.notifications = [];
        this.notificationBody = document.getElementById('notification-body');
        this.template = document.getElementById('notification-template');
        this.editForm = document.getElementById('edit-form');
        this.currentEditIndex = null; 
        this.loadData();
        this.setupEventListeners();
    }

    async loadData() {
        try {
            const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen');
            this.notifications = await response.json();
            this.renderNotifications();
        } catch (error) {
            console.error('Error loading JSON data:', error);
        }
    }

    renderNotifications() {
        this.notificationBody.innerHTML = ''; 
        this.notifications.forEach((notification, index) => {
            const clone = this.template.content.cloneNode(true);
            clone.querySelector('.naam').textContent = notification.naam;
            clone.querySelector('.beschrijving').textContent = notification.beschrijving;
            clone.querySelector('.gebruikersnaam').textContent = notification.gebruikersnaam;
            clone.querySelector('.datum').textContent = notification.datum;

            // Edit button
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

    async addNotification() {
        const naam = prompt("Voer de naam in voor de melding:");
        const beschrijving = prompt("Voer de beschrijving in voor de melding:");

        // Validatie van invoer
        if (!naam || !beschrijving) {
            alert('Vul alstublieft alle velden in.');
            return;
        }

        const newNotification = {
            naam: naam,
            beschrijving: beschrijving,
            gebruikersnaam: "admin", // Dit kan ook dynamisch zijn
            datum: new Date().toLocaleDateString()
        };

        try {
            const response = await fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newNotification),
            });

            // Controleer of de response goed is
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            this.notifications.push(data); // Voeg de nieuwe melding toe aan de lokale array
            this.renderNotifications();
        } catch (error) {
            console.error('Error adding notification:', error);
        }
    }

    editNotification(index) {
        this.currentEditIndex = index;
        const notification = this.notifications[index];
        document.getElementById('edit-naam').value = notification.naam;
        document.getElementById('edit-beschrijving').value = notification.beschrijving;
        this.editForm.style.display = 'block';
    }

    async saveEdit() {
        if (this.currentEditIndex !== null) {
            const editedNotification = {
                naam: document.getElementById('edit-naam').value,
                beschrijving: document.getElementById('edit-beschrijving').value,
                gebruikersnaam: this.notifications[this.currentEditIndex].gebruikersnaam,
                datum: this.notifications[this.currentEditIndex].datum
            };

            // Validatie van invoer
            if (!editedNotification.naam || !editedNotification.beschrijving) {
                alert('Vul alstublieft alle velden in.');
                return;
            }

            this.notifications[this.currentEditIndex] = editedNotification; // Update de lokale array
            this.renderNotifications();
            this.editForm.style.display = 'none';
            this.currentEditIndex = null;
        }
    }

    cancelEdit() {
        this.editForm.style.display = 'none';
        this.currentEditIndex = null;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new NotificationApp();
});
