// Get elements
const burger = document.getElementById('burger');
const sidebar = document.getElementById('sidebar');

// Toggle sidebar visibility
burger.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});
