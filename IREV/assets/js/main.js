/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./IREV/src/js/header.js":
/*!*******************************!*\
  !*** ./IREV/src/js/header.js ***!
  \*******************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var menuItems = document.querySelectorAll('.header_menu_item');
  var dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
  var dropdownContainer = document.querySelector('.nav_dropdown_container');
  var dropdownContents = document.querySelectorAll('[data-dropdown-content]');
  var closeTimeout;
  var leaveTimeout;
  var activeTrigger = null;
  menuItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      clearTimeout(closeTimeout);
      clearTimeout(leaveTimeout);
      menuItems.forEach(function (i) {
        return i !== item && i.classList.remove('active');
      });
      item.classList.add('active');
    });
    item.addEventListener('mouseleave', function () {
      leaveTimeout = setTimeout(function () {
        if (!isMouseOverDropdown()) {
          item.classList.remove('active');
          activeTrigger = null;
          closeAllDropdowns();
        }
      }, 100);
    });
  });
  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('mouseenter', function () {
      var _this = this;
      clearTimeout(closeTimeout);
      menuItems.forEach(function (i) {
        return i !== _this && i.classList.remove('active');
      });
      this.classList.add('active');
      activeTrigger = this;
      var dropdownType = this.dataset.dropdownTrigger;
      openDropdown(dropdownType);
    });
    trigger.addEventListener('mouseleave', function () {
      closeTimeout = setTimeout(function () {
        if (!isMouseOverDropdown()) closeAllDropdowns();
      }, 100);
    });
  });
  if (dropdownContainer) {
    dropdownContainer.addEventListener('mouseenter', function () {
      return clearTimeout(closeTimeout);
    });
    dropdownContainer.addEventListener('mouseleave', function () {
      closeTimeout = setTimeout(closeAllDropdowns, 100);
    });
  }
  function openDropdown(type) {
    closeAllDropdowns(false);
    dropdownContainer.classList.add('active');
    var targetContent = document.querySelector("[data-dropdown-content=\"".concat(type, "\"]"));
    if (targetContent) targetContent.style.display = 'flex';
  }
  function closeAllDropdowns() {
    var clearActive = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    dropdownContainer.classList.remove('active');
    dropdownContents.forEach(function (content) {
      return content.style.display = 'none';
    });
    if (clearActive) {
      menuItems.forEach(function (i) {
        return i.classList.remove('active');
      });
      dropdownTriggers.forEach(function (t) {
        return t.classList.remove('active');
      });
      activeTrigger = null;
    }
  }
  function isMouseOverDropdown() {
    return dropdownContainer.matches(':hover') || activeTrigger && activeTrigger.matches(':hover');
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns();
  });
});

/***/ }),

/***/ "./IREV/src/js/home/home-gear1.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear1.js ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./IREV/src/js/home/home-gear2.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear2.js ***!
  \****************************************/
/***/ (() => {

var container = document.querySelector('.home_gear2_lower_container');
var nitroImg = document.querySelector('.nitro-effect img');
var revText = document.querySelector('.home_gear2_lower_container_rev');
function updateScrollAnimation() {
  var partnerSection = document.querySelector('.home');
  if (!partnerSection) {
    return;
  }
  var rect = container.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  var progress = 1 - rect.top / windowHeight;
  progress = Math.min(Math.max(progress, 0), 1);
  var shift = Math.min(1220 - revText.offsetWidth, window.innerWidth - revText.offsetWidth - 60);
  revText.style.transform = "translateX(".concat(progress * shift, "px)");
  nitroImg.style.transform = "scaleX(".concat(progress, ")");
}
function onScroll() {
  var partnerSection = document.querySelector('.home');
  if (!partnerSection) {
    return;
  }
  requestAnimationFrame(updateScrollAnimation);
}
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updateScrollAnimation);
updateScrollAnimation();

/***/ }),

/***/ "./IREV/src/js/home/home-gear3.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear3.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener("DOMContentLoaded", function () {
  var avatarButtons = document.querySelectorAll(".avatar-item button");
  var reviewsContainer = document.querySelector(".home_gear3_reviews");
  var reviews = document.querySelectorAll(".home_gear3_reviews_review");
  function centerReview(targetClient) {
    var activeReview = document.querySelector(".home_gear3_reviews_review[data-client=\"".concat(targetClient, "\"]"));
    if (!activeReview) return;
    var containerWidth = reviewsContainer.offsetWidth;
    var reviewWidth = activeReview.offsetWidth;
    var gap = 40;
    var reviewIndex = Array.from(reviews).indexOf(activeReview);
    var totalItemsWidth = reviewIndex * (reviewWidth + gap);
    var offset = containerWidth / 2 - reviewWidth / 2 - totalItemsWidth;
    reviewsContainer.style.transition = "transform 0.6s ease";
    reviewsContainer.style.transform = "translateX(".concat(offset, "px)");
  }
  function switchReview(target) {
    document.querySelectorAll(".avatar-item").forEach(function (a) {
      return a.classList.remove("selected");
    });
    reviews.forEach(function (r) {
      return r.classList.remove("selected");
    });
    var selectedAvatar = document.querySelector(".avatar-item button[data-trigger=\"".concat(target, "\"]")).closest(".avatar-item");
    var activeReview = document.querySelector(".home_gear3_reviews_review[data-client=\"".concat(target, "\"]"));
    if (selectedAvatar && activeReview) {
      selectedAvatar.classList.add("selected");
      activeReview.classList.add("selected");
      centerReview(target);
    }
  }
  avatarButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var target = button.getAttribute("data-trigger");
      switchReview(target);
    });
  });
  function initCenterReview() {
    setTimeout(function () {
      var initialSelected = document.querySelector('.avatar-item.selected button');
      if (initialSelected) {
        var initialTarget = initialSelected.getAttribute("data-trigger");
        centerReview(initialTarget);
      }
    }, 100);
  }
  initCenterReview();
  window.addEventListener('resize', function () {
    var currentSelected = document.querySelector('.avatar-item.selected button');
    if (currentSelected) {
      var currentTarget = currentSelected.getAttribute("data-trigger");
      setTimeout(function () {
        return centerReview(currentTarget);
      }, 50);
    }
  });
});

