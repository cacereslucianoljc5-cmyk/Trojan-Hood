# Trojan Hood — Landing

Landing page (estática) para **Trojan Hood**, el bot de Telegram auto-custodial estilo Trojan
para operar tokens de **Robinhood Chain** desde el chat.

Bot en vivo: [@Trojan_Hood_bot](https://t.me/Trojan_Hood_bot)

## Estructura

```
index.html          Página completa (una sola vista, secciones ancladas)
styles.css          Estilos neón (verde/cian sobre negro), responsive PC + móvil
assets/
  logo.jpg          Logo del proyecto (también usado como favicon)
  background.mp4    Video de fondo en bucle
```

## Fondo en bucle

El fondo es un `<video autoplay muted loop playsinline>`:

- **En bucle** infinito (`loop`).
- **Sin botón de play ni controles** — arranca solo, en silencio (`autoplay muted`,
  `playsinline` para iOS, controles nativos ocultos por CSS).
- **Cubre PC y móvil** con `object-fit: cover` (no se deforma).
- **Carga rápida**: video liviano + un fondo neón animado por CSS que se ve al instante y
  sirve de respaldo si el video todavía no cargó o el navegador bloquea el autoplay.
- Un velo oscuro (`.bg-scrim`) y los paneles con `backdrop-filter` garantizan que el
  **texto nunca se mezcle con el fondo**.

### Reemplazar el video

Dejá tu archivo en `assets/background.mp4` (mismo nombre) y listo. Para máxima compatibilidad
podés agregar también un `assets/background.webm` y sumar la fuente en `index.html`:

```html
<source src="assets/background.webm" type="video/webm" />
<source src="assets/background.mp4" type="video/mp4" />
```

## Ver / publicar

Es 100% estático — se abre con doble clic en `index.html` o se publica en cualquier hosting
estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No requiere build ni servidor.

## Aviso

El trading de cripto conlleva riesgo; esto no es asesoría financiera. Trojan Hood es
auto-custodial: cada usuario es responsable de sus propias claves. No afiliado a
Robinhood Markets, Inc.
