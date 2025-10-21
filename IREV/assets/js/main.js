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
  var avatarButtons = document.querySelectorAll('.home_gear3_clients_avatar button');
  var reviewsContainers = document.querySelectorAll('.home_gear3_reviews');
  var currentClient = 'client4';
  var currentReviewIndex = 2;
  var isAnimating = false;
  initCarousel();
  avatarButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      if (isAnimating) return;
      var clientId = this.getAttribute('data-trigger');
      switchClient(clientId);
    });
  });
  document.querySelectorAll('.home_gear3_reviews_review').forEach(function (review) {
    review.addEventListener('click', function () {
      if (isAnimating) return;
      var reviewContainer = this.closest('.home_gear3_reviews');
      if (!reviewContainer.classList.contains('selected')) return;
      var reviews = reviewContainer.querySelectorAll('.home_gear3_reviews_review');
      var reviewIndex = Array.from(reviews).indexOf(this);
      if (!this.classList.contains('carousel-hidden')) {
        var position = reviewIndex - currentReviewIndex;
        var totalReviews = reviews.length;
        var adjustedPosition = position;
        if (position < -2) {
          adjustedPosition += totalReviews;
        } else if (position > 2) {
          adjustedPosition -= totalReviews;
        }
        handleReviewClick(adjustedPosition, reviewIndex, totalReviews);
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
    document.querySelectorAll('.avatar-item').forEach(function (item) {
      item.classList.remove('selected');
    });
    var selectedAvatar = document.querySelector("[data-trigger=\"".concat(clientId, "\"]")).closest('.avatar-item');
    selectedAvatar.classList.add('selected');
    currentClient = clientId;
    currentReviewIndex = 2;
    updateClientDisplay();
    updateReviewsCarousel();
    setTimeout(function () {
      isAnimating = false;
    }, 500);
  }
  function handleReviewClick(position, clickedIndex, totalReviews) {
    if (isAnimating) return;
    isAnimating = true;
    var newIndex;
    var disableFarLeft = false;
    var disableFarRight = false;
    switch (position) {
      case -2:
        // far-left
        newIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
        disableFarLeft = true;
        break;
      case -1:
        // left
        newIndex = clickedIndex;
        disableFarLeft = true;
        break;
      case 0:
        // center
        isAnimating = false;
        return;
      case 1:
        // right
        newIndex = clickedIndex;
        disableFarRight = true;
        break;
      case 2:
        // far-right
        newIndex = (currentReviewIndex + 1) % totalReviews;
        disableFarRight = true;
        break;
      default:
        newIndex = clickedIndex;
    }
    currentReviewIndex = newIndex;
    updateReviewsCarousel(disableFarLeft, disableFarRight);
    setTimeout(function () {
      isAnimating = false;
    }, 500);
  }
  function updateClientDisplay() {
    reviewsContainers.forEach(function (container) {
      container.classList.remove('selected');
    });
    var selectedReviews = document.querySelector("[data-client=\"".concat(currentClient, "\"]"));
    if (selectedReviews) {
      selectedReviews.classList.add('selected');
    }
  }
  function updateReviewsCarousel() {
    var disableFarLeft = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var disableFarRight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var currentReviewsContainer = document.querySelector("[data-client=\"".concat(currentClient, "\"]"));
    if (!currentReviewsContainer) return;
    var reviews = currentReviewsContainer.querySelectorAll('.home_gear3_reviews_review');
    var totalReviews = reviews.length;
    reviews.forEach(function (review) {
      review.classList.remove('selected', 'carousel-center', 'carousel-left', 'carousel-right', 'carousel-far-left', 'carousel-far-right', 'carousel-hidden', 'no-transition-transform');
    });
    if (reviews[currentReviewIndex]) {
      reviews[currentReviewIndex].classList.add('selected');
    }
    applyCarouselClasses(reviews, totalReviews);
    if (disableFarLeft) {
      var farLeftReview = currentReviewsContainer.querySelector('.carousel-far-left');
      if (farLeftReview) {
        farLeftReview.classList.add('no-transition-transform');
      }
    }
    if (disableFarRight) {
      var farRightReview = currentReviewsContainer.querySelector('.carousel-far-right');
      if (farRightReview) {
        farRightReview.classList.add('no-transition-transform');
      }
    }
  }
  function applyCarouselClasses(reviews, totalReviews) {
    reviews.forEach(function (review, index) {
      var position = index - currentReviewIndex;
      if (position < -2) {
        position += totalReviews;
      } else if (position > 2) {
        position -= totalReviews;
      }
      var isVisible = Math.abs(position) <= 2;
      if (!isVisible) {
        review.classList.add('carousel-hidden');
        return;
      }
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
          review.classList.add('carousel-hidden');
          break;
      }
    });
  }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Z00sbUJBQU8sQ0FBQyw0Q0FBYSxDQUFDO0FBQ3RCQSxtQkFBTyxDQUFDLHNFQUEwQixDQUFDO0FBQ25DQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDBFQUE0QixDQUFDO0FBQ3JDQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMy5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcicpO1xyXG5jb25zdCBuaXRyb0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaXRyby1lZmZlY3QgaW1nJyk7XHJcbmNvbnN0IHJldlRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXJfcmV2Jyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGxldCBwcm9ncmVzcyA9IDEgLSByZWN0LnRvcCAvIHdpbmRvd0hlaWdodDtcclxuICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcclxuXHJcbiAgICBjb25zdCBzaGlmdCA9IE1hdGgubWluKFxyXG4gICAgICAgIDEyMjAgLSByZXZUZXh0Lm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCAtIDYwXHJcbiAgICApO1xyXG5cclxuICAgIHJldlRleHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwcm9ncmVzcyAqIHNoaWZ0fXB4KWA7XHJcblxyXG4gICAgbml0cm9JbWcuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgke3Byb2dyZXNzfSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxuXHJcbnVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhdmF0YXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfY2xpZW50c19hdmF0YXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCByZXZpZXdzQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX3Jldmlld3MnKTtcclxuXHJcbiAgICBsZXQgY3VycmVudENsaWVudCA9ICdjbGllbnQ0JztcclxuICAgIGxldCBjdXJyZW50UmV2aWV3SW5kZXggPSAyO1xyXG4gICAgbGV0IGlzQW5pbWF0aW5nID0gZmFsc2U7XHJcblxyXG4gICAgaW5pdENhcm91c2VsKCk7XHJcblxyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0FuaW1hdGluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2xpZW50SWQgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS10cmlnZ2VyJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaENsaWVudChjbGllbnRJZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19yZXZpZXdzX3JldmlldycpLmZvckVhY2gocmV2aWV3ID0+IHtcclxuICAgICAgICByZXZpZXcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKGlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXZpZXdDb250YWluZXIgPSB0aGlzLmNsb3Nlc3QoJy5ob21lX2dlYXIzX3Jldmlld3MnKTtcclxuICAgICAgICAgICAgaWYgKCFyZXZpZXdDb250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWxlY3RlZCcpKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXZpZXdzID0gcmV2aWV3Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldmlld0luZGV4ID0gQXJyYXkuZnJvbShyZXZpZXdzKS5pbmRleE9mKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNsYXNzTGlzdC5jb250YWlucygnY2Fyb3VzZWwtaGlkZGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uID0gcmV2aWV3SW5kZXggLSBjdXJyZW50UmV2aWV3SW5kZXg7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbFJldmlld3MgPSByZXZpZXdzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgYWRqdXN0ZWRQb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uIDwgLTIpIHtcclxuICAgICAgICAgICAgICAgICAgICBhZGp1c3RlZFBvc2l0aW9uICs9IHRvdGFsUmV2aWV3cztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPiAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWRqdXN0ZWRQb3NpdGlvbiAtPSB0b3RhbFJldmlld3M7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaGFuZGxlUmV2aWV3Q2xpY2soYWRqdXN0ZWRQb3NpdGlvbiwgcmV2aWV3SW5kZXgsIHRvdGFsUmV2aWV3cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRDYXJvdXNlbCgpIHtcclxuICAgICAgICB1cGRhdGVDbGllbnREaXNwbGF5KCk7XHJcbiAgICAgICAgdXBkYXRlUmV2aWV3c0Nhcm91c2VsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoQ2xpZW50KGNsaWVudElkKSB7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRDbGllbnQgPT09IGNsaWVudElkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmF2YXRhci1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRyaWdnZXI9XCIke2NsaWVudElkfVwiXWApLmNsb3Nlc3QoJy5hdmF0YXItaXRlbScpO1xyXG4gICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcblxyXG4gICAgICAgIGN1cnJlbnRDbGllbnQgPSBjbGllbnRJZDtcclxuICAgICAgICBjdXJyZW50UmV2aWV3SW5kZXggPSAyO1xyXG5cclxuICAgICAgICB1cGRhdGVDbGllbnREaXNwbGF5KCk7XHJcbiAgICAgICAgdXBkYXRlUmV2aWV3c0Nhcm91c2VsKCk7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpc0FuaW1hdGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmV2aWV3Q2xpY2socG9zaXRpb24sIGNsaWNrZWRJbmRleCwgdG90YWxSZXZpZXdzKSB7XHJcbiAgICAgICAgaWYgKGlzQW5pbWF0aW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlzQW5pbWF0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgbGV0IG5ld0luZGV4O1xyXG4gICAgICAgIGxldCBkaXNhYmxlRmFyTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBkaXNhYmxlRmFyUmlnaHQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgc3dpdGNoKHBvc2l0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgLTI6IC8vIGZhci1sZWZ0XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IChjdXJyZW50UmV2aWV3SW5kZXggLSAxICsgdG90YWxSZXZpZXdzKSAlIHRvdGFsUmV2aWV3cztcclxuICAgICAgICAgICAgICAgIGRpc2FibGVGYXJMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIC0xOiAvLyBsZWZ0XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IGNsaWNrZWRJbmRleDtcclxuICAgICAgICAgICAgICAgIGRpc2FibGVGYXJMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDA6IC8vIGNlbnRlclxyXG4gICAgICAgICAgICAgICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSAxOiAvLyByaWdodFxyXG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBjbGlja2VkSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBkaXNhYmxlRmFyUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjogLy8gZmFyLXJpZ2h0XHJcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IChjdXJyZW50UmV2aWV3SW5kZXggKyAxKSAlIHRvdGFsUmV2aWV3cztcclxuICAgICAgICAgICAgICAgIGRpc2FibGVGYXJSaWdodCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gY2xpY2tlZEluZGV4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY3VycmVudFJldmlld0luZGV4ID0gbmV3SW5kZXg7XHJcbiAgICAgICAgdXBkYXRlUmV2aWV3c0Nhcm91c2VsKGRpc2FibGVGYXJMZWZ0LCBkaXNhYmxlRmFyUmlnaHQpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaXNBbmltYXRpbmcgPSBmYWxzZTtcclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNsaWVudERpc3BsYXkoKSB7XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lcnMuZm9yRWFjaChjb250YWluZXIgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRSZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2xpZW50PVwiJHtjdXJyZW50Q2xpZW50fVwiXWApO1xyXG4gICAgICAgIGlmIChzZWxlY3RlZFJldmlld3MpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRSZXZpZXdzLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJldmlld3NDYXJvdXNlbChkaXNhYmxlRmFyTGVmdCA9IGZhbHNlLCBkaXNhYmxlRmFyUmlnaHQgPSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRSZXZpZXdzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtY2xpZW50PVwiJHtjdXJyZW50Q2xpZW50fVwiXWApO1xyXG4gICAgICAgIGlmICghY3VycmVudFJldmlld3NDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3cyA9IGN1cnJlbnRSZXZpZXdzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3Jyk7XHJcbiAgICAgICAgY29uc3QgdG90YWxSZXZpZXdzID0gcmV2aWV3cy5sZW5ndGg7XHJcblxyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaChyZXZpZXcgPT4ge1xyXG4gICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LnJlbW92ZShcclxuICAgICAgICAgICAgICAgICdzZWxlY3RlZCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtY2VudGVyJyxcclxuICAgICAgICAgICAgICAgICdjYXJvdXNlbC1sZWZ0JyxcclxuICAgICAgICAgICAgICAgICdjYXJvdXNlbC1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtZmFyLWxlZnQnLFxyXG4gICAgICAgICAgICAgICAgJ2Nhcm91c2VsLWZhci1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICAnY2Fyb3VzZWwtaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICduby10cmFuc2l0aW9uLXRyYW5zZm9ybSdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHJldmlld3NbY3VycmVudFJldmlld0luZGV4XSkge1xyXG4gICAgICAgICAgICByZXZpZXdzW2N1cnJlbnRSZXZpZXdJbmRleF0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFwcGx5Q2Fyb3VzZWxDbGFzc2VzKHJldmlld3MsIHRvdGFsUmV2aWV3cyk7XHJcblxyXG4gICAgICAgIGlmIChkaXNhYmxlRmFyTGVmdCkge1xyXG4gICAgICAgICAgICBjb25zdCBmYXJMZWZ0UmV2aWV3ID0gY3VycmVudFJldmlld3NDb250YWluZXIucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLWZhci1sZWZ0Jyk7XHJcbiAgICAgICAgICAgIGlmIChmYXJMZWZ0UmV2aWV3KSB7XHJcbiAgICAgICAgICAgICAgICBmYXJMZWZ0UmV2aWV3LmNsYXNzTGlzdC5hZGQoJ25vLXRyYW5zaXRpb24tdHJhbnNmb3JtJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkaXNhYmxlRmFyUmlnaHQpIHtcclxuICAgICAgICAgICAgY29uc3QgZmFyUmlnaHRSZXZpZXcgPSBjdXJyZW50UmV2aWV3c0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwtZmFyLXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGlmIChmYXJSaWdodFJldmlldykge1xyXG4gICAgICAgICAgICAgICAgZmFyUmlnaHRSZXZpZXcuY2xhc3NMaXN0LmFkZCgnbm8tdHJhbnNpdGlvbi10cmFuc2Zvcm0nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhcHBseUNhcm91c2VsQ2xhc3NlcyhyZXZpZXdzLCB0b3RhbFJldmlld3MpIHtcclxuICAgICAgICByZXZpZXdzLmZvckVhY2goKHJldmlldywgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHBvc2l0aW9uID0gaW5kZXggLSBjdXJyZW50UmV2aWV3SW5kZXg7XHJcblxyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gPCAtMikge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gKz0gdG90YWxSZXZpZXdzO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID4gMikge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gLT0gdG90YWxSZXZpZXdzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc1Zpc2libGUgPSBNYXRoLmFicyhwb3NpdGlvbikgPD0gMjtcclxuXHJcbiAgICAgICAgICAgIGlmICghaXNWaXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldmlldy5jbGFzc0xpc3QucmVtb3ZlKCdjYXJvdXNlbC1oaWRkZW4nKTtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaChwb3NpdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldmlldy5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC1jZW50ZXInKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWxlZnQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtcmlnaHQnKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgLTI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWZhci1sZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV2aWV3LmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLWZhci1yaWdodCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICByZXZpZXcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLy8gY2FzZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lciAuY2FzZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjE1LFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyUG9pbnQgPSB3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAtIHRyaWdnZXJQb2ludCAmJiBjb250YWluZXJCb3R0b20gPiB0cmlnZ2VyUG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZUhlaWdodCA9IE1hdGgubWluKGNvbnRhaW5lckJvdHRvbSwgd2luZG93SGVpZ2h0KSAtIE1hdGgubWF4KGNvbnRhaW5lclRvcCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbGFibGUgPSBjb250YWluZXJIZWlnaHQgLSB3aW5kb3dIZWlnaHQgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1jb250YWluZXJUb3AgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHNjcm9sbGVkIC8gbWF4U2Nyb2xsYWJsZSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaCgoY2FzZUVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gaW5kZXggKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChjYXNlRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgdGltZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sYWJlbF93cmFwcGVyX2NvdW50ZXInKTtcclxuXHJcbiAgICBsZXQgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAoIXRpbWVyRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBsZXQgdG90YWxTZWNvbmRzID0gMTUgKiA2MDtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzICUgMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPVxyXG4gICAgICAgICAgICAgICAgU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgICAgIFN0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgICAgIFN0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGltZTtcclxuXHJcbiAgICAgICAgICAgIGlmICgtLXRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIjAwOjAwOjAwXCI7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0VGltZXIoKSB7XHJcbiAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgaWYgKHRpbWVyRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIjAwOjE1OjAwXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRpbWVyQ29tcGxldGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQotCw0LnQvNC10YAg0LfQsNCy0LXRgNGI0LXQvSFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuICAgICAgICAgICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgcmVzZXRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3BlbkJ1dHRvbikge1xyXG4gICAgICAgIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXIgc3BhbicpO1xyXG4gICAgY29uc3QgY291bnRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyJyk7XHJcbiAgICBjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3NpZ25JbicpO1xyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtjb3VudGVyRGl2LCBzaWduSW5CdXR0b24sIHRlc3REcml2ZUJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG5cclxuXHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxuICAgIGNvbnN0IHBvbGljeUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvbGljeUNoZWNrYm94Jyk7XHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0QnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHBvbGljeUNoZWNrYm94ICYmIHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgIHBvbGljeUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IHBvbGljeUNoZWNrYm94LmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21DaGVja2JveCkge1xyXG4gICAgICAgICAgICBjdXN0b21DaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmNoZWNrZWQgPSAhcG9saWN5Q2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChwb2xpY3lDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vLyBwYXJhbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1idXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1pbnB1dCcpO1xyXG5cclxuICAgIGlmIChzdWJtaXRCdXR0b24gJiYgZW1haWxJbnB1dCkge1xyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW1haWwgc3VibWl0dGVkOicsIGVtYWlsKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG4gICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCkge1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnRW50ZXIgZS1tYWlsJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3MvaW5kZXguc2Nzc1wiXHJcbnJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMi5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMy5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZW51SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJvcGRvd25UcmlnZ2VycyIsImRyb3Bkb3duQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiZm9yRWFjaCIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJtYXRjaGVzIiwiZSIsImtleSIsImNvbnRhaW5lciIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInByb2dyZXNzIiwidG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdmF0YXJCdXR0b25zIiwicmV2aWV3c0NvbnRhaW5lcnMiLCJjdXJyZW50Q2xpZW50IiwiY3VycmVudFJldmlld0luZGV4IiwiaXNBbmltYXRpbmciLCJpbml0Q2Fyb3VzZWwiLCJidXR0b24iLCJjbGllbnRJZCIsImdldEF0dHJpYnV0ZSIsInN3aXRjaENsaWVudCIsInJldmlldyIsInJldmlld0NvbnRhaW5lciIsImNsb3Nlc3QiLCJjb250YWlucyIsInJldmlld3MiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJwb3NpdGlvbiIsInRvdGFsUmV2aWV3cyIsImFkanVzdGVkUG9zaXRpb24iLCJoYW5kbGVSZXZpZXdDbGljayIsInVwZGF0ZUNsaWVudERpc3BsYXkiLCJ1cGRhdGVSZXZpZXdzQ2Fyb3VzZWwiLCJzZWxlY3RlZEF2YXRhciIsImNsaWNrZWRJbmRleCIsIm5ld0luZGV4IiwiZGlzYWJsZUZhckxlZnQiLCJkaXNhYmxlRmFyUmlnaHQiLCJzZWxlY3RlZFJldmlld3MiLCJjdXJyZW50UmV2aWV3c0NvbnRhaW5lciIsImFwcGx5Q2Fyb3VzZWxDbGFzc2VzIiwiZmFyTGVmdFJldmlldyIsImZhclJpZ2h0UmV2aWV3IiwiaW5kZXgiLCJpc1Zpc2libGUiLCJhYnMiLCJjYXNlcyIsImNvbmZpZyIsInRyaWdnZXJPZmZzZXQiLCJzdGVwRGVsYXkiLCJhbmltYXRpb25EaXN0YW5jZSIsImhhbmRsZVNjcm9sbEFuaW1hdGlvbiIsImNvbnRhaW5lclJlY3QiLCJjb250YWluZXJUb3AiLCJjb250YWluZXJIZWlnaHQiLCJoZWlnaHQiLCJjb250YWluZXJCb3R0b20iLCJ0cmlnZ2VyUG9pbnQiLCJ2aXNpYmxlSGVpZ2h0IiwibWF4U2Nyb2xsYWJsZSIsInNjcm9sbGVkIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwicGFzc2l2ZSIsInBvcHVwT3ZlcmxheSIsImNsb3NlQnV0dG9uIiwiZm9ybSIsIm9wZW5CdXR0b24iLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwic3RhcnRUaW1lciIsInRvdGFsU2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwibWFpbkVtYWlsSW5wdXQiLCJwb3B1cEVtYWlsSW5wdXQiLCJ2YWx1ZSIsInBvbGljeUNoZWNrYm94Iiwic3VibWl0QnV0dG9uIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiY3VzdG9tQ2hlY2tib3giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJwYXJhbGxheEltZyIsIm1hdGNoTWVkaWEiLCJ1cGRhdGVQYXJhbGxheCIsInBhZ2VZT2Zmc2V0Iiwic3BlZWQiLCJvZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJzZXRQcm9wZXJ0eSIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwiY3VycmVudFRpbWUiLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwicmVzZXRGb3JtIiwiZW1haWxJbnB1dCIsImVtYWlsIiwidHJpbSIsInZhbGlkYXRlRW1haWwiLCJzaG93RXJyb3JJblBsYWNlaG9sZGVyIiwiZW1haWxSZWdleCIsInRlc3QiLCJwbGFjZWhvbGRlciIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9