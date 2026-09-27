# MnsWorld — Master Implementation Prompt

You are the principal engineer and UI/UX engineer responsible for implementing **MnsWorld**, a personal web OS.

This prompt is the current implementation authority. Existing MnsWorld project documents remain useful for design language, data modeling, and supplied source content, but **the module structure and scope below take precedence wherever they conflict with older documents**.

## 1. PRODUCT VISION

MnsWorld is a **personal web OS**, not a normal productivity dashboard.

The user should feel:

> "I opened my own digital world."

The product combines:
- personal identity
- career direction
- goals
- focus
- entertainment
- useful external websites
- learning/reference access
- tools
- future extensibility

The interface should feel like a premium personal operating system with a strong visual identity.

Do NOT turn it into a dense admin dashboard.

## 2. CURRENT INFORMATION ARCHITECTURE

```text
MnsWorld
│
├── 🌍 World
│
├── 💼 Career
│   ├── Productivity
│   ├── Focus
│   ├── Career roadmap
│   ├── Learning
│   └── Career execution
│
├── 🎯 Life Goals
│   ├── Goals
│   ├── Habits
│   ├── Personal life
│   └── Long-term direction
│
├── 🎮 Enjoy
│   ├── I'm Bored
│   ├── Random ideas
│   ├── Movies
│   ├── Shows
│   ├── Music
│   └── Other entertainment shortcuts
│
├── 🌐 Web Hub
│   ├── Travel
│   ├── Projects
│   ├── Developer
│   └── Everyday Tools
│
├── 📚 Library
│   ├── Reading
│   ├── Books
│   ├── Research
│   └── Learning resources
│
└── ⚙️ Settings
```

Keep the top-level navigation small. Internal features should use sections/tabs rather than creating dozens of top-level pages.

## 3. NATIVE MODULES VS EXTERNAL LINKS

### Native MnsWorld modules

Actually build:
- World
- Career
- Life Goals
- Enjoy / I'm Bored
- Settings
- onboarding
- global navigation/search
- local personal data

### External Website Hub

For:
- Travel
- Project services
- Developer resources/tools
- Everyday utility websites
- external media
- reading/reference websites

**Do NOT rebuild these services.**

Only create beautiful categorized launcher cards/buttons that open external websites.

Do not:
- clone external services
- scrape their content
- proxy them
- iframe them unless a service explicitly provides a safe embed
- pretend they are native MnsWorld functionality

MnsWorld is the launcher.

## 4. WORLD / HOME

Route:
```text
/
```

First-run:
1. Ask user's name.
2. Ask language.
3. Ask theme: System / Light / Dark.
4. Save locally.
5. Enter World.

World screen:
- MnsWorld branding
- name
- live time
- current date
- greeting
- subtle world/environment visual
- module portals
- quick actions
- Focus shortcut
- Career shortcut
- Goals shortcut
- Enjoy shortcut
- Web Hub shortcut
- Library shortcut
- Settings

### World visual concept

```text
background
  ↓
soft light
  ↓
subtle atmosphere
  ↓
world/environment visual
  ↓
floating glass surfaces
  ↓
module portals
```

Start with modern CSS. Do not use WebGL/Three.js just for spectacle.

## 5. CAREER — MERGED SUPER MODULE

The existing Career page remains and becomes the user's **Personal Execution Center**.

Merge the requested productivity + focus + career concepts into this area.

Organize it into clear sections.

### Career Overview
- current professional direction
- primary role
- secondary roles
- backup path
- target country
- key strengths
- current status

### Career Roadmap
Use the supplied career roadmap as baseline content.

Render phases as:
- timeline
- expandable cards
- status
- checklists
- milestones

### Productivity
Lightweight career execution:
- today's priorities
- tasks
- career checklist
- important next action
- active work
- unfinished items

Do not build a massive project-management platform.

### Focus
Include the Focus Now system:
- timer
- 25/5
- 50/10
- custom duration
- start
- pause
- resume
- reset
- session completion
- focus history

