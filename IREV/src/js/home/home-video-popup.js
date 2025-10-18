document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы
    const videoWrapper = document.querySelector('.home_represent_lowerWrapper_video');
    const modalOverlay = document.getElementById('modalOverlay');

    if (videoWrapper && modalOverlay) {
        videoWrapper.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            modalOverlay.classList.add('active');


            document.body.style.overflow = 'hidden';
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    const submitButton = document.querySelector('.form-button');
    if (submitButton) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const emailInput = document.querySelector('.form-input');
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                console.log('Email submitted:', email);
                alert('Thank you! We will contact you soon.');
                closeModal();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});