/* ==========================================================================
   ASAD RAZA PORTFOLIO — CUSTOM CURSOR, MAGNETIC BUTTONS & CARD TILT v2.0
   Interactive Cursor with Comet Trail, Magnetic Suction, Ripple & 3D Tilt
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Disable on mobile touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Create cursor elements dynamically
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';

  document.body.appendChild(cursor);
  document.body.appendChild(follower);

  // Create comet trail dots
  const TRAIL_COUNT = 4;
  const trailDots = Array.from({ length: TRAIL_COUNT }, (_, i) => {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail';
    const size = 6 - i * 1.2;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.opacity = `${0.4 - i * 0.08}`;
    dot.style.transition = `left ${0.08 + i * 0.04}s ease-out, top ${0.08 + i * 0.04}s ease-out`;
    document.body.appendChild(dot);
    return dot;
  });

  let posX = 0, posY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    posX = e.clientX;
    posY = e.clientY;

    cursor.style.left = `${posX}px`;
    cursor.style.top = `${posY}px`;

    // Update trail dots
    trailDots.forEach(dot => {
      dot.style.left = `${posX}px`;
      dot.style.top = `${posY}px`;
    });
  });

  // Smooth follower animation loop
  function renderCursor() {
    followerX += (posX - followerX) * 0.13;
    followerY += (posY - followerY) * 0.13;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, input, textarea, .glass-card, .project-card, .service-card');
  hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // Magnetic Button Effect
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // Ripple Click Effect (with gold gradient)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.ripple-effect, .btn');
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple-circle';

    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    target.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 700);
  });

  // 3D Tilt Card Effect — Activate the .tilt-card class
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      card.style.transition = 'transform 0.1s ease-out';
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s ease';
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
    });
  });
});