// cases
document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.home_gear3_lower_container');
  var cases = document.querySelectorAll('.home_gear3_lower_container .case');
  var config = {
    triggerOffset: 0.3,
    stepDelay: 0.15,
    animationDistance: 30
  };
  function handleScrollAnimation() {
    if (!container) return;
    var containerRect = container.getBoundingClientRect();
    var containerTop = containerRect.top;
    var containerHeight = containerRect.height;
    var windowHeight = window.innerHeight;
    var containerBottom = containerTop + containerHeight;
    var triggerPoint = windowHeight * config.triggerOffset;
    if (containerTop < windowHeight - triggerPoint && containerBottom > triggerPoint) {
      var visibleHeight = Math.min(containerBottom, windowHeight) - Math.max(containerTop, 0);
      var maxScrollable = containerHeight - windowHeight + windowHeight * config.triggerOffset;
      var scrolled = -containerTop + windowHeight * config.triggerOffset;
      var scrollProgress = Math.max(0, Math.min(1, scrolled / maxScrollable));
      cases.forEach(function (caseEl, index) {
        var threshold = index * config.stepDelay;
        if (scrollProgress >= threshold) {
          caseEl.classList.add('case-visible');
          caseEl.classList.remove('case-hidden');
        } else {
          caseEl.classList.add('case-hidden');
          caseEl.classList.remove('case-visible');
        }
      });
    } else {
      cases.forEach(function (caseEl) {
        caseEl.classList.add('case-hidden');
        caseEl.classList.remove('case-visible');
      });
    }
  }
  var ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(function () {
        handleScrollAnimation();
        ticking = false;
      });
      ticking = true;
    }
  }
  handleScrollAnimation();
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
});

/***/ }),

/***/ "./IREV/src/js/home/home-gear5.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear5.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var accordionItems = document.querySelectorAll('.accordion_item');
  accordionItems.forEach(function (item) {
    var button = item.querySelector('button');
    if (button) {
      button.addEventListener('click', function () {
        if (item.classList.contains('opened')) {
          item.classList.remove('opened');
        } else {
          accordionItems.forEach(function (otherItem) {
            otherItem.classList.remove('opened');
          });
          item.classList.add('opened');
        }
      });
    }
  });
});

/***/ }),

/***/ "./IREV/src/js/home/home-popup.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-popup.js ***!
  \****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var popupOverlay = document.querySelector('.home_popup_overlay');
  var closeButton = document.querySelector('.home_popup_content_upper button');
  var form = document.querySelector('.home_popup_content form');
  var openButtons = document.querySelectorAll('.home_represent_form_container_button, .open_modal');
  var timerElement = document.querySelector('.home_popup_content_label_wrapper_counter');
  var timerInterval = null;
  function startTimer() {
    if (!timerElement) return;
    var totalSeconds = 15 * 60;
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
      var hours = Math.floor(totalSeconds / 3600);
      var minutes = Math.floor(totalSeconds % 3600 / 60);
      var seconds = totalSeconds % 60;
      var formattedTime = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
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
      setTimeout(function () {
        popupOverlay.classList.add('active');
        startTimer();
      }, 10);
    }
  }
  function closePopup() {
    if (popupOverlay) {
      popupOverlay.classList.remove('active');
      setTimeout(function () {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
        stopTimer();
        resetTimer();
      }, 300);
    }
  }
  if (openButtons) {
    openButtons.forEach(function (openButton) {
      openButton.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup();
      });
    });
  }
  if (closeButton) {
    closeButton.addEventListener('click', closePopup);
  }
  if (popupOverlay) {
    popupOverlay.addEventListener('click', function (e) {
      if (e.target === popupOverlay) {
        closePopup();
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closePopup();
    }
  });

  // video
  var video = document.getElementById('popupVideo');
  var videoContainer = document.querySelector('.home_popup_content_lower_rightcont_video');
  var playButton = videoContainer.querySelector('img'); // находим изображение кнопки play

  function updatePlayButtonVisibility() {
    if (video.paused) {
      playButton.style.display = 'block';
    } else {
      playButton.style.display = 'none';
    }
  }
  video.addEventListener('play', updatePlayButtonVisibility);
  video.addEventListener('pause', updatePlayButtonVisibility);
  video.addEventListener('ended', function () {
    playButton.style.display = 'block';
  });
  videoContainer.addEventListener('click', function () {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });
  updatePlayButtonVisibility();
});

/***/ }),

