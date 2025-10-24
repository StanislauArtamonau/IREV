document.addEventListener('DOMContentLoaded', function() {
    const conversionsInput = document.getElementById('conversions');
    const clicksInput = document.getElementById('clicks');
    const fundsInput = document.getElementById('funds');
    const resultDiv = document.getElementById('result');

    function calculatePercentage() {
        // Получаем значения
        const conversions = parseInt(conversionsInput.value) || 0;
        const clicks = parseInt(clicksInput.value) || 0;
        const funds = parseInt(fundsInput.value) || 7000;

        const conversionsOverflow = Math.max(0, conversions - 100000);
        const conversionsY = conversionsOverflow / 1000;

        const clicksOverflow = Math.max(0, clicks - 1000000);
        const clicksY = clicksOverflow / 1000;

        const Y = conversionsY + clicksY;

        let percentage = (1000 + (4 * Y)) / funds;

        let finalPercentage = Math.min(percentage * 100, 14);

        resultDiv.textContent = finalPercentage.toFixed(2) + '%';
    }

    conversionsInput.addEventListener('input', calculatePercentage);
    clicksInput.addEventListener('input', calculatePercentage);
    fundsInput.addEventListener('input', calculatePercentage);

    calculatePercentage();
});