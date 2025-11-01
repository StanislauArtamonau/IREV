document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.querySelector('.home_popup_overlay');
    const closeButton = document.querySelector('.home_popup_content_upper button');
    const form = document.querySelector('.home_popup_content form');
    const openButtons = document.querySelectorAll('.home_represent_form_container_button, .open_modal');
    const timerElement = document.querySelector('.home_popup_content_label_wrapper_counter');

    let timerInterval = null;
    let totalSeconds = 15 * 60; // 15 минут
    let isTimerRunning = false;

    function startTimer() {
        if (!timerElement) return;

        if (isTimerRunning) return;

        isTimerRunning = true;

        totalSeconds = 15 * 60;

        if (timerInterval) {
            clearInterval(timerInterval);
        }

        updateTimerDisplay();

        timerInterval = setInterval(function() {
            if (totalSeconds > 0) {
                totalSeconds--;
                if (popupOverlay && popupOverlay.style.display === 'block') {
                    updateTimerDisplay();
                }
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                isTimerRunning = false;
                timerComplete();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedTime =
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0');

        timerElement.textContent = formattedTime;
    }

    function stopTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            isTimerRunning = false;
        }
    }

    function timerComplete() {
        console.log("Таймер завершен!");
        if (popupOverlay && popupOverlay.style.display === 'block') {
            closePopup();
        }
    }

    function openPopup() {
        if (popupOverlay) {
            popupOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';

            setTimeout(() => {
                popupOverlay.classList.add('active');
                if (!isTimerRunning) {
                    startTimer();
                } else {
                    updateTimerDisplay();
                }
            }, 10);
        }
    }

    function closePopup() {
        if (popupOverlay) {
            popupOverlay.classList.remove('active');

            setTimeout(() => {
                popupOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    if (openButtons) {
        openButtons.forEach(openButton => {
            openButton.addEventListener('click', function(e) {
                e.preventDefault();
                openPopup();
            });
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

    const video = document.getElementById('popupVideo');
    const videoContainer = document.querySelector('.home_popup_content_lower_rightcont_video');
    const playButton = videoContainer.querySelector('img');

    function updatePlayButtonVisibility() {
        if (video.paused) {
            playButton.style.display = 'block';
        } else {
            playButton.style.display = 'none';
        }
    }

    if (video && videoContainer && playButton) {
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
    }
});