Timer correctness must use timestamps, not interval decrementing as the source of truth.

### Learning
Career-focused learning:
- AI/ML roadmap
- topics
- skill status
- resources
- study targets
- learning notes entry point

Do not turn it into a full LMS.

### Career Execution
Include:
- portfolio
- GitHub
- resume
- LinkedIn
- job applications
- interviews
- networking
- sponsorship/visa
- financial preparation
- Australia preparation

Use the supplied career source as the content baseline.

## 6. ENJOY — MERGED WITH I'M BORED

Keep the existing **I'm Bored** functionality.

Preferred route:
```text
/enjoy
```

### I'm Bored
- preserve the supplied 118-activity dataset
- preserve the original random-generation concept
- avoid immediate repeats where possible
- preserve category filtering
- keep content data-driven

### Random enjoyment
Add lightweight random modes:
- Random Activity
- Random Movie
- Random Series
- Random Game
- Random Music
- Random Learning
- Random Adventure
- Random Challenge

These can initially be shortcut generators, not recommendation engines.

### External entertainment shortcuts

Required:
- YouTube
- YouTube Music
- the user-provided third-party media links

Use cards with:
- name
- short description
- external-link indicator

Clearly distinguish MnsWorld features from third-party websites.

User-provided links:
```text
https://fmhy.net/video
https://aethoflix-eight.vercel.app/
https://net77.cc/home
https://bingr.one/
```

YouTube:
```text
https://www.youtube.com/
```

YouTube Music:
```text
https://music.youtube.com/
```

Do not embed these websites inside MnsWorld.

## 7. LIFE GOALS

Use the existing Life Goals concept and merge personal-life functionality here.

Route:
```text
/life-goals
```

Sections:

### Goals
- long-term goals
- yearly goals
- current goals
- milestones

### Personal Life
- life priorities
- personal checklists
- personal milestones

### Habits
Simple recurring habits.

### Life Direction
Visualize:

```text
Long-term
   ↓
Goals
   ↓
Milestones
   ↓
Current actions
```

The page should answer:

> "What am I trying to achieve with my life, and what am I doing about it?"

Keep it local-first. Do not overbuild.

## 8. WEB HUB — EXTERNAL WEBSITES ONLY

Create:
```text
/web-hub
```

This is the Internet section of MnsWorld.

Use a data-driven model:

```ts
interface ExternalResource {
  id: string;
  category: string;
  name: string;
  description: string;
  url: string;
  icon?: string;
  featured?: boolean;
  tags?: string[];
}
```

All external links:
- open in a new tab
- use `noopener noreferrer`
- show external-link icon
- come from editable data files
- are visually consistent

## 9. WEB HUB — TRAVEL

Category:
```text
Travel
```

This is a launcher, not a booking app.

Useful examples:
- Google Travel
- Google Maps
- Rome2Rio
- Skyscanner
- Booking
- TripAdvisor
- official government travel information
- airline websites

Do not build:
- booking
- hotel database
- flight database
- itinerary backend

## 10. WEB HUB — PROJECTS

Category:
```text
Projects
```

External shortcuts can include:
- GitHub
- GitLab
- Vercel
- Netlify
- Render
- Expo
- Firebase
- Supabase
- deployment/project dashboards

Do not recreate these services.

## 11. WEB HUB — DEVELOPER

Category:
```text
Developer
```

External toolbox examples:
- MDN
- DevDocs
- Stack Overflow
- GitHub
- Regex101
- JSON formatter/validator
- JWT tools
- Can I Use
- Postman
- npm
- PyPI
- Docker Hub
- Hugging Face
- Kaggle
- Papers with Code
- Google Colab

Do NOT rebuild these tools unless explicitly requested later.

## 12. WEB HUB — EVERYDAY TOOLS

Category:
```text
Everyday Tools
```

External utility categories:
- conversion
- currency
- timezone
- PDF/file tools
- image tools
- text tools
- QR tools
- calculators
- generators
- compression
- media tools

Do not build a giant native utility suite.

