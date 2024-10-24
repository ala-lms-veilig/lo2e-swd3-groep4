let currentEditIndex = null;

async function fetchNotifications() {
    const url = 'https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/meldingen';
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Netwerkfout: ' + response.statusText);
        }

        const data = await response.json();
        data.forEach((melding, index) => {
            addNotificationToDOM(melding, index);
        });
    } catch (error) {
        console.error('Fout bij het ophalen van meldingen:', error);
    }
}

function addNotificationToDOM(melding, index) {
    const template = document.getElementById('notification-template').content.cloneNode(true);
    template.querySelector('.naam').textContent = melding.naam;
    template.querySelector('.beschrijving').textContent = melding.beschrijving;
    template.querySelector('.gebruikersnaam').textContent = melding.gebruikersnaam;
    template.querySelector('.datum').textContent = melding.datum;
    
    const editButton = template.querySelector('.edit-btn');
    editButton.addEventListener('click', () => openEditForm(melding, index));
    
    document.getElementById('notification-body').appendChild(template);
}

function openEditForm(melding, index) {
    currentEditIndex = index;
    document.getElementById('edit-naam').value = melding.naam;
    document.getElementById('edit-beschrijving').value = melding.beschrijving;
    document.getElementById('edit-form').style.display = 'block';
}

document.getElementById('save-edit-btn').addEventListener('click', saveEdit);
document.getElementById('cancel-edit-btn').addEventListener('click', () => {
    document.getElementById('edit-form').style.display = 'none';
});

function saveEdit() {
    const naam = document.getElementById('edit-naam').value;
    const beschrijving = document.getElementById('edit-beschrijving').value;

  
    const row = document.querySelector(`#notification-body tr:nth-child(${currentEditIndex + 1})`);
    row.querySelector('.naam').textContent = naam;
    row.querySelector('.beschrijving').textContent = beschrijving;

 
    document.getElementById('edit-form').style.display = 'none';
}


fetchNotifications();
