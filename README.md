# HAIrexercises.com — README (v1)
**Hair habits. Scalp health. Younger-looking hair — built as a mega website.**  
**Pure HTML / CSS / JavaScript. Fast. Searchable. Trustworthy.**

> **Important:** HairExercises.com provides education and habit guidance for hair/scalp wellness. It is **not medical advice**, does **not diagnose**, and cannot guarantee results. Hair thinning and hair loss can have medical causes (hormonal, autoimmune, nutritional, medication-related, inflammatory, etc.). If you’re concerned about rapid shedding, pain, scalp lesions, or sudden patchy loss, consult a licensed clinician/dermatologist.

This README defines the **mission, guardrails, mega-site architecture, page templates, content rules, and the front-end-only build system** for HairExercises.com.

---

## 0) Core Mission
HairExercises.com is a **massive repository of practical, repeatable habits** to help young men:
- keep hair looking **young, vital, and resilient**
- improve **scalp health**
- reduce avoidable damage and shedding
- **support** the conditions that may slow visible thinning over time (without medical claims)

### The Reframe
**Hair health is a skill.**
Like fitness, it’s built through:
- daily hygiene and technique
- consistent low-risk habits
- scalp environment management
- lifestyle discipline
- patience and tracking

---

## 1) What This Site Is (and Is Not)

### HairExercises.com IS:
- a **habit library** (endless routines, practices, checklists)
- a **hair-type and scalp-type** decision engine (find what fits you)
- a **damage prevention** system (reduce breakage, inflammation triggers, and bad routines)
- a **“early thinning” playbook** focused on low-risk, evidence-informed behaviors
- a mega-site built for **SEO + utility**: thousands of pages, clean IA, internal linking

### HairExercises.com is NOT:
- a promise to “stop balding”
- a replacement for medical evaluation (androgenetic alopecia and other conditions exist)
- a supplement store / miracle cure site
- a place for unsafe DIY treatments (chemical burns, harsh abrasives, unverified essential oil dosing)

**Rule:** We sell **clarity and consistency**, not false certainty.

---

## 2) Brand Voice & Tone
- confident, calm, practical
- “coach-like” without cringe
- zero fear-mongering
- no “alpha bro” energy
- no shaming
- clean, modern, minimal

Copy style:
- short sentences
- actionable bullets
- “Do / Avoid / Why it matters” structure
- simple trackers + routines

---

## 3) The Mega-Site Architecture (Built for Scale)

HairExercises.com scales on **3 axes**:
1) hair type
2) scalp condition
3) goal

### A) Hair Type Hubs (Primary)
Examples:
- `/hair-types/straight/`
- `/hair-types/wavy/`
- `/hair-types/curly/`
- `/hair-types/coily/`
- `/hair-types/thinning/`

Each hub includes:
- best routines by time (5 min / 15 min / weekly)
- wash frequency guidance (with disclaimers)
- styling + friction rules
- product ingredient education (not brand spam)
- internal links to relevant habits

### B) Scalp Type & Scalp Issues Hubs (Secondary)
Examples:
- `/scalp/oily/`
- `/scalp/dry/`
- `/scalp/sensitive/`
- `/scalp/dandruff/`
- `/scalp/itch/`
- `/scalp/inflammation/`

Each page includes:
- “what this might mean” (non-diagnostic)
- safe first-line hygiene practices
- when to seek professional care

### C) Goal Hubs (High-Intent)
Examples:
- `/goals/keep-hair-young/`
- `/goals/reduce-breakage/`
- `/goals/improve-scalp-health/`
- `/goals/early-thinning-support/`
- `/goals/grow-longer-hair/`
- `/goals/post-gym-hair/`
- `/goals/heat-damage-repair/`

### D) The Habit Library (Endless Pages)
Examples:
- `/habits/scalp-massage-5-min/`
- `/habits/shower-technique-low-friction/`
- `/habits/pillowcase-hair-protection/`
- `/habits/sun-and-saltwater-protection/`
- `/habits/shampoo-rotation-basics/`

### E) The “Thinning & Hairline” Track (Careful, Adult)
Examples:
- `/thinning/`
- `/thinning/early-signs/`
- `/thinning/what-you-can-control/`
- `/thinning/scalp-habits/`
- `/thinning/lifestyle-habits/`
- `/thinning/what-to-ask-a-dermatologist/`

Tone requirement:
> “Here’s what’s low-risk and within your control.”  
Not: “This will stop balding.”

---

## 4) Signature IP: The Hair Vitality Score™ (Optional but Powerful)
Every routine and hub can include a simple scoring system to help people choose.

### HairVitalityScore™ (1–100)
Based on:
- friction reduction
- scalp environment support
- consistency feasibility
- evidence alignment (high-level)
- risk level (inverse)
- time cost

Also include:
- **Time Cost:** 1–5
- **Risk Level:** Low / Medium / Avoid
- **Best For:** hair type + scalp type tags

This makes the site feel like a real system, not scattered tips.

---

