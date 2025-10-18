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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDOzs7Ozs7Ozs7Ozs7QUN2TUY7Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ04yQjtBQUMzQjZHLG1CQUFPLENBQUMsNENBQWEsQ0FBQztBQUN0QkEsbUJBQU8sQ0FBQyxzRUFBMEIsQ0FBQztBQUNuQ0EsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQywwRUFBNEIsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBvcHVwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF91cHBlciBidXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50IGZvcm0nKTtcclxuICAgIGNvbnN0IG9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9uKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBvcGVuUG9wdXAoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIHZpZGVvXHJcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFZpZGVvJyk7XHJcbiAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbG93ZXJfcmlnaHRjb250X3ZpZGVvJyk7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9Db250YWluZXIucXVlcnlTZWxlY3RvcignaW1nJyk7IC8vINC90LDRhdC+0LTQuNC8INC40LfQvtCx0YDQsNC20LXQvdC40LUg0LrQvdC+0L/QutC4IHBsYXlcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2aWRlb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKTtcclxufSk7XHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgdGVzdERyaXZlQnV0dG9uLCBpbnB1dF07XHJcblxyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDMgKiAxMDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIoKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvbmUnLCAndHdvJykpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ28nKSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gJzAwOjAwLDAwJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMTAwKTtcclxuICAgICAgICBjb25zdCBodW5kcmVkdGhzID0gdG90YWxTZWNvbmRzICUgMTAwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHVuZHJlZHRocyA9IGh1bmRyZWR0aHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAwMDoke2Zvcm1hdHRlZFNlY29uZHN9LCR7Zm9ybWF0dGVkSHVuZHJlZHRoc31gO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRvdGFsU2Vjb25kcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMjAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb25lJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcblxyXG5cclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG4gICAgY29uc3QgcG9wdXBFbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9mb3JtX2lucHV0cyBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuXHJcbiAgICBpZiAobWFpbkVtYWlsSW5wdXQgJiYgcG9wdXBFbWFpbElucHV0KSB7XHJcbiAgICAgICAgbWFpbkVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja2JveCBzYXZlXHJcblxyXG4gICAgY29uc3QgcG9saWN5Q2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9saWN5Q2hlY2tib3gnKTtcclxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRCdXR0b24nKTtcclxuXHJcbiAgICBpZiAocG9saWN5Q2hlY2tib3ggJiYgc3VibWl0QnV0dG9uKSB7XHJcbiAgICAgICAgcG9saWN5Q2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1c3RvbUNoZWNrYm94ID0gcG9saWN5Q2hlY2tib3guY2xvc2VzdCgnLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgaWYgKGN1c3RvbUNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIGN1c3RvbUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgcG9saWN5Q2hlY2tib3guY2hlY2tlZCA9ICFwb2xpY3lDaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgcG9saWN5Q2hlY2tib3guZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICAgICAgaWYgKHBvbGljeUNoZWNrYm94LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB2aWRlb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfbG93ZXJXcmFwcGVyX3ZpZGVvJyk7XHJcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxPdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcmlnaW5hbFZpZGVvID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxWaWRlbyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBidXR0b24nKSA6IG51bGw7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxQbGF5SW1nID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19jb250IGltZycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsUGxheUltZyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gaW1nJykgOiBudWxsO1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlUGxheUJ1dHRvbih2aWRlbywgcGxheUltZykge1xyXG4gICAgICAgIGlmICghdmlkZW8gfHwgIXBsYXlJbWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBWaWRlb0xpc3RlbmVycyh2aWRlbywgcGxheUltZykge1xyXG4gICAgICAgIGlmICghdmlkZW8gfHwgIXBsYXlJbWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIHZpZGVvLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxWaWRlbyAmJiBvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICAgICAgdG9nZ2xlUGxheUJ1dHRvbihvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvICYmIG1vZGFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMobW9kYWxWaWRlbywgbW9kYWxQbGF5SW1nKTtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGxheUJ1dHRvbiAmJiBvcmlnaW5hbFZpZGVvKSB7XHJcbiAgICAgICAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbFdpdGhWaWRlbygpIHtcclxuICAgICAgICBpZiAoIW9yaWdpbmFsVmlkZW8gfHwgIW1vZGFsVmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wbGF5KCkuY2F0Y2goZSA9PiBjb25zb2xlLmxvZygnTW9kYWwgdmlkZW8gcGxheSBlcnJvcjonLCBlKSk7XHJcblxyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gbW9kYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVzZXRGb3JtKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZGVvV3JhcHBlciAmJiBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICB2aWRlb1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIC8vINCf0YDQvtCy0LXRgNGP0LXQvCwg0YfRgtC+INC60LvQuNC6INC90LUg0L/QviDQutC90L7Qv9C60LUg0YPQv9GA0LDQstC70LXQvdC40Y8g0LIgdmlkZW9fcGxheWVyXHJcbiAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbiB8fCAhcGxheUJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBvcmlnaW5hbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvKSB7XHJcbiAgICAgICAgbW9kYWxWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWJ1dHRvbicpO1xyXG4gICAgY29uc3QgZW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLWlucHV0Jyk7XHJcblxyXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbiAmJiBlbWFpbElucHV0KSB7XHJcbiAgICAgICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZW1haWxJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFbWFpbCBzdWJtaXR0ZWQ6JywgZW1haWwpO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc2hvd0Vycm9ySW5QbGFjZWhvbGRlcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdlcnJvcicpKSB7XHJcbiAgICAgICAgICAgICAgICByZXNldEZvcm0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2hvd0Vycm9ySW5QbGFjZWhvbGRlcigpIHtcclxuICAgICAgICBpZiAoZW1haWxJbnB1dCkge1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnZXJyb3InKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRGb3JtKCkge1xyXG4gICAgICAgIGlmIChlbWFpbElucHV0KSB7XHJcbiAgICAgICAgICAgIGVtYWlsSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgZW1haWxJbnB1dC5wbGFjZWhvbGRlciA9ICdFbnRlciBlLW1haWwnO1xyXG4gICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ2Vycm9yJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7Il0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1lbnVJdGVtcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkcm9wZG93blRyaWdnZXJzIiwiZHJvcGRvd25Db250YWluZXIiLCJxdWVyeVNlbGVjdG9yIiwiZHJvcGRvd25Db250ZW50cyIsImNsb3NlVGltZW91dCIsImxlYXZlVGltZW91dCIsImFjdGl2ZVRyaWdnZXIiLCJmb3JFYWNoIiwiaXRlbSIsImNsZWFyVGltZW91dCIsImkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJhZGQiLCJzZXRUaW1lb3V0IiwiaXNNb3VzZU92ZXJEcm9wZG93biIsImNsb3NlQWxsRHJvcGRvd25zIiwidHJpZ2dlciIsIl90aGlzIiwiZHJvcGRvd25UeXBlIiwiZGF0YXNldCIsImRyb3Bkb3duVHJpZ2dlciIsIm9wZW5Ecm9wZG93biIsInR5cGUiLCJ0YXJnZXRDb250ZW50IiwiY29uY2F0Iiwic3R5bGUiLCJkaXNwbGF5IiwiY2xlYXJBY3RpdmUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb250ZW50IiwidCIsIm1hdGNoZXMiLCJlIiwia2V5IiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbiIsInRpbWVyRWxlbWVudCIsInRpbWVySW50ZXJ2YWwiLCJzdGFydFRpbWVyIiwidG90YWxTZWNvbmRzIiwiY2xlYXJJbnRlcnZhbCIsInNldEludGVydmFsIiwiaG91cnMiLCJNYXRoIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwibWFpbkVtYWlsSW5wdXQiLCJwb3B1cEVtYWlsSW5wdXQiLCJ2YWx1ZSIsInBvbGljeUNoZWNrYm94Iiwic3VibWl0QnV0dG9uIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiY3VzdG9tQ2hlY2tib3giLCJjbG9zZXN0IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwidmlkZW9XcmFwcGVyIiwibW9kYWxPdmVybGF5Iiwib3JpZ2luYWxWaWRlbyIsIm1vZGFsVmlkZW8iLCJvcmlnaW5hbFBsYXlJbWciLCJtb2RhbFBsYXlJbWciLCJjdXJyZW50VGltZSIsInRvZ2dsZVBsYXlCdXR0b24iLCJwbGF5SW1nIiwic2V0dXBWaWRlb0xpc3RlbmVycyIsInN0b3BQcm9wYWdhdGlvbiIsIm9wZW5Nb2RhbFdpdGhWaWRlbyIsImNsb3NlTW9kYWwiLCJyZXNldEZvcm0iLCJjb250YWlucyIsImVtYWlsSW5wdXQiLCJlbWFpbCIsInRyaW0iLCJ2YWxpZGF0ZUVtYWlsIiwic2hvd0Vycm9ySW5QbGFjZWhvbGRlciIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwicGxhY2Vob2xkZXIiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==