# MnsWorld — UI / UX Design System

## Visual Direction

**Premium + calm + futuristic + personal + minimal.**

The UI can be inspired by modern premium operating systems and spatial interfaces, but should remain its own design.

## Color

Primary palette:
- white
- near-white
- black
- near-black
- cool gray
- neutral gray

Avoid a rainbow UI. Use accents only when they communicate state.

### Dark
- near-black background
- translucent light glass
- near-white text
- gray secondary text

### Light
- white/near-white background
- translucent dark-bordered glass
- near-black text
- dark gray secondary text

## Glass Material

Concept:

```css
background: color-mix(in srgb, var(--surface) 70%, transparent);
backdrop-filter: blur(24px) saturate(140%);
border: 1px solid var(--glass-border);
box-shadow:
  inset 0 1px 0 var(--glass-highlight),
  0 20px 60px rgba(0,0,0,.12);
```

Create multiple material strengths instead of one universal glass class.

## World Scene

Layer:
1. background gradient
2. soft light orbs
3. tiny particles
4. orbital rings
5. central visual/world object
6. floating glass portals

Start with CSS. Add WebGL/Three.js only if the CSS world cannot deliver the intended experience.

## Typography

Prefer system fonts first.

Hierarchy:
- very large display title
- medium headings
- compact metadata
- relaxed body text

## Motion

- micro interaction: ~150–250ms
- module transition: ~250–500ms
- spring motion for focused cards where useful

Do not animate every element continuously.

## Interaction

Every interactive control needs:
- hover
- focus
- pressed state

Do not depend on hover for mobile.

## Reduced Motion

Under `prefers-reduced-motion: reduce`:
- remove floating/parallax effects
- simplify transitions
- preserve functional feedback

## Theme

- System
- Light
- Dark

Prevent theme flash.

## Density

Spacious, calm, not admin-dashboard dense.
