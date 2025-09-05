// Año dinámico en footer
document.getElementById('year')?.remove(); // ensure id doesn't exist
const copyEl = document.querySelector('.copy');
if (copyEl) {
  const span = document.createElement('span');
  span.id = 'year';
  span.textContent = new Date().getFullYear();
  copyEl.insertBefore(span, copyEl.firstChild);
}

// Menú móvil simple
const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
burger?.addEventListener('click', () => {
  menu?.classList.toggle('open');
  if (menu?.classList.contains('open')) {
    menu.style.display = 'flex';
    menu.style.flexDirection = 'column';
    menu.style.gap = '10px';
    menu.style.background = '#121233';
    menu.style.position = 'absolute';
    menu.style.top = '56px';
    menu.style.right = '20px';
    menu.style.padding = '12px';
    menu.style.border = '1px solid #2a2a66';
    menu.style.borderRadius = '12px';
  } else {
    menu.removeAttribute('style');
  }
});

// Animaciones al hacer scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Contadores animados
function animateCount(el){
  const target = Number(el.dataset.count || 0);
  let current = 0;
  const duration = 1200;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start)/duration, 1);
    current = Math.floor(target * p);
    el.textContent = current.toString();
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target.toString();
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('.stat').forEach(animateCount);

// Carrusel testimonios
const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.t-card'));
let index = 0;
function updateCarousel(){
  if(!track) return;
  track.style.transform = `translateX(-${index * 100}%)`;
}
document.querySelector('.carousel-btn.next')?.addEventListener('click', ()=>{
  index = (index + 1) % slides.length; updateCarousel();
});
document.querySelector('.carousel-btn.prev')?.addEventListener('click', ()=>{
  index = (index - 1 + slides.length) % slides.length; updateCarousel();
});
setInterval(()=>{ index = (index + 1) % slides.length; updateCarousel(); }, 6000);

// Formulario funcional: Formspree (si defines endpoint) + fallback mailto
const FORM_ENDPOINT = ""; // <-- Opcional: pega aquí tu endpoint Formspree, p. ej. "https://formspree.io/f/abcdwxyz"
const form = document.getElementById('contact-form');
const statusEl = document.querySelector('.form-status');

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  // Si hay endpoint de Formspree, usar fetch
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if (res.ok) {
        statusEl.textContent = '¡Gracias! Te responderemos en breve.';
        form.reset();
      } else {
        throw new Error('Error enviando el formulario');
      }
    } catch (err) {
      statusEl.textContent = 'No se pudo enviar. Intenta de nuevo o usa email/WhatsApp.';
    }
    return;
  }

  // Fallback: abrir email con los datos (si no hay endpoint configurado)
  const subject = encodeURIComponent('Nueva consulta desde Brizon Agency');
  const body = encodeURIComponent(
    `Nombre: ${data.nombre}\nEmail: ${data.email}\nTeléfono: ${data.telefono}\n\nMensaje:\n${data.mensaje}`
  );
  window.location.href = `mailto:gersonbrizuela8@gmail.com?subject=${subject}&body=${body}`;
  statusEl.textContent = 'Abriendo tu cliente de correo…';
});
