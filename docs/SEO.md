# SEO de Sol y Vida Care: guía de mantenimiento

## Cómo funciona
- Los textos y metadatos viven en `src/seo/` (`pages.json`, `localPages.json`, `blog.json`).
- `npm run build` ejecuta `vite build` y después `scripts/prerender-seo.mjs`, que genera un HTML por página pública (título, descripción, canonical, Open Graph, Twitter, JSON-LD y contenido visible), `sitemap.xml`, `robots.txt` y `app.html`.
- `app.html` es la plantilla (noindex) que Vercel usa para las rutas privadas de la aplicación (`vercel.json`). Si añades una ruta privada nueva, añádela a la lista de `vercel.json` y, si procede, a los `Disallow` del script.
- Una URL que no sea ninguna de las anteriores devuelve 404 real.

## Pendiente de confirmar por la empresa (NO verificado)
| Tema | Estado actual | Qué hacer |
|---|---|---|
| Zona de cobertura | Solo Torremolinos, Benalmádena, Fuengirola y Mijas. Málaga capital NO se atiende y su página se ha eliminado (devuelve 404) | Ninguna. Si se amplía la cobertura, añadir la página en `localPages.json` |
| Barrios y núcleos por municipio | Retirados del texto visible. Guardados en `zonesToReview` | Confirmar cuáles se atienden y moverlos a `zones` |
| WhatsApp del 626 406 477 | Botón existente conservado | Confirmar que el número tiene WhatsApp activo |
| Blog (6 artículos) | `published: false` | Revisar textos, poner `published: true` y ajustar las fechas (están programadas desde 2026-11-17) |

## Google Analytics 4
1. Crea una cuenta y una propiedad GA4 en https://analytics.google.com y un flujo de datos web para `https://www.solyvidacare.com`.
2. Copia el ID de medición (formato `G-XXXXXXXXXX`).
3. En Vercel: Settings → Environment Variables → `VITE_GA_MEASUREMENT_ID` = tu ID. Vuelve a desplegar.
4. El banner de cookies mostrará entonces la opción de analítica. GA solo se carga si la persona la acepta; si la retira, se desactiva.
5. Eventos enviados: `phone_click`, `whatsapp_click` y `contact_form_submit` (con el parámetro `location` cuando aplica).
6. En GA4: Administrar → Eventos → marca como **evento clave** `phone_click`, `whatsapp_click` y `contact_form_submit`.
7. Comprueba en Informes → Tiempo real (aceptando cookies de analítica) que llegan los eventos.

Nota: los eventos solo se registran de personas que aceptan analítica, así que las cifras serán inferiores al tráfico real.

## Google Search Console
1. https://search.google.com/search-console → Añadir propiedad → **Dominio** → `solyvidacare.com`.
2. Añade el registro TXT que te indica Google en el DNS del dominio. Espera y pulsa Verificar.
3. Sitemaps → envía `https://www.solyvidacare.com/sitemap.xml`.
4. Inspección de URL: solicita indexación de la home y de las 4 páginas locales publicadas.
5. Revisa cada semana Rendimiento (consultas, páginas, clics) y Páginas (indexación).

## Perfil de empresa de Google (Google Business Profile)
1. https://business.google.com → crea el perfil con el nombre real, la dirección de Paseo del Colorado, 7 (Torremolinos), el teléfono y la web.
2. Elige la categoría principal que mejor describa el servicio (p. ej. servicio de atención a domicilio / cuidado de personas mayores).
3. Completa la verificación que pida Google (postal, teléfono o vídeo).
4. Añade los servicios reales, fotos reales y las zonas de servicio que confirmes. No inventes horarios.
5. Pide reseñas reales a familias satisfechas con un enlace directo. No publiques reseñas en la web hasta tenerlas reales.

## Mejoras propuestas para los artículos del blog
- Añadir en cada artículo un enlace a `/services` y a la página local más relacionada, y una llamada a la acción final (teléfono, WhatsApp y formulario).
- Ajustar los títulos a búsquedas reales: «¿Cuándo necesita ayuda en casa una persona mayor?», «cómo elegir una empresa de ayuda a domicilio», «qué es el respiro familiar».
- Añadir un resumen inicial de 2-3 líneas y subtítulos H2 en forma de pregunta.
- Mantener el aviso de que no sustituyen a la atención sanitaria. Revisar las menciones laborales y de Seguridad Social con un profesional (gestoría) antes de publicar.
- Añadir fecha de actualización y autoría real (persona o equipo de la empresa) una vez revisados.

## Plan de 90 días (sin inversión publicitaria)
- **Días 1-15:** verificar Search Console y enviar sitemap; crear y verificar el perfil de empresa; confirmar WhatsApp y zonas; conectar GA4.
- **Días 16-30:** revisar y publicar 2 artículos (necesita ayuda en casa; respiro familiar); pedir las primeras reseñas reales; subir fotos reales al perfil.
- **Días 31-60:** publicar 2 artículos más (elegir servicio; contratar cuidador); conseguir enlaces locales (ayuntamientos, asociaciones de mayores y directorios que acepten la empresa); responder todas las reseñas.
- **Días 61-90:** publicar los 2 artículos restantes; revisar en Search Console qué consultas dan impresiones y reforzar esas páginas; publicar las páginas de zona confirmadas; revisar eventos de conversión en GA4.
