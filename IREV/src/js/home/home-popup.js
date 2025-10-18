document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.querySelector('.home_popup_overlay');
    const closeButton = document.querySelector('.home_popup_content_upper button');
    const form = document.querySelector('.home_popup_content form');
    const openButton = document.querySelector('.home_represent_form_container_button');
    const timerElement = document.querySelector('.home_popup_content_label_wrapper_counter');

    let timerInterval = null;

    function startTimer() {
        if (!timerElement) return;

        let totalSeconds = 15 * 60;

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        timerInterval = setInterval(function() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedTime =
                String(hours).padStart(2, '0') + ':' +
                String(minutes).padStart(2, '0') + ':' +
                String(seconds).padStart(2, '0');

            timerElement.textContent = formattedTime;

            if (--totalSeconds < 0) {
                clearInterval(timerInterval);
                timerElement.textContent = "00:00:00";
                timerComplete();
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }

    function resetTimer() {
        stopTimer();
        if (timerElement) {
            timerElement.textContent = "00:15:00";
        }
    }

    function timerComplete() {
        console.log("Таймер завершен!");
    }

    function openPopup() {
        if (popupOverlay) {
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                popupOverlay.classList.add('active');
                startTimer();
            }, 10);
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');

            setTimeout(() => {
                popupOverlay.style.display = 'none';
                document.body.style.overflow = '';
                stopTimer();
                resetTimer();
            }, 300);
        }
    }

    if (openButton) {
        openButton.addEventListener('click', function(e) {
            e.preventDefault();
            openPopup();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closePopup);
    }

    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(e) {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // video
    const video = document.getElementById('popupVideo');
    const videoContainer = document.querySelector('.home_popup_content_lower_rightcont_video');
    const playButton = videoContainer.querySelector('img'); // находим изображение кнопки play

    function updatePlayButtonVisibility() {
        if (video.paused) {
            playButton.style.display = 'block';
        } else {
            playButton.style.display = 'none';
        }
    }

    video.addEventListener('play', updatePlayButtonVisibility);
    video.addEventListener('pause', updatePlayButtonVisibility);
    video.addEventListener('ended', function() {
        playButton.style.display = 'block';
    });

    videoContainer.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });

    updatePlayButtonVisibility();
});


