// Animación de contadores
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText.replace('%','');

    const increment = target / speed;

    if(count < target) {
      counter.innerText = Math.ceil(count + increment) + '%';
      setTimeout(updateCount, 30);
    } else {
      counter.innerText = target + '%';
    }
  };
  updateCount();
});

// Formulario con Formspree
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if(form){
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      status.innerHTML = "✅ Gracias, tu mensaje fue enviado correctamente.";
      form.reset();
    } else {
      status.innerHTML = "❌ Hubo un problema al enviar el formulario.";
    }
  });
}
