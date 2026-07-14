# Trojan Hood — Landing

Landing page (estática) para **Trojan Hood**, el bot de Telegram auto-custodial estilo Trojan
para operar tokens de **Robinhood Chain** desde el chat.

Bot en vivo: [@Trojan_Hood_bot](https://t.me/Trojan_Hood_bot)

## Estructura

```
index.html          Página completa (una sola vista, secciones ancladas)
styles.css          Paleta suave (marfil/salvia/durazno), tipografía Bricolage Grotesque
                     + Public Sans + JetBrains Mono, responsive PC + móvil
assets/
  logo.jpg          Logo del proyecto (también usado como favicon)
  main.js           Fondo interactivo (canvas), reveal on scroll, tilt, botones magnéticos,
                     copiado de la CA
```

## Fondo interactivo

El fondo (`assets/main.js` + `#field` canvas) es un campo de partículas suaves:

- Las partículas derivan lentamente y se conectan con líneas finas cuando están cerca.
- **Reaccionan al mouse**: se apartan suavemente del cursor al pasar cerca.
- **Reaccionan al click**: cada click (y el botón de copiar CA) dispara una pequeña explosión
  de partículas en el punto exacto.
- Debajo del canvas hay tres manchas de gradiente (menta/durazno/lila) que dan profundidad.
- Respeta `prefers-reduced-motion`: si el usuario lo pide, se dibuja un frame estático y no
  hay animación.
- Las tarjetas (`.tilt`) inclinan levemente siguiendo el cursor y los botones principales
  (`.magnetic`) se desplazan hacia él — micro-interacciones, no solo scroll-reveal.

## Ver / publicar

Es 100% estático — se abre con doble clic en `index.html` o se publica en cualquier hosting
estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No requiere build ni servidor.

## Aviso

El trading de cripto conlleva riesgo; esto no es asesoría financiera. Trojan Hood es
auto-custodial: cada usuario es responsable de sus propias claves. No afiliado a
Robinhood Markets, Inc.
