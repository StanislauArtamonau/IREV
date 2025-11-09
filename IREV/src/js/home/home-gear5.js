document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion_item');

    accordionItems.forEach((item) => {
        const button = item.querySelector('button');

        if (button) {
            button.addEventListener('click', () => {
                if (item.classList.contains('opened')) {
                    item.classList.remove('opened');
                } else {
                    accordionItems.forEach((otherItem) => {
                        otherItem.classList.remove('opened');
                    });
                    item.classList.add('opened');
                }
            });
        }
    });
});