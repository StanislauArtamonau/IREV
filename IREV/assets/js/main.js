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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y2FzZS9jYXNlLWZpbmlzaC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvY2FzZS9wYXJhbGxheC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvZ2xvYmFsLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIzLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNS5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2xlYWQtZGlzdHJpYnV0aW9uL3BhcmFsbGF4LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvc2Nzcy9pbmRleC5zY3NzIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGJ1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgaWYoIXRlc3REcml2ZUJ1dHRvbiB8fCAhaW5wdXQpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PiB7XHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGlucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICBjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZV9jMiAubG93ZXJfY29udGFpbmVyJyk7XHJcbiAgXHJcbiAgaWYgKCFzbGlkZXIpIHJldHVybjtcclxuXHJcbiAgbGV0IGlzRG93biA9IGZhbHNlO1xyXG4gIGxldCBzdGFydFg7XHJcbiAgbGV0IHNjcm9sbExlZnQ7XHJcbiAgbGV0IGFuaW1hdGlvbkZyYW1lO1xyXG4gIGxldCB2ZWxvY2l0eSA9IDA7XHJcbiAgbGV0IGxhc3RYID0gMDtcclxuICBsZXQgbGFzdFRpbWUgPSAwO1xyXG5cclxuICBmdW5jdGlvbiBzbW9vdGhTY3JvbGwoKSB7XHJcbiAgICBpZiAoTWF0aC5hYnModmVsb2NpdHkpID4gMC4xKSB7XHJcbiAgICAgIHNsaWRlci5zY3JvbGxMZWZ0ICs9IHZlbG9jaXR5O1xyXG4gICAgICB2ZWxvY2l0eSAqPSAwLjk1OyBcclxuICAgICAgYW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc21vb3RoU2Nyb2xsKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZlbG9jaXR5ID0gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xyXG4gICAgaXNEb3duID0gdHJ1ZTtcclxuICAgIHNsaWRlci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIHN0YXJ0WCA9IGUucGFnZVggLSBzbGlkZXIub2Zmc2V0TGVmdDtcclxuICAgIHNjcm9sbExlZnQgPSBzbGlkZXIuc2Nyb2xsTGVmdDtcclxuICAgIHZlbG9jaXR5ID0gMDtcclxuICAgIGxhc3RYID0gZS5wYWdlWDtcclxuICAgIGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcclxuICAgIFxyXG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XHJcbiAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICBpZiAoaXNEb3duKSB7XHJcbiAgICAgIGlzRG93biA9IGZhbHNlO1xyXG4gICAgICBzbGlkZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgIGFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNtb290aFNjcm9sbCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xyXG4gICAgaWYgKGlzRG93bikge1xyXG4gICAgICBpc0Rvd24gPSBmYWxzZTtcclxuICAgICAgc2xpZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICBhbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzbW9vdGhTY3JvbGwpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcclxuICAgIGlmICghaXNEb3duKSByZXR1cm47XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBcclxuICAgIGNvbnN0IHggPSBlLnBhZ2VYIC0gc2xpZGVyLm9mZnNldExlZnQ7XHJcbiAgICBjb25zdCB3YWxrID0gKHggLSBzdGFydFgpO1xyXG4gICAgXHJcbiAgICBzbGlkZXIuc2Nyb2xsTGVmdCA9IHNjcm9sbExlZnQgLSB3YWxrO1xyXG4gICAgXHJcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBjdXJyZW50VGltZSAtIGxhc3RUaW1lO1xyXG4gICAgaWYgKGRlbHRhVGltZSA+IDApIHtcclxuICAgICAgY29uc3QgZGVsdGFYID0gZS5wYWdlWCAtIGxhc3RYO1xyXG4gICAgICB2ZWxvY2l0eSA9IC1kZWx0YVggLyBkZWx0YVRpbWUgKiAzMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGFzdFggPSBlLnBhZ2VYO1xyXG4gICAgbGFzdFRpbWUgPSBjdXJyZW50VGltZTtcclxuICB9KTtcclxuXHJcbiAgc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xyXG4gICAgaXNEb3duID0gdHJ1ZTtcclxuICAgIHN0YXJ0WCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHNsaWRlci5vZmZzZXRMZWZ0O1xyXG4gICAgc2Nyb2xsTGVmdCA9IHNsaWRlci5zY3JvbGxMZWZ0O1xyXG4gICAgdmVsb2NpdHkgPSAwO1xyXG4gICAgbGFzdFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICBsYXN0VGltZSA9IERhdGUubm93KCk7XHJcbiAgICBcclxuICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xyXG4gICAgICBjYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xyXG4gICAgaWYgKCFpc0Rvd24pIHJldHVybjtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIFxyXG4gICAgY29uc3QgeCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIHNsaWRlci5vZmZzZXRMZWZ0O1xyXG4gICAgY29uc3Qgd2FsayA9ICh4IC0gc3RhcnRYKTtcclxuICAgIFxyXG4gICAgc2xpZGVyLnNjcm9sbExlZnQgPSBzY3JvbGxMZWZ0IC0gd2FsaztcclxuICAgIFxyXG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xyXG4gICAgY29uc3QgZGVsdGFUaW1lID0gY3VycmVudFRpbWUgLSBsYXN0VGltZTtcclxuICAgIGlmIChkZWx0YVRpbWUgPiAwKSB7XHJcbiAgICAgIGNvbnN0IGRlbHRhWCA9IGUudG91Y2hlc1swXS5wYWdlWCAtIGxhc3RYO1xyXG4gICAgICB2ZWxvY2l0eSA9IC1kZWx0YVggLyBkZWx0YVRpbWUgKiAzMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgbGFzdFggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICBsYXN0VGltZSA9IGN1cnJlbnRUaW1lO1xyXG4gIH0pO1xyXG5cclxuICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XHJcbiAgICBpZiAoaXNEb3duKSB7XHJcbiAgICAgIGlzRG93biA9IGZhbHNlO1xyXG4gICAgICBhbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzbW9vdGhTY3JvbGwpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ3N0YXJ0JywgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9KTtcclxufSk7XHJcbiIsImltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tICcuLi9nbG9iYWwnO1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5jYXNlX3JlcHJlc2VudF9jb250YWluZXInLCAnLmNhc2VfcmVwcmVzZW50X2JhY2snKTtcclxuY3JlYXRlUGFyYWxsYXgoJy5jYXNlX2ZpbmlzaF9sb3dlcicsICcuY2FzZV9maW5pc2hfYmFjaycpO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlX2MyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgbGFiZWxXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXNlX2MyX2NvbnRhaW5lciAubGFiZWxfd3JhcHBlcicpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjIsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjMsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlzdGFuY2U6IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAmJiBjb250YWluZXJSZWN0LmJvdHRvbSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAxIC0gKGNvbnRhaW5lclRvcCAvICh3aW5kb3dIZWlnaHQgLSBjb250YWluZXJIZWlnaHQpKTtcclxuXHJcbiAgICAgICAgICAgIGxhYmVsV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IChpbmRleCArIDEpICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYWJlbFdyYXBwZXJzLmZvckVhY2god3JhcHBlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWxXcmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4ge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbn0pOyIsImZ1bmN0aW9uIGNyZWF0ZVBhcmFsbGF4KHBhcmVudENsYXNzLCBpbWdDbGFzcykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJlbnRDbGFzcyk7XHJcbiAgICAgICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGltZ0NsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYXJ0bmVyU2VjdGlvbiB8fCAhcGFyYWxsYXhJbWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IGFuaW1hdGlvbkZyYW1lSWQgPSBudWxsO1xyXG5cclxuICAgICAgICBjb25zdCBpbnRlcnNlY3Rpb25PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goZW50cnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0UGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QucmVtb3ZlKCdwYXJhbGxheCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgICAgcm9vdE1hcmdpbjogJzEwMHB4IDBweCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNBY3RpdmUpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVQYXJhbGxheCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0UGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGlmICghYW5pbWF0aW9uRnJhbWVJZCkge1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRnJhbWVJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVQYXJhbGxheCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbkZyYW1lSWQpIHtcclxuICAgICAgICAgICAgICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lSWQpO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uRnJhbWVJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0JywgJzBweCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIub2JzZXJ2ZShwYXJhbGxheEltZyk7XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBzdG9wUGFyYWxsYXgpO1xyXG5cclxuICAgICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgICAgICBzdG9wUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgaW50ZXJzZWN0aW9uT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQYXJhbGxheDsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX21lbnVfaXRlbScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLXRyaWdnZXJdJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfZHJvcGRvd25fY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKTtcclxuICAgIGxldCBjbG9zZVRpbWVvdXQ7XHJcbiAgICBsZXQgbGVhdmVUaW1lb3V0O1xyXG4gICAgbGV0IGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG5cclxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChsZWF2ZVRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSBpdGVtICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxlYXZlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IHRoaXMgJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd25UeXBlID0gdGhpcy5kYXRhc2V0LmRyb3Bkb3duVHJpZ2dlcjtcclxuICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGRyb3Bkb3duVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChkcm9wZG93bkNvbnRhaW5lcikge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dChjbG9zZUFsbERyb3Bkb3ducywgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24odHlwZSkge1xyXG4gICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKGZhbHNlKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3Bkb3duLWNvbnRlbnQ9XCIke3R5cGV9XCJdYCk7XHJcbiAgICAgICAgaWYgKHRhcmdldENvbnRlbnQpIHRhcmdldENvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbERyb3Bkb3ducyhjbGVhckFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHQgPT4gdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT3ZlckRyb3Bkb3duKCkge1xyXG4gICAgICAgIHJldHVybiBkcm9wZG93bkNvbnRhaW5lci5tYXRjaGVzKCc6aG92ZXInKSB8fFxyXG4gICAgICAgICAgICAoYWN0aXZlVHJpZ2dlciAmJiBhY3RpdmVUcmlnZ2VyLm1hdGNoZXMoJzpob3ZlcicpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyJyk7XHJcbmNvbnN0IG5pdHJvSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5pdHJvLWVmZmVjdCBpbWcnKTtcclxuY29uc3QgcmV2VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcl9yZXYnKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGxldCBwcm9ncmVzcyA9IDEgLSByZWN0LnRvcCAvIHdpbmRvd0hlaWdodDtcclxuICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcclxuXHJcbiAgICBjb25zdCBzaGlmdCA9IE1hdGgubWluKFxyXG4gICAgICAgIDEyMjAgLSByZXZUZXh0Lm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCAtIDYwXHJcbiAgICApO1xyXG5cclxuICAgIHJldlRleHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwcm9ncmVzcyAqIHNoaWZ0fXB4KWA7XHJcblxyXG4gICAgbml0cm9JbWcuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgke3Byb2dyZXNzfSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG5cclxudXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gXCIuLi9nbG9iYWxcIjtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGF2YXRhckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtIGJ1dHRvblwiKTtcclxuICAgIGNvbnN0IHJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c1wiKTtcclxuICAgIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gY2VudGVyUmV2aWV3KHRhcmdldENsaWVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXRDbGllbnR9XCJdYCk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZXZpZXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSByZXZpZXdzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IHJldmlld1dpZHRoID0gYWN0aXZlUmV2aWV3Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGdhcCA9IDQwO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXdJbmRleCA9IEFycmF5LmZyb20ocmV2aWV3cykuaW5kZXhPZihhY3RpdmVSZXZpZXcpO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSByZXZpZXdJbmRleCAqIChyZXZpZXdXaWR0aCArIGdhcCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKGNvbnRhaW5lcldpZHRoIC8gMikgLSAocmV2aWV3V2lkdGggLyAyKSAtIHRvdGFsSXRlbXNXaWR0aDtcclxuXHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC42cyBlYXNlXCI7XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFJldmlldyh0YXJnZXQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtXCIpLmZvckVhY2goYSA9PiBhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcbiAgICAgICAgcmV2aWV3cy5mb3JFYWNoKHIgPT4gci5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hdmF0YXItaXRlbSBidXR0b25bZGF0YS10cmlnZ2VyPVwiJHt0YXJnZXR9XCJdYCkuY2xvc2VzdChcIi5hdmF0YXItaXRlbVwiKTtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0fVwiXWApO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIgJiYgYWN0aXZlUmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgYWN0aXZlUmV2aWV3LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgY2VudGVyUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRDZW50ZXJSZXZpZXcoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFRhcmdldCA9IGluaXRpYWxTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJSZXZpZXcoaW5pdGlhbFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDZW50ZXJSZXZpZXcoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50U2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNlbnRlclJldmlldyhjdXJyZW50VGFyZ2V0KSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIGNhc2VzXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2FzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXIgLmNhc2UnKTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgdHJpZ2dlck9mZnNldDogMC4zLFxyXG4gICAgICAgIHN0ZXBEZWxheTogMC4xNSxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJCb3R0b20gPSBjb250YWluZXJUb3AgKyBjb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlclBvaW50ID0gd2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJUb3AgPCB3aW5kb3dIZWlnaHQgLSB0cmlnZ2VyUG9pbnQgJiYgY29udGFpbmVyQm90dG9tID4gdHJpZ2dlclBvaW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPSBNYXRoLm1pbihjb250YWluZXJCb3R0b20sIHdpbmRvd0hlaWdodCkgLSBNYXRoLm1heChjb250YWluZXJUb3AsIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxhYmxlID0gY29udGFpbmVySGVpZ2h0IC0gd2luZG93SGVpZ2h0ICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtY29udGFpbmVyVG9wICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBzY3JvbGxlZCAvIG1heFNjcm9sbGFibGUpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goKGNhc2VFbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGluZGV4ICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goY2FzZUVsID0+IHtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyBwYXJhbGxheFxyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5ob21lX2dlYXIzX2NvbnRhaW5lcicsICcuaG9tZV9nZWFyM19iYWNrZ3JvdW5kJylcclxuIiwiLy8gcGFyYWxsYXhcclxuXHJcbmltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tIFwiLi4vZ2xvYmFsXCI7XHJcblxyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5ob21lX2dlYXI0X2xvd2VyX2NvbnRhaW5lcicsICcuZ2VhcjRiYWNrJylcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX2l0ZW0nKTtcclxuXHJcbiAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgob3RoZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVySXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcG9wdXBPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfb3ZlcmxheScpO1xyXG4gICAgY29uc3QgY2xvc2VCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X3VwcGVyIGJ1dHRvbicpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnQgZm9ybScpO1xyXG4gICAgY29uc3Qgb3BlbkJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uLCAub3Blbl9tb2RhbCcpO1xyXG4gICAgY29uc3QgdGltZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9sYWJlbF93cmFwcGVyX2NvdW50ZXInKTtcclxuXHJcbiAgICBsZXQgdGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMTUgKiA2MDsgLy8gMTUg0LzQuNC90YPRglxyXG4gICAgbGV0IGlzVGltZXJSdW5uaW5nID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAoIXRpbWVyRWxlbWVudCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoaXNUaW1lclJ1bm5pbmcpIHJldHVybjtcclxuXHJcbiAgICAgICAgaXNUaW1lclJ1bm5pbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlVGltZXJEaXNwbGF5KCk7XHJcblxyXG4gICAgICAgIHRpbWVySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSAmJiBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9PT0gJ2Jsb2NrJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVyRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyRGlzcGxheSgpIHtcclxuICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9IE1hdGguZmxvb3IoKHRvdGFsU2Vjb25kcyAlIDM2MDApIC8gNjApO1xyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSB0b3RhbFNlY29uZHMgJSA2MDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgIFN0cmluZyhob3VycykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgIFN0cmluZyhtaW51dGVzKS5wYWRTdGFydCgyLCAnMCcpICsgJzonICtcclxuICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdHRlZFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aW1lckludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgICAgICBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0aW1lckNvbXBsZXRlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi0KLQsNC50LzQtdGAINC30LDQstC10YDRiNC10L0hXCIpO1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkgJiYgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcclxuICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVyUnVubmluZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0VGltZXIoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZXJEaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9ucykge1xyXG4gICAgICAgIG9wZW5CdXR0b25zLmZvckVhY2gob3BlbkJ1dHRvbiA9PiB7XHJcbiAgICAgICAgICAgIG9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuUG9wdXAoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cFZpZGVvJyk7XHJcbiAgICBjb25zdCB2aWRlb0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbG93ZXJfcmlnaHRjb250X3ZpZGVvJyk7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9Db250YWluZXIucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZGVvICYmIHZpZGVvQ29udGFpbmVyICYmIHBsYXlCdXR0b24pIHtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKTtcclxuICAgIH1cclxufSk7IiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgaWYoIXRlc3REcml2ZUJ1dHRvbiB8fCAhaW5wdXQpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXIgc3BhbicpO1xyXG4gICAgY29uc3QgY291bnRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyJyk7XHJcbiAgICBjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3NpZ25JbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtjb3VudGVyRGl2LCBzaWduSW5CdXR0b24sIGlucHV0XTtcclxuXHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMyAqIDEwMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcigpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMtLTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29uZScsICd0d28nKSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnbycpKTtcclxuICAgICAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnMDA6MDAsMDAnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAxMDApO1xyXG4gICAgICAgIGNvbnN0IGh1bmRyZWR0aHMgPSB0b3RhbFNlY29uZHMgJSAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRIdW5kcmVkdGhzID0gaHVuZHJlZHRocy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gYDAwOiR7Zm9ybWF0dGVkU2Vjb25kc30sJHtmb3JtYXR0ZWRIdW5kcmVkdGhzfWA7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodG90YWxTZWNvbmRzKXtcclxuICAgICAgICAgICAgY2FzZSAyMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvbmUnKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpPT4ge1xyXG4gICAgLy8gZW1haWwgc2F2ZVxyXG5cclxuICAgIGNvbnN0IG1haW5FbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxufSk7XHJcblxyXG4vLyBwYXJhbGF4XHJcbmNyZWF0ZVBhcmFsbGF4KCcuaG9tZScsICcuaG9tZV9yZXByZXNlbnRfYmFja2dyb3VuZEltZycpXHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbFRpbWVyID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgc3BhbicpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVGltZXIgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIC52aWRlb19wbGF5ZXIgc3BhbicpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjb25kcykge1xyXG4gICAgICAgIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCk7XHJcbiAgICAgICAgY29uc3Qgc2VjcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKTtcclxuICAgICAgICByZXR1cm4gYCR7bWlucy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9OiR7c2Vjcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyl9YDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcih2aWRlbywgdGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHJlbWFpbmluZ1RpbWUgPSB2aWRlby5kdXJhdGlvbiAtIHZpZGVvLmN1cnJlbnRUaW1lO1xyXG4gICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IGZvcm1hdFRpbWUocmVtYWluaW5nVGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlUGxheUJ1dHRvbih2aWRlbywgcGxheUltZykge1xyXG4gICAgICAgIGlmICghdmlkZW8gfHwgIXBsYXlJbWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0dXBWaWRlb0xpc3RlbmVycyh2aWRlbywgcGxheUltZywgdGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVUaW1lcih2aWRlbywgdGltZXJFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB1cGRhdGVUaW1lcih2aWRlbywgdGltZXJFbGVtZW50KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxWaWRlbyAmJiBvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZywgb3JpZ2luYWxUaW1lcik7XHJcbiAgICAgICAgdG9nZ2xlUGxheUJ1dHRvbihvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvICYmIG1vZGFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMobW9kYWxWaWRlbywgbW9kYWxQbGF5SW1nLCBtb2RhbFRpbWVyKTtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGxheUJ1dHRvbiAmJiBvcmlnaW5hbFZpZGVvKSB7XHJcbiAgICAgICAgcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9yaWdpbmFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Nb2RhbFdpdGhWaWRlbygpIHtcclxuICAgICAgICBpZiAoIW9yaWdpbmFsVmlkZW8gfHwgIW1vZGFsVmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wbGF5KCkuY2F0Y2goZSA9PiBjb25zb2xlLmxvZygnTW9kYWwgdmlkZW8gcGxheSBlcnJvcjonLCBlKSk7XHJcblxyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB1cGRhdGVUaW1lcihtb2RhbFZpZGVvLCBtb2RhbFRpbWVyKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVRpbWVyKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3N1Ym1pdEJ1dHRvbicpO1xyXG4gICAgY29uc3QgZW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG4gICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmNy1mb3JtJyk7XHJcbiAgICBjb25zdCBjaGVja2JveGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlQnV0dG9uU3RhdGUoKSB7XHJcbiAgICAgICAgY29uc3Qgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Y3LXN1Ym1pdCcpO1xyXG4gICAgICAgIGlmIChzdWJtaXRCdXR0b24pIHtcclxuICAgICAgICAgICAgaWYgKGNoZWNrYm94ZXNbMF0uY2hlY2tlZCAmJiBjaGVja2JveGVzWzFdLmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tib3hlcy5mb3JFYWNoKGNoZWNrYm94ID0+IHtcclxuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVCdXR0b25TdGF0ZSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGN1c3RvbUNoZWNrYm94ID0gY2hlY2tib3guY2xvc2VzdCgnLmNoZWNrYm94Jyk7XHJcbiAgICAgICAgaWYgKGN1c3RvbUNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgIGN1c3RvbUNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBjaGVja2JveCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSAhY2hlY2tib3guY2hlY2tlZDtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnY2hhbmdlJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG5cclxuICAgIGlmIChzdWJtaXRCdXR0b24gJiYgZW1haWxJbnB1dCAmJiBmb3JtKSB7XHJcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsID0gZW1haWxJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIXZhbGlkYXRlRW1haWwoZW1haWwpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LmNsYXNzTGlzdC5hZGQoJ3dwY2Y3LW5vdC12YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgZW1haWxJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZW1haWxJbnB1dC5wbGFjZWhvbGRlciA9ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBlbWFpbCBhZGRyZXNzJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnd3BjZjctbm90LXZhbGlkJykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnd3BjZjctbm90LXZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYWNlaG9sZGVyID0gJ0UtbWFpbCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKGVtYWlsKSB7XHJcbiAgICAgICAgY29uc3QgZW1haWxSZWdleCA9IC9eW15cXHNAXStAW15cXHNAXStcXC5bXlxcc0BdKyQvO1xyXG4gICAgICAgIHJldHVybiBlbWFpbFJlZ2V4LnRlc3QoZW1haWwpO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjYXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxlYWRfZGlzdHJpYnV0aW9uX2MyJyk7XHJcbiAgICBjb25zdCBjYXJJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5sZF9jMl9jb250YWluZXJfaXRlbScpO1xyXG4gICAgY29uc3QgYW5pbWF0ZWRDYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYW5pbWF0ZWQtY2FyJyk7XHJcblxyXG4gICAgaWYgKCFjYXJTZWN0aW9uIHx8ICFhbmltYXRlZENhcikgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGl0ZW1Qb3NpdGlvbnMgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVQb3NpdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvblJlY3QgPSBjYXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGl0ZW1Qb3NpdGlvbnMubGVuZ3RoID0gMDtcclxuXHJcbiAgICAgICAgY2FySXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbVJlY3QgPSBpdGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3NpdGlvbkZyb21Ub3AgPSBpdGVtUmVjdC50b3AgLSBzZWN0aW9uUmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRQb3NpdGlvbiA9IChwb3NpdGlvbkZyb21Ub3AgLyBzZWN0aW9uUmVjdC5oZWlnaHQpICogMTAwO1xyXG4gICAgICAgICAgICBpdGVtUG9zaXRpb25zLnB1c2gobm9ybWFsaXplZFBvc2l0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc0VsZW1lbnRJblZpZXdwb3J0KGVsKSB7XHJcbiAgICAgICAgY29uc3QgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIHJlY3QudG9wIDw9ICh3aW5kb3cuaW5uZXJIZWlnaHQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCkgKiAwLjggJiZcclxuICAgICAgICAgICAgcmVjdC5ib3R0b20gPj0gMFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdHJhY2tBbmltYXRpb25Qcm9ncmVzcygpIHtcclxuICAgICAgICBjb25zdCBjYXJSZWN0ID0gYW5pbWF0ZWRDYXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3Qgc2VjdGlvblJlY3QgPSBjYXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCBjYXJQcm9ncmVzcyA9ICgoY2FyUmVjdC50b3AgLSBzZWN0aW9uUmVjdC50b3ApIC8gc2VjdGlvblJlY3QuaGVpZ2h0KSAqIDEwMDtcclxuXHJcbiAgICAgICAgY2FySXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaXRlbVBvc2l0aW9uID0gaXRlbVBvc2l0aW9uc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjYXJQcm9ncmVzcyA+PSBpdGVtUG9zaXRpb24gLSA1ICYmICFpdGVtLmNsYXNzTGlzdC5jb250YWlucygncmV2ZWFsZWQnKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVDYXJBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKGlzRWxlbWVudEluVmlld3BvcnQoY2FyU2VjdGlvbikpIHtcclxuICAgICAgICAgICAgY2FsY3VsYXRlUG9zaXRpb25zKCk7XHJcblxyXG4gICAgICAgICAgICBhbmltYXRlZENhci5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncnVubmluZyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhbmltYXRpb25JbnRlcnZhbCA9IHNldEludGVydmFsKHRyYWNrQW5pbWF0aW9uUHJvZ3Jlc3MsIDEwMCk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYW5pbWF0aW9uSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICAgICAgY2FySXRlbXMuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LmFkZCgncmV2ZWFsZWQnKSk7XHJcbiAgICAgICAgICAgIH0sIDEwNTAwKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhY3RpdmF0ZUNhckFuaW1hdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdwYXVzZWQnO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjYWxjdWxhdGVQb3NpdGlvbnMpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBhY3RpdmF0ZUNhckFuaW1hdGlvbik7XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY2FsY3VsYXRlUG9zaXRpb25zKCk7XHJcbiAgICAgICAgYWN0aXZhdGVDYXJBbmltYXRpb24oKTtcclxuICAgIH0sIDEwMCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRjM2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRjM2lucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGQnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGZpbmlzaGJ1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRmaW5pc2hpbnB1dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pOyIsImltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tICcuLi9nbG9iYWwnO1xyXG5cclxuLy8gcmVwcmVzZW50XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmxlYWRfZGlzdHJpYnV0aW9uX3JlcHJlc2VudCcsICcuYmFja19sZF9yZXByZXNlbnQnKTtcclxuXHJcbi8vIGNvbXBvbmVudDNcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcubGVhZF9kaXN0cmlidXRpb25fYzMnLCAnLmxkX2MzX2JhY2snKTtcclxuXHJcbi8vIGZpbmlzaFxyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5sZF9maW5pc2gnLCAnLmxkX2ZpbmlzaF9iYWNrJyk7IiwiY29uc3QgY3JlYXRlUGFyYWxsYXggPSByZXF1aXJlKFwiLi4vZ2xvYmFsXCIpO1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5wYXJ0bmVyX3BsYXRmb3JtX3JlcHJlc2VudCcsICcucGFydG5lcl9wbGF0Zm9ybV9yZXByZXNlbnQgLmJhY2snKTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHAnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBjb252ZXJzaW9uc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnZlcnNpb25zJyk7XHJcbiAgICBjb25zdCBjbGlja3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGlja3MnKTtcclxuICAgIGNvbnN0IGZ1bmRzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVuZHMnKTtcclxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVQZXJjZW50YWdlKCkge1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9ucyA9IHBhcnNlSW50KGNvbnZlcnNpb25zSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgY2xpY2tzID0gcGFyc2VJbnQoY2xpY2tzSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZnVuZHMgPSBwYXJzZUludChmdW5kc0lucHV0LnZhbHVlKSB8fCA3MDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc092ZXJmbG93ID0gTWF0aC5tYXgoMCwgY29udmVyc2lvbnMgLSAxMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNpb25zWSA9IGNvbnZlcnNpb25zT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjbGlja3NPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNsaWNrcyAtIDEwMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrc1kgPSBjbGlja3NPdmVyZmxvdyAvIDEwMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IFkgPSBjb252ZXJzaW9uc1kgKyBjbGlja3NZO1xyXG5cclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9ICgxMDAwICsgKDQgKiBZKSkgLyBmdW5kcztcclxuXHJcbiAgICAgICAgbGV0IGZpbmFsUGVyY2VudGFnZSA9IE1hdGgubWluKHBlcmNlbnRhZ2UgKiAxMDAsIDE0KTtcclxuXHJcbiAgICAgICAgcmVzdWx0RGl2LnRleHRDb250ZW50ID0gZmluYWxQZXJjZW50YWdlLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVyc2lvbnNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNhbGN1bGF0ZVBlcmNlbnRhZ2UpO1xyXG4gICAgY2xpY2tzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGZ1bmRzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuXHJcbiAgICBjYWxjdWxhdGVQZXJjZW50YWdlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2lucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIxLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIzLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI0LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI1LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI2LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcycpO1xyXG5yZXF1aXJlKCcuL3BhcnRuZXItcGxhdGZvcm0vcHAtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vbGVhZC1kaXN0cmlidXRpb24vbGQtY29tcG9uZW50Mi5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvY2FzZS1maW5pc2guanMnKTtcclxucmVxdWlyZSgnLi9sZWFkLWRpc3RyaWJ1dGlvbi9wYXJhbGxheC5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvcGFyYWxsYXguanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFydG5lclNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJjaGVja0lucHV0VmFsdWUiLCJ2YWx1ZSIsInRyaW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJtYWluRW1haWxJbnB1dCIsInBvcHVwRW1haWxJbnB1dCIsInNsaWRlciIsImlzRG93biIsInN0YXJ0WCIsInNjcm9sbExlZnQiLCJhbmltYXRpb25GcmFtZSIsInZlbG9jaXR5IiwibGFzdFgiLCJsYXN0VGltZSIsInNtb290aFNjcm9sbCIsIk1hdGgiLCJhYnMiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJlIiwicGFnZVgiLCJvZmZzZXRMZWZ0IiwiRGF0ZSIsIm5vdyIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicHJldmVudERlZmF1bHQiLCJ4Iiwid2FsayIsImN1cnJlbnRUaW1lIiwiZGVsdGFUaW1lIiwiZGVsdGFYIiwidG91Y2hlcyIsImNyZWF0ZVBhcmFsbGF4IiwiY29udGFpbmVyIiwibGFiZWxXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25maWciLCJ0cmlnZ2VyT2Zmc2V0Iiwic3RlcERlbGF5IiwiYW5pbWF0aW9uRGlzdGFuY2UiLCJoYW5kbGVTY3JvbGxBbmltYXRpb24iLCJjb250YWluZXJSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyVG9wIiwidG9wIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJib3R0b20iLCJwcm9ncmVzcyIsImZvckVhY2giLCJ3cmFwcGVyIiwiaW5kZXgiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwib25TY3JvbGwiLCJwYXNzaXZlIiwicGFyZW50Q2xhc3MiLCJpbWdDbGFzcyIsInBhcmFsbGF4SW1nIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJpc0FjdGl2ZSIsImFuaW1hdGlvbkZyYW1lSWQiLCJpbnRlcnNlY3Rpb25PYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsImVudHJ5IiwiaXNJbnRlcnNlY3RpbmciLCJzdGFydFBhcmFsbGF4Iiwic3RvcFBhcmFsbGF4Iiwicm9vdE1hcmdpbiIsInVwZGF0ZVBhcmFsbGF4IiwicmVjdCIsInNjcm9sbGVkIiwic3BlZWQiLCJvZmZzZXQiLCJzdHlsZSIsInNldFByb3BlcnR5Iiwib2JzZXJ2ZSIsImRpc2Nvbm5lY3QiLCJtb2R1bGUiLCJleHBvcnRzIiwibWVudUl0ZW1zIiwiZHJvcGRvd25UcmlnZ2VycyIsImRyb3Bkb3duQ29udGFpbmVyIiwiZHJvcGRvd25Db250ZW50cyIsImNsb3NlVGltZW91dCIsImxlYXZlVGltZW91dCIsImFjdGl2ZVRyaWdnZXIiLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJkaXNwbGF5IiwiY2xlYXJBY3RpdmUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJ1bmRlZmluZWQiLCJjb250ZW50IiwidCIsImtleSIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwiYXZhdGFyQnV0dG9ucyIsInJldmlld3NDb250YWluZXIiLCJyZXZpZXdzIiwiY2VudGVyUmV2aWV3IiwidGFyZ2V0Q2xpZW50IiwiYWN0aXZlUmV2aWV3IiwiY29udGFpbmVyV2lkdGgiLCJyZXZpZXdXaWR0aCIsImdhcCIsInJldmlld0luZGV4IiwiQXJyYXkiLCJmcm9tIiwiaW5kZXhPZiIsInRvdGFsSXRlbXNXaWR0aCIsInRyYW5zaXRpb24iLCJzd2l0Y2hSZXZpZXciLCJ0YXJnZXQiLCJhIiwiciIsInNlbGVjdGVkQXZhdGFyIiwiY2xvc2VzdCIsImJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsImluaXRDZW50ZXJSZXZpZXciLCJpbml0aWFsU2VsZWN0ZWQiLCJpbml0aWFsVGFyZ2V0IiwiY3VycmVudFNlbGVjdGVkIiwiY3VycmVudFRhcmdldCIsImNhc2VzIiwiY29udGFpbmVyQm90dG9tIiwidHJpZ2dlclBvaW50IiwidmlzaWJsZUhlaWdodCIsIm1heFNjcm9sbGFibGUiLCJzY3JvbGxQcm9ncmVzcyIsImNhc2VFbCIsImFjY29yZGlvbkl0ZW1zIiwiY29udGFpbnMiLCJvdGhlckl0ZW0iLCJwb3B1cE92ZXJsYXkiLCJjbG9zZUJ1dHRvbiIsImZvcm0iLCJvcGVuQnV0dG9ucyIsInRpbWVyRWxlbWVudCIsInRpbWVySW50ZXJ2YWwiLCJ0b3RhbFNlY29uZHMiLCJpc1RpbWVyUnVubmluZyIsInN0YXJ0VGltZXIiLCJjbGVhckludGVydmFsIiwidXBkYXRlVGltZXJEaXNwbGF5Iiwic2V0SW50ZXJ2YWwiLCJ0aW1lckNvbXBsZXRlIiwiaG91cnMiLCJmbG9vciIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZm9ybWF0dGVkVGltZSIsIlN0cmluZyIsInBhZFN0YXJ0IiwidGV4dENvbnRlbnQiLCJzdG9wVGltZXIiLCJjb25zb2xlIiwibG9nIiwiY2xvc2VQb3B1cCIsIm9wZW5Qb3B1cCIsImJvZHkiLCJvdmVyZmxvdyIsIm9wZW5CdXR0b24iLCJ2aWRlbyIsImdldEVsZW1lbnRCeUlkIiwidmlkZW9Db250YWluZXIiLCJwbGF5QnV0dG9uIiwidXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkiLCJwYXVzZWQiLCJwbGF5IiwicGF1c2UiLCJjb3VudGVyRWxlbWVudCIsImNvdW50ZXJEaXYiLCJzaWduSW5CdXR0b24iLCJlbGVtZW50cyIsInVwZGF0ZVRpbWVyIiwiZWxlbWVudCIsImh1bmRyZWR0aHMiLCJmb3JtYXR0ZWRTZWNvbmRzIiwidG9TdHJpbmciLCJmb3JtYXR0ZWRIdW5kcmVkdGhzIiwidmlkZW9XcmFwcGVyIiwibW9kYWxPdmVybGF5Iiwib3JpZ2luYWxWaWRlbyIsIm1vZGFsVmlkZW8iLCJvcmlnaW5hbFBsYXlJbWciLCJtb2RhbFBsYXlJbWciLCJvcmlnaW5hbFRpbWVyIiwibW9kYWxUaW1lciIsImZvcm1hdFRpbWUiLCJtaW5zIiwic2VjcyIsInJlbWFpbmluZ1RpbWUiLCJkdXJhdGlvbiIsInRvZ2dsZVBsYXlCdXR0b24iLCJwbGF5SW1nIiwic2V0dXBWaWRlb0xpc3RlbmVycyIsInN0b3BQcm9wYWdhdGlvbiIsIm9wZW5Nb2RhbFdpdGhWaWRlbyIsImNsb3NlTW9kYWwiLCJzdWJtaXRCdXR0b24iLCJlbWFpbElucHV0IiwiY2hlY2tib3hlcyIsInVwZGF0ZUJ1dHRvblN0YXRlIiwiY2hlY2tlZCIsImRpc2FibGVkIiwiY2hlY2tib3giLCJjdXN0b21DaGVja2JveCIsImRpc3BhdGNoRXZlbnQiLCJFdmVudCIsImVtYWlsIiwidmFsaWRhdGVFbWFpbCIsInBsYWNlaG9sZGVyIiwiZW1haWxSZWdleCIsInRlc3QiLCJjYXJTZWN0aW9uIiwiY2FySXRlbXMiLCJhbmltYXRlZENhciIsIml0ZW1Qb3NpdGlvbnMiLCJjYWxjdWxhdGVQb3NpdGlvbnMiLCJzZWN0aW9uUmVjdCIsIml0ZW1SZWN0IiwicG9zaXRpb25Gcm9tVG9wIiwibm9ybWFsaXplZFBvc2l0aW9uIiwicHVzaCIsImlzRWxlbWVudEluVmlld3BvcnQiLCJlbCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsInRyYWNrQW5pbWF0aW9uUHJvZ3Jlc3MiLCJjYXJSZWN0IiwiY2FyUHJvZ3Jlc3MiLCJpdGVtUG9zaXRpb24iLCJhY3RpdmF0ZUNhckFuaW1hdGlvbiIsImFuaW1hdGlvblBsYXlTdGF0ZSIsImFuaW1hdGlvbkludGVydmFsIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInJlcXVpcmUiLCJjb252ZXJzaW9uc0lucHV0IiwiY2xpY2tzSW5wdXQiLCJmdW5kc0lucHV0IiwicmVzdWx0RGl2IiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsImNvbnZlcnNpb25zIiwicGFyc2VJbnQiLCJjbGlja3MiLCJmdW5kcyIsImNvbnZlcnNpb25zT3ZlcmZsb3ciLCJjb252ZXJzaW9uc1kiLCJjbGlja3NPdmVyZmxvdyIsImNsaWNrc1kiLCJZIiwicGVyY2VudGFnZSIsImZpbmFsUGVyY2VudGFnZSIsInRvRml4ZWQiXSwic291cmNlUm9vdCI6IiJ9