## 5) Content Safety & Health Claims Policy (Non-Negotiable)

### Allowed
- “may help support scalp health”
- “can reduce breakage and damage”
- “can improve the look/feel of hair over time”
- “may reduce irritation for some people” (with patch-test language)

### Not Allowed
- “100% naturally stop balding”
- “guaranteed regrowth”
- “cure alopecia”
- “reverse hair loss” as a promise
- medical claims about hormones/medications

### Required disclaimers (where relevant)
- “Not medical advice”
- “Results vary”
- “Patch test first”
- “Stop if irritation occurs”
- “Seek professional care if symptoms persist/worsen”

---

## 6) Canonical Page Templates (Standardized)

### A) Hair Type Hub Template
1) One-paragraph overview
2) “Fast start routine” (5-minute baseline)
3) Weekly routine
4) Styling do/don’t
5) Common mistakes
6) Ingredient literacy (what to look for / avoid)
7) Links: scalp types + goal hubs + top habits

### B) Habit Page Template
1) What this habit is (1–2 sentences)
2) Who it’s best for (tags)
3) Step-by-step (bullets)
4) Mistakes to avoid
5) Frequency + timing
6) What to expect (realistic)
7) Safety notes
8) Related habits

### C) Thinning Support Page Template
1) What thinning can be (non-diagnostic)
2) What you can control (habits)
3) What’s worth tracking (photos, shedding notes)
4) “When to seek help” section
5) Questions to ask a clinician
6) Related routines and lifestyle modules

---

## 7) The Mega-Site UX (How Users Find What They Need)
### Core flows
- **Pick your hair type** → get a starter routine
- **Pick your scalp type** → get safe hygiene + calming routine
- **Pick your goal** → get a 30-day program
- **Early thinning** → get a control-first protocol + tracking tools

### Filters (front-end only)
- hair type
- scalp type
- time available (2 / 5 / 10 / 20 minutes)
- risk level
- beginner vs advanced
- budget level (product-minimal options)

---

## 8) SEO Engineering Requirements (Mega-Site)
HairExercises.com wins via:
- clean URL hierarchy
- internal linking between hubs and habits
- fast static delivery (no heavy JS)
- structured data where appropriate (FAQ/HowTo)
- sitemaps at scale

### Must-haves
- `/sitemap.xml` generated from a content index
- canonical tags
- meta title/description templates with uniqueness rules
- schema snippets for FAQs and HowTo pages (where appropriate)
- image alt text templates and compression

---

## 9) Tech Stack (Pure HTML/CSS/JS)
This project is intentionally **framework-light** and ships as a static mega-site.

### Frontend
- HTML for content + semantics
- CSS for layout and design system
- Vanilla JS modules for:
  - filtering/search
  - localStorage-based routines
  - “30-day habit plan” generator
  - lightweight analytics hooks (privacy-first)

### Build Approach (Recommended)
- content stored as **Markdown or JSON**
- a simple build script compiles templates → static HTML pages
- deploy as static output on Vercel

---

## 10) Suggested Repository Structure
```
/
├─ public/                     # static output (optional) / assets
├─ src/
│  ├─ templates/               # HTML templates (header/footer/page shells)
│  ├─ pages/                   # page definitions (per route)
│  ├─ content/                 # markdown/json for hubs/habits
│  ├─ data/                    # tags, taxonomies, indices
│  ├─ css/                     # design system + page CSS
│  └─ js/                      # vanilla modules (filter, search, planner)
├─ scripts/                    # build scripts (generate pages, sitemap)
├─ dist/                       # build output (static site)
└─ README.md
```

---

## 11) Local Development
### Option A — Simple local server
```bash
python -m http.server 8080
```
Then open `http://localhost:8080`.

### Option B — Node static server
```bash
npx serve dist
```

---

## 12) Deployment (Vercel)
- Deploy `dist/` as the Output Directory (or `public/` if you build there)
- Enable clean URLs and caching
- Add redirects for legacy routes if needed

---

## 13) Quality Bar (Definition of Done)
A page ships only if it has:
- clear tags (hair type, scalp type, goal)
- actionable routine steps
- safety notes where relevant
- internal links to 3–8 related pages
- unique title/meta description
- fast load and accessible headings

---

## 14) Editorial Roadmap (High-Leverage)
### Phase 1 — Foundation
- hair types + scalp types hubs
- 100 core habits
- 30-day starter plans by hair type

### Phase 2 — Thinning Support Track
- early signs
- what’s controllable
- tracking tools + question lists for clinicians
- “my routine” planner

### Phase 3 — Depth and Programmatic Scale
- thousands of habit variants by hair type + environment (gym, beach, winter, travel)
- ingredient dictionary (non-salesy)
- myth-busting pages (safe, cited where possible)

---

## 15) Legal & Medical Disclaimer (Sitewide)
HairExercises.com provides general educational information. It does not provide medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional for medical concerns, including hair loss and scalp conditions. Stop use of any practice that causes irritation or pain.

---

## License
Add your license here.
