# MnsWorld — Product Requirements Document

## Vision

MnsWorld is a personal web operating system. The user opens it and immediately sees a visual representation of their current world: who they are, what time it is, what matters, and what they can do next.

## First-Run Experience

1. Welcome screen.
2. Ask for name.
3. Ask preferred language.
4. Ask theme: System / Light / Dark.
5. Save locally.
6. Enter MnsWorld home.

Do not ask for unnecessary personal information.

## Home Requirements

Show:
- MnsWorld branding
- user name
- live time
- date
- world-style visual scene
- module portals
- settings
- theme switcher
- language switcher

Main routes:
- `/`
- `/bored`
- `/career`
- `/focus`
- `/settings`

## Personalization

Persist:
- name
- language
- theme
- recently used module
- focus preferences
- optional activity history

## Privacy

MVP is local-first. No personal data should leave the device unless a future sync feature is explicitly enabled.

## Responsive Behavior

Desktop: immersive world + multi-column portals.  
Tablet: reduced density + touch-first controls.  
Mobile: full-screen modules + compact navigation + lighter visual effects.

## Accessibility

- semantic HTML
- keyboard navigation
- visible focus states
- reduced-motion support
- sufficient contrast
- touch-friendly controls
- do not rely on color alone

## Performance

- minimize client JavaScript
- server-render static content where useful
- lazy-load non-critical features
- avoid continuous decorative animation
- optimize fonts/images
- keep glass effects bounded

## Error States

Every module needs:
- empty state
- recoverable error state
- no blank screens

## Future Compatibility

New modules must plug into the shell without rewriting the application.
