document.addEventListener('DOMContentLoaded', function() {
    const videoWrapper = document.querySelector('.home_represent_lowerWrapper_video');
    const modalOverlay = document.getElementById('modalOverlay');
    const originalVideo = videoWrapper ? videoWrapper.querySelector('video') : null;
    const modalVideo = modalOverlay ? modalOverlay.querySelector('video') : null;
    const playButton = videoWrapper ? videoWrapper.querySelector('.video_player button') : null;

    const originalPlayImg = videoWrapper ? videoWrapper.querySelector('.video_cont img') : null;
    const modalPlayImg = modalOverlay ? modalOverlay.querySelector('.modal-video img') : null;

    let currentTime = 0;

    function togglePlayButton(video, playImg) {
        if (!video || !playImg) return;

        if (video.paused) {
            playImg.style.display = 'block';
        } else {
            playImg.style.display = 'none';
        }
    }

    function setupVideoListeners(video, playImg) {
        if (!video || !playImg) return;

        video.addEventListener('play', function() {
            playImg.style.display = 'none';
        });

        video.addEventListener('pause', function() {
            playImg.style.display = 'block';
        });

        video.addEventListener('ended', function() {
            playImg.style.display = 'block';
            video.currentTime = 0;
        });
    }

    if (originalVideo && originalPlayImg) {
        setupVideoListeners(originalVideo, originalPlayImg);
        togglePlayButton(originalVideo, originalPlayImg);
    }

    if (modalVideo && modalPlayImg) {
        setupVideoListeners(modalVideo, modalPlayImg);
        modalPlayImg.style.display = 'none';
    }

    if (playButton && originalVideo) {
        playButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            if (originalVideo.paused) {
                originalVideo.play();
            } else {
                originalVideo.pause();
            }
        });
    }

    function openModalWithVideo() {
        if (!originalVideo || !modalVideo) return;

        currentTime = originalVideo.currentTime;

        originalVideo.pause();
        if (originalPlayImg) {
            originalPlayImg.style.display = 'none';
        }

        modalVideo.currentTime = currentTime;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        modalVideo.play().catch(e => console.log('Modal video play error:', e));

        if (modalPlayImg) {
            modalPlayImg.style.display = 'none';
        }
    }

    function closeModal() {
        if (!originalVideo || !modalVideo) return;

        currentTime = modalVideo.currentTime;

        modalVideo.pause();
        if (modalPlayImg) {
            modalPlayImg.style.display = 'none';
        }

        originalVideo.currentTime = currentTime;

        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';

        if (originalPlayImg) {
            originalPlayImg.style.display = 'block';
        }

        resetForm();
    }

    if (videoWrapper && modalOverlay) {
        videoWrapper.addEventListener('click', function(e) {
            // Проверяем, что клик не по кнопке управления в video_player
            if (!playButton || !playButton.contains(e.target)) {
                e.preventDefault();
                e.stopPropagation();
                openModalWithVideo();
            }
        });
    }

    if (originalPlayImg) {
        originalPlayImg.addEventListener('click', function(e) {
            e.stopPropagation();
            openModalWithVideo();
        });
    }

    if (modalVideo) {
        modalVideo.addEventListener('click', function(e) {
            e.stopPropagation();
            if (modalVideo.paused) {
                modalVideo.play();
            } else {
                modalVideo.pause();
            }
        });
    }

    if (modalPlayImg) {
        modalPlayImg.addEventListener('click', function(e) {
            e.stopPropagation();
            modalVideo.play();
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

    const submitButton = document.querySelector('.form-button');
    const emailInput = document.querySelector('.form-input');

    if (submitButton && emailInput) {
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();

            if (validateEmail(email)) {
                console.log('Email submitted:', email);
                closeModal();
            } else {
                showErrorInPlaceholder();
            }
        });

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
        if (emailInput) {
            emailInput.value = '';
            emailInput.placeholder = 'Please enter a valid email address';
            emailInput.classList.add('error');
        }
    }

    function resetForm() {
        if (emailInput) {
            emailInput.value = '';
            emailInput.placeholder = 'Enter e-mail';
            emailInput.classList.remove('error');
        }
    }
});



