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
document.addEventListener('DOMContentLoaded', function () {
  var slider = document.querySelector('.case_c2 .lower_container');
  if (!slider) return;
  var isDown = false;
  var startX;
  var scrollLeft;
  var animationFrame;
  var velocity = 0;
  var lastX = 0;
  var lastTime = 0;
  function smoothScroll() {
    if (Math.abs(velocity) > 0.1) {
      slider.scrollLeft += velocity;
      velocity *= 0.95;
      animationFrame = requestAnimationFrame(smoothScroll);
    } else {
      velocity = 0;
    }
  }
  slider.addEventListener('mousedown', function (e) {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    velocity = 0;
    lastX = e.pageX;
    lastTime = Date.now();
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
  slider.addEventListener('mouseleave', function () {
    if (isDown) {
      isDown = false;
      slider.classList.remove('active');
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });
  slider.addEventListener('mouseup', function () {
    if (isDown) {
      isDown = false;
      slider.classList.remove('active');
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });
  slider.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - slider.offsetLeft;
    var walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
    var currentTime = Date.now();
    var deltaTime = currentTime - lastTime;
    if (deltaTime > 0) {
      var deltaX = e.pageX - lastX;
      velocity = -deltaX / deltaTime * 30;
    }
    lastX = e.pageX;
    lastTime = currentTime;
  });
  slider.addEventListener('touchstart', function (e) {
    isDown = true;
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    velocity = 0;
    lastX = e.touches[0].pageX;
    lastTime = Date.now();
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
    }
  });
  slider.addEventListener('touchmove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.touches[0].pageX - slider.offsetLeft;
    var walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
    var currentTime = Date.now();
    var deltaTime = currentTime - lastTime;
    if (deltaTime > 0) {
      var deltaX = e.touches[0].pageX - lastX;
      velocity = -deltaX / deltaTime * 30;
    }
    lastX = e.touches[0].pageX;
    lastTime = currentTime;
  });
  slider.addEventListener('touchend', function () {
    if (isDown) {
      isDown = false;
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });
  slider.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });
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
/***/ (() => {



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
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var createParallax = __webpack_require__(/*! ../global */ "./IREV/src/js/global.js");
createParallax('.partner_platform_represent', '.partner_platform_represent .back');
document.addEventListener('DOMContentLoaded', function () {
  var container = document.querySelector('.logo_container');
  if (!container) {
    return;
  }
  var originalTrack = container.querySelector('.logo_track');
  var clonedTrack = originalTrack.cloneNode(true);
  container.appendChild(clonedTrack);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsNEVBQTZCLENBQUM7QUFDdENBLG1CQUFPLENBQUMsMEZBQW9DLENBQUM7QUFDN0NBLG1CQUFPLENBQUMsOEZBQXNDLENBQUM7QUFDL0NBLG1CQUFPLENBQUMsZ0VBQXVCLENBQUM7QUFDaENBLG1CQUFPLENBQUMsb0ZBQWlDLENBQUM7QUFDMUNBLG1CQUFPLENBQUMsMERBQW9CLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL2Nhc2UtZmluaXNoLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL3BhcmFsbGF4LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjMuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI1LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvbGVhZC1kaXN0cmlidXRpb24vbGQtY29tcG9uZW50Mi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvbGVhZC1kaXN0cmlidXRpb24vcGFyYWxsYXguanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL3BhcnRuZXItcGxhdGZvcm0vcHAtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwX2M2LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9zY3NzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2UnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoaW5wdXQnKTtcclxuXHJcbiAgICBpZighdGVzdERyaXZlQnV0dG9uIHx8ICFpbnB1dCl7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+IHtcclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlZmluaXNoaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gIGNvbnN0IHNsaWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlX2MyIC5sb3dlcl9jb250YWluZXInKTtcclxuICBcclxuICBpZiAoIXNsaWRlcikgcmV0dXJuO1xyXG5cclxuICBsZXQgaXNEb3duID0gZmFsc2U7XHJcbiAgbGV0IHN0YXJ0WDtcclxuICBsZXQgc2Nyb2xsTGVmdDtcclxuICBsZXQgYW5pbWF0aW9uRnJhbWU7XHJcbiAgbGV0IHZlbG9jaXR5ID0gMDtcclxuICBsZXQgbGFzdFggPSAwO1xyXG4gIGxldCBsYXN0VGltZSA9IDA7XHJcblxyXG4gIGZ1bmN0aW9uIHNtb290aFNjcm9sbCgpIHtcclxuICAgIGlmIChNYXRoLmFicyh2ZWxvY2l0eSkgPiAwLjEpIHtcclxuICAgICAgc2xpZGVyLnNjcm9sbExlZnQgKz0gdmVsb2NpdHk7XHJcbiAgICAgIHZlbG9jaXR5ICo9IDAuOTU7IFxyXG4gICAgICBhbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzbW9vdGhTY3JvbGwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmVsb2NpdHkgPSAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIChlKSA9PiB7XHJcbiAgICBpc0Rvd24gPSB0cnVlO1xyXG4gICAgc2xpZGVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgc3RhcnRYID0gZS5wYWdlWCAtIHNsaWRlci5vZmZzZXRMZWZ0O1xyXG4gICAgc2Nyb2xsTGVmdCA9IHNsaWRlci5zY3JvbGxMZWZ0O1xyXG4gICAgdmVsb2NpdHkgPSAwO1xyXG4gICAgbGFzdFggPSBlLnBhZ2VYO1xyXG4gICAgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgXHJcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIHtcclxuICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgIGlmIChpc0Rvd24pIHtcclxuICAgICAgaXNEb3duID0gZmFsc2U7XHJcbiAgICAgIHNsaWRlci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc21vb3RoU2Nyb2xsKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XHJcbiAgICBpZiAoaXNEb3duKSB7XHJcbiAgICAgIGlzRG93biA9IGZhbHNlO1xyXG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNtb290aFNjcm9sbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xyXG4gICAgaWYgKCFpc0Rvd24pIHJldHVybjtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgY29uc3QgeCA9IGUucGFnZVggLSBzbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIGNvbnN0IHdhbGsgPSAoeCAtIHN0YXJ0WCk7XHJcbiAgICBcclxuICAgIHNsaWRlci5zY3JvbGxMZWZ0ID0gc2Nyb2xsTGVmdCAtIHdhbGs7XHJcbiAgICBcclxuICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIGNvbnN0IGRlbHRhVGltZSA9IGN1cnJlbnRUaW1lIC0gbGFzdFRpbWU7XHJcbiAgICBpZiAoZGVsdGFUaW1lID4gMCkge1xyXG4gICAgICBjb25zdCBkZWx0YVggPSBlLnBhZ2VYIC0gbGFzdFg7XHJcbiAgICAgIHZlbG9jaXR5ID0gLWRlbHRhWCAvIGRlbHRhVGltZSAqIDMwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsYXN0WCA9IGUucGFnZVg7XHJcbiAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gIH0pO1xyXG5cclxuICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XHJcbiAgICBpc0Rvd24gPSB0cnVlO1xyXG4gICAgc3RhcnRYID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBzY3JvbGxMZWZ0ID0gc2xpZGVyLnNjcm9sbExlZnQ7XHJcbiAgICB2ZWxvY2l0eSA9IDA7XHJcbiAgICBsYXN0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuICAgIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIFxyXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIChlKSA9PiB7XHJcbiAgICBpZiAoIWlzRG93bikgcmV0dXJuO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgXHJcbiAgICBjb25zdCB4ID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSBzdGFydFgpO1xyXG4gICAgXHJcbiAgICBzbGlkZXIuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQgLSB3YWxrO1xyXG4gICAgXHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xyXG4gICAgaWYgKGRlbHRhVGltZSA+IDApIHtcclxuICAgICAgY29uc3QgZGVsdGFYID0gZS50b3VjaGVzWzBdLnBhZ2VYIC0gbGFzdFg7XHJcbiAgICAgIHZlbG9jaXR5ID0gLWRlbHRhWCAvIGRlbHRhVGltZSAqIDMwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsYXN0WCA9IGUudG91Y2hlc1swXS5wYWdlWDtcclxuICAgIGxhc3RUaW1lID0gY3VycmVudFRpbWU7XHJcbiAgfSk7XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcclxuICAgIGlmIChpc0Rvd24pIHtcclxuICAgICAgaXNEb3duID0gZmFsc2U7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNtb290aFNjcm9sbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0pO1xyXG59KTtcclxuIiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmNhc2VfcmVwcmVzZW50X2NvbnRhaW5lcicsICcuY2FzZV9yZXByZXNlbnRfYmFjaycpO1xyXG5jcmVhdGVQYXJhbGxheCgnLmNhc2VfZmluaXNoX2xvd2VyJywgJy5jYXNlX2ZpbmlzaF9iYWNrJyk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VfYzJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBsYWJlbFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhc2VfYzJfY29udGFpbmVyIC5sYWJlbF93cmFwcGVyJyk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIHRyaWdnZXJPZmZzZXQ6IDAuMixcclxuICAgICAgICBzdGVwRGVsYXk6IDAuMyxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyVG9wIDwgd2luZG93SGVpZ2h0ICYmIGNvbnRhaW5lclJlY3QuYm90dG9tID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IDEgLSAoY29udGFpbmVyVG9wIC8gKHdpbmRvd0hlaWdodCAtIGNvbnRhaW5lckhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgbGFiZWxXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gKGluZGV4ICsgMSkgKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhYmVsV3JhcHBlcnMuZm9yRWFjaCh3cmFwcGVyID0+IHtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYWJlbFdyYXBwZXJzLmZvckVhY2god3JhcHBlciA9PiB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7IiwiZnVuY3Rpb24gY3JlYXRlUGFyYWxsYXgocGFyZW50Q2xhc3MsIGltZ0NsYXNzKSB7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmVudENsYXNzKTtcclxuICAgICAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaW1nQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhcnRuZXJTZWN0aW9uIHx8ICFwYXJhbGxheEltZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgaXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBsZXQgYW5pbWF0aW9uRnJhbWVJZCA9IG51bGw7XHJcblxyXG4gICAgICAgIGNvbnN0IGludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5yZW1vdmUoJ3BhcmFsbGF4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgICByb290TWFyZ2luOiAnMTAwcHggMHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgaWYgKCFpc0FjdGl2ZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVBhcmFsbGF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RhcnRQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgaWYgKCFhbmltYXRpb25GcmFtZUlkKSB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25GcmFtZUlkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVBhcmFsbGF4KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcFBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBpZiAoYW5pbWF0aW9uRnJhbWVJZCkge1xyXG4gICAgICAgICAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWVJZCk7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRpb25GcmFtZUlkID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCAnMHB4Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlci5vYnNlcnZlKHBhcmFsbGF4SW1nKTtcclxuXHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIHN0b3BQYXJhbGxheCk7XHJcblxyXG4gICAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgICAgIHN0b3BQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlci5kaXNjb25uZWN0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBhcmFsbGF4OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfbWVudV9pdGVtJyk7XHJcbiAgICBjb25zdCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdHJpZ2dlcl0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9kcm9wZG93bl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi1jb250ZW50XScpO1xyXG4gICAgbGV0IGNsb3NlVGltZW91dDtcclxuICAgIGxldCBsZWF2ZVRpbWVvdXQ7XHJcbiAgICBsZXQgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxlYXZlVGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IGl0ZW0gJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGVhdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93blR5cGUgPSB0aGlzLmRhdGFzZXQuZHJvcGRvd25UcmlnZ2VyO1xyXG4gICAgICAgICAgICBvcGVuRHJvcGRvd24oZHJvcGRvd25UeXBlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duQ29udGFpbmVyKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsb3NlQWxsRHJvcGRvd25zLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bih0eXBlKSB7XHJcbiAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoZmFsc2UpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcGRvd24tY29udGVudD1cIiR7dHlwZX1cIl1gKTtcclxuICAgICAgICBpZiAodGFyZ2V0Q29udGVudCkgdGFyZ2V0Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQWxsRHJvcGRvd25zKGNsZWFyQWN0aXZlID0gdHJ1ZSkge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhckFjdGl2ZSkge1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godCA9PiB0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPdmVyRHJvcGRvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRyb3Bkb3duQ29udGFpbmVyLm1hdGNoZXMoJzpob3ZlcicpIHx8XHJcbiAgICAgICAgICAgIChhY3RpdmVUcmlnZ2VyICYmIGFjdGl2ZVRyaWdnZXIubWF0Y2hlcygnOmhvdmVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXInKTtcclxuY29uc3Qgbml0cm9JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubml0cm8tZWZmZWN0IGltZycpO1xyXG5jb25zdCByZXZUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyX3JldicpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcblxyXG51cGRhdGVTY3JvbGxBbmltYXRpb24oKTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSBcIi4uL2dsb2JhbFwiO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYXZhdGFyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW0gYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9nZWFyM19yZXZpZXdzXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1wiKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJSZXZpZXcodGFyZ2V0Q2xpZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldENsaWVudH1cIl1gKTtcclxuICAgICAgICBpZiAoIWFjdGl2ZVJldmlldykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHJldmlld3NDb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3V2lkdGggPSBhY3RpdmVSZXZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gNDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHJldmlld0luZGV4ID0gQXJyYXkuZnJvbShyZXZpZXdzKS5pbmRleE9mKGFjdGl2ZVJldmlldyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHJldmlld0luZGV4ICogKHJldmlld1dpZHRoICsgZ2FwKTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSAoY29udGFpbmVyV2lkdGggLyAyKSAtIChyZXZpZXdXaWR0aCAvIDIpIC0gdG90YWxJdGVtc1dpZHRoO1xyXG5cclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcInRyYW5zZm9ybSAwLjZzIGVhc2VcIjtcclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoUmV2aWV3KHRhcmdldCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW1cIikuZm9yRWFjaChhID0+IGEuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuICAgICAgICByZXZpZXdzLmZvckVhY2gociA9PiByLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmF2YXRhci1pdGVtIGJ1dHRvbltkYXRhLXRyaWdnZXI9XCIke3RhcmdldH1cIl1gKS5jbG9zZXN0KFwiLmF2YXRhci1pdGVtXCIpO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXR9XCJdYCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEF2YXRhciAmJiBhY3RpdmVSZXZpZXcpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdmF0YXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBhY3RpdmVSZXZpZXcuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBjZW50ZXJSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHN3aXRjaFJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdENlbnRlclJldmlldygpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsVGFyZ2V0ID0gaW5pdGlhbFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIGNlbnRlclJldmlldyhpbml0aWFsVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENlbnRlclJldmlldygpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGN1cnJlbnRTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2VudGVyUmV2aWV3KGN1cnJlbnRUYXJnZXQpLCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy8gY2FzZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lciAuY2FzZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjE1LFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyUG9pbnQgPSB3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAtIHRyaWdnZXJQb2ludCAmJiBjb250YWluZXJCb3R0b20gPiB0cmlnZ2VyUG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZUhlaWdodCA9IE1hdGgubWluKGNvbnRhaW5lckJvdHRvbSwgd2luZG93SGVpZ2h0KSAtIE1hdGgubWF4KGNvbnRhaW5lclRvcCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbGFibGUgPSBjb250YWluZXJIZWlnaHQgLSB3aW5kb3dIZWlnaHQgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1jb250YWluZXJUb3AgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHNjcm9sbGVkIC8gbWF4U2Nyb2xsYWJsZSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaCgoY2FzZUVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gaW5kZXggKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChjYXNlRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbi8vIHBhcmFsbGF4XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmhvbWVfZ2VhcjNfY29udGFpbmVyJywgJy5ob21lX2dlYXIzX2JhY2tncm91bmQnKVxyXG4iLCIvLyBwYXJhbGxheFxyXG5cclxuaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gXCIuLi9nbG9iYWxcIjtcclxuXHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmhvbWVfZ2VhcjRfbG93ZXJfY29udGFpbmVyJywgJy5nZWFyNGJhY2snKVxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25faXRlbScpO1xyXG5cclxuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChvdGhlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwOyAvLyAxNSDQvNC40L3Rg9GCXHJcbiAgICBsZXQgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChpc1RpbWVyUnVubmluZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpc1RpbWVyUnVubmluZyA9IHRydWU7XHJcblxyXG4gICAgICAgIHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7XHJcblxyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVUaW1lckRpc3BsYXkoKTtcclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodG90YWxTZWNvbmRzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcbiAgICAgICAgICAgICAgICBpZiAocG9wdXBPdmVybGF5ICYmIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZXJEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGltZXJDb21wbGV0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXJEaXNwbGF5KCkge1xyXG4gICAgICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAzNjAwKTtcclxuICAgICAgICBjb25zdCBtaW51dGVzID0gTWF0aC5mbG9vcigodG90YWxTZWNvbmRzICUgMzYwMCkgLyA2MCk7XHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID1cclxuICAgICAgICAgICAgU3RyaW5nKGhvdXJzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICBTdHJpbmcoc2Vjb25kcykucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0dGVkVGltZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlzVGltZXJSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRpbWVyQ29tcGxldGUoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLQotCw0LnQvNC10YAg0LfQsNCy0LXRgNGI0LXQvSFcIik7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSAmJiBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzVGltZXJSdW5uaW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUaW1lckRpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9wZW5CdXR0b25zKSB7XHJcbiAgICAgICAgb3BlbkJ1dHRvbnMuZm9yRWFjaChvcGVuQnV0dG9uID0+IHtcclxuICAgICAgICAgICAgb3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Qb3B1cCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VCdXR0b24pIHtcclxuICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICBwb3B1cE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwVmlkZW8nKTtcclxuICAgIGNvbnN0IHZpZGVvQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sb3dlcl9yaWdodGNvbnRfdmlkZW8nKTtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlkZW8gJiYgdmlkZW9Db250YWluZXIgJiYgcGxheUJ1dHRvbikge1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSk7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSgpO1xyXG4gICAgfVxyXG59KTsiLCJpbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSAnLi4vZ2xvYmFsJztcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBpZighdGVzdERyaXZlQnV0dG9uIHx8ICFpbnB1dCl7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PiB7XHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja2JveCBzYXZlXHJcblxyXG59KTtcclxuXHJcbi8vIHBhcmFsYXhcclxuY3JlYXRlUGFyYWxsYXgoJy5ob21lJywgJy5ob21lX3JlcHJlc2VudF9iYWNrZ3JvdW5kSW1nJylcclxuXHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB2aWRlb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfbG93ZXJXcmFwcGVyX3ZpZGVvJyk7XHJcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxPdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcmlnaW5hbFZpZGVvID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxWaWRlbyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBidXR0b24nKSA6IG51bGw7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxQbGF5SW1nID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19jb250IGltZycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsUGxheUltZyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gaW1nJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsVGltZXIgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxUaW1lciA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XHJcbiAgICAgICAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBjb25zdCBzZWNzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xyXG4gICAgICAgIHJldHVybiBgJHttaW5zLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nVGltZSA9IHZpZGVvLmR1cmF0aW9uIC0gdmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0VGltZShyZW1haW5pbmdUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXBkYXRlVGltZXIodmlkZW8sIHRpbWVyRWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nLCBvcmlnaW5hbFRpbWVyKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcsIG1vZGFsVGltZXIpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVRpbWVyKG1vZGFsVmlkZW8sIG1vZGFsVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gbW9kYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlVGltZXIob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZGVvV3JhcHBlciAmJiBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICB2aWRlb1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbiB8fCAhcGxheUJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBvcmlnaW5hbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvKSB7XHJcbiAgICAgICAgbW9kYWxWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0QnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Y3LWZvcm0nKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hlc1swXS5jaGVja2VkICYmIGNoZWNrYm94ZXNbMV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZUJ1dHRvblN0YXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBjaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbiAmJiBlbWFpbElucHV0ICYmIGZvcm0pIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnd3BjZjctbm90LXZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd3cGNmNy1ub3QtdmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnRS1tYWlsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZF9kaXN0cmlidXRpb25fYzInKTtcclxuICAgIGNvbnN0IGNhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxkX2MyX2NvbnRhaW5lcl9pdGVtJyk7XHJcbiAgICBjb25zdCBhbmltYXRlZENhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRlZC1jYXInKTtcclxuXHJcbiAgICBpZiAoIWNhclNlY3Rpb24gfHwgIWFuaW1hdGVkQ2FyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaXRlbVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaXRlbVBvc2l0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRnJvbVRvcCA9IGl0ZW1SZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBvc2l0aW9uID0gKHBvc2l0aW9uRnJvbVRvcCAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcbiAgICAgICAgICAgIGl0ZW1Qb3NpdGlvbnMucHVzaChub3JtYWxpemVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDAuOCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA+PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFja0FuaW1hdGlvblByb2dyZXNzKCkge1xyXG4gICAgICAgIGNvbnN0IGNhclJlY3QgPSBhbmltYXRlZENhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhclByb2dyZXNzID0gKChjYXJSZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcCkgLyBzZWN0aW9uUmVjdC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zaXRpb24gPSBpdGVtUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNhclByb2dyZXNzID49IGl0ZW1Qb3NpdGlvbiAtIDUgJiYgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUNhckFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoaXNFbGVtZW50SW5WaWV3cG9ydChjYXJTZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkludGVydmFsID0gc2V0SW50ZXJ2YWwodHJhY2tBbmltYXRpb25Qcm9ncmVzcywgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpKTtcclxuICAgICAgICAgICAgfSwgMTA1MDApO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZWRDYXIuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbGN1bGF0ZVBvc2l0aW9ucyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuICAgICAgICBhY3RpdmF0ZUNhckFuaW1hdGlvbigpO1xyXG4gICAgfSwgMTAwKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGQnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7IiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG4vLyByZXByZXNlbnRcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcubGVhZF9kaXN0cmlidXRpb25fcmVwcmVzZW50JywgJy5iYWNrX2xkX3JlcHJlc2VudCcpO1xyXG5cclxuLy8gY29tcG9uZW50M1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9jMycsICcubGRfYzNfYmFjaycpO1xyXG5cclxuLy8gZmluaXNoXHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmxkX2ZpbmlzaCcsICcubGRfZmluaXNoX2JhY2snKTsiLCJjb25zdCBjcmVhdGVQYXJhbGxheCA9IHJlcXVpcmUoXCIuLi9nbG9iYWxcIik7XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLnBhcnRuZXJfcGxhdGZvcm1fcmVwcmVzZW50JywgJy5wYXJ0bmVyX3BsYXRmb3JtX3JlcHJlc2VudCAuYmFjaycpO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2dvX2NvbnRhaW5lcicpO1xyXG5cclxuICAgIGlmKCFjb250YWluZXIpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IG9yaWdpbmFsVHJhY2sgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcignLmxvZ29fdHJhY2snKTtcclxuICAgIGNvbnN0IGNsb25lZFRyYWNrID0gb3JpZ2luYWxUcmFjay5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNsb25lZFRyYWNrKTtcclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgY29udmVyc2lvbnNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb252ZXJzaW9ucycpO1xyXG4gICAgY29uc3QgY2xpY2tzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpY2tzJyk7XHJcbiAgICBjb25zdCBmdW5kc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bmRzJyk7XHJcbiAgICBjb25zdCByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUGVyY2VudGFnZSgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnMgPSBwYXJzZUludChjb252ZXJzaW9uc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrcyA9IHBhcnNlSW50KGNsaWNrc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGZ1bmRzID0gcGFyc2VJbnQoZnVuZHNJbnB1dC52YWx1ZSkgfHwgNzAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnNPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNvbnZlcnNpb25zIC0gMTAwMDAwKTtcclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc1kgPSBjb252ZXJzaW9uc092ZXJmbG93IC8gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpY2tzT3ZlcmZsb3cgPSBNYXRoLm1heCgwLCBjbGlja3MgLSAxMDAwMDAwKTtcclxuICAgICAgICBjb25zdCBjbGlja3NZID0gY2xpY2tzT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBZID0gY29udmVyc2lvbnNZICsgY2xpY2tzWTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoMTAwMCArICg0ICogWSkpIC8gZnVuZHM7XHJcblxyXG4gICAgICAgIGxldCBmaW5hbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihwZXJjZW50YWdlICogMTAwLCAxNCk7XHJcblxyXG4gICAgICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IGZpbmFsUGVyY2VudGFnZS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnNpb25zSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGNsaWNrc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcbiAgICBmdW5kc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcblxyXG4gICAgY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwYzNidXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwYzNpbnB1dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3MvaW5kZXguc2Nzc1wiXHJcbnJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMS5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMi5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMy5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNS5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNi5qcycpO1xyXG5yZXF1aXJlKCcuL3BhcnRuZXItcGxhdGZvcm0vcHBfYzYuanMnKTtcclxucmVxdWlyZSgnLi9wYXJ0bmVyLXBsYXRmb3JtL3BwLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDIuanMnKTtcclxucmVxdWlyZSgnLi9jYXNlL2Nhc2UtZmluaXNoLmpzJyk7XHJcbnJlcXVpcmUoJy4vbGVhZC1kaXN0cmlidXRpb24vcGFyYWxsYXguanMnKTtcclxucmVxdWlyZSgnLi9jYXNlL3BhcmFsbGF4LmpzJyk7Il0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcnRuZXJTZWN0aW9uIiwicXVlcnlTZWxlY3RvciIsInRlc3REcml2ZUJ1dHRvbiIsImlucHV0IiwiY2hlY2tJbnB1dFZhbHVlIiwidmFsdWUiLCJ0cmltIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwibWFpbkVtYWlsSW5wdXQiLCJwb3B1cEVtYWlsSW5wdXQiLCJzbGlkZXIiLCJpc0Rvd24iLCJzdGFydFgiLCJzY3JvbGxMZWZ0IiwiYW5pbWF0aW9uRnJhbWUiLCJ2ZWxvY2l0eSIsImxhc3RYIiwibGFzdFRpbWUiLCJzbW9vdGhTY3JvbGwiLCJNYXRoIiwiYWJzIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiZSIsInBhZ2VYIiwib2Zmc2V0TGVmdCIsIkRhdGUiLCJub3ciLCJjYW5jZWxBbmltYXRpb25GcmFtZSIsInByZXZlbnREZWZhdWx0IiwieCIsIndhbGsiLCJjdXJyZW50VGltZSIsImRlbHRhVGltZSIsImRlbHRhWCIsInRvdWNoZXMiLCJjcmVhdGVQYXJhbGxheCIsImNvbnRhaW5lciIsImxhYmVsV3JhcHBlcnMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29uZmlnIiwidHJpZ2dlck9mZnNldCIsInN0ZXBEZWxheSIsImFuaW1hdGlvbkRpc3RhbmNlIiwiaGFuZGxlU2Nyb2xsQW5pbWF0aW9uIiwiY29udGFpbmVyUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImNvbnRhaW5lclRvcCIsInRvcCIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsIndpbmRvd0hlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiYm90dG9tIiwicHJvZ3Jlc3MiLCJmb3JFYWNoIiwid3JhcHBlciIsImluZGV4IiwidGhyZXNob2xkIiwidGlja2luZyIsIm9uU2Nyb2xsIiwicGFzc2l2ZSIsInBhcmVudENsYXNzIiwiaW1nQ2xhc3MiLCJwYXJhbGxheEltZyIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwiaXNBY3RpdmUiLCJhbmltYXRpb25GcmFtZUlkIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJlbnRyeSIsImlzSW50ZXJzZWN0aW5nIiwic3RhcnRQYXJhbGxheCIsInN0b3BQYXJhbGxheCIsInJvb3RNYXJnaW4iLCJ1cGRhdGVQYXJhbGxheCIsInJlY3QiLCJzY3JvbGxlZCIsInNwZWVkIiwib2Zmc2V0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIm9ic2VydmUiLCJkaXNjb25uZWN0IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1lbnVJdGVtcyIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiaXRlbSIsImNsZWFyVGltZW91dCIsImkiLCJzZXRUaW1lb3V0IiwiaXNNb3VzZU92ZXJEcm9wZG93biIsImNsb3NlQWxsRHJvcGRvd25zIiwidHJpZ2dlciIsIl90aGlzIiwiZHJvcGRvd25UeXBlIiwiZGF0YXNldCIsImRyb3Bkb3duVHJpZ2dlciIsIm9wZW5Ecm9wZG93biIsInR5cGUiLCJ0YXJnZXRDb250ZW50IiwiY29uY2F0IiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJrZXkiLCJuaXRyb0ltZyIsInJldlRleHQiLCJ1cGRhdGVTY3JvbGxBbmltYXRpb24iLCJtaW4iLCJtYXgiLCJzaGlmdCIsIm9mZnNldFdpZHRoIiwiaW5uZXJXaWR0aCIsInRyYW5zZm9ybSIsImF2YXRhckJ1dHRvbnMiLCJyZXZpZXdzQ29udGFpbmVyIiwicmV2aWV3cyIsImNlbnRlclJldmlldyIsInRhcmdldENsaWVudCIsImFjdGl2ZVJldmlldyIsImNvbnRhaW5lcldpZHRoIiwicmV2aWV3V2lkdGgiLCJnYXAiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJ0b3RhbEl0ZW1zV2lkdGgiLCJ0cmFuc2l0aW9uIiwic3dpdGNoUmV2aWV3IiwidGFyZ2V0IiwiYSIsInIiLCJzZWxlY3RlZEF2YXRhciIsImNsb3Nlc3QiLCJidXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJpbml0Q2VudGVyUmV2aWV3IiwiaW5pdGlhbFNlbGVjdGVkIiwiaW5pdGlhbFRhcmdldCIsImN1cnJlbnRTZWxlY3RlZCIsImN1cnJlbnRUYXJnZXQiLCJjYXNlcyIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJhY2NvcmRpb25JdGVtcyIsImNvbnRhaW5zIiwib3RoZXJJdGVtIiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbnMiLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwidG90YWxTZWNvbmRzIiwiaXNUaW1lclJ1bm5pbmciLCJzdGFydFRpbWVyIiwiY2xlYXJJbnRlcnZhbCIsInVwZGF0ZVRpbWVyRGlzcGxheSIsInNldEludGVydmFsIiwidGltZXJDb21wbGV0ZSIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50Iiwic3RvcFRpbWVyIiwiY29uc29sZSIsImxvZyIsImNsb3NlUG9wdXAiLCJvcGVuUG9wdXAiLCJib2R5Iiwib3ZlcmZsb3ciLCJvcGVuQnV0dG9uIiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwiZWxlbWVudHMiLCJ1cGRhdGVUaW1lciIsImVsZW1lbnQiLCJodW5kcmVkdGhzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInRvU3RyaW5nIiwiZm9ybWF0dGVkSHVuZHJlZHRocyIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwib3JpZ2luYWxUaW1lciIsIm1vZGFsVGltZXIiLCJmb3JtYXRUaW1lIiwibWlucyIsInNlY3MiLCJyZW1haW5pbmdUaW1lIiwiZHVyYXRpb24iLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwic3VibWl0QnV0dG9uIiwiZW1haWxJbnB1dCIsImNoZWNrYm94ZXMiLCJ1cGRhdGVCdXR0b25TdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNoZWNrYm94IiwiY3VzdG9tQ2hlY2tib3giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJlbWFpbCIsInZhbGlkYXRlRW1haWwiLCJwbGFjZWhvbGRlciIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwiY2FyU2VjdGlvbiIsImNhckl0ZW1zIiwiYW5pbWF0ZWRDYXIiLCJpdGVtUG9zaXRpb25zIiwiY2FsY3VsYXRlUG9zaXRpb25zIiwic2VjdGlvblJlY3QiLCJpdGVtUmVjdCIsInBvc2l0aW9uRnJvbVRvcCIsIm5vcm1hbGl6ZWRQb3NpdGlvbiIsInB1c2giLCJpc0VsZW1lbnRJblZpZXdwb3J0IiwiZWwiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJ0cmFja0FuaW1hdGlvblByb2dyZXNzIiwiY2FyUmVjdCIsImNhclByb2dyZXNzIiwiaXRlbVBvc2l0aW9uIiwiYWN0aXZhdGVDYXJBbmltYXRpb24iLCJhbmltYXRpb25QbGF5U3RhdGUiLCJhbmltYXRpb25JbnRlcnZhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJyZXF1aXJlIiwib3JpZ2luYWxUcmFjayIsImNsb25lZFRyYWNrIiwiY2xvbmVOb2RlIiwiYXBwZW5kQ2hpbGQiLCJjb252ZXJzaW9uc0lucHV0IiwiY2xpY2tzSW5wdXQiLCJmdW5kc0lucHV0IiwicmVzdWx0RGl2IiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsImNvbnZlcnNpb25zIiwicGFyc2VJbnQiLCJjbGlja3MiLCJmdW5kcyIsImNvbnZlcnNpb25zT3ZlcmZsb3ciLCJjb252ZXJzaW9uc1kiLCJjbGlja3NPdmVyZmxvdyIsImNsaWNrc1kiLCJZIiwicGVyY2VudGFnZSIsImZpbmFsUGVyY2VudGFnZSIsInRvRml4ZWQiXSwic291cmNlUm9vdCI6IiJ9