import createParallax from "../global";

document.addEventListener("DOMContentLoaded", () => {
    const avatarButtons = document.querySelectorAll(".avatar-item button");
    const reviewsContainer = document.querySelector(".home_gear3_reviews");
    const reviews = document.querySelectorAll(".home_gear3_reviews_review");

    function centerReview(targetClient) {
        const activeReview = document.querySelector(`.home_gear3_reviews_review[data-client="${targetClient}"]`);
        if (!activeReview) return;

        const containerWidth = reviewsContainer.offsetWidth;
        const reviewWidth = activeReview.offsetWidth;
        const gap = 40;

        const reviewIndex = Array.from(reviews).indexOf(activeReview);

        const totalItemsWidth = reviewIndex * (reviewWidth + gap);
        const offset = (containerWidth / 2) - (reviewWidth / 2) - totalItemsWidth;

        reviewsContainer.style.transition = "transform 0.6s ease";
        reviewsContainer.style.transform = `translateX(${offset}px)`;
    }

    function switchReview(target) {
        document.querySelectorAll(".avatar-item").forEach(a => a.classList.remove("selected"));
        reviews.forEach(r => r.classList.remove("selected"));

        const selectedAvatar = document.querySelector(`.avatar-item button[data-trigger="${target}"]`).closest(".avatar-item");
        const activeReview = document.querySelector(`.home_gear3_reviews_review[data-client="${target}"]`);

        if (selectedAvatar && activeReview) {
            selectedAvatar.classList.add("selected");
            activeReview.classList.add("selected");
            centerReview(target);
        }
    }

    avatarButtons.forEach(button => {
        button.addEventListener("click", () => {
            const target = button.getAttribute("data-trigger");
            switchReview(target);
        });
    });

    function initCenterReview() {
        setTimeout(() => {
            const initialSelected = document.querySelector('.avatar-item.selected button');
            if (initialSelected) {
                const initialTarget = initialSelected.getAttribute("data-trigger");
                centerReview(initialTarget);
            }
        }, 100);
    }

    initCenterReview();

    window.addEventListener('resize', () => {
        const currentSelected = document.querySelector('.avatar-item.selected button');
        if (currentSelected) {
            const currentTarget = currentSelected.getAttribute("data-trigger");
            setTimeout(() => centerReview(currentTarget), 50);
        }
    });
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




// parallax

createParallax('.home_gear3_container', '.home_gear3_background')
