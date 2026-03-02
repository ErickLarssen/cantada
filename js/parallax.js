// Parallax simples e suave para background images
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const parallaxBg = document.querySelectorAll('.parallax-bg');

    parallaxBg.forEach((bg) => {
        const speed = bg.classList.contains('warning-bg') ? 0.2 : 0.4;
        bg.style.transform = `translateX(-50%) translateY(${scrollPos * speed}px)`;
    });
});