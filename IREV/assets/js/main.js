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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Olsid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL2Nhc2UtZmluaXNoLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9jYXNlL3BhcmFsbGF4LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXIyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjMuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI1LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjYuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1wb3B1cC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXJlcHJlc2VudC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXZpZGVvLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9sZWFkLWRpc3RyaWJ1dGlvbi9sZC1jb21wb25lbnQyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9sZWFkLWRpc3RyaWJ1dGlvbi9wYXJhbGxheC5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvcGFydG5lci1wbGF0Zm9ybS9wcC1yZXByZXNlbnQuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL3BhcnRuZXItcGxhdGZvcm0vcHBfYzYuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL3Njc3MvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vSVJFVi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FzZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VmaW5pc2hidXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VmaW5pc2hpbnB1dCcpO1xyXG5cclxuICAgIGlmKCF0ZXN0RHJpdmVCdXR0b24gfHwgIWlucHV0KXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpPT4ge1xyXG4gICAgLy8gZW1haWwgc2F2ZVxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2UnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG1haW5FbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhc2VmaW5pc2hpbnB1dCcpO1xyXG4gICAgY29uc3QgcG9wdXBFbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9mb3JtX2lucHV0cyBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuXHJcbiAgICBpZiAobWFpbkVtYWlsSW5wdXQgJiYgcG9wdXBFbWFpbElucHV0KSB7XHJcbiAgICAgICAgbWFpbkVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWFpbkVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWFpbkVtYWlsSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gbWFpbkVtYWlsSW5wdXQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSk7XHJcbiIsImltcG9ydCBjcmVhdGVQYXJhbGxheCBmcm9tICcuLi9nbG9iYWwnO1xyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5jYXNlX3JlcHJlc2VudF9jb250YWluZXInLCAnLmNhc2VfcmVwcmVzZW50X2JhY2snKTtcclxuY3JlYXRlUGFyYWxsYXgoJy5jYXNlX2ZpbmlzaF9sb3dlcicsICcuY2FzZV9maW5pc2hfYmFjaycpO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXNlX2MyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgbGFiZWxXcmFwcGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXNlX2MyX2NvbnRhaW5lciAubGFiZWxfd3JhcHBlcicpO1xyXG5cclxuICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICB0cmlnZ2VyT2Zmc2V0OiAwLjIsXHJcbiAgICAgICAgc3RlcERlbGF5OiAwLjMsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlzdGFuY2U6IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgaWYgKGNvbnRhaW5lclRvcCA8IHdpbmRvd0hlaWdodCAmJiBjb250YWluZXJSZWN0LmJvdHRvbSA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAxIC0gKGNvbnRhaW5lclRvcCAvICh3aW5kb3dIZWlnaHQgLSBjb250YWluZXJIZWlnaHQpKTtcclxuXHJcbiAgICAgICAgICAgIGxhYmVsV3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlciwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IChpbmRleCArIDEpICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKCdsYWJlbF93cmFwcGVyLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsYWJlbFdyYXBwZXJzLmZvckVhY2god3JhcHBlciA9PiB7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2xhYmVsX3dyYXBwZXItaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2xhYmVsX3dyYXBwZXItdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGFiZWxXcmFwcGVycy5mb3JFYWNoKHdyYXBwZXIgPT4ge1xyXG4gICAgICAgIHdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnbGFiZWxfd3JhcHBlci1oaWRkZW4nKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbn0pOyIsImZ1bmN0aW9uIGNyZWF0ZVBhcmFsbGF4KHBhcmVudENsYXNzLCBpbWdDbGFzcyl7XHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJlbnRDbGFzcyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpbWdDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmKCFwYXJ0bmVyU2VjdGlvbiB8fCAhcGFyYWxsYXhJbWcpe1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVQYXJhbGxheDsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBtZW51SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaGVhZGVyX21lbnVfaXRlbScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25UcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLXRyaWdnZXJdJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfZHJvcGRvd25fY29udGFpbmVyJyk7XHJcbiAgICBjb25zdCBkcm9wZG93bkNvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZHJvcGRvd24tY29udGVudF0nKTtcclxuICAgIGxldCBjbG9zZVRpbWVvdXQ7XHJcbiAgICBsZXQgbGVhdmVUaW1lb3V0O1xyXG4gICAgbGV0IGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG5cclxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChsZWF2ZVRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSBpdGVtICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxlYXZlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBkcm9wZG93blRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XHJcbiAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpID0+IGkgIT09IHRoaXMgJiYgaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gdGhpcztcclxuICAgICAgICAgICAgY29uc3QgZHJvcGRvd25UeXBlID0gdGhpcy5kYXRhc2V0LmRyb3Bkb3duVHJpZ2dlcjtcclxuICAgICAgICAgICAgb3BlbkRyb3Bkb3duKGRyb3Bkb3duVHlwZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTW91c2VPdmVyRHJvcGRvd24oKSkgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChkcm9wZG93bkNvbnRhaW5lcikge1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VUaW1lb3V0ID0gc2V0VGltZW91dChjbG9zZUFsbERyb3Bkb3ducywgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuRHJvcGRvd24odHlwZSkge1xyXG4gICAgICAgIGNsb3NlQWxsRHJvcGRvd25zKGZhbHNlKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgY29uc3QgdGFyZ2V0Q29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWRyb3Bkb3duLWNvbnRlbnQ9XCIke3R5cGV9XCJdYCk7XHJcbiAgICAgICAgaWYgKHRhcmdldENvbnRlbnQpIHRhcmdldENvbnRlbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZUFsbERyb3Bkb3ducyhjbGVhckFjdGl2ZSA9IHRydWUpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICBkcm9wZG93bkNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZScpO1xyXG5cclxuICAgICAgICBpZiAoY2xlYXJBY3RpdmUpIHtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHQgPT4gdC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGFjdGl2ZVRyaWdnZXIgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpc01vdXNlT3ZlckRyb3Bkb3duKCkge1xyXG4gICAgICAgIHJldHVybiBkcm9wZG93bkNvbnRhaW5lci5tYXRjaGVzKCc6aG92ZXInKSB8fFxyXG4gICAgICAgICAgICAoYWN0aXZlVHJpZ2dlciAmJiBhY3RpdmVUcmlnZ2VyLm1hdGNoZXMoJzpob3ZlcicpKTtcclxuICAgIH1cclxuXHJcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJykgY2xvc2VBbGxEcm9wZG93bnMoKTtcclxuICAgIH0pO1xyXG59KTtcclxuIiwiY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfbG93ZXJfY29udGFpbmVyJyk7XHJcbmNvbnN0IG5pdHJvSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5pdHJvLWVmZmVjdCBpbWcnKTtcclxuY29uc3QgcmV2VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcl9yZXYnKTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgIGxldCBwcm9ncmVzcyA9IDEgLSByZWN0LnRvcCAvIHdpbmRvd0hlaWdodDtcclxuICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcclxuXHJcbiAgICBjb25zdCBzaGlmdCA9IE1hdGgubWluKFxyXG4gICAgICAgIDEyMjAgLSByZXZUZXh0Lm9mZnNldFdpZHRoLFxyXG4gICAgICAgIHdpbmRvdy5pbm5lcldpZHRoIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCAtIDYwXHJcbiAgICApO1xyXG5cclxuICAgIHJldlRleHQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtwcm9ncmVzcyAqIHNoaWZ0fXB4KWA7XHJcblxyXG4gICAgbml0cm9JbWcuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgke3Byb2dyZXNzfSlgO1xyXG59XHJcblxyXG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZVNjcm9sbEFuaW1hdGlvbik7XHJcbn1cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCk7XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG5cclxudXBkYXRlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcblxyXG5cclxuXHJcbi8vIHBhcmFsbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJzZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG4gICAgaWYgKCFwYXJ0bmVyc2VjKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX3VwcGVyX2NvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjJfdXBwZXJfY29udGFpbmVyIGltZycpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGF2YXRhckJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtIGJ1dHRvblwiKTtcclxuICAgIGNvbnN0IHJldmlld3NDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c1wiKTtcclxuICAgIGNvbnN0IHJldmlld3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdcIik7XHJcblxyXG4gICAgZnVuY3Rpb24gY2VudGVyUmV2aWV3KHRhcmdldENsaWVudCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVJldmlldyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3W2RhdGEtY2xpZW50PVwiJHt0YXJnZXRDbGllbnR9XCJdYCk7XHJcbiAgICAgICAgaWYgKCFhY3RpdmVSZXZpZXcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyV2lkdGggPSByZXZpZXdzQ29udGFpbmVyLm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IHJldmlld1dpZHRoID0gYWN0aXZlUmV2aWV3Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGNvbnN0IGdhcCA9IDQwO1xyXG5cclxuICAgICAgICBjb25zdCByZXZpZXdJbmRleCA9IEFycmF5LmZyb20ocmV2aWV3cykuaW5kZXhPZihhY3RpdmVSZXZpZXcpO1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEl0ZW1zV2lkdGggPSByZXZpZXdJbmRleCAqIChyZXZpZXdXaWR0aCArIGdhcCk7XHJcbiAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKGNvbnRhaW5lcldpZHRoIC8gMikgLSAocmV2aWV3V2lkdGggLyAyKSAtIHRvdGFsSXRlbXNXaWR0aDtcclxuXHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2l0aW9uID0gXCJ0cmFuc2Zvcm0gMC42cyBlYXNlXCI7XHJcbiAgICAgICAgcmV2aWV3c0NvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlWCgke29mZnNldH1weClgO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFJldmlldyh0YXJnZXQpIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmF2YXRhci1pdGVtXCIpLmZvckVhY2goYSA9PiBhLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKSk7XHJcbiAgICAgICAgcmV2aWV3cy5mb3JFYWNoKHIgPT4gci5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG5cclxuICAgICAgICBjb25zdCBzZWxlY3RlZEF2YXRhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hdmF0YXItaXRlbSBidXR0b25bZGF0YS10cmlnZ2VyPVwiJHt0YXJnZXR9XCJdYCkuY2xvc2VzdChcIi5hdmF0YXItaXRlbVwiKTtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0fVwiXWApO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRBdmF0YXIgJiYgYWN0aXZlUmV2aWV3KSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQXZhdGFyLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgYWN0aXZlUmV2aWV3LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgY2VudGVyUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGF2YXRhckJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xyXG4gICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBidXR0b24uZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hSZXZpZXcodGFyZ2V0KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRDZW50ZXJSZXZpZXcoKSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluaXRpYWxTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICAgICAgaWYgKGluaXRpYWxTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaW5pdGlhbFRhcmdldCA9IGluaXRpYWxTZWxlY3RlZC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRyaWdnZXJcIik7XHJcbiAgICAgICAgICAgICAgICBjZW50ZXJSZXZpZXcoaW5pdGlhbFRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAxMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXRDZW50ZXJSZXZpZXcoKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRTZWxlY3RlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hdmF0YXItaXRlbS5zZWxlY3RlZCBidXR0b24nKTtcclxuICAgICAgICBpZiAoY3VycmVudFNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBjdXJyZW50U2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNlbnRlclJldmlldyhjdXJyZW50VGFyZ2V0KSwgNTApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbi8vIGNhc2VzXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2xvd2VyX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgY2FzZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXIgLmNhc2UnKTtcclxuXHJcbiAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgdHJpZ2dlck9mZnNldDogMC4zLFxyXG4gICAgICAgIHN0ZXBEZWxheTogMC4xNSxcclxuICAgICAgICBhbmltYXRpb25EaXN0YW5jZTogMzBcclxuICAgIH07XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9wID0gY29udGFpbmVyUmVjdC50b3A7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVySGVpZ2h0ID0gY29udGFpbmVyUmVjdC5oZWlnaHQ7XHJcbiAgICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJCb3R0b20gPSBjb250YWluZXJUb3AgKyBjb250YWluZXJIZWlnaHQ7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlclBvaW50ID0gd2luZG93SGVpZ2h0ICogY29uZmlnLnRyaWdnZXJPZmZzZXQ7XHJcblxyXG4gICAgICAgIGlmIChjb250YWluZXJUb3AgPCB3aW5kb3dIZWlnaHQgLSB0cmlnZ2VyUG9pbnQgJiYgY29udGFpbmVyQm90dG9tID4gdHJpZ2dlclBvaW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPSBNYXRoLm1pbihjb250YWluZXJCb3R0b20sIHdpbmRvd0hlaWdodCkgLSBNYXRoLm1heChjb250YWluZXJUb3AsIDApO1xyXG4gICAgICAgICAgICBjb25zdCBtYXhTY3JvbGxhYmxlID0gY29udGFpbmVySGVpZ2h0IC0gd2luZG93SGVpZ2h0ICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtY29udGFpbmVyVG9wICsgKHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0KTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsUHJvZ3Jlc3MgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBzY3JvbGxlZCAvIG1heFNjcm9sbGFibGUpKTtcclxuXHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goKGNhc2VFbCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRocmVzaG9sZCA9IGluZGV4ICogY29uZmlnLnN0ZXBEZWxheTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xsUHJvZ3Jlc3MgPj0gdGhyZXNob2xkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS12aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNhc2VzLmZvckVhY2goY2FzZUVsID0+IHtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgIGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xyXG4gICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU2Nyb2xsQW5pbWF0aW9uKCk7XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG4vLyBwYXJhbGxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyc2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuICAgIGlmICghcGFydG5lcnNlYykgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyM19jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIzX2JhY2tncm91bmQnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLy8gcGFyYWxsYXhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJzZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZSwgLnBwJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXI0X2NvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjRfY29udGFpbmVyIGltZycpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmZvckVhY2goaW1nPT5pbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjRfbG93ZXJfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2VhcjRiYWNrJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuZm9yRWFjaChpbWc9PmltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX2l0ZW0nKTtcclxuXHJcbiAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgob3RoZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVySXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjZfY29udGFpbmVyJyk7XHJcblxyXG4gICAgaWYoIXBhcnRuZXJTZWN0aW9uKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyNl9jb250YWluZXIgaW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuZm9yRWFjaChpbWc9PmltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9ucykge1xyXG4gICAgICAgIG9wZW5CdXR0b25zLmZvckVhY2gob3BlbkJ1dHRvbj0+e1xyXG4gICAgICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGlmKCF0ZXN0RHJpdmVCdXR0b24gfHwgIWlucHV0KXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjb3VudGVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9jb3VudGVyIHNwYW4nKTtcclxuICAgIGNvbnN0IGNvdW50ZXJEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlcicpO1xyXG4gICAgY29uc3Qgc2lnbkluQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcl9zaWduSW4nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2Zvcm1fY29udGFpbmVyX2lucHV0Jyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHMgPSBbY291bnRlckRpdiwgc2lnbkluQnV0dG9uLCBpbnB1dF07XHJcblxyXG4gICAgbGV0IHRvdGFsU2Vjb25kcyA9IDMgKiAxMDA7XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZXIoKSB7XHJcbiAgICAgICAgdG90YWxTZWNvbmRzLS07XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFNlY29uZHMgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvbmUnLCAndHdvJykpO1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZ28nKSk7XHJcbiAgICAgICAgICAgIGNvdW50ZXJFbGVtZW50LnRleHRDb250ZW50ID0gJzAwOjAwLDAwJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc2Vjb25kcyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMTAwKTtcclxuICAgICAgICBjb25zdCBodW5kcmVkdGhzID0gdG90YWxTZWNvbmRzICUgMTAwO1xyXG5cclxuICAgICAgICBjb25zdCBmb3JtYXR0ZWRTZWNvbmRzID0gc2Vjb25kcy50b1N0cmluZygpLnBhZFN0YXJ0KDIsICcwJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHVuZHJlZHRocyA9IGh1bmRyZWR0aHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG5cclxuICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9IGAwMDoke2Zvcm1hdHRlZFNlY29uZHN9LCR7Zm9ybWF0dGVkSHVuZHJlZHRoc31gO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHRvdGFsU2Vjb25kcyl7XHJcbiAgICAgICAgICAgIGNhc2UgMjAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FzZSAxMDA6IHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goZWxlbWVudD0+ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCd0d28nKSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb25lJykpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQodXBkYXRlVGltZXIsIDEwKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKT0+IHtcclxuICAgIC8vIGVtYWlsIHNhdmVcclxuXHJcbiAgICBjb25zdCBtYWluRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG4gICAgY29uc3QgcG9wdXBFbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudF9mb3JtX2lucHV0cyBpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuXHJcbiAgICBpZiAobWFpbkVtYWlsSW5wdXQgJiYgcG9wdXBFbWFpbElucHV0KSB7XHJcbiAgICAgICAgbWFpbkVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBvcHVwRW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgbWFpbkVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAobWFpbkVtYWlsSW5wdXQudmFsdWUpIHtcclxuICAgICAgICAgICAgcG9wdXBFbWFpbElucHV0LnZhbHVlID0gbWFpbkVtYWlsSW5wdXQudmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGNoZWNrYm94IHNhdmVcclxuXHJcbn0pO1xyXG5cclxuLy8gcGFyYWxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2JhY2tncm91bmRJbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgdmlkZW9XcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2xvd2VyV3JhcHBlcl92aWRlbycpO1xyXG4gICAgY29uc3QgbW9kYWxPdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsT3ZlcmxheScpO1xyXG4gICAgY29uc3Qgb3JpZ2luYWxWaWRlbyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCd2aWRlbycpIDogbnVsbDtcclxuICAgIGNvbnN0IG1vZGFsVmlkZW8gPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBwbGF5QnV0dG9uID0gdmlkZW9XcmFwcGVyID8gdmlkZW9XcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoJy52aWRlb19wbGF5ZXIgYnV0dG9uJykgOiBudWxsO1xyXG5cclxuICAgIGNvbnN0IG9yaWdpbmFsUGxheUltZyA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fY29udCBpbWcnKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFBsYXlJbWcgPSBtb2RhbE92ZXJsYXkgPyBtb2RhbE92ZXJsYXkucXVlcnlTZWxlY3RvcignLm1vZGFsLXZpZGVvIGltZycpIDogbnVsbDtcclxuXHJcbiAgICBsZXQgY3VycmVudFRpbWUgPSAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZVBsYXlCdXR0b24odmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldHVwVmlkZW9MaXN0ZW5lcnModmlkZW8sIHBsYXlJbWcpIHtcclxuICAgICAgICBpZiAoIXZpZGVvIHx8ICFwbGF5SW1nKSByZXR1cm47XHJcblxyXG4gICAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXknLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBwbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsVmlkZW8gJiYgb3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhvcmlnaW5hbFZpZGVvLCBvcmlnaW5hbFBsYXlJbWcpO1xyXG4gICAgICAgIHRvZ2dsZVBsYXlCdXR0b24ob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbyAmJiBtb2RhbFBsYXlJbWcpIHtcclxuICAgICAgICBzZXR1cFZpZGVvTGlzdGVuZXJzKG1vZGFsVmlkZW8sIG1vZGFsUGxheUltZyk7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBsYXlCdXR0b24gJiYgb3JpZ2luYWxWaWRlbykge1xyXG4gICAgICAgIHBsYXlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChvcmlnaW5hbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWxXaXRoVmlkZW8oKSB7XHJcbiAgICAgICAgaWYgKCFvcmlnaW5hbFZpZGVvIHx8ICFtb2RhbFZpZGVvKSByZXR1cm47XHJcblxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgIGlmIChvcmlnaW5hbFBsYXlJbWcpIHtcclxuICAgICAgICAgICAgb3JpZ2luYWxQbGF5SW1nLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lID0gY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGxheSgpLmNhdGNoKGUgPT4gY29uc29sZS5sb2coJ01vZGFsIHZpZGVvIHBsYXkgZXJyb3I6JywgZSkpO1xyXG5cclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG1vZGFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG1vZGFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3JpZ2luYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG5cclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmICh2aWRlb1dyYXBwZXIgJiYgbW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgdmlkZW9XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAvLyDQn9GA0L7QstC10YDRj9C10LwsINGH0YLQviDQutC70LjQuiDQvdC1INC/0L4g0LrQvdC+0L/QutC1INGD0L/RgNCw0LLQu9C10L3QuNGPINCyIHZpZGVvX3BsYXllclxyXG4gICAgICAgICAgICBpZiAoIXBsYXlCdXR0b24gfHwgIXBsYXlCdXR0b24uY29udGFpbnMoZS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgb3JpZ2luYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBvcGVuTW9kYWxXaXRoVmlkZW8oKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxWaWRlbykge1xyXG4gICAgICAgIG1vZGFsVmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGlmIChtb2RhbFZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgbW9kYWxQbGF5SW1nLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobW9kYWxPdmVybGF5KSB7XHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIG1vZGFsT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNzdWJtaXRCdXR0b24nKTtcclxuICAgIGNvbnN0IGVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFt0eXBlPVwiZW1haWxcIl0nKTtcclxuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctZm9ybScpO1xyXG4gICAgY29uc3QgY2hlY2tib3hlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZUJ1dHRvblN0YXRlKCkge1xyXG4gICAgICAgIGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53cGNmNy1zdWJtaXQnKTtcclxuICAgICAgICBpZiAoc3VibWl0QnV0dG9uKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGVja2JveGVzWzBdLmNoZWNrZWQgJiYgY2hlY2tib3hlc1sxXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrYm94ZXMuZm9yRWFjaChjaGVja2JveCA9PiB7XHJcbiAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlQnV0dG9uU3RhdGUpO1xyXG5cclxuICAgICAgICBjb25zdCBjdXN0b21DaGVja2JveCA9IGNoZWNrYm94LmNsb3Nlc3QoJy5jaGVja2JveCcpO1xyXG4gICAgICAgIGlmIChjdXN0b21DaGVja2JveCkge1xyXG4gICAgICAgICAgICBjdXN0b21DaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gY2hlY2tib3gpIHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja2JveC5jaGVja2VkID0gIWNoZWNrYm94LmNoZWNrZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICBpZiAoc3VibWl0QnV0dG9uICYmIGVtYWlsSW5wdXQgJiYgZm9ybSkge1xyXG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBjb25zdCBlbWFpbCA9IGVtYWlsSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF2YWxpZGF0ZUVtYWlsKGVtYWlsKSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZW1haWxJbnB1dC5jbGFzc0xpc3QuYWRkKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQucGxhY2Vob2xkZXIgPSAnUGxlYXNlIGVudGVyIGEgdmFsaWQgZW1haWwgYWRkcmVzcyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZW1haWxJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ3dwY2Y3LW5vdC12YWxpZCcpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUoJ3dwY2Y3LW5vdC12YWxpZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGFjZWhvbGRlciA9ICdFLW1haWwnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdmFsaWRhdGVFbWFpbChlbWFpbCkge1xyXG4gICAgICAgIGNvbnN0IGVtYWlsUmVnZXggPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICAgICAgICByZXR1cm4gZW1haWxSZWdleC50ZXN0KGVtYWlsKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVCdXR0b25TdGF0ZSgpO1xyXG5cclxuICAgIFxyXG59KTtcclxuXHJcblxyXG5cclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgY2FyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9jMicpO1xyXG4gICAgY29uc3QgY2FySXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubGRfYzJfY29udGFpbmVyX2l0ZW0nKTtcclxuICAgIGNvbnN0IGFuaW1hdGVkQ2FyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFuaW1hdGVkLWNhcicpO1xyXG5cclxuICAgIGlmICghY2FyU2VjdGlvbiB8fCAhYW5pbWF0ZWRDYXIpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBpdGVtUG9zaXRpb25zID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUG9zaXRpb25zKCkge1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25SZWN0ID0gY2FyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBpdGVtUG9zaXRpb25zLmxlbmd0aCA9IDA7XHJcblxyXG4gICAgICAgIGNhckl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1SZWN0ID0gaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb25Gcm9tVG9wID0gaXRlbVJlY3QudG9wIC0gc2VjdGlvblJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBub3JtYWxpemVkUG9zaXRpb24gPSAocG9zaXRpb25Gcm9tVG9wIC8gc2VjdGlvblJlY3QuaGVpZ2h0KSAqIDEwMDtcclxuICAgICAgICAgICAgaXRlbVBvc2l0aW9ucy5wdXNoKG5vcm1hbGl6ZWRQb3NpdGlvbik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNFbGVtZW50SW5WaWV3cG9ydChlbCkge1xyXG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICByZWN0LnRvcCA8PSAod2luZG93LmlubmVySGVpZ2h0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpICogMC44ICYmXHJcbiAgICAgICAgICAgIHJlY3QuYm90dG9tID49IDBcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHRyYWNrQW5pbWF0aW9uUHJvZ3Jlc3MoKSB7XHJcbiAgICAgICAgY29uc3QgY2FyUmVjdCA9IGFuaW1hdGVkQ2FyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHNlY3Rpb25SZWN0ID0gY2FyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgY2FyUHJvZ3Jlc3MgPSAoKGNhclJlY3QudG9wIC0gc2VjdGlvblJlY3QudG9wKSAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcblxyXG4gICAgICAgIGNhckl0ZW1zLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1Qb3NpdGlvbiA9IGl0ZW1Qb3NpdGlvbnNbaW5kZXhdO1xyXG4gICAgICAgICAgICBpZiAoY2FyUHJvZ3Jlc3MgPj0gaXRlbVBvc2l0aW9uIC0gNSAmJiAhaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ3JldmVhbGVkJykpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZCgncmV2ZWFsZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKCkge1xyXG4gICAgICAgIGlmIChpc0VsZW1lbnRJblZpZXdwb3J0KGNhclNlY3Rpb24pKSB7XHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9ucygpO1xyXG5cclxuICAgICAgICAgICAgYW5pbWF0ZWRDYXIuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0cmFja0FuaW1hdGlvblByb2dyZXNzLCAxMDApO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGFuaW1hdGlvbkludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIGNhckl0ZW1zLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJykpO1xyXG4gICAgICAgICAgICB9LCAxMDUwMCk7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWN0aXZhdGVDYXJBbmltYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlZENhci5zdHlsZS5hbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJztcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2FsY3VsYXRlUG9zaXRpb25zKTtcclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYWN0aXZhdGVDYXJBbmltYXRpb24pO1xyXG5cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGNhbGN1bGF0ZVBvc2l0aW9ucygpO1xyXG4gICAgICAgIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKCk7XHJcbiAgICB9LCAxMDApO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkYzNidXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkYzNpbnB1dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGRmaW5pc2hidXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkZmluaXNoaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTsiLCJpbXBvcnQgY3JlYXRlUGFyYWxsYXggZnJvbSAnLi4vZ2xvYmFsJztcclxuXHJcbi8vIHJlcHJlc2VudFxyXG5cclxuY3JlYXRlUGFyYWxsYXgoJy5sZWFkX2Rpc3RyaWJ1dGlvbl9yZXByZXNlbnQnLCAnLmJhY2tfbGRfcmVwcmVzZW50Jyk7XHJcblxyXG4vLyBjb21wb25lbnQzXHJcblxyXG5jcmVhdGVQYXJhbGxheCgnLmxlYWRfZGlzdHJpYnV0aW9uX2MzJywgJy5sZF9jM19iYWNrJyk7XHJcblxyXG4vLyBmaW5pc2hcclxuXHJcbmNyZWF0ZVBhcmFsbGF4KCcubGRfZmluaXNoJywgJy5sZF9maW5pc2hfYmFjaycpOyIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJzZWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHAnKTtcclxuICAgIGlmICghcGFydG5lcnNlYykgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFydG5lcl9wbGF0Zm9ybV9yZXByZXNlbnQnKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0bmVyX3BsYXRmb3JtX3JlcHJlc2VudCAuYmFjaycpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmNsYXNzTGlzdC5hZGQoJ3BhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVBhcmFsbGF4KCkge1xyXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gcGFydG5lclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLXJlY3QudG9wO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIHBhcnRuZXJTZWN0aW9uLnN0eWxlLnNldFByb3BlcnR5KCctLXBhcmFsbGF4LW9mZnNldCcsIG9mZnNldCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGNvbnZlcnNpb25zSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29udmVyc2lvbnMnKTtcclxuICAgIGNvbnN0IGNsaWNrc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsaWNrcycpO1xyXG4gICAgY29uc3QgZnVuZHNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdW5kcycpO1xyXG4gICAgY29uc3QgcmVzdWx0RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3VsdCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBlcmNlbnRhZ2UoKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNpb25zID0gcGFyc2VJbnQoY29udmVyc2lvbnNJbnB1dC52YWx1ZSkgfHwgMDtcclxuICAgICAgICBjb25zdCBjbGlja3MgPSBwYXJzZUludChjbGlja3NJbnB1dC52YWx1ZSkgfHwgMDtcclxuICAgICAgICBjb25zdCBmdW5kcyA9IHBhcnNlSW50KGZ1bmRzSW5wdXQudmFsdWUpIHx8IDcwMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnZlcnNpb25zT3ZlcmZsb3cgPSBNYXRoLm1heCgwLCBjb252ZXJzaW9ucyAtIDEwMDAwMCk7XHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnNZID0gY29udmVyc2lvbnNPdmVyZmxvdyAvIDEwMDA7XHJcblxyXG4gICAgICAgIGNvbnN0IGNsaWNrc092ZXJmbG93ID0gTWF0aC5tYXgoMCwgY2xpY2tzIC0gMTAwMDAwMCk7XHJcbiAgICAgICAgY29uc3QgY2xpY2tzWSA9IGNsaWNrc092ZXJmbG93IC8gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgWSA9IGNvbnZlcnNpb25zWSArIGNsaWNrc1k7XHJcblxyXG4gICAgICAgIGxldCBwZXJjZW50YWdlID0gKDEwMDAgKyAoNCAqIFkpKSAvIGZ1bmRzO1xyXG5cclxuICAgICAgICBsZXQgZmluYWxQZXJjZW50YWdlID0gTWF0aC5taW4ocGVyY2VudGFnZSAqIDEwMCwgMTQpO1xyXG5cclxuICAgICAgICByZXN1bHREaXYudGV4dENvbnRlbnQgPSBmaW5hbFBlcmNlbnRhZ2UudG9GaXhlZCgyKSArICclJztcclxuICAgIH1cclxuXHJcbiAgICBjb252ZXJzaW9uc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcbiAgICBjbGlja3NJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNhbGN1bGF0ZVBlcmNlbnRhZ2UpO1xyXG4gICAgZnVuZHNJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNhbGN1bGF0ZVBlcmNlbnRhZ2UpO1xyXG5cclxuICAgIGNhbGN1bGF0ZVBlcmNlbnRhZ2UoKTtcclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHAnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcGMzYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcGMzaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuLi9zY3NzL2luZGV4LnNjc3NcIlxyXG5yZXF1aXJlKCcuL2hlYWRlci5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1yZXByZXNlbnQuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjEuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjIuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjMuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjQuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjUuanMnKTtcclxucmVxdWlyZSgnLi9ob21lL2hvbWUtZ2VhcjYuanMnKTtcclxucmVxdWlyZSgnLi9wYXJ0bmVyLXBsYXRmb3JtL3BwX2M2LmpzJyk7XHJcbnJlcXVpcmUoJy4vcGFydG5lci1wbGF0Zm9ybS9wcC1yZXByZXNlbnQuanMnKTtcclxucmVxdWlyZSgnLi9sZWFkLWRpc3RyaWJ1dGlvbi9sZC1jb21wb25lbnQyLmpzJyk7XHJcbnJlcXVpcmUoJy4vY2FzZS9jYXNlLWZpbmlzaC5qcycpO1xyXG5yZXF1aXJlKCcuL2xlYWQtZGlzdHJpYnV0aW9uL3BhcmFsbGF4LmpzJyk7XHJcbnJlcXVpcmUoJy4vY2FzZS9wYXJhbGxheC5qcycpOyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJwYXJ0bmVyU2VjdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXN0RHJpdmVCdXR0b24iLCJpbnB1dCIsImNoZWNrSW5wdXRWYWx1ZSIsInZhbHVlIiwidHJpbSIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsIm1haW5FbWFpbElucHV0IiwicG9wdXBFbWFpbElucHV0IiwiY3JlYXRlUGFyYWxsYXgiLCJjb250YWluZXIiLCJsYWJlbFdyYXBwZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbmZpZyIsInRyaWdnZXJPZmZzZXQiLCJzdGVwRGVsYXkiLCJhbmltYXRpb25EaXN0YW5jZSIsImhhbmRsZVNjcm9sbEFuaW1hdGlvbiIsImNvbnRhaW5lclJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJjb250YWluZXJUb3AiLCJ0b3AiLCJjb250YWluZXJIZWlnaHQiLCJoZWlnaHQiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsImJvdHRvbSIsInByb2dyZXNzIiwiZm9yRWFjaCIsIndyYXBwZXIiLCJpbmRleCIsInRocmVzaG9sZCIsInRpY2tpbmciLCJvblNjcm9sbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInBhc3NpdmUiLCJwYXJlbnRDbGFzcyIsImltZ0NsYXNzIiwicGFyYWxsYXhJbWciLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInVwZGF0ZVBhcmFsbGF4IiwicmVjdCIsInNjcm9sbGVkIiwic3BlZWQiLCJvZmZzZXQiLCJzdHlsZSIsInNldFByb3BlcnR5IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1lbnVJdGVtcyIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsImRyb3Bkb3duQ29udGVudHMiLCJjbG9zZVRpbWVvdXQiLCJsZWF2ZVRpbWVvdXQiLCJhY3RpdmVUcmlnZ2VyIiwiaXRlbSIsImNsZWFyVGltZW91dCIsImkiLCJzZXRUaW1lb3V0IiwiaXNNb3VzZU92ZXJEcm9wZG93biIsImNsb3NlQWxsRHJvcGRvd25zIiwidHJpZ2dlciIsIl90aGlzIiwiZHJvcGRvd25UeXBlIiwiZGF0YXNldCIsImRyb3Bkb3duVHJpZ2dlciIsIm9wZW5Ecm9wZG93biIsInR5cGUiLCJ0YXJnZXRDb250ZW50IiwiY29uY2F0IiwiZGlzcGxheSIsImNsZWFyQWN0aXZlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidW5kZWZpbmVkIiwiY29udGVudCIsInQiLCJlIiwia2V5Iiwibml0cm9JbWciLCJyZXZUZXh0IiwidXBkYXRlU2Nyb2xsQW5pbWF0aW9uIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwicGFydG5lcnNlYyIsImF2YXRhckJ1dHRvbnMiLCJyZXZpZXdzQ29udGFpbmVyIiwicmV2aWV3cyIsImNlbnRlclJldmlldyIsInRhcmdldENsaWVudCIsImFjdGl2ZVJldmlldyIsImNvbnRhaW5lcldpZHRoIiwicmV2aWV3V2lkdGgiLCJnYXAiLCJyZXZpZXdJbmRleCIsIkFycmF5IiwiZnJvbSIsImluZGV4T2YiLCJ0b3RhbEl0ZW1zV2lkdGgiLCJ0cmFuc2l0aW9uIiwic3dpdGNoUmV2aWV3IiwidGFyZ2V0IiwiYSIsInIiLCJzZWxlY3RlZEF2YXRhciIsImNsb3Nlc3QiLCJidXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJpbml0Q2VudGVyUmV2aWV3IiwiaW5pdGlhbFNlbGVjdGVkIiwiaW5pdGlhbFRhcmdldCIsImN1cnJlbnRTZWxlY3RlZCIsImN1cnJlbnRUYXJnZXQiLCJjYXNlcyIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJpbWciLCJhY2NvcmRpb25JdGVtcyIsImNvbnRhaW5zIiwib3RoZXJJdGVtIiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbnMiLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwic3RhcnRUaW1lciIsInRvdGFsU2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsIm9wZW5CdXR0b24iLCJwcmV2ZW50RGVmYXVsdCIsInZpZGVvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aWRlb0NvbnRhaW5lciIsInBsYXlCdXR0b24iLCJ1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSIsInBhdXNlZCIsInBsYXkiLCJwYXVzZSIsImNvdW50ZXJFbGVtZW50IiwiY291bnRlckRpdiIsInNpZ25JbkJ1dHRvbiIsImVsZW1lbnRzIiwidXBkYXRlVGltZXIiLCJlbGVtZW50IiwiaHVuZHJlZHRocyIsImZvcm1hdHRlZFNlY29uZHMiLCJ0b1N0cmluZyIsImZvcm1hdHRlZEh1bmRyZWR0aHMiLCJwYWdlWU9mZnNldCIsImRvY3VtZW50RWxlbWVudCIsInZpZGVvV3JhcHBlciIsIm1vZGFsT3ZlcmxheSIsIm9yaWdpbmFsVmlkZW8iLCJtb2RhbFZpZGVvIiwib3JpZ2luYWxQbGF5SW1nIiwibW9kYWxQbGF5SW1nIiwiY3VycmVudFRpbWUiLCJ0b2dnbGVQbGF5QnV0dG9uIiwicGxheUltZyIsInNldHVwVmlkZW9MaXN0ZW5lcnMiLCJzdG9wUHJvcGFnYXRpb24iLCJvcGVuTW9kYWxXaXRoVmlkZW8iLCJjbG9zZU1vZGFsIiwic3VibWl0QnV0dG9uIiwiZW1haWxJbnB1dCIsImNoZWNrYm94ZXMiLCJ1cGRhdGVCdXR0b25TdGF0ZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImNoZWNrYm94IiwiY3VzdG9tQ2hlY2tib3giLCJkaXNwYXRjaEV2ZW50IiwiRXZlbnQiLCJlbWFpbCIsInZhbGlkYXRlRW1haWwiLCJwbGFjZWhvbGRlciIsImVtYWlsUmVnZXgiLCJ0ZXN0IiwiY2FyU2VjdGlvbiIsImNhckl0ZW1zIiwiYW5pbWF0ZWRDYXIiLCJpdGVtUG9zaXRpb25zIiwiY2FsY3VsYXRlUG9zaXRpb25zIiwic2VjdGlvblJlY3QiLCJpdGVtUmVjdCIsInBvc2l0aW9uRnJvbVRvcCIsIm5vcm1hbGl6ZWRQb3NpdGlvbiIsInB1c2giLCJpc0VsZW1lbnRJblZpZXdwb3J0IiwiZWwiLCJjbGllbnRIZWlnaHQiLCJ0cmFja0FuaW1hdGlvblByb2dyZXNzIiwiY2FyUmVjdCIsImNhclByb2dyZXNzIiwiaXRlbVBvc2l0aW9uIiwiYWN0aXZhdGVDYXJBbmltYXRpb24iLCJhbmltYXRpb25QbGF5U3RhdGUiLCJhbmltYXRpb25JbnRlcnZhbCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJjb252ZXJzaW9uc0lucHV0IiwiY2xpY2tzSW5wdXQiLCJmdW5kc0lucHV0IiwicmVzdWx0RGl2IiwiY2FsY3VsYXRlUGVyY2VudGFnZSIsImNvbnZlcnNpb25zIiwicGFyc2VJbnQiLCJjbGlja3MiLCJmdW5kcyIsImNvbnZlcnNpb25zT3ZlcmZsb3ciLCJjb252ZXJzaW9uc1kiLCJjbGlja3NPdmVyZmxvdyIsImNsaWNrc1kiLCJZIiwicGVyY2VudGFnZSIsImZpbmFsUGVyY2VudGFnZSIsInRvRml4ZWQiLCJyZXF1aXJlIl0sInNvdXJjZVJvb3QiOiIifQ==