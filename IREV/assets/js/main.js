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

document.addEventListener('DOMContentLoaded', function () {
  var sections = document.querySelectorAll('.home_gear1_info_container');
  var labels = document.querySelectorAll('.home_gear1_info_label');
  var progressBar = document.createElement('div');
  progressBar.className = 'section-progress';
  document.body.appendChild(progressBar);
  function updateActiveSection() {
    var scrollPosition = window.scrollY + window.innerHeight / 2;
    sections.forEach(function (section, index) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      var label = labels[index];
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        label.classList.add('active');
        var progress = (scrollPosition - sectionTop) / sectionHeight * 100;
        var totalProgress = (index + progress / 100) / sections.length * 100;
        progressBar.style.setProperty('--progress', totalProgress + '%');
      } else {
        label.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', updateActiveSection);
  updateActiveSection();
  labels.forEach(function (label, index) {
    label.style.cursor = 'pointer';
    label.addEventListener('click', function () {
      sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });
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
__webpack_require__(/*! ./home/home-gear1.js */ "./IREV/src/js/home/home-gear1.js");
__webpack_require__(/*! ./home/home-gear2.js */ "./IREV/src/js/home/home-gear2.js");
__webpack_require__(/*! ./home/home-gear3.js */ "./IREV/src/js/home/home-gear3.js");
__webpack_require__(/*! ./home/home-gear5.js */ "./IREV/src/js/home/home-gear5.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQzNCK00sbUJBQU8sQ0FBQyw0Q0FBYSxDQUFDO0FBQ3RCQSxtQkFBTyxDQUFDLHNFQUEwQixDQUFDO0FBQ25DQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDBFQUE0QixDQUFDO0FBQ3JDQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDO0FBQy9CQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjEuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIzLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjUuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9zY3NzL2luZGV4LnNjc3M/NzI0YSIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHNlY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjFfaW5mb19jb250YWluZXInKTtcclxuICAgIGNvbnN0IGxhYmVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIxX2luZm9fbGFiZWwnKTtcclxuXHJcbiAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgcHJvZ3Jlc3NCYXIuY2xhc3NOYW1lID0gJ3NlY3Rpb24tcHJvZ3Jlc3MnO1xyXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChwcm9ncmVzc0Jhcik7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlU2VjdGlvbigpIHtcclxuICAgICAgICBjb25zdCBzY3JvbGxQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZICsgd2luZG93LmlubmVySGVpZ2h0IC8gMjtcclxuXHJcbiAgICAgICAgc2VjdGlvbnMuZm9yRWFjaCgoc2VjdGlvbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2VjdGlvblRvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzZWN0aW9uSGVpZ2h0ID0gc2VjdGlvbi5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gbGFiZWxzW2luZGV4XTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzZWN0aW9uVG9wICYmIHNjcm9sbFBvc2l0aW9uIDwgc2VjdGlvblRvcCArIHNlY3Rpb25IZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIGxhYmVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gKChzY3JvbGxQb3NpdGlvbiAtIHNlY3Rpb25Ub3ApIC8gc2VjdGlvbkhlaWdodCkgKiAxMDA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0b3RhbFByb2dyZXNzID0gKChpbmRleCArIHByb2dyZXNzIC8gMTAwKSAvIHNlY3Rpb25zLmxlbmd0aCkgKiAxMDA7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzc0Jhci5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wcm9ncmVzcycsIHRvdGFsUHJvZ3Jlc3MgKyAnJScpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGFiZWwuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXBkYXRlQWN0aXZlU2VjdGlvbik7XHJcblxyXG4gICAgdXBkYXRlQWN0aXZlU2VjdGlvbigpO1xyXG5cclxuICAgIGxhYmVscy5mb3JFYWNoKChsYWJlbCwgaW5kZXgpID0+IHtcclxuICAgICAgICBsYWJlbC5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XHJcbiAgICAgICAgbGFiZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNlY3Rpb25zW2luZGV4XS5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXHJcbiAgICAgICAgICAgICAgICBibG9jazogJ2NlbnRlcidcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSk7IiwiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyJyk7XHJcbmNvbnN0IG5pdHJvSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5pdHJvLWVmZmVjdCBpbWcnKTtcclxuY29uc3QgcmV2VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcl9yZXYnKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG5cclxudXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGF2YXRhckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtIGJ1dHRvblwiKTtcclxuICAgIGNvbnN0IHJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c1wiKTtcclxuICAgIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gY2VudGVyUmV2aWV3KHRhcmdldENsaWVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXRDbGllbnR9XCJdYCk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZXZpZXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSByZXZpZXdzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IHJldmlld1dpZHRoID0gYWN0aXZlUmV2aWV3Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGdhcCA9IDQwO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXdJbmRleCA9IEFycmF5LmZyb20ocmV2aWV3cykuaW5kZXhPZihhY3RpdmVSZXZpZXcpO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSByZXZpZXdJbmRleCAqIChyZXZpZXdXaWR0aCArIGdhcCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKGNvbnRhaW5lcldpZHRoIC8gMikgLSAocmV2aWV3V2lkdGggLyAyKSAtIHRvdGFsSXRlbXNXaWR0aDtcclxuXHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC42cyBlYXNlXCI7XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFJldmlldyh0YXJnZXQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtXCIpLmZvckVhY2goYSA9PiBhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcbiAgICAgICAgcmV2aWV3cy5mb3JFYWNoKHIgPT4gci5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hdmF0YXItaXRlbSBidXR0b25bZGF0YS10cmlnZ2VyPVwiJHt0YXJnZXR9XCJdYCkuY2xvc2VzdChcIi5hdmF0YXItaXRlbVwiKTtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0fVwiXWApO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIgJiYgYWN0aXZlUmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgYWN0aXZlUmV2aWV3LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgY2VudGVyUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRDZW50ZXJSZXZpZXcoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFRhcmdldCA9IGluaXRpYWxTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJSZXZpZXcoaW5pdGlhbFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDZW50ZXJSZXZpZXcoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50U2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNlbnRlclJldmlldyhjdXJyZW50VGFyZ2V0KSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIGNhc2VzXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2FzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXIgLmNhc2UnKTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgdHJpZ2dlck9mZnNldDogMC4zLFxyXG4gICAgICAgIHN0ZXBEZWxheTogMC4xNSxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJCb3R0b20gPSBjb250YWluZXJUb3AgKyBjb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlclBvaW50ID0gd2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJUb3AgPCB3aW5kb3dIZWlnaHQgLSB0cmlnZ2VyUG9pbnQgJiYgY29udGFpbmVyQm90dG9tID4gdHJpZ2dlclBvaW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPSBNYXRoLm1pbihjb250YWluZXJCb3R0b20sIHdpbmRvd0hlaWdodCkgLSBNYXRoLm1heChjb250YWluZXJUb3AsIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxhYmxlID0gY29udGFpbmVySGVpZ2h0IC0gd2luZG93SGVpZ2h0ICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtY29udGFpbmVyVG9wICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBzY3JvbGxlZCAvIG1heFNjcm9sbGFibGUpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goKGNhc2VFbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGluZGV4ICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goY2FzZUVsID0+IHtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX2l0ZW0nKTtcclxuXHJcbiAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3BlbkJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLm9wZW4nKTtcclxuICAgICAgICBjb25zdCBjbG9zZUJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XHJcblxyXG4gICAgICAgIGlmIChvcGVuQnRuKSB7XHJcbiAgICAgICAgICAgIG9wZW5CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjbG9zZUJ0bikge1xyXG4gICAgICAgICAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9ucykge1xyXG4gICAgICAgIG9wZW5CdXR0b25zLmZvckVhY2gob3BlbkJ1dHRvbj0+e1xyXG4gICAgICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXIgc3BhbicpO1xyXG4gICAgY29uc3QgY291bnRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyJyk7XHJcbiAgICBjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3NpZ25JbicpO1xyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtjb3VudGVyRGl2LCBzaWduSW5CdXR0b24sIHRlc3REcml2ZUJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG5cclxuXHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxuICAgIGNvbnN0IHBvbGljeUNoZWNrYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvbGljeUNoZWNrYm94Jyk7XHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0QnV0dG9uJyk7XHJcblxyXG4gICAgaWYgKHBvbGljeUNoZWNrYm94ICYmIHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgIHBvbGljeUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IHBvbGljeUNoZWNrYm94LmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21DaGVja2JveCkge1xyXG4gICAgICAgICAgICBjdXN0b21DaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmNoZWNrZWQgPSAhcG9saWN5Q2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgIHBvbGljeUNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmIChwb2xpY3lDaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG4vLyBwYXJhbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1idXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybS1pbnB1dCcpO1xyXG5cclxuICAgIGlmIChzdWJtaXRCdXR0b24gJiYgZW1haWxJbnB1dCkge1xyXG4gICAgICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRlRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRW1haWwgc3VibWl0dGVkOicsIGVtYWlsKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnZXJyb3InKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzZXRGb3JtKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG4gICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNob3dFcnJvckluUGxhY2Vob2xkZXIoKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0Rm9ybSgpIHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCkge1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnRW50ZXIgZS1tYWlsJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QucmVtb3ZlKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSk7IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3MvaW5kZXguc2Nzc1wiXHJcbnJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMS5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMi5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMy5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNS5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJtZW51SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZHJvcGRvd25UcmlnZ2VycyIsImRyb3Bkb3duQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiZm9yRWFjaCIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsInN0eWxlIiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJtYXRjaGVzIiwiZSIsImtleSIsInNlY3Rpb25zIiwibGFiZWxzIiwicHJvZ3Jlc3NCYXIiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYm9keSIsImFwcGVuZENoaWxkIiwidXBkYXRlQWN0aXZlU2VjdGlvbiIsInNjcm9sbFBvc2l0aW9uIiwid2luZG93Iiwic2Nyb2xsWSIsImlubmVySGVpZ2h0Iiwic2VjdGlvbiIsImluZGV4Iiwic2VjdGlvblRvcCIsIm9mZnNldFRvcCIsInNlY3Rpb25IZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJsYWJlbCIsInByb2dyZXNzIiwidG90YWxQcm9ncmVzcyIsInNldFByb3BlcnR5IiwiY3Vyc29yIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiY29udGFpbmVyIiwibml0cm9JbWciLCJyZXZUZXh0IiwidXBkYXRlU2Nyb2xsQW5pbWF0aW9uIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpbmRvd0hlaWdodCIsInRvcCIsIk1hdGgiLCJtaW4iLCJtYXgiLCJzaGlmdCIsIm9mZnNldFdpZHRoIiwiaW5uZXJXaWR0aCIsInRyYW5zZm9ybSIsIm9uU2Nyb2xsIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYXZhdGFyQnV0dG9ucyIsInJldmlld3NDb250YWluZXIiLCJyZXZpZXdzIiwiY2VudGVyUmV2aWV3IiwidGFyZ2V0Q2xpZW50IiwiYWN0aXZlUmV2aWV3IiwiY29udGFpbmVyV2lkdGgiLCJyZXZpZXdXaWR0aCIsImdhcCIsInJldmlld0luZGV4IiwiQXJyYXkiLCJmcm9tIiwiaW5kZXhPZiIsInRvdGFsSXRlbXNXaWR0aCIsIm9mZnNldCIsInRyYW5zaXRpb24iLCJzd2l0Y2hSZXZpZXciLCJ0YXJnZXQiLCJhIiwiciIsInNlbGVjdGVkQXZhdGFyIiwiY2xvc2VzdCIsImJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsImluaXRDZW50ZXJSZXZpZXciLCJpbml0aWFsU2VsZWN0ZWQiLCJpbml0aWFsVGFyZ2V0IiwiY3VycmVudFNlbGVjdGVkIiwiY3VycmVudFRhcmdldCIsImNhc2VzIiwiY29uZmlnIiwidHJpZ2dlck9mZnNldCIsInN0ZXBEZWxheSIsImFuaW1hdGlvbkRpc3RhbmNlIiwiaGFuZGxlU2Nyb2xsQW5pbWF0aW9uIiwiY29udGFpbmVyUmVjdCIsImNvbnRhaW5lclRvcCIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsZWQiLCJzY3JvbGxQcm9ncmVzcyIsImNhc2VFbCIsInRocmVzaG9sZCIsInRpY2tpbmciLCJwYXNzaXZlIiwiYWNjb3JkaW9uSXRlbXMiLCJvcGVuQnRuIiwiY2xvc2VCdG4iLCJwb3B1cE92ZXJsYXkiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJvcGVuQnV0dG9ucyIsInRpbWVyRWxlbWVudCIsInRpbWVySW50ZXJ2YWwiLCJzdGFydFRpbWVyIiwidG90YWxTZWNvbmRzIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZm9ybWF0dGVkVGltZSIsIlN0cmluZyIsInBhZFN0YXJ0IiwidGV4dENvbnRlbnQiLCJ0aW1lckNvbXBsZXRlIiwic3RvcFRpbWVyIiwicmVzZXRUaW1lciIsImNvbnNvbGUiLCJsb2ciLCJvcGVuUG9wdXAiLCJvdmVyZmxvdyIsImNsb3NlUG9wdXAiLCJvcGVuQnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJ2aWRlbyIsImdldEVsZW1lbnRCeUlkIiwidmlkZW9Db250YWluZXIiLCJwbGF5QnV0dG9uIiwidXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkiLCJwYXVzZWQiLCJwbGF5IiwicGF1c2UiLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJ0ZXN0RHJpdmVCdXR0b24iLCJpbnB1dCIsImVsZW1lbnRzIiwidXBkYXRlVGltZXIiLCJlbGVtZW50IiwiaHVuZHJlZHRocyIsImZvcm1hdHRlZFNlY29uZHMiLCJ0b1N0cmluZyIsImZvcm1hdHRlZEh1bmRyZWR0aHMiLCJtYWluRW1haWxJbnB1dCIsInBvcHVwRW1haWxJbnB1dCIsInZhbHVlIiwicG9saWN5Q2hlY2tib3giLCJzdWJtaXRCdXR0b24iLCJ1cGRhdGVCdXR0b25TdGF0ZSIsImNoZWNrZWQiLCJjdXN0b21DaGVja2JveCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsInBhcmFsbGF4SW1nIiwibWF0Y2hNZWRpYSIsInVwZGF0ZVBhcmFsbGF4IiwicGFnZVlPZmZzZXQiLCJzcGVlZCIsImRvY3VtZW50RWxlbWVudCIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwiY3VycmVudFRpbWUiLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwicmVzZXRGb3JtIiwiY29udGFpbnMiLCJlbWFpbElucHV0IiwiZW1haWwiLCJ0cmltIiwidmFsaWRhdGVFbWFpbCIsInNob3dFcnJvckluUGxhY2Vob2xkZXIiLCJlbWFpbFJlZ2V4IiwidGVzdCIsInBsYWNlaG9sZGVyIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=