## 13. LIBRARY

Create:
```text
/library
```

Use the supplied FMHY reading page as an external resource source:
```text
https://fmhy.net/reading
```

FMHY currently organizes reading resources into areas such as ebooks, public-domain books, PDF search, ebook readers and related reading tools. Use it as an external directory rather than copying its entire content.

Also add legitimate/open resources such as:
- Project Gutenberg
- Internet Archive
- Open Library
- Standard Ebooks
- Wikisource
- Public Domain Review
- Google Play Books

Organize Library into:
- Books
- Research
- Learning
- Reading Tools
- Public Domain
- Reference

Do not host copyrighted books/files.

## 14. GENERAL FREE-WEB RESOURCE DIRECTORY

Add an external shortcut:

```text
https://fmhy.net/
```

Card:
**Free Web Resource Directory**

Description:
> Explore FMHY's broad collection of free web resources.

MnsWorld must link to FMHY rather than copying or scraping its database.

Do not automatically import or mirror its sections.

## 15. EXTERNAL RESOURCE DATA FILES

Keep external resources out of UI components.

Create files like:

```text
src/data/external-sites/travel.ts
src/data/external-sites/projects.ts
src/data/external-sites/developer.ts
src/data/external-sites/tools.ts
src/data/external-sites/entertainment.ts
src/data/external-sites/library.ts
```

One reusable component should render these resources.

Adding a website later should usually require only editing a data file.

## 16. SETTINGS

Route:
```text
/settings
```

Sections:
- Appearance
- Language
- Personalization
- Accessibility
- Data
- External Links

Support:
- System / Light / Dark
- English / Hindi
- name
- visible modules
- favorite shortcuts
- reduced motion
- export/import local data
- clear data
- add/edit/delete custom external links

## 17. GLOBAL SEARCH

Add a command/search system later, but design architecture for it now.

Shortcut:
```text
⌘K / Ctrl+K
```

Initially search:
- modules
- external resources

Future search:
- goals
- tasks
- career phases
- notes
- activities
- projects
- personal data

## 18. NAVIGATION

Top-level navigation:

```text
World
Career
Life Goals
Enjoy
Web Hub
Library
Settings
```

Do not put every sub-feature in primary navigation.

## 19. VISUAL DESIGN

Direction:

**premium glass + futuristic personal world + restrained monochrome**

Do not clone Apple.

Palette:
- white
- near-white
- black
- near-black
- gray
- cool gray
- transparent glass

Use reusable materials:
```text
glass-subtle
glass
glass-strong
glass-floating
```

World scene:
- gradients
- soft light
- subtle particles
- atmospheric depth
- restrained motion

Avoid neon cyberpunk styling.

## 20. TECHNOLOGY

Use the current compatible stable ecosystem.

Recommended baseline:
- Next.js 16.3.x
- React 19.3.x
- TypeScript
- Tailwind CSS 4.3.x
- shadcn/ui
- Motion for React
- next-intl
- Lucide
- localStorage
- IndexedDB repository abstraction

Before installing packages, check official docs/package registries for the latest compatible patch releases.

Do not replace the stack without a concrete reason.

## 21. ARCHITECTURE

Use a modular monolith:

```text
src/
├── app/
├── components/
├── modules/
│   ├── world/
│   ├── career/
│   ├── goals/
│   ├── enjoy/
│   ├── web-hub/
│   ├── library/
│   └── settings/
├── data/
│   ├── external-sites/
│   ├── career/
│   ├── bored/
│   └── library/
├── lib/
│   ├── storage/
│   ├── i18n/
│   ├── time/
│   └── utils/
├── hooks/
├── types/
└── styles/
```

Do not use microfrontends.

Do not create a backend for MVP.

## 22. LOCAL-FIRST PERSONAL DATA

Persist locally:
- name
- language
- theme
- visible modules
- favorites
- goals
- tasks
- focus settings
- focus sessions
- bored history
- custom external links
- library favorites

Use localStorage for small preferences and IndexedDB for structured collections.

