import createParallax from '../global';

createParallax('.case_represent_container', '.case_represent_back');
createParallax('.case_finish_lower', '.case_finish_back');


document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.case_c2_container');
    const labelWrappers = document.querySelectorAll('.case_c2_container .label_wrapper');

    const config = {
        triggerOffset: 0.2,
        stepDelay: 0.3,
        animationDistance: 30
    };

    function handleScrollAnimation() {
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        if (containerTop < windowHeight && containerRect.bottom > 0) {
            const progress = 1 - (containerTop / (windowHeight - containerHeight));

            labelWrappers.forEach((wrapper, index) => {
                const threshold = (index + 1) * config.stepDelay;

                if (progress >= threshold) {
                    wrapper.classList.add('label_wrapper-visible');
                    wrapper.classList.remove('label_wrapper-hidden');
                } else {
                    wrapper.classList.add('label_wrapper-hidden');
                    wrapper.classList.remove('label_wrapper-visible');
                }
            });
        } else {
            labelWrappers.forEach(wrapper => {
                wrapper.classList.add('label_wrapper-hidden');
                wrapper.classList.remove('label_wrapper-visible');
            });
        }
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }

    labelWrappers.forEach(wrapper => {
        wrapper.classList.add('label_wrapper-hidden');
    });

    handleScrollAnimation();
    window.addEventListener('scroll', onScroll, { passive: true });
});