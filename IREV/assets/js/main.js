/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./IREV/src/js/case/case-finish.js":
/*!*****************************************!*\
  !*** ./IREV/src/js/case/case-finish.js ***!
  \*****************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.case');
  if (!partnerSection) {
    return;
  }
  var testDriveButton = document.querySelector('.casefinishbutton');
  var input = document.querySelector('.casefinishinput');
  if (!testDriveButton || !input) {
    return;
  }
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
  // email save

  var partnerSection = document.querySelector('.case');
  if (!partnerSection) {
    return;
  }
  var mainEmailInput = document.querySelector('.casefinishinput');
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
});

/***/ }),

/***/ "./IREV/src/js/case/parallax.js":
/*!**************************************!*\
  !*** ./IREV/src/js/case/parallax.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);

_global__WEBPACK_IMPORTED_MODULE_0___default()('.case_represent_container', '.case_represent_back');
_global__WEBPACK_IMPORTED_MODULE_0___default()('.case_finish_lower', '.case_finish_back');
document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.case_c2_container');
  var labelWrappers = document.querySelectorAll('.case_c2_container .label_wrapper');
  var config = {
    triggerOffset: 0.2,
    stepDelay: 0.3,
    animationDistance: 30
  };
  function handleScrollAnimation() {
    if (!container) return;
    var containerRect = container.getBoundingClientRect();
    var containerTop = containerRect.top;
    var containerHeight = containerRect.height;
    var windowHeight = window.innerHeight;
    if (containerTop < windowHeight && containerRect.bottom > 0) {
      var progress = 1 - containerTop / (windowHeight - containerHeight);
      labelWrappers.forEach(function (wrapper, index) {
        var threshold = (index + 1) * config.stepDelay;
        if (progress >= threshold) {
          wrapper.classList.add('label_wrapper-visible');
          wrapper.classList.remove('label_wrapper-hidden');
        } else {
          wrapper.classList.add('label_wrapper-hidden');
          wrapper.classList.remove('label_wrapper-visible');
        }
      });
    } else {
      labelWrappers.forEach(function (wrapper) {
        wrapper.classList.add('label_wrapper-hidden');
        wrapper.classList.remove('label_wrapper-visible');
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
  labelWrappers.forEach(function (wrapper) {
    wrapper.classList.add('label_wrapper-hidden');
  });
  handleScrollAnimation();
  window.addEventListener('scroll', onScroll, {
    passive: true
  });
});

/***/ }),

/***/ "./IREV/src/js/global.js":
/*!*******************************!*\
  !*** ./IREV/src/js/global.js ***!
  \*******************************/
/***/ ((module) => {

function createParallax(parentClass, imgClass) {
  document.addEventListener('DOMContentLoaded', function () {
    var partnerSection = document.querySelector(parentClass);
    var parallaxImg = document.querySelector(imgClass);
    if (!partnerSection || !parallaxImg) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    var isActive = false;
    var animationFrameId = null;
    var intersectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          if (!isActive) {
            isActive = true;
            parallaxImg.classList.add('parallax');
            startParallax();
          }
        } else {
          if (isActive) {
            isActive = false;
            parallaxImg.classList.remove('parallax');
            stopParallax();
          }
        }
      });
    }, {
      rootMargin: '100px 0px'
    });
    function updateParallax() {
      if (!isActive) return;
      var rect = partnerSection.getBoundingClientRect();
      var scrolled = -rect.top;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      partnerSection.style.setProperty('--parallax-offset', offset);
      if (isActive) {
        animationFrameId = requestAnimationFrame(updateParallax);
      }
    }
    function startParallax() {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateParallax);
      }
    }
    function stopParallax() {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      partnerSection.style.setProperty('--parallax-offset', '0px');
    }
    intersectionObserver.observe(parallaxImg);
    window.addEventListener('beforeunload', stopParallax);
    return function () {
      stopParallax();
      intersectionObserver.disconnect();
    };
  });
}
module.exports = createParallax;

/***/ }),

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
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);

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

// parallax

_global__WEBPACK_IMPORTED_MODULE_0___default()('.home_gear3_container', '.home_gear3_background');

/***/ }),

/***/ "./IREV/src/js/home/home-gear4.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear4.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);
// parallax


_global__WEBPACK_IMPORTED_MODULE_0___default()('.home_gear4_lower_container', '.gear4back');

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

/***/ "./IREV/src/js/home/home-gear6.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear6.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);

