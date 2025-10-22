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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Yy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIzLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvc2Nzcy9pbmRleC5zY3NzIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX21lbnVfaXRlbScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLXRyaWdnZXJdJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfZHJvcGRvd25fY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKTtcclxuICAgIGxldCBjbG9zZVRpbWVvdXQ7XHJcbiAgICBsZXQgbGVhdmVUaW1lb3V0O1xyXG4gICAgbGV0IGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG5cclxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChsZWF2ZVRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSBpdGVtICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxlYXZlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IHRoaXMgJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd25UeXBlID0gdGhpcy5kYXRhc2V0LmRyb3Bkb3duVHJpZ2dlcjtcclxuICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGRyb3Bkb3duVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChkcm9wZG93bkNvbnRhaW5lcikge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dChjbG9zZUFsbERyb3Bkb3ducywgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24odHlwZSkge1xyXG4gICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKGZhbHNlKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3Bkb3duLWNvbnRlbnQ9XCIke3R5cGV9XCJdYCk7XHJcbiAgICAgICAgaWYgKHRhcmdldENvbnRlbnQpIHRhcmdldENvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbERyb3Bkb3ducyhjbGVhckFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHQgPT4gdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT3ZlckRyb3Bkb3duKCkge1xyXG4gICAgICAgIHJldHVybiBkcm9wZG93bkNvbnRhaW5lci5tYXRjaGVzKCc6aG92ZXInKSB8fFxyXG4gICAgICAgICAgICAoYWN0aXZlVHJpZ2dlciAmJiBhY3RpdmVUcmlnZ2VyLm1hdGNoZXMoJzpob3ZlcicpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyJyk7XHJcbmNvbnN0IG5pdHJvSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5pdHJvLWVmZmVjdCBpbWcnKTtcclxuY29uc3QgcmV2VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcl9yZXYnKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG5cclxudXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGF2YXRhckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtIGJ1dHRvblwiKTtcclxuICAgIGNvbnN0IHJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c1wiKTtcclxuICAgIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gY2VudGVyUmV2aWV3KHRhcmdldENsaWVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXRDbGllbnR9XCJdYCk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZXZpZXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSByZXZpZXdzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IHJldmlld1dpZHRoID0gYWN0aXZlUmV2aWV3Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGdhcCA9IDQwO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXdJbmRleCA9IEFycmF5LmZyb20ocmV2aWV3cykuaW5kZXhPZihhY3RpdmVSZXZpZXcpO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSByZXZpZXdJbmRleCAqIChyZXZpZXdXaWR0aCArIGdhcCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKGNvbnRhaW5lcldpZHRoIC8gMikgLSAocmV2aWV3V2lkdGggLyAyKSAtIHRvdGFsSXRlbXNXaWR0aDtcclxuXHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC42cyBlYXNlXCI7XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFJldmlldyh0YXJnZXQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtXCIpLmZvckVhY2goYSA9PiBhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcbiAgICAgICAgcmV2aWV3cy5mb3JFYWNoKHIgPT4gci5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hdmF0YXItaXRlbSBidXR0b25bZGF0YS10cmlnZ2VyPVwiJHt0YXJnZXR9XCJdYCkuY2xvc2VzdChcIi5hdmF0YXItaXRlbVwiKTtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0fVwiXWApO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIgJiYgYWN0aXZlUmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgYWN0aXZlUmV2aWV3LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgY2VudGVyUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRDZW50ZXJSZXZpZXcoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFRhcmdldCA9IGluaXRpYWxTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJSZXZpZXcoaW5pdGlhbFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDZW50ZXJSZXZpZXcoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50U2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNlbnRlclJldmlldyhjdXJyZW50VGFyZ2V0KSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIGNhc2VzXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2FzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXIgLmNhc2UnKTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgdHJpZ2dlck9mZnNldDogMC4zLFxyXG4gICAgICAgIHN0ZXBEZWxheTogMC4xNSxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJCb3R0b20gPSBjb250YWluZXJUb3AgKyBjb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlclBvaW50ID0gd2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJUb3AgPCB3aW5kb3dIZWlnaHQgLSB0cmlnZ2VyUG9pbnQgJiYgY29udGFpbmVyQm90dG9tID4gdHJpZ2dlclBvaW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPSBNYXRoLm1pbihjb250YWluZXJCb3R0b20sIHdpbmRvd0hlaWdodCkgLSBNYXRoLm1heChjb250YWluZXJUb3AsIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxhYmxlID0gY29udGFpbmVySGVpZ2h0IC0gd2luZG93SGVpZ2h0ICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtY29udGFpbmVyVG9wICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBzY3JvbGxlZCAvIG1heFNjcm9sbGFibGUpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goKGNhc2VFbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGluZGV4ICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goY2FzZUVsID0+IHtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcG9wdXBPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfb3ZlcmxheScpO1xyXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X3VwcGVyIGJ1dHRvbicpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnQgZm9ybScpO1xyXG4gICAgY29uc3Qgb3BlbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbGFiZWxfd3JhcHBlcl9jb3VudGVyJyk7XHJcblxyXG4gICAgbGV0IHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgbGV0IHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7XHJcblxyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRvdGFsU2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgICAgICAgICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID1cclxuICAgICAgICAgICAgICAgIFN0cmluZyhob3VycykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFRpbWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoLS10b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDowMDowMFwiO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldFRpbWVyKCkge1xyXG4gICAgICAgIHN0b3BUaW1lcigpO1xyXG4gICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gXCIwMDoxNTowMFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lckNvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KLQsNC50LzQtdGAINC30LDQstC10YDRiNC10L0hXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICAgICAgICAgIHJlc2V0VGltZXIoKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wZW5CdXR0b24pIHtcclxuICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIG9wZW5Qb3B1cCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbG9zZUJ1dHRvbikge1xyXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgIHBvcHVwT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gdmlkZW9cclxuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVmlkZW8nKTtcclxuICAgIGNvbnN0IHZpZGVvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sb3dlcl9yaWdodGNvbnRfdmlkZW8nKTtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTsgLy8g0L3QsNGF0L7QtNC40Lwg0LjQt9C+0LHRgNCw0LbQtdC90LjQtSDQutC90L7Qv9C60LggcGxheVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCkge1xyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIH0pO1xyXG5cclxuICAgIHZpZGVvQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpO1xyXG59KTtcclxuXHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyIHNwYW4nKTtcclxuICAgIGNvbnN0IGNvdW50ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlcicpO1xyXG4gICAgY29uc3Qgc2lnbkluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9zaWduSW4nKTtcclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbY291bnRlckRpdiwgc2lnbkluQnV0dG9uLCB0ZXN0RHJpdmVCdXR0b24sIGlucHV0XTtcclxuXHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMyAqIDEwMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcigpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMtLTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29uZScsICd0d28nKSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnbycpKTtcclxuICAgICAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnMDA6MDAsMDAnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAxMDApO1xyXG4gICAgICAgIGNvbnN0IGh1bmRyZWR0aHMgPSB0b3RhbFNlY29uZHMgJSAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRIdW5kcmVkdGhzID0gaHVuZHJlZHRocy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gYDAwOiR7Zm9ybWF0dGVkU2Vjb25kc30sJHtmb3JtYXR0ZWRIdW5kcmVkdGhzfWA7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodG90YWxTZWNvbmRzKXtcclxuICAgICAgICAgICAgY2FzZSAyMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvbmUnKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuXHJcblxyXG4gICAgLy8gZW1haWwgc2F2ZVxyXG5cclxuICAgIGNvbnN0IG1haW5FbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgbWFpbkVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWFpbkVtYWlsSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gbWFpbkVtYWlsSW5wdXQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrYm94IHNhdmVcclxuXHJcbiAgICBjb25zdCBwb2xpY3lDaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb2xpY3lDaGVja2JveCcpO1xyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdEJ1dHRvbicpO1xyXG5cclxuICAgIGlmIChwb2xpY3lDaGVja2JveCAmJiBzdWJtaXRCdXR0b24pIHtcclxuICAgICAgICBwb2xpY3lDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBwb2xpY3lDaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lDaGVja2JveC5jaGVja2VkID0gIXBvbGljeUNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICBwb2xpY3lDaGVja2JveC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgICAgICAgICBpZiAocG9saWN5Q2hlY2tib3guY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuLy8gcGFyYWxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9iYWNrZ3JvdW5kSW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHZpZGVvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9sb3dlcldyYXBwZXJfdmlkZW8nKTtcclxuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbE92ZXJsYXknKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsVmlkZW8gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFZpZGVvID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fcGxheWVyIGJ1dHRvbicpIDogbnVsbDtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbFBsYXlJbWcgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX2NvbnQgaW1nJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxQbGF5SW1nID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC12aWRlbyBpbWcnKSA6IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICBpZiAoIW9yaWdpbmFsVmlkZW8gfHwgIW1vZGFsVmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldEZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlkZW9XcmFwcGVyICYmIG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIHZpZGVvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8g0J/RgNC+0LLQtdGA0Y/QtdC8LCDRh9GC0L4g0LrQu9C40Log0L3QtSDQv9C+INC60L3QvtC/0LrQtSDRg9C/0YDQsNCy0LvQtdC90LjRjyDQsiB2aWRlb19wbGF5ZXJcclxuICAgICAgICAgICAgaWYgKCFwbGF5QnV0dG9uIHx8ICFwbGF5QnV0dG9uLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIG9yaWdpbmFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8pIHtcclxuICAgICAgICBtb2RhbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAobW9kYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tYnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0taW5wdXQnKTtcclxuXHJcbiAgICBpZiAoc3VibWl0QnV0dG9uICYmIGVtYWlsSW5wdXQpIHtcclxuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICh2YWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VtYWlsIHN1Ym1pdHRlZDonLCBlbWFpbCk7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaG93RXJyb3JJblBsYWNlaG9sZGVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2Vycm9yJykpIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0Rm9ybSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICAgICAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzaG93RXJyb3JJblBsYWNlaG9sZGVyKCkge1xyXG4gICAgICAgIGlmIChlbWFpbElucHV0KSB7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5wbGFjZWhvbGRlciA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QuYWRkKCdlcnJvcicpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldEZvcm0oKSB7XHJcbiAgICAgICAgaWYgKGVtYWlsSW5wdXQpIHtcclxuICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ0VudGVyIGUtbWFpbCc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zY3NzL2luZGV4LnNjc3NcIlxyXG5yZXF1aXJlKCcuL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1yZXByZXNlbnQuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjMuanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsImZvckVhY2giLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwibWF0Y2hlcyIsImUiLCJrZXkiLCJjb250YWluZXIiLCJuaXRyb0ltZyIsInJldlRleHQiLCJ1cGRhdGVTY3JvbGxBbmltYXRpb24iLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2luZG93SGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJwcm9ncmVzcyIsInRvcCIsIk1hdGgiLCJtaW4iLCJtYXgiLCJzaGlmdCIsIm9mZnNldFdpZHRoIiwiaW5uZXJXaWR0aCIsInRyYW5zZm9ybSIsIm9uU2Nyb2xsIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiYXZhdGFyQnV0dG9ucyIsInJldmlld3NDb250YWluZXIiLCJyZXZpZXdzIiwiY2VudGVyUmV2aWV3IiwidGFyZ2V0Q2xpZW50IiwiYWN0aXZlUmV2aWV3IiwiY29udGFpbmVyV2lkdGgiLCJyZXZpZXdXaWR0aCIsImdhcCIsInJldmlld0luZGV4IiwiQXJyYXkiLCJmcm9tIiwiaW5kZXhPZiIsInRvdGFsSXRlbXNXaWR0aCIsIm9mZnNldCIsInRyYW5zaXRpb24iLCJzd2l0Y2hSZXZpZXciLCJ0YXJnZXQiLCJhIiwiciIsInNlbGVjdGVkQXZhdGFyIiwiY2xvc2VzdCIsImJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsImluaXRDZW50ZXJSZXZpZXciLCJpbml0aWFsU2VsZWN0ZWQiLCJpbml0aWFsVGFyZ2V0IiwiY3VycmVudFNlbGVjdGVkIiwiY3VycmVudFRhcmdldCIsImNhc2VzIiwiY29uZmlnIiwidHJpZ2dlck9mZnNldCIsInN0ZXBEZWxheSIsImFuaW1hdGlvbkRpc3RhbmNlIiwiaGFuZGxlU2Nyb2xsQW5pbWF0aW9uIiwiY29udGFpbmVyUmVjdCIsImNvbnRhaW5lclRvcCIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsZWQiLCJzY3JvbGxQcm9ncmVzcyIsImNhc2VFbCIsImluZGV4IiwidGhyZXNob2xkIiwidGlja2luZyIsInBhc3NpdmUiLCJwb3B1cE92ZXJsYXkiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJvcGVuQnV0dG9uIiwidGltZXJFbGVtZW50IiwidGltZXJJbnRlcnZhbCIsInN0YXJ0VGltZXIiLCJ0b3RhbFNlY29uZHMiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJmb3JtYXR0ZWRUaW1lIiwiU3RyaW5nIiwicGFkU3RhcnQiLCJ0ZXh0Q29udGVudCIsInRpbWVyQ29tcGxldGUiLCJzdG9wVGltZXIiLCJyZXNldFRpbWVyIiwiY29uc29sZSIsImxvZyIsIm9wZW5Qb3B1cCIsImJvZHkiLCJvdmVyZmxvdyIsImNsb3NlUG9wdXAiLCJwcmV2ZW50RGVmYXVsdCIsInZpZGVvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aWRlb0NvbnRhaW5lciIsInBsYXlCdXR0b24iLCJ1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSIsInBhdXNlZCIsInBsYXkiLCJwYXVzZSIsImNvdW50ZXJFbGVtZW50IiwiY291bnRlckRpdiIsInNpZ25JbkJ1dHRvbiIsInRlc3REcml2ZUJ1dHRvbiIsImlucHV0IiwiZWxlbWVudHMiLCJ1cGRhdGVUaW1lciIsImVsZW1lbnQiLCJodW5kcmVkdGhzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInRvU3RyaW5nIiwiZm9ybWF0dGVkSHVuZHJlZHRocyIsIm1haW5FbWFpbElucHV0IiwicG9wdXBFbWFpbElucHV0IiwidmFsdWUiLCJwb2xpY3lDaGVja2JveCIsInN1Ym1pdEJ1dHRvbiIsInVwZGF0ZUJ1dHRvblN0YXRlIiwiY2hlY2tlZCIsImN1c3RvbUNoZWNrYm94IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwicGFyYWxsYXhJbWciLCJtYXRjaE1lZGlhIiwidXBkYXRlUGFyYWxsYXgiLCJwYWdlWU9mZnNldCIsInNwZWVkIiwiZG9jdW1lbnRFbGVtZW50Iiwic2V0UHJvcGVydHkiLCJ2aWRlb1dyYXBwZXIiLCJtb2RhbE92ZXJsYXkiLCJvcmlnaW5hbFZpZGVvIiwibW9kYWxWaWRlbyIsIm9yaWdpbmFsUGxheUltZyIsIm1vZGFsUGxheUltZyIsImN1cnJlbnRUaW1lIiwidG9nZ2xlUGxheUJ1dHRvbiIsInBsYXlJbWciLCJzZXR1cFZpZGVvTGlzdGVuZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwib3Blbk1vZGFsV2l0aFZpZGVvIiwiY2xvc2VNb2RhbCIsInJlc2V0Rm9ybSIsImNvbnRhaW5zIiwiZW1haWxJbnB1dCIsImVtYWlsIiwidHJpbSIsInZhbGlkYXRlRW1haWwiLCJzaG93RXJyb3JJblBsYWNlaG9sZGVyIiwiZW1haWxSZWdleCIsInRlc3QiLCJwbGFjZWhvbGRlciIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9