# Circuit & Signal — PCB Designer Portfolio (Angular 16)

A single-page portfolio for a PCB designer: Dashboard (photo + objective),
Experience (company history, projects, academics), and Contact (email,
WhatsApp, phone, message form). Styled with Angular Material and a custom
"PCB" design system, with a procedurally-built, slowly rotating 3D PCB board
rendered in Three.js as the page background — no external 3D model files
needed.

## 1. Prerequisites

- Node.js 18.x (Angular 16 supports Node 16.14+ / 18.10+)
- npm 9+

Check versions:
```bash
node -v
npm -v
```

## 2. Create the project (if starting from scratch)

If you're copying these files into a fresh workspace instead of using the
provided folder directly, scaffold it first:
```bash
npm install -g @angular/cli@16
ng new pcb-portfolio --routing --style=scss --skip-install
cd pcb-portfolio
```
Then copy this project's `src/`, `angular.json`, `package.json`, and
`tsconfig*.json` over the generated ones.

## 3. Install dependencies

From the project root (where `package.json` lives):
```bash
npm install
```

This installs Angular 16, Angular Material 16, Angular CDK, and Three.js
(plus `@types/three`) as declared in `package.json`.

### If you didn't use `ng add` for Material

The Material modules used here (`MatToolbarModule`, `MatButtonModule`,
`MatIconModule`, `MatCardModule`, `MatChipsModule`, `MatFormFieldModule`,
`MatInputModule`, `MatSnackBarModule`, etc.) are already imported in
`src/app/app.module.ts`. If you want the Material CLI schematic instead of
manual install:
```bash
ng add @angular/material
```
Choose a prebuilt theme (e.g. Deep Purple/Amber — it's overridden by the
custom PCB palette in `src/styles.scss` anyway), and say yes to Angular
animations and typography styles.

### Three.js

Already listed in `package.json`. If installing manually into an existing
project:
```bash
npm install three @types/three
```

## 4. Run it

```bash
npm start
```
Visit `http://localhost:4200`.

## 5. Add your photo

Drop a headshot at:
```
src/assets/images/profile.jpg
```
It's referenced by `photoUrl` in `src/app/pages/dashboard/dashboard.component.ts`.
Until you add one, the dashboard shows a styled fallback placeholder.

## 6. Update your details

All content is plain TypeScript data in the components — no CMS needed:

| What to edit | File |
|---|---|
| Name, title, objective, skills, stats | `src/app/pages/dashboard/dashboard.component.ts` |
| Company history, projects, academics | `src/app/pages/experience/experience.component.ts` |
| Email, WhatsApp number, phone, location | `src/app/pages/contact/contact.component.ts` |
| Site colors / fonts (design tokens) | `src/styles.scss` |
| 3D PCB board look (traces, chips, vias) | `src/app/components/pcb-background/pcb-background.component.ts` |

The WhatsApp link uses the `wa.me` deep link format — update
`whatsappDigits` (country code + number, digits only, no `+` or spaces).

The contact form currently just shows a snackbar confirmation. To actually
send messages, wire `onSubmit()` in `contact.component.ts` to a backend
endpoint or a service like Formspree/EmailJS.

## 7. Build for production

```bash
ng build
```
Output goes to `dist/pcb-portfolio/`, ready to deploy to any static host
(Netlify, Vercel, GitHub Pages, S3, etc.).

## Folder structure

```
pcb-portfolio/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── README.md
└── src/
    ├── index.html
    ├── main.ts
    ├── styles.scss                     # global PCB design tokens
    ├── assets/
    │   └── images/
    │       └── profile.jpg             # ← add your photo here
    └── app/
        ├── app.module.ts               # Material + app-wide imports
        ├── app-routing.module.ts       # 3 routes: /, /experience, /contact
        ├── app.component.ts/html/scss  # shell: background + navbar + outlet
        ├── models/
        │   └── profile.model.ts        # shared TS interfaces
        ├── components/
        │   ├── navbar/                 # top nav, Material toolbar
        │   │   ├── navbar.component.ts
        │   │   ├── navbar.component.html
        │   │   └── navbar.component.scss
        │   └── pcb-background/         # fixed 3D PCB board (Three.js)
        │       ├── pcb-background.component.ts
        │       ├── pcb-background.component.html
        │       └── pcb-background.component.scss
        └── pages/
            ├── dashboard/               # home: photo + objective + skills
            │   ├── dashboard.component.ts
            │   ├── dashboard.component.html
            │   └── dashboard.component.scss
            ├── experience/              # company history + academics
            │   ├── experience.component.ts
            │   ├── experience.component.html
            │   └── experience.component.scss
            └── contact/                 # email, WhatsApp, phone, form
                ├── contact.component.ts
                ├── contact.component.html
                └── contact.component.scss
```

## Component generation reference (if extending)

If you add more pages/components later with the Angular CLI, this is the
pattern used throughout this project:
```bash
ng generate component pages/awards --module=app
ng generate component components/testimonials --module=app
```
`--module=app` registers the new component in `AppModule` automatically
(this project uses `NgModule`-based declarations rather than standalone
components, to stay aligned with a default Angular 16 CLI project).

## Design notes

The visual system ("Circuit & Signal") is intentionally built around actual
PCB vocabulary rather than generic portfolio styling:
- **Palette** — solder-mask green substrate, exposed-copper orange, gold via
  highlights, silkscreen off-white text.
- **Type** — `Space Mono` for headings/labels (reads like schematic
  reference designators), `Inter` for body copy, `JetBrains Mono` for
  data/captions.
- **Section labels** use real reference-designator style tags (`U1`, `R1`,
  `Q1`...) since the content genuinely maps to board components — profile,
  resistor = skills, quartz = academics, etc.
- **Signature element** — the fixed-background 3D PCB board (Three.js),
  built from primitives (board slab, copper traces, gold vias, IC chips,
  resistors), slowly rotating with subtle mouse-parallax tilt. Respects
  `prefers-reduced-motion`.
