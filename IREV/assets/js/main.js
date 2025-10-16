/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./IREV/src/js/header.js":
/*!*******************************!*\
  !*** ./IREV/src/js/header.js ***!
  \*******************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
  var dropdownContainer = document.querySelector('.nav_dropdown_container');
  var dropdownContents = document.querySelectorAll('[data-dropdown-content]');
  dropdownTriggers.forEach(function (trigger) {
    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var dropdownType = this.getAttribute('data-dropdown-trigger');
      var isActive = this.classList.contains('active');
      if (isActive) {
        closeAllDropdowns();
      } else {
        openDropdown(dropdownType, this);
      }
    });
  });
  function openDropdown(type, trigger) {
    closeAllDropdowns();
    dropdownContainer.classList.add('active');
    trigger.classList.add('active');
    var targetContent = document.querySelector("[data-dropdown-content=\"".concat(type, "\"]"));
    if (targetContent) {
      targetContent.style.display = 'flex';
    }
  }
  function closeAllDropdowns() {
    dropdownContainer.classList.remove('active');
    dropdownTriggers.forEach(function (trigger) {
      trigger.classList.remove('active');
    });
    dropdownContents.forEach(function (content) {
      content.style.display = 'none';
    });
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.header_nav')) {
      closeAllDropdowns();
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllDropdowns();
    }
  });
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YUFBYTtXQUM3RCxFOzs7Ozs7Ozs7Ozs7O0FDTjJCO0FBQzNCYSxtQkFBTyxDQUFDLDRDQUFhLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2Nzcz83MjRhIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdHJpZ2dlcl0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9kcm9wZG93bl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi1jb250ZW50XScpO1xyXG5cclxuICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93blR5cGUgPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1kcm9wZG93bi10cmlnZ2VyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzQWN0aXZlID0gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGRyb3Bkb3duVHlwZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bih0eXBlLCB0cmlnZ2VyKSB7XHJcbiAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuXHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB7XHJcbiAgICAgICAgICAgIHRhcmdldENvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKCFlLnRhcmdldC5jbG9zZXN0KCcuaGVhZGVyX25hdicpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zY3NzL2luZGV4LnNjc3NcIlxyXG5yZXF1aXJlKCcuL2hlYWRlci5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkcm9wZG93blRyaWdnZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvciIsImRyb3Bkb3duQ29udGVudHMiLCJmb3JFYWNoIiwidHJpZ2dlciIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJkcm9wZG93blR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJpc0FjdGl2ZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwiYWRkIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsInN0eWxlIiwiZGlzcGxheSIsInJlbW92ZSIsImNvbnRlbnQiLCJ0YXJnZXQiLCJjbG9zZXN0Iiwia2V5IiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=