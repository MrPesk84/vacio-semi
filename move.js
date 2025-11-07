// move.js — Interacciones ligeras para la web de deportes
document.addEventListener('DOMContentLoaded', () => {
  // Año en el footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Toggle nav móvil
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('show');
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const targetId = a.getAttribute('href');
      if (targetId.length > 1) {
        e.preventDefault();
        const el = document.querySelector(targetId);
        if (el) el.scrollIntoView({behavior:'smooth',block:'start'});
        nav.classList.remove('show');
      }
    });
  });

  // Reveal on scroll con IntersectionObserver
  const reveals = document.querySelectorAll('[data-reveal], .card, .gal-img, .hero-content');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal');
        obs.unobserve(e.target);
      }
    });
  }, {threshold:0.12});
  reveals.forEach(r => obs.observe(r));

  // Tilt ligero en tarjetas
  document.querySelectorAll('.sport-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateX(${ -y * 6 }deg) rotateY(${ x * 8 }deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // Modal galería
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  document.querySelectorAll('.gal-img').forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt || '';
      modal.setAttribute('aria-hidden','false');
    });
  });
  modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Botón ir arriba
  const toTop = document.getElementById('to-top');
  toTop.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

  // Form fake submit (demostrar interacción)
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    setTimeout(() => {
      btn.textContent = 'Enviar';
      alert('Gracias — hemos recibido tu solicitud.');
      form.reset();
    }, 800);
  });

});
