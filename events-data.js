/* Single source of truth for every event. Used by events, event & register pages.
   fee:null => "to be announced" (registration disabled). unit: what the fee is charged per. */
const NT_PRIZE="₹600 · ₹300 · Memento";
const XEN_EVENTS=[
/* ---------- NON-TECH ---------- */
{id:"free-fire",type:"non-tech",jp:"遊戯",name:"Free Fire — Squad Battle",group:"Gaming Arena",min:4,max:4,fee:99,unit:"squad",prize:"Gaming Arena prize structure",
 summary:"Team up with your squad in an intense battle where coordination, strategy and survival skills decide the top spot."},
{id:"bgmi",type:"non-tech",jp:"遊戯",name:"BGMI — Squad Battle",group:"Gaming Arena",min:4,max:4,fee:99,unit:"squad",prize:"Gaming Arena prize structure",
 summary:"Build your strategy, bring your squad and fight for the top position with tactical decisions and combat skill."},
{id:"chess",type:"non-tech",jp:"将棋",name:"Chess — Checkmate Challenge",min:1,max:1,fee:49,unit:"person",prize:NT_PRIZE,
 summary:"A battle of patience and logic. Anticipate your opponent's moves and find the right strategy under pressure."},
{id:"perfect-partner",type:"non-tech",jp:"相棒",name:"Perfect Partner",min:2,max:2,fee:69,unit:"team",prize:NT_PRIZE,
 summary:"How well do you really know your best friend? Match your partner's answers and score for every correct guess."},
{id:"treasure-hunt",type:"non-tech",jp:"宝探",name:"Treasure Hunt — The Ultimate Hunt",min:2,max:4,fee:99,unit:"team",prize:NT_PRIZE,
 summary:"Scan the QR, solve the clue, find the next location. Tech + logic + campus knowledge + teamwork."},
{id:"dumsarash",type:"non-tech",jp:"無言",name:"Dumsarash",min:2,max:4,fee:49,unit:"team",prize:NT_PRIZE,
 summary:"One player acts, the rest guess. No words allowed, only actions, expressions and body language."},
{id:"memography",type:"non-tech",jp:"記憶",name:"Memography — Memory Challenge",min:1,max:1,fee:29,unit:"person",prize:NT_PRIZE,
 summary:"Twenty images, two seconds each. It's not about seeing them. It's about remembering them in order."},
{id:"tech-painting",type:"non-tech",jp:"絵画",name:"Tech Painting",min:1,max:1,fee:29,unit:"person",prize:NT_PRIZE,
 summary:"A theme is announced, phones go down, creativity begins. Paint an original artwork on the spot."},
{id:"short-film",type:"non-tech",jp:"映画",name:"XENESIS Short Film Challenge",min:1,max:1,fee:99,unit:"person",prize:NT_PRIZE,
 summary:"Your camera. Your story. Capture the energy and atmosphere of XENESIS 4.0 in a short cinematic film."},
{id:"story-writing",type:"non-tech",jp:"物語",name:"Story Writing — Words to Worlds",min:1,max:1,fee:29,unit:"person",prize:NT_PRIZE,
 summary:"Given 15–20 words on the day, weave them into a complete and meaningful story. Imagination is your limit."},
{id:"photography",type:"non-tech",jp:"写真",name:"XENESIS Photography Challenge",min:1,max:1,fee:29,unit:"person",prize:NT_PRIZE,
 summary:"See what others don't. Capture a moment worth remembering throughout XENESIS 4.0."},
/* ---------- TECH ---------- */
{id:"robo",type:"tech",jp:"機械",name:"Robo Drift / Robo Soccer",min:1,max:4,fee:50,unit:"team",prize:"₹1,000 · ₹500",
 summary:"Control your robot through a track or face another robot in the arena. Speed, precision and strategy."},
{id:"wordlord",type:"tech",jp:"速打",name:"WordLord — The Typing Battle",min:1,max:1,fee:49,unit:"person",prize:"₹1,000 · ₹500 · Memento",
 summary:"A pure typing-speed challenge. No AI, no shortcuts, just you and your keyboard."},
{id:"codemon",type:"tech",jp:"開発",name:"CodeMon — Build Under Pressure",min:2,max:4,fee:199,unit:"team",prize:"To be announced",duration:"3 hours",
 summary:"Build a real solution in 3 hours. AI agents are allowed, but you must understand and explain your code."},
{id:"kbc",type:"tech",jp:"知識",name:"KBC — Kon Banega Coder",min:1,max:1,fee:49,unit:"person",prize:"₹1,000 · ₹500 · Memento",
 summary:"Pick your language, answer MCQs and step into the coder's hot seat."}
];
const XEN_UPI={qr:"assets/payment-qr.jpeg"};
const xenTeam=e=>e.min===1&&e.max===1?"Solo":e.min===e.max?`${e.min} players`:`${e.min}–${e.max} players`;
const xenFee=e=>e.fee==null?"Fee TBA":`₹${e.fee}${e.unit==="person"?"":" / "+e.unit}`;
