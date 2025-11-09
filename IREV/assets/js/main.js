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

// parallax
document.addEventListener('DOMContentLoaded', function () {
  var partnersec = document.querySelector('.home');
  if (!partnersec) return;
  var partnerSection = document.querySelector('.home_gear2_upper_container');
  var parallaxImg = document.querySelector('.home_gear2_upper_container img');
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

// parallax
document.addEventListener('DOMContentLoaded', function () {
  var partnersec = document.querySelector('.home');
  if (!partnersec) return;
  var partnerSection = document.querySelector('.home_gear3_container');
  var parallaxImg = document.querySelector('.home_gear3_background');
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

/***/ "./IREV/src/js/home/home-gear4.js":
/*!****************************************!*\
  !*** ./IREV/src/js/home/home-gear4.js ***!
  \****************************************/
/***/ (() => {

// parallax
document.addEventListener('DOMContentLoaded', function () {
  var partnersec = document.querySelector('.home, .pp');
  if (!partnersec) return;
  var partnerSection = document.querySelector('.home_gear4_container');
  var parallaxImg = document.querySelectorAll('.home_gear4_container img');
  if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var updateParallax = function updateParallax() {
      var rect = partnerSection.getBoundingClientRect();
      var scrolled = -rect.top;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      partnerSection.style.setProperty('--parallax-offset', offset);
    };
    parallaxImg.forEach(function (img) {
      return img.classList.add('parallax');
    });
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
document.addEventListener('DOMContentLoaded', function () {
  var partnersec = document.querySelector('.home');
  if (!partnersec) return;
  var partnerSection = document.querySelector('.home_gear4_lower_container');
  var parallaxImg = document.querySelectorAll('.gear4back');
  if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var updateParallax = function updateParallax() {
      var rect = partnerSection.getBoundingClientRect();
      var scrolled = -rect.top;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      partnerSection.style.setProperty('--parallax-offset', offset);
    };
    parallaxImg.forEach(function (img) {
      return img.classList.add('parallax');
    });
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

document.addEventListener('DOMContentLoaded', function () {
  var partnerSection = document.querySelector('.home_gear6_container');
  if (!partnerSection) {
    return;
  }
  var parallaxImg = document.querySelectorAll('.home_gear6_container img');
  if (parallaxImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var updateParallax = function updateParallax() {
      var rect = partnerSection.getBoundingClientRect();
      var scrolled = -rect.top;
      var speed = 0.3;
      var offset = scrolled * speed + 'px';
      partnerSection.style.setProperty('--parallax-offset', offset);
    };
    parallaxImg.forEach(function (img) {
      return img.classList.add('parallax');
    });
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
/***/ (() => {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianMvbWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQUEsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBRXRELElBQUksQ0FBQ0QsY0FBYyxFQUFFO0lBQ2pCO0VBQ0o7RUFFQSxJQUFNRSxlQUFlLEdBQUdKLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLG1CQUFtQixDQUFDO0VBQ25FLElBQU1FLEtBQUssR0FBR0wsUUFBUSxDQUFDRyxhQUFhLENBQUMsa0JBQWtCLENBQUM7RUFFeEQsSUFBRyxDQUFDQyxlQUFlLElBQUksQ0FBQ0MsS0FBSyxFQUFDO0lBQzFCO0VBQ0o7RUFFQSxTQUFTQyxlQUFlQSxDQUFBLEVBQUc7SUFDdkIsSUFBSUQsS0FBSyxDQUFDRSxLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO01BQzNCSixlQUFlLENBQUNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDLE1BQU07TUFDSE4sZUFBZSxDQUFDSyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDakQ7RUFDSjtFQUVBTixLQUFLLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRUssZUFBZSxDQUFDO0VBRWhEQSxlQUFlLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUM7QUFHRk4sUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFLO0VBQy9DOztFQUVBLElBQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsT0FBTyxDQUFDO0VBRXRELElBQUksQ0FBQ0QsY0FBYyxFQUFFO0lBQ2pCO0VBQ0o7RUFFQSxJQUFNVSxjQUFjLEdBQUdaLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLGtCQUFrQixDQUFDO0VBQ2pFLElBQU1VLGVBQWUsR0FBR2IsUUFBUSxDQUFDRyxhQUFhLENBQUMscURBQXFELENBQUM7RUFFckcsSUFBSVMsY0FBYyxJQUFJQyxlQUFlLEVBQUU7SUFDbkNELGNBQWMsQ0FBQ1gsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7TUFDakRZLGVBQWUsQ0FBQ04sS0FBSyxHQUFHLElBQUksQ0FBQ0EsS0FBSztJQUN0QyxDQUFDLENBQUM7SUFFRk0sZUFBZSxDQUFDWixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtNQUNsRFcsY0FBYyxDQUFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDQSxLQUFLO0lBQ3JDLENBQUMsQ0FBQztJQUVGLElBQUlLLGNBQWMsQ0FBQ0wsS0FBSyxFQUFFO01BQ3RCTSxlQUFlLENBQUNOLEtBQUssR0FBR0ssY0FBYyxDQUFDTCxLQUFLO0lBQ2hEO0VBQ0o7QUFFSixDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7QUN0RHFDO0FBRXZDTyw4Q0FBYyxDQUFDLDJCQUEyQixFQUFFLHNCQUFzQixDQUFDO0FBQ25FQSw4Q0FBYyxDQUFDLG9CQUFvQixFQUFFLG1CQUFtQixDQUFDO0FBR3pEZCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBTWMsU0FBUyxHQUFHZixRQUFRLENBQUNHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUM5RCxJQUFNYSxhQUFhLEdBQUdoQixRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyxtQ0FBbUMsQ0FBQztFQUVwRixJQUFNQyxNQUFNLEdBQUc7SUFDWEMsYUFBYSxFQUFFLEdBQUc7SUFDbEJDLFNBQVMsRUFBRSxHQUFHO0lBQ2RDLGlCQUFpQixFQUFFO0VBQ3ZCLENBQUM7RUFFRCxTQUFTQyxxQkFBcUJBLENBQUEsRUFBRztJQUM3QixJQUFJLENBQUNQLFNBQVMsRUFBRTtJQUVoQixJQUFNUSxhQUFhLEdBQUdSLFNBQVMsQ0FBQ1MscUJBQXFCLENBQUMsQ0FBQztJQUN2RCxJQUFNQyxZQUFZLEdBQUdGLGFBQWEsQ0FBQ0csR0FBRztJQUN0QyxJQUFNQyxlQUFlLEdBQUdKLGFBQWEsQ0FBQ0ssTUFBTTtJQUM1QyxJQUFNQyxZQUFZLEdBQUdDLE1BQU0sQ0FBQ0MsV0FBVztJQUV2QyxJQUFJTixZQUFZLEdBQUdJLFlBQVksSUFBSU4sYUFBYSxDQUFDUyxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3pELElBQU1DLFFBQVEsR0FBRyxDQUFDLEdBQUlSLFlBQVksSUFBSUksWUFBWSxHQUFHRixlQUFlLENBQUU7TUFFdEVYLGFBQWEsQ0FBQ2tCLE9BQU8sQ0FBQyxVQUFDQyxPQUFPLEVBQUVDLEtBQUssRUFBSztRQUN0QyxJQUFNQyxTQUFTLEdBQUcsQ0FBQ0QsS0FBSyxHQUFHLENBQUMsSUFBSWxCLE1BQU0sQ0FBQ0UsU0FBUztRQUVoRCxJQUFJYSxRQUFRLElBQUlJLFNBQVMsRUFBRTtVQUN2QkYsT0FBTyxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7VUFDOUN5QixPQUFPLENBQUMxQixTQUFTLENBQUNFLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztRQUNwRCxDQUFDLE1BQU07VUFDSHdCLE9BQU8sQ0FBQzFCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO1VBQzdDeUIsT0FBTyxDQUFDMUIsU0FBUyxDQUFDRSxNQUFNLENBQUMsdUJBQXVCLENBQUM7UUFDckQ7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLE1BQU07TUFDSEssYUFBYSxDQUFDa0IsT0FBTyxDQUFDLFVBQUFDLE9BQU8sRUFBSTtRQUM3QkEsT0FBTyxDQUFDMUIsU0FBUyxDQUFDQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7UUFDN0N5QixPQUFPLENBQUMxQixTQUFTLENBQUNFLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztNQUNyRCxDQUFDLENBQUM7SUFDTjtFQUNKO0VBRUEsSUFBSTJCLE9BQU8sR0FBRyxLQUFLO0VBQ25CLFNBQVNDLFFBQVFBLENBQUEsRUFBRztJQUNoQixJQUFJLENBQUNELE9BQU8sRUFBRTtNQUNWRSxxQkFBcUIsQ0FBQyxZQUFNO1FBQ3hCbEIscUJBQXFCLENBQUMsQ0FBQztRQUN2QmdCLE9BQU8sR0FBRyxLQUFLO01BQ25CLENBQUMsQ0FBQztNQUNGQSxPQUFPLEdBQUcsSUFBSTtJQUNsQjtFQUNKO0VBRUF0QixhQUFhLENBQUNrQixPQUFPLENBQUMsVUFBQUMsT0FBTyxFQUFJO0lBQzdCQSxPQUFPLENBQUMxQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQztFQUNqRCxDQUFDLENBQUM7RUFFRlkscUJBQXFCLENBQUMsQ0FBQztFQUN2QlEsTUFBTSxDQUFDN0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFc0MsUUFBUSxFQUFFO0lBQUVFLE9BQU8sRUFBRTtFQUFLLENBQUMsQ0FBQztBQUNsRSxDQUFDLENBQUMsQzs7Ozs7Ozs7OztBQy9ERixTQUFTM0IsY0FBY0EsQ0FBQzRCLFdBQVcsRUFBRUMsUUFBUSxFQUFDO0VBQzFDM0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0lBRXJELElBQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUN1QyxXQUFXLENBQUM7SUFFMUQsSUFBTUUsV0FBVyxHQUFHNUMsUUFBUSxDQUFDRyxhQUFhLENBQUN3QyxRQUFRLENBQUM7SUFFcEQsSUFBRyxDQUFDekMsY0FBYyxJQUFJLENBQUMwQyxXQUFXLEVBQUM7TUFDL0I7SUFDSjtJQUVBLElBQUlBLFdBQVcsSUFBSSxDQUFDZCxNQUFNLENBQUNlLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDQyxPQUFPLEVBQUU7TUFBQSxJQUd0RUMsY0FBYyxHQUF2QixTQUFTQSxjQUFjQSxDQUFBLEVBQUc7UUFDdEIsSUFBTUMsSUFBSSxHQUFHOUMsY0FBYyxDQUFDc0IscUJBQXFCLENBQUMsQ0FBQztRQUNuRCxJQUFNeUIsUUFBUSxHQUFHLENBQUNELElBQUksQ0FBQ3RCLEdBQUc7UUFDMUIsSUFBTXdCLEtBQUssR0FBRyxHQUFHO1FBQ2pCLElBQU1DLE1BQU0sR0FBSUYsUUFBUSxHQUFHQyxLQUFLLEdBQUksSUFBSTtRQUV4Q2hELGNBQWMsQ0FBQ2tELEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQixFQUFFRixNQUFNLENBQUM7TUFDakUsQ0FBQztNQVREUCxXQUFXLENBQUNuQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFXckMsSUFBSTRCLE9BQU8sR0FBRyxLQUFLO01BQ25CUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztRQUN6QyxJQUFJLENBQUNxQyxPQUFPLEVBQUU7VUFDVkUscUJBQXFCLENBQUMsWUFBVztZQUM3Qk8sY0FBYyxDQUFDLENBQUM7WUFDaEJULE9BQU8sR0FBRyxLQUFLO1VBQ25CLENBQUMsQ0FBQztVQUNGQSxPQUFPLEdBQUcsSUFBSTtRQUNsQjtNQUNKLENBQUMsQ0FBQztNQUVGUyxjQUFjLENBQUMsQ0FBQztJQUNwQjtFQUNKLENBQUMsQ0FBQztBQUNOO0FBRUFPLE1BQU0sQ0FBQ0MsT0FBTyxHQUFHekMsY0FBYyxDOzs7Ozs7Ozs7O0FDdkMvQmQsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU11RCxTQUFTLEdBQUd4RCxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyxtQkFBbUIsQ0FBQztFQUNoRSxJQUFNd0MsZ0JBQWdCLEdBQUd6RCxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQztFQUM3RSxJQUFNeUMsaUJBQWlCLEdBQUcxRCxRQUFRLENBQUNHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztFQUMzRSxJQUFNd0QsZ0JBQWdCLEdBQUczRCxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyx5QkFBeUIsQ0FBQztFQUM3RSxJQUFJMkMsWUFBWTtFQUNoQixJQUFJQyxZQUFZO0VBQ2hCLElBQUlDLGFBQWEsR0FBRyxJQUFJO0VBRXhCTixTQUFTLENBQUN0QixPQUFPLENBQUMsVUFBQTZCLElBQUksRUFBSTtJQUN0QkEsSUFBSSxDQUFDOUQsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQU07TUFDdEMrRCxZQUFZLENBQUNKLFlBQVksQ0FBQztNQUMxQkksWUFBWSxDQUFDSCxZQUFZLENBQUM7TUFFMUJMLFNBQVMsQ0FBQ3RCLE9BQU8sQ0FBQyxVQUFBK0IsQ0FBQztRQUFBLE9BQUlBLENBQUMsS0FBS0YsSUFBSSxJQUFJRSxDQUFDLENBQUN4RCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFBQSxFQUFDO01BQ2xFb0QsSUFBSSxDQUFDdEQsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ2hDLENBQUMsQ0FBQztJQUVGcUQsSUFBSSxDQUFDOUQsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQU07TUFDdEM0RCxZQUFZLEdBQUdLLFVBQVUsQ0FBQyxZQUFNO1FBQzVCLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsQ0FBQyxFQUFFO1VBQ3hCSixJQUFJLENBQUN0RCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDL0JtRCxhQUFhLEdBQUcsSUFBSTtVQUNwQk0saUJBQWlCLENBQUMsQ0FBQztRQUN2QjtNQUNKLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDWCxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRlgsZ0JBQWdCLENBQUN2QixPQUFPLENBQUMsVUFBQW1DLE9BQU8sRUFBSTtJQUNoQ0EsT0FBTyxDQUFDcEUsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQVc7TUFBQSxJQUFBcUUsS0FBQTtNQUM5Q04sWUFBWSxDQUFDSixZQUFZLENBQUM7TUFDMUJKLFNBQVMsQ0FBQ3RCLE9BQU8sQ0FBQyxVQUFBK0IsQ0FBQztRQUFBLE9BQUlBLENBQUMsS0FBS0ssS0FBSSxJQUFJTCxDQUFDLENBQUN4RCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFBQSxFQUFDO01BQ2xFLElBQUksQ0FBQ0YsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO01BRTVCb0QsYUFBYSxHQUFHLElBQUk7TUFDcEIsSUFBTVMsWUFBWSxHQUFHLElBQUksQ0FBQ0MsT0FBTyxDQUFDQyxlQUFlO01BQ2pEQyxZQUFZLENBQUNILFlBQVksQ0FBQztJQUM5QixDQUFDLENBQUM7SUFFRkYsT0FBTyxDQUFDcEUsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQU07TUFDekMyRCxZQUFZLEdBQUdNLFVBQVUsQ0FBQyxZQUFNO1FBQzVCLElBQUksQ0FBQ0MsbUJBQW1CLENBQUMsQ0FBQyxFQUFFQyxpQkFBaUIsQ0FBQyxDQUFDO01BQ25ELENBQUMsRUFBRSxHQUFHLENBQUM7SUFDWCxDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7RUFFRixJQUFJVixpQkFBaUIsRUFBRTtJQUNuQkEsaUJBQWlCLENBQUN6RCxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUU7TUFBQSxPQUFNK0QsWUFBWSxDQUFDSixZQUFZLENBQUM7SUFBQSxFQUFDO0lBQ2xGRixpQkFBaUIsQ0FBQ3pELGdCQUFnQixDQUFDLFlBQVksRUFBRSxZQUFNO01BQ25EMkQsWUFBWSxHQUFHTSxVQUFVLENBQUNFLGlCQUFpQixFQUFFLEdBQUcsQ0FBQztJQUNyRCxDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNNLFlBQVlBLENBQUNDLElBQUksRUFBRTtJQUN4QlAsaUJBQWlCLENBQUMsS0FBSyxDQUFDO0lBQ3hCVixpQkFBaUIsQ0FBQ2pELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztJQUV6QyxJQUFNa0UsYUFBYSxHQUFHNUUsUUFBUSxDQUFDRyxhQUFhLDZCQUFBMEUsTUFBQSxDQUE0QkYsSUFBSSxRQUFJLENBQUM7SUFDakYsSUFBSUMsYUFBYSxFQUFFQSxhQUFhLENBQUN4QixLQUFLLENBQUMwQixPQUFPLEdBQUcsTUFBTTtFQUMzRDtFQUVBLFNBQVNWLGlCQUFpQkEsQ0FBQSxFQUFxQjtJQUFBLElBQXBCVyxXQUFXLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxRQUFBRCxTQUFBLFFBQUFFLFNBQUEsR0FBQUYsU0FBQSxNQUFHLElBQUk7SUFDekN0QixpQkFBaUIsQ0FBQ2pELFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUM1Q2dELGdCQUFnQixDQUFDekIsT0FBTyxDQUFDLFVBQUFpRCxPQUFPO01BQUEsT0FBSUEsT0FBTyxDQUFDL0IsS0FBSyxDQUFDMEIsT0FBTyxHQUFHLE1BQU07SUFBQSxFQUFDO0lBRW5FLElBQUlDLFdBQVcsRUFBRTtNQUNidkIsU0FBUyxDQUFDdEIsT0FBTyxDQUFDLFVBQUErQixDQUFDO1FBQUEsT0FBSUEsQ0FBQyxDQUFDeEQsU0FBUyxDQUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO01BQUEsRUFBQztNQUNwRDhDLGdCQUFnQixDQUFDdkIsT0FBTyxDQUFDLFVBQUFrRCxDQUFDO1FBQUEsT0FBSUEsQ0FBQyxDQUFDM0UsU0FBUyxDQUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO01BQUEsRUFBQztNQUMzRG1ELGFBQWEsR0FBRyxJQUFJO0lBQ3hCO0VBQ0o7RUFFQSxTQUFTSyxtQkFBbUJBLENBQUEsRUFBRztJQUMzQixPQUFPVCxpQkFBaUIsQ0FBQ1osT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUNyQ2dCLGFBQWEsSUFBSUEsYUFBYSxDQUFDaEIsT0FBTyxDQUFDLFFBQVEsQ0FBRTtFQUMxRDtFQUVBOUMsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBQW9GLENBQUMsRUFBSTtJQUN0QyxJQUFJQSxDQUFDLENBQUNDLEdBQUcsS0FBSyxRQUFRLEVBQUVsQixpQkFBaUIsQ0FBQyxDQUFDO0VBQy9DLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pGRixJQUFNckQsU0FBUyxHQUFHZixRQUFRLENBQUNHLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQztBQUN2RSxJQUFNb0YsUUFBUSxHQUFHdkYsUUFBUSxDQUFDRyxhQUFhLENBQUMsbUJBQW1CLENBQUM7QUFDNUQsSUFBTXFGLE9BQU8sR0FBR3hGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLGlDQUFpQyxDQUFDO0FBRXpFLFNBQVNzRixxQkFBcUJBLENBQUEsRUFBRztFQUU3QixJQUFNdkYsY0FBYyxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFFdEQsSUFBSSxDQUFDRCxjQUFjLEVBQUU7SUFDakI7RUFDSjtFQUVBLElBQU04QyxJQUFJLEdBQUdqQyxTQUFTLENBQUNTLHFCQUFxQixDQUFDLENBQUM7RUFDOUMsSUFBTUssWUFBWSxHQUFHQyxNQUFNLENBQUNDLFdBQVc7RUFFdkMsSUFBSUUsUUFBUSxHQUFHLENBQUMsR0FBR2UsSUFBSSxDQUFDdEIsR0FBRyxHQUFHRyxZQUFZO0VBQzFDSSxRQUFRLEdBQUd5RCxJQUFJLENBQUNDLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDRSxHQUFHLENBQUMzRCxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0VBRTdDLElBQU00RCxLQUFLLEdBQUdILElBQUksQ0FBQ0MsR0FBRyxDQUNsQixJQUFJLEdBQUdILE9BQU8sQ0FBQ00sV0FBVyxFQUMxQmhFLE1BQU0sQ0FBQ2lFLFVBQVUsR0FBR1AsT0FBTyxDQUFDTSxXQUFXLEdBQUcsRUFDOUMsQ0FBQztFQUVETixPQUFPLENBQUNwQyxLQUFLLENBQUM0QyxTQUFTLGlCQUFBbkIsTUFBQSxDQUFpQjVDLFFBQVEsR0FBRzRELEtBQUssUUFBSztFQUU3RE4sUUFBUSxDQUFDbkMsS0FBSyxDQUFDNEMsU0FBUyxhQUFBbkIsTUFBQSxDQUFhNUMsUUFBUSxNQUFHO0FBQ3BEO0FBRUEsU0FBU00sUUFBUUEsQ0FBQSxFQUFHO0VBQ2hCLElBQU1yQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUV0RCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBQ0FzQyxxQkFBcUIsQ0FBQ2lELHFCQUFxQixDQUFDO0FBQ2hEO0FBRUEzRCxNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVzQyxRQUFRLENBQUM7QUFDM0NULE1BQU0sQ0FBQzdCLGdCQUFnQixDQUFDLFFBQVEsRUFBRXdGLHFCQUFxQixDQUFDO0FBRXhEQSxxQkFBcUIsQ0FBQyxDQUFDOztBQUl2QjtBQUNBekYsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1nRyxVQUFVLEdBQUdqRyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDbEQsSUFBSSxDQUFDOEYsVUFBVSxFQUFFO0VBRWpCLElBQU0vRixjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLDZCQUE2QixDQUFDO0VBRTVFLElBQU15QyxXQUFXLEdBQUc1QyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQztFQUU3RSxJQUFJeUMsV0FBVyxJQUFJLENBQUNkLE1BQU0sQ0FBQ2UsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUNDLE9BQU8sRUFBRTtJQUFBLElBR3RFQyxjQUFjLEdBQXZCLFNBQVNBLGNBQWNBLENBQUEsRUFBRztNQUN0QixJQUFNQyxJQUFJLEdBQUc5QyxjQUFjLENBQUNzQixxQkFBcUIsQ0FBQyxDQUFDO01BQ25ELElBQU15QixRQUFRLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDdEIsR0FBRztNQUMxQixJQUFNd0IsS0FBSyxHQUFHLEdBQUc7TUFDakIsSUFBTUMsTUFBTSxHQUFJRixRQUFRLEdBQUdDLEtBQUssR0FBSSxJQUFJO01BRXhDaEQsY0FBYyxDQUFDa0QsS0FBSyxDQUFDQyxXQUFXLENBQUMsbUJBQW1CLEVBQUVGLE1BQU0sQ0FBQztJQUNqRSxDQUFDO0lBVERQLFdBQVcsQ0FBQ25DLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQVdyQyxJQUFJNEIsT0FBTyxHQUFHLEtBQUs7SUFDbkJSLE1BQU0sQ0FBQzdCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFXO01BQ3pDLElBQUksQ0FBQ3FDLE9BQU8sRUFBRTtRQUNWRSxxQkFBcUIsQ0FBQyxZQUFXO1VBQzdCTyxjQUFjLENBQUMsQ0FBQztVQUNoQlQsT0FBTyxHQUFHLEtBQUs7UUFDbkIsQ0FBQyxDQUFDO1FBQ0ZBLE9BQU8sR0FBRyxJQUFJO01BQ2xCO0lBQ0osQ0FBQyxDQUFDO0lBRUZTLGNBQWMsQ0FBQyxDQUFDO0VBQ3BCO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUM5RUYvQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBTWlHLGFBQWEsR0FBR2xHLFFBQVEsQ0FBQ2lCLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDO0VBQ3RFLElBQU1rRixnQkFBZ0IsR0FBR25HLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLHFCQUFxQixDQUFDO0VBQ3RFLElBQU1pRyxPQUFPLEdBQUdwRyxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyw0QkFBNEIsQ0FBQztFQUV2RSxTQUFTb0YsWUFBWUEsQ0FBQ0MsWUFBWSxFQUFFO0lBQ2hDLElBQU1DLFlBQVksR0FBR3ZHLFFBQVEsQ0FBQ0csYUFBYSw2Q0FBQTBFLE1BQUEsQ0FBNEN5QixZQUFZLFFBQUksQ0FBQztJQUN4RyxJQUFJLENBQUNDLFlBQVksRUFBRTtJQUVuQixJQUFNQyxjQUFjLEdBQUdMLGdCQUFnQixDQUFDTCxXQUFXO0lBQ25ELElBQU1XLFdBQVcsR0FBR0YsWUFBWSxDQUFDVCxXQUFXO0lBQzVDLElBQU1ZLEdBQUcsR0FBRyxFQUFFO0lBRWQsSUFBTUMsV0FBVyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ1QsT0FBTyxDQUFDLENBQUNVLE9BQU8sQ0FBQ1AsWUFBWSxDQUFDO0lBRTdELElBQU1RLGVBQWUsR0FBR0osV0FBVyxJQUFJRixXQUFXLEdBQUdDLEdBQUcsQ0FBQztJQUN6RCxJQUFNdkQsTUFBTSxHQUFJcUQsY0FBYyxHQUFHLENBQUMsR0FBS0MsV0FBVyxHQUFHLENBQUUsR0FBR00sZUFBZTtJQUV6RVosZ0JBQWdCLENBQUMvQyxLQUFLLENBQUM0RCxVQUFVLEdBQUcscUJBQXFCO0lBQ3pEYixnQkFBZ0IsQ0FBQy9DLEtBQUssQ0FBQzRDLFNBQVMsaUJBQUFuQixNQUFBLENBQWlCMUIsTUFBTSxRQUFLO0VBQ2hFO0VBRUEsU0FBUzhELFlBQVlBLENBQUNDLE1BQU0sRUFBRTtJQUMxQmxILFFBQVEsQ0FBQ2lCLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxDQUFDaUIsT0FBTyxDQUFDLFVBQUFpRixDQUFDO01BQUEsT0FBSUEsQ0FBQyxDQUFDMUcsU0FBUyxDQUFDRSxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQUEsRUFBQztJQUN0RnlGLE9BQU8sQ0FBQ2xFLE9BQU8sQ0FBQyxVQUFBa0YsQ0FBQztNQUFBLE9BQUlBLENBQUMsQ0FBQzNHLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUFBLEVBQUM7SUFFcEQsSUFBTTBHLGNBQWMsR0FBR3JILFFBQVEsQ0FBQ0csYUFBYSx1Q0FBQTBFLE1BQUEsQ0FBc0NxQyxNQUFNLFFBQUksQ0FBQyxDQUFDSSxPQUFPLENBQUMsY0FBYyxDQUFDO0lBQ3RILElBQU1mLFlBQVksR0FBR3ZHLFFBQVEsQ0FBQ0csYUFBYSw2Q0FBQTBFLE1BQUEsQ0FBNENxQyxNQUFNLFFBQUksQ0FBQztJQUVsRyxJQUFJRyxjQUFjLElBQUlkLFlBQVksRUFBRTtNQUNoQ2MsY0FBYyxDQUFDNUcsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQ3hDNkYsWUFBWSxDQUFDOUYsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQ3RDMkYsWUFBWSxDQUFDYSxNQUFNLENBQUM7SUFDeEI7RUFDSjtFQUVBaEIsYUFBYSxDQUFDaEUsT0FBTyxDQUFDLFVBQUFxRixNQUFNLEVBQUk7SUFDNUJBLE1BQU0sQ0FBQ3RILGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ25DLElBQU1pSCxNQUFNLEdBQUdLLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLGNBQWMsQ0FBQztNQUNsRFAsWUFBWSxDQUFDQyxNQUFNLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUYsU0FBU08sZ0JBQWdCQSxDQUFBLEVBQUc7SUFDeEJ2RCxVQUFVLENBQUMsWUFBTTtNQUNiLElBQU13RCxlQUFlLEdBQUcxSCxRQUFRLENBQUNHLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztNQUM5RSxJQUFJdUgsZUFBZSxFQUFFO1FBQ2pCLElBQU1DLGFBQWEsR0FBR0QsZUFBZSxDQUFDRixZQUFZLENBQUMsY0FBYyxDQUFDO1FBQ2xFbkIsWUFBWSxDQUFDc0IsYUFBYSxDQUFDO01BQy9CO0lBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYO0VBRUFGLGdCQUFnQixDQUFDLENBQUM7RUFFbEIzRixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtJQUNwQyxJQUFNMkgsZUFBZSxHQUFHNUgsUUFBUSxDQUFDRyxhQUFhLENBQUMsOEJBQThCLENBQUM7SUFDOUUsSUFBSXlILGVBQWUsRUFBRTtNQUNqQixJQUFNQyxhQUFhLEdBQUdELGVBQWUsQ0FBQ0osWUFBWSxDQUFDLGNBQWMsQ0FBQztNQUNsRXRELFVBQVUsQ0FBQztRQUFBLE9BQU1tQyxZQUFZLENBQUN3QixhQUFhLENBQUM7TUFBQSxHQUFFLEVBQUUsQ0FBQztJQUNyRDtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQzs7QUFFRjtBQUNBN0gsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1jLFNBQVMsR0FBR2YsUUFBUSxDQUFDRyxhQUFhLENBQUMsNkJBQTZCLENBQUM7RUFDdkUsSUFBTTJILEtBQUssR0FBRzlILFFBQVEsQ0FBQ2lCLGdCQUFnQixDQUFDLG1DQUFtQyxDQUFDO0VBRTVFLElBQU1DLE1BQU0sR0FBRztJQUNYQyxhQUFhLEVBQUUsR0FBRztJQUNsQkMsU0FBUyxFQUFFLElBQUk7SUFDZkMsaUJBQWlCLEVBQUU7RUFDdkIsQ0FBQztFQUVELFNBQVNDLHFCQUFxQkEsQ0FBQSxFQUFHO0lBQzdCLElBQUksQ0FBQ1AsU0FBUyxFQUFFO0lBRWhCLElBQU1RLGFBQWEsR0FBR1IsU0FBUyxDQUFDUyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3ZELElBQU1DLFlBQVksR0FBR0YsYUFBYSxDQUFDRyxHQUFHO0lBQ3RDLElBQU1DLGVBQWUsR0FBR0osYUFBYSxDQUFDSyxNQUFNO0lBQzVDLElBQU1DLFlBQVksR0FBR0MsTUFBTSxDQUFDQyxXQUFXO0lBRXZDLElBQU1nRyxlQUFlLEdBQUd0RyxZQUFZLEdBQUdFLGVBQWU7SUFDdEQsSUFBTXFHLFlBQVksR0FBR25HLFlBQVksR0FBR1gsTUFBTSxDQUFDQyxhQUFhO0lBRXhELElBQUlNLFlBQVksR0FBR0ksWUFBWSxHQUFHbUcsWUFBWSxJQUFJRCxlQUFlLEdBQUdDLFlBQVksRUFBRTtNQUM5RSxJQUFNQyxhQUFhLEdBQUd2QyxJQUFJLENBQUNDLEdBQUcsQ0FBQ29DLGVBQWUsRUFBRWxHLFlBQVksQ0FBQyxHQUFHNkQsSUFBSSxDQUFDRSxHQUFHLENBQUNuRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO01BQ3pGLElBQU15RyxhQUFhLEdBQUd2RyxlQUFlLEdBQUdFLFlBQVksR0FBSUEsWUFBWSxHQUFHWCxNQUFNLENBQUNDLGFBQWM7TUFDNUYsSUFBTThCLFFBQVEsR0FBRyxDQUFDeEIsWUFBWSxHQUFJSSxZQUFZLEdBQUdYLE1BQU0sQ0FBQ0MsYUFBYztNQUN0RSxJQUFNZ0gsY0FBYyxHQUFHekMsSUFBSSxDQUFDRSxHQUFHLENBQUMsQ0FBQyxFQUFFRixJQUFJLENBQUNDLEdBQUcsQ0FBQyxDQUFDLEVBQUUxQyxRQUFRLEdBQUdpRixhQUFhLENBQUMsQ0FBQztNQUV6RUosS0FBSyxDQUFDNUYsT0FBTyxDQUFDLFVBQUNrRyxNQUFNLEVBQUVoRyxLQUFLLEVBQUs7UUFDN0IsSUFBTUMsU0FBUyxHQUFHRCxLQUFLLEdBQUdsQixNQUFNLENBQUNFLFNBQVM7UUFFMUMsSUFBSStHLGNBQWMsSUFBSTlGLFNBQVMsRUFBRTtVQUM3QitGLE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGNBQWMsQ0FBQztVQUNwQzBILE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUMxQyxDQUFDLE1BQU07VUFDSHlILE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztVQUNuQzBILE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUMzQztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsTUFBTTtNQUNIbUgsS0FBSyxDQUFDNUYsT0FBTyxDQUFDLFVBQUFrRyxNQUFNLEVBQUk7UUFDcEJBLE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUNuQzBILE1BQU0sQ0FBQzNILFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQztNQUMzQyxDQUFDLENBQUM7SUFDTjtFQUNKO0VBRUEsSUFBSTJCLE9BQU8sR0FBRyxLQUFLO0VBQ25CLFNBQVNDLFFBQVFBLENBQUEsRUFBRztJQUNoQixJQUFJLENBQUNELE9BQU8sRUFBRTtNQUNWRSxxQkFBcUIsQ0FBQyxZQUFNO1FBQ3hCbEIscUJBQXFCLENBQUMsQ0FBQztRQUN2QmdCLE9BQU8sR0FBRyxLQUFLO01BQ25CLENBQUMsQ0FBQztNQUNGQSxPQUFPLEdBQUcsSUFBSTtJQUNsQjtFQUNKO0VBRUFoQixxQkFBcUIsQ0FBQyxDQUFDO0VBQ3ZCUSxNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVzQyxRQUFRLEVBQUU7SUFBRUUsT0FBTyxFQUFFO0VBQUssQ0FBQyxDQUFDO0FBQ2xFLENBQUMsQ0FBQzs7QUFLRjtBQUNBekMsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1nRyxVQUFVLEdBQUdqRyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDbEQsSUFBSSxDQUFDOEYsVUFBVSxFQUFFO0VBRWpCLElBQU0vRixjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLHVCQUF1QixDQUFDO0VBRXRFLElBQU15QyxXQUFXLEdBQUc1QyxRQUFRLENBQUNHLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQztFQUVwRSxJQUFJeUMsV0FBVyxJQUFJLENBQUNkLE1BQU0sQ0FBQ2UsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLENBQUNDLE9BQU8sRUFBRTtJQUFBLElBR3RFQyxjQUFjLEdBQXZCLFNBQVNBLGNBQWNBLENBQUEsRUFBRztNQUN0QixJQUFNQyxJQUFJLEdBQUc5QyxjQUFjLENBQUNzQixxQkFBcUIsQ0FBQyxDQUFDO01BQ25ELElBQU15QixRQUFRLEdBQUcsQ0FBQ0QsSUFBSSxDQUFDdEIsR0FBRztNQUMxQixJQUFNd0IsS0FBSyxHQUFHLEdBQUc7TUFDakIsSUFBTUMsTUFBTSxHQUFJRixRQUFRLEdBQUdDLEtBQUssR0FBSSxJQUFJO01BRXhDaEQsY0FBYyxDQUFDa0QsS0FBSyxDQUFDQyxXQUFXLENBQUMsbUJBQW1CLEVBQUVGLE1BQU0sQ0FBQztJQUNqRSxDQUFDO0lBVERQLFdBQVcsQ0FBQ25DLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQVdyQyxJQUFJNEIsT0FBTyxHQUFHLEtBQUs7SUFDbkJSLE1BQU0sQ0FBQzdCLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxZQUFXO01BQ3pDLElBQUksQ0FBQ3FDLE9BQU8sRUFBRTtRQUNWRSxxQkFBcUIsQ0FBQyxZQUFXO1VBQzdCTyxjQUFjLENBQUMsQ0FBQztVQUNoQlQsT0FBTyxHQUFHLEtBQUs7UUFDbkIsQ0FBQyxDQUFDO1FBQ0ZBLE9BQU8sR0FBRyxJQUFJO01BQ2xCO0lBQ0osQ0FBQyxDQUFDO0lBRUZTLGNBQWMsQ0FBQyxDQUFDO0VBQ3BCO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUNuS0Y7QUFDQS9DLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUVyRCxJQUFNZ0csVUFBVSxHQUFHakcsUUFBUSxDQUFDRyxhQUFhLENBQUMsWUFBWSxDQUFDO0VBQ3ZELElBQUksQ0FBQzhGLFVBQVUsRUFBRTtFQUdqQixJQUFNL0YsY0FBYyxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztFQUV0RSxJQUFNeUMsV0FBVyxHQUFHNUMsUUFBUSxDQUFDaUIsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUM7RUFFMUUsSUFBSTJCLFdBQVcsSUFBSSxDQUFDZCxNQUFNLENBQUNlLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDQyxPQUFPLEVBQUU7SUFBQSxJQUd0RUMsY0FBYyxHQUF2QixTQUFTQSxjQUFjQSxDQUFBLEVBQUc7TUFDdEIsSUFBTUMsSUFBSSxHQUFHOUMsY0FBYyxDQUFDc0IscUJBQXFCLENBQUMsQ0FBQztNQUNuRCxJQUFNeUIsUUFBUSxHQUFHLENBQUNELElBQUksQ0FBQ3RCLEdBQUc7TUFDMUIsSUFBTXdCLEtBQUssR0FBRyxHQUFHO01BQ2pCLElBQU1DLE1BQU0sR0FBSUYsUUFBUSxHQUFHQyxLQUFLLEdBQUksSUFBSTtNQUV4Q2hELGNBQWMsQ0FBQ2tELEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQixFQUFFRixNQUFNLENBQUM7SUFDakUsQ0FBQztJQVREUCxXQUFXLENBQUNWLE9BQU8sQ0FBQyxVQUFBbUcsR0FBRztNQUFBLE9BQUVBLEdBQUcsQ0FBQzVILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUFBLEVBQUM7SUFXdkQsSUFBSTRCLE9BQU8sR0FBRyxLQUFLO0lBQ25CUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztNQUN6QyxJQUFJLENBQUNxQyxPQUFPLEVBQUU7UUFDVkUscUJBQXFCLENBQUMsWUFBVztVQUM3Qk8sY0FBYyxDQUFDLENBQUM7VUFDaEJULE9BQU8sR0FBRyxLQUFLO1FBQ25CLENBQUMsQ0FBQztRQUNGQSxPQUFPLEdBQUcsSUFBSTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUVGUyxjQUFjLENBQUMsQ0FBQztFQUNwQjtBQUNKLENBQUMsQ0FBQztBQUdGL0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1nRyxVQUFVLEdBQUdqRyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxPQUFPLENBQUM7RUFDbEQsSUFBSSxDQUFDOEYsVUFBVSxFQUFFO0VBRWpCLElBQU0vRixjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLDZCQUE2QixDQUFDO0VBRTVFLElBQU15QyxXQUFXLEdBQUc1QyxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyxZQUFZLENBQUM7RUFFM0QsSUFBSTJCLFdBQVcsSUFBSSxDQUFDZCxNQUFNLENBQUNlLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDQyxPQUFPLEVBQUU7SUFBQSxJQUd0RUMsY0FBYyxHQUF2QixTQUFTQSxjQUFjQSxDQUFBLEVBQUc7TUFDdEIsSUFBTUMsSUFBSSxHQUFHOUMsY0FBYyxDQUFDc0IscUJBQXFCLENBQUMsQ0FBQztNQUNuRCxJQUFNeUIsUUFBUSxHQUFHLENBQUNELElBQUksQ0FBQ3RCLEdBQUc7TUFDMUIsSUFBTXdCLEtBQUssR0FBRyxHQUFHO01BQ2pCLElBQU1DLE1BQU0sR0FBSUYsUUFBUSxHQUFHQyxLQUFLLEdBQUksSUFBSTtNQUV4Q2hELGNBQWMsQ0FBQ2tELEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQixFQUFFRixNQUFNLENBQUM7SUFDakUsQ0FBQztJQVREUCxXQUFXLENBQUNWLE9BQU8sQ0FBQyxVQUFBbUcsR0FBRztNQUFBLE9BQUVBLEdBQUcsQ0FBQzVILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUFBLEVBQUM7SUFXdkQsSUFBSTRCLE9BQU8sR0FBRyxLQUFLO0lBQ25CUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztNQUN6QyxJQUFJLENBQUNxQyxPQUFPLEVBQUU7UUFDVkUscUJBQXFCLENBQUMsWUFBVztVQUM3Qk8sY0FBYyxDQUFDLENBQUM7VUFDaEJULE9BQU8sR0FBRyxLQUFLO1FBQ25CLENBQUMsQ0FBQztRQUNGQSxPQUFPLEdBQUcsSUFBSTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUVGUyxjQUFjLENBQUMsQ0FBQztFQUNwQjtBQUNKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDeEVGL0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1xSSxjQUFjLEdBQUd0SSxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQztFQUVuRXFILGNBQWMsQ0FBQ3BHLE9BQU8sQ0FBQyxVQUFDNkIsSUFBSSxFQUFLO0lBQzdCLElBQU13RCxNQUFNLEdBQUd4RCxJQUFJLENBQUM1RCxhQUFhLENBQUMsUUFBUSxDQUFDO0lBRTNDLElBQUlvSCxNQUFNLEVBQUU7TUFDUkEsTUFBTSxDQUFDdEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07UUFDbkMsSUFBSThELElBQUksQ0FBQ3RELFNBQVMsQ0FBQzhILFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtVQUNuQ3hFLElBQUksQ0FBQ3RELFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNuQyxDQUFDLE1BQU07VUFDSDJILGNBQWMsQ0FBQ3BHLE9BQU8sQ0FBQyxVQUFDc0csU0FBUyxFQUFLO1lBQ2xDQSxTQUFTLENBQUMvSCxTQUFTLENBQUNFLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDeEMsQ0FBQyxDQUFDO1VBQ0ZvRCxJQUFJLENBQUN0RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDaEM7TUFDSixDQUFDLENBQUM7SUFDTjtFQUNKLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDbkJGVixRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFFckQsSUFBTUMsY0FBYyxHQUFHRixRQUFRLENBQUNHLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztFQUV0RSxJQUFHLENBQUNELGNBQWMsRUFBQztJQUNmO0VBQ0o7RUFFQSxJQUFNMEMsV0FBVyxHQUFHNUMsUUFBUSxDQUFDaUIsZ0JBQWdCLENBQUMsMkJBQTJCLENBQUM7RUFFMUUsSUFBSTJCLFdBQVcsSUFBSSxDQUFDZCxNQUFNLENBQUNlLFVBQVUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDQyxPQUFPLEVBQUU7SUFBQSxJQUd0RUMsY0FBYyxHQUF2QixTQUFTQSxjQUFjQSxDQUFBLEVBQUc7TUFDdEIsSUFBTUMsSUFBSSxHQUFHOUMsY0FBYyxDQUFDc0IscUJBQXFCLENBQUMsQ0FBQztNQUNuRCxJQUFNeUIsUUFBUSxHQUFHLENBQUNELElBQUksQ0FBQ3RCLEdBQUc7TUFDMUIsSUFBTXdCLEtBQUssR0FBRyxHQUFHO01BQ2pCLElBQU1DLE1BQU0sR0FBSUYsUUFBUSxHQUFHQyxLQUFLLEdBQUksSUFBSTtNQUV4Q2hELGNBQWMsQ0FBQ2tELEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQixFQUFFRixNQUFNLENBQUM7SUFDakUsQ0FBQztJQVREUCxXQUFXLENBQUNWLE9BQU8sQ0FBQyxVQUFBbUcsR0FBRztNQUFBLE9BQUVBLEdBQUcsQ0FBQzVILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUFBLEVBQUM7SUFXdkQsSUFBSTRCLE9BQU8sR0FBRyxLQUFLO0lBQ25CUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztNQUN6QyxJQUFJLENBQUNxQyxPQUFPLEVBQUU7UUFDVkUscUJBQXFCLENBQUMsWUFBVztVQUM3Qk8sY0FBYyxDQUFDLENBQUM7VUFDaEJULE9BQU8sR0FBRyxLQUFLO1FBQ25CLENBQUMsQ0FBQztRQUNGQSxPQUFPLEdBQUcsSUFBSTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUVGUyxjQUFjLENBQUMsQ0FBQztFQUNwQjtBQUNKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDbkNGL0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU13SSxZQUFZLEdBQUd6SSxRQUFRLENBQUNHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztFQUNsRSxJQUFNdUksV0FBVyxHQUFHMUksUUFBUSxDQUFDRyxhQUFhLENBQUMsa0NBQWtDLENBQUM7RUFDOUUsSUFBTXdJLElBQUksR0FBRzNJLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLDBCQUEwQixDQUFDO0VBQy9ELElBQU15SSxXQUFXLEdBQUc1SSxRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyxvREFBb0QsQ0FBQztFQUNuRyxJQUFNNEgsWUFBWSxHQUFHN0ksUUFBUSxDQUFDRyxhQUFhLENBQUMsMkNBQTJDLENBQUM7RUFFeEYsSUFBSTJJLGFBQWEsR0FBRyxJQUFJO0VBQ3hCLElBQUlDLFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7RUFDNUIsSUFBSUMsY0FBYyxHQUFHLEtBQUs7RUFFMUIsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0lBQ2xCLElBQUksQ0FBQ0osWUFBWSxFQUFFO0lBRW5CLElBQUlHLGNBQWMsRUFBRTtJQUVwQkEsY0FBYyxHQUFHLElBQUk7SUFFckJELFlBQVksR0FBRyxFQUFFLEdBQUcsRUFBRTtJQUV0QixJQUFJRCxhQUFhLEVBQUU7TUFDZkksYUFBYSxDQUFDSixhQUFhLENBQUM7SUFDaEM7SUFFQUssa0JBQWtCLENBQUMsQ0FBQztJQUVwQkwsYUFBYSxHQUFHTSxXQUFXLENBQUMsWUFBVztNQUNuQyxJQUFJTCxZQUFZLEdBQUcsQ0FBQyxFQUFFO1FBQ2xCQSxZQUFZLEVBQUU7UUFDZCxJQUFJTixZQUFZLElBQUlBLFlBQVksQ0FBQ3JGLEtBQUssQ0FBQzBCLE9BQU8sS0FBSyxPQUFPLEVBQUU7VUFDeERxRSxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3hCO01BQ0osQ0FBQyxNQUFNO1FBQ0hELGFBQWEsQ0FBQ0osYUFBYSxDQUFDO1FBQzVCQSxhQUFhLEdBQUcsSUFBSTtRQUNwQkUsY0FBYyxHQUFHLEtBQUs7UUFDdEJLLGFBQWEsQ0FBQyxDQUFDO01BQ25CO0lBQ0osQ0FBQyxFQUFFLElBQUksQ0FBQztFQUNaO0VBRUEsU0FBU0Ysa0JBQWtCQSxDQUFBLEVBQUc7SUFDMUIsSUFBTUcsS0FBSyxHQUFHNUQsSUFBSSxDQUFDNkQsS0FBSyxDQUFDUixZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQzdDLElBQU1TLE9BQU8sR0FBRzlELElBQUksQ0FBQzZELEtBQUssQ0FBRVIsWUFBWSxHQUFHLElBQUksR0FBSSxFQUFFLENBQUM7SUFDdEQsSUFBTVUsT0FBTyxHQUFHVixZQUFZLEdBQUcsRUFBRTtJQUVqQyxJQUFNVyxhQUFhLEdBQ2ZDLE1BQU0sQ0FBQ0wsS0FBSyxDQUFDLENBQUNNLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUNwQ0QsTUFBTSxDQUFDSCxPQUFPLENBQUMsQ0FBQ0ksUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQ3RDRCxNQUFNLENBQUNGLE9BQU8sQ0FBQyxDQUFDRyxRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUVwQ2YsWUFBWSxDQUFDZ0IsV0FBVyxHQUFHSCxhQUFhO0VBQzVDO0VBRUEsU0FBU0ksU0FBU0EsQ0FBQSxFQUFHO0lBQ2pCLElBQUloQixhQUFhLEVBQUU7TUFDZkksYUFBYSxDQUFDSixhQUFhLENBQUM7TUFDNUJBLGFBQWEsR0FBRyxJQUFJO01BQ3BCRSxjQUFjLEdBQUcsS0FBSztJQUMxQjtFQUNKO0VBRUEsU0FBU0ssYUFBYUEsQ0FBQSxFQUFHO0lBQ3JCVSxPQUFPLENBQUNDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQztJQUMvQixJQUFJdkIsWUFBWSxJQUFJQSxZQUFZLENBQUNyRixLQUFLLENBQUMwQixPQUFPLEtBQUssT0FBTyxFQUFFO01BQ3hEbUYsVUFBVSxDQUFDLENBQUM7SUFDaEI7RUFDSjtFQUVBLFNBQVNDLFNBQVNBLENBQUEsRUFBRztJQUNqQixJQUFJekIsWUFBWSxFQUFFO01BQ2RBLFlBQVksQ0FBQ3JGLEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxPQUFPO01BQ3BDOUUsUUFBUSxDQUFDbUssSUFBSSxDQUFDL0csS0FBSyxDQUFDZ0gsUUFBUSxHQUFHLFFBQVE7TUFFdkNsRyxVQUFVLENBQUMsWUFBTTtRQUNidUUsWUFBWSxDQUFDaEksU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQ3NJLGNBQWMsRUFBRTtVQUNqQkMsVUFBVSxDQUFDLENBQUM7UUFDaEIsQ0FBQyxNQUFNO1VBQ0hFLGtCQUFrQixDQUFDLENBQUM7UUFDeEI7TUFDSixDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ1Y7RUFDSjtFQUVBLFNBQVNjLFVBQVVBLENBQUEsRUFBRztJQUNsQixJQUFJeEIsWUFBWSxFQUFFO01BQ2RBLFlBQVksQ0FBQ2hJLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUV2Q3VELFVBQVUsQ0FBQyxZQUFNO1FBQ2J1RSxZQUFZLENBQUNyRixLQUFLLENBQUMwQixPQUFPLEdBQUcsTUFBTTtRQUNuQzlFLFFBQVEsQ0FBQ21LLElBQUksQ0FBQy9HLEtBQUssQ0FBQ2dILFFBQVEsR0FBRyxFQUFFO01BQ3JDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDWDtFQUNKO0VBRUEsSUFBSXhCLFdBQVcsRUFBRTtJQUNiQSxXQUFXLENBQUMxRyxPQUFPLENBQUMsVUFBQW1JLFVBQVUsRUFBSTtNQUM5QkEsVUFBVSxDQUFDcEssZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7UUFDN0NBLENBQUMsQ0FBQ2lGLGNBQWMsQ0FBQyxDQUFDO1FBQ2xCSixTQUFTLENBQUMsQ0FBQztNQUNmLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNOO0VBRUEsSUFBSXhCLFdBQVcsRUFBRTtJQUNiQSxXQUFXLENBQUN6SSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVnSyxVQUFVLENBQUM7RUFDckQ7RUFFQSxJQUFJeEIsWUFBWSxFQUFFO0lBQ2RBLFlBQVksQ0FBQ3hJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTb0YsQ0FBQyxFQUFFO01BQy9DLElBQUlBLENBQUMsQ0FBQzZCLE1BQU0sS0FBS3VCLFlBQVksRUFBRTtRQUMzQndCLFVBQVUsQ0FBQyxDQUFDO01BQ2hCO0lBQ0osQ0FBQyxDQUFDO0VBQ047RUFFQWpLLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7SUFDN0MsSUFBSUEsQ0FBQyxDQUFDQyxHQUFHLEtBQUssUUFBUSxFQUFFO01BQ3BCMkUsVUFBVSxDQUFDLENBQUM7SUFDaEI7RUFDSixDQUFDLENBQUM7RUFFRixJQUFNTSxLQUFLLEdBQUd2SyxRQUFRLENBQUN3SyxjQUFjLENBQUMsWUFBWSxDQUFDO0VBQ25ELElBQU1DLGNBQWMsR0FBR3pLLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLDJDQUEyQyxDQUFDO0VBQzFGLElBQU11SyxVQUFVLEdBQUdELGNBQWMsQ0FBQ3RLLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFFdEQsU0FBU3dLLDBCQUEwQkEsQ0FBQSxFQUFHO0lBQ2xDLElBQUlKLEtBQUssQ0FBQ0ssTUFBTSxFQUFFO01BQ2RGLFVBQVUsQ0FBQ3RILEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxPQUFPO0lBQ3RDLENBQUMsTUFBTTtNQUNINEYsVUFBVSxDQUFDdEgsS0FBSyxDQUFDMEIsT0FBTyxHQUFHLE1BQU07SUFDckM7RUFDSjtFQUVBLElBQUl5RixLQUFLLElBQUlFLGNBQWMsSUFBSUMsVUFBVSxFQUFFO0lBQ3ZDSCxLQUFLLENBQUN0SyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUwSywwQkFBMEIsQ0FBQztJQUMxREosS0FBSyxDQUFDdEssZ0JBQWdCLENBQUMsT0FBTyxFQUFFMEssMEJBQTBCLENBQUM7SUFDM0RKLEtBQUssQ0FBQ3RLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO01BQ3ZDeUssVUFBVSxDQUFDdEgsS0FBSyxDQUFDMEIsT0FBTyxHQUFHLE9BQU87SUFDdEMsQ0FBQyxDQUFDO0lBRUYyRixjQUFjLENBQUN4SyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUNoRCxJQUFJc0ssS0FBSyxDQUFDSyxNQUFNLEVBQUU7UUFDZEwsS0FBSyxDQUFDTSxJQUFJLENBQUMsQ0FBQztNQUNoQixDQUFDLE1BQU07UUFDSE4sS0FBSyxDQUFDTyxLQUFLLENBQUMsQ0FBQztNQUNqQjtJQUNKLENBQUMsQ0FBQztJQUVGSCwwQkFBMEIsQ0FBQyxDQUFDO0VBQ2hDO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUN4SkYzSyxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBTUcsZUFBZSxHQUFHSixRQUFRLENBQUNHLGFBQWEsQ0FBQyx1Q0FBdUMsQ0FBQztFQUN2RixJQUFNRSxLQUFLLEdBQUdMLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLHNDQUFzQyxDQUFDO0VBRTVFLElBQUcsQ0FBQ0MsZUFBZSxJQUFJLENBQUNDLEtBQUssRUFBQztJQUMxQjtFQUNKO0VBRUEsU0FBU0MsZUFBZUEsQ0FBQSxFQUFHO0lBQ3ZCLElBQUlELEtBQUssQ0FBQ0UsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtNQUMzQkosZUFBZSxDQUFDSyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDOUMsQ0FBQyxNQUFNO01BQ0hOLGVBQWUsQ0FBQ0ssU0FBUyxDQUFDRSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2pEO0VBQ0o7RUFFQU4sS0FBSyxDQUFDSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVLLGVBQWUsQ0FBQztFQUVoREEsZUFBZSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBRUZOLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUV0RCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBRUEsSUFBTTZLLGNBQWMsR0FBRy9LLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLDhCQUE4QixDQUFDO0VBQzdFLElBQU02SyxVQUFVLEdBQUdoTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztFQUNwRSxJQUFNOEssWUFBWSxHQUFHakwsUUFBUSxDQUFDRyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7RUFDN0QsSUFBTUUsS0FBSyxHQUFHTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztFQUU1RSxJQUFNK0ssUUFBUSxHQUFHLENBQUNGLFVBQVUsRUFBRUMsWUFBWSxFQUFFNUssS0FBSyxDQUFDO0VBRWxELElBQUkwSSxZQUFZLEdBQUcsQ0FBQyxHQUFHLEdBQUc7RUFFMUIsU0FBU29DLFdBQVdBLENBQUEsRUFBRztJQUNuQnBDLFlBQVksRUFBRTtJQUVkLElBQUlBLFlBQVksR0FBRyxDQUFDLEVBQUU7TUFDbEJtQyxRQUFRLENBQUNoSixPQUFPLENBQUMsVUFBQWtKLE9BQU87UUFBQSxPQUFFQSxPQUFPLENBQUMzSyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDO01BQUEsRUFBQztNQUNqRXVLLFFBQVEsQ0FBQ2hKLE9BQU8sQ0FBQyxVQUFBa0osT0FBTztRQUFBLE9BQUVBLE9BQU8sQ0FBQzNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLElBQUksQ0FBQztNQUFBLEVBQUM7TUFDdERxSyxjQUFjLENBQUNsQixXQUFXLEdBQUcsVUFBVTtNQUN2QztJQUNKO0lBRUEsSUFBTUosT0FBTyxHQUFHL0QsSUFBSSxDQUFDNkQsS0FBSyxDQUFDUixZQUFZLEdBQUcsR0FBRyxDQUFDO0lBQzlDLElBQU1zQyxVQUFVLEdBQUd0QyxZQUFZLEdBQUcsR0FBRztJQUVyQyxJQUFNdUMsZ0JBQWdCLEdBQUc3QixPQUFPLENBQUM4QixRQUFRLENBQUMsQ0FBQyxDQUFDM0IsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7SUFDNUQsSUFBTTRCLG1CQUFtQixHQUFHSCxVQUFVLENBQUNFLFFBQVEsQ0FBQyxDQUFDLENBQUMzQixRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztJQUVsRW1CLGNBQWMsQ0FBQ2xCLFdBQVcsU0FBQWhGLE1BQUEsQ0FBU3lHLGdCQUFnQixPQUFBekcsTUFBQSxDQUFJMkcsbUJBQW1CLENBQUU7SUFFNUUsUUFBUXpDLFlBQVk7TUFDaEIsS0FBSyxHQUFHO1FBQUU7VUFDTm1DLFFBQVEsQ0FBQ2hKLE9BQU8sQ0FBQyxVQUFBa0osT0FBTztZQUFBLE9BQUVBLE9BQU8sQ0FBQzNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLEtBQUssQ0FBQztVQUFBLEVBQUM7VUFDdkQ7UUFDSjtNQUNBLEtBQUssR0FBRztRQUFFO1VBQ053SyxRQUFRLENBQUNoSixPQUFPLENBQUMsVUFBQWtKLE9BQU87WUFBQSxPQUFFQSxPQUFPLENBQUMzSyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxLQUFLLENBQUM7VUFBQSxFQUFDO1VBQzFEdUssUUFBUSxDQUFDaEosT0FBTyxDQUFDLFVBQUFrSixPQUFPO1lBQUEsT0FBRUEsT0FBTyxDQUFDM0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsS0FBSyxDQUFDO1VBQUEsRUFBQztVQUN2RDtRQUNKO0lBQ0o7SUFFQXdELFVBQVUsQ0FBQ2lILFdBQVcsRUFBRSxFQUFFLENBQUM7RUFDL0I7RUFFQWpILFVBQVUsQ0FBQ2lILFdBQVcsRUFBRSxFQUFFLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBR0ZuTCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQUs7RUFDL0M7O0VBRUEsSUFBTVcsY0FBYyxHQUFHWixRQUFRLENBQUNHLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztFQUNyRixJQUFNVSxlQUFlLEdBQUdiLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLHFEQUFxRCxDQUFDO0VBRXJHLElBQUlTLGNBQWMsSUFBSUMsZUFBZSxFQUFFO0lBQ25DRCxjQUFjLENBQUNYLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFZO01BQ2pEWSxlQUFlLENBQUNOLEtBQUssR0FBRyxJQUFJLENBQUNBLEtBQUs7SUFDdEMsQ0FBQyxDQUFDO0lBRUZNLGVBQWUsQ0FBQ1osZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7TUFDbERXLGNBQWMsQ0FBQ0wsS0FBSyxHQUFHLElBQUksQ0FBQ0EsS0FBSztJQUNyQyxDQUFDLENBQUM7SUFFRixJQUFJSyxjQUFjLENBQUNMLEtBQUssRUFBRTtNQUN0Qk0sZUFBZSxDQUFDTixLQUFLLEdBQUdLLGNBQWMsQ0FBQ0wsS0FBSztJQUNoRDtFQUNKOztFQUVBO0FBRUosQ0FBQyxDQUFDOztBQUVGO0FBQ0FQLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLE9BQU8sQ0FBQztFQUV0RCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBQ0EsSUFBTTBDLFdBQVcsR0FBRzVDLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLCtCQUErQixDQUFDO0VBRTNFLElBQUl5QyxXQUFXLElBQUksQ0FBQ2QsTUFBTSxDQUFDZSxVQUFVLENBQUMsa0NBQWtDLENBQUMsQ0FBQ0MsT0FBTyxFQUFFO0lBQUEsSUFHdEVDLGNBQWMsR0FBdkIsU0FBU0EsY0FBY0EsQ0FBQSxFQUFHO01BQ3RCLElBQU1FLFFBQVEsR0FBR25CLE1BQU0sQ0FBQzJKLFdBQVc7TUFDbkMsSUFBTXZJLEtBQUssR0FBRyxHQUFHO01BQ2pCLElBQU1DLE1BQU0sR0FBSUYsUUFBUSxHQUFHQyxLQUFLLEdBQUksSUFBSTtNQUV4Q2xELFFBQVEsQ0FBQzBMLGVBQWUsQ0FBQ3RJLEtBQUssQ0FBQ0MsV0FBVyxDQUFDLG1CQUFtQixFQUFFRixNQUFNLENBQUM7SUFDM0UsQ0FBQztJQVJEUCxXQUFXLENBQUNuQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7SUFVckMsSUFBSTRCLE9BQU8sR0FBRyxLQUFLO0lBQ25CUixNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBVztNQUN6QyxJQUFJLENBQUNxQyxPQUFPLEVBQUU7UUFDVkUscUJBQXFCLENBQUMsWUFBVztVQUM3Qk8sY0FBYyxDQUFDLENBQUM7VUFDaEJULE9BQU8sR0FBRyxLQUFLO1FBQ25CLENBQUMsQ0FBQztRQUNGQSxPQUFPLEdBQUcsSUFBSTtNQUNsQjtJQUNKLENBQUMsQ0FBQztJQUVGUyxjQUFjLENBQUMsQ0FBQztFQUNwQjtBQUNKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDbklGL0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU0wTCxZQUFZLEdBQUczTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxvQ0FBb0MsQ0FBQztFQUNqRixJQUFNeUwsWUFBWSxHQUFHNUwsUUFBUSxDQUFDd0ssY0FBYyxDQUFDLGNBQWMsQ0FBQztFQUM1RCxJQUFNcUIsYUFBYSxHQUFHRixZQUFZLEdBQUdBLFlBQVksQ0FBQ3hMLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJO0VBQy9FLElBQU0yTCxVQUFVLEdBQUdGLFlBQVksR0FBR0EsWUFBWSxDQUFDekwsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUk7RUFDNUUsSUFBTXVLLFVBQVUsR0FBR2lCLFlBQVksR0FBR0EsWUFBWSxDQUFDeEwsYUFBYSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsSUFBSTtFQUUzRixJQUFNNEwsZUFBZSxHQUFHSixZQUFZLEdBQUdBLFlBQVksQ0FBQ3hMLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLElBQUk7RUFDM0YsSUFBTTZMLFlBQVksR0FBR0osWUFBWSxHQUFHQSxZQUFZLENBQUN6TCxhQUFhLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJO0VBRXpGLElBQU04TCxhQUFhLEdBQUdOLFlBQVksR0FBR0EsWUFBWSxDQUFDeEwsYUFBYSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsSUFBSTtFQUM1RixJQUFNK0wsVUFBVSxHQUFHTixZQUFZLEdBQUdBLFlBQVksQ0FBQ3pMLGFBQWEsQ0FBQyxpQ0FBaUMsQ0FBQyxHQUFHLElBQUk7RUFFdEcsSUFBSWdNLFdBQVcsR0FBRyxDQUFDO0VBRW5CLFNBQVNDLFVBQVVBLENBQUMzQyxPQUFPLEVBQUU7SUFDekIsSUFBTTRDLElBQUksR0FBRzNHLElBQUksQ0FBQzZELEtBQUssQ0FBQ0UsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNyQyxJQUFNNkMsSUFBSSxHQUFHNUcsSUFBSSxDQUFDNkQsS0FBSyxDQUFDRSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3JDLFVBQUE1RSxNQUFBLENBQVV3SCxJQUFJLENBQUNkLFFBQVEsQ0FBQyxDQUFDLENBQUMzQixRQUFRLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFBL0UsTUFBQSxDQUFJeUgsSUFBSSxDQUFDZixRQUFRLENBQUMsQ0FBQyxDQUFDM0IsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDbEY7RUFFQSxTQUFTdUIsV0FBV0EsQ0FBQ1osS0FBSyxFQUFFMUIsWUFBWSxFQUFFO0lBQ3RDLElBQUksQ0FBQzBCLEtBQUssSUFBSSxDQUFDMUIsWUFBWSxFQUFFO0lBRTdCLElBQU0wRCxhQUFhLEdBQUdoQyxLQUFLLENBQUNpQyxRQUFRLEdBQUdqQyxLQUFLLENBQUM0QixXQUFXO0lBQ3hEdEQsWUFBWSxDQUFDZ0IsV0FBVyxHQUFHdUMsVUFBVSxDQUFDRyxhQUFhLENBQUM7RUFDeEQ7RUFFQSxTQUFTRSxnQkFBZ0JBLENBQUNsQyxLQUFLLEVBQUVtQyxPQUFPLEVBQUU7SUFDdEMsSUFBSSxDQUFDbkMsS0FBSyxJQUFJLENBQUNtQyxPQUFPLEVBQUU7SUFFeEIsSUFBSW5DLEtBQUssQ0FBQ0ssTUFBTSxFQUFFO01BQ2Q4QixPQUFPLENBQUN0SixLQUFLLENBQUMwQixPQUFPLEdBQUcsT0FBTztJQUNuQyxDQUFDLE1BQU07TUFDSDRILE9BQU8sQ0FBQ3RKLEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxNQUFNO0lBQ2xDO0VBQ0o7RUFFQSxTQUFTNkgsbUJBQW1CQSxDQUFDcEMsS0FBSyxFQUFFbUMsT0FBTyxFQUFFN0QsWUFBWSxFQUFFO0lBQ3ZELElBQUksQ0FBQzBCLEtBQUssSUFBSSxDQUFDbUMsT0FBTyxFQUFFO0lBRXhCbkMsS0FBSyxDQUFDdEssZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQVc7TUFDdEN5TSxPQUFPLENBQUN0SixLQUFLLENBQUMwQixPQUFPLEdBQUcsTUFBTTtJQUNsQyxDQUFDLENBQUM7SUFFRnlGLEtBQUssQ0FBQ3RLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFXO01BQ3ZDeU0sT0FBTyxDQUFDdEosS0FBSyxDQUFDMEIsT0FBTyxHQUFHLE9BQU87SUFDbkMsQ0FBQyxDQUFDO0lBRUZ5RixLQUFLLENBQUN0SyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUN2Q3lNLE9BQU8sQ0FBQ3RKLEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxPQUFPO01BQy9CeUYsS0FBSyxDQUFDNEIsV0FBVyxHQUFHLENBQUM7TUFDckIsSUFBSXRELFlBQVksRUFBRTtRQUNkc0MsV0FBVyxDQUFDWixLQUFLLEVBQUUxQixZQUFZLENBQUM7TUFDcEM7SUFDSixDQUFDLENBQUM7SUFFRjBCLEtBQUssQ0FBQ3RLLGdCQUFnQixDQUFDLFlBQVksRUFBRSxZQUFXO01BQzVDa0wsV0FBVyxDQUFDWixLQUFLLEVBQUUxQixZQUFZLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0lBRUYwQixLQUFLLENBQUN0SyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSxZQUFXO01BQ2hEa0wsV0FBVyxDQUFDWixLQUFLLEVBQUUxQixZQUFZLENBQUM7SUFDcEMsQ0FBQyxDQUFDO0VBQ047RUFFQSxJQUFJZ0QsYUFBYSxJQUFJRSxlQUFlLEVBQUU7SUFDbENZLG1CQUFtQixDQUFDZCxhQUFhLEVBQUVFLGVBQWUsRUFBRUUsYUFBYSxDQUFDO0lBQ2xFUSxnQkFBZ0IsQ0FBQ1osYUFBYSxFQUFFRSxlQUFlLENBQUM7RUFDcEQ7RUFFQSxJQUFJRCxVQUFVLElBQUlFLFlBQVksRUFBRTtJQUM1QlcsbUJBQW1CLENBQUNiLFVBQVUsRUFBRUUsWUFBWSxFQUFFRSxVQUFVLENBQUM7SUFDekRGLFlBQVksQ0FBQzVJLEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxNQUFNO0VBQ3ZDO0VBRUEsSUFBSTRGLFVBQVUsSUFBSW1CLGFBQWEsRUFBRTtJQUM3Qm5CLFVBQVUsQ0FBQ3pLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTb0YsQ0FBQyxFQUFFO01BQzdDQSxDQUFDLENBQUNpRixjQUFjLENBQUMsQ0FBQztNQUNsQmpGLENBQUMsQ0FBQ3VILGVBQWUsQ0FBQyxDQUFDO01BRW5CLElBQUlmLGFBQWEsQ0FBQ2pCLE1BQU0sRUFBRTtRQUN0QmlCLGFBQWEsQ0FBQ2hCLElBQUksQ0FBQyxDQUFDO01BQ3hCLENBQUMsTUFBTTtRQUNIZ0IsYUFBYSxDQUFDZixLQUFLLENBQUMsQ0FBQztNQUN6QjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBUytCLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQzFCLElBQUksQ0FBQ2hCLGFBQWEsSUFBSSxDQUFDQyxVQUFVLEVBQUU7SUFFbkNLLFdBQVcsR0FBR04sYUFBYSxDQUFDTSxXQUFXO0lBRXZDTixhQUFhLENBQUNmLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLElBQUlpQixlQUFlLEVBQUU7TUFDakJBLGVBQWUsQ0FBQzNJLEtBQUssQ0FBQzBCLE9BQU8sR0FBRyxNQUFNO0lBQzFDO0lBRUFnSCxVQUFVLENBQUNLLFdBQVcsR0FBR0EsV0FBVztJQUVwQ1AsWUFBWSxDQUFDbkwsU0FBUyxDQUFDQyxHQUFHLENBQUMsUUFBUSxDQUFDO0lBQ3BDVixRQUFRLENBQUNtSyxJQUFJLENBQUMvRyxLQUFLLENBQUNnSCxRQUFRLEdBQUcsUUFBUTtJQUV2QzBCLFVBQVUsQ0FBQ2pCLElBQUksQ0FBQyxDQUFDLFNBQU0sQ0FBQyxVQUFBeEYsQ0FBQztNQUFBLE9BQUkwRSxPQUFPLENBQUNDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRTNFLENBQUMsQ0FBQztJQUFBLEVBQUM7SUFFdkUsSUFBSTJHLFlBQVksRUFBRTtNQUNkQSxZQUFZLENBQUM1SSxLQUFLLENBQUMwQixPQUFPLEdBQUcsTUFBTTtJQUN2QztJQUVBcUcsV0FBVyxDQUFDVyxVQUFVLEVBQUVJLFVBQVUsQ0FBQztFQUN2QztFQUVBLFNBQVNZLFVBQVVBLENBQUEsRUFBRztJQUNsQixJQUFJLENBQUNqQixhQUFhLElBQUksQ0FBQ0MsVUFBVSxFQUFFO0lBRW5DSyxXQUFXLEdBQUdMLFVBQVUsQ0FBQ0ssV0FBVztJQUVwQ0wsVUFBVSxDQUFDaEIsS0FBSyxDQUFDLENBQUM7SUFDbEIsSUFBSWtCLFlBQVksRUFBRTtNQUNkQSxZQUFZLENBQUM1SSxLQUFLLENBQUMwQixPQUFPLEdBQUcsTUFBTTtJQUN2QztJQUVBK0csYUFBYSxDQUFDTSxXQUFXLEdBQUdBLFdBQVc7SUFFdkNQLFlBQVksQ0FBQ25MLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUN2Q1gsUUFBUSxDQUFDbUssSUFBSSxDQUFDL0csS0FBSyxDQUFDZ0gsUUFBUSxHQUFHLEVBQUU7SUFFakMsSUFBSTJCLGVBQWUsRUFBRTtNQUNqQkEsZUFBZSxDQUFDM0ksS0FBSyxDQUFDMEIsT0FBTyxHQUFHLE9BQU87SUFDM0M7SUFFQXFHLFdBQVcsQ0FBQ1UsYUFBYSxFQUFFSSxhQUFhLENBQUM7RUFDN0M7RUFFQSxJQUFJTixZQUFZLElBQUlDLFlBQVksRUFBRTtJQUM5QkQsWUFBWSxDQUFDMUwsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7TUFDL0MsSUFBSSxDQUFDcUYsVUFBVSxJQUFJLENBQUNBLFVBQVUsQ0FBQ25DLFFBQVEsQ0FBQ2xELENBQUMsQ0FBQzZCLE1BQU0sQ0FBQyxFQUFFO1FBQy9DN0IsQ0FBQyxDQUFDaUYsY0FBYyxDQUFDLENBQUM7UUFDbEJqRixDQUFDLENBQUN1SCxlQUFlLENBQUMsQ0FBQztRQUNuQkMsa0JBQWtCLENBQUMsQ0FBQztNQUN4QjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUEsSUFBSWQsZUFBZSxFQUFFO0lBQ2pCQSxlQUFlLENBQUM5TCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBU29GLENBQUMsRUFBRTtNQUNsREEsQ0FBQyxDQUFDdUgsZUFBZSxDQUFDLENBQUM7TUFDbkJDLGtCQUFrQixDQUFDLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0VBQ047RUFFQSxJQUFJZixVQUFVLEVBQUU7SUFDWkEsVUFBVSxDQUFDN0wsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7TUFDN0NBLENBQUMsQ0FBQ3VILGVBQWUsQ0FBQyxDQUFDO01BQ25CLElBQUlkLFVBQVUsQ0FBQ2xCLE1BQU0sRUFBRTtRQUNuQmtCLFVBQVUsQ0FBQ2pCLElBQUksQ0FBQyxDQUFDO01BQ3JCLENBQUMsTUFBTTtRQUNIaUIsVUFBVSxDQUFDaEIsS0FBSyxDQUFDLENBQUM7TUFDdEI7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBLElBQUlrQixZQUFZLEVBQUU7SUFDZEEsWUFBWSxDQUFDL0wsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7TUFDL0NBLENBQUMsQ0FBQ3VILGVBQWUsQ0FBQyxDQUFDO01BQ25CZCxVQUFVLENBQUNqQixJQUFJLENBQUMsQ0FBQztJQUNyQixDQUFDLENBQUM7RUFDTjtFQUVBLElBQUllLFlBQVksRUFBRTtJQUNkQSxZQUFZLENBQUMzTCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBU29GLENBQUMsRUFBRTtNQUMvQyxJQUFJQSxDQUFDLENBQUM2QixNQUFNLEtBQUswRSxZQUFZLEVBQUU7UUFDM0JrQixVQUFVLENBQUMsQ0FBQztNQUNoQjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUE5TSxRQUFRLENBQUNDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFTb0YsQ0FBQyxFQUFFO0lBQzdDLElBQUlBLENBQUMsQ0FBQ0MsR0FBRyxLQUFLLFFBQVEsSUFBSXNHLFlBQVksQ0FBQ25MLFNBQVMsQ0FBQzhILFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtNQUNqRXVFLFVBQVUsQ0FBQyxDQUFDO0lBQ2hCO0VBQ0osQ0FBQyxDQUFDO0VBR0YsSUFBTUMsWUFBWSxHQUFHL00sUUFBUSxDQUFDRyxhQUFhLENBQUMsZUFBZSxDQUFDO0VBQzVELElBQU02TSxVQUFVLEdBQUdoTixRQUFRLENBQUNHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztFQUNoRSxJQUFNd0ksSUFBSSxHQUFHM0ksUUFBUSxDQUFDRyxhQUFhLENBQUMsYUFBYSxDQUFDO0VBQ2xELElBQU04TSxVQUFVLEdBQUdqTixRQUFRLENBQUNpQixnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQztFQUV0RSxTQUFTaU0saUJBQWlCQSxDQUFBLEVBQUc7SUFDekIsSUFBTUgsWUFBWSxHQUFHL00sUUFBUSxDQUFDRyxhQUFhLENBQUMsZUFBZSxDQUFDO0lBQzVELElBQUk0TSxZQUFZLEVBQUU7TUFDZCxJQUFJRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUNFLE9BQU8sSUFBSUYsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDRSxPQUFPLEVBQUU7UUFDaERKLFlBQVksQ0FBQ0ssUUFBUSxHQUFHLEtBQUs7UUFDN0JMLFlBQVksQ0FBQ3RNLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztNQUMxQyxDQUFDLE1BQU07UUFDSHFNLFlBQVksQ0FBQ0ssUUFBUSxHQUFHLElBQUk7UUFDNUJMLFlBQVksQ0FBQ3RNLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFVBQVUsQ0FBQztNQUM3QztJQUNKO0VBQ0o7RUFFQXNNLFVBQVUsQ0FBQy9LLE9BQU8sQ0FBQyxVQUFBbUwsUUFBUSxFQUFJO0lBQzNCQSxRQUFRLENBQUNwTixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUVpTixpQkFBaUIsQ0FBQztJQUV0RCxJQUFNSSxjQUFjLEdBQUdELFFBQVEsQ0FBQy9GLE9BQU8sQ0FBQyxXQUFXLENBQUM7SUFDcEQsSUFBSWdHLGNBQWMsRUFBRTtNQUNoQkEsY0FBYyxDQUFDck4sZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQVNvRixDQUFDLEVBQUU7UUFDakQsSUFBSUEsQ0FBQyxDQUFDNkIsTUFBTSxLQUFLbUcsUUFBUSxFQUFFO1VBQ3ZCQSxRQUFRLENBQUNGLE9BQU8sR0FBRyxDQUFDRSxRQUFRLENBQUNGLE9BQU87VUFDcENFLFFBQVEsQ0FBQ0UsYUFBYSxDQUFDLElBQUlDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQztNQUNKLENBQUMsQ0FBQztJQUNOO0VBQ0osQ0FBQyxDQUFDO0VBRUZOLGlCQUFpQixDQUFDLENBQUM7RUFFbkIsSUFBSUgsWUFBWSxJQUFJQyxVQUFVLElBQUlyRSxJQUFJLEVBQUU7SUFDcENBLElBQUksQ0FBQzFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxVQUFTb0YsQ0FBQyxFQUFFO01BQ3hDLElBQU1vSSxLQUFLLEdBQUdULFVBQVUsQ0FBQ3pNLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFFckMsSUFBSSxDQUFDa04sYUFBYSxDQUFDRCxLQUFLLENBQUMsRUFBRTtRQUN2QnBJLENBQUMsQ0FBQ2lGLGNBQWMsQ0FBQyxDQUFDO1FBQ2xCMEMsVUFBVSxDQUFDdk0sU0FBUyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFDM0NzTSxVQUFVLENBQUN6TSxLQUFLLEdBQUcsRUFBRTtRQUNyQnlNLFVBQVUsQ0FBQ1csV0FBVyxHQUFHLG9DQUFvQztNQUNqRTtJQUNKLENBQUMsQ0FBQztJQUVGWCxVQUFVLENBQUMvTSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztNQUM1QyxJQUFJLElBQUksQ0FBQ1EsU0FBUyxDQUFDOEgsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDOUgsU0FBUyxDQUFDRSxNQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDeEMsSUFBSSxDQUFDZ04sV0FBVyxHQUFHLFFBQVE7TUFDL0I7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNELGFBQWFBLENBQUNELEtBQUssRUFBRTtJQUMxQixJQUFNRyxVQUFVLEdBQUcsNEJBQTRCO0lBQy9DLE9BQU9BLFVBQVUsQ0FBQ0MsSUFBSSxDQUFDSixLQUFLLENBQUM7RUFDakM7RUFFQVAsaUJBQWlCLENBQUMsQ0FBQztBQUN2QixDQUFDLENBQUMsQzs7Ozs7Ozs7OztBQ3JQRmxOLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNNk4sVUFBVSxHQUFHOU4sUUFBUSxDQUFDRyxhQUFhLENBQUMsdUJBQXVCLENBQUM7RUFDbEUsSUFBTTROLFFBQVEsR0FBRy9OLFFBQVEsQ0FBQ2lCLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDO0VBQ25FLElBQU0rTSxXQUFXLEdBQUdoTyxRQUFRLENBQUNHLGFBQWEsQ0FBQyxlQUFlLENBQUM7RUFFM0QsSUFBSSxDQUFDMk4sVUFBVSxJQUFJLENBQUNFLFdBQVcsRUFBRTtFQUVqQyxJQUFNQyxhQUFhLEdBQUcsRUFBRTtFQUV4QixTQUFTQyxrQkFBa0JBLENBQUEsRUFBRztJQUMxQixJQUFNQyxXQUFXLEdBQUdMLFVBQVUsQ0FBQ3RNLHFCQUFxQixDQUFDLENBQUM7SUFDdER5TSxhQUFhLENBQUNoSixNQUFNLEdBQUcsQ0FBQztJQUV4QjhJLFFBQVEsQ0FBQzdMLE9BQU8sQ0FBQyxVQUFDNkIsSUFBSSxFQUFFM0IsS0FBSyxFQUFLO01BQzlCLElBQU1nTSxRQUFRLEdBQUdySyxJQUFJLENBQUN2QyxxQkFBcUIsQ0FBQyxDQUFDO01BQzdDLElBQU02TSxlQUFlLEdBQUdELFFBQVEsQ0FBQzFNLEdBQUcsR0FBR3lNLFdBQVcsQ0FBQ3pNLEdBQUc7TUFDdEQsSUFBTTRNLGtCQUFrQixHQUFJRCxlQUFlLEdBQUdGLFdBQVcsQ0FBQ3ZNLE1BQU0sR0FBSSxHQUFHO01BQ3ZFcU0sYUFBYSxDQUFDTSxJQUFJLENBQUNELGtCQUFrQixDQUFDO0lBQzFDLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU0UsbUJBQW1CQSxDQUFDQyxFQUFFLEVBQUU7SUFDN0IsSUFBTXpMLElBQUksR0FBR3lMLEVBQUUsQ0FBQ2pOLHFCQUFxQixDQUFDLENBQUM7SUFDdkMsT0FDSXdCLElBQUksQ0FBQ3RCLEdBQUcsSUFBSSxDQUFDSSxNQUFNLENBQUNDLFdBQVcsSUFBSS9CLFFBQVEsQ0FBQzBMLGVBQWUsQ0FBQ2dELFlBQVksSUFBSSxHQUFHLElBQy9FMUwsSUFBSSxDQUFDaEIsTUFBTSxJQUFJLENBQUM7RUFFeEI7RUFFQSxTQUFTMk0sc0JBQXNCQSxDQUFBLEVBQUc7SUFDOUIsSUFBTUMsT0FBTyxHQUFHWixXQUFXLENBQUN4TSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25ELElBQU0yTSxXQUFXLEdBQUdMLFVBQVUsQ0FBQ3RNLHFCQUFxQixDQUFDLENBQUM7SUFFdEQsSUFBTXFOLFdBQVcsR0FBSSxDQUFDRCxPQUFPLENBQUNsTixHQUFHLEdBQUd5TSxXQUFXLENBQUN6TSxHQUFHLElBQUl5TSxXQUFXLENBQUN2TSxNQUFNLEdBQUksR0FBRztJQUVoRm1NLFFBQVEsQ0FBQzdMLE9BQU8sQ0FBQyxVQUFDNkIsSUFBSSxFQUFFM0IsS0FBSyxFQUFLO01BQzlCLElBQU0wTSxZQUFZLEdBQUdiLGFBQWEsQ0FBQzdMLEtBQUssQ0FBQztNQUN6QyxJQUFJeU0sV0FBVyxJQUFJQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLENBQUMvSyxJQUFJLENBQUN0RCxTQUFTLENBQUM4SCxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDekV4RSxJQUFJLENBQUN0RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7TUFDbEM7SUFDSixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNxTyxvQkFBb0JBLENBQUEsRUFBRztJQUM1QixJQUFJUCxtQkFBbUIsQ0FBQ1YsVUFBVSxDQUFDLEVBQUU7TUFDakNJLGtCQUFrQixDQUFDLENBQUM7TUFFcEJGLFdBQVcsQ0FBQzVLLEtBQUssQ0FBQzRMLGtCQUFrQixHQUFHLFNBQVM7TUFFaEQsSUFBTUMsaUJBQWlCLEdBQUc3RixXQUFXLENBQUN1RixzQkFBc0IsRUFBRSxHQUFHLENBQUM7TUFFbEV6SyxVQUFVLENBQUMsWUFBTTtRQUNiZ0YsYUFBYSxDQUFDK0YsaUJBQWlCLENBQUM7UUFDaENsQixRQUFRLENBQUM3TCxPQUFPLENBQUMsVUFBQTZCLElBQUk7VUFBQSxPQUFJQSxJQUFJLENBQUN0RCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxVQUFVLENBQUM7UUFBQSxFQUFDO01BQzVELENBQUMsRUFBRSxLQUFLLENBQUM7TUFFVG9CLE1BQU0sQ0FBQ29OLG1CQUFtQixDQUFDLFFBQVEsRUFBRUgsb0JBQW9CLENBQUM7SUFDOUQ7RUFDSjtFQUVBZixXQUFXLENBQUM1SyxLQUFLLENBQUM0TCxrQkFBa0IsR0FBRyxRQUFRO0VBRS9DbE4sTUFBTSxDQUFDN0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFaU8sa0JBQWtCLENBQUM7RUFFckRwTSxNQUFNLENBQUM3QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUU4TyxvQkFBb0IsQ0FBQztFQUV2RDdLLFVBQVUsQ0FBQyxZQUFNO0lBQ2JnSyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BCYSxvQkFBb0IsQ0FBQyxDQUFDO0VBQzFCLENBQUMsRUFBRSxHQUFHLENBQUM7QUFDWCxDQUFDLENBQUM7QUFNRi9PLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUVwRCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBRUEsSUFBTUUsZUFBZSxHQUFHSixRQUFRLENBQUNHLGFBQWEsQ0FBQyxhQUFhLENBQUM7RUFDN0QsSUFBTUUsS0FBSyxHQUFHTCxRQUFRLENBQUNHLGFBQWEsQ0FBQyxZQUFZLENBQUM7RUFFbEQsU0FBU0csZUFBZUEsQ0FBQSxFQUFHO0lBQ3ZCLElBQUlELEtBQUssQ0FBQ0UsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtNQUMzQkosZUFBZSxDQUFDSyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDOUMsQ0FBQyxNQUFNO01BQ0hOLGVBQWUsQ0FBQ0ssU0FBUyxDQUFDRSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBQ2pEO0VBQ0o7RUFFQU4sS0FBSyxDQUFDSixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVLLGVBQWUsQ0FBQztFQUVoREEsZUFBZSxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDO0FBR0ZOLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUVwRCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBRUEsSUFBTUUsZUFBZSxHQUFHSixRQUFRLENBQUNHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQztFQUNqRSxJQUFNRSxLQUFLLEdBQUdMLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBRXRELFNBQVNHLGVBQWVBLENBQUEsRUFBRztJQUN2QixJQUFJRCxLQUFLLENBQUNFLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7TUFDM0JKLGVBQWUsQ0FBQ0ssU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQzlDLENBQUMsTUFBTTtNQUNITixlQUFlLENBQUNLLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUNqRDtFQUNKO0VBRUFOLEtBQUssQ0FBQ0osZ0JBQWdCLENBQUMsT0FBTyxFQUFFSyxlQUFlLENBQUM7RUFFaERBLGVBQWUsQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7OztBQ3pIcUM7O0FBRXZDOztBQUVBUSw4Q0FBYyxDQUFDLDhCQUE4QixFQUFFLG9CQUFvQixDQUFDOztBQUVwRTs7QUFFQUEsOENBQWMsQ0FBQyx1QkFBdUIsRUFBRSxhQUFhLENBQUM7O0FBRXREOztBQUVBQSw4Q0FBYyxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxDOzs7Ozs7Ozs7O0FDWi9DZCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQVc7RUFDckQsSUFBTWdHLFVBQVUsR0FBR2pHLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUNoRCxJQUFJLENBQUM4RixVQUFVLEVBQUU7RUFFakIsSUFBTS9GLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsNkJBQTZCLENBQUM7RUFFNUUsSUFBTXlDLFdBQVcsR0FBRzVDLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLG1DQUFtQyxDQUFDO0VBRS9FLElBQUl5QyxXQUFXLElBQUksQ0FBQ2QsTUFBTSxDQUFDZSxVQUFVLENBQUMsa0NBQWtDLENBQUMsQ0FBQ0MsT0FBTyxFQUFFO0lBQUEsSUFHdEVDLGNBQWMsR0FBdkIsU0FBU0EsY0FBY0EsQ0FBQSxFQUFHO01BQ3RCLElBQU1DLElBQUksR0FBRzlDLGNBQWMsQ0FBQ3NCLHFCQUFxQixDQUFDLENBQUM7TUFDbkQsSUFBTXlCLFFBQVEsR0FBRyxDQUFDRCxJQUFJLENBQUN0QixHQUFHO01BQzFCLElBQU13QixLQUFLLEdBQUcsR0FBRztNQUNqQixJQUFNQyxNQUFNLEdBQUlGLFFBQVEsR0FBR0MsS0FBSyxHQUFJLElBQUk7TUFFeENoRCxjQUFjLENBQUNrRCxLQUFLLENBQUNDLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRUYsTUFBTSxDQUFDO0lBQ2pFLENBQUM7SUFURFAsV0FBVyxDQUFDbkMsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBV3JDLElBQUk0QixPQUFPLEdBQUcsS0FBSztJQUNuQlIsTUFBTSxDQUFDN0IsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFlBQVc7TUFDekMsSUFBSSxDQUFDcUMsT0FBTyxFQUFFO1FBQ1ZFLHFCQUFxQixDQUFDLFlBQVc7VUFDN0JPLGNBQWMsQ0FBQyxDQUFDO1VBQ2hCVCxPQUFPLEdBQUcsS0FBSztRQUNuQixDQUFDLENBQUM7UUFDRkEsT0FBTyxHQUFHLElBQUk7TUFDbEI7SUFDSixDQUFDLENBQUM7SUFFRlMsY0FBYyxDQUFDLENBQUM7RUFDcEI7QUFDSixDQUFDLENBQUMsQzs7Ozs7Ozs7OztBQ2pDRi9DLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBVztFQUNyRCxJQUFNQyxjQUFjLEdBQUdGLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLEtBQUssQ0FBQztFQUVwRCxJQUFJLENBQUNELGNBQWMsRUFBRTtJQUNqQjtFQUNKO0VBR0EsSUFBTWlQLGdCQUFnQixHQUFHblAsUUFBUSxDQUFDd0ssY0FBYyxDQUFDLGFBQWEsQ0FBQztFQUMvRCxJQUFNNEUsV0FBVyxHQUFHcFAsUUFBUSxDQUFDd0ssY0FBYyxDQUFDLFFBQVEsQ0FBQztFQUNyRCxJQUFNNkUsVUFBVSxHQUFHclAsUUFBUSxDQUFDd0ssY0FBYyxDQUFDLE9BQU8sQ0FBQztFQUNuRCxJQUFNOEUsU0FBUyxHQUFHdFAsUUFBUSxDQUFDd0ssY0FBYyxDQUFDLFFBQVEsQ0FBQztFQUVuRCxTQUFTK0UsbUJBQW1CQSxDQUFBLEVBQUc7SUFFM0IsSUFBTUMsV0FBVyxHQUFHQyxRQUFRLENBQUNOLGdCQUFnQixDQUFDNU8sS0FBSyxDQUFDLElBQUksQ0FBQztJQUN6RCxJQUFNbVAsTUFBTSxHQUFHRCxRQUFRLENBQUNMLFdBQVcsQ0FBQzdPLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDL0MsSUFBTW9QLEtBQUssR0FBR0YsUUFBUSxDQUFDSixVQUFVLENBQUM5TyxLQUFLLENBQUMsSUFBSSxJQUFJO0lBRWhELElBQU1xUCxtQkFBbUIsR0FBR2xLLElBQUksQ0FBQ0UsR0FBRyxDQUFDLENBQUMsRUFBRTRKLFdBQVcsR0FBRyxNQUFNLENBQUM7SUFDN0QsSUFBTUssWUFBWSxHQUFHRCxtQkFBbUIsR0FBRyxJQUFJO0lBRS9DLElBQU1FLGNBQWMsR0FBR3BLLElBQUksQ0FBQ0UsR0FBRyxDQUFDLENBQUMsRUFBRThKLE1BQU0sR0FBRyxPQUFPLENBQUM7SUFDcEQsSUFBTUssT0FBTyxHQUFHRCxjQUFjLEdBQUcsSUFBSTtJQUVyQyxJQUFNRSxDQUFDLEdBQUdILFlBQVksR0FBR0UsT0FBTztJQUVoQyxJQUFJRSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEdBQUksQ0FBQyxHQUFHRCxDQUFFLElBQUlMLEtBQUs7SUFFekMsSUFBSU8sZUFBZSxHQUFHeEssSUFBSSxDQUFDQyxHQUFHLENBQUNzSyxVQUFVLEdBQUcsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUVwRFgsU0FBUyxDQUFDekYsV0FBVyxHQUFHcUcsZUFBZSxDQUFDQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztFQUM1RDtFQUVBaEIsZ0JBQWdCLENBQUNsUCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVzUCxtQkFBbUIsQ0FBQztFQUMvREgsV0FBVyxDQUFDblAsZ0JBQWdCLENBQUMsT0FBTyxFQUFFc1AsbUJBQW1CLENBQUM7RUFDMURGLFVBQVUsQ0FBQ3BQLGdCQUFnQixDQUFDLE9BQU8sRUFBRXNQLG1CQUFtQixDQUFDO0VBRXpEQSxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQztBQUdGdlAsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFXO0VBQ3JELElBQU1DLGNBQWMsR0FBR0YsUUFBUSxDQUFDRyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBRXBELElBQUksQ0FBQ0QsY0FBYyxFQUFFO0lBQ2pCO0VBQ0o7RUFFQSxJQUFNRSxlQUFlLEdBQUdKLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUM3RCxJQUFNRSxLQUFLLEdBQUdMLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLFlBQVksQ0FBQztFQUVsRCxTQUFTRyxlQUFlQSxDQUFBLEVBQUc7SUFDdkIsSUFBSUQsS0FBSyxDQUFDRSxLQUFLLENBQUNDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO01BQzNCSixlQUFlLENBQUNLLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztJQUM5QyxDQUFDLE1BQU07TUFDSE4sZUFBZSxDQUFDSyxTQUFTLENBQUNFLE1BQU0sQ0FBQyxXQUFXLENBQUM7SUFDakQ7RUFDSjtFQUVBTixLQUFLLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRUssZUFBZSxDQUFDO0VBRWhEQSxlQUFlLENBQUMsQ0FBQztBQUNyQixDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDL0RGOzs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0EsRTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7QUNOMkI7QUFDM0I4UCxtQkFBTyxDQUFDLDRDQUFhLENBQUM7QUFDdEJBLG1CQUFPLENBQUMsc0VBQTBCLENBQUM7QUFDbkNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsMEVBQTRCLENBQUM7QUFDckNBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsOERBQXNCLENBQUM7QUFDL0JBLG1CQUFPLENBQUMsNEVBQTZCLENBQUM7QUFDdENBLG1CQUFPLENBQUMsMEZBQW9DLENBQUM7QUFDN0NBLG1CQUFPLENBQUMsOEZBQXNDLENBQUM7QUFDL0NBLG1CQUFPLENBQUMsZ0VBQXVCLENBQUM7QUFDaENBLG1CQUFPLENBQUMsb0ZBQWlDLENBQUM7QUFDMUNBLG1CQUFPLENBQUMsMERBQW9CLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL2Nhc2UtZmluaXNoLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL3BhcmFsbGF4LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjMuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI1LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjYuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9sZWFkLWRpc3RyaWJ1dGlvbi9sZC1jb21wb25lbnQyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9sZWFkLWRpc3RyaWJ1dGlvbi9wYXJhbGxheC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvcGFydG5lci1wbGF0Zm9ybS9wcC1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL3BhcnRuZXItcGxhdGZvcm0vcHBfYzYuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2Nzcz83MjRhIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGJ1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgaWYoIXRlc3REcml2ZUJ1dHRvbiB8fCAhaW5wdXQpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PiB7XHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZWZpbmlzaGlucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59KTtcclxuIiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmNhc2VfcmVwcmVzZW50X2NvbnRhaW5lcicsICcuY2FzZV9yZXByZXNlbnRfYmFjaycpO1xyXG5jcmVhdGVQYXJhbGxheCgnLmNhc2VfZmluaXNoX2xvd2VyJywgJy5jYXNlX2ZpbmlzaF9iYWNrJyk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VfYzJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBsYWJlbFdyYXBwZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhc2VfYzJfY29udGFpbmVyIC5sYWJlbF93cmFwcGVyJyk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIHRyaWdnZXJPZmZzZXQ6IDAuMixcclxuICAgICAgICBzdGVwRGVsYXk6IDAuMyxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyVG9wIDwgd2luZG93SGVpZ2h0ICYmIGNvbnRhaW5lclJlY3QuYm90dG9tID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9ncmVzcyA9IDEgLSAoY29udGFpbmVyVG9wIC8gKHdpbmRvd0hlaWdodCAtIGNvbnRhaW5lckhlaWdodCkpO1xyXG5cclxuICAgICAgICAgICAgbGFiZWxXcmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gKGluZGV4ICsgMSkgKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxhYmVsV3JhcHBlcnMuZm9yRWFjaCh3cmFwcGVyID0+IHtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZSgnbGFiZWxfd3JhcHBlci12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsYWJlbFdyYXBwZXJzLmZvckVhY2god3JhcHBlciA9PiB7XHJcbiAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLWhpZGRlbicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7IiwiZnVuY3Rpb24gY3JlYXRlUGFyYWxsYXgocGFyZW50Q2xhc3MsIGltZ0NsYXNzKXtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmVudENsYXNzKTtcclxuXHJcbiAgICAgICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGltZ0NsYXNzKTtcclxuXHJcbiAgICAgICAgaWYoIXBhcnRuZXJTZWN0aW9uIHx8ICFwYXJhbGxheEltZyl7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBhcmFsbGF4OyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IG1lbnVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oZWFkZXJfbWVudV9pdGVtJyk7XHJcbiAgICBjb25zdCBkcm9wZG93blRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tdHJpZ2dlcl0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9kcm9wZG93bl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi1jb250ZW50XScpO1xyXG4gICAgbGV0IGNsb3NlVGltZW91dDtcclxuICAgIGxldCBsZWF2ZVRpbWVvdXQ7XHJcbiAgICBsZXQgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcblxyXG4gICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGxlYXZlVGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IGl0ZW0gJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgbGVhdmVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gdGhpcyAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSB0aGlzO1xyXG4gICAgICAgICAgICBjb25zdCBkcm9wZG93blR5cGUgPSB0aGlzLmRhdGFzZXQuZHJvcGRvd25UcmlnZ2VyO1xyXG4gICAgICAgICAgICBvcGVuRHJvcGRvd24oZHJvcGRvd25UeXBlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duQ29udGFpbmVyKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGNsb3NlQWxsRHJvcGRvd25zLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Ecm9wZG93bih0eXBlKSB7XHJcbiAgICAgICAgY2xvc2VBbGxEcm9wZG93bnMoZmFsc2UpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICBjb25zdCB0YXJnZXRDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtZHJvcGRvd24tY29udGVudD1cIiR7dHlwZX1cIl1gKTtcclxuICAgICAgICBpZiAodGFyZ2V0Q29udGVudCkgdGFyZ2V0Q29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlQWxsRHJvcGRvd25zKGNsZWFyQWN0aXZlID0gdHJ1ZSkge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGVudHMuZm9yRWFjaChjb250ZW50ID0+IGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJyk7XHJcblxyXG4gICAgICAgIGlmIChjbGVhckFjdGl2ZSkge1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godCA9PiB0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzTW91c2VPdmVyRHJvcGRvd24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGRyb3Bkb3duQ29udGFpbmVyLm1hdGNoZXMoJzpob3ZlcicpIHx8XHJcbiAgICAgICAgICAgIChhY3RpdmVUcmlnZ2VyICYmIGFjdGl2ZVRyaWdnZXIubWF0Y2hlcygnOmhvdmVyJykpO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG4iLCJjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXInKTtcclxuY29uc3Qgbml0cm9JbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubml0cm8tZWZmZWN0IGltZycpO1xyXG5jb25zdCByZXZUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyX3JldicpO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgbGV0IHByb2dyZXNzID0gMSAtIHJlY3QudG9wIC8gd2luZG93SGVpZ2h0O1xyXG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xyXG5cclxuICAgIGNvbnN0IHNoaWZ0ID0gTWF0aC5taW4oXHJcbiAgICAgICAgMTIyMCAtIHJldlRleHQub2Zmc2V0V2lkdGgsXHJcbiAgICAgICAgd2luZG93LmlubmVyV2lkdGggLSByZXZUZXh0Lm9mZnNldFdpZHRoIC0gNjBcclxuICAgICk7XHJcblxyXG4gICAgcmV2VGV4dC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke3Byb2dyZXNzICogc2hpZnR9cHgpYDtcclxuXHJcbiAgICBuaXRyb0ltZy5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7cHJvZ3Jlc3N9KWA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsKTtcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcblxyXG51cGRhdGVTY3JvbGxBbmltYXRpb24oKTtcclxuXHJcblxyXG5cclxuLy8gcGFyYWxsYXhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfdXBwZXJfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl91cHBlcl9jb250YWluZXIgaW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYXZhdGFyQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW0gYnV0dG9uXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaG9tZV9nZWFyM19yZXZpZXdzXCIpO1xyXG4gICAgY29uc3QgcmV2aWV3cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1wiKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjZW50ZXJSZXZpZXcodGFyZ2V0Q2xpZW50KSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldENsaWVudH1cIl1gKTtcclxuICAgICAgICBpZiAoIWFjdGl2ZVJldmlldykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJXaWR0aCA9IHJldmlld3NDb250YWluZXIub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3V2lkdGggPSBhY3RpdmVSZXZpZXcub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgY29uc3QgZ2FwID0gNDA7XHJcblxyXG4gICAgICAgIGNvbnN0IHJldmlld0luZGV4ID0gQXJyYXkuZnJvbShyZXZpZXdzKS5pbmRleE9mKGFjdGl2ZVJldmlldyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsSXRlbXNXaWR0aCA9IHJldmlld0luZGV4ICogKHJldmlld1dpZHRoICsgZ2FwKTtcclxuICAgICAgICBjb25zdCBvZmZzZXQgPSAoY29udGFpbmVyV2lkdGggLyAyKSAtIChyZXZpZXdXaWR0aCAvIDIpIC0gdG90YWxJdGVtc1dpZHRoO1xyXG5cclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zaXRpb24gPSBcInRyYW5zZm9ybSAwLjZzIGVhc2VcIjtcclxuICAgICAgICByZXZpZXdzQ29udGFpbmVyLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoUmV2aWV3KHRhcmdldCkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYXZhdGFyLWl0ZW1cIikuZm9yRWFjaChhID0+IGEuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuICAgICAgICByZXZpZXdzLmZvckVhY2gociA9PiByLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkQXZhdGFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmF2YXRhci1pdGVtIGJ1dHRvbltkYXRhLXRyaWdnZXI9XCIke3RhcmdldH1cIl1gKS5jbG9zZXN0KFwiLmF2YXRhci1pdGVtXCIpO1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXR9XCJdYCk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEF2YXRhciAmJiBhY3RpdmVSZXZpZXcpIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdmF0YXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBhY3RpdmVSZXZpZXcuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG4gICAgICAgICAgICBjZW50ZXJSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXZhdGFyQnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XHJcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHN3aXRjaFJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gaW5pdENlbnRlclJldmlldygpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5pdGlhbFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgICAgICBpZiAoaW5pdGlhbFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0aWFsVGFyZ2V0ID0gaW5pdGlhbFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgICAgIGNlbnRlclJldmlldyhpbml0aWFsVGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdENlbnRlclJldmlldygpO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudFNlbGVjdGVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmF2YXRhci1pdGVtLnNlbGVjdGVkIGJ1dHRvbicpO1xyXG4gICAgICAgIGlmIChjdXJyZW50U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgY29uc3QgY3VycmVudFRhcmdldCA9IGN1cnJlbnRTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2VudGVyUmV2aWV3KGN1cnJlbnRUYXJnZXQpLCA1MCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy8gY2FzZXNcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBjYXNlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lciAuY2FzZScpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjMsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjE1LFxyXG4gICAgICAgIGFuaW1hdGlvbkRpc3RhbmNlOiAzMFxyXG4gICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVTY3JvbGxBbmltYXRpb24oKSB7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyUmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBjb250YWluZXJUb3AgPSBjb250YWluZXJSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCBjb250YWluZXJIZWlnaHQgPSBjb250YWluZXJSZWN0LmhlaWdodDtcclxuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckJvdHRvbSA9IGNvbnRhaW5lclRvcCArIGNvbnRhaW5lckhlaWdodDtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyUG9pbnQgPSB3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAtIHRyaWdnZXJQb2ludCAmJiBjb250YWluZXJCb3R0b20gPiB0cmlnZ2VyUG9pbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgdmlzaWJsZUhlaWdodCA9IE1hdGgubWluKGNvbnRhaW5lckJvdHRvbSwgd2luZG93SGVpZ2h0KSAtIE1hdGgubWF4KGNvbnRhaW5lclRvcCwgMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heFNjcm9sbGFibGUgPSBjb250YWluZXJIZWlnaHQgLSB3aW5kb3dIZWlnaHQgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1jb250YWluZXJUb3AgKyAod2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxQcm9ncmVzcyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHNjcm9sbGVkIC8gbWF4U2Nyb2xsYWJsZSkpO1xyXG5cclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaCgoY2FzZUVsLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGhyZXNob2xkID0gaW5kZXggKiBjb25maWcuc3RlcERlbGF5O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzY3JvbGxQcm9ncmVzcyA+PSB0aHJlc2hvbGQpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2FzZXMuZm9yRWFjaChjYXNlRWwgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTY3JvbGxBbmltYXRpb24oKTtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcbi8vIHBhcmFsbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJzZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG4gICAgaWYgKCFwYXJ0bmVyc2VjKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2NvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfYmFja2dyb3VuZCcpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCIvLyBwYXJhbGxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lLCAucHAnKTtcclxuICAgIGlmICghcGFydG5lcnNlYykgcmV0dXJuXHJcblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjRfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyNF9jb250YWluZXIgaW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuZm9yRWFjaChpbWc9PmltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyc2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuICAgIGlmICghcGFydG5lcnNlYykgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyNF9sb3dlcl9jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nZWFyNGJhY2snKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5mb3JFYWNoKGltZz0+aW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4JykpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBhY2NvcmRpb25JdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hY2NvcmRpb25faXRlbScpO1xyXG5cclxuICAgIGFjY29yZGlvbkl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBidXR0b24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoYnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsYXNzTGlzdC5jb250YWlucygnb3BlbmVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChvdGhlckl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgnb3BlbmVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyNl9jb250YWluZXInKTtcclxuXHJcbiAgICBpZighcGFydG5lclNlY3Rpb24pe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX2dlYXI2X2NvbnRhaW5lciBpbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5mb3JFYWNoKGltZz0+aW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4JykpXHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBvcHVwT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX292ZXJsYXknKTtcclxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF91cHBlciBidXR0b24nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50IGZvcm0nKTtcclxuICAgIGNvbnN0IG9wZW5CdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2J1dHRvbiwgLm9wZW5fbW9kYWwnKTtcclxuICAgIGNvbnN0IHRpbWVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfbGFiZWxfd3JhcHBlcl9jb3VudGVyJyk7XHJcblxyXG4gICAgbGV0IHRpbWVySW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDE1ICogNjA7IC8vIDE1INC80LjQvdGD0YJcclxuICAgIGxldCBpc1RpbWVyUnVubmluZyA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN0YXJ0VGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGlzVGltZXJSdW5uaW5nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlzVGltZXJSdW5uaW5nID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgdG90YWxTZWNvbmRzID0gMTUgKiA2MDtcclxuXHJcbiAgICAgICAgaWYgKHRpbWVySW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVRpbWVyRGlzcGxheSgpO1xyXG5cclxuICAgICAgICB0aW1lckludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICh0b3RhbFNlY29uZHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0b3RhbFNlY29uZHMtLTtcclxuICAgICAgICAgICAgICAgIGlmIChwb3B1cE92ZXJsYXkgJiYgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPT09ICdibG9jaycpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVUaW1lckRpc3BsYXkoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXJJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlzVGltZXJSdW5uaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aW1lckNvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lckRpc3BsYXkoKSB7XHJcbiAgICAgICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDM2MDApO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gdG90YWxTZWNvbmRzICUgNjA7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFRpbWUgPVxyXG4gICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICBTdHJpbmcobWludXRlcykucGFkU3RhcnQoMiwgJzAnKSArICc6JyArXHJcbiAgICAgICAgICAgIFN0cmluZyhzZWNvbmRzKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICAgICAgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgICAgICBpZiAocG9wdXBPdmVybGF5ICYmIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID09PSAnYmxvY2snKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIGlmIChwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgcG9wdXBPdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXNUaW1lclJ1bm5pbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVyRGlzcGxheSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAob3BlbkJ1dHRvbnMpIHtcclxuICAgICAgICBvcGVuQnV0dG9ucy5mb3JFYWNoKG9wZW5CdXR0b24gPT4ge1xyXG4gICAgICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjbG9zZUJ1dHRvbikge1xyXG4gICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgIHBvcHVwT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgICAgICBjbG9zZVBvcHVwKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCkge1xyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlbyAmJiB2aWRlb0NvbnRhaW5lciAmJiBwbGF5QnV0dG9uKSB7XHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlb0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbiAgICB9XHJcbn0pOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgaWYoIXRlc3REcml2ZUJ1dHRvbiB8fCAhaW5wdXQpe1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNvdW50ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXIgc3BhbicpO1xyXG4gICAgY29uc3QgY291bnRlckRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyJyk7XHJcbiAgICBjb25zdCBzaWduSW5CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyX3NpZ25JbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBlbGVtZW50cyA9IFtjb3VudGVyRGl2LCBzaWduSW5CdXR0b24sIGlucHV0XTtcclxuXHJcbiAgICBsZXQgdG90YWxTZWNvbmRzID0gMyAqIDEwMDtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcigpIHtcclxuICAgICAgICB0b3RhbFNlY29uZHMtLTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsU2Vjb25kcyA8IDApIHtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29uZScsICd0d28nKSk7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdnbycpKTtcclxuICAgICAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSAnMDA6MDAsMDAnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzZWNvbmRzID0gTWF0aC5mbG9vcih0b3RhbFNlY29uZHMgLyAxMDApO1xyXG4gICAgICAgIGNvbnN0IGh1bmRyZWR0aHMgPSB0b3RhbFNlY29uZHMgJSAxMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNlY29uZHMgPSBzZWNvbmRzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRIdW5kcmVkdGhzID0gaHVuZHJlZHRocy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gYDAwOiR7Zm9ybWF0dGVkU2Vjb25kc30sJHtmb3JtYXR0ZWRIdW5kcmVkdGhzfWA7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodG90YWxTZWNvbmRzKXtcclxuICAgICAgICAgICAgY2FzZSAyMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIDEwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvbmUnKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpPT4ge1xyXG4gICAgLy8gZW1haWwgc2F2ZVxyXG5cclxuICAgIGNvbnN0IG1haW5FbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcbiAgICBjb25zdCBwb3B1cEVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2Zvcm1faW5wdXRzIGlucHV0W3R5cGU9XCJlbWFpbFwiXScpO1xyXG5cclxuICAgIGlmIChtYWluRW1haWxJbnB1dCAmJiBwb3B1cEVtYWlsSW5wdXQpIHtcclxuICAgICAgICBtYWluRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcG9wdXBFbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBtYWluRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtYWluRW1haWxJbnB1dC52YWx1ZSkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSBtYWluRW1haWxJbnB1dC52YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2tib3ggc2F2ZVxyXG5cclxufSk7XHJcblxyXG4vLyBwYXJhbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfYmFja2dyb3VuZEltZycpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB2aWRlb1dyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfbG93ZXJXcmFwcGVyX3ZpZGVvJyk7XHJcbiAgICBjb25zdCBtb2RhbE92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWxPdmVybGF5Jyk7XHJcbiAgICBjb25zdCBvcmlnaW5hbFZpZGVvID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxWaWRlbyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IHBsYXlCdXR0b24gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBidXR0b24nKSA6IG51bGw7XHJcblxyXG4gICAgY29uc3Qgb3JpZ2luYWxQbGF5SW1nID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19jb250IGltZycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsUGxheUltZyA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gaW1nJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsVGltZXIgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxUaW1lciA9IG1vZGFsT3ZlcmxheSA/IG1vZGFsT3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcubW9kYWwtdmlkZW8gLnZpZGVvX3BsYXllciBzcGFuJykgOiBudWxsO1xyXG5cclxuICAgIGxldCBjdXJyZW50VGltZSA9IDA7XHJcblxyXG4gICAgZnVuY3Rpb24gZm9ybWF0VGltZShzZWNvbmRzKSB7XHJcbiAgICAgICAgY29uc3QgbWlucyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwKTtcclxuICAgICAgICBjb25zdCBzZWNzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApO1xyXG4gICAgICAgIHJldHVybiBgJHttaW5zLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX06JHtzZWNzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKX1gO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICF0aW1lckVsZW1lbnQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcmVtYWluaW5nVGltZSA9IHZpZGVvLmR1cmF0aW9uIC0gdmlkZW8uY3VycmVudFRpbWU7XHJcbiAgICAgICAgdGltZXJFbGVtZW50LnRleHRDb250ZW50ID0gZm9ybWF0VGltZShyZW1haW5pbmdUaW1lKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nLCB0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIGlmICh0aW1lckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdXBkYXRlVGltZXIodmlkZW8sIHRpbWVyRWxlbWVudCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVyKHZpZGVvLCB0aW1lckVsZW1lbnQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nLCBvcmlnaW5hbFRpbWVyKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcsIG1vZGFsVGltZXIpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHVwZGF0ZVRpbWVyKG1vZGFsVmlkZW8sIG1vZGFsVGltZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gbW9kYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcmlnaW5hbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XHJcblxyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdXBkYXRlVGltZXIob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxUaW1lcik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZGVvV3JhcHBlciAmJiBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICB2aWRlb1dyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmICghcGxheUJ1dHRvbiB8fCAhcGxheUJ1dHRvbi5jb250YWlucyhlLnRhcmdldCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICBvcmlnaW5hbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFZpZGVvKSB7XHJcbiAgICAgICAgbW9kYWxWaWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgaWYgKG1vZGFsVmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBtb2RhbFBsYXlJbWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICBtb2RhbE92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0QnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Y3LWZvcm0nKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hlc1swXS5jaGVja2VkICYmIGNoZWNrYm94ZXNbMV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZUJ1dHRvblN0YXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBjaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbiAmJiBlbWFpbElucHV0ICYmIGZvcm0pIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnd3BjZjctbm90LXZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd3cGNmNy1ub3QtdmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnRS1tYWlsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZF9kaXN0cmlidXRpb25fYzInKTtcclxuICAgIGNvbnN0IGNhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxkX2MyX2NvbnRhaW5lcl9pdGVtJyk7XHJcbiAgICBjb25zdCBhbmltYXRlZENhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRlZC1jYXInKTtcclxuXHJcbiAgICBpZiAoIWNhclNlY3Rpb24gfHwgIWFuaW1hdGVkQ2FyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaXRlbVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaXRlbVBvc2l0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRnJvbVRvcCA9IGl0ZW1SZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBvc2l0aW9uID0gKHBvc2l0aW9uRnJvbVRvcCAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcbiAgICAgICAgICAgIGl0ZW1Qb3NpdGlvbnMucHVzaChub3JtYWxpemVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDAuOCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA+PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFja0FuaW1hdGlvblByb2dyZXNzKCkge1xyXG4gICAgICAgIGNvbnN0IGNhclJlY3QgPSBhbmltYXRlZENhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhclByb2dyZXNzID0gKChjYXJSZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcCkgLyBzZWN0aW9uUmVjdC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zaXRpb24gPSBpdGVtUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNhclByb2dyZXNzID49IGl0ZW1Qb3NpdGlvbiAtIDUgJiYgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUNhckFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoaXNFbGVtZW50SW5WaWV3cG9ydChjYXJTZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkludGVydmFsID0gc2V0SW50ZXJ2YWwodHJhY2tBbmltYXRpb25Qcm9ncmVzcywgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpKTtcclxuICAgICAgICAgICAgfSwgMTA1MDApO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZWRDYXIuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbGN1bGF0ZVBvc2l0aW9ucyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuICAgICAgICBhY3RpdmF0ZUNhckFuaW1hdGlvbigpO1xyXG4gICAgfSwgMTAwKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGQnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7IiwiaW1wb3J0IGNyZWF0ZVBhcmFsbGF4IGZyb20gJy4uL2dsb2JhbCc7XHJcblxyXG4vLyByZXByZXNlbnRcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcubGVhZF9kaXN0cmlidXRpb25fcmVwcmVzZW50JywgJy5iYWNrX2xkX3JlcHJlc2VudCcpO1xyXG5cclxuLy8gY29tcG9uZW50M1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9jMycsICcubGRfYzNfYmFjaycpO1xyXG5cclxuLy8gZmluaXNoXHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmxkX2ZpbmlzaCcsICcubGRfZmluaXNoX2JhY2snKTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyc2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnRuZXJfcGxhdGZvcm1fcmVwcmVzZW50Jyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydG5lcl9wbGF0Zm9ybV9yZXByZXNlbnQgLmJhY2snKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHAnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBjb252ZXJzaW9uc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnZlcnNpb25zJyk7XHJcbiAgICBjb25zdCBjbGlja3NJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGlja3MnKTtcclxuICAgIGNvbnN0IGZ1bmRzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVuZHMnKTtcclxuICAgIGNvbnN0IHJlc3VsdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVQZXJjZW50YWdlKCkge1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9ucyA9IHBhcnNlSW50KGNvbnZlcnNpb25zSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgY2xpY2tzID0gcGFyc2VJbnQoY2xpY2tzSW5wdXQudmFsdWUpIHx8IDA7XHJcbiAgICAgICAgY29uc3QgZnVuZHMgPSBwYXJzZUludChmdW5kc0lucHV0LnZhbHVlKSB8fCA3MDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc092ZXJmbG93ID0gTWF0aC5tYXgoMCwgY29udmVyc2lvbnMgLSAxMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNpb25zWSA9IGNvbnZlcnNpb25zT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBjbGlja3NPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNsaWNrcyAtIDEwMDAwMDApO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrc1kgPSBjbGlja3NPdmVyZmxvdyAvIDEwMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IFkgPSBjb252ZXJzaW9uc1kgKyBjbGlja3NZO1xyXG5cclxuICAgICAgICBsZXQgcGVyY2VudGFnZSA9ICgxMDAwICsgKDQgKiBZKSkgLyBmdW5kcztcclxuXHJcbiAgICAgICAgbGV0IGZpbmFsUGVyY2VudGFnZSA9IE1hdGgubWluKHBlcmNlbnRhZ2UgKiAxMDAsIDE0KTtcclxuXHJcbiAgICAgICAgcmVzdWx0RGl2LnRleHRDb250ZW50ID0gZmluYWxQZXJjZW50YWdlLnRvRml4ZWQoMikgKyAnJSc7XHJcbiAgICB9XHJcblxyXG4gICAgY29udmVyc2lvbnNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNhbGN1bGF0ZVBlcmNlbnRhZ2UpO1xyXG4gICAgY2xpY2tzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGZ1bmRzSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuXHJcbiAgICBjYWxjdWxhdGVQZXJjZW50YWdlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2J1dHRvbicpO1xyXG4gICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHBjM2lucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9pbmRleC5zY3NzXCJcclxucmVxdWlyZSgnLi9oZWFkZXIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIxLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXIzLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI0LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI1LmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLWdlYXI2LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcF9jNi5qcycpO1xyXG5yZXF1aXJlKCcuL3BhcnRuZXItcGxhdGZvcm0vcHAtcmVwcmVzZW50LmpzJyk7XHJcbnJlcXVpcmUoJy4vbGVhZC1kaXN0cmlidXRpb24vbGQtY29tcG9uZW50Mi5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvY2FzZS1maW5pc2guanMnKTtcclxucmVxdWlyZSgnLi9sZWFkLWRpc3RyaWJ1dGlvbi9wYXJhbGxheC5qcycpO1xyXG5yZXF1aXJlKCcuL2Nhc2UvcGFyYWxsYXguanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicGFydG5lclNlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwidGVzdERyaXZlQnV0dG9uIiwiaW5wdXQiLCJjaGVja0lucHV0VmFsdWUiLCJ2YWx1ZSIsInRyaW0iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJtYWluRW1haWxJbnB1dCIsInBvcHVwRW1haWxJbnB1dCIsImNyZWF0ZVBhcmFsbGF4IiwiY29udGFpbmVyIiwibGFiZWxXcmFwcGVycyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb25maWciLCJ0cmlnZ2VyT2Zmc2V0Iiwic3RlcERlbGF5IiwiYW5pbWF0aW9uRGlzdGFuY2UiLCJoYW5kbGVTY3JvbGxBbmltYXRpb24iLCJjb250YWluZXJSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY29udGFpbmVyVG9wIiwidG9wIiwiY29udGFpbmVySGVpZ2h0IiwiaGVpZ2h0Iiwid2luZG93SGVpZ2h0Iiwid2luZG93IiwiaW5uZXJIZWlnaHQiLCJib3R0b20iLCJwcm9ncmVzcyIsImZvckVhY2giLCJ3cmFwcGVyIiwiaW5kZXgiLCJ0aHJlc2hvbGQiLCJ0aWNraW5nIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwYXNzaXZlIiwicGFyZW50Q2xhc3MiLCJpbWdDbGFzcyIsInBhcmFsbGF4SW1nIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ1cGRhdGVQYXJhbGxheCIsInJlY3QiLCJzY3JvbGxlZCIsInNwZWVkIiwib2Zmc2V0Iiwic3R5bGUiLCJzZXRQcm9wZXJ0eSIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZW51SXRlbXMiLCJkcm9wZG93blRyaWdnZXJzIiwiZHJvcGRvd25Db250YWluZXIiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsIml0ZW0iLCJjbGVhclRpbWVvdXQiLCJpIiwic2V0VGltZW91dCIsImlzTW91c2VPdmVyRHJvcGRvd24iLCJjbG9zZUFsbERyb3Bkb3ducyIsInRyaWdnZXIiLCJfdGhpcyIsImRyb3Bkb3duVHlwZSIsImRhdGFzZXQiLCJkcm9wZG93blRyaWdnZXIiLCJvcGVuRHJvcGRvd24iLCJ0eXBlIiwidGFyZ2V0Q29udGVudCIsImNvbmNhdCIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwiZSIsImtleSIsIm5pdHJvSW1nIiwicmV2VGV4dCIsInVwZGF0ZVNjcm9sbEFuaW1hdGlvbiIsIk1hdGgiLCJtaW4iLCJtYXgiLCJzaGlmdCIsIm9mZnNldFdpZHRoIiwiaW5uZXJXaWR0aCIsInRyYW5zZm9ybSIsInBhcnRuZXJzZWMiLCJhdmF0YXJCdXR0b25zIiwicmV2aWV3c0NvbnRhaW5lciIsInJldmlld3MiLCJjZW50ZXJSZXZpZXciLCJ0YXJnZXRDbGllbnQiLCJhY3RpdmVSZXZpZXciLCJjb250YWluZXJXaWR0aCIsInJldmlld1dpZHRoIiwiZ2FwIiwicmV2aWV3SW5kZXgiLCJBcnJheSIsImZyb20iLCJpbmRleE9mIiwidG90YWxJdGVtc1dpZHRoIiwidHJhbnNpdGlvbiIsInN3aXRjaFJldmlldyIsInRhcmdldCIsImEiLCJyIiwic2VsZWN0ZWRBdmF0YXIiLCJjbG9zZXN0IiwiYnV0dG9uIiwiZ2V0QXR0cmlidXRlIiwiaW5pdENlbnRlclJldmlldyIsImluaXRpYWxTZWxlY3RlZCIsImluaXRpYWxUYXJnZXQiLCJjdXJyZW50U2VsZWN0ZWQiLCJjdXJyZW50VGFyZ2V0IiwiY2FzZXMiLCJjb250YWluZXJCb3R0b20iLCJ0cmlnZ2VyUG9pbnQiLCJ2aXNpYmxlSGVpZ2h0IiwibWF4U2Nyb2xsYWJsZSIsInNjcm9sbFByb2dyZXNzIiwiY2FzZUVsIiwiaW1nIiwiYWNjb3JkaW9uSXRlbXMiLCJjb250YWlucyIsIm90aGVySXRlbSIsInBvcHVwT3ZlcmxheSIsImNsb3NlQnV0dG9uIiwiZm9ybSIsIm9wZW5CdXR0b25zIiwidGltZXJFbGVtZW50IiwidGltZXJJbnRlcnZhbCIsInRvdGFsU2Vjb25kcyIsImlzVGltZXJSdW5uaW5nIiwic3RhcnRUaW1lciIsImNsZWFySW50ZXJ2YWwiLCJ1cGRhdGVUaW1lckRpc3BsYXkiLCJzZXRJbnRlcnZhbCIsInRpbWVyQ29tcGxldGUiLCJob3VycyIsImZsb29yIiwibWludXRlcyIsInNlY29uZHMiLCJmb3JtYXR0ZWRUaW1lIiwiU3RyaW5nIiwicGFkU3RhcnQiLCJ0ZXh0Q29udGVudCIsInN0b3BUaW1lciIsImNvbnNvbGUiLCJsb2ciLCJjbG9zZVBvcHVwIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93Iiwib3BlbkJ1dHRvbiIsInByZXZlbnREZWZhdWx0IiwidmlkZW8iLCJnZXRFbGVtZW50QnlJZCIsInZpZGVvQ29udGFpbmVyIiwicGxheUJ1dHRvbiIsInVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5IiwicGF1c2VkIiwicGxheSIsInBhdXNlIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwiZWxlbWVudHMiLCJ1cGRhdGVUaW1lciIsImVsZW1lbnQiLCJodW5kcmVkdGhzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInRvU3RyaW5nIiwiZm9ybWF0dGVkSHVuZHJlZHRocyIsInBhZ2VZT2Zmc2V0IiwiZG9jdW1lbnRFbGVtZW50IiwidmlkZW9XcmFwcGVyIiwibW9kYWxPdmVybGF5Iiwib3JpZ2luYWxWaWRlbyIsIm1vZGFsVmlkZW8iLCJvcmlnaW5hbFBsYXlJbWciLCJtb2RhbFBsYXlJbWciLCJvcmlnaW5hbFRpbWVyIiwibW9kYWxUaW1lciIsImN1cnJlbnRUaW1lIiwiZm9ybWF0VGltZSIsIm1pbnMiLCJzZWNzIiwicmVtYWluaW5nVGltZSIsImR1cmF0aW9uIiwidG9nZ2xlUGxheUJ1dHRvbiIsInBsYXlJbWciLCJzZXR1cFZpZGVvTGlzdGVuZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwib3Blbk1vZGFsV2l0aFZpZGVvIiwiY2xvc2VNb2RhbCIsInN1Ym1pdEJ1dHRvbiIsImVtYWlsSW5wdXQiLCJjaGVja2JveGVzIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiZGlzYWJsZWQiLCJjaGVja2JveCIsImN1c3RvbUNoZWNrYm94IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiZW1haWwiLCJ2YWxpZGF0ZUVtYWlsIiwicGxhY2Vob2xkZXIiLCJlbWFpbFJlZ2V4IiwidGVzdCIsImNhclNlY3Rpb24iLCJjYXJJdGVtcyIsImFuaW1hdGVkQ2FyIiwiaXRlbVBvc2l0aW9ucyIsImNhbGN1bGF0ZVBvc2l0aW9ucyIsInNlY3Rpb25SZWN0IiwiaXRlbVJlY3QiLCJwb3NpdGlvbkZyb21Ub3AiLCJub3JtYWxpemVkUG9zaXRpb24iLCJwdXNoIiwiaXNFbGVtZW50SW5WaWV3cG9ydCIsImVsIiwiY2xpZW50SGVpZ2h0IiwidHJhY2tBbmltYXRpb25Qcm9ncmVzcyIsImNhclJlY3QiLCJjYXJQcm9ncmVzcyIsIml0ZW1Qb3NpdGlvbiIsImFjdGl2YXRlQ2FyQW5pbWF0aW9uIiwiYW5pbWF0aW9uUGxheVN0YXRlIiwiYW5pbWF0aW9uSW50ZXJ2YWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udmVyc2lvbnNJbnB1dCIsImNsaWNrc0lucHV0IiwiZnVuZHNJbnB1dCIsInJlc3VsdERpdiIsImNhbGN1bGF0ZVBlcmNlbnRhZ2UiLCJjb252ZXJzaW9ucyIsInBhcnNlSW50IiwiY2xpY2tzIiwiZnVuZHMiLCJjb252ZXJzaW9uc092ZXJmbG93IiwiY29udmVyc2lvbnNZIiwiY2xpY2tzT3ZlcmZsb3ciLCJjbGlja3NZIiwiWSIsInBlcmNlbnRhZ2UiLCJmaW5hbFBlcmNlbnRhZ2UiLCJ0b0ZpeGVkIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=