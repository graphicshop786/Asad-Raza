/* ==========================================================================
   ASAD RAZA PORTFOLIO — ANIMATED COUNTERS & SKILL BARS
   IntersectionObserver Triggered Progress Fills
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const skillCards = document.querySelectorAll('.skill-card');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const fill = card.querySelector('.progress-fill');
          const percentText = card.querySelector('.skill-percent');
          const targetPercent = card.getAttribute('data-percent') || 80;

          if (fill) {
            fill.style.width = `${targetPercent}%`;
          }

          if (percentText) {
            animateNumber(percentText, 0, parseInt(targetPercent), 1200);
          }

          observerInstance.unobserve(card);
        }
      });
    }, { threshold: 0.2 });

    skillCards.forEach(card => observer.observe(card));
  } else {
    // Fallback for older browsers
    skillCards.forEach(card => {
      const fill = card.querySelector('.progress-fill');
      const targetPercent = card.getAttribute('data-percent') || 80;
      if (fill) fill.style.width = `${targetPercent}%`;
    });
  }
});

function animateNumber(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    element.textContent = `${Math.floor(progress * (end - start) + start)}%`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
