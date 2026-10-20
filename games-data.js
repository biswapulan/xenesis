/* X Games catalogue. To add a game: put its files in games/<id>/ (play.html + media/) and add one entry here.
   "new": true   -> the card is highlighted for each visitor (up to XEN_CONFIG.newTimes visits) until they have played it.
                    Remove the flag once the game is no longer new.
   "hit": true   -> force the golden HIT badge by hand (otherwise it is awarded automatically, see XEN_CONFIG). */
window.XEN_CONFIG = {
 /* Google Apps Script web app (same one the registration form uses). Leave "" to run without live play counts. */
 endpoint: "https://script.google.com/macros/s/AKfycbzlSknmnFFnEuV_z8kEGmkzvCYI5YQ22m0XxhioFZgYOrVvgwuGbCJnxpgcjBWn9_7zdQ/exec",
 newTimes: 5,     /* how many visits a NEW game is highlighted for someone who has not played it */
 hitMin: 25,      /* a game needs at least this many different players before it can earn the HIT badge */
 hitTop: 1        /* ...and must be among the N most-played games (1 = only the single most-played; ties all win) */
};
window.XEN_GAMES = [
 {
  "id": "dino-x-samurai",
  "title": "Dino x Samurai",
  "genre": "Arcade Runner",
  "short": "Run, jump and duck through eight Japanese-inspired worlds. Evolve with every coin you collect, unlock a new feature every 100 points and chase the Xenesis X all the way to the moon.",
  "banner": "games/dino-x-samurai/media/banner.jpg",
  "poster": "games/dino-x-samurai/media/poster.jpg",
  "video": "games/dino-x-samurai/media/gameplay.mp4",
  "videoWebm": "games/dino-x-samurai/media/gameplay.webm",
  "play": "games/dino-x-samurai/play.html",
  "developer": "CSE, GCE Keonjhar",
  "publisher": "XENESIS 4.0",
  "platform": "Browser (desktop and mobile)",
  "players": "Single-player",
  "tags": [
   "Arcade",
   "Runner",
   "Pixel Art",
   "Japanese",
   "Endless",
   "Singleplayer"
  ],
  "about": [
   "Dino x Samurai is the Xenesis arcade runner: a pixel dino with a samurai spirit that never stops running. Jump, duck and slash your way through a world that keeps changing around you.",
   "Every 199 points the world transforms, from the plain Classic track to Samurai Dawn, Volcano Shrine, Neon Tokyo, Winter Shrine, Moonlit Ninja, the Great Wave and finally the blood-red Xenesis world."
  ],
  "features": [
   "8 hand-drawn worlds, each with its own sky, own mood.",
   "A new feature unlocks every 100 points: coins and combos, flying enemies, double jump, power-ups, falling fire, close-call bonuses, Samurai Rage, shuriken and hyper speed.",
   "Collect 7 coins to evolve. Each evolution gives your dino a new form, a bigger body and a free shield.",
   "Samurai Rage: collect 15 coins, then slash through everything in your path.",
   "The Xenesis finale: the X appears over the moon and sends you flying in a first-person dive through the clouds.",
   "Plays right in the browser with keyboard or touch. Your best score is saved on your device."
  ],
  "controls": [
   [
    "Space or ↑",
    "Jump (press again in mid-air for a double jump once unlocked)"
   ],
   [
    "↓",
    "Duck"
   ],
   [
    "F",
    "Toggle fullscreen"
   ],
   [
    "Tap the screen",
    "Jump on phones and tablets"
   ]
  ],
  "shots": [
   {
    "src": "games/dino-x-samurai/media/ss01.jpg",
    "thumb": "games/dino-x-samurai/media/t01.jpg",
    "alt": "Classic world"
   },
   {
    "src": "games/dino-x-samurai/media/ss02.jpg",
    "thumb": "games/dino-x-samurai/media/t02.jpg",
    "alt": "Samurai Dawn world"
   },
   {
    "src": "games/dino-x-samurai/media/ss03.jpg",
    "thumb": "games/dino-x-samurai/media/t03.jpg",
    "alt": "Volcano Shrine world"
   },
   {
    "src": "games/dino-x-samurai/media/ss04.jpg",
    "thumb": "games/dino-x-samurai/media/t04.jpg",
    "alt": "Neon Tokyo world"
   },
   {
    "src": "games/dino-x-samurai/media/ss05.jpg",
    "thumb": "games/dino-x-samurai/media/t05.jpg",
    "alt": "Winter Shrine world"
   },
   {
    "src": "games/dino-x-samurai/media/ss06.jpg",
    "thumb": "games/dino-x-samurai/media/t06.jpg",
    "alt": "Moonlit Ninja world"
   },
   {
    "src": "games/dino-x-samurai/media/ss07.jpg",
    "thumb": "games/dino-x-samurai/media/t07.jpg",
    "alt": "Great Wave world"
   },
   {
    "src": "games/dino-x-samurai/media/ss08.jpg",
    "thumb": "games/dino-x-samurai/media/t08.jpg",
    "alt": "Xenesis world"
   },
   {
    "src": "games/dino-x-samurai/media/ss09.jpg",
    "thumb": "games/dino-x-samurai/media/t09.jpg",
    "alt": "The Xenesis X intro"
   },
   {
    "src": "games/dino-x-samurai/media/ss10.jpg",
    "thumb": "games/dino-x-samurai/media/t10.jpg",
    "alt": "Approaching the Xenesis moon"
   },
   {
    "src": "games/dino-x-samurai/media/ss11.jpg",
    "thumb": "games/dino-x-samurai/media/t11.jpg",
    "alt": "The Xenesis X in space"
   }
  ]
 },
 {
  "id": "zen-roads-x",
  "title": "Zen Roads X",
  "genre": "Relaxing Driver",
  "new": true,
  "added": "2026-10-19",
  "short": "A quiet road, always ahead. Cruise endless anime-style roads through eight calm worlds, change the season, the hour and the weather, and play your own radio while you drive. No score, no crashes, no rush.",
  "banner": "games/zen-roads-x/media/banner.jpg",
  "poster": "games/zen-roads-x/media/poster.jpg",
  "video": "games/zen-roads-x/media/gameplay.mp4",
  "videoWebm": "games/zen-roads-x/media/gameplay.webm",
  "play": "games/zen-roads-x/play.html",
  "developer": "CSE, GCE Keonjhar",
  "publisher": "XENESIS 4.0",
  "platform": "Browser (desktop and mobile)",
  "players": "Single-player",
  "tags": [
   "Relaxing",
   "Driving",
   "Anime",
   "Open Road",
   "Chill",
   "Singleplayer"
  ],
  "about": [
   "Zen Roads X is the calm side of the Xenesis arcade: an endless, hand-painted road with nothing to beat and nowhere to be. Steer gently, let the hills roll past and watch the light change.",
   "It opens with the Xenesis intro (the sunset, the torii gate and the spinning X), then drops you onto the road in Samurai Hills. Eight worlds are one key press away, and you can switch on autodrive and simply watch."
  ],
  "features": [
   "13 worlds, each with its own climate and plants: Samurai Hills, Coastal Cliffs, Bamboo Grove, Alpine Pass, Desert Canyon, Scottish Highlands, Lavender Fields, Xenesis Moon, Tokyo City Drive, Nikko Autumn, Lake Country, Sakura Forest and Matsuri Festival with night fireworks.",
   "Make the road your own: 4 road styles, 4 seasons, 4 times of day (dawn, day, dusk, night) and 4 kinds of weather (clear, cloudy, rain, fog).",
   "8 vehicles: a sleek Sports Car, a Bike, a Bus, a School Bus, a Tractor, a Truck, a Tuk-Tuk and a Van, with 4 paint colours and 3 handling styles.",
   "A built-in radio: paste a YouTube or Spotify link, or add songs from your device. It shows the song name, a seek bar and dancing sound bars.",
   "Autodrive, chase, hood and cockpit views, and a world code you can copy and share so a friend drives the same road.",
   "Plays right in the browser with keyboard or touch. No score, no game over."
  ],
  "controls": [
   [
    "A / D or ← / →",
    "Steer"
   ],
   [
    "W / S or ↑ / ↓",
    "Faster / slower"
   ],
   [
    "C",
    "Autodrive on or off"
   ],
   [
    "1 – 8",
    "Jump to a location"
   ],
   [
    "T",
    "Change the time of day"
   ],
   [
    "V",
    "Change the camera view"
   ],
   [
    "P",
    "Open the radio"
   ],
   [
    "H",
    "Hide or show the on-screen text"
   ],
   [
    "M",
    "Sound on or off"
   ],
   [
    "F",
    "Toggle fullscreen"
   ],
   [
    "Touch",
    "Use the on-screen buttons and drag to steer on phones and tablets"
   ]
  ],
  "shots": [
   {
    "src": "games/zen-roads-x/media/ss01.jpg",
    "thumb": "games/zen-roads-x/media/t01.jpg",
    "alt": "Samurai Hills at dawn in spring"
   },
   {
    "src": "games/zen-roads-x/media/ss02.jpg",
    "thumb": "games/zen-roads-x/media/t02.jpg",
    "alt": "Shrine Valley at dusk in autumn"
   },
   {
    "src": "games/zen-roads-x/media/ss03.jpg",
    "thumb": "games/zen-roads-x/media/t03.jpg",
    "alt": "Bamboo Grove in summer rain"
   },
   {
    "src": "games/zen-roads-x/media/ss04.jpg",
    "thumb": "games/zen-roads-x/media/t04.jpg",
    "alt": "Alpine Pass on a cloudy winter day"
   },
   {
    "src": "games/zen-roads-x/media/ss05.jpg",
    "thumb": "games/zen-roads-x/media/t05.jpg",
    "alt": "Golden Dunes at summer dusk"
   },
   {
    "src": "games/zen-roads-x/media/ss06.jpg",
    "thumb": "games/zen-roads-x/media/t06.jpg",
    "alt": "Misty Highlands in autumn fog"
   },
   {
    "src": "games/zen-roads-x/media/ss07.jpg",
    "thumb": "games/zen-roads-x/media/t07.jpg",
    "alt": "Lavender Meadows on a cloudy spring day"
   },
   {
    "src": "games/zen-roads-x/media/ss08.jpg",
    "thumb": "games/zen-roads-x/media/t08.jpg",
    "alt": "Xenesis Moon on a winter night"
   }
  ]
 },
 {
  "id": "branch-battle",
  "title": "Branch Battle",
  "genre": "Reflex Arcade",
  "new": true,
  "added": "2026-10-20",
  "short": "Signals pop up across the arena and you have 60 seconds to tap the CSE ones. Python, SQL, firewalls and neural nets score; lathes, turbines and blast furnaces are decoys. Climb the live Xenesis leaderboard.",
  "banner": "games/branch-battle/media/banner.jpg",
  "poster": "games/branch-battle/media/poster.jpg",
  "video": "games/branch-battle/media/gameplay.mp4",
  "videoWebm": "games/branch-battle/media/gameplay.webm",
  "play": "games/branch-battle/play.html",
  "developer": "CSE, GCE Keonjhar",
  "publisher": "XENESIS 4.0",
  "platform": "Browser (best on mobile)",
  "players": "Single-player, shared leaderboard",
  "tags": [
   "Arcade",
   "Reflex",
   "Quiz",
   "Engineering",
   "Leaderboard",
   "Singleplayer"
  ],
  "about": [
   "Branch Battle is the Xenesis branch-recognition arcade: signals from every engineering branch appear at random spots on the screen, and only the Computer Science ones count. Read fast, tap right, ignore the rest.",
   "It opens with the Xenesis intro, then you enter your name, branch and year. You get two 60-second attempts and your best score goes to the live leaderboard shared by everyone at the fest."
  ],
  "features": [
   "48 signals from CSE, Mechanical, Electrical, Mining, Civil, Metallurgy and Mineral Engineering.",
   "+10 for every CSE signal, a bonus on every 4th in a row, and -5 for tapping a decoy. Missing a signal costs nothing.",
   "Signals move, pulse and vanish, and the pace picks up as the round goes on.",
   "Two attempts per player, checked by the server. Your best score counts.",
   "A live leaderboard with name, branch, year and score.",
   "Plays in the browser with touch or mouse."
  ],
  "controls": [
   [
    "Tap or click a signal",
    "Classify it: tap CSE signals, leave the others"
   ],
   [
    "Streak",
    "Every 4 correct taps in a row earns bonus points"
   ],
   [
    "Wrong tap",
    "A decoy costs 5 points"
   ]
  ],
  "shots": [
   {
    "src": "games/branch-battle/media/ss01.jpg",
    "thumb": "games/branch-battle/media/t01.jpg",
    "alt": "Title screen"
   },
   {
    "src": "games/branch-battle/media/ss02.jpg",
    "thumb": "games/branch-battle/media/t02.jpg",
    "alt": "Intro: sunset over the torii gate"
   },
   {
    "src": "games/branch-battle/media/ss03.jpg",
    "thumb": "games/branch-battle/media/t03.jpg",
    "alt": "Intro: the Xenesis X rises"
   },
   {
    "src": "games/branch-battle/media/ss04.jpg",
    "thumb": "games/branch-battle/media/t04.jpg",
    "alt": "Intro: the X flies at the camera"
   },
   {
    "src": "games/branch-battle/media/ss05.jpg",
    "thumb": "games/branch-battle/media/t05.jpg",
    "alt": "Mission briefing"
   },
   {
    "src": "games/branch-battle/media/ss06.jpg",
    "thumb": "games/branch-battle/media/t06.jpg",
    "alt": "Player sign-up"
   },
   {
    "src": "games/branch-battle/media/ss07.jpg",
    "thumb": "games/branch-battle/media/t07.jpg",
    "alt": "Attempt 1 of 2 ready"
   },
   {
    "src": "games/branch-battle/media/ss08.jpg",
    "thumb": "games/branch-battle/media/t08.jpg",
    "alt": "Signals on the field"
   },
   {
    "src": "games/branch-battle/media/ss09.jpg",
    "thumb": "games/branch-battle/media/t09.jpg",
    "alt": "Streak bonus"
   },
   {
    "src": "games/branch-battle/media/ss10.jpg",
    "thumb": "games/branch-battle/media/t10.jpg",
    "alt": "Decoy tapped for -5"
   },
   {
    "src": "games/branch-battle/media/ss11.jpg",
    "thumb": "games/branch-battle/media/t11.jpg",
    "alt": "Round result"
   },
   {
    "src": "games/branch-battle/media/ss12.jpg",
    "thumb": "games/branch-battle/media/t12.jpg",
    "alt": "Live leaderboard"
   }
  ]
 }
];

/* Coming Soon: shown as teaser cards on the X Games page and listed on coming-soon.html.
   Fields: id, title, genre, text, eta (any short text, e.g. "Next month"), tags[], icon (one emoji or kanji). Add or remove entries freely. */
window.XEN_SOON = [
 {"id":"hill-rush-x","title":"Hill Rush X","genre":"Hill Racing","eta":"Coming soon","icon":"丘","tags":["Racing","Physics","Singleplayer"],"text":"Floor it over rolling hills, grab fuel and coins, and keep the wheels on the ground. A Xenesis hill-climb arcade."},
 {"id":"mystery","title":"Mystery Game","genre":"Secret","eta":"Stay tuned","icon":"?","tags":["Surprise"],"text":"The team is cooking something new for the arcade. We are not telling you what. Yet."}
];
