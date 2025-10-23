document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.home_gear1_info_container');
    const labels = document.querySelectorAll('.home_gear1_info_label');

    const progressBar = document.createElement('div');
    progressBar.className = 'section-progress';
    document.body.appendChild(progressBar);

    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const label = labels[index];

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                label.classList.add('active');

                const progress = ((scrollPosition - sectionTop) / sectionHeight) * 100;
                const totalProgress = ((index + progress / 100) / sections.length) * 100;
                progressBar.style.setProperty('--progress', totalProgress + '%');
            } else {
                label.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveSection);

    updateActiveSection();

    labels.forEach((label, index) => {
        label.style.cursor = 'pointer';
        label.addEventListener('click', () => {
            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
});