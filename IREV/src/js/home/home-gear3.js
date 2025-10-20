document.addEventListener('DOMContentLoaded', function() {
    // Элементы управления
    const avatarButtons = document.querySelectorAll('.home_gear3_clients_avatar button');
    const reviewsContainers = document.querySelectorAll('.home_gear3_reviews');

    // Текущее состояние
    let currentClient = 'client4';
    let currentReviewIndex = 2;
    let isAnimating = false;

    // Инициализация
    initCarousel();

    // Обработчики кликов на аватары
    avatarButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isAnimating) return;

            const clientId = this.getAttribute('data-trigger');
            switchClient(clientId);
        });
    });

    // Обработчики кликов на отзывы
    document.querySelectorAll('.home_gear3_reviews_review').forEach(review => {
        review.addEventListener('click', function() {
            if (isAnimating) return;

            const reviewContainer = this.closest('.home_gear3_reviews');
            if (!reviewContainer.classList.contains('selected')) return;

            const reviews = reviewContainer.querySelectorAll('.home_gear3_reviews_review');
            const reviewIndex = Array.from(reviews).indexOf(this);

            // Проверяем, что клик был по видимому элементу (не по скрытому)
            if (!this.classList.contains('carousel-hidden')) {
                selectReview(reviewIndex);
            }
        });
    });

    function initCarousel() {
        updateClientDisplay();
        updateReviewsCarousel();
    }

    function switchClient(clientId) {
        if (currentClient === clientId) return;

        isAnimating = true;

        // Снимаем выделение со всех аватаров
        document.querySelectorAll('.avatar-item').forEach(item => {
            item.classList.remove('selected');
        });

        // Добавляем выделение выбранному аватару
        const selectedAvatar = document.querySelector(`[data-trigger="${clientId}"]`).closest('.avatar-item');
        selectedAvatar.classList.add('selected');

        // Обновляем текущего клиента
        currentClient = clientId;
        currentReviewIndex = 2;

        // Обновляем отображение
        updateClientDisplay();
        updateReviewsCarousel();

        // Завершаем анимацию после завершения CSS transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function selectReview(index) {
        if (currentReviewIndex === index || isAnimating) return;

        isAnimating = true;
        currentReviewIndex = index;
        updateReviewsCarousel();

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function updateClientDisplay() {
        // Скрываем все контейнеры отзывов
        reviewsContainers.forEach(container => {
            container.classList.remove('selected');
        });

        // Показываем только выбранного клиента
        const selectedReviews = document.querySelector(`[data-client="${currentClient}"]`);
        if (selectedReviews) {
            selectedReviews.classList.add('selected');
        }
    }

    function updateReviewsCarousel() {
        const currentReviewsContainer = document.querySelector(`[data-client="${currentClient}"]`);
        if (!currentReviewsContainer) return;

        const reviews = currentReviewsContainer.querySelectorAll('.home_gear3_reviews_review');
        const totalReviews = reviews.length;

        // Сбрасываем все классы позиционирования
        reviews.forEach(review => {
            review.classList.remove(
                'selected',
                'carousel-center',
                'carousel-left',
                'carousel-right',
                'carousel-far-left',
                'carousel-far-right',
                'carousel-hidden'
            );
        });

        // Добавляем выделение выбранному отзыву
        if (reviews[currentReviewIndex]) {
            reviews[currentReviewIndex].classList.add('selected');
        }

        // Применяем классы для анимации карусели
        applyCarouselClasses(reviews, totalReviews);
    }

    function applyCarouselClasses(reviews, totalReviews) {
        reviews.forEach((review, index) => {
            let position = index - currentReviewIndex;

            // Обрабатываем зацикливание позиций
            if (position < -2) {
                position += totalReviews;
            } else if (position > 2) {
                position -= totalReviews;
            }

            // Сначала проверяем, находится ли элемент за пределами видимой области
            // Используем более строгое условие для определения видимых элементов
            const isVisible = Math.abs(position) <= 2;

            if (!isVisible) {
                review.classList.add('carousel-hidden');
                return; // Прерываем выполнение для скрытых элементов
            }

            // Для видимых элементов применяем позиционирование
            // И гарантируем, что у них нет класса hidden
            review.classList.remove('carousel-hidden');

            switch(position) {
                case 0:
                    review.classList.add('carousel-center');
                    break;
                case -1:
                    review.classList.add('carousel-left');
                    break;
                case 1:
                    review.classList.add('carousel-right');
                    break;
                case -2:
                    review.classList.add('carousel-far-left');
                    break;
                case 2:
                    review.classList.add('carousel-far-right');
                    break;
                default:
                    // На всякий случай, если что-то пошло не так
                    review.classList.add('carousel-hidden');
                    break;
            }
        });
    }
});