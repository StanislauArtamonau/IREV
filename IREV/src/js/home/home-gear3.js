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
        let disableFarLeft = false;
        let disableFarRight = false;

        switch(position) {
            case -2: // far-left
                newIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
                disableFarLeft = true;
                break;
            case -1: // left
                newIndex = clickedIndex;
                disableFarLeft = true;
                break;
            case 0: // center
                isAnimating = false;
                return;
            case 1: // right
                newIndex = clickedIndex;
                disableFarRight = true;
                break;
            case 2: // far-right
                newIndex = (currentReviewIndex + 1) % totalReviews;
                disableFarRight = true;
                break;
            default:
                newIndex = clickedIndex;
        }

        currentReviewIndex = newIndex;
        updateReviewsCarousel(disableFarLeft, disableFarRight);

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

    function updateReviewsCarousel(disableFarLeft = false, disableFarRight = false) {
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
                'carousel-hidden',
                'no-transition-transform'
            );
        });

        if (reviews[currentReviewIndex]) {
            reviews[currentReviewIndex].classList.add('selected');
        }

        applyCarouselClasses(reviews, totalReviews);

        if (disableFarLeft) {
            const farLeftReview = currentReviewsContainer.querySelector('.carousel-far-left');
            if (farLeftReview) {
                farLeftReview.classList.add('no-transition-transform');
            }
        }

        if (disableFarRight) {
            const farRightReview = currentReviewsContainer.querySelector('.carousel-far-right');
            if (farRightReview) {
                farRightReview.classList.add('no-transition-transform');
            }
        }
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


// cases
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.home_gear3_lower_container');
    const cases = document.querySelectorAll('.home_gear3_lower_container .case');

    const config = {
        triggerOffset: 0.3,
        stepDelay: 0.15,
        animationDistance: 30
    };

    function handleScrollAnimation() {
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;

        const containerBottom = containerTop + containerHeight;
        const triggerPoint = windowHeight * config.triggerOffset;

        if (containerTop < windowHeight - triggerPoint && containerBottom > triggerPoint) {
            const visibleHeight = Math.min(containerBottom, windowHeight) - Math.max(containerTop, 0);
            const maxScrollable = containerHeight - windowHeight + (windowHeight * config.triggerOffset);
            const scrolled = -containerTop + (windowHeight * config.triggerOffset);
            const scrollProgress = Math.max(0, Math.min(1, scrolled / maxScrollable));

            cases.forEach((caseEl, index) => {
                const threshold = index * config.stepDelay;

                if (scrollProgress >= threshold) {
                    caseEl.classList.add('case-visible');
                    caseEl.classList.remove('case-hidden');
                } else {
                    caseEl.classList.add('case-hidden');
                    caseEl.classList.remove('case-visible');
                }
            });
        } else {
            cases.forEach(caseEl => {
                caseEl.classList.add('case-hidden');
                caseEl.classList.remove('case-visible');
            });
        }
    }

    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScrollAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }

    handleScrollAnimation();
    window.addEventListener('scroll', onScroll, { passive: true });
});