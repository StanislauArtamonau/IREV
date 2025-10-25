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
  var partnerSection = document.querySelector('.home');
  if (!partnerSection) {
    return;
  }
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

/***/ "./IREV/src/js/partner-platform/pp_c6.js":
/*!***********************************************!*\
  !*** ./IREV/src/js/partner-platform/pp_c6.js ***!
  \***********************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMzTSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU4TSxtQkFBbUIsQ0FBQztFQUMxREYsVUFBVSxDQUFDNU0sZ0JBQWdCLENBQUMsT0FBTyxFQUFFOE0sbUJBQW1CLENBQUM7RUFFekRBLG1CQUFtQixDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ2hDRjs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQzNCYSxtQkFBTyxDQUFDLDRDQUFhLENBQUM7QUFDdEJBLG1CQUFPLENBQUMsc0VBQTBCLENBQUM7QUFDbkNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsMEVBQTRCLENBQUM7QUFDckNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsNEVBQTZCLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIzLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjUuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwX2M2LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfbWVudV9pdGVtJyk7XHJcbiAgICBjb25zdCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdHJpZ2dlcl0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9kcm9wZG93bl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi1jb250ZW50XScpO1xyXG4gICAgbGV0IGNsb3NlVGltZW91dDtcclxuICAgIGxldCBsZWF2ZVRpbWVvdXQ7XHJcbiAgICBsZXQgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxlYXZlVGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IGl0ZW0gJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGVhdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93blR5cGUgPSB0aGlzLmRhdGFzZXQuZHJvcGRvd25UcmlnZ2VyO1xyXG4gICAgICAgICAgICBvcGVuRHJvcGRvd24oZHJvcGRvd25UeXBlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duQ29udGFpbmVyKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsb3NlQWxsRHJvcGRvd25zLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bih0eXBlKSB7XHJcbiAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoZmFsc2UpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcGRvd24tY29udGVudD1cIiR7dHlwZX1cIl1gKTtcclxuICAgICAgICBpZiAodGFyZ2V0Q29udGVudCkgdGFyZ2V0Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQWxsRHJvcGRvd25zKGNsZWFyQWN0aXZlID0gdHJ1ZSkge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhckFjdGl2ZSkge1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godCA9PiB0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPdmVyRHJvcGRvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRyb3Bkb3duQ29udGFpbmVyLm1hdGNoZXMoJzpob3ZlcicpIHx8XHJcbiAgICAgICAgICAgIChhY3RpdmVUcmlnZ2VyICYmIGFjdGl2ZVRyaWdnZXIubWF0Y2hlcygnOmhvdmVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXInKTtcclxuY29uc3Qgbml0cm9JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubml0cm8tZWZmZWN0IGltZycpO1xyXG5jb25zdCByZXZUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyX3JldicpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcblxyXG51cGRhdGVTY3JvbGxBbmltYXRpb24oKTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYXZhdGFyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW0gYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9nZWFyM19yZXZpZXdzXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1wiKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJSZXZpZXcodGFyZ2V0Q2xpZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldENsaWVudH1cIl1gKTtcclxuICAgICAgICBpZiAoIWFjdGl2ZVJldmlldykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHJldmlld3NDb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3V2lkdGggPSBhY3RpdmVSZXZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gNDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHJldmlld0luZGV4ID0gQXJyYXkuZnJvbShyZXZpZXdzKS5pbmRleE9mKGFjdGl2ZVJldmlldyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHJldmlld0luZGV4ICogKHJldmlld1dpZHRoICsgZ2FwKTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSAoY29udGFpbmVyV2lkdGggLyAyKSAtIChyZXZpZXdXaWR0aCAvIDIpIC0gdG90YWxJdGVtc1dpZHRoO1xyXG5cclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcInRyYW5zZm9ybSAwLjZzIGVhc2VcIjtcclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoUmV2aWV3KHRhcmdldCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW1cIikuZm9yRWFjaChhID0+IGEuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuICAgICAgICByZXZpZXdzLmZvckVhY2gociA9PiByLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmF2YXRhci1pdGVtIGJ1dHRvbltkYXRhLXRyaWdnZXI9XCIke3RhcmdldH1cIl1gKS5jbG9zZXN0KFwiLmF2YXRhci1pdGVtXCIpO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXR9XCJdYCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEF2YXRhciAmJiBhY3RpdmVSZXZpZXcpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdmF0YXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBhY3RpdmVSZXZpZXcuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBjZW50ZXJSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHN3aXRjaFJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdENlbnRlclJldmlldygpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsVGFyZ2V0ID0gaW5pdGlhbFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIGNlbnRlclJldmlldyhpbml0aWFsVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENlbnRlclJldmlldygpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGN1cnJlbnRTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2VudGVyUmV2aWV3KGN1cnJlbnRUYXJnZXQpLCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy8gY2FzZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lciAuY2FzZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjE1LFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyUG9pbnQgPSB3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAtIHRyaWdnZXJQb2ludCAmJiBjb250YWluZXJCb3R0b20gPiB0cmlnZ2VyUG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZUhlaWdodCA9IE1hdGgubWluKGNvbnRhaW5lckJvdHRvbSwgd2luZG93SGVpZ2h0KSAtIE1hdGgubWF4KGNvbnRhaW5lclRvcCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbGFibGUgPSBjb250YWluZXJIZWlnaHQgLSB3aW5kb3dIZWlnaHQgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1jb250YWluZXJUb3AgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHNjcm9sbGVkIC8gbWF4U2Nyb2xsYWJsZSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaCgoY2FzZUVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gaW5kZXggKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChjYXNlRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25faXRlbScpO1xyXG5cclxuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChvdGhlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9ucykge1xyXG4gICAgICAgIG9wZW5CdXR0b25zLmZvckVhY2gob3BlbkJ1dHRvbj0+e1xyXG4gICAgICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyIHNwYW4nKTtcclxuICAgIGNvbnN0IGNvdW50ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlcicpO1xyXG4gICAgY29uc3Qgc2lnbkluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9zaWduSW4nKTtcclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbY291bnRlckRpdiwgc2lnbkluQnV0dG9uLCB0ZXN0RHJpdmVCdXR0b24sIGlucHV0XTtcclxuXHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMyAqIDEwMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcigpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMtLTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29uZScsICd0d28nKSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnbycpKTtcclxuICAgICAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnMDA6MDAsMDAnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAxMDApO1xyXG4gICAgICAgIGNvbnN0IGh1bmRyZWR0aHMgPSB0b3RhbFNlY29uZHMgJSAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRIdW5kcmVkdGhzID0gaHVuZHJlZHRocy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gYDAwOiR7Zm9ybWF0dGVkU2Vjb25kc30sJHtmb3JtYXR0ZWRIdW5kcmVkdGhzfWA7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodG90YWxTZWNvbmRzKXtcclxuICAgICAgICAgICAgY2FzZSAyMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvbmUnKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpPT4ge1xyXG4gICAgLy8gZW1haWwgc2F2ZVxyXG5cclxuICAgIGNvbnN0IG1haW5FbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxuICAgIGNvbnN0IHBvbGljeUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvbGljeUNoZWNrYm94Jyk7XHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0QnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHBvbGljeUNoZWNrYm94ICYmIHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgIHBvbGljeUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBwb2xpY3lDaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5Q2hlY2tib3guY2hlY2tlZCA9ICFwb2xpY3lDaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgcG9saWN5Q2hlY2tib3guZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHBvbGljeUNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gcGFyYWxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1idXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1pbnB1dCcpO1xyXG5cclxuICAgIGlmIChzdWJtaXRCdXR0b24gJiYgZW1haWxJbnB1dCkge1xyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW1haWwgc3VibWl0dGVkOicsIGVtYWlsKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG4gICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCkge1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnRW50ZXIgZS1tYWlsJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnZlcnNpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udmVyc2lvbnMnKTtcclxuICAgIGNvbnN0IGNsaWNrc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWNrcycpO1xyXG4gICAgY29uc3QgZnVuZHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdW5kcycpO1xyXG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBlcmNlbnRhZ2UoKSB7XHJcbiAgICAgICAgLy8g0J/QvtC70YPRh9Cw0LXQvCDQt9C90LDRh9C10L3QuNGPXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnMgPSBwYXJzZUludChjb252ZXJzaW9uc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrcyA9IHBhcnNlSW50KGNsaWNrc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGZ1bmRzID0gcGFyc2VJbnQoZnVuZHNJbnB1dC52YWx1ZSkgfHwgNzAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnNPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNvbnZlcnNpb25zIC0gMTAwMDAwKTtcclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc1kgPSBjb252ZXJzaW9uc092ZXJmbG93IC8gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpY2tzT3ZlcmZsb3cgPSBNYXRoLm1heCgwLCBjbGlja3MgLSAxMDAwMDAwKTtcclxuICAgICAgICBjb25zdCBjbGlja3NZID0gY2xpY2tzT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBZID0gY29udmVyc2lvbnNZICsgY2xpY2tzWTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoMTAwMCArICg0ICogWSkpIC8gZnVuZHM7XHJcblxyXG4gICAgICAgIGxldCBmaW5hbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihwZXJjZW50YWdlICogMTAwLCAxNCk7XHJcblxyXG4gICAgICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IGZpbmFsUGVyY2VudGFnZS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnNpb25zSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGNsaWNrc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcbiAgICBmdW5kc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcblxyXG4gICAgY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xyXG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIxLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIzLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI1LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZW51SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJvcGRvd25UcmlnZ2VycyIsImRyb3Bkb3duQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiZm9yRWFjaCIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJtYXRjaGVzIiwiZSIsImtleSIsImNvbnRhaW5lciIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsInBhcnRuZXJTZWN0aW9uIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpbmRvd0hlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwicHJvZ3Jlc3MiLCJ0b3AiLCJNYXRoIiwibWluIiwibWF4Iiwic2hpZnQiLCJvZmZzZXRXaWR0aCIsImlubmVyV2lkdGgiLCJ0cmFuc2Zvcm0iLCJvblNjcm9sbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsImF2YXRhckJ1dHRvbnMiLCJyZXZpZXdzQ29udGFpbmVyIiwicmV2aWV3cyIsImNlbnRlclJldmlldyIsInRhcmdldENsaWVudCIsImFjdGl2ZVJldmlldyIsImNvbnRhaW5lcldpZHRoIiwicmV2aWV3V2lkdGgiLCJnYXAiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJ0b3RhbEl0ZW1zV2lkdGgiLCJvZmZzZXQiLCJ0cmFuc2l0aW9uIiwic3dpdGNoUmV2aWV3IiwidGFyZ2V0IiwiYSIsInIiLCJzZWxlY3RlZEF2YXRhciIsImNsb3Nlc3QiLCJidXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJpbml0Q2VudGVyUmV2aWV3IiwiaW5pdGlhbFNlbGVjdGVkIiwiaW5pdGlhbFRhcmdldCIsImN1cnJlbnRTZWxlY3RlZCIsImN1cnJlbnRUYXJnZXQiLCJjYXNlcyIsImNvbmZpZyIsInRyaWdnZXJPZmZzZXQiLCJzdGVwRGVsYXkiLCJhbmltYXRpb25EaXN0YW5jZSIsImhhbmRsZVNjcm9sbEFuaW1hdGlvbiIsImNvbnRhaW5lclJlY3QiLCJjb250YWluZXJUb3AiLCJjb250YWluZXJIZWlnaHQiLCJoZWlnaHQiLCJjb250YWluZXJCb3R0b20iLCJ0cmlnZ2VyUG9pbnQiLCJ2aXNpYmxlSGVpZ2h0IiwibWF4U2Nyb2xsYWJsZSIsInNjcm9sbGVkIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJpbmRleCIsInRocmVzaG9sZCIsInRpY2tpbmciLCJwYXNzaXZlIiwiYWNjb3JkaW9uSXRlbXMiLCJjb250YWlucyIsIm90aGVySXRlbSIsInBvcHVwT3ZlcmxheSIsImNsb3NlQnV0dG9uIiwiZm9ybSIsIm9wZW5CdXR0b25zIiwidGltZXJFbGVtZW50IiwidGltZXJJbnRlcnZhbCIsInN0YXJ0VGltZXIiLCJ0b3RhbFNlY29uZHMiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJmb3JtYXR0ZWRUaW1lIiwiU3RyaW5nIiwicGFkU3RhcnQiLCJ0ZXh0Q29udGVudCIsInRpbWVyQ29tcGxldGUiLCJzdG9wVGltZXIiLCJyZXNldFRpbWVyIiwiY29uc29sZSIsImxvZyIsIm9wZW5Qb3B1cCIsImJvZHkiLCJvdmVyZmxvdyIsImNsb3NlUG9wdXAiLCJvcGVuQnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJ2aWRlbyIsImdldEVsZW1lbnRCeUlkIiwidmlkZW9Db250YWluZXIiLCJwbGF5QnV0dG9uIiwidXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkiLCJwYXVzZWQiLCJwbGF5IiwicGF1c2UiLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJ0ZXN0RHJpdmVCdXR0b24iLCJpbnB1dCIsImVsZW1lbnRzIiwidXBkYXRlVGltZXIiLCJlbGVtZW50IiwiaHVuZHJlZHRocyIsImZvcm1hdHRlZFNlY29uZHMiLCJ0b1N0cmluZyIsImZvcm1hdHRlZEh1bmRyZWR0aHMiLCJtYWluRW1haWxJbnB1dCIsInBvcHVwRW1haWxJbnB1dCIsInZhbHVlIiwicG9saWN5Q2hlY2tib3giLCJzdWJtaXRCdXR0b24iLCJ1cGRhdGVCdXR0b25TdGF0ZSIsImNoZWNrZWQiLCJjdXN0b21DaGVja2JveCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInBhcmFsbGF4SW1nIiwibWF0Y2hNZWRpYSIsInVwZGF0ZVBhcmFsbGF4IiwicGFnZVlPZmZzZXQiLCJzcGVlZCIsImRvY3VtZW50RWxlbWVudCIsInNldFByb3BlcnR5IiwidmlkZW9XcmFwcGVyIiwibW9kYWxPdmVybGF5Iiwib3JpZ2luYWxWaWRlbyIsIm1vZGFsVmlkZW8iLCJvcmlnaW5hbFBsYXlJbWciLCJtb2RhbFBsYXlJbWciLCJjdXJyZW50VGltZSIsInRvZ2dsZVBsYXlCdXR0b24iLCJwbGF5SW1nIiwic2V0dXBWaWRlb0xpc3RlbmVycyIsInN0b3BQcm9wYWdhdGlvbiIsIm9wZW5Nb2RhbFdpdGhWaWRlbyIsImNsb3NlTW9kYWwiLCJyZXNldEZvcm0iLCJlbWFpbElucHV0IiwiZW1haWwiLCJ0cmltIiwidmFsaWRhdGVFbWFpbCIsInNob3dFcnJvckluUGxhY2Vob2xkZXIiLCJlbWFpbFJlZ2V4IiwidGVzdCIsInBsYWNlaG9sZGVyIiwiY29udmVyc2lvbnNJbnB1dCIsImNsaWNrc0lucHV0IiwiZnVuZHNJbnB1dCIsInJlc3VsdERpdiIsImNhbGN1bGF0ZVBlcmNlbnRhZ2UiLCJjb252ZXJzaW9ucyIsInBhcnNlSW50IiwiY2xpY2tzIiwiZnVuZHMiLCJjb252ZXJzaW9uc092ZXJmbG93IiwiY29udmVyc2lvbnNZIiwiY2xpY2tzT3ZlcmZsb3ciLCJjbGlja3NZIiwiWSIsInBlcmNlbnRhZ2UiLCJmaW5hbFBlcmNlbnRhZ2UiLCJ0b0ZpeGVkIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=