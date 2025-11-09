const container = document.querySelector('.home_gear2_lower_container');
const nitroImg = document.querySelector('.nitro-effect img');
const revText = document.querySelector('.home_gear2_lower_container_rev');

function updateScrollAnimation() {

    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1 - rect.top / windowHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    const shift = Math.min(
        1220 - revText.offsetWidth,
        window.innerWidth - revText.offsetWidth - 60
    );

    revText.style.transform = `translateX(${progress * shift}px)`;

    nitroImg.style.transform = `scaleX(${progress})`;
}

function onScroll() {
    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }
    requestAnimationFrame(updateScrollAnimation);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updateScrollAnimation);

updateScrollAnimation();



// parallax
document.addEventListener('DOMContentLoaded', function() {
    const partnersec = document.querySelector('.home');
    if (!partnersec) return

    const partnerSection = document.querySelector('.home_gear2_upper_container');

    const parallaxImg = document.querySelector('.home_gear2_upper_container img');

    if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        parallaxImg.classList.add('parallax');

        function updateParallax() {
            const rect = partnerSection.getBoundingClientRect();
            const scrolled = -rect.top;
            const speed = 0.3;
            const offset = (scrolled * speed) + 'px';

            partnerSection.style.setProperty('--parallax-offset', offset);
        }

        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    updateParallax();
                    ticking = false;
                });
                ticking = true;
            }
        });

        updateParallax();
    }
});





