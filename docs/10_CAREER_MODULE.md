# MnsWorld — Career Module

## Role

Career is a personal career command center inside MnsWorld.

It should transform the provided roadmap into a visual, interactive system.

## Source of Truth

Initial content is preserved in:

`sources/career-original.md`

The provided roadmap includes:
- Australia as the first target country
- AI/ML Engineer as primary role
- AI Software Engineer / Machine Learning Engineer / Mobile AI Engineer as secondary roles
- React Native Developer as backup
- software-to-AI/ML transition
- AI/ML learning roadmap
- portfolio strengthening
- GitHub
- resume
- LinkedIn
- Australian job search
- interview preparation
- sponsorship/visa planning
- money
- city strategy
- travel
- arrival preparation

## UI

### Header
- Career
- current direction
- overall progress visualization

### Career Identity
- primary role
- secondary roles
- backup role
- core strengths

### Roadmap Timeline

Render these phases:
1. identity
2. IELTS
3. education
4. professional experience
5. AI/ML transition
6. portfolio
7. GitHub
8. resume
9. LinkedIn
10. Australian job search
11. sponsorship/visa
12. money
13. city strategy
14. travel
15. arrival

### Phase Cards

Each phase supports:
- title
- status
- checklist
- notes
- expand/collapse

## Status

Use:
- Done
- Active
- Planned
- Paused

Do not invent precise percentages without real data.

## Data Boundary

Keep content outside UI components:

```text
src/data/career/roadmap.ts
src/modules/career/components/
```

## Future Career Extensions

- job tracker
- applications
- interview log
- skill matrix
- portfolio evidence
- CV versions
- company shortlist

These should be separate submodules.
