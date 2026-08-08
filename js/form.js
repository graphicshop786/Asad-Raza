/* ==========================================================================
   ASAD RAZA PORTFOLIO — CONTACT FORM DUAL-MODE HANDLER (GMAIL & WHATSAPP)
   Direct Gmail web compose + WhatsApp chat pre-filled redirection
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const btnGmail = document.getElementById('btn-submit-gmail');
  const btnWhatsApp = document.getElementById('btn-submit-whatsapp');

  if (!contactForm || !formStatus) return;

  function getFormData() {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    return {
      name: nameInput ? nameInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      subject: subjectInput ? subjectInput.value.trim() : '',
      message: messageInput ? messageInput.value.trim() : ''
    };
  }

  function validateForm(data) {
    if (formStatus) {
      formStatus.className = 'form-status';
      formStatus.textContent = '';
    }

    if (!data.name || !data.email || !data.subject || !data.message) {
      showStatus('Please fill in all required fields.', 'error');
      return false;
    }

    if (!isValidEmail(data.email)) {
      showStatus('Please enter a valid email address.', 'error');
      return false;
    }

    return true;
  }

  // 1. Submit via Gmail / Email
  function handleGmail(e) {
    if (e) e.preventDefault();
    const data = getFormData();
    if (!validateForm(data)) return;

    const gmailRecipient = "asadraza175634@gmail.com";
    const emailSubject = `[Portfolio Contact] ${data.subject}`;
    const emailBody = `Hi Asad Raza,\n\nName: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}\n\n---\nSent via Portfolio Website Contact Form`;

    const mailtoUrl = `mailto:${gmailRecipient}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(gmailRecipient)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    showStatus('Opening Gmail app / compose window with your pre-filled message...', 'success');

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      // Mobile device: direct mailto launches native Gmail app
      window.location.href = mailtoUrl;
    } else {
      // Desktop: attempt web Gmail first, fallback to mailto
      try {
        const win = window.open(gmailWebUrl, '_blank');
        if (!win || win.closed || typeof win.closed === 'undefined') {
          window.location.href = mailtoUrl;
        }
      } catch (err) {
        window.location.href = mailtoUrl;
      }
    }
  }

  // 2. Submit via WhatsApp Direct
  function handleWhatsApp(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const data = getFormData();
    if (!validateForm(data)) return;

    const waPhone = "923407416930";
    const waText = `👋 *New Contact Inquiry from Portfolio*\n\n👤 *Name:* ${data.name}\n📧 *Email:* ${data.email}\n📌 *Subject:* ${data.subject}\n\n💬 *Message:*\n${data.message}`;

    // Universal WhatsApp Web / App API URL
    const waUrl = `https://api.whatsapp.com/send?phone=${waPhone}&text=${encodeURIComponent(waText)}`;

    showStatus('Opening WhatsApp chat with your pre-filled message...', 'success');

    try {
      const win = window.open(waUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = waUrl;
      }
    } catch (err) {
      window.location.href = waUrl;
    }
  }

  // Bind Form Submit
  contactForm.addEventListener('submit', handleGmail);

  // Bind Gmail Button
  if (btnGmail) {
    btnGmail.addEventListener('click', handleGmail);
  }

  // Bind WhatsApp Button
  if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', handleWhatsApp);
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