/***/ "./IREV/src/js/home/home-represent.js":
/*!********************************************!*\
  !*** ./IREV/src/js/home/home-represent.js ***!
  \********************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var testDriveButton = document.querySelector('.home_represent_form_container_button');
  var input = document.querySelector('.home_represent_form_container_input');
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
document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.home');
  if (!partnerSection) {
    return;
  }
  var counterElement = document.querySelector('.home_represent_counter span');
  var counterDiv = document.querySelector('.home_represent_counter');
  var signInButton = document.querySelector('.header_signIn');
  var input = document.querySelector('.home_represent_form_container_input');
  var elements = [counterDiv, signInButton, input];
  var totalSeconds = 3 * 100;
  function updateTimer() {
    totalSeconds--;
    if (totalSeconds < 0) {
      elements.forEach(function (element) {
        return element.classList.remove('one', 'two');
      });
      elements.forEach(function (element) {
        return element.classList.add('go');
      });
      counterElement.textContent = '00:00,00';
      return;
    }
    var seconds = Math.floor(totalSeconds / 100);
    var hundredths = totalSeconds % 100;
    var formattedSeconds = seconds.toString().padStart(2, '0');
    var formattedHundredths = hundredths.toString().padStart(2, '0');
    counterElement.textContent = "00:".concat(formattedSeconds, ",").concat(formattedHundredths);
    switch (totalSeconds) {
      case 200:
        {
          elements.forEach(function (element) {
            return element.classList.add('two');
          });
          break;
        }
      case 100:
        {
          elements.forEach(function (element) {
            return element.classList.remove('two');
          });
          elements.forEach(function (element) {
            return element.classList.add('one');
          });
          break;
        }
    }
    setTimeout(updateTimer, 10);
  }
  setTimeout(updateTimer, 10);
});
document.addEventListener('DOMContentLoaded', function () {
  // email save

  var mainEmailInput = document.querySelector('.home_represent_form_container_input');
  var popupEmailInput = document.querySelector('.home_popup_content_form_inputs input[type="email"]');
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
});

// paralax
document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.home');
  if (!partnerSection) {
    return;
  }
  var parallaxImg = document.querySelector('.home_represent_backgroundImg');
  if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var updateParallax = function updateParallax() {
      var scrolled = window.pageYOffset;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      document.documentElement.style.setProperty('--parallax-offset', offset);
    };
    parallaxImg.classList.add('parallax');
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          updateParallax();
          ticking = false;
        });
        ticking = true;
      }
    });
    updateParallax();
  }
});

/***/ }),

/***/ "./IREV/src/js/home/home-video-popup.js":
/*!**********************************************!*\
  !*** ./IREV/src/js/home/home-video-popup.js ***!
  \**********************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var videoWrapper = document.querySelector('.home_represent_lowerWrapper_video');
  var modalOverlay = document.getElementById('modalOverlay');
  var originalVideo = videoWrapper ? videoWrapper.querySelector('video') : null;
  var modalVideo = modalOverlay ? modalOverlay.querySelector('video') : null;
  var playButton = videoWrapper ? videoWrapper.querySelector('.video_player button') : null;
  var originalPlayImg = videoWrapper ? videoWrapper.querySelector('.video_cont img') : null;
  var modalPlayImg = modalOverlay ? modalOverlay.querySelector('.modal-video img') : null;
  var currentTime = 0;
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
    video.addEventListener('play', function () {
      playImg.style.display = 'none';
    });
    video.addEventListener('pause', function () {
      playImg.style.display = 'block';
    });
    video.addEventListener('ended', function () {
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
    playButton.addEventListener('click', function (e) {
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
    modalVideo.play()["catch"](function (e) {
      return console.log('Modal video play error:', e);
    });
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
    videoWrapper.addEventListener('click', function (e) {
      // Проверяем, что клик не по кнопке управления в video_player
      if (!playButton || !playButton.contains(e.target)) {
        e.preventDefault();
        e.stopPropagation();
        openModalWithVideo();
      }
    });
  }
  if (originalPlayImg) {
    originalPlayImg.addEventListener('click', function (e) {
      e.stopPropagation();
      openModalWithVideo();
    });
  }
  if (modalVideo) {
    modalVideo.addEventListener('click', function (e) {
      e.stopPropagation();
      if (modalVideo.paused) {
        modalVideo.play();
      } else {
        modalVideo.pause();
      }
    });
  }
  if (modalPlayImg) {
    modalPlayImg.addEventListener('click', function (e) {
      e.stopPropagation();
      modalVideo.play();
    });
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
  var submitButton = document.querySelector('#submitButton');
  var emailInput = document.querySelector('input[type="email"]');
  var form = document.querySelector('.wpcf7-form');
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  function updateButtonState() {
    var submitButton = document.querySelector('.wpcf7-submit');
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
  checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', updateButtonState);
    var customCheckbox = checkbox.closest('.checkbox');
    if (customCheckbox) {
      customCheckbox.addEventListener('click', function (e) {
        if (e.target !== checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change'));
        }
      });
    }
  });
  updateButtonState();
  if (submitButton && emailInput && form) {
    form.addEventListener('submit', function (e) {
      var email = emailInput.value.trim();
      if (!validateEmail(email)) {
        e.preventDefault();
        emailInput.classList.add('wpcf7-not-valid');
        emailInput.value = '';
        emailInput.placeholder = 'Please enter a valid email address';
      }
    });
    emailInput.addEventListener('input', function () {
      if (this.classList.contains('wpcf7-not-valid')) {
        this.classList.remove('wpcf7-not-valid');
        this.placeholder = 'E-mail';
      }
    });
  }
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  updateButtonState();
});

/***/ }),

