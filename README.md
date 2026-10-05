# XENESIS: hold-to-ignite teaser
Department of CSE, Government College of Engineering, Keonjhar


## Updates
- **Final events list (16 events)**: Tech = Robo Drift, WordLord, Codemon, KBC, Prompt Wars. Non-Tech = Battle Verse (Free Fire & BGMI), One Piece Campus Treasure Hunt, Perfect Partner, Dumb Charades, Memography, Ad-Mad, IPL Auction, Chess, Short Film Making, Reels x Render, The Xen-Z Show. Edit them in `events-data.js` (+ `events-details.js` for the detail pages).
- Events can now have entry types (`modes` in `events-data.js`): Xen-Z Show (Solo ₹49 / Group ₹99), Short Film (Solo / Team ₹99) and Battle Verse (choose Free Fire or BGMI). The register page shows the choice on the Participants step.
- `backend/Code.gs`: new event list + `modes`, and a new last column **Entry Type**. Keep its `EVENTS` table in sync with `events-data.js`. **Redeploy the Apps Script** (Deploy → Manage deployments → Edit → New version).
- Events updated to the latest list: added Ad-Mad, IPL Auction and Chess; removed Tech Painting and Photography; prizes updated per event.
- Event date, time and venue are shown as "Via WhatsApp & Email" and participants are told they will be notified on WhatsApp (registered mobile) and by email.
- `backend/Code.gs`: EVENTS synced with `events-data.js` (receipt email unchanged). **Redeploy the Apps Script** (Deploy → Manage deployments → Edit → New version) for this to take effect.
- Optional: set `LOGO_URL` in `Code.gs` to the public URL of `assets/xenesis-logo.png` to show the logo in emails.
- When final details are ready, edit `XEN_INFO` in `events-details.js`.

- Help Desk: `help.html` loads Tawk.to (Property `6abec161e8a3f43445b5fe6b`, Widget `1k3si6pvq`) only on that page. A circular Help button (`.helpfab`, in `shared.js` and `index.html`) links to it. Registration `ENDPOINT` is set in `register.html`.

- Payments are verified manually and confirmed on WhatsApp. `Code.gs` now only emails a registration receipt (with the Registration ID); the sheet menu just marks Verified/Rejected and sends no email.
