import { services, doctors, testimonials } from './data.js';

const serviceGrid = document.querySelector('#services-grid');
serviceGrid.innerHTML = services.map((service, i) => `<article class="service-card"><div class="service-top"><span class="service-icon ${service.color}">${service.icon}</span><span class="service-number">0${i + 1}</span></div><h3>${service.name}</h3><p>${service.desc}</p><a href="#appointment" aria-label="Book ${service.name}">↗</a></article>`).join('');

document.querySelector('#doctors-grid').innerHTML = doctors.map((doctor, i) => `<article class="doctor-card"><div class="doctor-photo"><img loading="lazy" src="https://images.unsplash.com/${doctor.image}?w=700&h=760&fit=crop&crop=faces" alt="Portrait of ${doctor.name}"><span class="availability ${i === 1 ? 'later' : ''}"><i></i>${doctor.availability}</span></div><div class="doctor-info"><div><h3>${doctor.name}</h3><span class="doctor-specialty">${doctor.specialty}</span></div><p>${doctor.qualification}</p><a class="doctor-book" href="#appointment">Book a visit <span>↗</span></a></div></article>`).join('');
const select = document.querySelector('[name="department"]');
[...new Set([...services.map(s => s.name), ...doctors.map(d => d.name)])].forEach(name => select.add(new Option(name, name)));

let quoteIndex = 0;
function showQuote() {
  const item = testimonials[quoteIndex];
  document.querySelector('#quote-text').textContent = item.quote;
  document.querySelector('#quote-name').textContent = item.name;
  document.querySelector('#quote-detail').textContent = item.detail;
  document.querySelector('#quote-count').textContent = `${String(quoteIndex + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}`;
}
document.querySelector('#prev-quote').addEventListener('click', () => { quoteIndex = (quoteIndex + testimonials.length - 1) % testimonials.length; showQuote(); });
document.querySelector('#next-quote').addEventListener('click', () => { quoteIndex = (quoteIndex + 1) % testimonials.length; showQuote(); });
showQuote();

const form = document.querySelector('#appointment-form');
const dateInput = form.elements.date;
const localToday = new Date();
dateInput.min = new Date(localToday.getTime() - localToday.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const patient = form.elements.name.value.trim();
  const feedback = form.querySelector('.form-feedback');
  feedback.textContent = `Thank you, ${patient}! Your request has been noted. Our team will call you shortly to confirm your appointment.`;
  feedback.classList.add('show');
  form.reset();
  dateInput.min = new Date().toISOString().slice(0, 10);
});

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); document.body.classList.remove('menu-open');
}));
document.querySelector('#year').textContent = new Date().getFullYear();
