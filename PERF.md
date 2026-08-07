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

Las 4 fuentes Gotham salieron de base64 a `public/fonts/*.woff` (~110 KB) y ahora se cachean por separado.

## Estado actual de `public/`

- Total: **5.7 MB** (50 archivos).
- **`LOGO-SINFO.webp` = 3.9 MB (67%)** → excluido por decisión (efecto no preservable al optimizar).
- Resto ya en AVIF/ligero.
- Nota: `monograma-metalico.png` (277 KB) es una **adición on-demand** (favicon/maestro), no afecta peso inicial.

## Pendientes / próximos

- (Opcional) Convertir fuentes a `.woff2` (misma vía) para mayor ahorro si se consiguen licenciadas.
- (Opcional) Subir resolución de galería (≥1200 px) para nitidez en lightbox.
- (Opcional) `astro check`: 106 errores TS preexistentes (no bloquean CI).