_global__WEBPACK_IMPORTED_MODULE_0___default()('.home_gear6_container', '.home_gear6_container img');

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
  var totalSeconds = 15 * 60; // 15 минут
  var isTimerRunning = false;
  function startTimer() {
    if (!timerElement) return;
    if (isTimerRunning) return;
    isTimerRunning = true;
    totalSeconds = 15 * 60;
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    updateTimerDisplay();
    timerInterval = setInterval(function () {
      if (totalSeconds > 0) {
        totalSeconds--;
        if (popupOverlay && popupOverlay.style.display === 'block') {
          updateTimerDisplay();
        }
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
        timerComplete();
      }
    }, 1000);
  }
  function updateTimerDisplay() {
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor(totalSeconds % 3600 / 60);
    var seconds = totalSeconds % 60;
    var formattedTime = String(hours).padStart(2, '0') + ':' + String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
    timerElement.textContent = formattedTime;
  }
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
      isTimerRunning = false;
    }
  }
  function timerComplete() {
    console.log("Таймер завершен!");
    if (popupOverlay && popupOverlay.style.display === 'block') {
      closePopup();
    }
  }
  function openPopup() {
    if (popupOverlay) {
      popupOverlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
      setTimeout(function () {
        popupOverlay.classList.add('active');
        if (!isTimerRunning) {
          startTimer();
        } else {
          updateTimerDisplay();
        }
      }, 10);
    }
  }
  function closePopup() {
    if (popupOverlay) {
      popupOverlay.classList.remove('active');
      setTimeout(function () {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = '';
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
  var video = document.getElementById('popupVideo');
  var videoContainer = document.querySelector('.home_popup_content_lower_rightcont_video');
  var playButton = videoContainer.querySelector('img');
  function updatePlayButtonVisibility() {
    if (video.paused) {
      playButton.style.display = 'block';
    } else {
      playButton.style.display = 'none';
    }
  }
  if (video && videoContainer && playButton) {
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
  }
});

/***/ }),

/***/ "./IREV/src/js/home/home-represent.js":
/*!********************************************!*\
  !*** ./IREV/src/js/home/home-represent.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);

document.addEventListener('DOMContentLoaded', function () {
  var testDriveButton = document.querySelector('.home_represent_form_container_button');
  var input = document.querySelector('.home_represent_form_container_input');
  if (!testDriveButton || !input) {
    return;
  }
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
_global__WEBPACK_IMPORTED_MODULE_0___default()('.home', '.home_represent_backgroundImg');

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
  var originalTimer = videoWrapper ? videoWrapper.querySelector('.video_player span') : null;
  var modalTimer = modalOverlay ? modalOverlay.querySelector('.modal-video .video_player span') : null;
  var currentTime = 0;
  function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.floor(seconds % 60);
    return "".concat(mins.toString().padStart(2, '0'), ":").concat(secs.toString().padStart(2, '0'));
  }
  function updateTimer(video, timerElement) {
    if (!video || !timerElement) return;
    var remainingTime = video.duration - video.currentTime;
    timerElement.textContent = formatTime(remainingTime);
  }
  function togglePlayButton(video, playImg) {
    if (!video || !playImg) return;
    if (video.paused) {
      playImg.style.display = 'block';
    } else {
      playImg.style.display = 'none';
    }
  }
  function setupVideoListeners(video, playImg, timerElement) {
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
      if (timerElement) {
        updateTimer(video, timerElement);
      }
    });
    video.addEventListener('timeupdate', function () {
      updateTimer(video, timerElement);
    });
    video.addEventListener('loadedmetadata', function () {
      updateTimer(video, timerElement);
    });
  }
  if (originalVideo && originalPlayImg) {
    setupVideoListeners(originalVideo, originalPlayImg, originalTimer);
    togglePlayButton(originalVideo, originalPlayImg);
  }
  if (modalVideo && modalPlayImg) {
    setupVideoListeners(modalVideo, modalPlayImg, modalTimer);
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
    updateTimer(modalVideo, modalTimer);
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
    updateTimer(originalVideo, originalTimer);
  }
  if (videoWrapper && modalOverlay) {
    videoWrapper.addEventListener('click', function (e) {
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
  var itemPositions = [];
  function calculatePositions() {
    var sectionRect = carSection.getBoundingClientRect();
    itemPositions.length = 0;
    carItems.forEach(function (item, index) {
      var itemRect = item.getBoundingClientRect();
      var positionFromTop = itemRect.top - sectionRect.top;
      var normalizedPosition = positionFromTop / sectionRect.height * 100;
      itemPositions.push(normalizedPosition);
    });
  }
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 && rect.bottom >= 0;
  }
  function trackAnimationProgress() {
    var carRect = animatedCar.getBoundingClientRect();
    var sectionRect = carSection.getBoundingClientRect();
    var carProgress = (carRect.top - sectionRect.top) / sectionRect.height * 100;
    carItems.forEach(function (item, index) {
      var itemPosition = itemPositions[index];
      if (carProgress >= itemPosition - 5 && !item.classList.contains('revealed')) {
        item.classList.add('revealed');
      }
    });
  }
  function activateCarAnimation() {
    if (isElementInViewport(carSection)) {
      calculatePositions();
      animatedCar.style.animationPlayState = 'running';
      var animationInterval = setInterval(trackAnimationProgress, 100);
      setTimeout(function () {
        clearInterval(animationInterval);
        carItems.forEach(function (item) {
          return item.classList.add('revealed');
        });
      }, 10500);
      window.removeEventListener('scroll', activateCarAnimation);
    }
  }
  animatedCar.style.animationPlayState = 'paused';
  window.addEventListener('resize', calculatePositions);
  window.addEventListener('scroll', activateCarAnimation);
  setTimeout(function () {
    calculatePositions();
    activateCarAnimation();
  }, 100);
});
document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.ld');
  if (!partnerSection) {
    return;
  }
  var testDriveButton = document.querySelector('.ldc3button');
  var input = document.querySelector('.ldc3input');
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
  var partnerSection = document.querySelector('.ld');
  if (!partnerSection) {
    return;
  }
  var testDriveButton = document.querySelector('.ldfinishbutton');
  var input = document.querySelector('.ldfinishinput');
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

/***/ }),

