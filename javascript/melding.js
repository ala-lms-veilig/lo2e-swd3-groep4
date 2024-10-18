class NotificationApp {
    constructor() {
        this.notifications = [];
        this.notificationBody = document.getElementById('notification-body');
        this.template = document.getElementById('notification-template');
        this.editForm = document.getElementById('edit-form');
        this.currentEditIndex = null; // Track the index of the notification being edited
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
        this.notificationBody.innerHTML = ''; // Clear the table before rendering notifications
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
        this.renderNotifications();
    }

    editNotification(index) {
        this.currentEditIndex = index;
        const notification = this.notifications[index];

        // Fill the form with existing data
        document.getElementById('edit-naam').value = notification.naam;
        document.getElementById('edit-beschrijving').value = notification.beschrijving;

        // Show the form
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

            // Save the edited notification in the array and render again
            this.notifications[this.currentEditIndex] = editedNotification;
            this.renderNotifications();

            // Hide the form
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
