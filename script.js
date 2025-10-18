// Smooth scroll navigation
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { targetElement.focus({ preventScroll: true }); }, 400);
    }
  });
});

// Sliding testimonial carousel
const carousel = document.querySelector('.testimonial-carousel');
let scrollAmount = 0;
const step = 1.5;
let direction = 1;

function slideTestimonials() {
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;
  if (scrollAmount >= maxScroll) {
    direction = -1;
  } else if (scrollAmount <= 0) {
    direction = 1;
  }
  scrollAmount += step * direction;
  carousel.scrollTo(scrollAmount, 0);
}

let slideInterval = setInterval(slideTestimonials, 24);
carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
carousel.addEventListener('mouseleave', () => {
  slideInterval = setInterval(slideTestimonials, 24);
});

// FAQ toggle functionality
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    // Collapse all others
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.classList.remove('expanded');
    });
    document.querySelectorAll('.faq-answer').forEach(answer => {
      answer.classList.remove('expanded');
      answer.hidden = true;
    });
    // Toggle current
    if (!expanded) {
      button.setAttribute('aria-expanded', 'true');
      button.classList.add('expanded');
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      answer.classList.add('expanded');
      answer.hidden = false;
    }
  });
});

// Modal contact form
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openModalBtn');
const closeBtn = document.getElementById('closeModal');

modal.classList.add('modal-hidden');

openBtn.addEventListener('click', () => {
  modal.classList.remove('modal-hidden');
  modal.classList.add('modal-visible');
  document.body.style.overflow = 'hidden';
  modal.focus();
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('modal-visible');
  modal.classList.add('modal-hidden');
  document.body.style.overflow = '';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('modal-visible')) {
    modal.classList.remove('modal-visible');
    modal.classList.add('modal-hidden');
    document.body.style.overflow = '';
    openBtn.focus();
  }
});
