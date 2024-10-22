// script.js

// Function to create a card element
function createCard(card) {
    return `
        <article class="card">
            <article class="face face1">
                <article class="content">
                    <img src="${card.image}" alt="${card.title} Icon">
                    <h3>${card.title}</h3>
                </article>
            </article>
            <article class="face face2">
                <article class="content">
                    <p>${card.description}</p>
                    <a href="${card.link}">Lees meer</a>
                </article>
            </article>
        </article>
    `;
}

// Fetch JSON data from the provided URL and generate cards
fetch('https://my-json-server.typicode.com/ala-lms-veilig/lo2e-swd3-groep4/cards')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById('card-container');
        data.forEach(card => {
            cardContainer.innerHTML += createCard(card);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
