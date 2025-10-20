document.addEventListener('DOMContentLoaded', function() {
    const gearSection = document.querySelector('.home_gear2');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Убираем наблюдение после первой активации
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });

    if (gearSection) {
        observer.observe(gearSection);
    }
});

function initNitroAnimation() {
    const nitroElements = document.querySelectorAll('.home_gear2_lower_container_nitro');

    nitroElements.forEach(container => {
        const textElement = container.querySelector('.home_gear2_lower_container_rev');
        const nitroEffect = container.querySelector('.nitro-effect');

        const textWidth = textElement.scrollWidth;
        const containerWidth = container.offsetWidth;

        const finalTranslateX = containerWidth - textWidth; // 30px - отступ

        // Устанавливаем CSS переменные
        container.style.setProperty('--text-final-translate', `${finalTranslateX}px`);
        container.style.setProperty('--nitro-final-scale', textWidth / containerWidth);
    });
}

window.addEventListener('load', initNitroAnimation);
window.addEventListener('resize', initNitroAnimation);
