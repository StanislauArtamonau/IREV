document.addEventListener('DOMContentLoaded', function() {
    const partnerSection = document.querySelector('.case');

    if (!partnerSection) {
        return;
    }

    const testDriveButton = document.querySelector('.casefinishbutton');
    const input = document.querySelector('.casefinishinput');

    if(!testDriveButton || !input){
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


document.addEventListener('DOMContentLoaded', ()=> {
    // email save

    const partnerSection = document.querySelector('.case');

    if (!partnerSection) {
        return;
    }

    const mainEmailInput = document.querySelector('.casefinishinput');
    const popupEmailInput = document.querySelector('.home_popup_content_form_inputs input[type="email"]');

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

document.addEventListener('DOMContentLoaded', function() {
  const slider = document.querySelector('.case_c2 .lower_container');
  
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let animationFrame;
  let velocity = 0;
  let lastX = 0;
  let lastTime = 0;

  function smoothScroll() {
    if (Math.abs(velocity) > 0.1) {
      slider.scrollLeft += velocity;
      velocity *= 0.95; 
      animationFrame = requestAnimationFrame(smoothScroll);
    } else {
      velocity = 0;
    }
  }

  slider.addEventListener('mousedown', (e) => {
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

  slider.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      slider.classList.remove('active');
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });

  slider.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      slider.classList.remove('active');
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX);
    
    slider.scrollLeft = scrollLeft - walk;
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    if (deltaTime > 0) {
      const deltaX = e.pageX - lastX;
      velocity = -deltaX / deltaTime * 30;
    }
    
    lastX = e.pageX;
    lastTime = currentTime;
  });

  slider.addEventListener('touchstart', (e) => {
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

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX);
    
    slider.scrollLeft = scrollLeft - walk;
    
    const currentTime = Date.now();
    const deltaTime = currentTime - lastTime;
    if (deltaTime > 0) {
      const deltaX = e.touches[0].pageX - lastX;
      velocity = -deltaX / deltaTime * 30;
    }
    
    lastX = e.touches[0].pageX;
    lastTime = currentTime;
  });

  slider.addEventListener('touchend', () => {
    if (isDown) {
      isDown = false;
      animationFrame = requestAnimationFrame(smoothScroll);
    }
  });

  slider.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
});
