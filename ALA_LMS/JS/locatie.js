function fetchData() {
    fetch('JSON/db.json') // Replace with the path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => populateTable(data))
        .catch(error => console.error('There has been a problem with your fetch operation:', error));
}

// Function to populate the table
function populateTable(data) {
    const tableBody = document.getElementById('locatieTableBody');
    data.locatie.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.Id}</td><td>${item.Toren}</td><td>${item.Namen}</td>`;
        tableBody.appendChild(row);
    });
}

// Call the fetchData function to load and populate the table
fetchData();