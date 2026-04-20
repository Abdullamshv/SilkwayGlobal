---
trigger: always_on
---

# Strict Instruction: Media & Performance Optimization

## Objective
Resolve performance issues related to unoptimized country illustrations and assets.

## Mandatory Rules
1. **Image Formats**:
   - All JPG/PNG over 200KB must be converted to `.webp`.
   - Update imports in components to point to new optimized assets.

2. **Lazy Loading**:
   - Add `loading="lazy"` to all images below the first fold (Programs, Testimonials, Articles).
   - Add `decoding="async"` to improve rendering performance.

3. **Hero Image Optimization**:
   - The main landing image must NOT be lazy-loaded. 
   - Add `fetchpriority="high"` to the Hero image.

4. **Aspect Ratios**:
   - All program cards must have uniform image sizes.
   - Use `aspect-video` or `aspect-[4/3]` with `object-cover` to prevent distortion.

## Technical Actions
- [ ] Install `vite-plugin-image-optimizer` if not present.
- [ ] Wrap images in `<picture>` tags where multi-format support is needed.
- [ ] Set explicit `width` and `height` attributes to prevent Layout Shift (CLS).