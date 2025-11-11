const container = document.querySelector('.home_gear2_lower_container');
const nitroImg = document.querySelector('.nitro-effect img');
const revText = document.querySelector('.home_gear2_lower_container_rev');

function updateScrollAnimation() {

    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    let progress = 1 - rect.top / windowHeight;
    progress = Math.min(Math.max(progress, 0), 1);

    const shift = Math.min(
        1220 - revText.offsetWidth,
        window.innerWidth - revText.offsetWidth - 60
    );

    revText.style.transform = `translateX(${progress * shift}px)`;

    nitroImg.style.transform = `scaleX(${progress})`;
}

function onScroll() {
    const partnerSection = document.querySelector('.home');

    if (!partnerSection) {
        return;
    }
    requestAnimationFrame(updateScrollAnimation);
}

window.addEventListener('scroll', onScroll);
window.addEventListener('resize', updateScrollAnimation);

updateScrollAnimation();





