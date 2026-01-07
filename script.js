/**
 * Portfolio Script
 * Handles theme toggling, form submission demo, and visitor counting.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       Theme Management (Dark/Light Mode)
       ========================================= */
    const themeToggleButton = document.getElementById('dark-mode-toggle');
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    /**
     * Applies the specified theme to the document body and updates the icon.
     * @param {string} theme - 'dark' or 'light'
     */
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            // Switch to sun icon when in dark mode
            themeToggleButton.querySelector('i').classList.replace(moonIcon, sunIcon);
        } else {
            document.body.classList.remove('dark-mode');
            // Switch to moon icon when in light mode
            themeToggleButton.querySelector('i').classList.replace(sunIcon, moonIcon);
        }
    };

    // 1. Check for saved theme preference in localStorage
    let currentTheme = localStorage.getItem('theme');
    
    // 2. If no saved preference, check system preference
    if (!currentTheme) {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // 3. Apply the determined theme
    applyTheme(currentTheme);

    // 4. Handle toggle button click
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }


    /* =========================================
       Contact Form Handling
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            // Demo alert - in a real app, this would send data to a backend or email service.
            alert("Merci pour votre message ! (Ceci est une démo)");
            contactForm.reset();
        });
    }

    /* =========================================
       Visitor Counter (Local Demo)
       ========================================= */
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        let count = localStorage.getItem('portfolioVisitorCount');
        
        // Initialize or increment
        if (count === null || isNaN(count)) {
            count = 1;
        } else {
            count = parseInt(count, 10) + 1;
        }
        
        localStorage.setItem('portfolioVisitorCount', count);
        visitorCountElement.textContent = count;
    }

});