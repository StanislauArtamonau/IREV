document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.querySelector('.home_represent_lowerWrapper_video');
    const modalOverlay = document.getElementById('modalOverlay');
    const originalVideo = videoWrapper ? videoWrapper.querySelector('video') : null;
    const modalVideo = modalOverlay ? modalOverlay.querySelector('video') : null;
    const playButton = videoWrapper ? videoWrapper.querySelector('.video_player button') : null;

    let currentTime = 0;
    let isPlaying = false;
    let activeVideo = null;

    function switchToModalVideo() {
        if (!originalVideo || !modalVideo) return;

        currentTime = originalVideo.currentTime;
        isPlaying = !originalVideo.paused;

        originalVideo.pause();
        originalVideo.currentTime = 0;

        modalVideo.currentTime = currentTime;
        if (isPlaying) {
            modalVideo.play().catch(e => console.log('Modal video play error:', e));
        }

        activeVideo = modalVideo;
    }

    function switchToOriginalVideo() {
        if (!originalVideo || !modalVideo) return;

        currentTime = modalVideo.currentTime;
        isPlaying = !modalVideo.paused;

        modalVideo.pause();
        modalVideo.currentTime = 0;

        originalVideo.currentTime = currentTime;
        if (isPlaying) {
            originalVideo.play().catch(e => console.log('Original video play error:', e));
        }

        activeVideo = originalVideo;
    }

    if (playButton && originalVideo) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (originalVideo.paused) {
                originalVideo.play();
                isPlaying = true;
                activeVideo = originalVideo;
            } else {
                originalVideo.pause();
                isPlaying = false;
            }
        });
    }

    if (videoWrapper && modalOverlay) {
        videoWrapper.addEventListener('click', function(e) {
            if (!playButton.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();

                switchToModalVideo();

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    }

    if (modalVideo) {
        modalVideo.addEventListener('click', function(e) {
            e.stopPropagation();
            if (modalVideo.paused) {
                modalVideo.play();
                isPlaying = true;
            } else {
                modalVideo.pause();
                isPlaying = false;
            }
        });
    }

    if (originalVideo) {
        originalVideo.addEventListener('click', function(e) {
            e.stopPropagation();
            if (originalVideo.paused) {
                originalVideo.play();
                isPlaying = true;
                activeVideo = originalVideo;
            } else {
                originalVideo.pause();
                isPlaying = false;
            }
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
        switchToOriginalVideo();

        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Сбрасываем состояние формы при закрытии модалки
        resetForm();
    }

    const submitButton = document.querySelector('.form-button');
    const emailInput = document.querySelector('.form-input');

    if (submitButton && emailInput) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                console.log('Email submitted:', email);
                // Здесь можно добавить отправку формы
                showSuccessMessage();
                closeModal();
            } else {
                showErrorInPlaceholder();
            }
        });

        // Сбрасываем ошибку при начале ввода
        emailInput.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                resetForm();
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showErrorInPlaceholder() {
        emailInput.value = '';
        emailInput.placeholder = 'Please enter a valid email address';
        emailInput.classList.add('error');
    }

    function showSuccessMessage() {
        // Можно добавить здесь дополнительную логику для успешной отправки
        console.log('Form submitted successfully');
    }

    function resetForm() {
        emailInput.value = '';
        emailInput.placeholder = 'Enter e-mail';
        emailInput.classList.remove('error');
    }

    if (originalVideo) {
        activeVideo = originalVideo;
    }
});