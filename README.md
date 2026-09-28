# XENESIS: hold-to-ignite teaser
Department of CSE, Government College of Engineering, Keonjhar

## Run
    npm install
    npm run dev      # http://localhost:3000

## Test on a phone
Motion sensors need HTTPS. Easiest: deploy to Vercel, or run a tunnel
(e.g. `npx localtunnel --port 3000`) and open the https link on your phone.

## Edit
- `lib/config.js`: name, 4.0 edition, Date/Venue/Events (change "Coming soon" when final), WhatsApp link, footer text
- `components/XenesisTeaser.jsx`: the whole experience (hold, physics, chrome)
  - `HOLD_MS`: how long the hold takes
  - `CHROME`: the reflection colours
