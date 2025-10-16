document.addEventListener('DOMContentLoaded', function() {
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
    const dropdownContainer = document.querySelector('.nav_dropdown_container');
    const dropdownContents = document.querySelectorAll('[data-dropdown-content]');
    let closeTimeout;

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            clearTimeout(closeTimeout);
            const dropdownType = this.getAttribute('data-dropdown-trigger');
            openDropdown(dropdownType, this);
        });

        trigger.addEventListener('mouseleave', function() {
            closeTimeout = setTimeout(() => {
                if (!isMouseOverDropdown()) {
                    closeAllDropdowns();
                }
            }, 100);
        });
    });

    if (dropdownContainer) {
        dropdownContainer.addEventListener('mouseenter', function() {
            clearTimeout(closeTimeout);
        });

        dropdownContainer.addEventListener('mouseleave', function() {
            closeTimeout = setTimeout(() => {
                closeAllDropdowns();
            }, 100);
        });
    }

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

    function isMouseOverDropdown() {
        const dropdownElements = document.querySelectorAll('.nav_dropdown_container, [data-dropdown-trigger].active');
        return Array.from(dropdownElements).some(element =>
            element.matches(':hover') || element.querySelector(':hover')
        );
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
});