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

/***/ "./IREV/src/js/home/home-gear2.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear2.js ***!
  \****************************************/
/***/ (() => {

var container = document.querySelector('.home_gear2_lower_container');
var nitroImg = document.querySelector('.nitro-effect img');
var revText = document.querySelector('.home_gear2_lower_container_rev');
function updateScrollAnimation() {
  var rect = container.getBoundingClientRect();
  var windowHeight = window.innerHeight;
  var progress = 1 - rect.top / windowHeight;
  progress = Math.min(Math.max(progress, 0), 1);
  var shift = Math.min(1220 - revText.offsetWidth, window.innerWidth - revText.offsetWidth - 60);
  revText.style.transform = "translateX(".concat(progress * shift, "px)");
  nitroImg.style.transform = "scaleX(".concat(progress, ")");
}
function onScroll() {
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

document.addEventListener('DOMContentLoaded', function () {
  // Элементы управления
  var avatarButtons = document.querySelectorAll('.home_gear3_clients_avatar button');
  var reviewsContainers = document.querySelectorAll('.home_gear3_reviews');

  // Текущее состояние
  var currentClient = 'client4';
  var currentReviewIndex = 2;
  var isAnimating = false;

  // Инициализация
  initCarousel();

  // Обработчики кликов на аватары
  avatarButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (isAnimating) return;
      var clientId = this.getAttribute('data-trigger');
      switchClient(clientId);
    });
  });

  // Обработчики кликов на отзывы
  document.querySelectorAll('.home_gear3_reviews_review').forEach(function (review) {
    review.addEventListener('click', function () {
      if (isAnimating) return;
      var reviewContainer = this.closest('.home_gear3_reviews');
      if (!reviewContainer.classList.contains('selected')) return;
      var reviews = reviewContainer.querySelectorAll('.home_gear3_reviews_review');
      var reviewIndex = Array.from(reviews).indexOf(this);

      // Проверяем, что клик был по видимому элементу (не по скрытому)
      if (!this.classList.contains('carousel-hidden')) {
        selectReview(reviewIndex);
      }
    });
  });
  function initCarousel() {
    updateClientDisplay();
    updateReviewsCarousel();
  }
  function switchClient(clientId) {
    if (currentClient === clientId) return;
    isAnimating = true;

    // Снимаем выделение со всех аватаров
    document.querySelectorAll('.avatar-item').forEach(function (item) {
      item.classList.remove('selected');
    });

    // Добавляем выделение выбранному аватару
    var selectedAvatar = document.querySelector("[data-trigger=\"".concat(clientId, "\"]")).closest('.avatar-item');
    selectedAvatar.classList.add('selected');

    // Обновляем текущего клиента
    currentClient = clientId;
    currentReviewIndex = 2;

    // Обновляем отображение
    updateClientDisplay();
    updateReviewsCarousel();

    // Завершаем анимацию после завершения CSS transition
    setTimeout(function () {
      isAnimating = false;
    }, 500);
  }
  function selectReview(index) {
    if (currentReviewIndex === index || isAnimating) return;
    isAnimating = true;
    currentReviewIndex = index;
    updateReviewsCarousel();
    setTimeout(function () {
      isAnimating = false;
    }, 500);
  }
  function updateClientDisplay() {
    // Скрываем все контейнеры отзывов
    reviewsContainers.forEach(function (container) {
      container.classList.remove('selected');
    });

    // Показываем только выбранного клиента
    var selectedReviews = document.querySelector("[data-client=\"".concat(currentClient, "\"]"));
    if (selectedReviews) {
      selectedReviews.classList.add('selected');
    }
  }
  function updateReviewsCarousel() {
    var currentReviewsContainer = document.querySelector("[data-client=\"".concat(currentClient, "\"]"));
    if (!currentReviewsContainer) return;
    var reviews = currentReviewsContainer.querySelectorAll('.home_gear3_reviews_review');
    var totalReviews = reviews.length;

    // Сбрасываем все классы позиционирования
    reviews.forEach(function (review) {
      review.classList.remove('selected', 'carousel-center', 'carousel-left', 'carousel-right', 'carousel-far-left', 'carousel-far-right', 'carousel-hidden');
    });

    // Добавляем выделение выбранному отзыву
    if (reviews[currentReviewIndex]) {
      reviews[currentReviewIndex].classList.add('selected');
    }

    // Применяем классы для анимации карусели
    applyCarouselClasses(reviews, totalReviews);
  }
  function applyCarouselClasses(reviews, totalReviews) {
    reviews.forEach(function (review, index) {
      var position = index - currentReviewIndex;

      // Обрабатываем зацикливание позиций
      if (position < -2) {
        position += totalReviews;
      } else if (position > 2) {
        position -= totalReviews;
      }

      // Сначала проверяем, находится ли элемент за пределами видимой области
      // Используем более строгое условие для определения видимых элементов
      var isVisible = Math.abs(position) <= 2;
      if (!isVisible) {
        review.classList.add('carousel-hidden');
        return; // Прерываем выполнение для скрытых элементов
      }

      // Для видимых элементов применяем позиционирование
      // И гарантируем, что у них нет класса hidden
      review.classList.remove('carousel-hidden');
      switch (position) {
        case 0:
          review.classList.add('carousel-center');
          break;
        case -1:
          review.classList.add('carousel-left');
          break;
        case 1:
          review.classList.add('carousel-right');
          break;
        case -2:
          review.classList.add('carousel-far-left');
          break;
        case 2:
          review.classList.add('carousel-far-right');
          break;
        default:
          // На всякий случай, если что-то пошло не так
          review.classList.add('carousel-hidden');
          break;
      }
    });
  }
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
  var openButton = document.querySelector('.home_represent_form_container_button');
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
  if (openButton) {
    openButton.addEventListener('click', function (e) {
      e.preventDefault();
      openPopup();
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
  var counterElement = document.querySelector('.home_represent_counter span');
  var counterDiv = document.querySelector('.home_represent_counter');
  var signInButton = document.querySelector('.header_signIn');
  var testDriveButton = document.querySelector('.home_represent_form_container_button');
  var input = document.querySelector('.home_represent_form_container_input');
  var elements = [counterDiv, signInButton, testDriveButton, input];
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

  var policyCheckbox = document.getElementById('policyCheckbox');
  var submitButton = document.getElementById('submitButton');
  if (policyCheckbox && submitButton) {
    var updateButtonState = function updateButtonState() {
      if (policyCheckbox.checked) {
        submitButton.classList.add('selected');
      } else {
        submitButton.classList.remove('selected');
      }
    };
    policyCheckbox.addEventListener('change', function () {
      updateButtonState();
    });
    var customCheckbox = policyCheckbox.closest('.checkbox');
    if (customCheckbox) {
      customCheckbox.addEventListener('click', function (e) {
        policyCheckbox.checked = !policyCheckbox.checked;
        policyCheckbox.dispatchEvent(new Event('change'));
      });
    }
    updateButtonState();
  }
});

// paralax
document.addEventListener('DOMContentLoaded', function () {
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
  var submitButton = document.querySelector('.form-button');
  var emailInput = document.querySelector('.form-input');
  if (submitButton && emailInput) {
    submitButton.addEventListener('click', function (e) {
      e.preventDefault();
      var email = emailInput.value.trim();
      if (validateEmail(email)) {
        console.log('Email submitted:', email);
        closeModal();
      } else {
        showErrorInPlaceholder();
      }
    });
    emailInput.addEventListener('input', function () {
      if (this.classList.contains('error')) {
        resetForm();
      }
    });
  }
  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
__webpack_require__(/*! ./home/home-gear2.js */ "./IREV/src/js/home/home-gear2.js");
__webpack_require__(/*! ./home/home-gear3.js */ "./IREV/src/js/home/home-gear3.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aEssU0FBUyxDQUFDRSxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ3JDO0VBQ0o7RUFFQSxTQUFTNkosU0FBU0EsQ0FBQSxFQUFHO0lBQ2pCLElBQUlDLFVBQVUsRUFBRTtNQUNaQSxVQUFVLENBQUNoQyxLQUFLLEdBQUcsRUFBRTtNQUNyQmdDLFVBQVUsQ0FBQ08sV0FBVyxHQUFHLGNBQWM7TUFDdkNQLFVBQVUsQ0FBQ2hLLFNBQVMsQ0FBQ0MsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUN4QztFQUNKO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ3ZNRjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQzNCdUssbUJBQU8sQ0FBQyw0Q0FBYSxDQUFDO0FBQ3RCQSxtQkFBTyxDQUFDLHNFQUEwQixDQUFDO0FBQ25DQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDBFQUE0QixDQUFDO0FBQ3JDQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMy5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcicpO1xyXG5jb25zdCBuaXRyb0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaXRyby1lZmZlY3QgaW1nJyk7XHJcbmNvbnN0IHJldlRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXJfcmV2Jyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGxldCBwcm9ncmVzcyA9IDEgLSByZWN0LnRvcCAvIHdpbmRvd0hlaWdodDtcclxuICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcclxuXHJcbiAgICBjb25zdCBzaGlmdCA9IE1hdGgubWluKFxyXG4gICAgICAgIDEyMjAgLSByZXZUZXh0Lm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCAtIDYwXHJcbiAgICApO1xyXG5cclxuICAgIHJldlRleHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwcm9ncmVzcyAqIHNoaWZ0fXB4KWA7XHJcblxyXG4gICAgbml0cm9JbWcuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgke3Byb2dyZXNzfSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxuXHJcbnVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyDQrdC70LXQvNC10L3RgtGLINGD0L/RgNCw0LLQu9C10L3QuNGPXHJcbiAgICBjb25zdCBhdmF0YXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfY2xpZW50c19hdmF0YXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCByZXZpZXdzQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX3Jldmlld3MnKTtcclxuXHJcbiAgICAvLyDQotC10LrRg9GJ0LXQtSDRgdC+0YHRgtC+0Y/QvdC40LVcclxuICAgIGxldCBjdXJyZW50Q2xpZW50ID0gJ2NsaWVudDQnO1xyXG4gICAgbGV0IGN1cnJlbnRSZXZpZXdJbmRleCA9IDI7XHJcbiAgICBsZXQgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICAvLyDQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRj1xyXG4gICAgaW5pdENhcm91c2VsKCk7XHJcblxyXG4gICAgLy8g0J7QsdGA0LDQsdC+0YLRh9C40LrQuCDQutC70LjQutC+0LIg0L3QsCDQsNCy0LDRgtCw0YDRi1xyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2xpZW50SWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10cmlnZ2VyJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaENsaWVudChjbGllbnRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDQntCx0YDQsNCx0L7RgtGH0LjQutC4INC60LvQuNC60L7QsiDQvdCwINC+0YLQt9GL0LLRi1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXcnKS5mb3JFYWNoKHJldmlldyA9PiB7XHJcbiAgICAgICAgcmV2aWV3LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmV2aWV3Q29udGFpbmVyID0gdGhpcy5jbG9zZXN0KCcuaG9tZV9nZWFyM19yZXZpZXdzJyk7XHJcbiAgICAgICAgICAgIGlmICghcmV2aWV3Q29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnc2VsZWN0ZWQnKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmV2aWV3cyA9IHJldmlld0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19yZXZpZXdzX3JldmlldycpO1xyXG4gICAgICAgICAgICBjb25zdCByZXZpZXdJbmRleCA9IEFycmF5LmZyb20ocmV2aWV3cykuaW5kZXhPZih0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIC8vINCf0YDQvtCy0LXRgNGP0LXQvCwg0YfRgtC+INC60LvQuNC6INCx0YvQuyDQv9C+INCy0LjQtNC40LzQvtC80YMg0Y3Qu9C10LzQtdC90YLRgyAo0L3QtSDQv9C+INGB0LrRgNGL0YLQvtC80YMpXHJcbiAgICAgICAgICAgIGlmICghdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2Nhcm91c2VsLWhpZGRlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RSZXZpZXcocmV2aWV3SW5kZXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0Q2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgdXBkYXRlQ2xpZW50RGlzcGxheSgpO1xyXG4gICAgICAgIHVwZGF0ZVJldmlld3NDYXJvdXNlbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaENsaWVudChjbGllbnRJZCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50Q2xpZW50ID09PSBjbGllbnRJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vINCh0L3QuNC80LDQtdC8INCy0YvQtNC10LvQtdC90LjQtSDRgdC+INCy0YHQtdGFINCw0LLQsNGC0LDRgNC+0LJcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYXZhdGFyLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCU0L7QsdCw0LLQu9GP0LXQvCDQstGL0LTQtdC70LXQvdC40LUg0LLRi9Cx0YDQsNC90L3QvtC80YMg0LDQstCw0YLQsNGA0YNcclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRyaWdnZXI9XCIke2NsaWVudElkfVwiXWApLmNsb3Nlc3QoJy5hdmF0YXItaXRlbScpO1xyXG4gICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIC8vINCe0LHQvdC+0LLQu9GP0LXQvCDRgtC10LrRg9GJ0LXQs9C+INC60LvQuNC10L3RgtCwXHJcbiAgICAgICAgY3VycmVudENsaWVudCA9IGNsaWVudElkO1xyXG4gICAgICAgIGN1cnJlbnRSZXZpZXdJbmRleCA9IDI7XHJcblxyXG4gICAgICAgIC8vINCe0LHQvdC+0LLQu9GP0LXQvCDQvtGC0L7QsdGA0LDQttC10L3QuNC1XHJcbiAgICAgICAgdXBkYXRlQ2xpZW50RGlzcGxheSgpO1xyXG4gICAgICAgIHVwZGF0ZVJldmlld3NDYXJvdXNlbCgpO1xyXG5cclxuICAgICAgICAvLyDQl9Cw0LLQtdGA0YjQsNC10Lwg0LDQvdC40LzQsNGG0LjRjiDQv9C+0YHQu9C1INC30LDQstC10YDRiNC10L3QuNGPIENTUyB0cmFuc2l0aW9uXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlzQW5pbWF0aW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RSZXZpZXcoaW5kZXgpIHtcclxuICAgICAgICBpZiAoY3VycmVudFJldmlld0luZGV4ID09PSBpbmRleCB8fCBpc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpc0FuaW1hdGluZyA9IHRydWU7XHJcbiAgICAgICAgY3VycmVudFJldmlld0luZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgdXBkYXRlUmV2aWV3c0Nhcm91c2VsKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQ2xpZW50RGlzcGxheSgpIHtcclxuICAgICAgICAvLyDQodC60YDRi9Cy0LDQtdC8INCy0YHQtSDQutC+0L3RgtC10LnQvdC10YDRiyDQvtGC0LfRi9Cy0L7QslxyXG4gICAgICAgIHJldmlld3NDb250YWluZXJzLmZvckVhY2goY29udGFpbmVyID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vINCf0L7QutCw0LfRi9Cy0LDQtdC8INGC0L7Qu9GM0LrQviDQstGL0LHRgNCw0L3QvdC+0LPQviDQutC70LjQtdC90YLQsFxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWNsaWVudD1cIiR7Y3VycmVudENsaWVudH1cIl1gKTtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRSZXZpZXdzKSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkUmV2aWV3cy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVSZXZpZXdzQ2Fyb3VzZWwoKSB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1jbGllbnQ9XCIke2N1cnJlbnRDbGllbnR9XCJdYCk7XHJcbiAgICAgICAgaWYgKCFjdXJyZW50UmV2aWV3c0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXdzID0gY3VycmVudFJldmlld3NDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXcnKTtcclxuICAgICAgICBjb25zdCB0b3RhbFJldmlld3MgPSByZXZpZXdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgLy8g0KHQsdGA0LDRgdGL0LLQsNC10Lwg0LLRgdC1INC60LvQsNGB0YHRiyDQv9C+0LfQuNGG0LjQvtC90LjRgNC+0LLQsNC90LjRj1xyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaChyZXZpZXcgPT4ge1xyXG4gICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LnJlbW92ZShcclxuICAgICAgICAgICAgICAgICdzZWxlY3RlZCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICdjYXJvdXNlbC1sZWZ0JyxcclxuICAgICAgICAgICAgICAgICdjYXJvdXNlbC1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtZmFyLWxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ2Nhcm91c2VsLWZhci1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtaGlkZGVuJ1xyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyDQlNC+0LHQsNCy0LvRj9C10Lwg0LLRi9C00LXQu9C10L3QuNC1INCy0YvQsdGA0LDQvdC90L7QvNGDINC+0YLQt9GL0LLRg1xyXG4gICAgICAgIGlmIChyZXZpZXdzW2N1cnJlbnRSZXZpZXdJbmRleF0pIHtcclxuICAgICAgICAgICAgcmV2aWV3c1tjdXJyZW50UmV2aWV3SW5kZXhdLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyDQn9GA0LjQvNC10L3Rj9C10Lwg0LrQu9Cw0YHRgdGLINC00LvRjyDQsNC90LjQvNCw0YbQuNC4INC60LDRgNGD0YHQtdC70LhcclxuICAgICAgICBhcHBseUNhcm91c2VsQ2xhc3NlcyhyZXZpZXdzLCB0b3RhbFJldmlld3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFwcGx5Q2Fyb3VzZWxDbGFzc2VzKHJldmlld3MsIHRvdGFsUmV2aWV3cykge1xyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaCgocmV2aWV3LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBpbmRleCAtIGN1cnJlbnRSZXZpZXdJbmRleDtcclxuXHJcbiAgICAgICAgICAgIC8vINCe0LHRgNCw0LHQsNGC0YvQstCw0LXQvCDQt9Cw0YbQuNC60LvQuNCy0LDQvdC40LUg0L/QvtC30LjRhtC40LlcclxuICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgLTIpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uICs9IHRvdGFsUmV2aWV3cztcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwb3NpdGlvbiA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uIC09IHRvdGFsUmV2aWV3cztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8g0KHQvdCw0YfQsNC70LAg0L/RgNC+0LLQtdGA0Y/QtdC8LCDQvdCw0YXQvtC00LjRgtGB0Y8g0LvQuCDRjdC70LXQvNC10L3RgiDQt9CwINC/0YDQtdC00LXQu9Cw0LzQuCDQstC40LTQuNC80L7QuSDQvtCx0LvQsNGB0YLQuFxyXG4gICAgICAgICAgICAvLyDQmNGB0L/QvtC70YzQt9GD0LXQvCDQsdC+0LvQtdC1INGB0YLRgNC+0LPQvtC1INGD0YHQu9C+0LLQuNC1INC00LvRjyDQvtC/0YDQtdC00LXQu9C10L3QuNGPINCy0LjQtNC40LzRi9GFINGN0LvQtdC80LXQvdGC0L7QslxyXG4gICAgICAgICAgICBjb25zdCBpc1Zpc2libGUgPSBNYXRoLmFicyhwb3NpdGlvbikgPD0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vINCf0YDQtdGA0YvQstCw0LXQvCDQstGL0L/QvtC70L3QtdC90LjQtSDQtNC70Y8g0YHQutGA0YvRgtGL0YUg0Y3Qu9C10LzQtdC90YLQvtCyXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vINCU0LvRjyDQstC40LTQuNC80YvRhSDRjdC70LXQvNC10L3RgtC+0LIg0L/RgNC40LzQtdC90Y/QtdC8INC/0L7Qt9C40YbQuNC+0L3QuNGA0L7QstCw0L3QuNC1XHJcbiAgICAgICAgICAgIC8vINCYINCz0LDRgNCw0L3RgtC40YDRg9C10LwsINGH0YLQviDRgyDQvdC40YUg0L3QtdGCINC60LvQsNGB0YHQsCBoaWRkZW5cclxuICAgICAgICAgICAgcmV2aWV3LmNsYXNzTGlzdC5yZW1vdmUoJ2Nhcm91c2VsLWhpZGRlbicpO1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWNlbnRlcicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAtMTpcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtbGVmdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldy5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC1yaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAtMjpcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtZmFyLWxlZnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtZmFyLXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIC8vINCd0LAg0LLRgdGP0LrQuNC5INGB0LvRg9GH0LDQuSwg0LXRgdC70Lgg0YfRgtC+LdGC0L4g0L/QvtGI0LvQviDQvdC1INGC0LDQulxyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldy5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgdGltZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sYWJlbF93cmFwcGVyX2NvdW50ZXInKTtcclxuXHJcbiAgICBsZXQgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAoIXRpbWVyRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxTZWNvbmRzID0gMTUgKiA2MDtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzICUgMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPVxyXG4gICAgICAgICAgICAgICAgU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgICAgIFN0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgICAgIFN0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGltZTtcclxuXHJcbiAgICAgICAgICAgIGlmICgtLXRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIjAwOjAwOjAwXCI7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XHJcbiAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgaWYgKHRpbWVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIjAwOjE1OjAwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRpbWVyQ29tcGxldGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQotCw0LnQvNC10YAg0LfQsNCy0LXRgNGI0LXQvSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuICAgICAgICAgICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3BlbkJ1dHRvbikge1xyXG4gICAgICAgIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXIgc3BhbicpO1xyXG4gICAgY29uc3QgY291bnRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyJyk7XHJcbiAgICBjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3NpZ25JbicpO1xyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtjb3VudGVyRGl2LCBzaWduSW5CdXR0b24sIHRlc3REcml2ZUJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG5cclxuXHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxuICAgIGNvbnN0IHBvbGljeUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvbGljeUNoZWNrYm94Jyk7XHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0QnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHBvbGljeUNoZWNrYm94ICYmIHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgIHBvbGljeUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IHBvbGljeUNoZWNrYm94LmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21DaGVja2JveCkge1xyXG4gICAgICAgICAgICBjdXN0b21DaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmNoZWNrZWQgPSAhcG9saWN5Q2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChwb2xpY3lDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vLyBwYXJhbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1idXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1pbnB1dCcpO1xyXG5cclxuICAgIGlmIChzdWJtaXRCdXR0b24gJiYgZW1haWxJbnB1dCkge1xyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW1haWwgc3VibWl0dGVkOicsIGVtYWlsKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG4gICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCkge1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnRW50ZXIgZS1tYWlsJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3MvaW5kZXguc2Nzc1wiXHJcbnJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMi5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMy5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZW51SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJvcGRvd25UcmlnZ2VycyIsImRyb3Bkb3duQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiZm9yRWFjaCIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJtYXRjaGVzIiwiZSIsImtleSIsImNvbnRhaW5lciIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInByb2dyZXNzIiwidG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdmF0YXJCdXR0b25zIiwicmV2aWV3c0NvbnRhaW5lcnMiLCJjdXJyZW50Q2xpZW50IiwiY3VycmVudFJldmlld0luZGV4IiwiaXNBbmltYXRpbmciLCJpbml0Q2Fyb3VzZWwiLCJidXR0b24iLCJjbGllbnRJZCIsImdldEF0dHJpYnV0ZSIsInN3aXRjaENsaWVudCIsInJldmlldyIsInJldmlld0NvbnRhaW5lciIsImNsb3Nlc3QiLCJjb250YWlucyIsInJldmlld3MiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJzZWxlY3RSZXZpZXciLCJ1cGRhdGVDbGllbnREaXNwbGF5IiwidXBkYXRlUmV2aWV3c0Nhcm91c2VsIiwic2VsZWN0ZWRBdmF0YXIiLCJpbmRleCIsInNlbGVjdGVkUmV2aWV3cyIsImN1cnJlbnRSZXZpZXdzQ29udGFpbmVyIiwidG90YWxSZXZpZXdzIiwiYXBwbHlDYXJvdXNlbENsYXNzZXMiLCJwb3NpdGlvbiIsImlzVmlzaWJsZSIsImFicyIsInBvcHVwT3ZlcmxheSIsImNsb3NlQnV0dG9uIiwiZm9ybSIsIm9wZW5CdXR0b24iLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwic3RhcnRUaW1lciIsInRvdGFsU2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwibWFpbkVtYWlsSW5wdXQiLCJwb3B1cEVtYWlsSW5wdXQiLCJ2YWx1ZSIsInBvbGljeUNoZWNrYm94Iiwic3VibWl0QnV0dG9uIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiY3VzdG9tQ2hlY2tib3giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwYXJhbGxheEltZyIsIm1hdGNoTWVkaWEiLCJ1cGRhdGVQYXJhbGxheCIsInNjcm9sbGVkIiwicGFnZVlPZmZzZXQiLCJzcGVlZCIsIm9mZnNldCIsImRvY3VtZW50RWxlbWVudCIsInNldFByb3BlcnR5IiwidGlja2luZyIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwiY3VycmVudFRpbWUiLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwicmVzZXRGb3JtIiwiZW1haWxJbnB1dCIsImVtYWlsIiwidHJpbSIsInZhbGlkYXRlRW1haWwiLCJzaG93RXJyb3JJblBsYWNlaG9sZGVyIiwiZW1haWxSZWdleCIsInRlc3QiLCJwbGFjZWhvbGRlciIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9