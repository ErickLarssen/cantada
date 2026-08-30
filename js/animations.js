/**
 * Motion premium com GSAP.
 * Cada movimento tem função: dar ritmo à leitura e criar expectativa
 * antes da revelação. Respeita prefers-reduced-motion integralmente.
 */
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined';

  if (!hasGsap || prefersReducedMotion) {
    return; // CSS já garante opacidade 1 sem a classe js-ready
  }

  document.documentElement.classList.add('js-ready');
  gsap.registerPlugin(window.ScrollTrigger);

  const EASE = 'power3.out';

  function reveal(selector, vars, position) {
    const el = document.querySelector(`[data-reveal="${selector}"]`);
    if (!el) return null;
    return { el, vars: Object.assign({ opacity: 1, duration: 0.9, ease: EASE }, vars) };
  }

  // ---------- Entrada geral (header + rodapé, presentes nas duas páginas) ----------
  const master = gsap.timeline({ defaults: { ease: EASE } });

  const header = document.querySelector('[data-reveal="header"]');
  if (header) {
    master.fromTo(header, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.7 }, 0);
  }

  // ---------- Página: index ----------
  const heroEyebrow = document.querySelector('[data-reveal="eyebrow"]');
  const typewriterWrapper = document.querySelector('.typewriter-wrapper');
  const heroBody = document.querySelector('[data-reveal="hero-body"]');
  const ctaWrap = document.querySelector('[data-reveal="cta"]');

  if (heroEyebrow) {
    master.fromTo(heroEyebrow, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3);
  }

  if (typewriterWrapper) {
    master.fromTo(typewriterWrapper, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.7 }, 0.5);
  }

  if (heroBody) {
    master.fromTo(heroBody, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 1.5);
  }

  if (ctaWrap) {
    master.fromTo(ctaWrap, { opacity: 0, y: 16, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 2.0);
  }

  // Flutuação sutil e contínua do avião de papel
  const heroImage = document.querySelector('[data-float]');
  if (heroImage) {
    gsap.to(heroImage, {
      y: -10,
      duration: 2.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      delay: 1.8,
    });
  }

  // ---------- Página: segunda (revelação) ----------
  const frame = document.querySelector('[data-reveal="frame"]');
  const tags = document.querySelector('[data-reveal="tags"]');
  const text = document.querySelector('[data-reveal="text"]');
  const verdict = document.querySelector('[data-reveal="verdict"]');
  const portfolio = document.querySelector('[data-reveal="portfolio"]');

  if (frame) {
    const segundaTl = gsap.timeline({ defaults: { ease: EASE }, delay: 0.3 });

    segundaTl.fromTo(frame, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0);

    if (tags) {
      segundaTl.fromTo(
        tags.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
        0.4
      );
    }

    if (text) {
      segundaTl.fromTo(
        text,
        { opacity: 0, y: 14, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 },
        0.8
      );
    }

    if (verdict) {
      segundaTl.fromTo(verdict, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 1.7);
    }

    if (portfolio) {
      segundaTl.fromTo(portfolio, { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.2);
    }
  }

  // ---------- Rodapé (ambas páginas) — revela ao entrar na viewport ----------
  const footer = document.querySelector('[data-reveal="footer"]');
  if (footer) {
    gsap.fromTo(
      footer,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: EASE,
        scrollTrigger: { trigger: footer, start: 'top 95%' },
      }
    );
  }

  // ---------- Parallax muito sutil no ícone de alerta (segunda.html) ----------
  const warningBg = document.querySelector('.warning-bg');
  if (warningBg) {
    gsap.to(warningBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: warningBg,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      },
    });
  }
})();
