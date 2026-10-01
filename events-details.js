/* Full event details. Edit freely: each section = {h:heading, p:paragraph, items:[bullets]} */
const XEN_INFO={
 date:"Via WhatsApp & Email",time:"Via WhatsApp & Email",venue:"Via WhatsApp & Email",   /* shared with registered participants; replace with real values once final */
 notice:"Date, time and venue will be notified via WhatsApp and email to the registered mobile number and email ID.",
 coordinators:[/* {name:"Name",phone:"98XXXXXXXX"} */]
};
const GAME_RULES=["Each squad must have exactly 4 players.","Players must use their registered in-game IDs.","Hacks, scripts, cheats or unfair third-party help lead to disqualification.","Match format, map, room ID/password and detailed rules will be announced before the event.","Organizers' decisions on gameplay disputes are final."];
const XEN_DETAILS={
"free-fire":{tag:"Squad Battle",sections:[
 {h:"About",p:"Team up with your squad and compete against other teams in an intense Free Fire battle. Communication, strategy, coordination, survival skills and decision-making will be key to securing the top position."},
 {h:"Rules",items:GAME_RULES}]},
"bgmi":{tag:"Squad Battle",sections:[
 {h:"About",p:"Bring your squad, build your strategy and compete against other teams in BGMI. Team coordination, survival, combat skills and tactical decision-making will determine your position."},
 {h:"Rules",items:["Each squad must have 4 players.","Only registered players may participate.","Hacks, cheats, scripts or any unfair advantage are strictly prohibited.","Match format and detailed rules will be announced before the event.","Organizers may disqualify teams violating the rules."]}]},
"chess":{tag:"Checkmate Challenge",sections:[
 {h:"About",p:"A battle of patience, strategy and logical thinking. Test your ability to anticipate your opponent's moves and find the right strategy under pressure."},
 {h:"Rules",items:["Individual participation.","Standard chess rules will be followed.","Match format and time control will be announced before the event.","Maintain fair play throughout the competition.","Any form of external assistance is prohibited."]},
 {h:"Winner",p:"Determined according to the tournament format and final results."}]},
"perfect-partner":{tag:"Bonding & Compatibility",sections:[
 {h:"About",p:"Think you know your best friend better than anyone else? Then prove it! Partners are asked questions about each other, answers are compared, and points are awarded for every correct match."},
 {h:"Who can participate",items:["2 Boys","2 Girls","1 Boy + 1 Girl"]},
 {h:"Questions may be based on",items:["Likes and dislikes","Habits","Preferences","Favourite things","Personality","Friendship memories","General knowledge about your partner"]},
 {h:"Scoring",p:"Each question carries equal marks. The team with the most correct answers gets the highest rank. The better you know your partner, the better your chances!"}]},
"treasure-hunt":{tag:"The Ultimate Hunt",sections:[
 {h:"About",p:"This isn't your ordinary treasure hunt. Technology + Logic + Campus Knowledge + Teamwork. The hunt begins with a QR code: scan it, solve the first clue, find the location, discover the next clue and continue."},
 {h:"Clues may include",items:["Riddles","QR codes","Numeric codes","Patterns","Logical puzzles","Word puzzles","Location-based clues","Campus-related challenges"]},
 {h:"Why teamwork matters",p:"Clues lead teams through different locations in the college academic block. Members with different strengths (English, logic, campus awareness, creative thinking) give a real advantage."},
 {h:"Ranking",items:["Teams are ranked mainly by the time taken to complete the hunt.","The team finishing the required challenges correctly in the shortest time ranks highest.","Incorrect answers or failed attempts may add time or penalties as per event rules."]},
 {h:"Important",p:"Follow the designated route and event instructions. Entering restricted areas or disturbing regular college activities is strictly prohibited."}]},
"dumsarash":{tag:"No Words Allowed",sections:[
 {h:"About",p:"One player acts. The rest of the team guesses. Simple? Maybe. The challenge is that NO WORDS ARE ALLOWED. The actor is given a word, phrase or concept and must communicate it only through actions, expressions, body language and gestures."},
 {h:"Rules",items:["The assigned player cannot speak.","No spelling through gestures.","No writing or using a mobile phone to communicate.","Teammates must guess within the allotted time."]},
 {h:"Scoring",p:"Teams are ranked by the number of correct words guessed within the given time."}]},
"memography":{tag:"Memory Challenge",sections:[
 {h:"About",p:"Can you trust your memory? Twenty images are shown one after another, about 2 seconds each. Observe and memorise the images and their sequence. Afterwards you get an answer sheet and must write the objects or subjects shown, in the correct order."},
 {h:"Example",items:["1. Dog","2. Cat","3. Shoe"]},
 {h:"Scoring",items:["Each correct item in the correct sequence earns 1 mark.","Ranking is based on total score.","Ties may be settled by additional rules or tie-breaker questions."]},
 {h:"The challenge",p:"It's not about seeing the images. It's about remembering them."}]},
"tech-painting":{tag:"Technology × Creativity",sections:[
 {h:"About",p:"A combination of technology, imagination and artistic creativity. A theme is announced about 5–10 minutes before the competition. You may use your phone during this preparation period to research the theme. Then: phones down, creativity begins."},
 {h:"Rules",items:["Phones must be submitted or kept aside once preparation ends.","Artwork must be created during the allotted time.","Follow the announced theme.","Copying another participant's artwork may lead to disqualification."]},
 {h:"Judging criteria",items:["Creativity","Relevance to the theme","Concept","Presentation","Artistic execution"]}]},
"short-film":{tag:"Your Camera. Your Story.",sections:[
 {h:"About",p:"Create a short cinematic film capturing the spirit of XENESIS 4.0, and turn its moments into a short, engaging story that shows the energy, creativity and atmosphere of the fest."},
 {h:"Capture",items:["Events","Participants","Decorations","Performances","Campus atmosphere","Behind-the-scenes moments","Exciting interactions","Memorable moments"]},
 {h:"Judging criteria",items:["Creativity","Storytelling","Cinematography","Editing","Originality","Use of music/audio","Overall presentation"]},
 {h:"Note",p:"Duration, submission format and deadline will be announced by the organizers."}]},
"story-writing":{tag:"Words to Worlds",sections:[
 {h:"About",p:"Think. Imagine. Write. On the day, you receive about 15–20 words and must create a complete, meaningful story using them. Use the words creatively and think beyond conventional ideas. There is no single correct story."},
 {h:"Judging criteria",items:["Creativity","Originality","Story structure","Use of given words","Language","Imagination","Overall impact"]}]},
"photography":{tag:"See What Others Don't",sections:[
 {h:"About",p:"Capture photographs throughout XENESIS 4.0 and showcase the event through your perspective. The goal isn't simply to take a photograph. It's to capture a moment worth remembering."},
 {h:"Capture",items:["People","Emotions","Events","Decorations","Action","Campus","Behind-the-scenes moments","Creative perspectives"]},
 {h:"Judging criteria",items:["Creativity","Composition","Lighting","Timing","Subject selection","Originality","Overall visual impact"]},
 {h:"Note",p:"The registration fee will be announced soon."}]},
"robo":{tag:"Control. Strategy. Speed. Precision.",sections:[
 {h:"Robo Drift",p:"Put your robot car to the test! Control your robot through a designated track while completing the challenge with speed, precision and control."},
 {h:"Robo Soccer",p:"Take your robot onto the arena and compete against another robot."},
 {h:"Basic concept",items:["Robots compete inside a designated arena.","Participants control their robots remotely.","The format may involve racing, pushing, manoeuvring or scoring, depending on the announcement.","Technical specifications, arena dimensions and match rules will be announced before the event."]},
 {h:"Important",p:"Make sure your robot complies with the technical requirements announced by the organizers."}]},
"wordlord":{tag:"The Typing Battle",sections:[
 {h:"About",p:"How fast can you type? WordLord is a pure typing-speed challenge. You get a typing test with a limited time of about 15–30 seconds, depending on the final format. Type as fast and accurately as possible."},
 {h:"Ranking is based on",items:["Typing speed","Accuracy","Correctly typed characters/words"]},
 {h:"Winner",p:"The participant with the highest valid typing performance takes the top position. No AI. No shortcuts. Just you and your keyboard."}]},
"codemon":{tag:"Build Under Pressure",sections:[
 {h:"About",p:"A problem-solving and development challenge for students who want to build rather than just solve predefined coding questions. Teams receive a development task at the start of the event."},
 {h:"Skills you may need",items:["Problem solving","UI/UX","Frontend development","React.js / Next.js","HTML/CSS/JavaScript","Logical thinking","Team collaboration","AI-assisted development"]},
 {h:"AI agents are allowed",p:"You may use AI agents/tools for code generation, with specific conditions on how AI-generated code can be used. Be prepared to understand the code you generate, modify it, debug it and explain your implementation."},
 {h:"Duration",p:"3 hours. The exact task, technical requirements, AI usage conditions, judging criteria and detailed rules are revealed at the start of the event."}]},
"kbc":{tag:"Kon Banega Coder",sections:[
 {h:"About",p:"Choose your language, prove your knowledge. Before the competition you select the programming language you're most comfortable with, then answer about 10–20 MCQs on it."},
 {h:"Language options may include",items:["Python","C","C++","Java","JavaScript","Other languages announced by the organizers"]},
 {h:"Questions may cover",items:["Syntax","Programming concepts","Data types","Functions","OOP concepts","Operators","Output prediction","Language-specific behaviour"]},
 {h:"Scoring",p:"The participant with the highest valid score takes the top position."}]}
};
