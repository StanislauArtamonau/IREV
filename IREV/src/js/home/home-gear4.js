// parallax
document.addEventListener('DOMContentLoaded', function() {

    const partnerSection = document.querySelector('.home_gear4_container');

    const parallaxImg = document.querySelectorAll('.home_gear4_container img');

    if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        parallaxImg.forEach(img=>img.classList.add('parallax'))

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


document.addEventListener('DOMContentLoaded', function() {
    const partnersec = document.querySelector('.home');
    if (!partnersec) return

    const partnerSection = document.querySelector('.home_gear4_lower_container');

    const parallaxImg = document.querySelectorAll('.gear4back');

    if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        parallaxImg.forEach(img=>img.classList.add('parallax'))

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
