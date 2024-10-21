document.getElementById("show-register").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("register-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
});


document.getElementById("registration-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const newUsername = document.getElementById("new-username").value;
    const newEmail = document.getElementById("new-email").value;
    const newPassword = document.getElementById("new-password").value;

    const registrationData = {
        username: newUsername,
        email: newEmail,
        password: newPassword
    };

  
    localStorage.setItem('userData', JSON.stringify(registrationData));


    window.location.href = "dashboard.html"; 
});

// Handle login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const storedUserData = JSON.parse(localStorage.getItem('userData'));


    if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
        alert("Login succesvol!");
        window.location.href = "../HTML/dashboard.html"; 
    } else {
        alert("Ongeldige gebruikersnaam of wachtwoord. Probeer het opnieuw.");
    }
});
