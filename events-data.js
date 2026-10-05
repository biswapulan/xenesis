/* Single source of truth for every event. Used by events, event & register pages.
   fee:null => "to be announced" (registration disabled). unit: what the fee is charged per.
   modes: optional entry types (e.g. Solo / Group, or which game). Each mode has its own min/max/fee.
          When modes exist, e.min/e.max/e.fee are only the display defaults; the chosen mode decides the real values.
   feeText / format: optional display overrides for events with modes.
   Keep backend/Code.gs EVENTS in sync with this file (id, name, min, max, fee, modes). */
const XEN_EVENTS=[
/* ---------- TECH ---------- */
{id:"robo-drift",type:"tech",jp:"走行",name:"Robo Drift",min:1,max:4,fee:50,unit:"team",format:"Team",
 prize:"1st ₹1,000 · 2nd ₹500 · Memento + Merit Certificates",
 summary:"Pilot remote-controlled rovers along high-friction obstacle tracks. Acute speed and turning control decide the winner."},
{id:"wordlord",type:"tech",jp:"速打",name:"WordLord — The Typing Battle",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹1,000 · 2nd ₹500 · 3rd Memento + Certificate",
 summary:"Type fast. Type accurately. A 15–30 second sprint judged on WPM, accuracy and zero error tolerance. No AI, no shortcuts."},
{id:"codemon",type:"tech",jp:"開発",name:"CodeMon — Build Under Pressure",min:2,max:4,fee:199,unit:"team",duration:"3 hours",prize:"",
 summary:"Build a real solution in 3 hours. AI agents are allowed, but you must understand, modify and defend every line in a viva."},
{id:"kbc",type:"tech",jp:"知識",name:"KBC — Kon Banega Coder",min:1,max:1,fee:49,unit:"person",
 prize:"1st ₹1,000 · 2nd ₹500 · 3rd Memento + Certificate",
 summary:"Choose your blade: Python, C, C++, Java or JavaScript. 10–20 rapid MCQs to prove your mastery."},
{id:"prompt-wars",type:"tech",jp:"呪文",name:"Prompt Wars",min:1,max:1,fee:49,unit:"person",prize:"",
 summary:"A competitive AI prompting challenge testing creativity, problem-solving and prompt engineering under constraints."},
/* ---------- NON-TECH ---------- */
{id:"xen-z-show",type:"non-tech",jp:"舞台",name:"The Xen-Z Show",min:1,max:10,fee:49,unit:"entry",prize:"",
 format:"Solo / Group",feeText:"₹49 solo · ₹99 group",modeLabel:"Registering as",
 modes:[{id:"solo",label:"Solo",min:1,max:1,fee:49,unit:"person"},{id:"group",label:"Group",min:2,max:10,fee:99,unit:"group"}],
 summary:"The ultimate open stage for Gen-Z talent: stand-up comedy, mimicry, music, acoustic jams, open mic and crowd-captivating acts."},
{id:"battle-verse",type:"non-tech",jp:"戦場",name:"Battle Verse — Free Fire & BGMI",group:"Gaming Arena",min:4,max:4,fee:99,unit:"squad",prize:"",
 format:"Squad of 4",feeText:"₹99 / squad",modeLabel:"Choose your game",
 modes:[{id:"free-fire",label:"Free Fire",min:4,max:4,fee:99,unit:"squad"},{id:"bgmi",label:"BGMI",min:4,max:4,fee:99,unit:"squad"}],
 summary:"Free Fire and BGMI squad battles testing map awareness, squad synergy, tactics and survival. Pick your game."},
{id:"one-piece",type:"non-tech",jp:"宝探",name:"One Piece — Treasure Hunt",min:2,max:4,fee:99,unit:"team",prize:"",
 summary:"Technology + logic + campus knowledge + teamwork. Decode encrypted QR clues hidden across campus and race the clock."},
{id:"perfect-partner",type:"non-tech",jp:"相棒",name:"Perfect Partner",min:2,max:2,fee:80,unit:"team",format:"Duo",prize:"",
 summary:"Non-verbal communication, coordinated mini-challenges and shared intuition under timed pressure."},
{id:"dumb-charades",type:"non-tech",jp:"無言",name:"Dumb Charades — Silent Signal",min:2,max:4,fee:49,unit:"team",prize:"",
 summary:"No words allowed! Act out technical terms, pop culture and cinematic clues using only gestures and expressions."},
{id:"memography",type:"non-tech",jp:"記憶",name:"Memography — The Memory Arc",min:1,max:1,fee:29,unit:"person",prize:"",
 summary:"20 images, 2 seconds per slide. Test your visual memory under pressure and reproduce the sequence and details."},
{id:"tech-painting",type:"non-tech",jp:"絵画",name:"Tech Painting — Visual Horizons",min:1,max:1,fee:29,unit:"person",prize:"",
 summary:"Phones down. Creativity begins. Paint original physical artwork on Cyberpunk Samurai or futuristic technology themes."},
{id:"short-film",type:"non-tech",jp:"映画",name:"Short Film Making — The Final Cut",min:1,max:5,fee:99,unit:"entry",prize:"",
 format:"Solo / Team",feeText:"₹99",modeLabel:"Registering as",
 modes:[{id:"solo",label:"Solo",min:1,max:1,fee:99,unit:"person"},{id:"team",label:"Team",min:2,max:5,fee:99,unit:"team"}],
 summary:"Capture the atmosphere of XENESIS 4.0, from student battles to campus backdrops and raw festival adrenaline, in a cinematic piece."},
{id:"reels",type:"non-tech",jp:"動画",name:"Reels x Render (Xenesis Reels)",min:1,max:1,fee:29,unit:"person",prize:"",
 summary:"Shoot, edit and deliver dynamic, high-engagement vertical video capturing campus energy, creative cuts and fest vibes."},
{id:"photography",type:"non-tech",jp:"写真",name:"Xenesis Photography",min:1,max:1,fee:29,unit:"person",prize:"",
 summary:"Document vivid festival moments through lens craft, composition and dynamic lighting. Judged on storytelling and framing."}
];
const XEN_UPI={qr:"assets/payment-qr.jpeg"};
const xenTeam=e=>e.format||(e.min===1&&e.max===1?"Solo":e.min===e.max?`${e.min} players`:`${e.min}–${e.max} players`);
const xenFee=e=>e.fee==null?"Fee TBA":e.feeText||`₹${e.fee}${e.unit==="person"?"":" / "+e.unit}`;
