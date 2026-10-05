/* Full event details. Edit freely: each section = {h:heading, p:paragraph, items:[bullets]} */
const XEN_INFO={
 date:"Via WhatsApp & Email",time:"Via WhatsApp & Email",venue:"Via WhatsApp & Email",   /* shared with registered participants; replace with real values once final */
 notice:"Date, time and venue will be notified via WhatsApp and email to the registered mobile number and email ID.",
 coordinators:[/* {name:"Name",phone:"98XXXXXXXX"} */]
};
const XEN_DETAILS={
/* ================= TECH ================= */
"robo-drift":{tag:"Control. Speed. Precision.",sections:[
 {h:"About",p:"Pilot remote-controlled rovers along high-friction obstacle tracks. Robo Drift rewards the driver who combines raw speed with acute turning control, because one wrong line on the track can cost the race."},
 {h:"Basic concept",items:["Robots compete on a designated obstacle track.","Participants control their rovers remotely.","Speed, turning control and clean runs decide the ranking.","Track layout, run format and technical specifications are announced before the event."]},
 {h:"Team",p:"Register as a team. Every member must be listed at registration."},
 {h:"Important",p:"Make sure your robot meets the technical requirements announced by the organizers. Bring spare batteries and basic tools."}]},
"wordlord":{tag:"The Typing Battle",sections:[
 {h:"About",p:"Type fast. Type accurately. WordLord is a 15–30 second typing sprint where only you and your keyboard matter."},
 {h:"Judged on",items:["Words per minute (WPM)","Accuracy percentage","Zero error tolerance"]},
 {h:"Rules",items:["Individual participation.","No AI. No shortcuts. No external help.","Exact test duration and text format are announced on the day.","Organizers' decisions on ties and disputes are final."]},
 {h:"Winner",p:"The participant with the highest valid typing performance takes the top position."}]},
"codemon":{tag:"Build Under Pressure",sections:[
 {h:"About",p:"A 3-hour build challenge for students who want to create something real. Teams receive a development task at the start of the event and must deliver a working solution before time runs out."},
 {h:"AI agents are allowed",p:"Teams may use LLMs and AI code copilots. Generating code is the easy part. The real test is whether you understand it."},
 {h:"Critical criteria",items:["Show complete comprehension of the logic that was generated.","Modify the code on request.","Troubleshoot live bugs.","Defend your architectural choices in a viva."]},
 {h:"Domains",items:["UI/UX","React.js","Next.js","Modern full-stack web development","Real-time problem solving"]},
 {h:"Duration",p:"3 hours. The exact task, technical requirements and judging details are revealed at the start of the event. Bring a charged laptop."}]},
"kbc":{tag:"Choose Your Blade. Prove Your Mastery.",sections:[
 {h:"About",p:"Kon Banega Coder. Pick the language you trust most, then face 10–20 rapid MCQs on its quirks and fundamentals."},
 {h:"Language options",items:["Python","C","C++","Java","JavaScript"]},
 {h:"Questions may cover",items:["Syntax quirks","Runtime and output predictions","OOP concepts","Memory logic","Operators"]},
 {h:"Winner",p:"The participant with the highest valid score takes the top position. Ties may be settled with extra questions."}]},
"prompt-wars":{tag:"Command The Machine",sections:[
 {h:"About",p:"A competitive AI prompting challenge. You are given tasks and constraints, and must write prompts that get the best possible output from an AI model."},
 {h:"What is tested",items:["Creativity","Problem-solving","Prompt engineering skill","Getting optimal outputs under constraints"]},
 {h:"Rules",items:["Individual participation.","Follow the constraints given for each round.","Task format, tools and time limit are announced before the event.","Organizers' decisions on judging are final."]},
 {h:"Tip",p:"Be clear, be specific and iterate. The best prompter is not the one with the longest prompt."}]},

/* ================= NON-TECH ================= */
"battle-verse":{tag:"Free Fire & BGMI",sections:[
 {h:"About",p:"Battle Verse is the XENESIS gaming arena. Squads of four fight it out in Free Fire and BGMI, where map awareness, squad synergy and clutch decisions decide who survives."},
 {h:"Free Fire",p:"A high-stakes battle royale testing map awareness, squad synergy and precision gunplay."},
 {h:"BGMI",p:"Tactical deployment, resource allocation and squad survival through intense zone rotations."},
 {h:"Rules",items:["Each squad must have exactly 4 players.","Choose your game (Free Fire or BGMI) at registration. To play both, register once for each game.","Players must use their registered in-game IDs.","Hacks, scripts, cheats or unfair third-party help lead to disqualification.","Match format, map and room details are announced before the event.","Organizers' decisions on gameplay disputes are final."]}]},
"one-piece":{tag:"The Ultimate Hunt",sections:[
 {h:"About",p:"Technology + logic + campus knowledge + teamwork. Decode encrypted QR clues hidden across the campus and race the clock to the final treasure."},
 {h:"Clues may include",items:["Encrypted QR codes","Riddles and word puzzles","Numeric codes and patterns","Logic puzzles","Location-based campus clues"]},
 {h:"Ranking",items:["Teams are ranked by the time taken to finish the hunt.","Wrong answers, failed attempts and boundary infractions add time penalties."]},
 {h:"Important",p:"Follow the designated route and event instructions. Entering restricted areas or disturbing regular college activities is strictly prohibited."}]},
"perfect-partner":{tag:"Silent Intuition",sections:[
 {h:"About",p:"How well do you really know your partner? Perfect Partner tests non-verbal communication, coordinated mini-challenges and shared intuition, all under timed pressure."},
 {h:"Eligible teams",items:["2 Boys","2 Girls","1 Boy + 1 Girl"]},
 {h:"Format",items:["Duo entry: exactly 2 players.","Teams complete a series of timed mini-challenges together.","Communication is non-verbal wherever the challenge says so."]},
 {h:"Ranking",p:"Teams are ranked by their overall score and completion time across the challenges."}]},
"dumb-charades":{tag:"Silent Signal",sections:[
 {h:"About",p:"NO WORDS ALLOWED! One player acts and the team guesses. Technical terms, pop culture and cinematic clues must be expressed purely through gestures and expressions."},
 {h:"Rules",items:["The acting player cannot speak.","No spelling out letters and no writing.","No mobile phones or props unless the organizers allow them.","Teammates must guess within the allotted time."]},
 {h:"Scoring",p:"Teams are ranked by the number of correct guesses within the time limit."}]},
"memography":{tag:"The Memory Arc",sections:[
 {h:"About",p:"20 images. 2 seconds per slide. Test your visual memory under intense time pressure, then reproduce the sequence and details."},
 {h:"How it works",items:["Twenty images are shown one after another, about 2 seconds each.","Afterwards you get an answer sheet.","Write what you saw, in the correct order."]},
 {h:"Scoring",items:["Each correct item in the correct position earns marks.","Ranking is based on total score.","Ties may be settled by tie-breaker questions."]},
 {h:"The challenge",p:"It's not about seeing the images. It's about remembering them."}]},
"tech-painting":{tag:"Visual Horizons",sections:[
 {h:"About",p:"Phones down. Creativity begins. Create original physical artwork on the themes of Cyberpunk Samurai or futuristic technology, with no digital aids."},
 {h:"Rules",items:["Artwork must be physical and created during the allotted time.","No phones or digital aids while painting.","Follow the announced themes.","Copying another participant's work may lead to disqualification.","Bring your own colours, brushes and materials unless told otherwise."]},
 {h:"Judging criteria",items:["Creativity","Relevance to the theme","Concept","Presentation","Artistic execution"]}]},
"short-film":{tag:"The Final Cut",sections:[
 {h:"About",p:"Capture the atmosphere of XENESIS 4.0 in a cinematic piece: student battles, campus backdrops and raw festival adrenaline."},
 {h:"Registration",items:["Solo or Team entry, same fee of ₹99.","Team entries can have up to 5 members."]},
 {h:"Capture",items:["Events and performances","Participants and crowds","Campus atmosphere","Behind-the-scenes moments"]},
 {h:"Judging criteria",items:["Creativity","Storytelling","Cinematography","Editing","Originality","Use of music/audio"]},
 {h:"Note",p:"Duration, submission format and deadline will be announced by the organizers."}]},
"reels":{tag:"Reels x Render",sections:[
 {h:"About",p:"Shoot, edit and deliver dynamic, high-engagement short-form vertical video that captures campus energy, creative cuts and fest vibes."},
 {h:"Rules",items:["Individual participation.","Vertical (9:16) short-form video.","Content must be original and shot during XENESIS 4.0.","Keep it respectful and fest-appropriate.","Maximum length and submission method are announced by the organizers."]},
 {h:"Judging criteria",items:["Creativity","Editing and cuts","Engagement and energy","Storytelling","Overall vibe"]}]},
"photography":{tag:"Lens Craft",sections:[
 {h:"About",p:"Document vivid festival moments through lens craft, composition and dynamic lighting. Don't just take a photo: capture a moment worth remembering."},
 {h:"Capture",items:["People and emotions","Events and action","Decorations and campus","Behind-the-scenes moments","Creative perspectives"]},
 {h:"Judging criteria",items:["Storytelling impact","Framing and composition","Lighting","Timing","Originality"]},
 {h:"Note",p:"Submission format and deadline will be announced by the organizers."}]},
"xen-z-show":{tag:"The Open Stage",sections:[
 {h:"About",p:"The ultimate open stage for Gen-Z talent. Step up and own the crowd."},
 {h:"Acts welcome",items:["Stand-up comedy","Mimicry","Music and acoustic jams","Open mic","Any crowd-captivating performance act"]},
 {h:"Registration",items:["Solo entry: ₹49.","Group entry: ₹99 (2 to 10 members).","Pick Solo or Group on the registration page."]},
 {h:"Rules",items:["Keep acts respectful and suitable for a college audience.","Time limits per act are announced before the event.","Bring your own instruments or backing tracks unless told otherwise."]}]}
};
