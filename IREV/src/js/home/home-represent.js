document.addEventListener('DOMContentLoaded', function() {
    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }

    const counterElement = document.querySelector('.home_represent_counter span');
    const counterDiv = document.querySelector('.home_represent_counter');
    const signInButton = document.querySelector('.header_signIn');
    const testDriveButton = document.querySelector('.home_represent_form_container_button');
    const input = document.querySelector('.home_represent_form_container_input');

    const elements = [counterDiv, signInButton, testDriveButton, input];

    let totalSeconds = 3 * 100;

    function updateTimer() {
        totalSeconds--;

        if (totalSeconds < 0) {
            elements.forEach(element=>element.classList.remove('one', 'two'));
            elements.forEach(element=>element.classList.add('go'));
            counterElement.textContent = '00:00,00';
            return;
        }

        const seconds = Math.floor(totalSeconds / 100);
        const hundredths = totalSeconds % 100;

        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedHundredths = hundredths.toString().padStart(2, '0');

        counterElement.textContent = `00:${formattedSeconds},${formattedHundredths}`;

        switch (totalSeconds){
            case 200: {
                elements.forEach(element=>element.classList.add('two'));
                break;
            }
            case 100: {
                elements.forEach(element=>element.classList.remove('two'));
                elements.forEach(element=>element.classList.add('one'));
                break;
            }
        }

        setTimeout(updateTimer, 10);
    }

    setTimeout(updateTimer, 10);
});


document.addEventListener('DOMContentLoaded', ()=> {
    // email save

    const mainEmailInput = document.querySelector('.home_represent_form_container_input');
    const popupEmailInput = document.querySelector('.home_popup_content_form_inputs input[type="email"]');

    if (mainEmailInput && popupEmailInput) {
        mainEmailInput.addEventListener('input', function () {
            popupEmailInput.value = this.value;
        });

        popupEmailInput.addEventListener('input', function () {
            mainEmailInput.value = this.value;
        });

        if (mainEmailInput.value) {
            popupEmailInput.value = mainEmailInput.value;
        }
    }

    // checkbox save

    const policyCheckbox = document.getElementById('policyCheckbox');
    const submitButton = document.getElementById('submitButton');

    if (policyCheckbox && submitButton) {
        policyCheckbox.addEventListener('change', function () {
            updateButtonState();
        });

        const customCheckbox = policyCheckbox.closest('.checkbox');
        if (customCheckbox) {
            customCheckbox.addEventListener('click', function (e) {
                policyCheckbox.checked = !policyCheckbox.checked;
                policyCheckbox.dispatchEvent(new Event('change'));
            });
        }

        updateButtonState();

        function updateButtonState() {
            if (policyCheckbox.checked) {
                submitButton.classList.add('selected');
            } else {
                submitButton.classList.remove('selected');
            }
        }
    }
});

// paralax
document.addEventListener('DOMContentLoaded', function() {
    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }
    const parallaxImg = document.querySelector('.home_represent_backgroundImg');

    if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        parallaxImg.classList.add('parallax');

        function updateParallax() {
            const scrolled = window.pageYOffset;
            const speed = 0.3;
            const offset = (scrolled * speed) + 'px';

            document.documentElement.style.setProperty('--parallax-offset', offset);
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

