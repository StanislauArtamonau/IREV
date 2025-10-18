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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0QsRTs7Ozs7Ozs7Ozs7OztBQ04yQjtBQUMzQk0sbUJBQU8sQ0FBQyw0Q0FBYSxDQUFDO0FBQ3RCQSxtQkFBTyxDQUFDLHNFQUEwQixDQUFDO0FBQ25DQSxtQkFBTyxDQUFDLDhEQUFzQixDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBvcHVwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF91cHBlciBidXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50IGZvcm0nKTtcclxuICAgIGNvbnN0IG9wZW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9uKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBvcGVuUG9wdXAoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgdGVzdERyaXZlQnV0dG9uLCBpbnB1dF07XHJcblxyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDMgKiAxMDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIoKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvbmUnLCAndHdvJykpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ28nKSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gJzAwOjAwLDAwJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMTAwKTtcclxuICAgICAgICBjb25zdCBodW5kcmVkdGhzID0gdG90YWxTZWNvbmRzICUgMTAwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHVuZHJlZHRocyA9IGh1bmRyZWR0aHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAwMDoke2Zvcm1hdHRlZFNlY29uZHN9LCR7Zm9ybWF0dGVkSHVuZHJlZHRoc31gO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRvdGFsU2Vjb25kcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMjAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb25lJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zY3NzL2luZGV4LnNjc3NcIlxyXG5yZXF1aXJlKCcuL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1yZXByZXNlbnQuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcG9wdXAuanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsImZvckVhY2giLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwibWF0Y2hlcyIsImUiLCJrZXkiLCJwb3B1cE92ZXJsYXkiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJvcGVuQnV0dG9uIiwidGltZXJFbGVtZW50IiwidGltZXJJbnRlcnZhbCIsInN0YXJ0VGltZXIiLCJ0b3RhbFNlY29uZHMiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJob3VycyIsIk1hdGgiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZm9ybWF0dGVkVGltZSIsIlN0cmluZyIsInBhZFN0YXJ0IiwidGV4dENvbnRlbnQiLCJ0aW1lckNvbXBsZXRlIiwic3RvcFRpbWVyIiwicmVzZXRUaW1lciIsImNvbnNvbGUiLCJsb2ciLCJvcGVuUG9wdXAiLCJib2R5Iiwib3ZlcmZsb3ciLCJjbG9zZVBvcHVwIiwicHJldmVudERlZmF1bHQiLCJ0YXJnZXQiLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJ0ZXN0RHJpdmVCdXR0b24iLCJpbnB1dCIsImVsZW1lbnRzIiwidXBkYXRlVGltZXIiLCJlbGVtZW50IiwiaHVuZHJlZHRocyIsImZvcm1hdHRlZFNlY29uZHMiLCJ0b1N0cmluZyIsImZvcm1hdHRlZEh1bmRyZWR0aHMiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==