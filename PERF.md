# Registro de optimización (rendimiento)

> Medido desde el momento en que se marcó la **interfaz visual como completa** hasta la fecha de este documento.
> Fecha: 2026-08-07 · Repo: `metalico-astro`

## Reducción de peso — imágenes (~4.85 MB)

| Cambio | Antes (KB) | Después (KB) | Ahorro (KB) |
|--------|-----------|--------------|-------------|
| Purga de 5 `.avif` huérfanos | 1,254 | 0 | −1,254 |
| Galería: 8 `F-GALLERY` PNG → AVIF | 2,766 | 365 | −2,401 |
| `team.avif` | 862 | 142 | −720 |
| `bg-steel-black.avif` | 294 | 179 | −115 |
| Logos cliente (TrenMaya, Axtel, Telmex) | 382 | 22 | −360 |
| **Subtotal imágenes** | | | **−4,850** |

## Reducción CSS / fuentes

| Cambio | Antes | Después | Ahorro |
|--------|-------|---------|--------|
| CSS compartido (`Layout.*.css`) | 183 KB | 37 KB | −146 KB |

Las 4 fuentes Gotham salieron de base64 y ahora se sirven en `public/fonts/*.woff2`.

## Optimización móvil (responsive + CLS + woff2) — commit `34369e0`

Ahorro de carga en **dispositivos móviles** (el desktop mantiene las imágenes a calidad completa vía `srcset`).

### Imágenes con `srcset` (variante ligera solo para móvil)

| Imagen | Antes (KB) | Después móvil (KB) | Ahorro móvil (KB) |
|--------|-----------|-------------------|-------------------|
| `home.avif` → `home-mobile.avif` | 191.4 | 22.7 | −168.7 |
| `bg-steel-black.avif` → `bg-steel-black-mobile.avif` | 179.2 | 17.0 | −162.2 |

- Uso: `srcset="/home-mobile.avif 480w, /home.avif 1760w" sizes="100vw"` (idem con `bg-steel-black` 1920w).

### Productos redimensionados (900×900 → 480×480)

| Imagen | Antes (KB) | Después (KB) | Ahorro (KB) |
|--------|-----------|--------------|-------------|
| `products/grapa.avif` | 25.4 | 12.3 | −13.1 |
| `products/polea.avif` | 18.3 | 9.3 | −9.0 |
| `products/soporte.avif` | 20.5 | 11.2 | −9.3 |
| `products/portabobinas.avif` | 9.8 | 5.3 | −4.5 |

### CLS — `width`/`height` añadidos

- Badges de pago (`visa`, `mastercard`, `amex`, `mercadopago`, `paypal`, `spei`, `paquetexpress`, `estafeta`).
- Logo `logo_metalico.avif` (header + páginas `servicios`/`nosotros`).
- Imagen animación (`contact-video-el`, `LOGO-SINFO.webp`).

### Fuentes → `.woff2`

| Fuente | `.woff` (KB) | `.woff2` (KB) | Ahorro |
|--------|-------------|---------------|--------|
| gotham-light | 26.5 | 20.6 | 22% |
| gotham-regular | 27.3 | 21.2 | 22% |
| gotham-medium | 27.9 | 21.7 | 22% |
| gotham-bold | 28.0 | 21.7 | 23% |

- `@font-face` actualizados a `.woff2`; `.woff` eliminados (huérfanos).

### Resultado

- Lighthouse: **100** en Performance/Accesibilidad/SEO por escritorio; **98 → 100** móvil tras este commit. Reporte médico por Francisco de Imagen delivery (−232 KiB) y cadena crítica LCP de 585 ms (recortada con woff2).

## Estado actual de `public/`

- Total: **5.7 MB** (50 archivos).
- **`LOGO-SINFO.webp` = 3.9 MB (67%)** → excluido por decisión (efecto no preservable al optimizar).
- Resto ya en AVIF/ligero.
- Nota: `monograma-metalico.png` (277 KB) es una **adición on-demand** (favicon/maestro), no afecta peso inicial.

## Pendientes / próximos

- (Opcional) Subir resolución de galería (≥1200 px) para nitidez en lightbox.
- (Opcional) `astro check`: 106 errores TS preexistentes (no bloquean CI).