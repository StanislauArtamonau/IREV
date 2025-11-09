function createParallax(parentClass, imgClass){
    document.addEventListener('DOMContentLoaded', function() {

        const partnerSection = document.querySelector(parentClass);

        const parallaxImg = document.querySelector(imgClass);

        if(!partnerSection || !parallaxImg){
            return;
        }

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
}

module.exports = createParallax;