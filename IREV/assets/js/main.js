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
    var openBtn = item.querySelector('.open');
    var closeBtn = item.querySelector('.close');
    if (openBtn) {
      openBtn.addEventListener('click', function () {
        item.classList.add('opened');
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        item.classList.remove('opened');
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDO0FBQ3RCQSxtQkFBTyxDQUFDLHNFQUEwQixDQUFDO0FBQ25DQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDBFQUE0QixDQUFDO0FBQ3JDQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMy5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI1LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvc2Nzcy9pbmRleC5zY3NzPzcyNGEiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfbWVudV9pdGVtJyk7XHJcbiAgICBjb25zdCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdHJpZ2dlcl0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9kcm9wZG93bl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi1jb250ZW50XScpO1xyXG4gICAgbGV0IGNsb3NlVGltZW91dDtcclxuICAgIGxldCBsZWF2ZVRpbWVvdXQ7XHJcbiAgICBsZXQgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxlYXZlVGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IGl0ZW0gJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGVhdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93blR5cGUgPSB0aGlzLmRhdGFzZXQuZHJvcGRvd25UcmlnZ2VyO1xyXG4gICAgICAgICAgICBvcGVuRHJvcGRvd24oZHJvcGRvd25UeXBlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duQ29udGFpbmVyKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsb3NlQWxsRHJvcGRvd25zLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bih0eXBlKSB7XHJcbiAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoZmFsc2UpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcGRvd24tY29udGVudD1cIiR7dHlwZX1cIl1gKTtcclxuICAgICAgICBpZiAodGFyZ2V0Q29udGVudCkgdGFyZ2V0Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQWxsRHJvcGRvd25zKGNsZWFyQWN0aXZlID0gdHJ1ZSkge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhckFjdGl2ZSkge1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godCA9PiB0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPdmVyRHJvcGRvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRyb3Bkb3duQ29udGFpbmVyLm1hdGNoZXMoJzpob3ZlcicpIHx8XHJcbiAgICAgICAgICAgIChhY3RpdmVUcmlnZ2VyICYmIGFjdGl2ZVRyaWdnZXIubWF0Y2hlcygnOmhvdmVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXInKTtcclxuY29uc3Qgbml0cm9JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubml0cm8tZWZmZWN0IGltZycpO1xyXG5jb25zdCByZXZUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyX3JldicpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcblxyXG51cGRhdGVTY3JvbGxBbmltYXRpb24oKTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYXZhdGFyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW0gYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9nZWFyM19yZXZpZXdzXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1wiKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJSZXZpZXcodGFyZ2V0Q2xpZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldENsaWVudH1cIl1gKTtcclxuICAgICAgICBpZiAoIWFjdGl2ZVJldmlldykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHJldmlld3NDb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3V2lkdGggPSBhY3RpdmVSZXZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gNDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHJldmlld0luZGV4ID0gQXJyYXkuZnJvbShyZXZpZXdzKS5pbmRleE9mKGFjdGl2ZVJldmlldyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHJldmlld0luZGV4ICogKHJldmlld1dpZHRoICsgZ2FwKTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSAoY29udGFpbmVyV2lkdGggLyAyKSAtIChyZXZpZXdXaWR0aCAvIDIpIC0gdG90YWxJdGVtc1dpZHRoO1xyXG5cclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcInRyYW5zZm9ybSAwLjZzIGVhc2VcIjtcclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoUmV2aWV3KHRhcmdldCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW1cIikuZm9yRWFjaChhID0+IGEuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuICAgICAgICByZXZpZXdzLmZvckVhY2gociA9PiByLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmF2YXRhci1pdGVtIGJ1dHRvbltkYXRhLXRyaWdnZXI9XCIke3RhcmdldH1cIl1gKS5jbG9zZXN0KFwiLmF2YXRhci1pdGVtXCIpO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXR9XCJdYCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEF2YXRhciAmJiBhY3RpdmVSZXZpZXcpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdmF0YXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBhY3RpdmVSZXZpZXcuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBjZW50ZXJSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHN3aXRjaFJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdENlbnRlclJldmlldygpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsVGFyZ2V0ID0gaW5pdGlhbFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIGNlbnRlclJldmlldyhpbml0aWFsVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENlbnRlclJldmlldygpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGN1cnJlbnRTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2VudGVyUmV2aWV3KGN1cnJlbnRUYXJnZXQpLCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy8gY2FzZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lciAuY2FzZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjE1LFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyUG9pbnQgPSB3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAtIHRyaWdnZXJQb2ludCAmJiBjb250YWluZXJCb3R0b20gPiB0cmlnZ2VyUG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZUhlaWdodCA9IE1hdGgubWluKGNvbnRhaW5lckJvdHRvbSwgd2luZG93SGVpZ2h0KSAtIE1hdGgubWF4KGNvbnRhaW5lclRvcCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbGFibGUgPSBjb250YWluZXJIZWlnaHQgLSB3aW5kb3dIZWlnaHQgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1jb250YWluZXJUb3AgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHNjcm9sbGVkIC8gbWF4U2Nyb2xsYWJsZSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaCgoY2FzZUVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gaW5kZXggKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChjYXNlRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25faXRlbScpO1xyXG5cclxuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBvcGVuQnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcub3BlbicpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlQnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcclxuXHJcbiAgICAgICAgaWYgKG9wZW5CdG4pIHtcclxuICAgICAgICAgICAgb3BlbkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGNsb3NlQnRuKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBvcHVwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF91cHBlciBidXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50IGZvcm0nKTtcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbiwgLm9wZW5fbW9kYWwnKTtcclxuICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbGFiZWxfd3JhcHBlcl9jb3VudGVyJyk7XHJcblxyXG4gICAgbGV0IHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7XHJcblxyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRvdGFsU2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID1cclxuICAgICAgICAgICAgICAgIFN0cmluZyhob3VycykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFRpbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoLS10b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDowMDowMFwiO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xyXG4gICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDoxNTowMFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lckNvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KLQsNC50LzQtdGAINC30LDQstC10YDRiNC10L0hXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wZW5CdXR0b25zKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChvcGVuQnV0dG9uPT57XHJcbiAgICAgICAgICAgIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHZpZGVvXHJcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFZpZGVvJyk7XHJcbiAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbG93ZXJfcmlnaHRjb250X3ZpZGVvJyk7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9Db250YWluZXIucXVlcnlTZWxlY3RvcignaW1nJyk7IC8vINC90LDRhdC+0LTQuNC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0LrQvdC+0L/QutC4IHBsYXlcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWRlb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKTtcclxufSk7XHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgdGVzdERyaXZlQnV0dG9uLCBpbnB1dF07XHJcblxyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDMgKiAxMDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIoKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvbmUnLCAndHdvJykpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ28nKSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gJzAwOjAwLDAwJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMTAwKTtcclxuICAgICAgICBjb25zdCBodW5kcmVkdGhzID0gdG90YWxTZWNvbmRzICUgMTAwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHVuZHJlZHRocyA9IGh1bmRyZWR0aHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAwMDoke2Zvcm1hdHRlZFNlY29uZHN9LCR7Zm9ybWF0dGVkSHVuZHJlZHRoc31gO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRvdGFsU2Vjb25kcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMjAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb25lJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+IHtcclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG4gICAgY29uc3QgcG9wdXBFbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9mb3JtX2lucHV0cyBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuXHJcbiAgICBpZiAobWFpbkVtYWlsSW5wdXQgJiYgcG9wdXBFbWFpbElucHV0KSB7XHJcbiAgICAgICAgbWFpbkVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWFpbkVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWFpbkVtYWlsSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gbWFpbkVtYWlsSW5wdXQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrYm94IHNhdmVcclxuXHJcbiAgICBjb25zdCBwb2xpY3lDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb2xpY3lDaGVja2JveCcpO1xyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdEJ1dHRvbicpO1xyXG5cclxuICAgIGlmIChwb2xpY3lDaGVja2JveCAmJiBzdWJtaXRCdXR0b24pIHtcclxuICAgICAgICBwb2xpY3lDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1c3RvbUNoZWNrYm94ID0gcG9saWN5Q2hlY2tib3guY2xvc2VzdCgnLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgaWYgKGN1c3RvbUNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIGN1c3RvbUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmNoZWNrZWQgPSAhcG9saWN5Q2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChwb2xpY3lDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIHBhcmFsYXhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9iYWNrZ3JvdW5kSW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHZpZGVvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9sb3dlcldyYXBwZXJfdmlkZW8nKTtcclxuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbE92ZXJsYXknKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsVmlkZW8gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFZpZGVvID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fcGxheWVyIGJ1dHRvbicpIDogbnVsbDtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbFBsYXlJbWcgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX2NvbnQgaW1nJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxQbGF5SW1nID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC12aWRlbyBpbWcnKSA6IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICBpZiAoIW9yaWdpbmFsVmlkZW8gfHwgIW1vZGFsVmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldEZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlkZW9XcmFwcGVyICYmIG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIHZpZGVvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8g0J/RgNC+0LLQtdGA0Y/QtdC8LCDRh9GC0L4g0LrQu9C40Log0L3QtSDQv9C+INC60L3QvtC/0LrQtSDRg9C/0YDQsNCy0LvQtdC90LjRjyDQsiB2aWRlb19wbGF5ZXJcclxuICAgICAgICAgICAgaWYgKCFwbGF5QnV0dG9uIHx8ICFwbGF5QnV0dG9uLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIG9yaWdpbmFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8pIHtcclxuICAgICAgICBtb2RhbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAobW9kYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tYnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0taW5wdXQnKTtcclxuXHJcbiAgICBpZiAoc3VibWl0QnV0dG9uICYmIGVtYWlsSW5wdXQpIHtcclxuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VtYWlsIHN1Ym1pdHRlZDonLCBlbWFpbCk7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3JJblBsYWNlaG9sZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2Vycm9yJykpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICAgICAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93RXJyb3JJblBsYWNlaG9sZGVyKCkge1xyXG4gICAgICAgIGlmIChlbWFpbElucHV0KSB7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5wbGFjZWhvbGRlciA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldEZvcm0oKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ0VudGVyIGUtbWFpbCc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zY3NzL2luZGV4LnNjc3NcIlxyXG5yZXF1aXJlKCcuL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1yZXByZXNlbnQuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjEuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjMuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjUuanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsImZvckVhY2giLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwibWF0Y2hlcyIsImUiLCJrZXkiLCJjb250YWluZXIiLCJuaXRyb0ltZyIsInJldlRleHQiLCJ1cGRhdGVTY3JvbGxBbmltYXRpb24iLCJwYXJ0bmVyU2VjdGlvbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInByb2dyZXNzIiwidG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJhdmF0YXJCdXR0b25zIiwicmV2aWV3c0NvbnRhaW5lciIsInJldmlld3MiLCJjZW50ZXJSZXZpZXciLCJ0YXJnZXRDbGllbnQiLCJhY3RpdmVSZXZpZXciLCJjb250YWluZXJXaWR0aCIsInJldmlld1dpZHRoIiwiZ2FwIiwicmV2aWV3SW5kZXgiLCJBcnJheSIsImZyb20iLCJpbmRleE9mIiwidG90YWxJdGVtc1dpZHRoIiwib2Zmc2V0IiwidHJhbnNpdGlvbiIsInN3aXRjaFJldmlldyIsInRhcmdldCIsImEiLCJyIiwic2VsZWN0ZWRBdmF0YXIiLCJjbG9zZXN0IiwiYnV0dG9uIiwiZ2V0QXR0cmlidXRlIiwiaW5pdENlbnRlclJldmlldyIsImluaXRpYWxTZWxlY3RlZCIsImluaXRpYWxUYXJnZXQiLCJjdXJyZW50U2VsZWN0ZWQiLCJjdXJyZW50VGFyZ2V0IiwiY2FzZXMiLCJjb25maWciLCJ0cmlnZ2VyT2Zmc2V0Iiwic3RlcERlbGF5IiwiYW5pbWF0aW9uRGlzdGFuY2UiLCJoYW5kbGVTY3JvbGxBbmltYXRpb24iLCJjb250YWluZXJSZWN0IiwiY29udGFpbmVyVG9wIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0IiwiY29udGFpbmVyQm90dG9tIiwidHJpZ2dlclBvaW50IiwidmlzaWJsZUhlaWdodCIsIm1heFNjcm9sbGFibGUiLCJzY3JvbGxlZCIsInNjcm9sbFByb2dyZXNzIiwiY2FzZUVsIiwiaW5kZXgiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwicGFzc2l2ZSIsImFjY29yZGlvbkl0ZW1zIiwib3BlbkJ0biIsImNsb3NlQnRuIiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbnMiLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwic3RhcnRUaW1lciIsInRvdGFsU2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsIm9wZW5CdXR0b24iLCJwcmV2ZW50RGVmYXVsdCIsInZpZGVvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aWRlb0NvbnRhaW5lciIsInBsYXlCdXR0b24iLCJ1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSIsInBhdXNlZCIsInBsYXkiLCJwYXVzZSIsImNvdW50ZXJFbGVtZW50IiwiY291bnRlckRpdiIsInNpZ25JbkJ1dHRvbiIsInRlc3REcml2ZUJ1dHRvbiIsImlucHV0IiwiZWxlbWVudHMiLCJ1cGRhdGVUaW1lciIsImVsZW1lbnQiLCJodW5kcmVkdGhzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInRvU3RyaW5nIiwiZm9ybWF0dGVkSHVuZHJlZHRocyIsIm1haW5FbWFpbElucHV0IiwicG9wdXBFbWFpbElucHV0IiwidmFsdWUiLCJwb2xpY3lDaGVja2JveCIsInN1Ym1pdEJ1dHRvbiIsInVwZGF0ZUJ1dHRvblN0YXRlIiwiY2hlY2tlZCIsImN1c3RvbUNoZWNrYm94IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicGFyYWxsYXhJbWciLCJtYXRjaE1lZGlhIiwidXBkYXRlUGFyYWxsYXgiLCJwYWdlWU9mZnNldCIsInNwZWVkIiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0UHJvcGVydHkiLCJ2aWRlb1dyYXBwZXIiLCJtb2RhbE92ZXJsYXkiLCJvcmlnaW5hbFZpZGVvIiwibW9kYWxWaWRlbyIsIm9yaWdpbmFsUGxheUltZyIsIm1vZGFsUGxheUltZyIsImN1cnJlbnRUaW1lIiwidG9nZ2xlUGxheUJ1dHRvbiIsInBsYXlJbWciLCJzZXR1cFZpZGVvTGlzdGVuZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwib3Blbk1vZGFsV2l0aFZpZGVvIiwiY2xvc2VNb2RhbCIsInJlc2V0Rm9ybSIsImNvbnRhaW5zIiwiZW1haWxJbnB1dCIsImVtYWlsIiwidHJpbSIsInZhbGlkYXRlRW1haWwiLCJzaG93RXJyb3JJblBsYWNlaG9sZGVyIiwiZW1haWxSZWdleCIsInRlc3QiLCJwbGFjZWhvbGRlciIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9