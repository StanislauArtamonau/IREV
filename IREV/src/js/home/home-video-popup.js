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

    
    const submitButton = document.querySelector('#submitButton');
    const emailInput = document.querySelector('input[type="email"]');
    const form = document.querySelector('.wpcf7-form');
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    function updateButtonState() {
        const submitButton = document.querySelector('.wpcf7-submit');
        if (submitButton) {
            if (checkboxes[0].checked && checkboxes[1].checked) {
                submitButton.disabled = false;
                submitButton.classList.add('selected');
            } else {
                submitButton.disabled = true;
                submitButton.classList.remove('selected');
            }
        }
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateButtonState);

        const customCheckbox = checkbox.closest('.checkbox');
        if (customCheckbox) {
            customCheckbox.addEventListener('click', function(e) {
                if (e.target !== checkbox) {
                    checkbox.checked = !checkbox.checked;
                    checkbox.dispatchEvent(new Event('change'));
                }
            });
        }
    });

    updateButtonState();

    if (submitButton && emailInput && form) {
        form.addEventListener('submit', function(e) {
            const email = emailInput.value.trim();

            if (!validateEmail(email)) {
                e.preventDefault();
                emailInput.classList.add('wpcf7-not-valid');
                emailInput.value = '';
                emailInput.placeholder = 'Please enter a valid email address';
            }
        });

        emailInput.addEventListener('input', function() {
            if (this.classList.contains('wpcf7-not-valid')) {
                this.classList.remove('wpcf7-not-valid');
                this.placeholder = 'E-mail';
            }
        });
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    updateButtonState();

    
});



