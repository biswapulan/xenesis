/* Single source of truth for every event. Used by events, event & register pages.
   fee:null => "to be announced" (registration disabled). unit: what the fee is charged per.
   modes: optional entry types (e.g. Solo / Group, or which game). Each mode has its own min/max/fee.
          When modes exist, e.min/e.max/e.fee are only the display defaults; the chosen mode decides the real values.
   feeText / format: optional display overrides for events with modes.
   Keep backend/Code.gs EVENTS in sync with this file (id, name, min, max, fee, modes). */
const XEN_EVENTS=[
/* ---------- TECH ---------- */
{id:"robo-drift",type:"tech",jp:"走行",name:"Robo Drift",min:1,max:4,fee:50,unit:"team",format:"Team",
 prize:"1st ₹1,000 · Runner-up ₹500 · Memento + Merit Certificates",
 summary:"Pilot remote-controlled rovers along high-friction obstacle tracks, testing acceleration, turning control and drift precision under strict clock constraints."},
{id:"wordlord",type:"tech",jp:"速打",name:"WordLord — The Typing Battle",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A rapid 15–30 second typing sprint judged on raw WPM, accuracy and zero error tolerance. No AI, no external tools, just keyboard speed."},
{id:"codemon",type:"tech",jp:"開発",name:"Codemon — Build Under Pressure",min:2,max:4,fee:199,unit:"team",duration:"3 hours",
 prize:"1st ₹1,000 · Runner-up ₹500 · Memento + Merit Certificates",
 summary:"A rapid full-stack sprint on React.js, Next.js and modern web frameworks. AI agents are allowed, but you must defend your architecture, debug live and answer viva questions."},
{id:"kbc",type:"tech",jp:"知識",name:"KBC — Kon Banega Coder",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹1,000 · 2nd ₹500 · 3rd Memento + Certificate",
 summary:"Rapid-fire MCQs on Python, C, C++, Java and JavaScript: runtime outputs, tricky syntax quirks, OOP principles and memory management logic."},
{id:"prompt-wars",type:"tech",jp:"呪文",name:"Prompt Wars",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹1,000 · Runner-up ₹500 · Merit Certificates",
 summary:"A competitive generative AI challenge testing prompt engineering, creative problem-solving and output optimization under tight prompt and time limits."},
/* ---------- NON-TECH ---------- */
{id:"xen-z-show",type:"non-tech",jp:"舞台",name:"The Xen-Z Show",min:1,max:10,fee:49,unit:"entry",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 format:"Solo / Group",feeText:"₹49 solo · ₹99 group",modeLabel:"Registering as",
 modes:[{id:"solo",label:"Solo",min:1,max:1,fee:49,unit:"person"},{id:"group",label:"Group",min:2,max:10,fee:99,unit:"group"}],
 summary:"An open-stage platform for dance routines, stand-up comedy, music, beatboxing, mimicry and stage variety acts."},
{id:"battle-verse",type:"non-tech",jp:"戦場",name:"Battle Verse — Free Fire & BGMI",group:"Gaming Arena",min:4,max:4,fee:99,unit:"squad",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 format:"Squad of 4",feeText:"₹99 / squad",modeLabel:"Choose your game",
 modes:[{id:"free-fire",label:"Free Fire",min:4,max:4,fee:99,unit:"squad"},{id:"bgmi",label:"BGMI",min:4,max:4,fee:99,unit:"squad"}],
 summary:"High-stakes mobile esports battle royale testing squad synergy, strategic drop choices, gun skill and rotational timing. Pick Free Fire or BGMI."},
{id:"one-piece",type:"non-tech",jp:"宝探",name:"One Piece — Campus Treasure Hunt",min:2,max:4,fee:99,unit:"team",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A campus-wide cryptic treasure hunt. Decode encrypted clues and scan hidden QR waypoints against the clock while avoiding penalty zones."},
{id:"perfect-partner",type:"non-tech",jp:"相棒",name:"Perfect Partner",min:2,max:2,fee:80,unit:"team",format:"Duo",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"Timed synergy tests, non-verbal coordination rounds and rapid synchronization tasks designed to test duo intuition. 2 boys, 2 girls or 1 boy + 1 girl."},
{id:"dumb-charades",type:"non-tech",jp:"無言",name:"Dumb Charades — Silent Signal",min:2,max:4,fee:49,unit:"team",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A gesture-only challenge. Convey technical terms, viral memes and cinema titles without speaking or lip-syncing."},
{id:"memography",type:"non-tech",jp:"記憶",name:"Memography — The Memory Arc",min:1,max:1,fee:29,unit:"person",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"20 rapid image slides, 2 seconds each. Recall minute visual details, chronological order and anomalies."},
{id:"ad-mad",type:"non-tech",jp:"広告",name:"Ad-Mad",min:1,max:4,fee:49,unit:"entry",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 format:"Solo or Team of 2–4",
 summary:"A live marketing pitch and humorous skit. Market quirky, unexpected products on the spot with taglines, jingles and brand pitches."},
{id:"ipl-auction",type:"non-tech",jp:"競売",name:"IPL Auction",min:2,max:3,fee:99,unit:"team",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A simulated cricket auction. Manage a fixed virtual budget, win the paddle wars and assemble a balanced playing XI under tactical constraints."},
{id:"chess",type:"non-tech",jp:"盤上",name:"Chess — The Grandmaster Gambit",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A fast-paced rapid/blitz tournament testing board awareness, tactical openings, endgame strategy and time management."},
{id:"short-film",type:"non-tech",jp:"映画",name:"Short Film Making — The Final Cut",min:1,max:5,fee:99,unit:"entry",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 format:"Solo / Team",feeText:"₹99",modeLabel:"Registering as",
 modes:[{id:"solo",label:"Solo",min:1,max:1,fee:99,unit:"person"},{id:"team",label:"Team",min:2,max:5,fee:99,unit:"team"}],
 summary:"Capture the spirit, student competition and vibe of the fest in a short, edited cinematic film judged on narrative flow, color grading and audio design."},
{id:"reels",type:"non-tech",jp:"動画",name:"Reels x Render",min:1,max:1,fee:29,unit:"person",
 prize:"1st ₹600 · 2nd ₹300 · 3rd Memento + Certificate",
 summary:"A vertical 9:16 content creation sprint. Film, edit, beat-match and deliver high-energy social reels documenting the festival."}
];
const XEN_UPI={qr:"assets/payment-qr.jpeg"};
const xenTeam=e=>e.format||(e.min===1&&e.max===1?"Solo":e.min===e.max?`${e.min} players`:`${e.min}–${e.max} players`);
const xenFee=e=>e.fee==null?"Fee TBA":e.feeText||`₹${e.fee}${e.unit==="person"?"":" / "+e.unit}`;
