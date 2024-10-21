let clockedInUsers = JSON.parse(localStorage.getItem('clockedInUsers')) || [];

function displayClockedInUsers() {
    const clockedInList = document.getElementById('clockedInList');
    clockedInList.innerHTML = ''; 

    clockedInUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.naam} - Toren ${user.toren}, Hoogte ${user.hoogte}`;
        clockedInList.appendChild(li);
    });
}

document.getElementById('clockInForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const naam = document.getElementById('naam').value;
    const toren = document.getElementById('toren').value;
    const hoogte = document.getElementById('hoogte').value;

    const newUser = { naam, toren, hoogte };
    clockedInUsers.push(newUser);
    localStorage.setItem('clockedInUsers', JSON.stringify(clockedInUsers));
    displayClockedInUsers();
    document.getElementById('clockInForm').reset();
});

document.getElementById('clockOutForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const naam = document.getElementById('naamUitklokken').value;
    clockedInUsers = clockedInUsers.filter(user => user.naam !== naam);
    localStorage.setItem('clockedInUsers', JSON.stringify(clockedInUsers));
    displayClockedInUsers();

    document.getElementById('clockOutForm').reset();
});

displayClockedInUsers();
