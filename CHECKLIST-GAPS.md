# Smile Dental — screen-recording checklist (post-fix)

| # | Requirement | Status after this commit |
|---|---|---|
| 1 | Hero dark green + arched chair + floating cards + infinite marquee | Restored — forest hero, arched frame, location/doctor float cards, ALL-CAPS marquee |
| 2 | Alternate dark green / warm beige rhythm | Restored — `band-green` / `band-beige` section bands |
| 3 | Treatment pastel square grid + 2-col All Treatments | Restored — pastel tiles + 2-column list on green band |
| 4 | Clinic staggered photos + subtle parallax | Restored — mosaic + `ClinicParallax` (respects reduced-motion) |
| 5 | Book custom dropdown + date → WhatsApp clinic | Restored — styled select shell + date + clinic WA 9022117458 |
| 6 | FAQ smooth expand | Restored — grid-template-rows accordion + EN/MR |
| 7 | Map + custom Smile pin | Restored — OSM embed + citrus pin with clinic logo |
| 8 | Assistant multi-step Pain→ASAP→details→Prepare WA; Back closes | Restored — multi-step modal |
| 9 | EN/मराठी instant swap nav/headings/FAQ/form | Restored — expanded i18n keys, client-side `LanguageProvider` |
| 10 | Nav scrolls away (NOT sticky); yellow Book; ghost Ask assistant | Restored — relative header; citrus Book; ghost Ask |
| 11 | Editorial type + soft pastels on dark green | Restored — serif headings, pastel cards, citrus CTAs |

Blocked / imperfect vs recording (non-blocking):
- Exact ChatGPT assistant copy/microcopy may differ; flow matches recording structure
- Map is OSM embed + custom pin overlay (not Google Maps JS API)
- Native `<select>` / `<input type="date">` styled as custom dropdown (not fully custom listbox widget)
- No studio WhatsApp anywhere
