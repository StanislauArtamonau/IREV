document.addEventListener('DOMContentLoaded', function() {
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
    const dropdownContainer = document.querySelector('.nav_dropdown_container');
    const dropdownContents = document.querySelectorAll('[data-dropdown-content]');

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownType = this.getAttribute('data-dropdown-trigger');
            const isActive = this.classList.contains('active');

            if (isActive) {
                closeAllDropdowns();
            } else {
                openDropdown(dropdownType, this);
            }
        });
    });

    function openDropdown(type, trigger) {
        closeAllDropdowns();

        dropdownContainer.classList.add('active');

        trigger.classList.add('active');

        const targetContent = document.querySelector(`[data-dropdown-content="${type}"]`);
        if (targetContent) {
            targetContent.style.display = 'flex';
        }
    }

    function closeAllDropdowns() {
        dropdownContainer.classList.remove('active');

        dropdownTriggers.forEach(trigger => {
            trigger.classList.remove('active');
        });

        dropdownContents.forEach(content => {
            content.style.display = 'none';
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.header_nav')) {
            closeAllDropdowns();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
});