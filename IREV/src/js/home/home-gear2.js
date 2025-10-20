document.addEventListener("DOMContentLoaded", () => {
    const nitroContainer = document.querySelector(".home_gear2_lower_container_nitro");
    const revText = document.querySelector(".home_gear2_lower_container_rev");
    const nitroEffect = document.querySelector(".nitro-effect img");

    let lastScrollY = window.scrollY;
    let scrollDirection = "down";
    let isAnimated = false;

    const addAnimations = () => {
        if (isAnimated) return;
        isAnimated = true;
        revText.style.animation = "textSlide 1.2s ease-out 0.1s forwards";
        nitroEffect.style.animation = "nitroSlide 1s ease-out forwards";
    };

    const removeAnimations = () => {
        if (!isAnimated) return;
        isAnimated = false;
        revText.style.animation = "textSlideReverse 1.2s ease-out 0.1s forwards";
        nitroEffect.style.animation = "nitroSlideReverse 1s ease-out forwards";
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const currentY = window.scrollY;
                scrollDirection = currentY > lastScrollY ? "down" : "up";
                lastScrollY = currentY;

                if (entry.isIntersecting && scrollDirection === "down") {
                    addAnimations();
                }

                if (!entry.isIntersecting && scrollDirection === "up") {
                    removeAnimations();
                }
            });
        },
        {
            root: null,
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        }
    );

    observer.observe(nitroContainer);
});

