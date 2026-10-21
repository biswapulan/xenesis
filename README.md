# XENESIS: hold-to-ignite teaser
Department of CSE, Government College of Engineering, Keonjhar


## X Games update (Zen Roads X, NEW highlight, HIT badge, Coming Soon)
- **Zen Roads X** added in the same format as Dino x Samurai: `games/zen-roads-x/play.html` + `media/` (banner, poster, 11 screenshots, thumbnails, gameplay mp4/webm) and an entry in `games-data.js`.
- **NEW highlight:** give a game `"new": true` in `games-data.js`. Each visitor sees it glow with a NEW ribbon for their first 5 visits (`XEN_CONFIG.newTimes`), and it stops as soon as they play it. Remove the flag when the game is no longer new. Tracking lives in the visitor's own browser (`games-track.js`).
- **Golden HIT badge:** every play page loads `games-track.js` (`data-game="<id>"`), which sends an anonymous visitor id to the Apps Script. The most-played game (ties all win) with at least `XEN_CONFIG.hitMin` different players (default 25) gets the badge on the list and detail pages. `"hit": true` on a game forces it by hand. **Paste the new `backend/Code.gs` into Apps Script and redeploy as a New version**; it creates a `GamePlays` tab by itself. Until then no badge appears (nothing breaks).
- **Coming Soon page:** `coming-soon.html`, fed by `XEN_SOON` in `games-data.js`. New games' play pages must include the two script tags shown in `games/zen-roads-x/play.html` right after `<body>`.

- **Zen Roads X vehicles:** the small cars (Coupe, Hatch) were replaced by a new **Sports Car** and a **Bike** (drawn in `games/zen-roads-x/play.html`: `carSport`, `carBike`). The bike has handlebars in Hood and Cockpit view. The other six vehicles are unchanged.

## Updates
- **Fix: "Could not reach the server" although the data was saved.** If the browser blocks Apps Script's reply, `register.html` now looks the registration up (by event, entry type, email and mobile, last 20 min) via a new `lookup` GET endpoint in `backend/Code.gs` and shows the normal success screen. **Redeploy the Apps Script as a New version.**
- **IPL Auction pricing:** now two team-size options on the registration page: **1 to 3 players = ₹99**, **full team of 4 = ₹149** (entry types `small` / `full`). Updated `events-data.js`, `events-details.js` and `backend/Code.gs`. **Redeploy the Apps Script as a New version.**
- **Latest:** KBC is now a quiz (the word "Hackathon" is removed): name is "KBC — Kon Banega Coder". Prompt Wars is replaced by **Tech Escape Room** (id `tech-escape-room`, solo only, 7 mini-tasks). Updated `events-data.js`, `events-details.js` and `backend/Code.gs`. **Redeploy the Apps Script as a New version.** Fee for Tech Escape Room is currently ₹49 per person (change in both `events-data.js` and `Code.gs` if needed).
- Tech events renamed/rewritten: Robo Drift -> Robo Drift Hackathon; KBC -> KBC — Kon Banega Coder — Coding and Software Development Hackathon; Prompt Wars -> MATLAB/Simulink-based Hackathon (ids unchanged). **Redeploy the Apps Script** (new version) so names match.
- **Final events list (15 events)**: Tech = Robo Drift Hackathon, WordLord, Codemon, KBC (Coding and Software Development Hackathon), MATLAB/Simulink-based Hackathon. Non-Tech = Battle Verse (Free Fire & BGMI), One Piece Campus Treasure Hunt, Perfect Partner, Dumb Charades, Memography, Ad-Mad, IPL Auction, Chess, Reels x Render, The Xen-Z Show. Edit them in `events-data.js` (+ `events-details.js` for the detail pages).
- Events can now have entry types (`modes` in `events-data.js`): Xen-Z Show (Solo ₹49 / Group ₹99) and Battle Verse (choose Free Fire or BGMI). The register page shows the choice on the Participants step.
- `backend/Code.gs`: new event list + `modes`, and a new last column **Entry Type**. Keep its `EVENTS` table in sync with `events-data.js`. **Redeploy the Apps Script** (Deploy → Manage deployments → Edit → New version).
- Events updated to the latest list: added Ad-Mad, IPL Auction and Chess; removed Tech Painting and Photography; prizes updated per event.
- Event date, time and venue are shown as "Via WhatsApp & Email" and participants are told they will be notified on WhatsApp (registered mobile) and by email.
- `backend/Code.gs`: EVENTS synced with `events-data.js` (receipt email unchanged). **Redeploy the Apps Script** (Deploy → Manage deployments → Edit → New version) for this to take effect.
- Optional: set `LOGO_URL` in `Code.gs` to the public URL of `assets/xenesis-logo.png` to show the logo in emails.
- When final details are ready, edit `XEN_INFO` in `events-details.js`.

- Help Desk: `help.html` loads Tawk.to (Property `6abec161e8a3f43445b5fe6b`, Widget `1k3si6pvq`) only on that page. A circular Help button (`.helpfab`, in `shared.js` and `index.html`) links to it. Registration `ENDPOINT` is set in `register.html`.

- Payments are verified manually and confirmed on WhatsApp. `Code.gs` now only emails a registration receipt (with the Registration ID); the sheet menu just marks Verified/Rejected and sends no email.

