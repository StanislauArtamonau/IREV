function createParallax(parentClass, imgClass) {
    document.addEventListener('DOMContentLoaded', function() {
        const partnerSection = document.querySelector(parentClass);
        const parallaxImg = document.querySelector(imgClass);

        if (!partnerSection || !parallaxImg) {
            return;
        }

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let isActive = false;
        let animationFrameId = null;

        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isActive) {
                        isActive = true;
                        parallaxImg.classList.add('parallax');
                        startParallax();
                    }
                } else {
                    if (isActive) {
                        isActive = false;
                        parallaxImg.classList.remove('parallax');
                        stopParallax();
                    }
                }
            });
        }, {
            rootMargin: '100px 0px'
        });

        function updateParallax() {
            if (!isActive) return;

            const rect = partnerSection.getBoundingClientRect();
            const scrolled = -rect.top;
            const speed = 0.3;
            const offset = (scrolled * speed) + 'px';

            partnerSection.style.setProperty('--parallax-offset', offset);

            if (isActive) {
                animationFrameId = requestAnimationFrame(updateParallax);
            }
        }

        function startParallax() {
            if (!animationFrameId) {
                animationFrameId = requestAnimationFrame(updateParallax);
            }
        }

        function stopParallax() {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            partnerSection.style.setProperty('--parallax-offset', '0px');
        }

        intersectionObserver.observe(parallaxImg);

        window.addEventListener('beforeunload', stopParallax);

        return () => {
            stopParallax();
            intersectionObserver.disconnect();
        };
    });
}

module.exports = createParallax;