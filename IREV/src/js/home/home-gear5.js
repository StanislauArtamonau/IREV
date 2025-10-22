document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion_item');

    accordionItems.forEach((item) => {
        const openBtn = item.querySelector('.open');
        const closeBtn = item.querySelector('.close');

        if (openBtn) {
            openBtn.addEventListener('click', () => {
                item.classList.add('opened');
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                item.classList.remove('opened');
            });
        }
    });
});