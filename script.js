document.addEventListener('DOMContentLoaded', () => {

  // ── Contact modal ──────────────────────────────────────────
  const overlay  = document.getElementById('contact-overlay');
  const openBtns = document.querySelectorAll('[data-open-modal]');
  const closeBtn = document.getElementById('modal-close');

  const openModal  = () => overlay && overlay.classList.add('active');
  const closeModal = () => overlay && overlay.classList.remove('active');

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtn?.addEventListener('click', closeModal);

  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // ── Contact form ───────────────────────────────────────────
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success-msg');

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        if (successMsg) successMsg.style.display = 'block';
        btn.textContent = 'Sent!';
      } else {
        throw new Error();
      }
    } catch {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  });

});