/***/ "./IREV/src/js/lead-distribution/ld-component2.js":
/*!********************************************************!*\
  !*** ./IREV/src/js/lead-distribution/ld-component2.js ***!
  \********************************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var carSection = document.querySelector('.lead_distribution_c2');
  var carItems = document.querySelectorAll('.ld_c2_container_item');
  var animatedCar = document.querySelector('.animated-car');
  if (!carSection || !animatedCar) return;

  // Позиции блоков относительно секции
  var itemPositions = [];
  function calculatePositions() {
    var sectionRect = carSection.getBoundingClientRect();
    itemPositions.length = 0;
    carItems.forEach(function (item, index) {
      var itemRect = item.getBoundingClientRect();
      // Позиция относительно начала секции
      var positionFromTop = itemRect.top - sectionRect.top;
      // Нормализуем позицию (0-100%)
      var normalizedPosition = positionFromTop / sectionRect.height * 100;
      itemPositions.push(normalizedPosition);
    });
  }

  // Функция для проверки видимости элемента
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
  }

  // Функция для отслеживания прогресса анимации
  function trackAnimationProgress() {
    var carRect = animatedCar.getBoundingClientRect();
    var sectionRect = carSection.getBoundingClientRect();

    // Позиция машины относительно секции (0-100%)
    var carProgress = (carRect.top - sectionRect.top) / sectionRect.height * 100;

    // Показываем блоки когда машина достигает их позиции
    carItems.forEach(function (item, index) {
      var itemPosition = itemPositions[index];
      if (carProgress >= itemPosition - 5 && !item.classList.contains('revealed')) {
        item.classList.add('revealed');
      }
    });
  }

  // Функция для активации анимации
  function activateCarAnimation() {
    if (isElementInViewport(carSection)) {
      // Пересчитываем позиции
      calculatePositions();

      // Запускаем анимацию машины
      animatedCar.style.animationPlayState = 'running';

      // Отслеживаем прогресс анимации
      var animationInterval = setInterval(trackAnimationProgress, 100);

      // Останавливаем отслеживание после завершения анимации
      setTimeout(function () {
        clearInterval(animationInterval);
        // Гарантируем, что все блоки показаны
        carItems.forEach(function (item) {
          return item.classList.add('revealed');
        });
      }, 10500); // Чуть больше длительности анимации

      // Убираем обработчик после активации
      window.removeEventListener('scroll', activateCarAnimation);
    }
  }

  // Инициализация - приостанавливаем анимацию до скролла
  animatedCar.style.animationPlayState = 'paused';

  // Пересчитываем позиции при ресайзе
  window.addEventListener('resize', calculatePositions);

  // Активируем при скролле
  window.addEventListener('scroll', activateCarAnimation);

  // Также активируем при загрузке, если элемент уже в viewport
  setTimeout(function () {
    calculatePositions();
    activateCarAnimation();
  }, 100);
});

/***/ }),

/***/ "./IREV/src/js/partner-platform/pp_c6.js":
/*!***********************************************!*\
  !*** ./IREV/src/js/partner-platform/pp_c6.js ***!
  \***********************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.pp');
  if (!partnerSection) {
    return;
  }
  var conversionsInput = document.getElementById('conversions');
  var clicksInput = document.getElementById('clicks');
  var fundsInput = document.getElementById('funds');
  var resultDiv = document.getElementById('result');
  function calculatePercentage() {
    // Получаем значения
    var conversions = parseInt(conversionsInput.value) || 0;
    var clicks = parseInt(clicksInput.value) || 0;
    var funds = parseInt(fundsInput.value) || 7000;
    var conversionsOverflow = Math.max(0, conversions - 100000);
    var conversionsY = conversionsOverflow / 1000;
    var clicksOverflow = Math.max(0, clicks - 1000000);
    var clicksY = clicksOverflow / 1000;
    var Y = conversionsY + clicksY;
    var percentage = (1000 + 4 * Y) / funds;
    var finalPercentage = Math.min(percentage * 100, 14);
    resultDiv.textContent = finalPercentage.toFixed(2) + '%';
  }
  conversionsInput.addEventListener('input', calculatePercentage);
  clicksInput.addEventListener('input', calculatePercentage);
  fundsInput.addEventListener('input', calculatePercentage);
  calculatePercentage();
});

/***/ }),

/***/ "./IREV/src/scss/index.scss":
/*!**********************************!*\
  !*** ./IREV/src/scss/index.scss ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./IREV/src/js/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/index.scss */ "./IREV/src/scss/index.scss");

