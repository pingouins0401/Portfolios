document.addEventListener('DOMContentLoaded', () => {

    // --- Gestion du Thème (Dark Mode) ---
    const themeToggleButton = document.getElementById('dark-mode-toggle');
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    // Fonction pour appliquer le thème
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.querySelector('i').classList.replace(moonIcon, sunIcon);
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.querySelector('i').classList.replace(sunIcon, moonIcon);
        }
    };

    // Vérifier le thème enregistré dans le localStorage
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    applyTheme(currentTheme);

    // Gérer le clic sur le bouton
    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Gestion du formulaire de contact ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            alert("Merci pour votre message ! (Ceci est une démo)");
            contactForm.reset();
        });
    }

    // --- Gestion du Compteur de Visites ---
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        let count = localStorage.getItem('portfolioVisitorCount');
        if (count === null) {
            count = 1;
        } else {
            count = parseInt(count) + 1;
        }
        localStorage.setItem('portfolioVisitorCount', count);
        visitorCountElement.textContent = count;
    }

});