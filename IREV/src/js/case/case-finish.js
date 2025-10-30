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
