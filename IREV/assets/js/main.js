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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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IndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaGVhZGVyLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyMy5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLWdlYXI0LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtZ2VhcjUuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2hvbWUvaG9tZS1nZWFyNi5qcyIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaG9tZS9ob21lLXBvcHVwLmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9ob21lL2hvbWUtdmlkZW8tcG9wdXAuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDIuanMiLCJ3ZWJwYWNrOi8vSVJFVi8uL0lSRVYvc3JjL2pzL3BhcnRuZXItcGxhdGZvcm0vcHAtcmVwcmVzZW50LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9qcy9wYXJ0bmVyLXBsYXRmb3JtL3BwX2M2LmpzIiwid2VicGFjazovL0lSRVYvLi9JUkVWL3NyYy9zY3NzL2luZGV4LnNjc3M/NzI0YSIsIndlYnBhY2s6Ly9JUkVWL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0lSRVYvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9JUkVWLy4vSVJFVi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgbWVudUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhlYWRlcl9tZW51X2l0ZW0nKTtcclxuICAgIGNvbnN0IGRyb3Bkb3duVHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1kcm9wZG93bi10cmlnZ2VyXScpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X2Ryb3Bkb3duX2NvbnRhaW5lcicpO1xyXG4gICAgY29uc3QgZHJvcGRvd25Db250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWRyb3Bkb3duLWNvbnRlbnRdJyk7XHJcbiAgICBsZXQgY2xvc2VUaW1lb3V0O1xyXG4gICAgbGV0IGxlYXZlVGltZW91dDtcclxuICAgIGxldCBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuXHJcbiAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChjbG9zZVRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQobGVhdmVUaW1lb3V0KTtcclxuXHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaSAhPT0gaXRlbSAmJiBpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZWF2ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNNb3VzZU92ZXJEcm9wZG93bigpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZUFsbERyb3Bkb3ducygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZHJvcGRvd25UcmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xyXG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoY2xvc2VUaW1lb3V0KTtcclxuICAgICAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaSA9PiBpICE9PSB0aGlzICYmIGkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgYWN0aXZlVHJpZ2dlciA9IHRoaXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyb3Bkb3duVHlwZSA9IHRoaXMuZGF0YXNldC5kcm9wZG93blRyaWdnZXI7XHJcbiAgICAgICAgICAgIG9wZW5Ecm9wZG93bihkcm9wZG93blR5cGUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc01vdXNlT3ZlckRyb3Bkb3duKCkpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd25Db250YWluZXIpIHtcclxuICAgICAgICBkcm9wZG93bkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgKCkgPT4gY2xlYXJUaW1lb3V0KGNsb3NlVGltZW91dCkpO1xyXG4gICAgICAgIGRyb3Bkb3duQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoY2xvc2VBbGxEcm9wZG93bnMsIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlbkRyb3Bkb3duKHR5cGUpIHtcclxuICAgICAgICBjbG9zZUFsbERyb3Bkb3ducyhmYWxzZSk7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1kcm9wZG93bi1jb250ZW50PVwiJHt0eXBlfVwiXWApO1xyXG4gICAgICAgIGlmICh0YXJnZXRDb250ZW50KSB0YXJnZXRDb250ZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VBbGxEcm9wZG93bnMoY2xlYXJBY3RpdmUgPSB0cnVlKSB7XHJcbiAgICAgICAgZHJvcGRvd25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgZHJvcGRvd25Db250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4gY29udGVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnKTtcclxuXHJcbiAgICAgICAgaWYgKGNsZWFyQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGkgPT4gaS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBhY3RpdmVUcmlnZ2VyID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaXNNb3VzZU92ZXJEcm9wZG93bigpIHtcclxuICAgICAgICByZXR1cm4gZHJvcGRvd25Db250YWluZXIubWF0Y2hlcygnOmhvdmVyJykgfHxcclxuICAgICAgICAgICAgKGFjdGl2ZVRyaWdnZXIgJiYgYWN0aXZlVHJpZ2dlci5tYXRjaGVzKCc6aG92ZXInKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIGNsb3NlQWxsRHJvcGRvd25zKCk7XHJcbiAgICB9KTtcclxufSk7XHJcbiIsImNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX2xvd2VyX2NvbnRhaW5lcicpO1xyXG5jb25zdCBuaXRyb0ltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uaXRyby1lZmZlY3QgaW1nJyk7XHJcbmNvbnN0IHJldlRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl9sb3dlcl9jb250YWluZXJfcmV2Jyk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVTY3JvbGxBbmltYXRpb24oKSB7XHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICBsZXQgcHJvZ3Jlc3MgPSAxIC0gcmVjdC50b3AgLyB3aW5kb3dIZWlnaHQ7XHJcbiAgICBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHByb2dyZXNzLCAwKSwgMSk7XHJcblxyXG4gICAgY29uc3Qgc2hpZnQgPSBNYXRoLm1pbihcclxuICAgICAgICAxMjIwIC0gcmV2VGV4dC5vZmZzZXRXaWR0aCxcclxuICAgICAgICB3aW5kb3cuaW5uZXJXaWR0aCAtIHJldlRleHQub2Zmc2V0V2lkdGggLSA2MFxyXG4gICAgKTtcclxuXHJcbiAgICByZXZUZXh0LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGVYKCR7cHJvZ3Jlc3MgKiBzaGlmdH1weClgO1xyXG5cclxuICAgIG5pdHJvSW1nLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHtwcm9ncmVzc30pYDtcclxufVxyXG5cclxuZnVuY3Rpb24gb25TY3JvbGwoKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGVTY3JvbGxBbmltYXRpb24pO1xyXG59XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdXBkYXRlU2Nyb2xsQW5pbWF0aW9uKTtcclxuXHJcbnVwZGF0ZVNjcm9sbEFuaW1hdGlvbigpO1xyXG5cclxuXHJcblxyXG4vLyBwYXJhbGxheFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyc2VjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWUnKTtcclxuICAgIGlmICghcGFydG5lcnNlYykgcmV0dXJuXHJcblxyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyMl91cHBlcl9jb250YWluZXInKTtcclxuXHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXIyX3VwcGVyX2NvbnRhaW5lciBpbWcnKTtcclxuXHJcbiAgICBpZiAocGFyYWxsYXhJbWcgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKScpLm1hdGNoZXMpIHtcclxuICAgICAgICBwYXJhbGxheEltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBhdmF0YXJCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbSBidXR0b25cIik7XHJcbiAgICBjb25zdCByZXZpZXdzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ob21lX2dlYXIzX3Jldmlld3NcIik7XHJcbiAgICBjb25zdCByZXZpZXdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob21lX2dlYXIzX3Jldmlld3NfcmV2aWV3XCIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNlbnRlclJldmlldyh0YXJnZXRDbGllbnQpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVSZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuaG9tZV9nZWFyM19yZXZpZXdzX3Jldmlld1tkYXRhLWNsaWVudD1cIiR7dGFyZ2V0Q2xpZW50fVwiXWApO1xyXG4gICAgICAgIGlmICghYWN0aXZlUmV2aWV3KSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lcldpZHRoID0gcmV2aWV3c0NvbnRhaW5lci5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCByZXZpZXdXaWR0aCA9IGFjdGl2ZVJldmlldy5vZmZzZXRXaWR0aDtcclxuICAgICAgICBjb25zdCBnYXAgPSA0MDtcclxuXHJcbiAgICAgICAgY29uc3QgcmV2aWV3SW5kZXggPSBBcnJheS5mcm9tKHJldmlld3MpLmluZGV4T2YoYWN0aXZlUmV2aWV3KTtcclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxJdGVtc1dpZHRoID0gcmV2aWV3SW5kZXggKiAocmV2aWV3V2lkdGggKyBnYXApO1xyXG4gICAgICAgIGNvbnN0IG9mZnNldCA9IChjb250YWluZXJXaWR0aCAvIDIpIC0gKHJldmlld1dpZHRoIC8gMikgLSB0b3RhbEl0ZW1zV2lkdGg7XHJcblxyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNpdGlvbiA9IFwidHJhbnNmb3JtIDAuNnMgZWFzZVwiO1xyXG4gICAgICAgIHJldmlld3NDb250YWluZXIuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZVgoJHtvZmZzZXR9cHgpYDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hSZXZpZXcodGFyZ2V0KSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5hdmF0YXItaXRlbVwiKS5mb3JFYWNoKGEgPT4gYS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIikpO1xyXG4gICAgICAgIHJldmlld3MuZm9yRWFjaChyID0+IHIuY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdmF0YXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuYXZhdGFyLWl0ZW0gYnV0dG9uW2RhdGEtdHJpZ2dlcj1cIiR7dGFyZ2V0fVwiXWApLmNsb3Nlc3QoXCIuYXZhdGFyLWl0ZW1cIik7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlUmV2aWV3ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmhvbWVfZ2VhcjNfcmV2aWV3c19yZXZpZXdbZGF0YS1jbGllbnQ9XCIke3RhcmdldH1cIl1gKTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkQXZhdGFyICYmIGFjdGl2ZVJldmlldykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEF2YXRhci5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGFjdGl2ZVJldmlldy5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgICAgIGNlbnRlclJldmlldyh0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhdmF0YXJCdXR0b25zLmZvckVhY2goYnV0dG9uID0+IHtcclxuICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gYnV0dG9uLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc3dpdGNoUmV2aWV3KHRhcmdldCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbml0Q2VudGVyUmV2aWV3KCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbml0aWFsU2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWFsU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGluaXRpYWxUYXJnZXQgPSBpbml0aWFsU2VsZWN0ZWQuZ2V0QXR0cmlidXRlKFwiZGF0YS10cmlnZ2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgY2VudGVyUmV2aWV3KGluaXRpYWxUYXJnZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMTAwKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q2VudGVyUmV2aWV3KCk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50U2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXZhdGFyLWl0ZW0uc2VsZWN0ZWQgYnV0dG9uJyk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnRTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gY3VycmVudFNlbGVjdGVkLmdldEF0dHJpYnV0ZShcImRhdGEtdHJpZ2dlclwiKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjZW50ZXJSZXZpZXcoY3VycmVudFRhcmdldCksIDUwKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBjYXNlc1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyM19sb3dlcl9jb250YWluZXInKTtcclxuICAgIGNvbnN0IGNhc2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjNfbG93ZXJfY29udGFpbmVyIC5jYXNlJyk7XHJcblxyXG4gICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgIHRyaWdnZXJPZmZzZXQ6IDAuMyxcclxuICAgICAgICBzdGVwRGVsYXk6IDAuMTUsXHJcbiAgICAgICAgYW5pbWF0aW9uRGlzdGFuY2U6IDMwXHJcbiAgICB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXJSZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvcCA9IGNvbnRhaW5lclJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lclJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyQm90dG9tID0gY29udGFpbmVyVG9wICsgY29udGFpbmVySGVpZ2h0O1xyXG4gICAgICAgIGNvbnN0IHRyaWdnZXJQb2ludCA9IHdpbmRvd0hlaWdodCAqIGNvbmZpZy50cmlnZ2VyT2Zmc2V0O1xyXG5cclxuICAgICAgICBpZiAoY29udGFpbmVyVG9wIDwgd2luZG93SGVpZ2h0IC0gdHJpZ2dlclBvaW50ICYmIGNvbnRhaW5lckJvdHRvbSA+IHRyaWdnZXJQb2ludCkge1xyXG4gICAgICAgICAgICBjb25zdCB2aXNpYmxlSGVpZ2h0ID0gTWF0aC5taW4oY29udGFpbmVyQm90dG9tLCB3aW5kb3dIZWlnaHQpIC0gTWF0aC5tYXgoY29udGFpbmVyVG9wLCAwKTtcclxuICAgICAgICAgICAgY29uc3QgbWF4U2Nyb2xsYWJsZSA9IGNvbnRhaW5lckhlaWdodCAtIHdpbmRvd0hlaWdodCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gLWNvbnRhaW5lclRvcCArICh3aW5kb3dIZWlnaHQgKiBjb25maWcudHJpZ2dlck9mZnNldCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbFByb2dyZXNzID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgc2Nyb2xsZWQgLyBtYXhTY3JvbGxhYmxlKSk7XHJcblxyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKChjYXNlRWwsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSBpbmRleCAqIGNvbmZpZy5zdGVwRGVsYXk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNjcm9sbFByb2dyZXNzID49IHRocmVzaG9sZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QuYWRkKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LnJlbW92ZSgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5hZGQoJ2Nhc2UtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZUVsLmNsYXNzTGlzdC5yZW1vdmUoJ2Nhc2UtdmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXNlcy5mb3JFYWNoKGNhc2VFbCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYXNlRWwuY2xhc3NMaXN0LmFkZCgnY2FzZS1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIGNhc2VFbC5jbGFzc0xpc3QucmVtb3ZlKCdjYXNlLXZpc2libGUnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICBmdW5jdGlvbiBvblNjcm9sbCgpIHtcclxuICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVNjcm9sbEFuaW1hdGlvbigpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuLy8gcGFyYWxsYXhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjNfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9nZWFyM19iYWNrZ3JvdW5kJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcbiIsIi8vIHBhcmFsbGF4XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX2dlYXI0X2NvbnRhaW5lcicpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmhvbWVfZ2VhcjRfY29udGFpbmVyIGltZycpO1xyXG5cclxuICAgIGlmIChwYXJhbGxheEltZyAmJiAhd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJykubWF0Y2hlcykge1xyXG4gICAgICAgIHBhcmFsbGF4SW1nLmZvckVhY2goaW1nPT5pbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKSlcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lJyk7XHJcbiAgICBpZiAoIXBhcnRuZXJzZWMpIHJldHVyblxyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjRfbG93ZXJfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2VhcjRiYWNrJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuZm9yRWFjaChpbWc9PmltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgYWNjb3JkaW9uSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuYWNjb3JkaW9uX2l0ZW0nKTtcclxuXHJcbiAgICBhY2NvcmRpb25JdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYnV0dG9uID0gaXRlbS5xdWVyeVNlbGVjdG9yKCdidXR0b24nKTtcclxuXHJcbiAgICAgICAgaWYgKGJ1dHRvbikge1xyXG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW5lZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWNjb3JkaW9uSXRlbXMuZm9yRWFjaCgob3RoZXJJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG90aGVySXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdvcGVuZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ29wZW5lZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfZ2VhcjZfY29udGFpbmVyJyk7XHJcblxyXG4gICAgY29uc3QgcGFyYWxsYXhJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG9tZV9nZWFyNl9jb250YWluZXIgaW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuZm9yRWFjaChpbWc9PmltZy5jbGFzc0xpc3QuYWRkKCdwYXJhbGxheCcpKVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVQYXJhbGxheCgpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVjdCA9IHBhcnRuZXJTZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICBjb25zdCBzY3JvbGxlZCA9IC1yZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSAwLjM7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IChzY3JvbGxlZCAqIHNwZWVkKSArICdweCc7XHJcblxyXG4gICAgICAgICAgICBwYXJ0bmVyU2VjdGlvbi5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTsiLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwb3B1cE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfdXBwZXIgYnV0dG9uJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcG9wdXBfY29udGVudCBmb3JtJyk7XHJcbiAgICBjb25zdCBvcGVuQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9idXR0b24sIC5vcGVuX21vZGFsJyk7XHJcbiAgICBjb25zdCB0aW1lckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xhYmVsX3dyYXBwZXJfY291bnRlcicpO1xyXG5cclxuICAgIGxldCB0aW1lckludGVydmFsID0gbnVsbDtcclxuXHJcbiAgICBmdW5jdGlvbiBzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGltZXJFbGVtZW50KSByZXR1cm47XHJcblxyXG4gICAgICAgIGxldCB0b3RhbFNlY29uZHMgPSAxNSAqIDYwO1xyXG5cclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gMzYwMCk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKCh0b3RhbFNlY29uZHMgJSAzNjAwKSAvIDYwKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Vjb25kcyA9IHRvdGFsU2Vjb25kcyAlIDYwO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkVGltZSA9XHJcbiAgICAgICAgICAgICAgICBTdHJpbmcoaG91cnMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKG1pbnV0ZXMpLnBhZFN0YXJ0KDIsICcwJykgKyAnOicgK1xyXG4gICAgICAgICAgICAgICAgU3RyaW5nKHNlY29uZHMpLnBhZFN0YXJ0KDIsICcwJyk7XHJcblxyXG4gICAgICAgICAgICB0aW1lckVsZW1lbnQudGV4dENvbnRlbnQgPSBmb3JtYXR0ZWRUaW1lO1xyXG5cclxuICAgICAgICAgICAgaWYgKC0tdG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lckludGVydmFsKTtcclxuICAgICAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MDA6MDBcIjtcclxuICAgICAgICAgICAgICAgIHRpbWVyQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BUaW1lcigpIHtcclxuICAgICAgICBpZiAodGltZXJJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVySW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICB0aW1lckludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRUaW1lcigpIHtcclxuICAgICAgICBzdG9wVGltZXIoKTtcclxuICAgICAgICBpZiAodGltZXJFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRpbWVyRWxlbWVudC50ZXh0Q29udGVudCA9IFwiMDA6MTU6MDBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdGltZXJDb21wbGV0ZSgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcItCi0LDQudC80LXRgCDQt9Cw0LLQtdGA0YjQtdC9IVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcG9wdXBPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnRUaW1lcigpO1xyXG4gICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgaWYgKHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICBwb3B1cE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBvcHVwT3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgc3RvcFRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICByZXNldFRpbWVyKCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcGVuQnV0dG9ucykge1xyXG4gICAgICAgIG9wZW5CdXR0b25zLmZvckVhY2gob3BlbkJ1dHRvbj0+e1xyXG4gICAgICAgICAgICBvcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgb3BlblBvcHVwKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQnV0dG9uKSB7XHJcbiAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9wdXBPdmVybGF5KSB7XHJcbiAgICAgICAgcG9wdXBPdmVybGF5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwT3ZlcmxheSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VQb3B1cCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wdXAoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyB2aWRlb1xyXG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncG9wdXBWaWRlbycpO1xyXG4gICAgY29uc3QgdmlkZW9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9wb3B1cF9jb250ZW50X2xvd2VyX3JpZ2h0Y29udF92aWRlbycpO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpOyAvLyDQvdCw0YXQvtC00LjQvCDQuNC30L7QsdGA0LDQttC10L3QuNC1INC60L3QvtC/0LrQuCBwbGF5XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkoKSB7XHJcbiAgICAgICAgaWYgKHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHBsYXlCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KTtcclxuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgdXBkYXRlUGxheUJ1dHRvblZpc2liaWxpdHkpO1xyXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBwbGF5QnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmlkZW9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b25WaXNpYmlsaXR5KCk7XHJcbn0pO1xyXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCB0ZXN0RHJpdmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY291bnRlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfY291bnRlciBzcGFuJyk7XHJcbiAgICBjb25zdCBjb3VudGVyRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVfcmVwcmVzZW50X2NvdW50ZXInKTtcclxuICAgIGNvbnN0IHNpZ25JbkJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWFkZXJfc2lnbkluJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9mb3JtX2NvbnRhaW5lcl9pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IGVsZW1lbnRzID0gW2NvdW50ZXJEaXYsIHNpZ25JbkJ1dHRvbiwgaW5wdXRdO1xyXG5cclxuICAgIGxldCB0b3RhbFNlY29uZHMgPSAzICogMTAwO1xyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKCkge1xyXG4gICAgICAgIHRvdGFsU2Vjb25kcy0tO1xyXG5cclxuICAgICAgICBpZiAodG90YWxTZWNvbmRzIDwgMCkge1xyXG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb25lJywgJ3R3bycpKTtcclxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2dvJykpO1xyXG4gICAgICAgICAgICBjb3VudGVyRWxlbWVudC50ZXh0Q29udGVudCA9ICcwMDowMCwwMCc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKHRvdGFsU2Vjb25kcyAvIDEwMCk7XHJcbiAgICAgICAgY29uc3QgaHVuZHJlZHRocyA9IHRvdGFsU2Vjb25kcyAlIDEwMDtcclxuXHJcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkU2Vjb25kcyA9IHNlY29uZHMudG9TdHJpbmcoKS5wYWRTdGFydCgyLCAnMCcpO1xyXG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZEh1bmRyZWR0aHMgPSBodW5kcmVkdGhzLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcclxuXHJcbiAgICAgICAgY291bnRlckVsZW1lbnQudGV4dENvbnRlbnQgPSBgMDA6JHtmb3JtYXR0ZWRTZWNvbmRzfSwke2Zvcm1hdHRlZEh1bmRyZWR0aHN9YDtcclxuXHJcbiAgICAgICAgc3dpdGNoICh0b3RhbFNlY29uZHMpe1xyXG4gICAgICAgICAgICBjYXNlIDIwMDoge1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3R3bycpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhc2UgMTAwOiB7XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQ9PmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgndHdvJykpO1xyXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50PT5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ29uZScpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KHVwZGF0ZVRpbWVyLCAxMCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCh1cGRhdGVUaW1lciwgMTApO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCk9PiB7XHJcbiAgICAvLyBlbWFpbCBzYXZlXHJcblxyXG4gICAgY29uc3QgbWFpbkVtYWlsSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZV9yZXByZXNlbnRfZm9ybV9jb250YWluZXJfaW5wdXQnKTtcclxuICAgIGNvbnN0IHBvcHVwRW1haWxJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3BvcHVwX2NvbnRlbnRfZm9ybV9pbnB1dHMgaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcblxyXG4gICAgaWYgKG1haW5FbWFpbElucHV0ICYmIHBvcHVwRW1haWxJbnB1dCkge1xyXG4gICAgICAgIG1haW5FbWFpbElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBwb3B1cEVtYWlsSW5wdXQudmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwb3B1cEVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIG1haW5FbWFpbElucHV0LnZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1haW5FbWFpbElucHV0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHBvcHVwRW1haWxJbnB1dC52YWx1ZSA9IG1haW5FbWFpbElucHV0LnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVja2JveCBzYXZlXHJcblxyXG59KTtcclxuXHJcbi8vIHBhcmFsYXhcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZScpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXJhbGxheEltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9iYWNrZ3JvdW5kSW1nJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjcm9sbGVkID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IDAuMztcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKHNjcm9sbGVkICogc3BlZWQpICsgJ3B4JztcclxuXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1wYXJhbGxheC1vZmZzZXQnLCBvZmZzZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVBhcmFsbGF4KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHZpZGVvV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lX3JlcHJlc2VudF9sb3dlcldyYXBwZXJfdmlkZW8nKTtcclxuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2RhbE92ZXJsYXknKTtcclxuICAgIGNvbnN0IG9yaWdpbmFsVmlkZW8gPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcigndmlkZW8nKSA6IG51bGw7XHJcbiAgICBjb25zdCBtb2RhbFZpZGVvID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJ3ZpZGVvJykgOiBudWxsO1xyXG4gICAgY29uc3QgcGxheUJ1dHRvbiA9IHZpZGVvV3JhcHBlciA/IHZpZGVvV3JhcHBlci5xdWVyeVNlbGVjdG9yKCcudmlkZW9fcGxheWVyIGJ1dHRvbicpIDogbnVsbDtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbFBsYXlJbWcgPSB2aWRlb1dyYXBwZXIgPyB2aWRlb1dyYXBwZXIucXVlcnlTZWxlY3RvcignLnZpZGVvX2NvbnQgaW1nJykgOiBudWxsO1xyXG4gICAgY29uc3QgbW9kYWxQbGF5SW1nID0gbW9kYWxPdmVybGF5ID8gbW9kYWxPdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC12aWRlbyBpbWcnKSA6IG51bGw7XHJcblxyXG4gICAgbGV0IGN1cnJlbnRUaW1lID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiB0b2dnbGVQbGF5QnV0dG9uKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodmlkZW8ucGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXR1cFZpZGVvTGlzdGVuZXJzKHZpZGVvLCBwbGF5SW1nKSB7XHJcbiAgICAgICAgaWYgKCF2aWRlbyB8fCAhcGxheUltZykgcmV0dXJuO1xyXG5cclxuICAgICAgICB2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmlnaW5hbFZpZGVvICYmIG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIHNldHVwVmlkZW9MaXN0ZW5lcnMob3JpZ2luYWxWaWRlbywgb3JpZ2luYWxQbGF5SW1nKTtcclxuICAgICAgICB0b2dnbGVQbGF5QnV0dG9uKG9yaWdpbmFsVmlkZW8sIG9yaWdpbmFsUGxheUltZyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8gJiYgbW9kYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgc2V0dXBWaWRlb0xpc3RlbmVycyhtb2RhbFZpZGVvLCBtb2RhbFBsYXlJbWcpO1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwbGF5QnV0dG9uICYmIG9yaWdpbmFsVmlkZW8pIHtcclxuICAgICAgICBwbGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAob3JpZ2luYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gb3Blbk1vZGFsV2l0aFZpZGVvKCkge1xyXG4gICAgICAgIGlmICghb3JpZ2luYWxWaWRlbyB8fCAhbW9kYWxWaWRlbykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjdXJyZW50VGltZSA9IG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWU7XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBpZiAob3JpZ2luYWxQbGF5SW1nKSB7XHJcbiAgICAgICAgICAgIG9yaWdpbmFsUGxheUltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbW9kYWxWaWRlby5jdXJyZW50VGltZSA9IGN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBsYXkoKS5jYXRjaChlID0+IGNvbnNvbGUubG9nKCdNb2RhbCB2aWRlbyBwbGF5IGVycm9yOicsIGUpKTtcclxuXHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICBpZiAoIW9yaWdpbmFsVmlkZW8gfHwgIW1vZGFsVmlkZW8pIHJldHVybjtcclxuXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBtb2RhbFZpZGVvLmN1cnJlbnRUaW1lO1xyXG5cclxuICAgICAgICBtb2RhbFZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgICAgICBtb2RhbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9yaWdpbmFsVmlkZW8uY3VycmVudFRpbWUgPSBjdXJyZW50VGltZTtcclxuXHJcbiAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgICAgICBvcmlnaW5hbFBsYXlJbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXNldEZvcm0oKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodmlkZW9XcmFwcGVyICYmIG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIHZpZGVvV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgLy8g0J/RgNC+0LLQtdGA0Y/QtdC8LCDRh9GC0L4g0LrQu9C40Log0L3QtSDQv9C+INC60L3QvtC/0LrQtSDRg9C/0YDQsNCy0LvQtdC90LjRjyDQsiB2aWRlb19wbGF5ZXJcclxuICAgICAgICAgICAgaWYgKCFwbGF5QnV0dG9uIHx8ICFwbGF5QnV0dG9uLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIG9wZW5Nb2RhbFdpdGhWaWRlbygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9yaWdpbmFsUGxheUltZykge1xyXG4gICAgICAgIG9yaWdpbmFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgb3Blbk1vZGFsV2l0aFZpZGVvKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsVmlkZW8pIHtcclxuICAgICAgICBtb2RhbFZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBpZiAobW9kYWxWaWRlby5wYXVzZWQpIHtcclxuICAgICAgICAgICAgICAgIG1vZGFsVmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbW9kYWxWaWRlby5wYXVzZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsUGxheUltZykge1xyXG4gICAgICAgIG1vZGFsUGxheUltZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgbW9kYWxWaWRlby5wbGF5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG1vZGFsT3ZlcmxheSkge1xyXG4gICAgICAgIG1vZGFsT3ZlcmxheS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBtb2RhbE92ZXJsYXkpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcbiAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc3VibWl0QnV0dG9uJyk7XHJcbiAgICBjb25zdCBlbWFpbElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImVtYWlsXCJdJyk7XHJcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndwY2Y3LWZvcm0nKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVCdXR0b25TdGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud3BjZjctc3VibWl0Jyk7XHJcbiAgICAgICAgaWYgKHN1Ym1pdEJ1dHRvbikge1xyXG4gICAgICAgICAgICBpZiAoY2hlY2tib3hlc1swXS5jaGVja2VkICYmIGNoZWNrYm94ZXNbMV0uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjaGVja2JveGVzLmZvckVhY2goY2hlY2tib3ggPT4ge1xyXG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHVwZGF0ZUJ1dHRvblN0YXRlKTtcclxuXHJcbiAgICAgICAgY29uc3QgY3VzdG9tQ2hlY2tib3ggPSBjaGVja2JveC5jbG9zZXN0KCcuY2hlY2tib3gnKTtcclxuICAgICAgICBpZiAoY3VzdG9tQ2hlY2tib3gpIHtcclxuICAgICAgICAgICAgY3VzdG9tQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IGNoZWNrYm94KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9ICFjaGVja2JveC5jaGVja2VkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrYm94LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KCdjaGFuZ2UnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgaWYgKHN1Ym1pdEJ1dHRvbiAmJiBlbWFpbElucHV0ICYmIGZvcm0pIHtcclxuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgZW1haWwgPSBlbWFpbElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmICghdmFsaWRhdGVFbWFpbChlbWFpbCkpIHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGVtYWlsSW5wdXQuY2xhc3NMaXN0LmFkZCgnd3BjZjctbm90LXZhbGlkJyk7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgICAgICBlbWFpbElucHV0LnBsYWNlaG9sZGVyID0gJ1BsZWFzZSBlbnRlciBhIHZhbGlkIGVtYWlsIGFkZHJlc3MnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtYWlsSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCd3cGNmNy1ub3QtdmFsaWQnKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCd3cGNmNy1ub3QtdmFsaWQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxhY2Vob2xkZXIgPSAnRS1tYWlsJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlRW1haWwoZW1haWwpIHtcclxuICAgICAgICBjb25zdCBlbWFpbFJlZ2V4ID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgICAgICAgcmV0dXJuIGVtYWlsUmVnZXgudGVzdChlbWFpbCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQnV0dG9uU3RhdGUoKTtcclxuXHJcbiAgICBcclxufSk7XHJcblxyXG5cclxuXHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IGNhclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGVhZF9kaXN0cmlidXRpb25fYzInKTtcclxuICAgIGNvbnN0IGNhckl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxkX2MyX2NvbnRhaW5lcl9pdGVtJyk7XHJcbiAgICBjb25zdCBhbmltYXRlZENhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hbmltYXRlZC1jYXInKTtcclxuXHJcbiAgICBpZiAoIWNhclNlY3Rpb24gfHwgIWFuaW1hdGVkQ2FyKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaXRlbVBvc2l0aW9ucyA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVBvc2l0aW9ucygpIHtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgaXRlbVBvc2l0aW9ucy5sZW5ndGggPSAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUmVjdCA9IGl0ZW0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvc2l0aW9uRnJvbVRvcCA9IGl0ZW1SZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcDtcclxuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZFBvc2l0aW9uID0gKHBvc2l0aW9uRnJvbVRvcCAvIHNlY3Rpb25SZWN0LmhlaWdodCkgKiAxMDA7XHJcbiAgICAgICAgICAgIGl0ZW1Qb3NpdGlvbnMucHVzaChub3JtYWxpemVkUG9zaXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGlzRWxlbWVudEluVmlld3BvcnQoZWwpIHtcclxuICAgICAgICBjb25zdCByZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgcmVjdC50b3AgPD0gKHdpbmRvdy5pbm5lckhlaWdodCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSAqIDAuOCAmJlxyXG4gICAgICAgICAgICByZWN0LmJvdHRvbSA+PSAwXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB0cmFja0FuaW1hdGlvblByb2dyZXNzKCkge1xyXG4gICAgICAgIGNvbnN0IGNhclJlY3QgPSBhbmltYXRlZENhci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCBzZWN0aW9uUmVjdCA9IGNhclNlY3Rpb24uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNhclByb2dyZXNzID0gKChjYXJSZWN0LnRvcCAtIHNlY3Rpb25SZWN0LnRvcCkgLyBzZWN0aW9uUmVjdC5oZWlnaHQpICogMTAwO1xyXG5cclxuICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtUG9zaXRpb24gPSBpdGVtUG9zaXRpb25zW2luZGV4XTtcclxuICAgICAgICAgICAgaWYgKGNhclByb2dyZXNzID49IGl0ZW1Qb3NpdGlvbiAtIDUgJiYgIWl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKCdyZXZlYWxlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3JldmVhbGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBhY3RpdmF0ZUNhckFuaW1hdGlvbigpIHtcclxuICAgICAgICBpZiAoaXNFbGVtZW50SW5WaWV3cG9ydChjYXJTZWN0aW9uKSkge1xyXG4gICAgICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuXHJcbiAgICAgICAgICAgIGFuaW1hdGVkQ2FyLnN0eWxlLmFuaW1hdGlvblBsYXlTdGF0ZSA9ICdydW5uaW5nJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkludGVydmFsID0gc2V0SW50ZXJ2YWwodHJhY2tBbmltYXRpb25Qcm9ncmVzcywgMTAwKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChhbmltYXRpb25JbnRlcnZhbCk7XHJcbiAgICAgICAgICAgICAgICBjYXJJdGVtcy5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuYWRkKCdyZXZlYWxlZCcpKTtcclxuICAgICAgICAgICAgfSwgMTA1MDApO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZWRDYXIuc3R5bGUuYW5pbWF0aW9uUGxheVN0YXRlID0gJ3BhdXNlZCc7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNhbGN1bGF0ZVBvc2l0aW9ucyk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFjdGl2YXRlQ2FyQW5pbWF0aW9uKTtcclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBjYWxjdWxhdGVQb3NpdGlvbnMoKTtcclxuICAgICAgICBhY3RpdmF0ZUNhckFuaW1hdGlvbigpO1xyXG4gICAgfSwgMTAwKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGQnKTtcclxuXHJcbiAgICBpZiAoIXBhcnRuZXJTZWN0aW9uKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHRlc3REcml2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGMzaW5wdXQnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGVja0lucHV0VmFsdWUoKSB7XHJcbiAgICAgICAgaWYgKGlucHV0LnZhbHVlLnRyaW0oKSAhPT0gJycpIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjaGVja0lucHV0VmFsdWUpO1xyXG5cclxuICAgIGNoZWNrSW5wdXRWYWx1ZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxkZmluaXNoYnV0dG9uJyk7XHJcbiAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sZGZpbmlzaGlucHV0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hlY2tJbnB1dFZhbHVlKCkge1xyXG4gICAgICAgIGlmIChpbnB1dC52YWx1ZS50cmltKCkgIT09ICcnKSB7XHJcbiAgICAgICAgICAgIHRlc3REcml2ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoYXMtdmFsdWUnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2hlY2tJbnB1dFZhbHVlKTtcclxuXHJcbiAgICBjaGVja0lucHV0VmFsdWUoKTtcclxufSk7IiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgY29uc3QgcGFydG5lcnNlYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcCcpO1xyXG4gICAgaWYgKCFwYXJ0bmVyc2VjKSByZXR1cm5cclxuXHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXJ0bmVyX3BsYXRmb3JtX3JlcHJlc2VudCcpO1xyXG5cclxuICAgIGNvbnN0IHBhcmFsbGF4SW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhcnRuZXJfcGxhdGZvcm1fcmVwcmVzZW50IC5iYWNrJyk7XHJcblxyXG4gICAgaWYgKHBhcmFsbGF4SW1nICYmICF3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSknKS5tYXRjaGVzKSB7XHJcbiAgICAgICAgcGFyYWxsYXhJbWcuY2xhc3NMaXN0LmFkZCgncGFyYWxsYXgnKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUGFyYWxsYXgoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBwYXJ0bmVyU2VjdGlvbi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2Nyb2xsZWQgPSAtcmVjdC50b3A7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gMC4zO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAoc2Nyb2xsZWQgKiBzcGVlZCkgKyAncHgnO1xyXG5cclxuICAgICAgICAgICAgcGFydG5lclNlY3Rpb24uc3R5bGUuc2V0UHJvcGVydHkoJy0tcGFyYWxsYXgtb2Zmc2V0Jywgb2Zmc2V0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2U7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVQYXJhbGxheCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlUGFyYWxsYXgoKTtcclxuICAgIH1cclxufSk7XHJcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcclxuICAgIGNvbnN0IHBhcnRuZXJTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwJyk7XHJcblxyXG4gICAgaWYgKCFwYXJ0bmVyU2VjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgY29udmVyc2lvbnNJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb252ZXJzaW9ucycpO1xyXG4gICAgY29uc3QgY2xpY2tzSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xpY2tzJyk7XHJcbiAgICBjb25zdCBmdW5kc0lucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Z1bmRzJyk7XHJcbiAgICBjb25zdCByZXN1bHREaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdWx0Jyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlUGVyY2VudGFnZSgpIHtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnMgPSBwYXJzZUludChjb252ZXJzaW9uc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGNsaWNrcyA9IHBhcnNlSW50KGNsaWNrc0lucHV0LnZhbHVlKSB8fCAwO1xyXG4gICAgICAgIGNvbnN0IGZ1bmRzID0gcGFyc2VJbnQoZnVuZHNJbnB1dC52YWx1ZSkgfHwgNzAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY29udmVyc2lvbnNPdmVyZmxvdyA9IE1hdGgubWF4KDAsIGNvbnZlcnNpb25zIC0gMTAwMDAwKTtcclxuICAgICAgICBjb25zdCBjb252ZXJzaW9uc1kgPSBjb252ZXJzaW9uc092ZXJmbG93IC8gMTAwMDtcclxuXHJcbiAgICAgICAgY29uc3QgY2xpY2tzT3ZlcmZsb3cgPSBNYXRoLm1heCgwLCBjbGlja3MgLSAxMDAwMDAwKTtcclxuICAgICAgICBjb25zdCBjbGlja3NZID0gY2xpY2tzT3ZlcmZsb3cgLyAxMDAwO1xyXG5cclxuICAgICAgICBjb25zdCBZID0gY29udmVyc2lvbnNZICsgY2xpY2tzWTtcclxuXHJcbiAgICAgICAgbGV0IHBlcmNlbnRhZ2UgPSAoMTAwMCArICg0ICogWSkpIC8gZnVuZHM7XHJcblxyXG4gICAgICAgIGxldCBmaW5hbFBlcmNlbnRhZ2UgPSBNYXRoLm1pbihwZXJjZW50YWdlICogMTAwLCAxNCk7XHJcblxyXG4gICAgICAgIHJlc3VsdERpdi50ZXh0Q29udGVudCA9IGZpbmFsUGVyY2VudGFnZS50b0ZpeGVkKDIpICsgJyUnO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnZlcnNpb25zSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBjYWxjdWxhdGVQZXJjZW50YWdlKTtcclxuICAgIGNsaWNrc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcbiAgICBmdW5kc0lucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgY2FsY3VsYXRlUGVyY2VudGFnZSk7XHJcblxyXG4gICAgY2FsY3VsYXRlUGVyY2VudGFnZSgpO1xyXG59KTtcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XHJcbiAgICBjb25zdCBwYXJ0bmVyU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcCcpO1xyXG5cclxuICAgIGlmICghcGFydG5lclNlY3Rpb24pIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdGVzdERyaXZlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwYzNidXR0b24nKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBwYzNpbnB1dCcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXRWYWx1ZSgpIHtcclxuICAgICAgICBpZiAoaW5wdXQudmFsdWUudHJpbSgpICE9PSAnJykge1xyXG4gICAgICAgICAgICB0ZXN0RHJpdmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGFzLXZhbHVlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGVzdERyaXZlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy12YWx1ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGNoZWNrSW5wdXRWYWx1ZSk7XHJcblxyXG4gICAgY2hlY2tJbnB1dFZhbHVlKCk7XHJcbn0pO1xyXG5cclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3MvaW5kZXguc2Nzc1wiXHJcbnJlcXVpcmUoJy4vaGVhZGVyLmpzJyk7XHJcbnJlcXVpcmUoJy4vaG9tZS9ob21lLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS12aWRlby1wb3B1cC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMS5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMi5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyMy5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNC5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNS5qcycpO1xyXG5yZXF1aXJlKCcuL2hvbWUvaG9tZS1nZWFyNi5qcycpO1xyXG5yZXF1aXJlKCcuL3BhcnRuZXItcGxhdGZvcm0vcHBfYzYuanMnKTtcclxucmVxdWlyZSgnLi9wYXJ0bmVyLXBsYXRmb3JtL3BwLXJlcHJlc2VudC5qcycpO1xyXG5yZXF1aXJlKCcuL2xlYWQtZGlzdHJpYnV0aW9uL2xkLWNvbXBvbmVudDIuanMnKTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWVudUl0ZW1zIiwicXVlcnlTZWxlY3RvckFsbCIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93bkNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJkcm9wZG93bkNvbnRlbnRzIiwiY2xvc2VUaW1lb3V0IiwibGVhdmVUaW1lb3V0IiwiYWN0aXZlVHJpZ2dlciIsImZvckVhY2giLCJpdGVtIiwiY2xlYXJUaW1lb3V0IiwiaSIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZCIsInNldFRpbWVvdXQiLCJpc01vdXNlT3ZlckRyb3Bkb3duIiwiY2xvc2VBbGxEcm9wZG93bnMiLCJ0cmlnZ2VyIiwiX3RoaXMiLCJkcm9wZG93blR5cGUiLCJkYXRhc2V0IiwiZHJvcGRvd25UcmlnZ2VyIiwib3BlbkRyb3Bkb3duIiwidHlwZSIsInRhcmdldENvbnRlbnQiLCJjb25jYXQiLCJzdHlsZSIsImRpc3BsYXkiLCJjbGVhckFjdGl2ZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInVuZGVmaW5lZCIsImNvbnRlbnQiLCJ0IiwibWF0Y2hlcyIsImUiLCJrZXkiLCJjb250YWluZXIiLCJuaXRyb0ltZyIsInJldlRleHQiLCJ1cGRhdGVTY3JvbGxBbmltYXRpb24iLCJwYXJ0bmVyU2VjdGlvbiIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aW5kb3dIZWlnaHQiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInByb2dyZXNzIiwidG9wIiwiTWF0aCIsIm1pbiIsIm1heCIsInNoaWZ0Iiwib2Zmc2V0V2lkdGgiLCJpbm5lcldpZHRoIiwidHJhbnNmb3JtIiwib25TY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJwYXJ0bmVyc2VjIiwicGFyYWxsYXhJbWciLCJtYXRjaE1lZGlhIiwidXBkYXRlUGFyYWxsYXgiLCJzY3JvbGxlZCIsInNwZWVkIiwib2Zmc2V0Iiwic2V0UHJvcGVydHkiLCJ0aWNraW5nIiwiYXZhdGFyQnV0dG9ucyIsInJldmlld3NDb250YWluZXIiLCJyZXZpZXdzIiwiY2VudGVyUmV2aWV3IiwidGFyZ2V0Q2xpZW50IiwiYWN0aXZlUmV2aWV3IiwiY29udGFpbmVyV2lkdGgiLCJyZXZpZXdXaWR0aCIsImdhcCIsInJldmlld0luZGV4IiwiQXJyYXkiLCJmcm9tIiwiaW5kZXhPZiIsInRvdGFsSXRlbXNXaWR0aCIsInRyYW5zaXRpb24iLCJzd2l0Y2hSZXZpZXciLCJ0YXJnZXQiLCJhIiwiciIsInNlbGVjdGVkQXZhdGFyIiwiY2xvc2VzdCIsImJ1dHRvbiIsImdldEF0dHJpYnV0ZSIsImluaXRDZW50ZXJSZXZpZXciLCJpbml0aWFsU2VsZWN0ZWQiLCJpbml0aWFsVGFyZ2V0IiwiY3VycmVudFNlbGVjdGVkIiwiY3VycmVudFRhcmdldCIsImNhc2VzIiwiY29uZmlnIiwidHJpZ2dlck9mZnNldCIsInN0ZXBEZWxheSIsImFuaW1hdGlvbkRpc3RhbmNlIiwiaGFuZGxlU2Nyb2xsQW5pbWF0aW9uIiwiY29udGFpbmVyUmVjdCIsImNvbnRhaW5lclRvcCIsImNvbnRhaW5lckhlaWdodCIsImhlaWdodCIsImNvbnRhaW5lckJvdHRvbSIsInRyaWdnZXJQb2ludCIsInZpc2libGVIZWlnaHQiLCJtYXhTY3JvbGxhYmxlIiwic2Nyb2xsUHJvZ3Jlc3MiLCJjYXNlRWwiLCJpbmRleCIsInRocmVzaG9sZCIsInBhc3NpdmUiLCJpbWciLCJhY2NvcmRpb25JdGVtcyIsImNvbnRhaW5zIiwib3RoZXJJdGVtIiwicG9wdXBPdmVybGF5IiwiY2xvc2VCdXR0b24iLCJmb3JtIiwib3BlbkJ1dHRvbnMiLCJ0aW1lckVsZW1lbnQiLCJ0aW1lckludGVydmFsIiwic3RhcnRUaW1lciIsInRvdGFsU2Vjb25kcyIsImNsZWFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImhvdXJzIiwiZmxvb3IiLCJtaW51dGVzIiwic2Vjb25kcyIsImZvcm1hdHRlZFRpbWUiLCJTdHJpbmciLCJwYWRTdGFydCIsInRleHRDb250ZW50IiwidGltZXJDb21wbGV0ZSIsInN0b3BUaW1lciIsInJlc2V0VGltZXIiLCJjb25zb2xlIiwibG9nIiwib3BlblBvcHVwIiwiYm9keSIsIm92ZXJmbG93IiwiY2xvc2VQb3B1cCIsIm9wZW5CdXR0b24iLCJwcmV2ZW50RGVmYXVsdCIsInZpZGVvIiwiZ2V0RWxlbWVudEJ5SWQiLCJ2aWRlb0NvbnRhaW5lciIsInBsYXlCdXR0b24iLCJ1cGRhdGVQbGF5QnV0dG9uVmlzaWJpbGl0eSIsInBhdXNlZCIsInBsYXkiLCJwYXVzZSIsInRlc3REcml2ZUJ1dHRvbiIsImlucHV0IiwiY2hlY2tJbnB1dFZhbHVlIiwidmFsdWUiLCJ0cmltIiwiY291bnRlckVsZW1lbnQiLCJjb3VudGVyRGl2Iiwic2lnbkluQnV0dG9uIiwiZWxlbWVudHMiLCJ1cGRhdGVUaW1lciIsImVsZW1lbnQiLCJodW5kcmVkdGhzIiwiZm9ybWF0dGVkU2Vjb25kcyIsInRvU3RyaW5nIiwiZm9ybWF0dGVkSHVuZHJlZHRocyIsIm1haW5FbWFpbElucHV0IiwicG9wdXBFbWFpbElucHV0IiwicGFnZVlPZmZzZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJ2aWRlb1dyYXBwZXIiLCJtb2RhbE92ZXJsYXkiLCJvcmlnaW5hbFZpZGVvIiwibW9kYWxWaWRlbyIsIm9yaWdpbmFsUGxheUltZyIsIm1vZGFsUGxheUltZyIsImN1cnJlbnRUaW1lIiwidG9nZ2xlUGxheUJ1dHRvbiIsInBsYXlJbWciLCJzZXR1cFZpZGVvTGlzdGVuZXJzIiwic3RvcFByb3BhZ2F0aW9uIiwib3Blbk1vZGFsV2l0aFZpZGVvIiwiY2xvc2VNb2RhbCIsInJlc2V0Rm9ybSIsInN1Ym1pdEJ1dHRvbiIsImVtYWlsSW5wdXQiLCJjaGVja2JveGVzIiwidXBkYXRlQnV0dG9uU3RhdGUiLCJjaGVja2VkIiwiZGlzYWJsZWQiLCJjaGVja2JveCIsImN1c3RvbUNoZWNrYm94IiwiZGlzcGF0Y2hFdmVudCIsIkV2ZW50IiwiZW1haWwiLCJ2YWxpZGF0ZUVtYWlsIiwicGxhY2Vob2xkZXIiLCJlbWFpbFJlZ2V4IiwidGVzdCIsImNhclNlY3Rpb24iLCJjYXJJdGVtcyIsImFuaW1hdGVkQ2FyIiwiaXRlbVBvc2l0aW9ucyIsImNhbGN1bGF0ZVBvc2l0aW9ucyIsInNlY3Rpb25SZWN0IiwiaXRlbVJlY3QiLCJwb3NpdGlvbkZyb21Ub3AiLCJub3JtYWxpemVkUG9zaXRpb24iLCJwdXNoIiwiaXNFbGVtZW50SW5WaWV3cG9ydCIsImVsIiwiY2xpZW50SGVpZ2h0IiwiYm90dG9tIiwidHJhY2tBbmltYXRpb25Qcm9ncmVzcyIsImNhclJlY3QiLCJjYXJQcm9ncmVzcyIsIml0ZW1Qb3NpdGlvbiIsImFjdGl2YXRlQ2FyQW5pbWF0aW9uIiwiYW5pbWF0aW9uUGxheVN0YXRlIiwiYW5pbWF0aW9uSW50ZXJ2YWwiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiY29udmVyc2lvbnNJbnB1dCIsImNsaWNrc0lucHV0IiwiZnVuZHNJbnB1dCIsInJlc3VsdERpdiIsImNhbGN1bGF0ZVBlcmNlbnRhZ2UiLCJjb252ZXJzaW9ucyIsInBhcnNlSW50IiwiY2xpY2tzIiwiZnVuZHMiLCJjb252ZXJzaW9uc092ZXJmbG93IiwiY29udmVyc2lvbnNZIiwiY2xpY2tzT3ZlcmZsb3ciLCJjbGlja3NZIiwiWSIsInBlcmNlbnRhZ2UiLCJmaW5hbFBlcmNlbnRhZ2UiLCJ0b0ZpeGVkIiwicmVxdWlyZSJdLCJzb3VyY2VSb290IjoiIn0=