/***/ "./IREV/src/js/lead-distribution/parallax.js":
/*!***************************************************!*\
  !*** ./IREV/src/js/lead-distribution/parallax.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
/* harmony import */ var _global__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_global__WEBPACK_IMPORTED_MODULE_0__);


// represent

_global__WEBPACK_IMPORTED_MODULE_0___default()('.lead_distribution_represent', '.back_ld_represent');

// component3

_global__WEBPACK_IMPORTED_MODULE_0___default()('.lead_distribution_c3', '.ld_c3_back');

// finish

_global__WEBPACK_IMPORTED_MODULE_0___default()('.ld_finish', '.ld_finish_back');

/***/ }),

/***/ "./IREV/src/js/partner-platform/pp-represent.js":
/*!******************************************************!*\
  !*** ./IREV/src/js/partner-platform/pp-represent.js ***!
  \******************************************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
  var partnersec = document.querySelector('.pp');
  if (!partnersec) return;
  var partnerSection = document.querySelector('.partner_platform_represent');
  var parallaxImg = document.querySelector('.partner_platform_represent .back');
  if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var updateParallax = function updateParallax() {
      var rect = partnerSection.getBoundingClientRect();
      var scrolled = -rect.top;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      partnerSection.style.setProperty('--parallax-offset', offset);
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
document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.pp');
  if (!partnerSection) {
    return;
  }
  var testDriveButton = document.querySelector('.ppc3button');
  var input = document.querySelector('.ppc3input');
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
__webpack_require__(/*! ./home/home-gear4.js */ "./IREV/src/js/home/home-gear4.js");
__webpack_require__(/*! ./home/home-gear5.js */ "./IREV/src/js/home/home-gear5.js");
__webpack_require__(/*! ./home/home-gear6.js */ "./IREV/src/js/home/home-gear6.js");
__webpack_require__(/*! ./partner-platform/pp_c6.js */ "./IREV/src/js/partner-platform/pp_c6.js");
__webpack_require__(/*! ./partner-platform/pp-represent.js */ "./IREV/src/js/partner-platform/pp-represent.js");
__webpack_require__(/*! ./lead-distribution/ld-component2.js */ "./IREV/src/js/lead-distribution/ld-component2.js");
__webpack_require__(/*! ./case/case-finish.js */ "./IREV/src/js/case/case-finish.js");
__webpack_require__(/*! ./lead-distribution/parallax.js */ "./IREV/src/js/lead-distribution/parallax.js");
__webpack_require__(/*! ./case/parallax.js */ "./IREV/src/js/case/parallax.js");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NEIsQ0FBQztBQUNyQ0EsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw4REFBc0IsQ0FBQztBQUMvQkEsbUJBQU8sQ0FBQyw0RUFBNkIsQ0FBQztBQUN0Q0EsbUJBQU8sQ0FBQywwRkFBb0MsQ0FBQztBQUM3Q0EsbUJBQU8sQ0FBQyw4RkFBc0MsQ0FBQztBQUMvQ0EsbUJBQU8sQ0FBQyxnRUFBdUIsQ0FBQztBQUNoQ0EsbUJBQU8sQ0FBQyxvRkFBaUMsQ0FBQztBQUMxQ0EsbUJBQU8sQ0FBQywwREFBb0IsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2Nhc2UvY2FzZS1maW5pc2guanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2Nhc2UvcGFyYWxsYXguanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMy5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI0LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjUuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2xlYWQtZGlzdHJpYnV0aW9uL3BhcmFsbGF4LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvc2Nzcy9pbmRleC5zY3NzPzcyNGEiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2UnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoaW5wdXQnKTtcclxuXHJcbiAgICBpZighdGVzdERyaXZlQnV0dG9uIHx8ICFpbnB1dCl7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+IHtcclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG4iLCJpbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSAnLi4vZ2xvYmFsJztcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcuY2FzZV9yZXByZXNlbnRfY29udGFpbmVyJywgJy5jYXNlX3JlcHJlc2VudF9iYWNrJyk7XHJcbmNyZWF0ZVBhcmFsbGF4KCcuY2FzZV9maW5pc2hfbG93ZXInLCAnLmNhc2VfZmluaXNoX2JhY2snKTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZV9jMl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGxhYmVsV3JhcHBlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FzZV9jMl9jb250YWluZXIgLmxhYmVsX3dyYXBwZXInKTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgdHJpZ2dlck9mZnNldDogMC4yLFxyXG4gICAgICAgIHN0ZXBEZWxheTogMC4zLFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJUb3AgPCB3aW5kb3dIZWlnaHQgJiYgY29udGFpbmVyUmVjdC5ib3R0b20gPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyZXNzID0gMSAtIChjb250YWluZXJUb3AgLyAod2luZG93SGVpZ2h0IC0gY29udGFpbmVySGVpZ2h0KSk7XHJcblxyXG4gICAgICAgICAgICBsYWJlbFdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSAoaW5kZXggKyAxKSAqIGNvbmZpZy5zdGVwRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHByb2dyZXNzID49IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdsYWJlbF93cmFwcGVyLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGFiZWxXcmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCdsYWJlbF93cmFwcGVyLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxhYmVsV3JhcHBlcnMuZm9yRWFjaCh3cmFwcGVyID0+IHtcclxuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTsiLCJmdW5jdGlvbiBjcmVhdGVQYXJhbGxheChwYXJlbnRDbGFzcywgaW1nQ2xhc3MpIHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyZW50Q2xhc3MpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbWdDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFydG5lclNlY3Rpb24gfHwgIXBhcmFsbGF4SW1nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBhbmltYXRpb25GcmFtZUlkID0gbnVsbDtcclxuXHJcbiAgICAgICAgY29uc3QgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LnJlbW92ZSgncGFyYWxsYXgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcFBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgIHJvb3RNYXJnaW46ICcxMDBweCAwcHgnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlUGFyYWxsYXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdGFydFBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBpZiAoIWFuaW1hdGlvbkZyYW1lSWQpIHtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlUGFyYWxsYXgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBzdG9wUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGlmIChhbmltYXRpb25GcmFtZUlkKSB7XHJcbiAgICAgICAgICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZUlkKTtcclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsICcwcHgnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUocGFyYWxsYXhJbWcpO1xyXG5cclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgc3RvcFBhcmFsbGF4KTtcclxuXHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgc3RvcFBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcclxuICAgICAgICB9O1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUGFyYWxsYXg7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcicpO1xyXG5jb25zdCBuaXRyb0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaXRyby1lZmZlY3QgaW1nJyk7XHJcbmNvbnN0IHJldlRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXJfcmV2Jyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxBbmltYXRpb24oKSB7XHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gcmVjdC50b3AgLyB3aW5kb3dIZWlnaHQ7XHJcbiAgICBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHByb2dyZXNzLCAwKSwgMSk7XHJcblxyXG4gICAgY29uc3Qgc2hpZnQgPSBNYXRoLm1pbihcclxuICAgICAgICAxMjIwIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCxcclxuICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIHJldlRleHQub2Zmc2V0V2lkdGggLSA2MFxyXG4gICAgKTtcclxuXHJcbiAgICByZXZUZXh0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7cHJvZ3Jlc3MgKiBzaGlmdH1weClgO1xyXG5cclxuICAgIG5pdHJvSW1nLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHtwcm9ncmVzc30pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxuXHJcbnVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tIFwiLi4vZ2xvYmFsXCI7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBhdmF0YXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbSBidXR0b25cIik7XHJcbiAgICBjb25zdCByZXZpZXdzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX2dlYXIzX3Jldmlld3NcIik7XHJcbiAgICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3XCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlclJldmlldyh0YXJnZXRDbGllbnQpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0Q2xpZW50fVwiXWApO1xyXG4gICAgICAgIGlmICghYWN0aXZlUmV2aWV3KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gcmV2aWV3c0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCByZXZpZXdXaWR0aCA9IGFjdGl2ZVJldmlldy5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCBnYXAgPSA0MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3SW5kZXggPSBBcnJheS5mcm9tKHJldmlld3MpLmluZGV4T2YoYWN0aXZlUmV2aWV3KTtcclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gcmV2aWV3SW5kZXggKiAocmV2aWV3V2lkdGggKyBnYXApO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IChjb250YWluZXJXaWR0aCAvIDIpIC0gKHJldmlld1dpZHRoIC8gMikgLSB0b3RhbEl0ZW1zV2lkdGg7XHJcblxyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuNnMgZWFzZVwiO1xyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hSZXZpZXcodGFyZ2V0KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbVwiKS5mb3JFYWNoKGEgPT4gYS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaChyID0+IHIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYXZhdGFyLWl0ZW0gYnV0dG9uW2RhdGEtdHJpZ2dlcj1cIiR7dGFyZ2V0fVwiXWApLmNsb3Nlc3QoXCIuYXZhdGFyLWl0ZW1cIik7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldH1cIl1gKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQXZhdGFyICYmIGFjdGl2ZVJldmlldykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEF2YXRhci5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGFjdGl2ZVJldmlldy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGNlbnRlclJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc3dpdGNoUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0Q2VudGVyUmV2aWV3KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWFsU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxUYXJnZXQgPSBpbml0aWFsU2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgY2VudGVyUmV2aWV3KGluaXRpYWxUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2VudGVyUmV2aWV3KCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gY3VycmVudFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjZW50ZXJSZXZpZXcoY3VycmVudFRhcmdldCksIDUwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBjYXNlc1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyIC5jYXNlJyk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIHRyaWdnZXJPZmZzZXQ6IDAuMyxcclxuICAgICAgICBzdGVwRGVsYXk6IDAuMTUsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlzdGFuY2U6IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm90dG9tID0gY29udGFpbmVyVG9wICsgY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHRyaWdnZXJQb2ludCA9IHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0O1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyVG9wIDwgd2luZG93SGVpZ2h0IC0gdHJpZ2dlclBvaW50ICYmIGNvbnRhaW5lckJvdHRvbSA+IHRyaWdnZXJQb2ludCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlSGVpZ2h0ID0gTWF0aC5taW4oY29udGFpbmVyQm90dG9tLCB3aW5kb3dIZWlnaHQpIC0gTWF0aC5tYXgoY29udGFpbmVyVG9wLCAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsYWJsZSA9IGNvbnRhaW5lckhlaWdodCAtIHdpbmRvd0hlaWdodCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLWNvbnRhaW5lclRvcCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgc2Nyb2xsZWQgLyBtYXhTY3JvbGxhYmxlKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKChjYXNlRWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBpbmRleCAqIGNvbmZpZy5zdGVwRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFByb2dyZXNzID49IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKGNhc2VFbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuLy8gcGFyYWxsYXhcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcuaG9tZV9nZWFyM19jb250YWluZXInLCAnLmhvbWVfZ2VhcjNfYmFja2dyb3VuZCcpXHJcbiIsIi8vIHBhcmFsbGF4XHJcblxyXG5pbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSBcIi4uL2dsb2JhbFwiO1xyXG5cclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcuaG9tZV9nZWFyNF9sb3dlcl9jb250YWluZXInLCAnLmdlYXI0YmFjaycpXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGFjY29yZGlvbkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFjY29yZGlvbl9pdGVtJyk7XHJcblxyXG4gICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9IGl0ZW0ucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XHJcblxyXG4gICAgICAgIGlmIChidXR0b24pIHtcclxuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKG90aGVySXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdGhlckl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pOyIsImltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tIFwiLi4vZ2xvYmFsXCI7XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmhvbWVfZ2VhcjZfY29udGFpbmVyJywgJy5ob21lX2dlYXI2X2NvbnRhaW5lciBpbWcnKTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwOyAvLyAxNSDQvNC40L3Rg9GCXHJcbiAgICBsZXQgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChpc1RpbWVyUnVubmluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpc1RpbWVyUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7XHJcblxyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVUaW1lckRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodG90YWxTZWNvbmRzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAocG9wdXBPdmVybGF5ICYmIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZXJEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXJEaXNwbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzICUgMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID1cclxuICAgICAgICAgICAgU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlzVGltZXJSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRpbWVyQ29tcGxldGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQotCw0LnQvNC10YAg0LfQsNCy0LXRgNGI0LXQvSFcIik7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSAmJiBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVGltZXJSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUaW1lckRpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wZW5CdXR0b25zKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChvcGVuQnV0dG9uID0+IHtcclxuICAgICAgICAgICAgb3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVmlkZW8nKTtcclxuICAgIGNvbnN0IHZpZGVvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sb3dlcl9yaWdodGNvbnRfdmlkZW8nKTtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlkZW8gJiYgdmlkZW9Db250YWluZXIgJiYgcGxheUJ1dHRvbikge1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSAnLi4vZ2xvYmFsJztcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBpZighdGVzdERyaXZlQnV0dG9uIHx8ICFpbnB1dCl7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PiB7XHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja2JveCBzYXZlXHJcblxyXG59KTtcclxuXHJcbi8vIHBhcmFsYXhcclxuY3JlYXRlUGFyYWxsYXgoJy5ob21lJywgJy5ob21lX3JlcHJlc2VudF9iYWNrZ3JvdW5kSW1nJylcclxuXHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB2aWRlb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfbG93ZXJXcmFwcGVyX3ZpZGVvJyk7XHJcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxPdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcmlnaW5hbFZpZGVvID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxWaWRlbyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBidXR0b24nKSA6IG51bGw7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxQbGF5SW1nID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19jb250IGltZycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsUGxheUltZyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gaW1nJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsVGltZXIgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxUaW1lciA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XHJcbiAgICAgICAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBjb25zdCBzZWNzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xyXG4gICAgICAgIHJldHVybiBgJHttaW5zLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nVGltZSA9IHZpZGVvLmR1cmF0aW9uIC0gdmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0VGltZShyZW1haW5pbmdUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXBkYXRlVGltZXIodmlkZW8sIHRpbWVyRWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nLCBvcmlnaW5hbFRpbWVyKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcsIG1vZGFsVGltZXIpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVRpbWVyKG1vZGFsVmlkZW8sIG1vZGFsVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gbW9kYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlVGltZXIob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZGVvV3JhcHBlciAmJiBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICB2aWRlb1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbiB8fCAhcGxheUJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBvcmlnaW5hbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvKSB7XHJcbiAgICAgICAgbW9kYWxWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0QnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Y3LWZvcm0nKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hlc1swXS5jaGVja2VkICYmIGNoZWNrYm94ZXNbMV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZUJ1dHRvblN0YXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBjaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbiAmJiBlbWFpbElucHV0ICYmIGZvcm0pIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnd3BjZjctbm90LXZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd3cGNmNy1ub3QtdmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnRS1tYWlsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZF9kaXN0cmlidXRpb25fYzInKTtcclxuICAgIGNvbnN0IGNhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxkX2MyX2NvbnRhaW5lcl9pdGVtJyk7XHJcbiAgICBjb25zdCBhbmltYXRlZENhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRlZC1jYXInKTtcclxuXHJcbiAgICBpZiAoIWNhclNlY3Rpb24gfHwgIWFuaW1hdGVkQ2FyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaXRlbVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaXRlbVBvc2l0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRnJvbVRvcCA9IGl0ZW1SZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBvc2l0aW9uID0gKHBvc2l0aW9uRnJvbVRvcCAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcbiAgICAgICAgICAgIGl0ZW1Qb3NpdGlvbnMucHVzaChub3JtYWxpemVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDAuOCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA+PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFja0FuaW1hdGlvblByb2dyZXNzKCkge1xyXG4gICAgICAgIGNvbnN0IGNhclJlY3QgPSBhbmltYXRlZENhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhclByb2dyZXNzID0gKChjYXJSZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcCkgLyBzZWN0aW9uUmVjdC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zaXRpb24gPSBpdGVtUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNhclByb2dyZXNzID49IGl0ZW1Qb3NpdGlvbiAtIDUgJiYgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUNhckFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoaXNFbGVtZW50SW5WaWV3cG9ydChjYXJTZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkludGVydmFsID0gc2V0SW50ZXJ2YWwodHJhY2tBbmltYXRpb25Qcm9ncmVzcywgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpKTtcclxuICAgICAgICAgICAgfSwgMTA1MDApO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZWRDYXIuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbGN1bGF0ZVBvc2l0aW9ucyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuICAgICAgICBhY3RpdmF0ZUNhckFuaW1hdGlvbigpO1xyXG4gICAgfSwgMTAwKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGQnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7IiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG4vLyByZXByZXNlbnRcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcubGVhZF9kaXN0cmlidXRpb25fcmVwcmVzZW50JywgJy5iYWNrX2xkX3JlcHJlc2VudCcpO1xyXG5cclxuLy8gY29tcG9uZW50M1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9jMycsICcubGRfYzNfYmFjaycpO1xyXG5cclxuLy8gZmluaXNoXHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmxkX2ZpbmlzaCcsICcubGRfZmluaXNoX2JhY2snKTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyc2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnRuZXJfcGxhdGZvcm1fcmVwcmVzZW50Jyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydG5lcl9wbGF0Zm9ybV9yZXByZXNlbnQgLmJhY2snKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHAnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBjb252ZXJzaW9uc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnZlcnNpb25zJyk7XHJcbiAgICBjb25zdCBjbGlja3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGlja3MnKTtcclxuICAgIGNvbnN0IGZ1bmRzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVuZHMnKTtcclxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVQZXJjZW50YWdlKCkge1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9ucyA9IHBhcnNlSW50KGNvbnZlcnNpb25zSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgY2xpY2tzID0gcGFyc2VJbnQoY2xpY2tzSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZnVuZHMgPSBwYXJzZUludChmdW5kc0lucHV0LnZhbHVlKSB8fCA3MDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc092ZXJmbG93ID0gTWF0aC5tYXgoMCwgY29udmVyc2lvbnMgLSAxMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNpb25zWSA9IGNvbnZlcnNpb25zT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjbGlja3NPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNsaWNrcyAtIDEwMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrc1kgPSBjbGlja3NPdmVyZmxvdyAvIDEwMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IFkgPSBjb252ZXJzaW9uc1kgKyBjbGlja3NZO1xyXG5cclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9ICgxMDAwICsgKDQgKiBZKSkgLyBmdW5kcztcclxuXHJcbiAgICAgICAgbGV0IGZpbmFsUGVyY2VudGFnZSA9IE1hdGgubWluKHBlcmNlbnRhZ2UgKiAxMDAsIDE0KTtcclxuXHJcbiAgICAgICAgcmVzdWx0RGl2LnRleHRDb250ZW50ID0gZmluYWxQZXJjZW50YWdlLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVyc2lvbnNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNhbGN1bGF0ZVBlcmNlbnRhZ2UpO1xyXG4gICAgY2xpY2tzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGZ1bmRzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuXHJcbiAgICBjYWxjdWxhdGVQZXJjZW50YWdlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2lucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIxLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIzLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI0LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI1LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI2LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcycpO1xyXG5yZXF1aXJlKCcuL3BhcnRuZXItcGxhdGZvcm0vcHAtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vbGVhZC1kaXN0cmlidXRpb24vbGQtY29tcG9uZW50Mi5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvY2FzZS1maW5pc2guanMnKTtcclxucmVxdWlyZSgnLi9sZWFkLWRpc3RyaWJ1dGlvbi9wYXJhbGxheC5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvcGFyYWxsYXguanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFydG5lclNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJjaGVja0lucHV0VmFsdWUiLCJ2YWx1ZSIsInRyaW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJtYWluRW1haWxJbnB1dCIsInBvcHVwRW1haWxJbnB1dCIsImNyZWF0ZVBhcmFsbGF4IiwiY29udGFpbmVyIiwibGFiZWxXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25maWciLCJ0cmlnZ2VyT2Zmc2V0Iiwic3RlcERlbGF5IiwiYW5pbWF0aW9uRGlzdGFuY2UiLCJoYW5kbGVTY3JvbGxBbmltYXRpb24iLCJjb250YWluZXJSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyVG9wIiwidG9wIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJib3R0b20iLCJwcm9ncmVzcyIsImZvckVhY2giLCJ3cmFwcGVyIiwiaW5kZXgiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwYXNzaXZlIiwicGFyZW50Q2xhc3MiLCJpbWdDbGFzcyIsInBhcmFsbGF4SW1nIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJpc0FjdGl2ZSIsImFuaW1hdGlvbkZyYW1lSWQiLCJpbnRlcnNlY3Rpb25PYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzdGFydFBhcmFsbGF4Iiwic3RvcFBhcmFsbGF4Iiwicm9vdE1hcmdpbiIsInVwZGF0ZVBhcmFsbGF4IiwicmVjdCIsInNjcm9sbGVkIiwic3BlZWQiLCJvZmZzZXQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwiY2FuY2VsQW5pbWF0aW9uRnJhbWUiLCJvYnNlcnZlIiwiZGlzY29ubmVjdCIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZW51SXRlbXMiLCJkcm9wZG93blRyaWdnZXJzIiwiZHJvcGRvd25Db250YWluZXIiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwiZSIsImtleSIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJzaGlmdCIsIm9mZnNldFdpZHRoIiwiaW5uZXJXaWR0aCIsInRyYW5zZm9ybSIsImF2YXRhckJ1dHRvbnMiLCJyZXZpZXdzQ29udGFpbmVyIiwicmV2aWV3cyIsImNlbnRlclJldmlldyIsInRhcmdldENsaWVudCIsImFjdGl2ZVJldmlldyIsImNvbnRhaW5lcldpZHRoIiwicmV2aWV3V2lkdGgiLCJnYXAiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJ0b3RhbEl0ZW1zV2lkdGgiLCJ0cmFuc2l0aW9uIiwic3dpdGNoUmV2aWV3IiwidGFyZ2V0IiwiYSIsInIiLCJzZWxlY3RlZEF2YXRhciIsImNsb3Nlc3QiLCJidXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJpbml0Q2VudGVyUmV2aWV3IiwiaW5pdGlhbFNlbGVjdGVkIiwiaW5pdGlhbFRhcmdldCIsImN1cnJlbnRTZWxlY3RlZCIsImN1cnJlbnRUYXJnZXQiLCJjYXNlcyIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJhY2NvcmRpb25JdGVtcyIsImNvbnRhaW5zIiwib3RoZXJJdGVtIiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbnMiLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwidG90YWxTZWNvbmRzIiwiaXNUaW1lclJ1bm5pbmciLCJzdGFydFRpbWVyIiwiY2xlYXJJbnRlcnZhbCIsInVwZGF0ZVRpbWVyRGlzcGxheSIsInNldEludGVydmFsIiwidGltZXJDb21wbGV0ZSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50Iiwic3RvcFRpbWVyIiwiY29uc29sZSIsImxvZyIsImNsb3NlUG9wdXAiLCJvcGVuUG9wdXAiLCJib2R5Iiwib3ZlcmZsb3ciLCJvcGVuQnV0dG9uIiwicHJldmVudERlZmF1bHQiLCJ2aWRlbyIsImdldEVsZW1lbnRCeUlkIiwidmlkZW9Db250YWluZXIiLCJwbGF5QnV0dG9uIiwidXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkiLCJwYXVzZWQiLCJwbGF5IiwicGF1c2UiLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwidmlkZW9XcmFwcGVyIiwibW9kYWxPdmVybGF5Iiwib3JpZ2luYWxWaWRlbyIsIm1vZGFsVmlkZW8iLCJvcmlnaW5hbFBsYXlJbWciLCJtb2RhbFBsYXlJbWciLCJvcmlnaW5hbFRpbWVyIiwibW9kYWxUaW1lciIsImN1cnJlbnRUaW1lIiwiZm9ybWF0VGltZSIsIm1pbnMiLCJzZWNzIiwicmVtYWluaW5nVGltZSIsImR1cmF0aW9uIiwidG9nZ2xlUGxheUJ1dHRvbiIsInBsYXlJbWciLCJzZXR1cFZpZGVvTGlzdGVuZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwib3Blbk1vZGFsV2l0aFZpZGVvIiwiY2xvc2VNb2RhbCIsInN1Ym1pdEJ1dHRvbiIsImVtYWlsSW5wdXQiLCJjaGVja2JveGVzIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiZGlzYWJsZWQiLCJjaGVja2JveCIsImN1c3RvbUNoZWNrYm94IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiZW1haWwiLCJ2YWxpZGF0ZUVtYWlsIiwicGxhY2Vob2xkZXIiLCJlbWFpbFJlZ2V4IiwidGVzdCIsImNhclNlY3Rpb24iLCJjYXJJdGVtcyIsImFuaW1hdGVkQ2FyIiwiaXRlbVBvc2l0aW9ucyIsImNhbGN1bGF0ZVBvc2l0aW9ucyIsInNlY3Rpb25SZWN0IiwiaXRlbVJlY3QiLCJwb3NpdGlvbkZyb21Ub3AiLCJub3JtYWxpemVkUG9zaXRpb24iLCJwdXNoIiwiaXNFbGVtZW50SW5WaWV3cG9ydCIsImVsIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50SGVpZ2h0IiwidHJhY2tBbmltYXRpb25Qcm9ncmVzcyIsImNhclJlY3QiLCJjYXJQcm9ncmVzcyIsIml0ZW1Qb3NpdGlvbiIsImFjdGl2YXRlQ2FyQW5pbWF0aW9uIiwiYW5pbWF0aW9uUGxheVN0YXRlIiwiYW5pbWF0aW9uSW50ZXJ2YWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwicGFydG5lcnNlYyIsImNvbnZlcnNpb25zSW5wdXQiLCJjbGlja3NJbnB1dCIsImZ1bmRzSW5wdXQiLCJyZXN1bHREaXYiLCJjYWxjdWxhdGVQZXJjZW50YWdlIiwiY29udmVyc2lvbnMiLCJwYXJzZUludCIsImNsaWNrcyIsImZ1bmRzIiwiY29udmVyc2lvbnNPdmVyZmxvdyIsImNvbnZlcnNpb25zWSIsImNsaWNrc092ZXJmbG93IiwiY2xpY2tzWSIsIlkiLCJwZXJjZW50YWdlIiwiZmluYWxQZXJjZW50YWdlIiwidG9GaXhlZCIsInJlcXVpcmUiXSwic291cmNlUm9vdCI6IiJ9