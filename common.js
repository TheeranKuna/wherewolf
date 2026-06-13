/* Shared website behaviors: sticky-nav state, scroll reveals, role helpers. */
(function () {
  function onReady(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    // sticky nav
    const nav = document.querySelector('.nav');
    if (nav) {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // reveal on scroll
    const items = document.querySelectorAll('.reveal');
    if (items.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const d = el.dataset.delay;
            if (d) el.style.transitionDelay = d + 'ms';
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });
      items.forEach((el) => io.observe(el));
    }
  });

  // expose factions color lookup
  window.WW = window.WW || {};
  window.WW.factionColor = (k) => (window.WW_FACTIONS[k] || {}).color || '#C9A36B';
})();
