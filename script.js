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
        // Si pas de thème, vérifier la préférence système
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Appliquer le thème au chargement
    applyTheme(currentTheme);

    // Gérer le clic sur le bouton
    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- (Optionnel) Gestion du formulaire de contact ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Empêche l'envoi réel du formulaire (qui rechargerait la page)
            e.preventDefault(); 
            
            // Pour un vrai site, tu enverrais ces données à un service
            // comme Netlify Forms, Formspree, ou à ton propre backend.
            
            // On affiche juste un message de succès
            alert("Merci pour votre message ! (Ceci est une démo)");
            
            // On vide le formulaire
            contactForm.reset();
        });
    }

});