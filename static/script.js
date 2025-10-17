document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggling Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Apply the saved theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        let newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        // Refresh particles to apply new color
        loadParticles(newTheme);
    });

    // --- tsParticles Animation Configuration ---
    function loadParticles(theme) {
        const particleColor = theme === 'dark' ? '#484f58' : '#adadad';

        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: particleColor },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                links: {
                    enable: true,
                    distance: 150,
                    color: particleColor,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    outModes: { default: "out" },
                },
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    onClick: { enable: true, mode: "push" },
                },
            },
            detectRetina: true,
        });
    }

    // Initial load of particles
    loadParticles(currentTheme);
});