Do not send personal data to a server.

## 23. PRIVACY

Default:
- no login
- no account
- no analytics by default
- no unnecessary requests
- no personal-data transmission
- external sites only receive information when the user chooses to open them

## 24. ACCESSIBILITY

Support:
- keyboard navigation
- focus-visible states
- semantic HTML
- readable text
- strong contrast
- reduced motion
- screen-reader labels
- accessible dialogs
- accessible timer
- touch-friendly controls

Glass must never compromise readability.

## 25. PERFORMANCE

Prioritize:
- fast first render
- small client bundles
- lazy-loading for optional modules
- server components where useful
- minimal global state
- limited backdrop-filter usage
- no unnecessary continuous animation
- optimized assets
- fast-feeling navigation

Mobile must remain fast. Reduce blur, particles, parallax, shadows and animation on weaker devices.

## 26. EXTERNAL LINK RULE

Whenever the requirement says "website/link":

Build:
```text
beautiful MnsWorld card
        ↓
external URL
```

Not:
```text
MnsWorld clone of external service
```

Every external card should:
- show name
- show description
- show external-link icon
- open new tab
- use `noopener noreferrer`
- be editable from a data file

## 27. THIRD-PARTY MEDIA / RESOURCE HANDLING

MnsWorld does not host third-party media/files.

Do not:
- copy copyrighted media
- bypass DRM
- automate downloads
- claim third-party services are owned by MnsWorld
- guarantee the safety, legality, availability or licensing of third-party links

For questionable external services, label them simply as third-party/unverified.

## 28. IMPLEMENTATION ORDER

### Phase 1
```text
App Shell
Theme
i18n
Onboarding
World/Home
Navigation
```

### Phase 2
```text
Career
 ├── roadmap
 ├── productivity
 ├── focus
 └── learning
```

### Phase 3
```text
Life Goals
```

### Phase 4
```text
Enjoy
 ├── I'm Bored
 ├── Random
 └── Entertainment shortcuts
```

### Phase 5
```text
Web Hub
 ├── Travel
 ├── Projects
 ├── Developer
 └── Everyday Tools
```

### Phase 6
```text
Library
```

### Phase 7
```text
Settings
Data export/import
Accessibility polish
Performance polish
PWA
```

Do not build future modules before the current phase is stable.

## 29. AI CODING AGENT RULES

You are an implementation agent, not a brainstorming assistant.

Before coding:
1. inspect the repository
2. read current MnsWorld docs
3. inspect existing implementation
4. identify the smallest correct change
5. implement it
6. run checks
7. fix regressions

Never:
- rewrite working features without reason
- introduce a backend
- add random libraries
- create dozens of pages unnecessarily
- over-engineer
- repeatedly redesign architecture
- build external services that are explicitly requested as links

Keep the code modular, readable, typed and production-oriented.

## 30. QUALITY BAR

MnsWorld should feel:
- premium
- smooth
- fast
- calm
- futuristic
- personal
- useful

It should not feel:
- like a Bootstrap admin panel
- like a generic Notion clone
- like random unrelated cards
- overloaded with colors
- overloaded with blur
- overloaded with animation

## 31. DEFINITION OF DONE

First complete release:
- onboarding works
- name persists
- language persists
- theme persists
- World feels polished
- navigation works
- Career works
- Productivity section works
- Focus works
- Learning section works
- Life Goals works
- I'm Bored works with supplied activities
- Enjoy shortcuts work
- Web Hub works
- Library works
- external websites open correctly
- Settings works
- mobile works
- desktop works
- accessibility basics work
- production build succeeds
- no major console/build errors

## 32. MOST IMPORTANT PRINCIPLE

Do not confuse "personal OS" with "build everything."

The OS feeling comes from:

```text
ONE PERSONAL WORLD
        +
CONNECTED MODULES
        +
EXTERNAL WEB LAUNCHER
        +
LOCAL PERSONAL DATA
        +
CONSISTENT PREMIUM UI
```

Start implementation now.