## Latest update
- Perfect Partner fee is now ₹69. Dumb Charades and Memography prizes are 1st ₹400 · 2nd ₹300. Short Film Making removed (events-data.js, events-details.js, Code.gs, help FAQ).
- Contact emails added to the footers and Help Desk: support/queries `info@xenesis.tech`, sponsorships `sponsorships@xenesis.tech`.
- `backend/Code.gs` changed (Perfect Partner fee, Short Film removed): paste into Apps Script and **redeploy** (Deploy → Manage deployments → Edit → New version).
- IPL Auction: fee ₹149, team of 4, prizes 1st ₹800 · 2nd ₹400, new description. `backend/Code.gs` changed again: paste and **redeploy as a New version**.

## X Games update (Branch Battle)
- **Branch Battle** added in the same format as the other games: `games/branch-battle/play.html` + `media/` (banner, poster, 12 screenshots + thumbnails, gameplay mp4/webm) and an entry in `games-data.js` (`"new": true`).
- Opens with the Xenesis intro, then the game. Leaderboard and attempt limits use the existing Supabase project (publishable key is in `play.html`; Edge Functions `start-game` / `finish-game` and RPC `get_branch_battle_leaderboard` must exist).
- Fixes: signal cards were stretched and clipped (now compact and kept inside the arena); the card label no longer reveals CSE vs decoy; the old "Demo only" footnote was replaced.
- Screenshots and video were recorded with a mocked backend, so the leaderboard names in them are sample data.

## Zen Roads X: 14 realistic worlds
- Every world is its own natural place with its own scenery, so nothing mixes between worlds: Samurai Hills (farms, pines), Coastal Cliffs (sea, guard rail, lighthouse), Bamboo Grove, Alpine Pass (spruce, river, guard rail), Desert Canyon (mesas, buttes, cactus), Scottish Highlands (sheep, stone walls, crofts), Lavender Fields (rows, stone cottages, cypress), Xenesis Moon, Kyoto Blossom Road (blossoms, machiya houses), Tokyo City Drive (buildings along both sides, street lamps, vending machines, Tokyo Tower), Nikko Autumn (maples, cedar, stream), Lake Country (lake, birch, reeds, cabin), Festival Village (houses, stalls, lanterns), Wisteria Garden Road (wisteria pergolas).
- Shrine gates and pagodas only appear in Japanese-style worlds.
- New engine features in `games/zen-roads-x/play.html`: water beside the road (sea, lake, stream), guard rails, house and building sprites, mesa mountains. World data is `LOCS`.
- Fixed: share codes for worlds 10-14 failed to load (parser only accepted one digit).


- **Zen Roads X vehicles:** the Cat Bus was replaced by a **Tractor** (`carTractor`). At dusk and night its tail lamps, roof work lights and amber beacon switch on and headlight beams light the road ahead.

- **Zen Roads X:** Bamboo Grove is now much denser (extra rows of bamboo). New 15th world **Sakura Forest**: a dense, calm forest of realistic cherry trees only, petal-strewn ground, falling petals, benches and stone lanterns.

- **Zen Roads X:** new 16th world **Matsuri Festival**: repeating sections of red gate tunnels, lantern-string streets with stalls and houses, and shrine grounds with banners. At night fireworks burst across the sky with boom and crackle sounds (`drawFireworks`, `auBoom`). Reduced-motion users get fewer bursts and no flash.

## Zen Roads X: consistent worlds (latest)
- Worlds reduced from 16 to 13: Kyoto Blossom Road (too close to Sakura Forest), Festival Village (same as Matsuri Festival) and Wisteria Garden Road were removed. Old share codes that pointed past those slots now open a different world.
- Each world now has one ecosystem, so scenes no longer mix tree types: Samurai Hills (broadleaf), Coastal Cliffs (windswept Japanese pines), Bamboo Grove, Alpine Pass (spruce), Desert Canyon (saguaro, Joshua trees, boulders, tumbleweed; the pyramid-like buttes were removed), Scottish Highlands (treeless moor), Lavender Fields (cypress), Xenesis Moon (Japanese pines), Nikko Autumn (maples only), Lake Country (birch only), Sakura Forest (cherry only).
- Vehicles are drawn about 1.6x larger so they read at the right size against trees, houses and gates.
- **Zen Roads X media refreshed:** 13 new screenshots and thumbnails (one per world), a new banner (Matsuri Festival fireworks), poster (Sakura Forest) and a 30-second gameplay video (MP4 and WebM) cycling through all 13 worlds. Recorded from the current build with a fixed clock for smooth frames.

## Zen Roads X: latest gameplay changes
- Changing the location now switches instantly (no slow blend); the default world is **Xenesis Moon** at night (new storage key `zenroadsx4`, so everyone gets the new default once).
- Xenesis Moon has a new shaded, sphere-lit blood moon with the ringed tomoe pattern from the reference image (`mkMoon`).
- Vehicle lights (tail lamps and soft road-lighting headlights) switch on automatically in night, dusk, fog and rain. Tractor lamps, work lights and beacon are much dimmer.
- Intro only: *There Is a Light That Never Goes Out* (The Smiths, trimmed to 14 s, `media/intro-song.mp3`) plays through the radio during the intro and stops when the player clicks or the intro ends. It is not part of the in-game radio. Make sure you have the rights to use it publicly.
- Fog haze was reduced in several worlds and glowing particles were softened for clearer views. Screenshots, banner and video were re-recorded.
