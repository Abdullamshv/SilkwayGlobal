---
trigger: always_on
---

# Strict Instruction: Responsive Design & UI Cleanup

## Objective
Fix the lack of responsiveness and UI artifacts on the website.

## Mandatory Rules
1. **Mobile-First Approach**: 
   - All classes must start with mobile styles. Use `md:`, `lg:`, `xl:` ONLY for scaling up.
   - Prohibited: Fixed widths like `w-[1200px]` or `w-[500px]` on main containers.
   - Required: Use `w-full`, `max-w-7xl`, `mx-auto`, and `px-4` for consistent padding.

2. **Logo & Background Fixes**:
   - Location: `src/components/articles/Articles.jsx` and Footer.
   - If an image has a white background (IELTS, TOEFL):
     - Apply `mix-blend-mode: multiply` if the container background is light.
     - Preferred: Request/Generate a transparent PNG/SVG.
   - Hero Illustration (`main_page_image.svg`):
     - Ensure it scales using `max-w-full h-auto`.
     - Remove any hardcoded `left/top` absolute positioning that breaks on smaller screens. Use `relative` or `flex` centering.

3. **Grid & Flex Layouts**:
   - For lists (Programs, Team, WhyUs):
     - Use `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` instead of fixed flex-wrap with manual widths.
     - Gap must be consistent: `gap-6` or `gap-8`.

## Implementation Checklist
- [ ] Replace all fixed `px` widths with responsive Tailwind classes.
- [ ] Check `NavBar`: Ensure it collapses into a burger menu on mobile.
- [ ] Check `HeroSection`: Image must not overlap text on mobile.
- [ ] Verify `mix-blend-multiply` on logos with artifacts.