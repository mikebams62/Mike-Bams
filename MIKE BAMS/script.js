// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('mobile-active');
    document.body.classList.toggle('nav-open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('mobile-active');
    menuToggle.classList.remove('active');
    document.body.classList.remove('nav-open');
  });
});

// ===== NAVBAR SHADOW + BACK TO TOP ON SCROLL =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.style.boxShadow = window.scrollY > 10
      ? '0 8px 28px rgba(15,93,80,0.14)'
      : '0 4px 16px rgba(15,93,80,0.08)';
  }
  if (backToTop) {
    window.scrollY > 400 ? backToTop.classList.add('show') : backToTop.classList.remove('show');
  }
});

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== CUSTOM SCROLL REVEAL (Backup / Enhancement to AOS) =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ===== CONTACT FORM — FORMSPREE AJAX SUBMISSION =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        document.getElementById('formSuccess').classList.add('show');
        contactForm.reset();
        contactForm.style.display = 'none';
      } else {
        alert('Something went wrong. Please try again or email me directly at mikebams62@gmail.com');
      }
    } catch (error) {
      alert('Something went wrong. Please try again or email me directly at mikebams62@gmail.com');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ===== INITIALIZE AOS (Scroll Animations) =====
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 900,
    once: true,
    offset: 90,
    easing: 'ease-out-cubic'
  });
}