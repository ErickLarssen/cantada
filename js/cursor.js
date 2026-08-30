/**
 * Cursor customizado — discreto, apenas desktop com hover disponível.
 * Não interfere em usabilidade nem em dispositivos touch.
 */
(function () {
  const isCoarsePointer = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isCoarsePointer) return;

  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  if (prefersReducedMotion) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let hasMoved = false;

  dot.style.opacity = '0';
  ring.style.opacity = '0';

  const hasGsap = typeof window.gsap !== 'undefined';
  const quickDot = hasGsap ? gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'none' }) : null;
  const quickDotY = hasGsap ? gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'none' }) : null;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!hasMoved) {
      hasMoved = true;
      ringX = mouseX;
      ringY = mouseY;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }

    if (quickDot && quickDotY) {
      quickDot(mouseX);
      quickDotY(mouseY);
    } else {
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }
  });

  function renderRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

  const interactiveSelectors = 'a, button, .animated-button1, .whatsapp-cta';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.add('is-active');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelectors)) {
      ring.classList.remove('is-active');
    }
  });
})();
