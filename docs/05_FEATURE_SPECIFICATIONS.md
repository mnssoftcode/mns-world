# MnsWorld — Feature Specifications

## A. World Home

### Purpose
A visual overview of the user's current world.

### Required UI
- dynamic greeting
- user name
- live clock
- date
- module portals
- navigation
- settings

### Clock
- update every second
- use browser timezone
- use Intl/locale-aware formatting
- no unnecessary network requests

### Greeting
Examples:
- Good morning, Manish
- Good afternoon, Manish
- Good evening, Manish

The exact wording must be localizable.

---

## B. I'm Bored

### Purpose
Turn boredom into one concrete next action.

Primary button:
**I'm Bored → Give Me Something**

Card:
- category
- emoji/icon
- activity title
- hint
- item number/count

Filters:
- All
- Learn / Think
- Build / Create
- Physical
- Explore
- Social
- Entertainment
- Creative
- Life Skills
- Adventure
- Career
- Recharge

Behavior:
- random activity
- avoid immediate repeats when possible
- preserve category selection
- animate card replacement
- show count

Future content must stay data-driven.

---

## C. Career

### Purpose
A visual career command center.

Main areas:
- identity
- target country
- target roles
- strengths
- education
- experience
- AI/ML skills
- portfolio
- GitHub
- resume
- LinkedIn
- Australian job search
- interview preparation
- sponsorship/visa
- financial preparation
- travel/arrival

Presentation:
- timeline
- progress cards
- expandable phase details
- status chips

---

## D. Focus Now

### Purpose
Get from opening the page to focusing with minimal decisions.

Modes:
- 25 / 5
- 50 / 10
- custom

Controls:
- Start
- Pause
- Resume
- Reset
- Skip break

Optional:
- label
- sound
- ambient mode
- today's minutes

Timer accuracy must use timestamps rather than decrementing an interval as the source of truth.
