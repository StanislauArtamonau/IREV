document.addEventListener('DOMContentLoaded', function() {
    const counterElement = document.querySelector('.home_represent_counter span');
    const counterDiv = document.querySelector('.home_represent_counter');
    const signInButton = document.querySelector('.header_signIn');
    const testDriveButton = document.querySelector('.home_represent_form_container_button');
    const input = document.querySelector('.home_represent_form_container_input');

    const elements = [counterDiv, signInButton, testDriveButton, input];

    let totalSeconds = 3 * 100;

    function updateTimer() {
        totalSeconds--;

        if (totalSeconds < 0) {
            elements.forEach(element=>element.classList.remove('one', 'two'));
            elements.forEach(element=>element.classList.add('go'));
            counterElement.textContent = '00:00,00';
            return;
        }

        const seconds = Math.floor(totalSeconds / 100);
        const hundredths = totalSeconds % 100;

        const formattedSeconds = seconds.toString().padStart(2, '0');
        const formattedHundredths = hundredths.toString().padStart(2, '0');

        counterElement.textContent = `00:${formattedSeconds},${formattedHundredths}`;

        switch (totalSeconds){
            case 200: {
                elements.forEach(element=>element.classList.add('two'));
                break;
            }
            case 100: {
                elements.forEach(element=>element.classList.remove('two'));
                elements.forEach(element=>element.classList.add('one'));
                break;
            }
        }

        setTimeout(updateTimer, 10);
    }

    setTimeout(updateTimer, 10);
});