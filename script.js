document.addEventListener('DOMContentLoaded', () => {

    // --- Gestion du Thème (Light/Dark Mode) ---
    const themeToggleButton = document.getElementById('dark-mode-toggle');
    const moonIcon = 'fa-moon';
    const sunIcon = 'fa-sun';

    // Fonction pour appliquer le thème
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.body.classList.add('light-mode');
            themeToggleButton.querySelector('i').classList.replace(moonIcon, sunIcon);
        } else {
            document.body.classList.remove('light-mode');
            themeToggleButton.querySelector('i').classList.replace(sunIcon, moonIcon);
        }
    };

    // Vérifier le thème enregistré dans le localStorage
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
        // Default to dark (which is the base style, so 'dark' means no 'light-mode' class)
        currentTheme = 'dark';
    }

    applyTheme(currentTheme);

    // Gérer le clic sur le bouton
    themeToggleButton.addEventListener('click', () => {
        let newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- Galaxy Background Animation ---
    const galaxyCanvas = document.getElementById('galaxy-canvas');
    if (galaxyCanvas) {
        const ctx = galaxyCanvas.getContext('2d');
        let width, height;
        let stars = [];
        let mouse = { x: 0, y: 0 };

        const initGalaxy = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            galaxyCanvas.width = width;
            galaxyCanvas.height = height;
            stars = [];
            for (let i = 0; i < 200; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 1.5,
                    vx: (Math.random() - 0.5) * 0.2,
                    vy: (Math.random() - 0.5) * 0.2
                });
            }
        };

        const drawGalaxy = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw stars
            ctx.fillStyle = 'white';
            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();

                // Movement
                star.x += star.vx;
                star.y += star.vy;

                // Mouse interaction (parallax/repulsion)
                const dx = star.x - mouse.x;
                const dy = star.y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    star.x += dx / 20;
                    star.y += dy / 20;
                }

                // Wrap around screen
                if (star.x < 0) star.x = width;
                if (star.x > width) star.x = 0;
                if (star.y < 0) star.y = height;
                if (star.y > height) star.y = 0;
            });

            requestAnimationFrame(drawGalaxy);
        };

        window.addEventListener('resize', initGalaxy);
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        initGalaxy();
        drawGalaxy();
    }


    // --- Mini-Game: Space Defender ---
    const gameCanvas = document.getElementById('game-canvas');
    const startBtn = document.getElementById('start-game-btn');

    if (gameCanvas && startBtn) {
        const ctx = gameCanvas.getContext('2d');
        let gameLoop;
        let player = { x: 200, y: 280, width: 20, height: 20, color: '#00d2ff' };
        let bullets = [];
        let enemies = [];
        let score = 0;
        let isGameRunning = false;

        // Mouse control for player
        gameCanvas.addEventListener('mousemove', (e) => {
            const rect = gameCanvas.getBoundingClientRect();
            player.x = e.clientX - rect.left - player.width / 2;
        });

        // Click to shoot
        gameCanvas.addEventListener('mousedown', () => {
            if (isGameRunning) {
                bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10, color: '#ff007a' });
            }
        });

        const spawnEnemy = () => {
            if (isGameRunning) {
                enemies.push({ x: Math.random() * (gameCanvas.width - 20), y: -20, width: 20, height: 20, color: '#ff4444' });
                setTimeout(spawnEnemy, 1000 - Math.min(score * 10, 800)); // Increase difficulty
            }
        };

        const updateGame = () => {
            if (!isGameRunning) return;

            ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

            // Draw Player
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);

            // Draw Bullets
            bullets.forEach((bullet, index) => {
                bullet.y -= 5;
                ctx.fillStyle = bullet.color;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                if (bullet.y < 0) bullets.splice(index, 1);
            });

            // Draw Enemies
            enemies.forEach((enemy, index) => {
                enemy.y += 2;
                ctx.fillStyle = enemy.color;
                ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

                // Collision with player
                if (
                    player.x < enemy.x + enemy.width &&
                    player.x + player.width > enemy.x &&
                    player.y < enemy.y + enemy.height &&
                    player.height + player.y > enemy.y
                ) {
                    endGame();
                }

                // Collision with bullets
                bullets.forEach((bullet, bIndex) => {
                    if (
                        bullet.x < enemy.x + enemy.width &&
                        bullet.x + bullet.width > enemy.x &&
                        bullet.y < enemy.y + enemy.height &&
                        bullet.height + bullet.y > enemy.y
                    ) {
                        enemies.splice(index, 1);
                        bullets.splice(bIndex, 1);
                        score += 10;
                    }
                });

                if (enemy.y > gameCanvas.height) {
                    enemies.splice(index, 1); // Enemy passed
                }
            });

            // Draw Score
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText('Score: ' + score, 10, 20);

            gameLoop = requestAnimationFrame(updateGame);
        };

        const startGame = () => {
            if (isGameRunning) return;
            isGameRunning = true;
            score = 0;
            bullets = [];
            enemies = [];
            startBtn.style.display = 'none';
            spawnEnemy();
            updateGame();
        };

        const endGame = () => {
            isGameRunning = false;
            cancelAnimationFrame(gameLoop);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
            ctx.fillStyle = 'white';
            ctx.font = '30px Arial';
            ctx.fillText('Game Over', 120, 150);
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 160, 190);
            startBtn.style.display = 'block';
            startBtn.textContent = 'Rejouer';
        };

        startBtn.addEventListener('click', startGame);
    }


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