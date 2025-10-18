document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('.header_menu_item');
    const dropdownTriggers = document.querySelectorAll('[data-dropdown-trigger]');
    const dropdownContainer = document.querySelector('.nav_dropdown_container');
    const dropdownContents = document.querySelectorAll('[data-dropdown-content]');
    let closeTimeout;
    let leaveTimeout;
    let activeTrigger = null;

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            clearTimeout(closeTimeout);
            clearTimeout(leaveTimeout);

            menuItems.forEach(i => i !== item && i.classList.remove('active'));
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            leaveTimeout = setTimeout(() => {
                if (!isMouseOverDropdown()) {
                    item.classList.remove('active');
                    activeTrigger = null;
                    closeAllDropdowns();
                }
            }, 100);
        });
    });

    dropdownTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            clearTimeout(closeTimeout);
            menuItems.forEach(i => i !== this && i.classList.remove('active'));
            this.classList.add('active');

            activeTrigger = this;
            const dropdownType = this.dataset.dropdownTrigger;
            openDropdown(dropdownType);
        });

        trigger.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(() => {
                if (!isMouseOverDropdown()) closeAllDropdowns();
            }, 100);
        });
    });

    if (dropdownContainer) {
        dropdownContainer.addEventListener('mouseenter', () => clearTimeout(closeTimeout));
        dropdownContainer.addEventListener('mouseleave', () => {
            closeTimeout = setTimeout(closeAllDropdowns, 100);
        });
    }

    function openDropdown(type) {
        closeAllDropdowns(false);
        dropdownContainer.classList.add('active');

        const targetContent = document.querySelector(`[data-dropdown-content="${type}"]`);
        if (targetContent) targetContent.style.display = 'flex';
    }

    function closeAllDropdowns(clearActive = true) {
        dropdownContainer.classList.remove('active');
        dropdownContents.forEach(content => content.style.display = 'none');

        if (clearActive) {
            menuItems.forEach(i => i.classList.remove('active'));
            dropdownTriggers.forEach(t => t.classList.remove('active'));
            activeTrigger = null;
        }
    }

    function isMouseOverDropdown() {
        return dropdownContainer.matches(':hover') ||
            (activeTrigger && activeTrigger.matches(':hover'));
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeAllDropdowns();
    });
});
