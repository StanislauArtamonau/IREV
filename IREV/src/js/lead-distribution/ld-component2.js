document.addEventListener('DOMContentLoaded', function() {
    const carSection = document.querySelector('.lead_distribution_c2');
    const carItems = document.querySelectorAll('.ld_c2_container_item');
    const animatedCar = document.querySelector('.animated-car');

    if (!carSection || !animatedCar) return;

    // Позиции блоков относительно секции
    const itemPositions = [];

    function calculatePositions() {
        const sectionRect = carSection.getBoundingClientRect();
        itemPositions.length = 0;

        carItems.forEach((item, index) => {
            const itemRect = item.getBoundingClientRect();
            // Позиция относительно начала секции
            const positionFromTop = itemRect.top - sectionRect.top;
            // Нормализуем позицию (0-100%)
            const normalizedPosition = (positionFromTop / sectionRect.height) * 100;
            itemPositions.push(normalizedPosition);
        });
    }

    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Функция для отслеживания прогресса анимации
    function trackAnimationProgress() {
        const carRect = animatedCar.getBoundingClientRect();
        const sectionRect = carSection.getBoundingClientRect();

        // Позиция машины относительно секции (0-100%)
        const carProgress = ((carRect.top - sectionRect.top) / sectionRect.height) * 100;

        // Показываем блоки когда машина достигает их позиции
        carItems.forEach((item, index) => {
            const itemPosition = itemPositions[index];
            if (carProgress >= itemPosition - 5 && !item.classList.contains('revealed')) {
                item.classList.add('revealed');
            }
        });
    }

    // Функция для активации анимации
    function activateCarAnimation() {
        if (isElementInViewport(carSection)) {
            // Пересчитываем позиции
            calculatePositions();

            // Запускаем анимацию машины
            animatedCar.style.animationPlayState = 'running';

            // Отслеживаем прогресс анимации
            const animationInterval = setInterval(trackAnimationProgress, 100);

            // Останавливаем отслеживание после завершения анимации
            setTimeout(() => {
                clearInterval(animationInterval);
                // Гарантируем, что все блоки показаны
                carItems.forEach(item => item.classList.add('revealed'));
            }, 10500); // Чуть больше длительности анимации

            // Убираем обработчик после активации
            window.removeEventListener('scroll', activateCarAnimation);
        }
    }

    // Инициализация - приостанавливаем анимацию до скролла
    animatedCar.style.animationPlayState = 'paused';

    // Пересчитываем позиции при ресайзе
    window.addEventListener('resize', calculatePositions);

    // Активируем при скролле
    window.addEventListener('scroll', activateCarAnimation);

    // Также активируем при загрузке, если элемент уже в viewport
    setTimeout(() => {
        calculatePositions();
        activateCarAnimation();
    }, 100);
});