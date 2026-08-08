/* ==========================================================================
   ASAD RAZA PORTFOLIO — CONTACT FORM HANDLER & VALIDATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (!contactForm || !formStatus) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const subject = document.getElementById('form-subject').value.trim();
    const message = document.getElementById('form-message').value.trim();

    // Reset status
    formStatus.className = 'form-status';
    formStatus.textContent = '';

    // Simple validation
    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Submit animation / mock state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Sending Message...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      showStatus('Thank you, Asad Raza has received your message! (Note: Real submission requires backend service like EmailJS / Formspree).', 'success');
      contactForm.reset();
    }, 1200);
  });

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.classList.add(type);
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
