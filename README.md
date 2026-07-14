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
```

## Secciones

Una sola página con anclas: **nav** (sticky con blur), **hero** con mockup de chat de
Telegram, cinta (marquee), **token** con CA copiable de un toque, **How it works** (4
pasos), **Features** (6 cards), **Network** (stats + tech stack sobre Robinhood Chain),
**CTA final** y **footer**.

## Fondo ambiental (100% CSS, sin video)

El fondo se genera por completo con CSS — sin archivos de video ni dependencias:

- **Grid neón** animado con desplazamiento suave y máscara radial.
- **Glows** verde/cian difuminados que derivan lentamente detrás del hero.
- **Velas de trading flotantes** que evocan el logo.
- Ligero *scanline* + grano para textura, en `mix-blend-mode`.
- Todos los paneles usan `backdrop-filter` y bordes con gradiente para que el
  **texto nunca se mezcle con el fondo**.
- Respeta `prefers-reduced-motion` (desactiva animaciones).

## Ver / publicar

Es 100% estático — se abre con doble clic en `index.html` o se publica en cualquier hosting
estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No requiere build ni servidor.

## Aviso

El trading de cripto conlleva riesgo; esto no es asesoría financiera. Trojan Hood es
auto-custodial: cada usuario es responsable de sus propias claves. No afiliado a
Robinhood Markets, Inc.
