# Brizon Agency — Landing premium

Sitio listo para **GitHub Pages**. Incluye diseño moderno con degradados azul/lila, acentos naranjas sutiles, logo integrado, animaciones, carrusel de testimonios y formulario funcional (Formspree + fallback mailto).

## Publicar en GitHub Pages
1. Crea un repositorio (p. ej. `brizon-agency`).
2. Sube todo el contenido de esta carpeta.
3. En **Settings → Pages**, selecciona `main` y `/root`. Guarda.

## Activar el formulario con Formspree (opcional pero recomendado)
1. Ve a https://formspree.io/ y crea un formulario.
2. Copia la URL del endpoint (formato: `https://formspree.io/f/xxxxxxx`).
3. En `script.js`, pega esa URL en `FORM_ENDPOINT`.
4. ¡Listo! Los envíos llegarán a tu correo. Si no lo configuras, el formulario usa **fallback mailto**.

## Personalizar
- Logo: `assets/logo.png`.
- Colores y estilos: `style.css`.
- Textos y secciones: `index.html`.