__webpack_require__(/*! ./header.js */ "./IREV/src/js/header.js");
__webpack_require__(/*! ./home/home-represent.js */ "./IREV/src/js/home/home-represent.js");
__webpack_require__(/*! ./home/home-popup.js */ "./IREV/src/js/home/home-popup.js");
__webpack_require__(/*! ./home/home-video-popup.js */ "./IREV/src/js/home/home-video-popup.js");
__webpack_require__(/*! ./home/home-gear1.js */ "./IREV/src/js/home/home-gear1.js");
__webpack_require__(/*! ./home/home-gear2.js */ "./IREV/src/js/home/home-gear2.js");
__webpack_require__(/*! ./home/home-gear3.js */ "./IREV/src/js/home/home-gear3.js");
__webpack_require__(/*! ./home/home-gear5.js */ "./IREV/src/js/home/home-gear5.js");
__webpack_require__(/*! ./partner-platform/pp_c6.js */ "./IREV/src/js/partner-platform/pp_c6.js");
__webpack_require__(/*! ./lead-distribution/ld-component2 */ "./IREV/src/js/lead-distribution/ld-component2.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHO0VBQzVEO0VBRUFoQixnQkFBZ0IsQ0FBQ2xPLGdCQUFnQixDQUFDLE9BQU8sRUFBRXNPLG1CQUFtQixDQUFDO0VBQy9ESCxXQUFXLENBQUNuTyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVzTyxtQkFBbUIsQ0FBQztFQUMxREYsVUFBVSxDQUFDcE8sZ0JBQWdCLENBQUMsT0FBTyxFQUFFc08sbUJBQW1CLENBQUM7RUFFekRBLG1CQUFtQixDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ3ZDRjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQzNCYSxtQkFBTyxDQUFDLDRDQUFhLENBQUM7QUFDdEJBLG1CQUFPLENBQUMsc0VBQTBCLENBQUM7QUFDbkNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsMEVBQTRCLENBQUM7QUFDckNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsNEVBQTZCLENBQUM7QUFDdENBLG1CQUFPLENBQUMsMkZBQW1DLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIzLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjUuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9sZWFkLWRpc3RyaWJ1dGlvbi9sZC1jb21wb25lbnQyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwX2M2LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9zY3NzL2luZGV4LnNjc3M/NzI0YSIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcicpO1xyXG5jb25zdCBuaXRyb0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaXRyby1lZmZlY3QgaW1nJyk7XHJcbmNvbnN0IHJldlRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXJfcmV2Jyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxBbmltYXRpb24oKSB7XHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gcmVjdC50b3AgLyB3aW5kb3dIZWlnaHQ7XHJcbiAgICBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHByb2dyZXNzLCAwKSwgMSk7XHJcblxyXG4gICAgY29uc3Qgc2hpZnQgPSBNYXRoLm1pbihcclxuICAgICAgICAxMjIwIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCxcclxuICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIHJldlRleHQub2Zmc2V0V2lkdGggLSA2MFxyXG4gICAgKTtcclxuXHJcbiAgICByZXZUZXh0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7cHJvZ3Jlc3MgKiBzaGlmdH1weClgO1xyXG5cclxuICAgIG5pdHJvSW1nLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHtwcm9ncmVzc30pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxuXHJcbnVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBhdmF0YXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbSBidXR0b25cIik7XHJcbiAgICBjb25zdCByZXZpZXdzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX2dlYXIzX3Jldmlld3NcIik7XHJcbiAgICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3XCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlclJldmlldyh0YXJnZXRDbGllbnQpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0Q2xpZW50fVwiXWApO1xyXG4gICAgICAgIGlmICghYWN0aXZlUmV2aWV3KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gcmV2aWV3c0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCByZXZpZXdXaWR0aCA9IGFjdGl2ZVJldmlldy5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCBnYXAgPSA0MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3SW5kZXggPSBBcnJheS5mcm9tKHJldmlld3MpLmluZGV4T2YoYWN0aXZlUmV2aWV3KTtcclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gcmV2aWV3SW5kZXggKiAocmV2aWV3V2lkdGggKyBnYXApO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IChjb250YWluZXJXaWR0aCAvIDIpIC0gKHJldmlld1dpZHRoIC8gMikgLSB0b3RhbEl0ZW1zV2lkdGg7XHJcblxyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuNnMgZWFzZVwiO1xyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hSZXZpZXcodGFyZ2V0KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbVwiKS5mb3JFYWNoKGEgPT4gYS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaChyID0+IHIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYXZhdGFyLWl0ZW0gYnV0dG9uW2RhdGEtdHJpZ2dlcj1cIiR7dGFyZ2V0fVwiXWApLmNsb3Nlc3QoXCIuYXZhdGFyLWl0ZW1cIik7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldH1cIl1gKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQXZhdGFyICYmIGFjdGl2ZVJldmlldykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEF2YXRhci5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGFjdGl2ZVJldmlldy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGNlbnRlclJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc3dpdGNoUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0Q2VudGVyUmV2aWV3KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWFsU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxUYXJnZXQgPSBpbml0aWFsU2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgY2VudGVyUmV2aWV3KGluaXRpYWxUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2VudGVyUmV2aWV3KCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gY3VycmVudFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjZW50ZXJSZXZpZXcoY3VycmVudFRhcmdldCksIDUwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBjYXNlc1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyIC5jYXNlJyk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIHRyaWdnZXJPZmZzZXQ6IDAuMyxcclxuICAgICAgICBzdGVwRGVsYXk6IDAuMTUsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlzdGFuY2U6IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm90dG9tID0gY29udGFpbmVyVG9wICsgY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHRyaWdnZXJQb2ludCA9IHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0O1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyVG9wIDwgd2luZG93SGVpZ2h0IC0gdHJpZ2dlclBvaW50ICYmIGNvbnRhaW5lckJvdHRvbSA+IHRyaWdnZXJQb2ludCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlSGVpZ2h0ID0gTWF0aC5taW4oY29udGFpbmVyQm90dG9tLCB3aW5kb3dIZWlnaHQpIC0gTWF0aC5tYXgoY29udGFpbmVyVG9wLCAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsYWJsZSA9IGNvbnRhaW5lckhlaWdodCAtIHdpbmRvd0hlaWdodCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLWNvbnRhaW5lclRvcCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgc2Nyb2xsZWQgLyBtYXhTY3JvbGxhYmxlKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKChjYXNlRWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBpbmRleCAqIGNvbmZpZy5zdGVwRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFByb2dyZXNzID49IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKGNhc2VFbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjY29yZGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9pdGVtJyk7XHJcblxyXG4gICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKG90aGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBvcHVwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF91cHBlciBidXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50IGZvcm0nKTtcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbiwgLm9wZW5fbW9kYWwnKTtcclxuICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbGFiZWxfd3JhcHBlcl9jb3VudGVyJyk7XHJcblxyXG4gICAgbGV0IHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7XHJcblxyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRvdGFsU2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID1cclxuICAgICAgICAgICAgICAgIFN0cmluZyhob3VycykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFRpbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoLS10b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDowMDowMFwiO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xyXG4gICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDoxNTowMFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lckNvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KLQsNC50LzQtdGAINC30LDQstC10YDRiNC10L0hXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wZW5CdXR0b25zKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChvcGVuQnV0dG9uPT57XHJcbiAgICAgICAgICAgIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHZpZGVvXHJcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFZpZGVvJyk7XHJcbiAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbG93ZXJfcmlnaHRjb250X3ZpZGVvJyk7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9Db250YWluZXIucXVlcnlTZWxlY3RvcignaW1nJyk7IC8vINC90LDRhdC+0LTQuNC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0LrQvdC+0L/QutC4IHBsYXlcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWRlb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyIHNwYW4nKTtcclxuICAgIGNvbnN0IGNvdW50ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlcicpO1xyXG4gICAgY29uc3Qgc2lnbkluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9zaWduSW4nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbY291bnRlckRpdiwgc2lnbkluQnV0dG9uLCBpbnB1dF07XHJcblxyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDMgKiAxMDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIoKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvbmUnLCAndHdvJykpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ28nKSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gJzAwOjAwLDAwJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMTAwKTtcclxuICAgICAgICBjb25zdCBodW5kcmVkdGhzID0gdG90YWxTZWNvbmRzICUgMTAwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHVuZHJlZHRocyA9IGh1bmRyZWR0aHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAwMDoke2Zvcm1hdHRlZFNlY29uZHN9LCR7Zm9ybWF0dGVkSHVuZHJlZHRoc31gO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRvdGFsU2Vjb25kcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMjAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb25lJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+IHtcclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG4gICAgY29uc3QgcG9wdXBFbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9mb3JtX2lucHV0cyBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuXHJcbiAgICBpZiAobWFpbkVtYWlsSW5wdXQgJiYgcG9wdXBFbWFpbElucHV0KSB7XHJcbiAgICAgICAgbWFpbkVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWFpbkVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWFpbkVtYWlsSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gbWFpbkVtYWlsSW5wdXQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrYm94IHNhdmVcclxuXHJcbn0pO1xyXG5cclxuLy8gcGFyYWxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXRCdXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctZm9ybScpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmNy1zdWJtaXQnKTtcclxuICAgICAgICBpZiAoc3VibWl0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveGVzWzBdLmNoZWNrZWQgJiYgY2hlY2tib3hlc1sxXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlQnV0dG9uU3RhdGUpO1xyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IGNoZWNrYm94LmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21DaGVja2JveCkge1xyXG4gICAgICAgICAgICBjdXN0b21DaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gY2hlY2tib3gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICBpZiAoc3VibWl0QnV0dG9uICYmIGVtYWlsSW5wdXQgJiYgZm9ybSkge1xyXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QuYWRkKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3dwY2Y3LW5vdC12YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3dwY2Y3LW5vdC12YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdFLW1haWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICAgICAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG5cclxuICAgIFxyXG59KTtcclxuXHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY2FyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9jMicpO1xyXG4gICAgY29uc3QgY2FySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGRfYzJfY29udGFpbmVyX2l0ZW0nKTtcclxuICAgIGNvbnN0IGFuaW1hdGVkQ2FyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGVkLWNhcicpO1xyXG5cclxuICAgIGlmICghY2FyU2VjdGlvbiB8fCAhYW5pbWF0ZWRDYXIpIHJldHVybjtcclxuXHJcbiAgICAvLyDQn9C+0LfQuNGG0LjQuCDQsdC70L7QutC+0LIg0L7RgtC90L7RgdC40YLQtdC70YzQvdC+INGB0LXQutGG0LjQuFxyXG4gICAgY29uc3QgaXRlbVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaXRlbVBvc2l0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINC+0YLQvdC+0YHQuNGC0LXQu9GM0L3QviDQvdCw0YfQsNC70LAg0YHQtdC60YbQuNC4XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRnJvbVRvcCA9IGl0ZW1SZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcDtcclxuICAgICAgICAgICAgLy8g0J3QvtGA0LzQsNC70LjQt9GD0LXQvCDQv9C+0LfQuNGG0LjRjiAoMC0xMDAlKVxyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkUG9zaXRpb24gPSAocG9zaXRpb25Gcm9tVG9wIC8gc2VjdGlvblJlY3QuaGVpZ2h0KSAqIDEwMDtcclxuICAgICAgICAgICAgaXRlbVBvc2l0aW9ucy5wdXNoKG5vcm1hbGl6ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g0KTRg9C90LrRhtC40Y8g0LTQu9GPINC/0YDQvtCy0LXRgNC60Lgg0LLQuNC00LjQvNC+0YHRgtC4INGN0LvQtdC80LXQvdGC0LBcclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDAuOCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA+PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0L7RgtGB0LvQtdC20LjQstCw0L3QuNGPINC/0YDQvtCz0YDQtdGB0YHQsCDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICBmdW5jdGlvbiB0cmFja0FuaW1hdGlvblByb2dyZXNzKCkge1xyXG4gICAgICAgIGNvbnN0IGNhclJlY3QgPSBhbmltYXRlZENhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIC8vINCf0L7Qt9C40YbQuNGPINC80LDRiNC40L3RiyDQvtGC0L3QvtGB0LjRgtC10LvRjNC90L4g0YHQtdC60YbQuNC4ICgwLTEwMCUpXHJcbiAgICAgICAgY29uc3QgY2FyUHJvZ3Jlc3MgPSAoKGNhclJlY3QudG9wIC0gc2VjdGlvblJlY3QudG9wKSAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0LfRi9Cy0LDQtdC8INCx0LvQvtC60Lgg0LrQvtCz0LTQsCDQvNCw0YjQuNC90LAg0LTQvtGB0YLQuNCz0LDQtdGCINC40YUg0L/QvtC30LjRhtC40LhcclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zaXRpb24gPSBpdGVtUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNhclByb2dyZXNzID49IGl0ZW1Qb3NpdGlvbiAtIDUgJiYgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDQpNGD0L3QutGG0LjRjyDQtNC70Y8g0LDQutGC0LjQstCw0YbQuNC4INCw0L3QuNC80LDRhtC40LhcclxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmIChpc0VsZW1lbnRJblZpZXdwb3J0KGNhclNlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIC8vINCf0LXRgNC10YHRh9C40YLRi9Cy0LDQtdC8INC/0L7Qt9C40YbQuNC4XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgLy8g0JfQsNC/0YPRgdC60LDQtdC8INCw0L3QuNC80LDRhtC40Y4g0LzQsNGI0LjQvdGLXHJcbiAgICAgICAgICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcclxuXHJcbiAgICAgICAgICAgIC8vINCe0YLRgdC70LXQttC40LLQsNC10Lwg0L/RgNC+0LPRgNC10YHRgSDQsNC90LjQvNCw0YbQuNC4XHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkludGVydmFsID0gc2V0SW50ZXJ2YWwodHJhY2tBbmltYXRpb25Qcm9ncmVzcywgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCe0YHRgtCw0L3QsNCy0LvQuNCy0LDQtdC8INC+0YLRgdC70LXQttC40LLQsNC90LjQtSDQv9C+0YHQu9C1INC30LDQstC10YDRiNC10L3QuNGPINCw0L3QuNC80LDRhtC40LhcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFuaW1hdGlvbkludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIC8vINCT0LDRgNCw0L3RgtC40YDRg9C10LwsINGH0YLQviDQstGB0LUg0LHQu9C+0LrQuCDQv9C+0LrQsNC30LDQvdGLXHJcbiAgICAgICAgICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpKTtcclxuICAgICAgICAgICAgfSwgMTA1MDApOyAvLyDQp9GD0YLRjCDQsdC+0LvRjNGI0LUg0LTQu9C40YLQtdC70YzQvdC+0YHRgtC4INCw0L3QuNC80LDRhtC40LhcclxuXHJcbiAgICAgICAgICAgIC8vINCj0LHQuNGA0LDQtdC8INC+0LHRgNCw0LHQvtGC0YfQuNC6INC/0L7RgdC70LUg0LDQutGC0LjQstCw0YbQuNC4XHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhY3RpdmF0ZUNhckFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vINCY0L3QuNGG0LjQsNC70LjQt9Cw0YbQuNGPIC0g0L/RgNC40L7RgdGC0LDQvdCw0LLQu9C40LLQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQtNC+INGB0LrRgNC+0LvQu9CwXHJcbiAgICBhbmltYXRlZENhci5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJztcclxuXHJcbiAgICAvLyDQn9C10YDQtdGB0YfQuNGC0YvQstCw0LXQvCDQv9C+0LfQuNGG0LjQuCDQv9GA0Lgg0YDQtdGB0LDQudC30LVcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYWxjdWxhdGVQb3NpdGlvbnMpO1xyXG5cclxuICAgIC8vINCQ0LrRgtC40LLQuNGA0YPQtdC8INC/0YDQuCDRgdC60YDQvtC70LvQtVxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuXHJcbiAgICAvLyDQotCw0LrQttC1INCw0LrRgtC40LLQuNGA0YPQtdC8INC/0YDQuCDQt9Cw0LPRgNGD0LfQutC1LCDQtdGB0LvQuCDRjdC70LXQvNC10L3RgiDRg9C20LUg0LIgdmlld3BvcnRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9ucygpO1xyXG4gICAgICAgIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKCk7XHJcbiAgICB9LCAxMDApO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGNvbnZlcnNpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udmVyc2lvbnMnKTtcclxuICAgIGNvbnN0IGNsaWNrc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWNrcycpO1xyXG4gICAgY29uc3QgZnVuZHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdW5kcycpO1xyXG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBlcmNlbnRhZ2UoKSB7XHJcbiAgICAgICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnMgPSBwYXJzZUludChjb252ZXJzaW9uc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrcyA9IHBhcnNlSW50KGNsaWNrc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGZ1bmRzID0gcGFyc2VJbnQoZnVuZHNJbnB1dC52YWx1ZSkgfHwgNzAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnNPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNvbnZlcnNpb25zIC0gMTAwMDAwKTtcclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc1kgPSBjb252ZXJzaW9uc092ZXJmbG93IC8gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpY2tzT3ZlcmZsb3cgPSBNYXRoLm1heCgwLCBjbGlja3MgLSAxMDAwMDAwKTtcclxuICAgICAgICBjb25zdCBjbGlja3NZID0gY2xpY2tzT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBZID0gY29udmVyc2lvbnNZICsgY2xpY2tzWTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoMTAwMCArICg0ICogWSkpIC8gZnVuZHM7XHJcblxyXG4gICAgICAgIGxldCBmaW5hbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihwZXJjZW50YWdlICogMTAwLCAxNCk7XHJcblxyXG4gICAgICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IGZpbmFsUGVyY2VudGFnZS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnNpb25zSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGNsaWNrc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcbiAgICBmdW5kc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcblxyXG4gICAgY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xyXG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIxLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIzLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI1LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcycpO1xyXG5yZXF1aXJlKCcuL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDInKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsImZvckVhY2giLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwibWF0Y2hlcyIsImUiLCJrZXkiLCJjb250YWluZXIiLCJuaXRyb0ltZyIsInJldlRleHQiLCJ1cGRhdGVTY3JvbGxBbmltYXRpb24iLCJwYXJ0bmVyU2VjdGlvbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInByb2dyZXNzIiwidG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdmF0YXJCdXR0b25zIiwicmV2aWV3c0NvbnRhaW5lciIsInJldmlld3MiLCJjZW50ZXJSZXZpZXciLCJ0YXJnZXRDbGllbnQiLCJhY3RpdmVSZXZpZXciLCJjb250YWluZXJXaWR0aCIsInJldmlld1dpZHRoIiwiZ2FwIiwicmV2aWV3SW5kZXgiLCJBcnJheSIsImZyb20iLCJpbmRleE9mIiwidG90YWxJdGVtc1dpZHRoIiwib2Zmc2V0IiwidHJhbnNpdGlvbiIsInN3aXRjaFJldmlldyIsInRhcmdldCIsImEiLCJyIiwic2VsZWN0ZWRBdmF0YXIiLCJjbG9zZXN0IiwiYnV0dG9uIiwiZ2V0QXR0cmlidXRlIiwiaW5pdENlbnRlclJldmlldyIsImluaXRpYWxTZWxlY3RlZCIsImluaXRpYWxUYXJnZXQiLCJjdXJyZW50U2VsZWN0ZWQiLCJjdXJyZW50VGFyZ2V0IiwiY2FzZXMiLCJjb25maWciLCJ0cmlnZ2VyT2Zmc2V0Iiwic3RlcERlbGF5IiwiYW5pbWF0aW9uRGlzdGFuY2UiLCJoYW5kbGVTY3JvbGxBbmltYXRpb24iLCJjb250YWluZXJSZWN0IiwiY29udGFpbmVyVG9wIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyQm90dG9tIiwidHJpZ2dlclBvaW50IiwidmlzaWJsZUhlaWdodCIsIm1heFNjcm9sbGFibGUiLCJzY3JvbGxlZCIsInNjcm9sbFByb2dyZXNzIiwiY2FzZUVsIiwiaW5kZXgiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwicGFzc2l2ZSIsImFjY29yZGlvbkl0ZW1zIiwiY29udGFpbnMiLCJvdGhlckl0ZW0iLCJwb3B1cE92ZXJsYXkiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJvcGVuQnV0dG9ucyIsInRpbWVyRWxlbWVudCIsInRpbWVySW50ZXJ2YWwiLCJzdGFydFRpbWVyIiwidG90YWxTZWNvbmRzIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZm9ybWF0dGVkVGltZSIsIlN0cmluZyIsInBhZFN0YXJ0IiwidGV4dENvbnRlbnQiLCJ0aW1lckNvbXBsZXRlIiwic3RvcFRpbWVyIiwicmVzZXRUaW1lciIsImNvbnNvbGUiLCJsb2ciLCJvcGVuUG9wdXAiLCJib2R5Iiwib3ZlcmZsb3ciLCJjbG9zZVBvcHVwIiwib3BlbkJ1dHRvbiIsInByZXZlbnREZWZhdWx0IiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJjaGVja0lucHV0VmFsdWUiLCJ2YWx1ZSIsInRyaW0iLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwibWFpbkVtYWlsSW5wdXQiLCJwb3B1cEVtYWlsSW5wdXQiLCJwYXJhbGxheEltZyIsIm1hdGNoTWVkaWEiLCJ1cGRhdGVQYXJhbGxheCIsInBhZ2VZT2Zmc2V0Iiwic3BlZWQiLCJkb2N1bWVudEVsZW1lbnQiLCJzZXRQcm9wZXJ0eSIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwiY3VycmVudFRpbWUiLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwicmVzZXRGb3JtIiwic3VibWl0QnV0dG9uIiwiZW1haWxJbnB1dCIsImNoZWNrYm94ZXMiLCJ1cGRhdGVCdXR0b25TdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNoZWNrYm94IiwiY3VzdG9tQ2hlY2tib3giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJlbWFpbCIsInZhbGlkYXRlRW1haWwiLCJwbGFjZWhvbGRlciIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwiY2FyU2VjdGlvbiIsImNhckl0ZW1zIiwiYW5pbWF0ZWRDYXIiLCJpdGVtUG9zaXRpb25zIiwiY2FsY3VsYXRlUG9zaXRpb25zIiwic2VjdGlvblJlY3QiLCJpdGVtUmVjdCIsInBvc2l0aW9uRnJvbVRvcCIsIm5vcm1hbGl6ZWRQb3NpdGlvbiIsInB1c2giLCJpc0VsZW1lbnRJblZpZXdwb3J0IiwiZWwiLCJjbGllbnRIZWlnaHQiLCJib3R0b20iLCJ0cmFja0FuaW1hdGlvblByb2dyZXNzIiwiY2FyUmVjdCIsImNhclByb2dyZXNzIiwiaXRlbVBvc2l0aW9uIiwiYWN0aXZhdGVDYXJBbmltYXRpb24iLCJhbmltYXRpb25QbGF5U3RhdGUiLCJhbmltYXRpb25JbnRlcnZhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb252ZXJzaW9uc0lucHV0IiwiY2xpY2tzSW5wdXQiLCJmdW5kc0lucHV0IiwicmVzdWx0RGl2IiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsImNvbnZlcnNpb25zIiwicGFyc2VJbnQiLCJjbGlja3MiLCJmdW5kcyIsImNvbnZlcnNpb25zT3ZlcmZsb3ciLCJjb252ZXJzaW9uc1kiLCJjbGlja3NPdmVyZmxvdyIsImNsaWNrc1kiLCJZIiwicGVyY2VudGFnZSIsImZpbmFsUGVyY2VudGFnZSIsInRvRml4ZWQiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==