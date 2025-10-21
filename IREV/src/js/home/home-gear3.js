document.addEventListener('DOMContentLoaded', function() {
    const avatarButtons = document.querySelectorAll('.home_gear3_clients_avatar button');
    const reviewsContainers = document.querySelectorAll('.home_gear3_reviews');

    let currentClient = 'client4';
    let currentReviewIndex = 2;
    let isAnimating = false;

    initCarousel();

    avatarButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (isAnimating) return;

            const clientId = this.getAttribute('data-trigger');
            switchClient(clientId);
        });
    });

    document.querySelectorAll('.home_gear3_reviews_review').forEach(review => {
        review.addEventListener('click', function() {
            if (isAnimating) return;

            const reviewContainer = this.closest('.home_gear3_reviews');
            if (!reviewContainer.classList.contains('selected')) return;

            const reviews = reviewContainer.querySelectorAll('.home_gear3_reviews_review');
            const reviewIndex = Array.from(reviews).indexOf(this);

            if (!this.classList.contains('carousel-hidden')) {
                const position = reviewIndex - currentReviewIndex;
                const totalReviews = reviews.length;

                let adjustedPosition = position;
                if (position < -2) {
                    adjustedPosition += totalReviews;
                } else if (position > 2) {
                    adjustedPosition -= totalReviews;
                }

                handleReviewClick(adjustedPosition, reviewIndex, totalReviews);
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

        document.querySelectorAll('.avatar-item').forEach(item => {
            item.classList.remove('selected');
        });

        const selectedAvatar = document.querySelector(`[data-trigger="${clientId}"]`).closest('.avatar-item');
        selectedAvatar.classList.add('selected');

        currentClient = clientId;
        currentReviewIndex = 2;

        updateClientDisplay();
        updateReviewsCarousel();

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function handleReviewClick(position, clickedIndex, totalReviews) {
        if (isAnimating) return;

        isAnimating = true;

        let newIndex;

        switch(position) {
            case -2:
                newIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
                break;
            case -1:
                newIndex = clickedIndex;
                break;
            case 0:
                isAnimating = false;
                return;
            case 1:
                newIndex = clickedIndex;
                break;
            case 2:
                newIndex = (currentReviewIndex + 1) % totalReviews;
                break;
            default:
                newIndex = clickedIndex;
        }

        currentReviewIndex = newIndex;
        updateReviewsCarousel();

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function updateClientDisplay() {
        reviewsContainers.forEach(container => {
            container.classList.remove('selected');
        });

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

        if (reviews[currentReviewIndex]) {
            reviews[currentReviewIndex].classList.add('selected');
        }

        applyCarouselClasses(reviews, totalReviews);
    }

    function applyCarouselClasses(reviews, totalReviews) {
        reviews.forEach((review, index) => {
            let position = index - currentReviewIndex;

            if (position < -2) {
                position += totalReviews;
            } else if (position > 2) {
                position -= totalReviews;
            }

            const isVisible = Math.abs(position) <= 2;

            if (!isVisible) {
                review.classList.add('carousel-hidden');
                return;
            }

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
                    review.classList.add('carousel-hidden');
                    break;
            }
        });
    }
});