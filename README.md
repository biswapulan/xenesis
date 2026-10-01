# XENESIS: hold-to-ignite teaser
Department of CSE, Government College of Engineering, Keonjhar


## Updates
- Photography Challenge fee set to ₹29 (per person); registration is now open for it.
- Event date, time and venue are shown as "Via WhatsApp & Email" and participants are told they will be notified on WhatsApp (registered mobile) and by email.
- `backend/Code.gs`: Photography enabled (fee 29), emails mention WhatsApp/email notification. **Redeploy the Apps Script** (Deploy → Manage deployments → Edit → New version) for this to take effect.
- Optional: set `LOGO_URL` in `Code.gs` to the public URL of `assets/xenesis-logo.png` to show the logo in emails.
- When final details are ready, edit `XEN_INFO` in `events-details.js`.

- Help Desk: `help.html` loads Tawk.to (Property `6abec161e8a3f43445b5fe6b`, Widget `1k3si6pvq`) only on that page. A circular Help button (`.helpfab`, in `shared.js` and `index.html`) links to it. Registration `ENDPOINT` is set in `register.html`.
