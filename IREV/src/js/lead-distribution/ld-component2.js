document.addEventListener('DOMContentLoaded', function() {
    const carSection = document.querySelector('.lead_distribution_c2');
    const carItems = document.querySelectorAll('.ld_c2_container_item');
    const animatedCar = document.querySelector('.animated-car');

    if (!carSection || !animatedCar) return;

    const itemPositions = [];

    function calculatePositions() {
        const sectionRect = carSection.getBoundingClientRect();
        itemPositions.length = 0;

        carItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            const positionFromTop = itemRect.top - sectionRect.top;
            const normalizedPosition = (positionFromTop / sectionRect.height) * 100;
            itemPositions.push(normalizedPosition);
        });
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    function trackAnimationProgress() {
        const carRect = animatedCar.getBoundingClientRect();
        const sectionRect = carSection.getBoundingClientRect();

        const carProgress = ((carRect.top - sectionRect.top) / sectionRect.height) * 100;

        carItems.forEach((item, index) => {
            const itemPosition = itemPositions[index];
            if (carProgress >= itemPosition - 5 && !item.classList.contains('revealed')) {
                item.classList.add('revealed');
            }
        });
    }

    function activateCarAnimation() {
        if (isElementInViewport(carSection)) {
            calculatePositions();

            animatedCar.style.animationPlayState = 'running';

            const animationInterval = setInterval(trackAnimationProgress, 100);

            setTimeout(() => {
                clearInterval(animationInterval);
                carItems.forEach(item => item.classList.add('revealed'));
            }, 10500);

            window.removeEventListener('scroll', activateCarAnimation);
        }
    }

    animatedCar.style.animationPlayState = 'paused';

    window.addEventListener('resize', calculatePositions);

    window.addEventListener('scroll', activateCarAnimation);

    setTimeout(() => {
        calculatePositions();
        activateCarAnimation();
    }, 100);
});





document.addEventListener('DOMContentLoaded', function() {
    const partnerSection = document.querySelector('.ld');

    if (!partnerSection) {
        return;
    }

    const testDriveButton = document.querySelector('.ldc3button');
    const input = document.querySelector('.ldc3input');

    function checkInputValue() {
        if (input.value.trim() !== '') {
            testDriveButton.classList.add('has-value');
        } else {
            testDriveButton.classList.remove('has-value');
        }
    }

    input.addEventListener('input', checkInputValue);

    checkInputValue();
});


document.addEventListener('DOMContentLoaded', function() {
    const partnerSection = document.querySelector('.ld');

    if (!partnerSection) {
        return;
    }

    const testDriveButton = document.querySelector('.ldfinishbutton');
    const input = document.querySelector('.ldfinishinput');

    function checkInputValue() {
        if (input.value.trim() !== '') {
            testDriveButton.classList.add('has-value');
        } else {
            testDriveButton.classList.remove('has-value');
        }
    }

    input.addEventListener('input', checkInputValue);

    checkInputValue();
});