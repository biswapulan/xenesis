# XENESIS 4.0

Website for XENESIS 4.0, the three-day departmental tech fest of the Department of Computer Science and Engineering, Government College of Engineering, Keonjhar.

Static site: no build step, no dependencies. Everything is in `index.html`.

## Run locally

```bash
python3 -m http.server 4173
```

Open http://127.0.0.1:4173/

## Deploy on Vercel

Push this folder to a GitHub repo, then in Vercel: Add New Project, import the repo, set Framework Preset to "Other", leave Build Command and Output Directory empty, and Deploy.

## Editing content

All text lives in `index.html`. Search for the section ids: `#hero`, `#gate` (about), `#pathways` (three days), `#lessons` (itinerary), `#eternity` (closing) and the `<footer>`.

## Credit

Design base: "Kage" by MengTo (https://github.com/MengTo/kage). Three.js is MIT licensed.
