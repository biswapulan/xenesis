/* Full event details. Edit freely: each section = {h:heading, p:paragraph, items:[bullets]} */
const XEN_INFO={
 date:"Saturday, 31 Oct & Sunday, 1 Nov 2026",time:"See schedule",venue:"Room shown on each event page",   /* day, time and room per event: see XEN_SCHEDULE below */
 notice:"",
 coordinators:[/* {name:"Name",phone:"98XXXXXXXX"} */]
};
/* Day and time of every event (XENESIS 4.0 schedule). Keep in sync with the timetable in index.html. */
const XEN_SCHEDULE={
 "chess":{day:"Day 1 · Saturday, 31 October 2026",time:"9:30 AM – 10:30 AM",room:"2nd Year Classroom"},
 "codemon":{day:"Day 1 · Saturday, 31 October 2026",time:"10:00 AM – 1:00 PM",room:"2nd Block OOPS Lab or Classroom",note:"Participants of Codemon can't participate in Treasure Hunt (One Piece), and vice versa."},
 "one-piece":{day:"Day 1 · Saturday, 31 October 2026",time:"11:00 AM – 1:00 PM",room:"Seminar Hall",note:"Participants of Codemon can't participate in Treasure Hunt (One Piece), and vice versa."},
 "battle-verse":{day:"Day 1 · Saturday, 31 October 2026",time:"1:30 PM – 4:00 PM",room:"3rd Year Classroom"},
 "xen-z-show":{day:"Day 1 · Saturday, 31 October 2026",time:"2:00 PM – 5:00 PM",room:"Auditorium"},
 "wordlord":{day:"Day 1 · Saturday, 31 October 2026",time:"4:00 PM – 5:00 PM",room:"3rd Block 1st Lab"},
 "dumb-charades":{day:"Day 1 · Saturday, 31 October 2026",time:"5:00 PM – 6:00 PM",room:"4th Block Lab or Seminar Hall"},
 "kbc":{day:"Day 2 · Sunday, 1 November 2026",time:"9:00 AM – 10:30 AM",room:"4th Year Classroom"},
 "robo-drift":{day:"Day 2 · Sunday, 1 November 2026",time:"9:00 AM – 10:30 AM",room:"HPL Ground"},
 "memography":{day:"Day 2 · Sunday, 1 November 2026",time:"10:00 AM – 10:45 AM",room:"2nd Year Classroom"},
 "ipl-auction":{day:"Day 2 · Sunday, 1 November 2026",time:"10:30 AM – 1:30 PM",room:"4th Block Lab"},
 "tech-escape-room":{day:"Day 2 · Sunday, 1 November 2026",time:"2:00 PM – 3:00 PM",room:"4th Block Lab"},
 "reels":{day:"Day 2 · Sunday, 1 November 2026",time:"3:00 PM – 4:00 PM",room:"Seminar Hall"},
 "perfect-partner":{day:"Day 2 · Sunday, 1 November 2026",time:"3:30 PM – 4:30 PM",room:"4th Year Classroom"},
};
/* Event coordinators (4th year) per event, from the coordinators list. */
const XEN_COORDS={
 "robo-drift":[{name:"Rajesh Kerketa",phone:"+91 78942 79152"},{name:"Arpit Biswal",phone:"+91 94398 78530"},{name:"Saikat Ranjan Behera",phone:"+91 83288 04639"}],
 "wordlord":[{name:"Abhijit Tripathy",phone:"+91 93483 21279"},{name:"Om Suryanshu",phone:"+91 72056 62960"}],
 "codemon":[{name:"Subhrajeet Panda",phone:"+91 73777 96993"}],
 "kbc":[{name:"Sanjit Swain",phone:"+91 70778 70908"},{name:"Amrit Nayak",phone:"+91 81448 43129"}],
 "tech-escape-room":[{name:"Gourav Samal",phone:"+91 90407 24200"}],
 "battle-verse":[{name:"Biswat Basant Khillar",phone:"+91 78558 81212"},{name:"Jagrut Pradhan",phone:"+91 99371 81726"},{name:"Omprakash Patra",phone:"+91 82600 08234"}],
 "one-piece":[{name:"Soumyajit Pradhan",phone:"+91 63718 86007"},{name:"Srabani Parida",phone:"+91 77500 61117"}],
 "perfect-partner":[{name:"Jagrut Pradhan",phone:"+91 99371 81726"},{name:"Ritik Samal",phone:"+91 91788 20235"}],
 "dumb-charades":[{name:"Divya Jyoti Sahoo",phone:"+91 63720 23144"},{name:"Gyana Ranjan Nayak",phone:"+91 63728 32355"}],
 "memography":[{name:"Biswat Basant Khillar",phone:"+91 78558 81212"},{name:"Abhijit Tripathy",phone:"+91 93483 21279"}],
 "ad-mad":[{name:"Guptesh Ku. Giri",phone:"+91 82608 40885"},{name:"Om Suryanshu",phone:"+91 72056 62960"},{name:"Gourav Acharya",phone:"+91 78470 48775"}],
 "ipl-auction":[{name:"Gourav Acharya",phone:"+91 78470 48775"},{name:"Divya Jyoti Sahoo",phone:"+91 63720 23144"}],
 "chess":[{name:"Prabhanshu Dash",phone:"+91 99370 04403"}],
 "reels":[{name:"Sthitiprajna Dash",phone:"+91 63700 03669"},{name:"Guptesh Ku. Giri",phone:"+91 82608 40885"}],
 "xen-z-show":[{name:"Banamali Naik",phone:"+91 63710 95338"},{name:"Abhisek Mohanty",phone:"+91 94378 49756"},{name:"Soumyajit Pradhan",phone:"+91 63718 86007"}],
};
const XEN_DETAILS={
/* ================= TECH ================= */
"robo-drift":{tag:"Build. Control. Drift.",sections:[
 {h:"About",p:"Robo Drift is a robotics challenge for teams who want to engineer a fast, controllable rover and prove it on the track. Speed alone will not win: the best team balances design, control and precision."},
 {h:"Basic concept",items:["Teams bring a remote-controlled rover and compete on a designated high-friction obstacle track.","Rovers are driven remotely by the team's pilot.","Acceleration, turning control, drift precision and clean runs decide the ranking.","Track layout, run format and technical specifications are announced before the event."]},
 {h:"Judged on",items:["Lap or run time","Turning and drift control","Obstacle clearance and clean runs","Robot design and build quality"]},
 {h:"Team",p:"Register as a team of 1 to 4 members. Every member must be listed at registration."},
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
"kbc":{tag:"Quiz. Climb. Win.",sections:[
 {h:"About",p:"KBC (Kon Banega Coder) is an individual tech quiz inspired by Kaun Banega Crorepati. Answer questions on programming, computer science and technology, climb the ladder level by level, and see who sits in the hot seat as the top coder."},
 {h:"What you will do",items:["Answer rounds of multiple-choice and quick-fire questions announced at the start of the event.","Face questions that get harder as you move up the levels.","Use lifelines wisely when you are stuck (details announced on the day).","Think fast: every question is timed."]},
 {h:"Topics covered",items:["Programming languages and coding concepts","Data structures and algorithms basics","Computer science fundamentals","Web, AI, gadgets and current tech trends","Tech history, logos and general tech knowledge"]},
 {h:"Rules",items:["Individual participation.","Quiz format, number of rounds, scoring and lifelines are announced before the event.","No mobile phones, internet or external help during the quiz.","Organizers' decisions on scoring and disputes are final."]},
 {h:"Winner",p:"The participant with the highest overall score takes the top position. Ties may be settled with a sudden-death question."}]},
"tech-escape-room":{tag:"Think. Decode. Escape.",sections:[
 {h:"About",p:"Tech Escape Room is a solo puzzle-solving event where participants use logical reasoning, observation and basic computer science knowledge to overcome a series of technology-inspired challenges."},
 {h:"How it works",items:["Each participant works through seven mini-tasks on their own.","Each task you complete moves you closer to the final challenge.","Collect and connect the clues from every stage to discover the final code or solution.","Crack the final code to complete the escape room."]},
 {h:"Types of challenges",items:["Decoding secret messages","Solving logic puzzles","Predicting code outputs","Identifying hidden clues","Interpreting basic technical concepts","Other computer-related puzzles"]},
 {h:"Skills tested",items:["Logical reasoning","Observation and attention to detail","Basic computer science knowledge","Focus and time management"]},
 {h:"Participation",p:"Individual entry only. There are no teams for this event."},
 {h:"Rules",items:["Individual participation only. No teams.","Task details, time limit and scoring are announced before the event.","No mobile phones, internet or outside help while solving the tasks.","Organizers' decisions on scoring and disputes are final."]}]},

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
"ad-mad":{tag:"Pitch It. Perform It.",sections:[
 {h:"About",p:"A live marketing pitch with a humorous skit. Teams are handed quirky, unexpected products and must sell them on the spot with taglines, jingles and brand pitches."},
 {h:"Registration",items:["Solo entry or a team of 2 to 4 members.","Same entry fee of ₹49 for solo and team."]},
 {h:"Judged on",items:["Creativity and humour","Quality of the pitch and tagline","Jingle and performance","Team coordination and stage presence"]},
 {h:"Rules",items:["Keep content respectful and suitable for a college audience.","Product and time limit are announced on the spot.","Organizers' decisions are final."]}]},
"ipl-auction":{tag:"Bid. Build. Win.",sections:[
 {h:"About",p:"Simulated cricket auction. Manage a fixed virtual budget, strategize bidder paddle wars, and assemble a balanced squad under tactical constraints."},
 {h:"Format",items:["Team of 3 or 4 members (a team must have exactly 3 or exactly 4 players).","Every team gets the same virtual budget.","Teams bid for players in live auction rounds.","Squads must be balanced and meet the announced constraints."]},
 {h:"Registration",items:["Team of 3 players: ₹99 per team.","Team of 4 players: ₹149 per team.","Pick your team size on the registration page."]},
 {h:"Ranking",p:"Teams are ranked on the strength and balance of the final playing XI. Exact scoring rules are announced before the event."}]},
"chess":{tag:"Chess Championship",sections:[
 {h:"About",p:"A fast-paced rapid/blitz tournament that tests board awareness, tactical openings, endgame strategy and time management."},
 {h:"Rules",items:["Individual participation.","Rapid/blitz time control, announced before the event.","Standard chess rules apply, with touch-move.","Organizers' decisions on disputes are final."]},
 {h:"Format",p:"Match format and pairing system depend on the number of entries and are announced before the event."}]},
"reels":{tag:"Reels x Render",sections:[
 {h:"About",p:"Shoot, edit and deliver dynamic, high-engagement short-form vertical video that captures campus energy, creative cuts and fest vibes."},
 {h:"Rules",items:["Individual participation.","Vertical (9:16) short-form video.","Content must be original and shot during XENESIS 4.0.","Keep it respectful and fest-appropriate.","Maximum length and submission method are announced by the organizers."]},
 {h:"Judging criteria",items:["Creativity","Editing and cuts","Engagement and energy","Storytelling","Overall vibe"]}]},
"xen-z-show":{tag:"The Open Stage",sections:[
 {h:"About",p:"The ultimate open stage for Gen-Z talent. Step up and own the crowd."},
 {h:"Acts welcome",items:["Stand-up comedy","Mimicry","Music and acoustic jams","Open mic","Any crowd-captivating performance act"]},
 {h:"Registration",items:["Solo entry: ₹49.","Group entry: ₹99 (2 to 10 members).","Pick Solo or Group on the registration page."]},
 {h:"Rules",items:["Keep acts respectful and suitable for a college audience.","Time limits per act are announced before the event.","Bring your own instruments or backing tracks unless told otherwise."]}]}
};
