/**
 * Typewriter — mantém a sensação de texto sendo digitado.
 * Respeita prefers-reduced-motion exibindo o texto completo, sem o loop.
 */
(function () {
  const typewriterElement = document.getElementById('typewriter');
  if (!typewriterElement) return;

  const TEXT = 'Olá, PESSOA!';
  const TYPE_SPEED = 100;
  const DELETE_SPEED = 60;
  const HOLD_DELAY = 1400;
  const RESTART_DELAY = 400;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    typewriterElement.textContent = TEXT;
    return;
  }

  let index = 0;
  let typing = true;

  function typeLoop() {
    if (typing) {
      if (index < TEXT.length) {
        typewriterElement.textContent += TEXT.charAt(index);
        index++;
        setTimeout(typeLoop, TYPE_SPEED);
      } else {
        typing = false;
        setTimeout(typeLoop, HOLD_DELAY);
      }
    } else {
      if (index > 0) {
        typewriterElement.textContent = TEXT.substring(0, --index);
        setTimeout(typeLoop, DELETE_SPEED);
      } else {
        typing = true;
        setTimeout(typeLoop, RESTART_DELAY);
      }
    }
  }

  window.addEventListener('load', typeLoop);
})();
