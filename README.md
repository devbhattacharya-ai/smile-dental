# Smile Dental Clinic — concept demo

Self-initiated concept demo for a bilingual dental clinic site (Kharghar / Navi Mumbai). **Not a live clinic.**

Built as a portfolio “Open live” P0 demo: treatment discovery, EN + मराठी for hero/nav/CTA, and a guided **Book a visit** enquiry with fake success — no live calendar, no payments, **no studio WhatsApp**.

## Stack

- Next.js App Router + TypeScript
- CSS (no heavy UI libs)
- Hero / preview asset: `public/demo-smile-dental.jpg`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Concept notes

- Primary CTA: **Book a visit** → `#book`
- Enquiry form → fake success “Enquiry received — concept demo” (`aria-live="polite"`)
- Phone `90221 17458` in utility bar is **concept contact** (from screenshot), not verified live
- **No** `wa.me/917738400373` (studio WhatsApp) anywhere
- Footer + chip: “Self-initiated concept demo. Not a live clinic.”
- Language: EN default; toggle or `?lang=mr` for Marathi on **hero, nav, primary CTA** (and matching chrome). Treatments/reviews body stay EN for P0.

## Anchors

`#top` · `#care` · `#treatments` · `#clinic` · `#reviews` · `#book`

## A11y (P0)

- Skip link → `#main`
- `html[lang]` updates with language (`en` / `mr`)
- Visible `:focus-visible` rings
- Controls ≥44px tap targets
- Form fields have associated `<label>`s
- Book success uses `role="status"` + `aria-live="polite"`
- Language toggle is keyboard-accessible buttons with `aria-pressed`
