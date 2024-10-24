document.addEventListener("DOMContentLoaded", () => {
    const notificationBody = document.getElementById("notification-body");
    const addNotificationBtn = document.getElementById("add-notification-btn");
    const editForm = document.getElementById("edit-form");
    const editNameInput = document.getElementById("edit-naam");
    const editDescriptionInput = document.getElementById("edit-beschrijving");
    let currentEditId = null;

    // Fetch notifications from the JSON server
    fetch("https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen")
        .then(response => response.json())
        .then(data => {
            data.meldingen.forEach(notification => {
                addNotificationToTable(notification);
            });
            console.log("Fetched notifications:", data.meldingen);
        });

    // Function to add a notification to the table
    function addNotificationToTable(notification) {
        const template = document.getElementById("notification-template");
        const clone = template.content.cloneNode(true);

        clone.querySelector(".naam").textContent = notification.naam;
        clone.querySelector(".beschrijving").textContent = notification.beschrijving;
        clone.querySelector(".gebruikersnaam").textContent = notification.gebruikersnaam;
        clone.querySelector(".datum").textContent = notification.datum;

        const editBtn = clone.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            currentEditId = notification.id; // Assume 'id' is part of the notification object
            editNameInput.value = notification.naam;
            editDescriptionInput.value = notification.beschrijving;
            editForm.style.display = "block";
        });

        notificationBody.appendChild(clone);
    }

    // Save edited notification
    document.getElementById("save-edit-btn").addEventListener("click", () => {
        const updatedNotification = {
            naam: editNameInput.value,
            beschrijving: editDescriptionInput.value,
            gebruikersnaam: "gebruiker1", // Placeholder, should be dynamic
            datum: new Date().toISOString().split("T")[0] // Current date
        };

        // Update the notification on the server (PUT method)
        fetch(`https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen/${currentEditId}`, {
            method: "PUT",
            body: JSON.stringify(updatedNotification),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            console.log("Updated notification:", updatedNotification);
            notificationBody.innerHTML = ""; // Clear the table
            fetchNotifications(); // Refetch notifications
            editForm.style.display = "none"; // Hide edit form
        });
    });

    // Cancel edit
    document.getElementById("cancel-edit-btn").addEventListener("click", () => {
        editForm.style.display = "none";
    });

    // Add new notification
    addNotificationBtn.addEventListener("click", () => {
        const newNotification = {
            naam: "Nieuwe Melding", // Placeholder
            beschrijving: "Beschrijving van nieuwe melding.", // Placeholder
            gebruikersnaam: "gebruiker1", // Placeholder
            datum: new Date().toISOString().split("T")[0] // Current date
        };

        fetch("https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen", {
            method: "POST",
            body: JSON.stringify(newNotification),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
          .then(json => {
              console.log("Created new notification:", json);
              addNotificationToTable(json); // Add the new notification to the table
          });
    });

    function fetchNotifications() {
        fetch("https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen")
            .then(response => response.json())
            .then(data => {
                data.meldingen.forEach(notification => {
                    addNotificationToTable(notification);
                });
                console.log("Fetched notifications after update:", data.meldingen);
            });
    }
});
